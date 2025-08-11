import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Embedding
from tensorflow.keras.optimizers import Adam
import matplotlib.pyplot as plt
import os

class TextGenerator:
    """
    Text Generator using LSTM neural networks
    """
    
    def __init__(self, sequence_length=40):
        """
        Initialize the text generator.
        
        Args:
            sequence_length (int): Length of input sequences
        """
        self.sequence_length = sequence_length
        self.model = None
        self.char_to_idx = None
        self.idx_to_char = None
        self.vocab_size = None
    
    def preprocess_text(self, text):
        """Preprocess text and create character mappings."""
        # Get unique characters
        chars = sorted(list(set(text)))
        self.vocab_size = len(chars)
        
        # Create character to index mappings
        self.char_to_idx = {char: idx for idx, char in enumerate(chars)}
        self.idx_to_char = {idx: char for idx, char in enumerate(chars)}
        
        print(f"Vocabulary size: {self.vocab_size}")
        print(f"Characters: {''.join(chars)}")
        
        return chars
    
    def create_sequences(self, text):
        """Create input-output sequences for training."""
        # Convert text to indices
        text_indices = [self.char_to_idx[char] for char in text]
        
        # Create sequences
        sequences = []
        next_chars = []
        
        for i in range(len(text_indices) - self.sequence_length):
            sequences.append(text_indices[i:i + self.sequence_length])
            next_chars.append(text_indices[i + self.sequence_length])
        
        # Convert to numpy arrays
        X = np.array(sequences)
        y = np.array(next_chars)
        
        print(f"Created {len(X)} sequences")
        
        return X, y
    
    def create_model(self, embedding_dim=50, lstm_units=128):
        """Create LSTM model for text generation."""
        self.model = Sequential([
            Embedding(self.vocab_size, embedding_dim, input_length=self.sequence_length),
            LSTM(lstm_units, return_sequences=True),
            LSTM(lstm_units),
            Dense(self.vocab_size, activation='softmax')
        ])
        
        self.model.compile(
            optimizer=Adam(learning_rate=0.001),
            loss='sparse_categorical_crossentropy',
            metrics=['accuracy']
        )
        
        print("Model created successfully!")
        self.model.summary()
        
        return self.model
    
    def train(self, X, y, epochs=50, batch_size=128, validation_split=0.1):
        """Train the text generation model."""
        if self.model is None:
            raise ValueError("Model not created. Call create_model() first.")
        
        # Create models directory if it doesn't exist
        if not os.path.exists('models'):
            os.makedirs('models')
        
        # Callbacks
        checkpoint_cb = tf.keras.callbacks.ModelCheckpoint(
            'models/text_gen_model.h5',
            save_best_only=True,
            monitor='val_loss',
            mode='min'
        )
        
        early_stopping_cb = tf.keras.callbacks.EarlyStopping(
            monitor='val_loss',
            patience=5,
            restore_best_weights=True
        )
        
        # Train model
        print("Starting training...")
        history = self.model.fit(
            X, y,
            epochs=epochs,
            batch_size=batch_size,
            validation_split=validation_split,
            callbacks=[checkpoint_cb, early_stopping_cb],
            verbose=1
        )
        
        return history
    
    def generate_text(self, seed_text, length=200, temperature=1.0):
        """Generate text using the trained model."""
        if self.model is None:
            raise ValueError("Model not trained. Train the model first.")
        
        # Prepare seed text
        if len(seed_text) < self.sequence_length:
            # Pad with spaces if too short
            seed_text = seed_text.ljust(self.sequence_length)
        elif len(seed_text) > self.sequence_length:
            # Truncate if too long
            seed_text = seed_text[-self.sequence_length:]
        
        # Convert seed text to indices
        generated_text = seed_text
        pattern = [self.char_to_idx[char] for char in seed_text]
        
        # Generate characters
        for _ in range(length):
            # Prepare input
            x = np.reshape(pattern, (1, len(pattern)))
            
            # Predict next character
            prediction = self.model.predict(x, verbose=0)[0]
            
            # Apply temperature
            prediction = np.log(prediction + 1e-8) / temperature
            exp_preds = np.exp(prediction)
            prediction = exp_preds / np.sum(exp_preds)
            
            # Sample next character
            next_idx = np.random.choice(len(prediction), p=prediction)
            next_char = self.idx_to_char[next_idx]
            
            # Add to generated text
            generated_text += next_char
            
            # Update pattern
            pattern.append(next_idx)
            pattern = pattern[1:]
        
        return generated_text
    
    def save_model(self, filepath='models/text_gen_model.h5'):
        """Save the trained model."""
        if self.model is None:
            raise ValueError("No model to save.")
        
        # Create models directory if it doesn't exist
        if not os.path.exists('models'):
            os.makedirs('models')
        
        self.model.save(filepath)
        print(f"Model saved to {filepath}")
        
        # Save character mappings
        mappings = {
            'char_to_idx': self.char_to_idx,
            'idx_to_char': self.idx_to_char,
            'vocab_size': self.vocab_size,
            'sequence_length': self.sequence_length
        }
        np.save('models/char_mappings.npy', mappings)
        print("Character mappings saved.")
    
    def load_model(self, model_path='models/text_gen_model.h5', mappings_path='models/char_mappings.npy'):
        """Load a trained model and character mappings."""
        # Load model
        self.model = tf.keras.models.load_model(model_path)
        print(f"Model loaded from {model_path}")
        
        # Load character mappings
        mappings = np.load(mappings_path, allow_pickle=True).item()
        self.char_to_idx = mappings['char_to_idx']
        self.idx_to_char = mappings['idx_to_char']
        self.vocab_size = mappings['vocab_size']
        self.sequence_length = mappings['sequence_length']
        print("Character mappings loaded.")

def plot_training_history(history):
    """Plot training history."""
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))
    
    # Plot loss
    ax1.plot(history.history['loss'], label='Training Loss')
    ax1.plot(history.history['val_loss'], label='Validation Loss')
    ax1.set_title('Model Loss')
    ax1.set_xlabel('Epoch')
    ax1.set_ylabel('Loss')
    ax1.legend()
    ax1.grid(True)
    
    # Plot accuracy
    ax2.plot(history.history['accuracy'], label='Training Accuracy')
    ax2.plot(history.history['val_accuracy'], label='Validation Accuracy')
    ax2.set_title('Model Accuracy')
    ax2.set_xlabel('Epoch')
    ax2.set_ylabel('Accuracy')
    ax2.legend()
    ax2.grid(True)
    
    plt.tight_layout()
    plt.show()

def load_sample_text(filepath='data/sample_text.txt'):
    """Load sample text from file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            text = f.read()
        print(f"Loaded {len(text)} characters from {filepath}")
        return text
    except FileNotFoundError:
        print(f"File {filepath} not found. Creating sample text...")
        # Create sample text if file doesn't exist
        sample_text = """To be, or not to be, that is the question:
Whether 'tis nobler in the mind to suffer
The slings and arrows of outrageous fortune,
Or to take arms against a sea of troubles
And by opposing end them. To die—to sleep,
No more; and by a sleep to say we end
The heart-ache and the thousand natural shocks
That flesh is heir to: 'tis a consummation
Devoutly to be wish'd. To die, to sleep;
To sleep, perchance to dream—ay, there's the rub:
For in that sleep of death what dreams may come,
When we have shuffled off this mortal coil,
Must give us pause—there's the respect
That makes calamity of so long life."""
        return sample_text

def main():
    print("Text Generation with LSTM")
    print("========================")
    
    # Load sample text
    print("\nLoading sample text...")
    text = load_sample_text()
    
    # Create text generator
    print("\nCreating text generator...")
    generator = TextGenerator(sequence_length=40)
    
    # Preprocess text
    print("\nPreprocessing text...")
    chars = generator.preprocess_text(text)
    
    # Create sequences
    print("\nCreating sequences...")
    X, y = generator.create_sequences(text)
    
    # Create model
    print("\nCreating model...")
    model = generator.create_model(embedding_dim=50, lstm_units=128)
    
    # Train model (with a small number of epochs for demo)
    print("\nTraining model...")
    history = generator.train(X, y, epochs=10, batch_size=64)
    
    # Plot training history
    print("\nPlotting training history...")
    plot_training_history(history)
    
    # Generate text
    print("\nGenerating text...")
    seed_text = "To be or not to "
    generated_text = generator.generate_text(seed_text, length=200, temperature=0.5)
    
    print("\nGenerated text:")
    print(generated_text)
    
    # Save model
    print("\nSaving model...")
    generator.save_model()
    
    print("\nText generation demonstration completed!")

if __name__ == "__main__":
    main()
