-- Enhanced Database Schema for Supabase/PostgreSQL based on specdb.sql

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- Clean up existing objects (for re-run safety)
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS public.reviews CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.influencers CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;
DROP FUNCTION IF EXISTS calculate_net_price CASCADE;
DROP FUNCTION IF EXISTS update_influencer_stats CASCADE;

-- -----------------------------------------------------------------------------
-- Table: Users
-- Description: Stores user account information for SMEs, Influencers, and Admins.
-- -----------------------------------------------------------------------------
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Storing hashed passwords
    phone VARCHAR(20),
    avatar_url TEXT,
    location VARCHAR(100),
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('sme', 'influencer', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexing for Users
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_user_type ON public.users(user_type);

-- -----------------------------------------------------------------------------
-- Table: Influencers (Influencer Profiles)
-- Description: Specific profile details for users with user_type = 'influencer'.
-- Note: Linked to Users table via user_id.
-- -----------------------------------------------------------------------------
CREATE TABLE public.influencers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    username VARCHAR(50) UNIQUE NOT NULL,
    bio TEXT,
    followers_count INTEGER DEFAULT 0,
    engagement_rate DECIMAL(5, 2) DEFAULT 0.00,
    niche VARCHAR(100) NOT NULL,
    sub_niche VARCHAR(100) NOT NULL,
    price_per_post DECIMAL(12, 2) DEFAULT 0.00,
    min_price DECIMAL(12, 2) DEFAULT 0.00,
    max_price DECIMAL(12, 2) DEFAULT 0.00,
    instagram_url VARCHAR(255),
    tiktok_url VARCHAR(255),
    youtube_url VARCHAR(255),
    portfolio_url TEXT,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    total_orders INTEGER DEFAULT 0,
    availability_status VARCHAR(20) NOT NULL DEFAULT 'available' CHECK (availability_status IN ('available', 'busy')),           
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexing for Influencers
CREATE INDEX idx_influencers_user_id ON public.influencers(user_id);
CREATE INDEX idx_influencers_niche ON public.influencers(niche);
CREATE INDEX idx_influencers_username ON public.influencers(username);

-- -----------------------------------------------------------------------------
-- Table: Orders
-- Description: Tracks collaboration orders between SMEs and Influencers.
-- -----------------------------------------------------------------------------
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    influencer_id UUID NOT NULL REFERENCES public.influencers(id) ON DELETE CASCADE,
    sme_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    campaign_type VARCHAR(50) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    platform_commission DECIMAL(10, 2) NOT NULL,
    net_price DECIMAL(10, 2) NOT NULL, -- Calculated automatically via trigger
    requirements TEXT,
    deadline DATE,
    order_status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (order_status IN ('pending', 'accepted', 'processing', 'completed', 'cancelled', 'declined')),
    accepted_at TIMESTAMP WITH TIME ZONE,
    processing_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    declined_at TIMESTAMP WITH TIME ZONE,    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexing for Orders
CREATE INDEX idx_orders_sme_id ON public.orders(sme_id);
CREATE INDEX idx_orders_influencer_id ON public.orders(influencer_id);
CREATE INDEX idx_orders_status ON public.orders(order_status);

-- -----------------------------------------------------------------------------
-- Table: Reviews
-- Description: Reviews and ratings for completed orders.
-- -----------------------------------------------------------------------------
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    review_type VARCHAR(20) NOT NULL CHECK (review_type IN ('sme_to_influencer', 'influencer_to_sme')),
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexing for Reviews
CREATE INDEX idx_reviews_order_id ON public.reviews(order_id);
CREATE INDEX idx_reviews_rating ON public.reviews(rating);

-- -----------------------------------------------------------------------------
-- FUNC & TRIGGERS
-- -----------------------------------------------------------------------------

-- 1. Automatic updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_influencers_updated_at BEFORE UPDATE ON public.influencers FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 2. Automatic Net Price Calculation
CREATE OR REPLACE FUNCTION calculate_net_price()
RETURNS TRIGGER AS $$
BEGIN
    -- Net Price = Total Price - Platform Commission
    NEW.net_price = NEW.total_price - NEW.platform_commission;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER set_net_price BEFORE INSERT OR UPDATE ON public.orders
FOR EACH ROW EXECUTE PROCEDURE calculate_net_price();

-- 3. Update Influencer Total Orders on Completion
CREATE OR REPLACE FUNCTION update_influencer_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.order_status = 'completed' AND OLD.order_status != 'completed' THEN
        UPDATE public.influencers
        SET total_orders = total_orders + 1
        WHERE id = NEW.influencer_id;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER track_completed_orders AFTER UPDATE ON public.orders
FOR EACH ROW EXECUTE PROCEDURE update_influencer_stats();


-- -----------------------------------------------------------------------------
-- SEED DATA (5 Records per table)
-- -----------------------------------------------------------------------------

-- 1. Users
INSERT INTO public.users (id, name, email, password, phone, avatar_url, location, is_verified, is_active, user_type) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Admin User', 'admin@example.com', '$2a$12$R9h/cIPz0gi.URNNXRFXjO.pThqa9j1/YvX/Sg/q/k1/k/k/k/k', '081234567890', 'https://ui-avatars.com/api/?name=Admin', 'Jakarta, ID', TRUE, TRUE, 'admin'),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 'SME Business One', 'sme1@example.com', '$2a$12$R9h/cIPz0gi.URNNXRFXjO.pThqa9j1/YvX/Sg/q/k1/k/k/k/k', '081234567891', 'https://ui-avatars.com/api/?name=SME+One', 'Bandung, ID', TRUE, TRUE, 'sme'),
('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c33', 'SME Tech Gadgets', 'sme2@example.com', '$2a$12$R9h/cIPz0gi.URNNXRFXjO.pThqa9j1/YvX/Sg/q/k1/k/k/k/k', '081234567892', 'https://ui-avatars.com/api/?name=Tech+Gadgets', 'Surabaya, ID', FALSE, TRUE, 'sme'),
('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380d44', 'Jessica Style', 'jessica@example.com', '$2a$12$R9h/cIPz0gi.URNNXRFXjO.pThqa9j1/YvX/Sg/q/k1/k/k/k/k', '081234567893', 'https://ui-avatars.com/api/?name=Jessica+Style', 'Bali, ID', TRUE, TRUE, 'influencer'),
('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e55', 'Tech Reviewer Tom', 'tom@example.com', '$2a$12$R9h/cIPz0gi.URNNXRFXjO.pThqa9j1/YvX/Sg/q/k1/k/k/k/k', '081234567894', 'https://ui-avatars.com/api/?name=Tom+Tech', 'Jakarta, ID', TRUE, TRUE, 'influencer');

-- 2. Influencers
INSERT INTO public.influencers (id, user_id, username, bio, followers_count, engagement_rate, niche, sub_niche, price_per_post, min_price, max_price, instagram_url, tiktok_url, youtube_url, portfolio_url, rating, total_orders, availability_status) VALUES
('f5eebc99-9c0b-4ef8-bb6d-6bb9bd380f66', 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380d44', 'jessicastyle', 'Fashion & Lifestyle Content Creator based in Bali.', 50000, 3.5, 'Lifestyle', 'Fashion', 1500000.00, 1000000.00, 5000000.00, 'https://instagram.com/jessicastyle', 'https://tiktok.com/@jessicavibes', NULL, 'https://jessicastyle.com/portfolio', 4.8, 12, 'available'),
('16eebc99-9c0b-4ef8-bb6d-6bb9bd380177', 'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e55', 'tomtechreviews', 'Honest tech reviews and unboxings.', 25000, 8.5, 'Technology', 'Gadgets', 5000000.00, 2000000.00, 10000000.00, NULL, 'https://tiktok.com/@tomtech', 'https://youtube.com/TomTechReviews', 'https://tomtech.com/work', 4.9, 25, 'busy');

-- 3. Orders
INSERT INTO public.orders (id, sme_id, influencer_id, title, description, campaign_type, total_price, platform_commission, net_price, requirements, deadline, order_status, accepted_at, processing_at, completed_at) VALUES
('50eebc99-9c0b-4ef8-bb6d-6bb9bd380511', 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380f66', 'Summer Collection Promotion', 'Promote our new summer organic snacks on your IG story and feed.', 'endorsement', 1500000.00, 150000.00, 0, '3 stories, 1 post', '2023-12-01', 'completed', '2023-11-20 10:00:00+07', '2023-11-21 10:00:00+07', '2023-11-25 10:00:00+07'),
('61eebc99-9c0b-4ef8-bb6d-6bb9bd380622', 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c33', '16eebc99-9c0b-4ef8-bb6d-6bb9bd380177', 'Earbuds Review', 'Detailed video review of our new X-200 Earbuds.', 'review', 5000000.00, 500000.00, 0, 'Comparison with competitors', '2024-01-15', 'pending', NULL, NULL, NULL),
('72eebc99-9c0b-4ef8-bb6d-6bb9bd380733', 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380f66', 'Viral Snack Challenge', 'Create a fun challenge video with our snacks.', 'ugc', 2500000.00, 250000.00, 0, 'Must include hashtag #ViralSnack', '2023-12-20', 'processing', '2023-12-05 09:00:00+07', '2023-12-06 09:00:00+07', NULL),
('83eebc99-9c0b-4ef8-bb6d-6bb9bd380844', 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c33', '16eebc99-9c0b-4ef8-bb6d-6bb9bd380177', 'Tweet Promo', 'Just a quick shoutout.', 'shoutout', 500000.00, 50000.00, 0, 'Tag our official account', '2023-11-01', 'cancelled', NULL, NULL, NULL),
('94eebc99-9c0b-4ef8-bb6d-6bb9bd380955', 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380f66', 'Holiday Special', 'Christmas themed post.', 'endorsement', 1500000.00, 150000.00, 0, ' festive vibe', '2023-12-25', 'accepted', '2023-12-10 14:00:00+07', NULL, NULL);

-- 4. Reviews
INSERT INTO public.reviews (id, order_id, rating, comment, review_type, is_public) VALUES
('a5eebc99-9c0b-4ef8-bb6d-6bb9bd380a66', '50eebc99-9c0b-4ef8-bb6d-6bb9bd380511', 5, 'Jessica did an amazing job! Sales went up immediately.', 'sme_to_influencer', TRUE),
('b6eebc99-9c0b-4ef8-bb6d-6bb9bd380b77', '50eebc99-9c0b-4ef8-bb6d-6bb9bd380511', 5, 'Great working with SME One, very clear brief.', 'influencer_to_sme', TRUE),
('c7eebc99-9c0b-4ef8-bb6d-6bb9bd380c88', '72eebc99-9c0b-4ef8-bb6d-6bb9bd380733', 4, 'Great content, but slightly delayed posting.', 'sme_to_influencer', TRUE),
('d8eebc99-9c0b-4ef8-bb6d-6bb9bd380d99', '94eebc99-9c0b-4ef8-bb6d-6bb9bd380955', 5, 'Always a pleasure working with Jessica.', 'sme_to_influencer', TRUE),
('e9eebc99-9c0b-4ef8-bb6d-6bb9bd380e00', '94eebc99-9c0b-4ef8-bb6d-6bb9bd380955', 5, 'Great client, clear instructions!', 'influencer_to_sme', TRUE);
