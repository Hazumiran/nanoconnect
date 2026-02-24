Tabel yang dibutuhkan :

- Users (ID, Name, Email, Password, CreatedAt, UserType['sme', 'influencer', 'admin'])
- Influencers (ID, UserID, FollowersCount, EngagementRate, Niche, Price per Post, Etc)
- Order (ID, InluencerID, SMEID, OrderStatus['pending', 'completed', 'cancelled'], CreatedAt, CompletedAt, TotalPrice)
- Review (ID, OrderID, Rating, Comment, CreatedAt)