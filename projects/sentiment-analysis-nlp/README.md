# Sentiment Analysis with NLP

A natural language processing project that demonstrates sentiment analysis using various techniques including traditional ML and deep learning approaches.

## Overview

This project implements sentiment analysis on text data using multiple approaches:
1. Traditional ML with TF-IDF and SVM
2. Deep learning with LSTM neural networks
3. Pre-trained transformer models (BERT)

## Features

- Text preprocessing pipeline
- Multiple sentiment analysis approaches
- Model comparison and evaluation
- Visualization of results
- Interactive prediction interface

## Technologies Used

- Python 3.x
- TensorFlow/Keras
- Transformers (Hugging Face)
- Scikit-learn
- NLTK
- Pandas
- NumPy
- Matplotlib
- Seaborn

## How to Run

1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Run the sentiment analysis demo:
   ```
   python sentiment_analysis.py
   ```

3. To train the custom models (optional):
   ```
   python train_models.py
   ```

## Project Structure

- `sentiment_analysis.py`: Main implementation with multiple approaches
- `train_models.py`: Custom model training script
- `requirements.txt`: Python dependencies
- `data/`: Sample datasets for training and testing
- `models/`: Saved model files
- `results/`: Generated plots and outputs

## Results

The demo will analyze sample texts and display sentiment predictions with confidence scores.

## License

MIT License
