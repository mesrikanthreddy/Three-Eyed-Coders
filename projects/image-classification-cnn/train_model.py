import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import matplotlib.pyplot as plt
import numpy as np
import os

def create_cnn_model(input_shape=(150, 150, 3), num_classes=5):
    """Create a CNN model for image classification"""
    model = tf.keras.Sequential([
        # First convolutional block
        tf.keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=input_shape),
        tf.keras.layers.MaxPooling2D(2, 2),
        
        # Second convolutional block
        tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
        tf.keras.layers.MaxPooling2D(2, 2),
        
        # Third convolutional block
        tf.keras.layers.Conv2D(128, (3, 3), activation='relu'),
        tf.keras.layers.MaxPooling2D(2, 2),
        
        # Fourth convolutional block
        tf.keras.layers.Conv2D(128, (3, 3), activation='relu'),
        tf.keras.layers.MaxPooling2D(2, 2),
        
        # Flatten and dense layers
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dropout(0.5),
        tf.keras.layers.Dense(512, activation='relu'),
        tf.keras.layers.Dense(num_classes, activation='softmax')
    ])
    
    return model

def create_data_generators(train_dir, validation_dir, img_size=(150, 150), batch_size=32):
    """Create data generators for training and validation"""
    # Data augmentation for training
    train_datagen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=40,
        width_shift_range=0.2,
        height_shift_range=0.2,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True,
        fill_mode='nearest'
    )
    
    # Only rescaling for validation
    validation_datagen = ImageDataGenerator(rescale=1./255)
    
    # Create generators
    train_generator = train_datagen.flow_from_directory(
        train_dir,
        target_size=img_size,
        batch_size=batch_size,
        class_mode='categorical'
    )
    
    validation_generator = validation_datagen.flow_from_directory(
        validation_dir,
        target_size=img_size,
        batch_size=batch_size,
        class_mode='categorical'
    )
    
    return train_generator, validation_generator

def plot_training_history(history):
    """Plot training and validation accuracy and loss"""
    acc = history.history['accuracy']
    val_acc = history.history['val_accuracy']
    loss = history.history['loss']
    val_loss = history.history['val_loss']
    
    epochs = range(len(acc))
    
    plt.figure(figsize=(12, 4))
    
    plt.subplot(1, 2, 1)
    plt.plot(epochs, acc, 'bo', label='Training accuracy')
    plt.plot(epochs, val_acc, 'b', label='Validation accuracy')
    plt.title('Training and Validation Accuracy')
    plt.legend()
    
    plt.subplot(1, 2, 2)
    plt.plot(epochs, loss, 'bo', label='Training loss')
    plt.plot(epochs, val_loss, 'b', label='Validation loss')
    plt.title('Training and Validation Loss')
    plt.legend()
    
    plt.show()

def main():
    print("Training Custom CNN Model")
    print("========================")
    
    # Check if data directories exist
    train_dir = 'data/train'
    validation_dir = 'data/validation'
    
    if not (os.path.exists(train_dir) and os.path.exists(validation_dir)):
        print("Data directories not found. Please organize your data in the following structure:")
        print("data/")
        print("  train/")
        print("    class1/")
        print("    class2/")
        print("    ...")
        print("  validation/")
        print("    class1/")
        print("    class2/")
        print("    ...")
        return
    
    # Get number of classes
    class_names = os.listdir(train_dir)
    num_classes = len(class_names)
    print(f"Number of classes: {num_classes}")
    print(f"Classes: {class_names}")
    
    # Create data generators
    print("\nCreating data generators...")
    train_gen, val_gen = create_data_generators(train_dir, validation_dir)
    
    # Create model
    print("\nCreating model...")
    model = create_cnn_model(num_classes=num_classes)
    
    # Compile model
    model.compile(
        loss='categorical_crossentropy',
        optimizer=tf.keras.optimizers.Adam(learning_rate=1e-4),
        metrics=['accuracy']
    )
    
    # Display model architecture
    model.summary()
    
    # Create callbacks
    checkpoint_cb = tf.keras.callbacks.ModelCheckpoint(
        'models/best_model.h5',
        save_best_only=True,
        monitor='val_accuracy',
        mode='max'
    )
    
    early_stopping_cb = tf.keras.callbacks.EarlyStopping(
        monitor='val_loss',
        patience=5,
        restore_best_weights=True
    )
    
    # Create models directory if it doesn't exist
    if not os.path.exists('models'):
        os.makedirs('models')
    
    # Train model
    print("\nStarting training...")
    history = model.fit(
        train_gen,
        epochs=20,
        validation_data=val_gen,
        callbacks=[checkpoint_cb, early_stopping_cb]
    )
    
    # Plot training history
    print("\nPlotting training history...")
    plot_training_history(history)
    
    # Save final model
    model.save('models/final_model.h5')
    print("\nModel saved to 'models/final_model.h5'")
    
    # Evaluate model
    print("\nEvaluating model...")
    val_loss, val_acc = model.evaluate(val_gen)
    print(f"Validation accuracy: {val_acc:.4f}")

if __name__ == "__main__":
    main()
