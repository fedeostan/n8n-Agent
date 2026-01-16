-- Psychological Shopping Assistant - Database Schema
-- Run this SQL in your PostgreSQL database BEFORE using the workflow

-- ============================================================
-- TABLE 1: shopping_users
-- Stores user profiles, personas, and preferences
-- ============================================================
CREATE TABLE IF NOT EXISTS shopping_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,

    -- State Machine: NEW → ONBOARDING → PROFILED
    state VARCHAR(50) NOT NULL DEFAULT 'NEW',
    onboarding_step INTEGER DEFAULT 0,

    -- Buyer Persona Classification
    persona_type VARCHAR(50),  -- IMPULSE_SHOPPER, ANALYTICAL_BUYER, DEAL_HUNTER, BRAND_LOYALIST, ETHICAL_SHOPPER, QUALITY_FOCUSED

    -- User Preferences (flexible JSONB structure)
    preferences JSONB DEFAULT '{
        "sizes": {},
        "budget": {},
        "style": [],
        "brands": [],
        "categories": [],
        "avoid": []
    }'::jsonb,

    -- Profiling data from onboarding
    profiling_answers JSONB DEFAULT '[]'::jsonb,

    -- Shopping history
    recent_searches JSONB DEFAULT '[]'::jsonb,
    favorite_products JSONB DEFAULT '[]'::jsonb,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_interaction TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast email lookups
CREATE INDEX IF NOT EXISTS idx_shopping_users_email ON shopping_users(email);
CREATE INDEX IF NOT EXISTS idx_shopping_users_state ON shopping_users(state);

-- ============================================================
-- TABLE 2: n8n_chat_histories
-- Required by n8n's Postgres Chat Memory node
-- ============================================================
CREATE TABLE IF NOT EXISTS n8n_chat_histories (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    message JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for session lookups
CREATE INDEX IF NOT EXISTS idx_chat_session ON n8n_chat_histories(session_id);

-- ============================================================
-- HELPER FUNCTION: Update timestamp on modification
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    NEW.last_interaction = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update timestamps
DROP TRIGGER IF EXISTS update_shopping_users_timestamp ON shopping_users;
CREATE TRIGGER update_shopping_users_timestamp
    BEFORE UPDATE ON shopping_users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- VERIFICATION: Check tables created successfully
-- ============================================================
SELECT 'Tables created successfully!' as status;
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('shopping_users', 'n8n_chat_histories');
