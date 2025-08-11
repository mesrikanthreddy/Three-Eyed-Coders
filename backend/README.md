# Backend

The API server for Three Eyed Coders.

## Technologies

- Node.js
- Express
- MongoDB
- JWT Authentication

## Features

- User authentication
- Project management
- Tutorial content delivery
- Forum functionality
- Analytics

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get specific project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tutorials
- `GET /api/tutorials` - Get all tutorials
- `GET /api/tutorials/:id` - Get specific tutorial

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables (see `.env.example`)

3. Start the server:
   ```
   npm start
   ```

## Project Structure

```
backend/
├── controllers/       # Request handlers
├── models/            # Database models
├── routes/            # API routes
├── middleware/        # Custom middleware
├── config/            # Configuration files
├── utils/             # Utility functions
├── server.js          # Entry point
└── .env.example       # Environment variables template
```

## Contributing

See the main CONTRIBUTING.md file for guidelines.

## License

This project is licensed under the YTT Global Services License - see the [LICENSE](../LICENSE) file for details.

Copyright information can be found in the [COPYRIGHT](../COPYRIGHT) file.
