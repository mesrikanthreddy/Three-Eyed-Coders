# Getting Started with Three Eyed Coders

This guide will help you get started with Three Eyed Coders, whether you're looking to learn, contribute, or both.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- Python (v3.8 or higher)
- Git

For backend development, you'll also need:
- MongoDB (local installation or cloud instance)

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/three-eyed-coders/three-eyed-coders.git
   cd three-eyed-coders
   ```

2. Set up the backend:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

3. Set up the frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. Access the application at `http://localhost:3000`

## Learning Path

If you're here to learn AI/ML:

1. Start with the [Beginner Tutorials](../tutorials/beginner/)
2. Explore [Community Projects](../projects/) to see real implementations
3. Experiment in the [Interactive Playground](../frontend/src/playground/)
4. Work through [Structured Learning Paths](../tutorials/)

## Contributing

If you want to contribute to the project:

1. Read our [Contribution Guidelines](../CONTRIBUTING.md)
2. Fork the repository
3. Create a new branch for your feature
4. Make your changes
5. Submit a pull request

### Contributing Projects

To contribute a project:

1. Create a new directory in `projects/` with your project name
2. Include a comprehensive README.md
3. Add all necessary source code
4. Include a requirements.txt or equivalent
5. Follow the project structure guidelines

### Contributing Tutorials

To contribute a tutorial:

1. Create a new directory in the appropriate level directory under `tutorials/`
2. Use the template in `tutorials/template/` as a starting point
3. Include code examples and explanations
4. Add exercises and further reading resources

## Development Setup

### Backend Development

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Development

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

## Project Ideas for Contributors

Here are some ideas for contributions:

### Beginner Projects
- Implement a k-means clustering algorithm
- Create a visualization of gradient descent
- Build a simple neural network from scratch

### Intermediate Projects
- Implement a convolutional neural network
- Create a sentiment analysis tool
- Build a recommendation system

### Advanced Projects
- Implement a transformer model
- Create a reinforcement learning agent
- Build a generative adversarial network

### Non-Code Contributions
- Improve documentation
- Create tutorials
- Curate datasets
- Design UI/UX improvements

## Need Help?

If you need help getting started:

1. Check the [documentation](./)
2. Open an issue on GitHub
3. Join our community discussion

Happy learning and contributing!
