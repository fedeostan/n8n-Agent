# Buyer Personas

Psychological buyer classifications used by the Shopping Assistant to personalize recommendations.

## Overview

The Shopping Assistant classifies users into one of 6 buyer personas through a 5-question profiling flow. Each persona receives a tailored presentation style for product recommendations.

## Profiling Flow

### Question Sequence

| Step | Question Theme | Purpose |
|------|---------------|---------|
| 0 | Shopping speed | Impulse vs. deliberate |
| 1 | What matters most | Core values identification |
| 2 | Quality vs. price | Budget orientation |
| 3 | First thing looked at | Decision triggers |
| 4 | Ideal experience | Emotional drivers |

### Classification Signal

After step 4, the Profiling Agent outputs:
```
CLASSIFICATION_COMPLETE: [PERSONA_TYPE]
```

---

## Persona Definitions

### 1. IMPULSE_SHOPPER

**Psychology**: Excitement-driven, trend-conscious, values instant gratification

**Behavioral Traits**:
- Makes quick purchase decisions
- Attracted to "new" and "trending" labels
- Responds to urgency (limited time, low stock)
- Values social proof and popularity

**Presentation Strategy**:
```
"Hot picks!" "Trending now!" "Everyone's loving this!"
- Lead with excitement and social proof
- Highlight trending status and popularity
- Create urgency where appropriate
- Keep descriptions short and punchy
```

**Example Interaction**:
> "These running shoes are FLYING off the shelves right now! Nike Air Zoom Pegasus 41 - rated #1 this season. Only a few left at this price!"

---

### 2. ANALYTICAL_BUYER

**Psychology**: Data-driven, research-oriented, values informed decisions

**Behavioral Traits**:
- Compares multiple options before deciding
- Reads reviews and specifications thoroughly
- Values objective metrics and ratings
- Takes time to evaluate trade-offs

**Presentation Strategy**:
```
Detailed specs, comparisons, review scores
- Lead with specifications and data
- Include comparison tables when possible
- Cite review scores and ratings
- Provide objective pros/cons
```

**Example Interaction**:
> "Based on your requirements, here's a detailed comparison:
>
> | Feature | Nike Pegasus 41 | Brooks Ghost 16 |
> |---------|-----------------|-----------------|
> | Weight | 283g | 292g |
> | Drop | 10mm | 12mm |
> | Rating | 4.7/5 (2.3k reviews) | 4.6/5 (1.8k reviews) |
>
> The Pegasus offers better responsiveness for tempo runs..."

---

### 3. DEAL_HUNTER

**Psychology**: Value-conscious, satisfaction from finding bargains

**Behavioral Traits**:
- Primary focus on price and savings
- Actively seeks discounts and deals
- Willing to wait for sales
- Compares prices across retailers

**Presentation Strategy**:
```
Focus on price, discounts, value
- Lead with price and any discounts
- Highlight savings and deals
- Compare value across options
- Mention price drops or sales
```

**Example Interaction**:
> "Great news - I found some excellent deals on running shoes:
>
> 1. **Nike Pegasus 40** - $89 (was $130) - 32% OFF!
>    Last year's model but same great performance
>
> 2. **ASICS Gel-Nimbus 25** - $99 (was $160) - Best value!
>    Premium cushioning at mid-range price"

---

### 4. BRAND_LOYALIST

**Psychology**: Trust-oriented, values familiarity and reputation

**Behavioral Traits**:
- Sticks with brands they know and trust
- Values brand heritage and reputation
- Less price-sensitive within preferred brands
- Influenced by brand story and values

**Presentation Strategy**:
```
Highlight brand reputation, heritage, quality
- Lead with brand name and reputation
- Tell the brand story when relevant
- Emphasize brand values and heritage
- Focus on flagship products
```

**Example Interaction**:
> "Since you appreciate quality brands, here are some top options from the most trusted names:
>
> 1. **Nike Air Zoom Pegasus 41** - Nike's flagship running shoe
>    40+ years of innovation. Worn by elite athletes worldwide.
>
> 2. **Adidas Ultraboost Light** - Adidas' premium performance line
>    German engineering meets sustainable design."

---

### 5. ETHICAL_SHOPPER

**Psychology**: Values-driven, considers impact of purchases

**Behavioral Traits**:
- Prioritizes sustainability and ethics
- Researches company practices
- Willing to pay more for ethical products
- Values certifications and transparency

**Presentation Strategy**:
```
Sustainability, eco-friendly aspects, certifications
- Lead with sustainability credentials
- Highlight eco-friendly materials
- Mention certifications (B-Corp, Fair Trade)
- Explain company ethics and practices
```

**Example Interaction**:
> "Here are some great sustainable running shoe options:
>
> 1. **Allbirds Tree Dashers** - $135
>    Made from eucalyptus tree fiber, carbon-neutral certified
>    B-Corp certified company
>
> 2. **On Cloudaway** - $150
>    50% recycled materials, designed for recyclability
>    Climate-neutral shipping"

---

### 6. QUALITY_FOCUSED

**Psychology**: Craftsmanship-oriented, "buy once, buy well" mentality

**Behavioral Traits**:
- Prioritizes durability and longevity
- Values premium materials
- Willing to invest in quality
- Appreciates craftsmanship details

**Presentation Strategy**:
```
Materials, durability, craftsmanship
- Lead with materials and construction
- Highlight durability and longevity
- Explain craftsmanship details
- Emphasize long-term value
```

**Example Interaction**:
> "For someone who values quality and durability:
>
> 1. **New Balance Fresh Foam X 1080v13** - $165
>    Premium Fresh Foam X midsole, engineered mesh upper
>    Known for 500+ mile durability
>
> 2. **HOKA Clifton 9** - $145
>    Dual-density EVA foam, extended heel geometry
>    Built to last with reinforced wear zones"

---

## Persona Distribution

Based on e-commerce research, typical distribution:

| Persona | Typical % | Notes |
|---------|-----------|-------|
| ANALYTICAL_BUYER | 25-30% | Most common online |
| DEAL_HUNTER | 20-25% | Price-sensitive market |
| IMPULSE_SHOPPER | 15-20% | Higher on mobile |
| QUALITY_FOCUSED | 10-15% | Higher AOV |
| BRAND_LOYALIST | 10-15% | High retention |
| ETHICAL_SHOPPER | 5-10% | Growing segment |

## Persona Evolution

Personas are not static. Future enhancements will:

1. **Track Behavior**: Monitor click patterns and purchases
2. **Detect Drift**: Identify when behavior doesn't match persona
3. **Suggest Re-profiling**: Offer to update persona after significant changes
4. **Hybrid Personas**: Support secondary persona traits

## Integration with Shopping Assistant

The Shopping Assistant receives persona info in its system prompt:
```javascript
USER INFO:
- Email: {{ userData.email }}
- Persona: {{ userData.persona_type }}
- Preferences: {{ JSON.stringify(userData.preferences) }}
```

This enables real-time personalization of every recommendation.
