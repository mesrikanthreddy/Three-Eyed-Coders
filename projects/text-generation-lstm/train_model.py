import numpy as np
import tensorflow as tf
from tensorflow.keras.optimizers import Adam
import matplotlib.pyplot as plt
import os
from text_generation import TextGenerator, plot_training_history, load_sample_text

def experiment_with_hyperparameters():
    """Experiment with different hyperparameters for text generation."""
    print("Experimenting with different hyperparameters...")
    
    # Load sample text
    text = load_sample_text()
    
    # Define hyperparameter combinations
    hyperparams = [
        {'sequence_length': 30, 'embedding_dim': 50, 'lstm_units': 64},
        {'sequence_length': 40, 'embedding_dim': 50, 'lstm_units': 128},
        {'sequence_length': 50, 'embedding_dim': 100, 'lstm_units': 128},
    ]
    
    results = []
    
    for i, params in enumerate(hyperparams):
        print(f"\nExperiment {i+1}/{len(hyperparams)}: {params}")
        
        # Create text generator
        generator = TextGenerator(sequence_length=params['sequence_length'])
        
        # Preprocess text
        generator.preprocess_text(text)
        
        # Create sequences
        X, y = generator.create_sequences(text)
        
        # Create model
        model = generator.create_model(
            embedding_dim=params['embedding_dim'],
            lstm_units=params['lstm_units']
        )
        
        # Train model
        print("Training model...")
        history = generator.train(
            X, y,
            epochs=20,
            batch_size=64,
            validation_split=0.1
        )
        
        # Evaluate model
        final_loss = history.history['loss'][-1]
        final_val_loss = history.history['val_loss'][-1]
        final_accuracy = history.history['accuracy'][-1]
        final_val_accuracy = history.history['val_accuracy'][-1]
        
        # Store results
        result = {
            'params': params,
            'final_loss': final_loss,
            'final_val_loss': final_val_loss,
            'final_accuracy': final_accuracy,
            'final_val_accuracy': final_val_accuracy,
            'history': history
        }
        results.append(result)
        
        # Save model
        model_name = f"model_exp_{i+1}"
        model_path = f"models/{model_name}.h5"
        generator.save_model(model_path)
        
        print(f"Model saved as {model_name}")
        
        # Generate sample text
        seed_text = "To be or not"
        generated_text = generator.generate_text(seed_text, length=100, temperature=0.5)
        
        print(f"Sample generated text:\n{generated_text}\n")
    
    return results

def compare_models(results):
    """Compare different models based on their performance."""
    print("\nComparing models:")
    
    fig, axes = plt.subplots(2, 2, figsize=(15, 10))
    
    for i, result in enumerate(results):
        params = result['params']
        history = result['history']
        label = f"SeqLen={params['sequence_length']}, Emb={params['embedding_dim']}, LSTM={params['lstm_units']}"
        
        # Plot training loss
        axes[0, 0].plot(history.history['loss'], label=label)
        axes[0, 0].set_title('Training Loss')
        axes[0, 0].set_xlabel('Epoch')
        axes[0, 0].set_ylabel('Loss')
        axes[0, 0].legend()
        axes[0, 0].grid(True)
        
        # Plot validation loss
        axes[0, 1].plot(history.history['val_loss'], label=label)
        axes[0, 1].set_title('Validation Loss')
        axes[0, 1].set_xlabel('Epoch')
        axes[0, 1].set_ylabel('Loss')
        axes[0, 1].legend()
        axes[0, 1].grid(True)
        
        # Plot training accuracy
        axes[1, 0].plot(history.history['accuracy'], label=label)
        axes[1, 0].set_title('Training Accuracy')
        axes[1, 0].set_xlabel('Epoch')
        axes[1, 0].set_ylabel('Accuracy')
        axes[1, 0].legend()
        axes[1, 0].grid(True)
        
        # Plot validation accuracy
        axes[1, 1].plot(history.history['val_accuracy'], label=label)
        axes[1, 1].set_title('Validation Accuracy')
        axes[1, 1].set_xlabel('Epoch')
        axes[1, 1].set_ylabel('Accuracy')
        axes[1, 1].legend()
        axes[1, 1].grid(True)
    
    plt.tight_layout()
    plt.show()
    
    # Print final metrics
    print("\nFinal Metrics:")
    for i, result in enumerate(results):
        params = result['params']
        print(f"\nModel {i+1}: SeqLen={params['sequence_length']}, "
              f"Emb={params['embedding_dim']}, LSTM={params['lstm_units']}")
        print(f"  Final Training Loss: {result['final_loss']:.4f}")
        print(f"  Final Validation Loss: {result['final_val_loss']:.4f}")
        print(f"  Final Training Accuracy: {result['final_accuracy']:.4f}")
        print(f"  Final Validation Accuracy: {result['final_val_accuracy']:.4f}")

def generate_with_different_temperatures(generator, seed_text):
    """Generate text with different temperature values."""
    temperatures = [0.2, 0.5, 1.0, 1.5]
    
    print(f"\nGenerating text with different temperatures (seed: '{seed_text}'):")
    
    for temp in temperatures:
        generated_text = generator.generate_text(seed_text, length=150, temperature=temp)
        print(f"\nTemperature {temp}:\n{generated_text}\n")

def main():
    print("Training Text Generation Models")
    print("==============================")
    
    # Experiment with hyperparameters
    results = experiment_with_hyperparameters()
    
    # Compare models
    compare_models(results)
    
    # Load the best model (for demonstration, we'll use the last one)
    if results:
        best_result = results[-1]
        print("\nLoading best model for temperature experiments...")
        
        # For simplicity, we'll create a new generator and load the model
        # In practice, you would load the specific model you want
        text = load_sample_text()
        generator = TextGenerator(sequence_length=best_result['params']['sequence_length'])
        generator.preprocess_text(text)
        
        # Generate text with different temperatures
        generate_with_different_temperatures(generator, "To be or not to")
    
    print("\nHyperparameter tuning and comparison completed!")

if __name__ == "__main__":
    main()
