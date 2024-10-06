# Aspire Connect

A user-focused platform designed to connect individuals based on shared goals, aspirations, or other criteria. The system includes user profiles, match recommendations powered by machine learning (ML), and real-time messaging for matched users.

## System Design
![image](https://github.com/user-attachments/assets/1b9edbc0-a857-4df1-99ae-eab8d9b21bbc)



## Features

1. **User Profile Service**  
   Users can create and manage their profiles, which include personal information and image links stored via a CDN.

2. **ML-Powered Match Recommendations**  
   An ML model fetches user profiles and suggests matches based on shared criteria like goals, interests, or other metrics.

3. **Real-Time Chat for Matched Users**  
   Once matched, users can communicate through a real-time chat system.

## Technology Stack

- **Backend:**
  - **Node.js (Express):** API gateway and services.
  - **Machine Learning:** Custom ML model to calculate and recommend matches.
  
- **Database:**
  - **PostgreSQL:** Stores user profiles and match data.
  - **Cassandra:** Handles real-time chat messaging.

- **Frontend:**
  - **Next.js:** Client-side application built using React for dynamic interaction and a seamless user experience.
  - **Tailwind CSS:** For responsive design and a modern UI.

## Database Design

### User Profiles (PostgreSQL)
The profile service stores user data such as:
- User ID
- Username
- Email
- Bio
- Profile image URL
- Location
- Interests
- Social media links

### Match Data (PostgreSQL)
A table to store user matches:
- Match ID
- User IDs (for the two matched users)
- Match score (optional)
- Match status (e.g., pending, accepted, rejected)

### Real-Time Chat (Cassandra)
Used to store chat messages for matched users:
- User IDs
- Timestamp
- Message content

## API Endpoints

- **POST** `/api/users`: Create a new user profile.
- **GET** `/api/users/:id`: Retrieve user profile by ID.
- **GET** `/api/matches`: Get recommended matches.
- **POST** `/api/chat`: Send a message to a matched user.

## Future Enhancements

- **Video Calling:** Add real-time video chat functionality for matched users.
- **Group Chats:** Allow users to create and participate in group chats around shared interests.
- **Match History:** Show a history of previous matches and conversations.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request to contribute.
