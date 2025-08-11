/*
 * Copyright (c) 2025 YTT Global Services
 * 
 * This software is the confidential and proprietary information of YTT Global Services.
 * You shall not disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into with YTT Global Services.
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Three Eyed Coders API', 
    version: '1.0.0',
    description: 'Backend API for the open-source Three Eyed Coders platform'
  });
});

// Placeholder routes
app.get('/api/projects', (req, res) => {
  // In a real implementation, this would fetch from a database
  res.json([
    {
      id: 1,
      title: 'Linear Regression Demo',
      description: 'A simple demonstration of linear regression implementation',
      author: 'AI/ML Community',
      category: 'Beginner',
      createdAt: '2025-01-15'
    }
  ]);
});

app.get('/api/tutorials', (req, res) => {
  // In a real implementation, this would fetch from a database
  res.json([
    {
      id: 1,
      title: 'Introduction to Machine Learning',
      description: 'Learn the fundamentals of ML algorithms and techniques',
      level: 'Beginner',
      duration: '4 weeks'
    }
  ]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
