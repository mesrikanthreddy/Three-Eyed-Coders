import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns
import re
import nltk
import pickle
import os

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

def preprocess_text(text):
    """Preprocess text for analysis"""
    if pd.isna(text):
        return ""
    
    # Convert to lowercase
    text = text.lower()
    
    # Remove special characters and digits
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    
    # Remove extra whitespace
    text = ' '.join(text.split())
    
    return text

def create_sample_dataset():
    """Create a larger sample dataset for training"""
    # Extended sample data
    data = [
        ("I absolutely love this product! It's fantastic!", "positive"),
        ("This is the best purchase I've ever made.", "positive"),
        ("Amazing quality and fast delivery. Highly recommend!", "positive"),
        ("I'm so happy with this item. Exceeded expectations.", "positive"),
        ("Perfect! Exactly what I was looking for.", "positive"),
        ("This product is terrible. Worst purchase ever.", "negative"),
        ("I hate this item. Complete waste of money.", "negative"),
        ("Awful quality and poor customer service.", "negative"),
        ("Disappointed with this purchase. Not worth it.", "negative"),
        ("Horrible experience. Would not recommend.", "negative"),
        ("The product is okay, nothing special.", "neutral"),
        ("It's fine, but I've seen better.", "neutral"),
        ("Average quality, average price.", "neutral"),
        ("Not bad, not great either.", "neutral"),
        ("It works as expected, nothing more.", "neutral"),
        ("Outstanding service and excellent product!", "positive"),
        ("I'm thrilled with my purchase. Great value!", "positive"),
        ("This exceeded all my expectations. Wonderful!", "positive"),
        ("Fantastic quality and quick shipping.", "positive"),
        ("Love it! Will definitely buy again.", "positive"),
        ("This is garbage. Complete junk.", "negative"),
        ("Worst product ever. Don't waste your money.", "negative"),
        ("Terrible experience. Very disappointed.", "negative"),
        ("Poor quality and overpriced.", "negative"),
        ("Hate this product. Complete failure.", "negative"),
        ("It's alright, does the job.", "neutral"),
        ("Decent product for the price.", "neutral"),
        ("Nothing special, but it works.", "neutral"),
        ("Average product, average experience.", "neutral"),
        ("It's okay, could be better.", "neutral")
    ]
    
    texts, labels = zip(*data)
    return list(texts), list(labels)

def train_and_evaluate_models(X_train, X_test, y_train, y_test):
    """Train and evaluate multiple models"""
    models = {
        'Logistic Regression': LogisticRegression(max_iter=1000),
        'Naive Bayes': MultinomialNB(),
        'SVM': SVC(probability=True)
    }
    
    results = {}
    
    for name, model in models.items():
        print(f"\nTraining {name}...")
        
        # Train model
        model.fit(X_train, y_train)
        
        # Make predictions
        y_pred = model.predict(X_test)
        
        # Calculate accuracy
        accuracy = accuracy_score(y_test, y_pred)
        
        # Store results
        results[name] = {
            'model': model,
            'accuracy': accuracy,
            'predictions': y_pred
        }
        
        print(f"{name} Accuracy: {accuracy:.4f}")
        
        # Print classification report
        print(f"\n{name} Classification Report:")
        print(classification_report(y_test, y_pred))
    
    return results

def plot_model_comparison(results):
    """Plot model comparison"""
    model_names = list(results.keys())
    accuracies = [results[name]['accuracy'] for name in model_names]
    
    plt.figure(figsize=(10, 6))
    bars = plt.bar(model_names, accuracies, color=['blue', 'green', 'red'])
    plt.title('Model Accuracy Comparison')
    plt.ylabel('Accuracy')
    plt.ylim(0, 1)
    
    # Add accuracy values on bars
    for bar, acc in zip(bars, accuracies):
        plt.text(bar.get_x() + bar.get_width()/2., bar.get_height(),
                 f'{acc:.3f}',
                 ha='center', va='bottom')
    
    plt.tight_layout()
    plt.show()

def plot_confusion_matrix(y_true, y_pred, model_name):
    """Plot confusion matrix for a model"""
    cm = confusion_matrix(y_true, y_pred)
    
    plt.figure(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                xticklabels=['negative', 'neutral', 'positive'],
                yticklabels=['negative', 'neutral', 'positive'])
    plt.title(f'Confusion Matrix - {model_name}')
    plt.ylabel('True Label')
    plt.xlabel('Predicted Label')
    plt.tight_layout()
    plt.show()

def save_model(model, vectorizer, model_name):
    """Save trained model and vectorizer"""
    # Create models directory if it doesn't exist
    if not os.path.exists('models'):
        os.makedirs('models')
    
    # Save model
    model_path = f'models/{model_name.lower().replace(" ", "_")}_model.pkl'
    with open(model_path, 'wb') as f:
        pickle.dump(model, f)
    
    # Save vectorizer
    vectorizer_path = f'models/{model_name.lower().replace(" ", "_")}_vectorizer.pkl'
    with open(vectorizer_path, 'wb') as f:
        pickle.dump(vectorizer, f)
    
    print(f"Model saved to {model_path}")
    print(f"Vectorizer saved to {vectorizer_path}")

def main():
    print("Training Sentiment Analysis Models")
    print("=================================")
    
    # Create sample dataset
    print("Creating sample dataset...")
    texts, labels = create_sample_dataset()
    print(f"Dataset size: {len(texts)} samples")
    
    # Preprocess texts
    print("Preprocessing texts...")
    processed_texts = [preprocess_text(text) for text in texts]
    
    # Split data
    print("Splitting data into train/test sets...")
    X_train, X_test, y_train, y_test = train_test_split(
        processed_texts, labels, test_size=0.3, random_state=42
    )
    
    print(f"Training set size: {len(X_train)}")
    print(f"Test set size: {len(X_test)}")
    
    # Vectorize texts
    print("Vectorizing texts...")
    vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
    X_train_vec = vectorizer.fit_transform(X_train)
    X_test_vec = vectorizer.transform(X_test)
    
    # Train and evaluate models
    print("Training and evaluating models...")
    results = train_and_evaluate_models(X_train_vec, X_test_vec, y_train, y_test)
    
    # Plot model comparison
    print("Plotting model comparison...")
    plot_model_comparison(results)
    
    # Plot confusion matrices for each model
    for name, result in results.items():
        print(f"Plotting confusion matrix for {name}...")
        plot_confusion_matrix(y_test, result['predictions'], name)
    
    # Save the best model (based on accuracy)
    best_model_name = max(results.keys(), key=lambda k: results[k]['accuracy'])
    best_model = results[best_model_name]['model']
    
    print(f"\nSaving best model: {best_model_name}")
    save_model(best_model, vectorizer, best_model_name)
    
    print("\nTraining complete!")

if __name__ == "__main__":
    main()
