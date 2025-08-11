# Image Classification with CNN

A computer vision project that demonstrates image classification using Convolutional Neural Networks (CNNs) with TensorFlow/Keras.

## Overview

This project implements an image classification system using Convolutional Neural Networks to classify images into different categories. It includes both a pre-trained model approach using MobileNet and a custom CNN implementation trained on a small dataset.

## Features

- Image preprocessing pipeline
- Pre-trained MobileNet model for transfer learning
- Custom CNN implementation
- Model evaluation and visualization
- Prediction interface

## Technologies Used

- Python 3.x
- TensorFlow/Keras
- OpenCV
- NumPy
- Matplotlib
- Scikit-learn

## How to Run

1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Run the image classification demo:
   ```
   python image_classification.py
   ```

3. To train the custom model (optional):
   ```
   python train_model.py
   ```

## Project Structure

- `image_classification.py`: Main implementation with pre-trained model
- `train_model.py`: Custom CNN training script
- `requirements.txt`: Python dependencies
- `data/`: Sample images for testing
- `models/`: Saved model files
- `results/`: Generated plots and outputs

## Results

The demo will classify sample images and display the predictions with confidence scores.

## License

MIT License
