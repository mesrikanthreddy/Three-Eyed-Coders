import numpy as np
import matplotlib.pyplot as plt
from grid_world_env import create_simple_grid_world
from q_learning_agent import QLearningAgent

def evaluate_hyperparameters(learning_rates, discount_factors, epsilon_decays, episodes=200):
    """Evaluate different hyperparameter combinations."""
    results = []
    
    total_combinations = len(learning_rates) * len(discount_factors) * len(epsilon_decays)
    print(f"Evaluating {total_combinations} hyperparameter combinations...")
    
    combination_count = 0
    
    for lr in learning_rates:
        for df in discount_factors:
            for ed in epsilon_decays:
                combination_count += 1
                print(f"\nCombination {combination_count}/{total_combinations}: "
                      f"LR={lr}, DF={df}, ED={ed}")
                
                # Create environment and agent
                env = create_simple_grid_world()
                agent = QLearningAgent(
                    env,
                    learning_rate=lr,
                    discount_factor=df,
                    epsilon=1.0,
                    epsilon_decay=ed,
                    epsilon_min=0.01
                )
                
                # Train agent
                episode_rewards, episode_steps = agent.train(
                    episodes=episodes,
                    max_steps=100,
                    render_interval=episodes//2  # Only print halfway through
                )
                
                # Test agent
                test_rewards, test_steps, success_rate = agent.test(
                    episodes=20,
                    max_steps=50,
                    render=False  # Don't render during testing
                )
                
                # Calculate metrics
                avg_training_reward = np.mean(episode_rewards[-50:])  # Last 50 episodes
                avg_training_steps = np.mean(episode_steps[-50:])
                avg_test_reward = np.mean(test_rewards)
                avg_test_steps = np.mean(test_steps)
                
                # Store results
                result = {
                    'learning_rate': lr,
                    'discount_factor': df,
                    'epsilon_decay': ed,
                    'avg_training_reward': avg_training_reward,
                    'avg_training_steps': avg_training_steps,
                    'avg_test_reward': avg_test_reward,
                    'avg_test_steps': avg_test_steps,
                    'success_rate': success_rate
                }
                
                results.append(result)
                
                print(f"  Avg Training Reward: {avg_training_reward:.2f}")
                print(f"  Avg Training Steps: {avg_training_steps:.2f}")
                print(f"  Avg Test Reward: {avg_test_reward:.2f}")
                print(f"  Avg Test Steps: {avg_test_steps:.2f}")
                print(f"  Success Rate: {success_rate:.2%}")
    
    return results

def plot_hyperparameter_results(results):
    """Plot hyperparameter tuning results."""
    if not results:
        print("No results to plot")
        return
    
    # Convert results to arrays for easier plotting
    learning_rates = [r['learning_rate'] for r in results]
    discount_factors = [r['discount_factor'] for r in results]
    epsilon_decays = [r['epsilon_decay'] for r in results]
    success_rates = [r['success_rate'] for r in results]
    test_rewards = [r['avg_test_reward'] for r in results]
    
    # Create plots
    fig, axes = plt.subplots(2, 2, figsize=(15, 10))
    
    # Success rate vs learning rate
    axes[0, 0].scatter(learning_rates, success_rates, alpha=0.7)
    axes[0, 0].set_xlabel('Learning Rate')
    axes[0, 0].set_ylabel('Success Rate')
    axes[0, 0].set_title('Success Rate vs Learning Rate')
    axes[0, 0].grid(True)
    
    # Success rate vs discount factor
    axes[0, 1].scatter(discount_factors, success_rates, alpha=0.7)
    axes[0, 1].set_xlabel('Discount Factor')
    axes[0, 1].set_ylabel('Success Rate')
    axes[0, 1].set_title('Success Rate vs Discount Factor')
    axes[0, 1].grid(True)
    
    # Success rate vs epsilon decay
    axes[1, 0].scatter(epsilon_decays, success_rates, alpha=0.7)
    axes[1, 0].set_xlabel('Epsilon Decay')
    axes[1, 0].set_ylabel('Success Rate')
    axes[1, 0].set_title('Success Rate vs Epsilon Decay')
    axes[1, 0].grid(True)
    
    # Test reward vs success rate
    axes[1, 1].scatter(success_rates, test_rewards, alpha=0.7)
    axes[1, 1].set_xlabel('Success Rate')
    axes[1, 1].set_ylabel('Average Test Reward')
    axes[1, 1].set_title('Test Reward vs Success Rate')
    axes[1, 1].grid(True)
    
    plt.tight_layout()
    plt.show()

def find_best_hyperparameters(results):
    """Find the best hyperparameter combination based on success rate."""
    if not results:
        return None
    
    best_result = max(results, key=lambda x: x['success_rate'])
    return best_result

def main():
    print("Hyperparameter Tuning for Q-Learning Agent")
    print("==========================================")
    
    # Define hyperparameter ranges
    learning_rates = [0.01, 0.1, 0.5]
    discount_factors = [0.9, 0.95, 0.99]
    epsilon_decays = [0.99, 0.995, 0.999]
    
    # Evaluate hyperparameters
    results = evaluate_hyperparameters(
        learning_rates,
        discount_factors,
        epsilon_decays,
        episodes=300
    )
    
    # Plot results
    print("\nPlotting hyperparameter tuning results...")
    plot_hyperparameter_results(results)
    
    # Find best hyperparameters
    best_result = find_best_hyperparameters(results)
    
    if best_result:
        print("\nBest Hyperparameter Combination:")
        print(f"  Learning Rate: {best_result['learning_rate']}")
        print(f"  Discount Factor: {best_result['discount_factor']}")
        print(f"  Epsilon Decay: {best_result['epsilon_decay']}")
        print(f"  Success Rate: {best_result['success_rate']:.2%}")
        print(f"  Average Test Reward: {best_result['avg_test_reward']:.2f}")
    else:
        print("\nNo results found.")

if __name__ == "__main__":
    main()
