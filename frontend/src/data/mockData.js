// Dummy data matching enhanced_specdb.sql schema (for frontend development)

export const users = [
  { id: 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380d44', name: 'Jessica Style', email: 'jessica@example.com', avatar_url: 'https://ui-avatars.com/api/?name=Jessica+Style', location: 'Bali, ID', user_type: 'influencer' },
  { id: 'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e55', name: 'Tech Reviewer Tom', email: 'tom@example.com', avatar_url: 'https://ui-avatars.com/api/?name=Tom+Tech', location: 'Jakarta, ID', user_type: 'influencer' }
]

export const influencers = [
  {
    id: 'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380f66',
    user_id: 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380d44',
    username: 'jessicastyle',
    name: 'Jessica Style',
    bio: 'Fashion & Lifestyle Content Creator based in Bali.',
    followers_count: 50000,
    engagement_rate: 3.5,
    niche: 'Lifestyle',
    sub_niche: 'Fashion',
    price_per_post: 1500000,
    min_price: 1000000,
    max_price: 5000000,
    instagram_url: 'https://instagram.com/jessicastyle',
    tiktok_url: 'https://tiktok.com/@jessicavibes',
    portfolio_url: 'https://jessicastyle.com/portfolio',
    rating: 4.8,
    total_orders: 12,
    availability_status: 'available'
  },
  {
    id: '16eebc99-9c0b-4ef8-bb6d-6bb9bd380177',
    user_id: 'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e55',
    username: 'tomtechreviews',
    name: 'Tom Tech',
    bio: 'Honest tech reviews and unboxings.',
    followers_count: 25000,
    engagement_rate: 8.5,
    niche: 'Technology',
    sub_niche: 'Gadgets',
    price_per_post: 5000000,
    min_price: 2000000,
    max_price: 10000000,
    tiktok_url: 'https://tiktok.com/@tomtech',
    youtube_url: 'https://youtube.com/TomTechReviews',
    portfolio_url: 'https://tomtech.com/work',
    rating: 4.9,
    total_orders: 25,
    availability_status: 'busy'
  }
]

export const orders = [
  { id: '50eebc99-9c0b-4ef8-bb6d-6bb9bd380511', influencer_id: 'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380f66', sme_id: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', title: 'Summer Collection Promotion', campaign_type: 'endorsement', total_price: 1500000, order_status: 'completed' },
  { id: '61eebc99-9c0b-4ef8-bb6d-6bb9bd380622', influencer_id: '16eebc99-9c0b-4ef8-bb6d-6bb9bd380177', sme_id: 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c33', title: 'Earbuds Review', campaign_type: 'review', total_price: 5000000, order_status: 'pending' }
]

export const reviews = [
  { id: 'a5eebc99-9c0b-4ef8-bb6d-6bb9bd380a66', order_id: '50eebc99-9c0b-4ef8-bb6d-6bb9bd380511', rating: 5, comment: 'Jessica did an amazing job! Sales went up immediately.', review_type: 'sme_to_influencer' },
  { id: 'b6eebc99-9c0b-4ef8-bb6d-6bb9bd380b77', order_id: '50eebc99-9c0b-4ef8-bb6d-6bb9bd380511', rating: 5, comment: 'Great working with SME One, very clear brief.', review_type: 'influencer_to_sme' }
]

export default { users, influencers, orders, reviews }
