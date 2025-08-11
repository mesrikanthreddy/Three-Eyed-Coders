import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import pandas as pd

def generate_sample_data(n_samples=100):
    """Generate sample linear data with noise"""
    np.random.seed(42)
    X = np.random.rand(n_samples, 1) * 10
    y = 2.5 * X.squeeze() + 1.5 + np.random.randn(n_samples) * 2
    return X, y

class LinearRegressionFromScratch:
    """Linear Regression implemented from scratch using gradient descent"""
    
    def __init__(self, learning_rate=0.01, n_iterations=1000):
        self.learning_rate = learning_rate
        self.n_iterations = n_iterations
        self.weights = None
        self.bias = None
        self.cost_history = []
    
    def fit(self, X, y):
        """Train the model using gradient descent"""
        n_samples, n_features = X.shape
        
        # Initialize parameters
        self.weights = np.zeros(n_features)
        self.bias = 0
        
        # Gradient descent
        for i in range(self.n_iterations):
            # Forward pass
            y_predicted = np.dot(X, self.weights) + self.bias
            
            # Calculate cost
            cost = (1 / (2 * n_samples)) * np.sum((y_predicted - y) ** 2)
            self.cost_history.append(cost)
            
            # Calculate gradients
            dw = (1 / n_samples) * np.dot(X.T, (y_predicted - y))
            db = (1 / n_samples) * np.sum(y_predicted - y)
            
            # Update parameters
            self.weights -= self.learning_rate * dw
            self.bias -= self.learning_rate * db
    
    def predict(self, X):
        """Make predictions using the trained model"""
        return np.dot(X, self.weights) + self.bias

def main():
    print("Linear Regression Demo")
    print("=====================")
    
    # Generate sample data
    X, y = generate_sample_data()
    
    # Implement linear regression from scratch
    print("\n1. Implementing Linear Regression from Scratch...")
    model_scratch = LinearRegressionFromScratch(learning_rate=0.01, n_iterations=1000)
    model_scratch.fit(X, y)
    predictions_scratch = model_scratch.predict(X)
    
    # Use scikit-learn implementation
    print("\n2. Using Scikit-learn Implementation...")
    model_sklearn = LinearRegression()
    model_sklearn.fit(X, y)
    predictions_sklearn = model_sklearn.predict(X)
    
    # Calculate metrics
    mse_scratch = mean_squared_error(y, predictions_scratch)
    r2_scratch = r2_score(y, predictions_scratch)
    
    mse_sklearn = mean_squared_error(y, predictions_sklearn)
    r2_sklearn = r2_score(y, predictions_sklearn)
    
    print(f"\n3. Results Comparison:")
    print(f"   From Scratch - MSE: {mse_scratch:.2f}, R²: {r2_scratch:.4f}")
    print(f"   Scikit-learn - MSE: {mse_sklearn:.2f}, R²: {r2_sklearn:.4f}")
    
    # Visualization
    plt.figure(figsize=(15, 5))
    
    # Plot 1: Data and regression lines
    plt.subplot(1, 3, 1)
    plt.scatter(X, y, alpha=0.6, label='Data points')
    plt.plot(X, predictions_scratch, color='red', label='From Scratch')
    plt.plot(X, predictions_sklearn, color='green', linestyle='--', label='Scikit-learn')
    plt.xlabel('X')
    plt.ylabel('y')
    plt.title('Linear Regression Comparison')
    plt.legend()
    
    # Plot 2: Cost function convergence
    plt.subplot(1, 3, 2)
    plt.plot(model_scratch.cost_history)
    plt.xlabel('Iterations')
    plt.ylabel('Cost')
    plt.title('Cost Function Convergence')
    
    # Plot 3: Residuals
    plt.subplot(1, 3, 3)
    residuals_scratch = y - predictions_scratch
    residuals_sklearn = y - predictions_sklearn
    plt.scatter(predictions_scratch, residuals_scratch, alpha=0.6, label='From Scratch')
    plt.scatter(predictions_sklearn, residuals_sklearn, alpha=0.6, label='Scikit-learn')
    plt.axhline(y=0, color='r', linestyle='--')
    plt.xlabel('Predicted Values')
    plt.ylabel('Residuals')
    plt.title('Residual Plot')
    plt.legend()
    
    plt.tight_layout()
    plt.show()
    
    print("\n4. Visualization complete. Check the plots for results.")

if __name__ == "__main__":
    main()
