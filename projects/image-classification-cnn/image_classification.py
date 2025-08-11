import tensorflow as tf
import numpy as np
import cv2
import matplotlib.pyplot as plt
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input, decode_predictions
from tensorflow.keras.preprocessing import image
import os

def load_and_preprocess_image(img_path, target_size=(224, 224)):
    """Load and preprocess an image for classification"""
    # Load image
    img = image.load_img(img_path, target_size=target_size)
    
    # Convert to array
    img_array = image.img_to_array(img)
    
    # Expand dimensions to match model input
    img_array = np.expand_dims(img_array, axis=0)
    
    # Preprocess for MobileNet
    img_array = preprocess_input(img_array)
    
    return img_array

def classify_image_with_mobilenet(img_path):
    """Classify an image using pre-trained MobileNet"""
    # Load pre-trained MobileNet model
    model = MobileNetV2(weights='imagenet')
    
    # Preprocess image
    img_array = load_and_preprocess_image(img_path)
    
    # Make predictions
    predictions = model.predict(img_array)
    
    # Decode predictions
    decoded_predictions = decode_predictions(predictions, top=3)[0]
    
    return decoded_predictions

def create_simple_cnn_model(input_shape=(150, 150, 3), num_classes=10):
    """Create a simple CNN model for image classification"""
    model = tf.keras.Sequential([
        tf.keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=input_shape),
        tf.keras.layers.MaxPooling2D(2, 2),
        tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
        tf.keras.layers.MaxPooling2D(2, 2),
        tf.keras.layers.Conv2D(128, (3, 3), activation='relu'),
        tf.keras.layers.MaxPooling2D(2, 2),
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(512, activation='relu'),
        tf.keras.layers.Dropout(0.5),
        tf.keras.layers.Dense(num_classes, activation='softmax')
    ])
    
    model.compile(optimizer='adam',
                  loss='categorical_crossentropy',
                  metrics=['accuracy'])
    
    return model

def visualize_predictions(img_path, predictions):
    """Visualize the image and its predictions"""
    # Load and display image
    img = cv2.imread(img_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    plt.figure(figsize=(8, 6))
    plt.imshow(img)
    plt.axis('off')
    
    # Create prediction text
    pred_text = "Top Predictions:\n"
    for i, (imagenet_id, label, score) in enumerate(predictions):
        pred_text += f"{i+1}. {label}: {score:.2f}\n"
    
    plt.title(pred_text, fontsize=12)
    plt.tight_layout()
    plt.show()

def main():
    print("Image Classification with CNN")
    print("============================")
    
    # Check if sample images directory exists
    if not os.path.exists('data'):
        print("Creating data directory for sample images...")
        os.makedirs('data')
        print("Please add sample images to the 'data' directory to test the classifier.")
        return
    
    # Get list of images in data directory
    image_files = [f for f in os.listdir('data') if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
    
    if not image_files:
        print("No images found in the 'data' directory. Please add some images to test.")
        return
    
    print(f"\nFound {len(image_files)} image(s) to classify.")
    
    # Process each image
    for img_file in image_files:
        img_path = os.path.join('data', img_file)
        print(f"\nClassifying: {img_file}")
        
        try:
            # Classify image with MobileNet
            predictions = classify_image_with_mobilenet(img_path)
            
            print("Top 3 predictions:")
            for i, (imagenet_id, label, score) in enumerate(predictions):
                print(f"  {i+1}. {label}: {score:.4f}")
            
            # Visualize (only for the first image to avoid too many plots)
            if image_files.index(img_file) == 0:
                visualize_predictions(img_path, predictions)
                
        except Exception as e:
            print(f"Error processing {img_file}: {str(e)}")
    
    # Show model architecture
    print("\nSample CNN Model Architecture:")
    model = create_simple_cnn_model()
    model.summary()

if __name__ == "__main__":
    main()
