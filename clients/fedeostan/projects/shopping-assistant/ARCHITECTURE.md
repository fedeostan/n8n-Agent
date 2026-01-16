# Shopping Assistant Architecture

Multi-agent workflow design following n8n best practices for AI agent orchestration.

## Design Principles

Based on [n8n multi-agent best practices](https://blog.n8n.io/multi-agent-systems/):

1. **Specialized Agents over Super-Agent**: Each agent has a focused responsibility
2. **State-Based Routing**: User state determines which agent handles the request
3. **Persistent Memory**: PostgreSQL stores context across sessions
4. **Model Matching**: Use appropriate model size for task complexity

## Workflow Overview

**Workflow ID**: `xVkkSX6Lk9OBmY0r`
**Name**: Psychological Shopping Assistant

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              ENTRY POINT                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  Chat Trigger → Session Manager → Get User State → Process User State       │
│                                         │                                    │
│                                         ▼                                    │
│                                  Route by State                              │
│                                    /   |   \                                 │
│                                   /    |    \                                │
│                          PROFILED  ONBOARDING  NEW                           │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  NEW USER PATH  │    │ ONBOARDING PATH │    │  PROFILED PATH  │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ Email Collector │    │ Profiling Agent │    │Shopping Assistant│
│       │         │    │       │         │    │       │         │
│       ▼         │    │       ▼         │    │       ▼         │
│ Extract Email   │    │Process Profiling│    │ Product Search  │
│       │         │    │       │         │    │  (Perplexity)   │
│       ▼         │    │       ▼         │    │       │         │
│ Email Found?    │    │ Profile Done?   │    │       ▼         │
│   Yes → Create  │    │   Yes → Update  │    │ Return Results  │
│         User    │    │         Profile │    │ (Personalized)  │
│         ↓       │    │   No  → Update  │    │                 │
│    ONBOARDING   │    │         Step    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Agent Specifications

### 1. Email Collector Agent

**Purpose**: Collect user email to create identity
**Model**: GPT-4o-mini (simple task)
**Memory**: Buffer Window (10 messages)

```
System Prompt:
- Friendly greeting
- Single goal: get email address
- Warm, concise (2-3 sentences)
- Confirm when email received
```

**Output**: Email address → Create user in `shopping_users` table

### 2. Profiling Agent

**Purpose**: Classify user into buyer persona through conversation
**Model**: GPT-4o-mini (structured questions)
**Memory**: Buffer Window (15 messages)

```
System Prompt:
- Shopping psychologist role
- ONE question per message
- 5-step profiling sequence:
  0. Shopping speed preference
  1. What matters most when shopping
  2. Quality vs price tradeoff
  3. First thing looked at in products
  4. Ideal shopping experience
- Output: CLASSIFICATION_COMPLETE: [PERSONA_TYPE]
```

**Output**: Persona classification → Update `persona_type` in database

### 3. Shopping Assistant Agent

**Purpose**: Provide personalized product recommendations
**Model**: GPT-4o (complex reasoning)
**Memory**: PostgreSQL Chat Memory (20 messages, persisted)

```
Tools:
- Product Search (Perplexity API)
- Get Preferences (user's saved preferences)

System Prompt:
- MUST use search tools for every product request
- Never make up products or prices
- Present 3-5 results with real links
- Adapt presentation to user's persona type
```

**Persona-Based Presentation**:
| Persona | Presentation Style |
|---------|-------------------|
| IMPULSE_SHOPPER | "Hot picks!" Quick, exciting, trending |
| ANALYTICAL_BUYER | Detailed specs, comparisons, review scores |
| DEAL_HUNTER | Price focus, discounts, value proposition |
| BRAND_LOYALIST | Brand reputation, heritage, quality |
| ETHICAL_SHOPPER | Sustainability, eco-friendly, certifications |
| QUALITY_FOCUSED | Materials, durability, craftsmanship |

## Database Schema

### shopping_users

| Column | Type | Purpose |
|--------|------|---------|
| id | SERIAL | Primary key |
| email | VARCHAR(255) | User identifier |
| session_id | VARCHAR(255) | n8n session tracking |
| state | VARCHAR(50) | NEW, ONBOARDING, PROFILED |
| onboarding_step | INTEGER | 0-4 profiling progress |
| persona_type | VARCHAR(50) | Classified buyer persona |
| preferences | JSONB | Sizes, budget, style, brands |
| profiling_answers | JSONB | Answers to profiling questions |
| recent_searches | JSONB | Search history |
| favorite_products | JSONB | Saved products |

### n8n_chat_histories

| Column | Type | Purpose |
|--------|------|---------|
| id | SERIAL | Primary key |
| session_id | VARCHAR(255) | Links to user session |
| message | JSONB | Chat message content |
| created_at | TIMESTAMP | Message timestamp |

## Data Flow

```
1. User sends message
   ↓
2. Session Manager extracts: sessionId, message, emailFromMessage
   ↓
3. Get User State queries shopping_users by session_id
   ↓
4. Process User State determines: userState (NEW/ONBOARDING/PROFILED)
   ↓
5. Route by State sends to appropriate agent
   ↓
6. Agent processes and updates database
   ↓
7. Response returned to user
```

## Integration Points

### Supabase (Database)
- **Project**: `fbavheqqqdoscxrmyaua`
- **Tables**: `shopping_users`, `n8n_chat_histories`
- **Access**: Via n8n PostgreSQL nodes + MCP for debugging

### Perplexity API
- **Model**: `llama-3.1-sonar-large-128k-online`
- **Purpose**: Real-time product search with citations
- **Auth**: HTTP Header Auth

### OpenAI
- **Models**: GPT-4o (shopping), GPT-4o-mini (email, profiling)
- **Purpose**: Agent reasoning and conversation

## Error Handling

1. **No user found**: Defaults to NEW state
2. **Email extraction fails**: Agent continues conversation to get email
3. **Profiling incomplete**: Updates step and continues next message
4. **Product search fails**: Agent should gracefully handle and retry

## Future Enhancements

1. **Recommendation Tracking**: Log which products users click
2. **Preference Learning**: Update preferences based on behavior
3. **Multi-turn Product Refinement**: Help users narrow down options
4. **Google UCP Integration**: Enable direct checkout (future epic)
