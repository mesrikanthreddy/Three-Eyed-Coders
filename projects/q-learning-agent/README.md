# Q-Learning Agent for Grid World

A reinforcement learning project that demonstrates Q-learning algorithm implementation for solving a grid world navigation problem.

## Overview

This project implements a Q-learning agent that learns to navigate a grid world environment to reach a goal while avoiding obstacles. The agent learns an optimal policy through trial and error interaction with the environment.

## Features

- Custom grid world environment implementation
- Q-learning algorithm with epsilon-greedy exploration
- Visualization of agent learning progress
- Policy and value function visualization
- Performance metrics and learning curves

## Technologies Used

- Python 3.x
- NumPy
- Matplotlib
- Pandas
- Gym (for environment interface)

## How to Run

1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Run the Q-learning agent:
   ```
   python q_learning_agent.py
   ```

3. To run hyperparameter tuning:
   ```
   python tune_hyperparameters.py
   ```

## Project Structure

- `q_learning_agent.py`: Main Q-learning implementation
- `grid_world_env.py`: Custom grid world environment
- `tune_hyperparameters.py`: Hyperparameter tuning script
- `requirements.txt`: Python dependencies
- `results/`: Generated plots and outputs
- `models/`: Saved Q-tables

## Results

The agent will learn to navigate the grid world efficiently, finding the shortest path to the goal while avoiding obstacles.

## License

MIT License
