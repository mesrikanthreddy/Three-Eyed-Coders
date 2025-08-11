import numpy as np
import matplotlib.pyplot as plt
from matplotlib.colors import ListedColormap
class GridWorldEnv:
    """
    A simple grid world environment for reinforcement learning.
    
    The agent starts at a random position and must reach the goal
    while avoiding obstacles.
    """
    
    def __init__(self, width=10, height=10, goal_position=None, obstacle_positions=None):
        """
        Initialize the grid world environment.
        
        Args:
            width (int): Width of the grid
            height (int): Height of the grid
            goal_position (tuple): (x, y) position of the goal
            obstacle_positions (list): List of (x, y) positions of obstacles
        """
        self.width = width
        self.height = height
        
        # Define positions
        self.goal_position = goal_position if goal_position else (width-1, height-1)
        self.obstacle_positions = obstacle_positions if obstacle_positions else [
            (2, 2), (2, 3), (2, 4), (3, 4), (4, 4), (5, 4), (6, 4), (7, 4)
        ]
        
        # Define actions: 0=up, 1=right, 2=down, 3=left
        self.actions = [0, 1, 2, 3]
        self.action_names = ['UP', 'RIGHT', 'DOWN', 'LEFT']
        
        # Initialize state
        self.reset()
    
    def reset(self):
        """Reset the environment to a random starting position."""
        # Find a valid starting position (not goal or obstacle)
        while True:
            self.agent_position = (np.random.randint(0, self.width), 
                                   np.random.randint(0, self.height))
            if (self.agent_position != self.goal_position and 
                self.agent_position not in self.obstacle_positions):
                break
        
        return self._get_state()
    
    def _get_state(self):
        """Get the current state as a tuple (x, y)."""
        return self.agent_position
    
    def _is_valid_position(self, position):
        """Check if a position is valid (within bounds and not an obstacle)."""
        x, y = position
        # Check bounds
        if x < 0 or x >= self.width or y < 0 or y >= self.height:
            return False
        # Check obstacles
        if position in self.obstacle_positions:
            return False
        return True
    
    def step(self, action):
        """
        Take a step in the environment.
        
        Args:
            action (int): Action to take (0=up, 1=right, 2=down, 3=left)
            
        Returns:
            tuple: (next_state, reward, done)
        """
        # Get current position
        x, y = self.agent_position
        
        # Update position based on action
        if action == 0:  # Up
            new_position = (x, y - 1)
        elif action == 1:  # Right
            new_position = (x + 1, y)
        elif action == 2:  # Down
            new_position = (x, y + 1)
        elif action == 3:  # Left
            new_position = (x - 1, y)
        else:
            raise ValueError("Invalid action")
        
        # Check if new position is valid
        if self._is_valid_position(new_position):
            self.agent_position = new_position
        
        # Calculate reward
        if self.agent_position == self.goal_position:
            reward = 10  # Goal reward
            done = True
        elif not self._is_valid_position(new_position):
            reward = -1  # Collision penalty
            done = False
        else:
            reward = -0.1  # Small step penalty
            done = False
        
        return self._get_state(), reward, done
    
    def render(self, q_table=None):
        """Render the environment."""
        # Create grid
        grid = np.zeros((self.height, self.width))
        
        # Mark obstacles
        for obs in self.obstacle_positions:
            grid[obs[1], obs[0]] = 1
        
        # Mark goal
        grid[self.goal_position[1], self.goal_position[0]] = 2
        
        # Mark agent
        grid[self.agent_position[1], self.agent_position[0]] = 3
        
        # Create colormap
        cmap = ListedColormap(['white', 'black', 'green', 'red'])
        
        # Plot
        plt.figure(figsize=(8, 8))
        plt.imshow(grid, cmap=cmap)
        
        # Add labels
        plt.title('Grid World Environment')
        plt.xlabel('X')
        plt.ylabel('Y')
        
        # Add colorbar labels
        cbar = plt.colorbar(ticks=[0, 1, 2, 3])
        cbar.ax.set_yticklabels(['Empty', 'Obstacle', 'Goal', 'Agent'])
        
        # Add grid lines
        plt.grid(True, color='black', linewidth=0.5)
        
        # Add text annotations for Q-values if provided
        if q_table is not None:
            for y in range(self.height):
                for x in range(self.width):
                    if (x, y) not in self.obstacle_positions and (x, y) != self.goal_position:
                        # Get Q-values for this state
                        state = (x, y)
                        if state in q_table:
                            q_values = q_table[state]
                            # Show best action
                            best_action = np.argmax(q_values)
                            action_symbol = ['↑', '→', '↓', '←'][best_action]
                            plt.text(x, y, action_symbol, ha='center', va='center', 
                                   fontsize=12, color='blue')
        
        plt.tight_layout()
        plt.show()
    
    def get_possible_actions(self, state):
        """Get possible actions from a state."""
        return self.actions
    
    def get_action_space_size(self):
        """Get the size of the action space."""
        return len(self.actions)
    
    def get_state_space_size(self):
        """Get the size of the state space."""
        return self.width * self.height

def create_simple_grid_world():
    """Create a simple grid world for testing."""
    return GridWorldEnv(width=5, height=5)

def create_complex_grid_world():
    """Create a more complex grid world with obstacles."""
    return GridWorldEnv(
        width=10, 
        height=10,
        goal_position=(9, 9),
        obstacle_positions=[
            (1, 1), (1, 2), (1, 3), (1, 4),
            (3, 1), (3, 2), (3, 3), (3, 4),
            (5, 5), (5, 6), (5, 7), (5, 8),
            (7, 1), (7, 2), (7, 3), (7, 4)
        ]
    )
