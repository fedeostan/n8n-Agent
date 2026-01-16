# Shopping Assistant

Personal shopping assistant that builds buyer personas and recommends the exact product users are looking for.

## Objective

Build a super agent that:
1. Gets to know users through psychological profiling
2. Classifies users into one of 6 buyer personas
3. Recommends products personalized to their persona
4. Learns from interactions to improve recommendations

## Success Metric

**Recommendation Effectiveness**: % of users who click recommended product links

## Key Links

| Resource | URL |
|----------|-----|
| n8n Workflow | https://fedeostan.app.n8n.cloud/workflow/xVkkSX6Lk9OBmY0r |
| Supabase Project | https://supabase.com/dashboard/project/fbavheqqqdoscxrmyaua |

## Architecture Overview

```
User Message → Chat Trigger → Session Manager → Get User State → Route by State
                                                                      │
                    ┌─────────────────────────────────────────────────┼─────────────────────┐
                    │                                                 │                     │
                    ▼                                                 ▼                     ▼
             [PROFILED]                                        [ONBOARDING]              [NEW]
          Shopping Assistant                                  Profiling Agent        Email Collector
                    │                                                 │                     │
                    ▼                                                 ▼                     ▼
           Product Search                                    Classify Persona         Create User
          (via Perplexity)                                   Update Progress         → ONBOARDING
```

## Current Status

- [x] Database schema deployed (Supabase)
- [x] Multi-agent workflow (3 specialized agents)
- [x] Profiling flow (5 questions)
- [x] 6 buyer personas defined
- [x] Perplexity integration for product search
- [x] PostgreSQL chat memory persistence
- [ ] Recommendation effectiveness tracking
- [ ] Preference learning from click behavior
- [ ] A/B testing different recommendation strategies

## Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Orchestration | n8n | Workflow automation, agent coordination |
| LLM | GPT-4o / GPT-4o-mini | Agent reasoning |
| Product Search | Perplexity API | Real-time product discovery |
| Database | Supabase (PostgreSQL) | User profiles, chat history |
| Chat Interface | n8n Chat Trigger | User interaction (future: Next.js) |

## State Machine

```
NEW → ONBOARDING → PROFILED
 │         │           │
 │         │           └── Can shop, receives personalized recommendations
 │         └── Answering 5 profiling questions
 └── No email yet, collecting user identity
```

## Related Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) - Detailed multi-agent design
- [PERSONAS.md](PERSONAS.md) - Buyer persona definitions and strategies

## Future Roadmap

1. **Website Integration** - Next.js chat interface (future epic)
2. **Google UCP** - Native checkout integration (future epic)
3. **Recommendation Analytics** - Track click-through rates
4. **Preference Learning** - Update personas based on behavior
