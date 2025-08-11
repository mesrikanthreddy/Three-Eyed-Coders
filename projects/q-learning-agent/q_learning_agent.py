import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import os
from grid_world_env import GridWorldEnv, create_simple_grid_world, create_complex_grid_world

class QLearningAgent:
    """
    Q-Learning Agent for Grid World Environment
    """
    
    def __init__(self, env, learning_rate=0.1, discount_factor=0.95, 
                 epsilon=1.0, epsilon_decay=0.995, epsilon_min=0.01):
        """
        Initialize the Q-Learning agent.
        
        Args:
            env: GridWorld environment
            learning_rate (float): Learning rate (alpha)
            discount_factor (float): Discount factor (gamma)
            epsilon (float): Initial exploration rate
            epsilon_decay (float): Epsilon decay rate
            epsilon_min (float): Minimum epsilon value
        """
        self.env = env
        self.learning_rate = learning_rate
        self.discount_factor = discount_factor
        self.epsilon = epsilon
        self.epsilon_decay = epsilon_decay
        self.epsilon_min = epsilon_min
        
        # Initialize Q-table
        self.q_table = {}
        self._initialize_q_table()
    
    def _initialize_q_table(self):
        """Initialize Q-table with zeros for all state-action pairs."""
        for x in range(self.env.width):
            for y in range(self.env.height):
                state = (x, y)
                if state not in self.env.obstacle_positions and state != self.env.goal_position:
                    self.q_table[state] = np.zeros(len(self.env.actions))
    
    def _get_q_value(self, state, action):
        """Get Q-value for a state-action pair."""
        if state not in self.q_table:
            return 0.0
        return self.q_table[state][action]
    
    def _set_q_value(self, state, action, value):
        """Set Q-value for a state-action pair."""
        if state not in self.q_table:
            self.q_table[state] = np.zeros(len(self.env.actions))
        self.q_table[state][action] = value
    
    def _choose_action(self, state, explore=True):
        """Choose an action using epsilon-greedy policy."""
        if explore and np.random.random() < self.epsilon:
            # Explore: choose random action
            return np.random.choice(self.env.actions)
        else:
            # Exploit: choose best action
            if state not in self.q_table:
                return np.random.choice(self.env.actions)
            return np.argmax(self.q_table[state])
    
    def _update_q_value(self, state, action, reward, next_state, done):
        """Update Q-value using Q-learning update rule."""
        # Current Q-value
        current_q = self._get_q_value(state, action)
        
        # Next Q-value (max Q-value of next state)
        if done:
            next_q = 0
        else:
            if next_state not in self.q_table:
                next_q = 0
            else:
                next_q = np.max(self.q_table[next_state])
        
        # Q-learning update rule
        new_q = current_q + self.learning_rate * (
            reward + self.discount_factor * next_q - current_q
        )
        
        # Update Q-table
        self._set_q_value(state, action, new_q)
    
    def train(self, episodes=1000, max_steps=100, render_interval=100):
        """Train the agent using Q-learning."""
        episode_rewards = []
        episode_steps = []
        
        print(f"Starting training for {episodes} episodes...")
        
        for episode in range(episodes):
            # Reset environment
            state = self.env.reset()
            total_reward = 0
            steps = 0
            
            # Run episode
            for step in range(max_steps):
                # Choose action
                action = self._choose_action(state)
                
                # Take action
                next_state, reward, done = self.env.step(action)
                
                # Update Q-value
                self._update_q_value(state, action, reward, next_state, done)
                
                # Update state and total reward
                state = next_state
                total_reward += reward
                steps += 1
                
                # Check if episode is done
                if done:
                    break
            
            # Decay epsilon
            if self.epsilon > self.epsilon_min:
                self.epsilon *= self.epsilon_decay
            
            # Store episode results
            episode_rewards.append(total_reward)
            episode_steps.append(steps)
            
            # Print progress
            if (episode + 1) % render_interval == 0:
                avg_reward = np.mean(episode_rewards[-render_interval:])
                avg_steps = np.mean(episode_steps[-render_interval:])
                print(f"Episode {episode + 1}/{episodes} - "
                      f"Avg Reward: {avg_reward:.2f}, "
                      f"Avg Steps: {avg_steps:.2f}, "
                      f"Epsilon: {self.epsilon:.3f}")
        
        print("Training completed!")
        
        return episode_rewards, episode_steps
    
    def test(self, episodes=10, max_steps=100, render=True):
        """Test the trained agent."""
        print(f"\nTesting agent for {episodes} episodes...")
        
        total_rewards = []
        total_steps = []
        successes = 0
        
        for episode in range(episodes):
            state = self.env.reset()
            total_reward = 0
            steps = 0
            
            if render:
                print(f"\nEpisode {episode + 1}")
                print(f"Start position: {state}")
            
            for step in range(max_steps):
                # Choose best action (no exploration)
                action = self._choose_action(state, explore=False)
                
                # Take action
                next_state, reward, done = self.env.step(action)
                
                # Update state and total reward
                state = next_state
                total_reward += reward
                steps += 1
                
                if render:
                    print(f"Step {step + 1}: Action {self.env.action_names[action]}, "
                          f"Position {state}, Reward {reward:.1f}")
                
                if done:
                    if render:
                        print(f"Goal reached in {steps} steps with total reward {total_reward:.1f}")
                    successes += 1
                    break
            
            total_rewards.append(total_reward)
            total_steps.append(steps)
        
        avg_reward = np.mean(total_rewards)
        avg_steps = np.mean(total_steps)
        success_rate = successes / episodes
        
        print(f"\nTest Results:")
        print(f"Average Reward: {avg_reward:.2f}")
        print(f"Average Steps: {avg_steps:.2f}")
        print(f"Success Rate: {success_rate:.2%}")
        
        return total_rewards, total_steps, success_rate
    
    def get_policy(self):
        """Get the optimal policy from the Q-table."""
        policy = {}
        for state in self.q_table:
            policy[state] = np.argmax(self.q_table[state])
        return policy
    
    def save_q_table(self, filename='q_table.npy'):
        """Save the Q-table to a file."""
        # Create models directory if it doesn't exist
        if not os.path.exists('models'):
            os.makedirs('models')
        
        # Convert Q-table to a serializable format
        q_table_dict = {}
        for state, q_values in self.q_table.items():
            q_table_dict[str(state)] = q_values.tolist()
        
        # Save to file
        filepath = os.path.join('models', filename)
        np.save(filepath, q_table_dict)
        print(f"Q-table saved to {filepath}")
    
    def load_q_table(self, filename='q_table.npy'):
        """Load the Q-table from a file."""
        filepath = os.path.join('models', filename)
        if os.path.exists(filepath):
            q_table_dict = np.load(filepath, allow_pickle=True).item()
            
            # Convert back to Q-table format
            self.q_table = {}
            for state_str, q_values in q_table_dict.items():
                state = eval(state_str)  # Convert string back to tuple
                self.q_table[state] = np.array(q_values)
            
            print(f"Q-table loaded from {filepath}")
            return True
        else:
            print(f"File {filepath} not found")
            return False

def plot_training_results(episode_rewards, episode_steps):
    """Plot training results."""
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 5))
    
    # Plot rewards
    ax1.plot(episode_rewards)
    ax1.set_title('Episode Rewards')
    ax1.set_xlabel('Episode')
    ax1.set_ylabel('Total Reward')
    ax1.grid(True)
    
    # Plot steps
    ax2.plot(episode_steps)
    ax2.set_title('Episode Steps')
    ax2.set_xlabel('Episode')
    ax2.set_ylabel('Steps to Goal')
    ax2.grid(True)
    
    plt.tight_layout()
    plt.show()

def main():
    print("Q-Learning Agent for Grid World")
    print("=============================")
    
    # Create environment
    print("Creating grid world environment...")
    env = create_simple_grid_world()
    
    # Create agent
    print("Creating Q-learning agent...")
    agent = QLearningAgent(
        env,
        learning_rate=0.1,
        discount_factor=0.95,
        epsilon=1.0,
        epsilon_decay=0.995,
        epsilon_min=0.01
    )
    
    # Train agent
    print("\nTraining agent...")
    episode_rewards, episode_steps = agent.train(
        episodes=500,
        max_steps=100,
        render_interval=100
    )
    
    # Plot training results
    print("\nPlotting training results...")
    plot_training_results(episode_rewards, episode_steps)
    
    # Test agent
    print("\nTesting trained agent...")
    test_rewards, test_steps, success_rate = agent.test(
        episodes=5,
        max_steps=50,
        render=True
    )
    
    # Show policy
    print("\nLearned Policy:")
    policy = agent.get_policy()
    for state in sorted(policy.keys()):
        action_name = env.action_names[policy[state]]
        print(f"State {state}: {action_name}")
    
    # Render environment with policy
    print("\nRendering environment with learned policy...")
    env.reset()
    env.render(q_table=agent.q_table)
    
    # Save Q-table
    print("\nSaving Q-table...")
    agent.save_q_table()
    
    print("\nQ-learning demonstration completed!")

if __name__ == "__main__":
    main()
