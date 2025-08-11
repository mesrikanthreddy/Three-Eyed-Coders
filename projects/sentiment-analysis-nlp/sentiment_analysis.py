import numpy as np
import pandas as pd
import re
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import matplotlib.pyplot as plt
import seaborn as sns

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

# Simple rule-based sentiment analyzer
class RuleBasedSentimentAnalyzer:
    def __init__(self):
        # Simple positive and negative word lists
        self.positive_words = {
            'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 
            'awesome', 'brilliant', 'outstanding', 'perfect', 'love', 'like',
            'enjoy', 'happy', 'pleased', 'satisfied', 'delighted', 'impressed'
        }
        
        self.negative_words = {
            'bad', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'dislike',
            'disappointed', 'angry', 'frustrated', 'annoyed', 'sad', 'upset',
            'disgusting', 'pathetic', 'useless', 'boring', 'confused'
        }
    
    def preprocess_text(self, text):
        # Convert to lowercase
        text = text.lower()
        # Remove special characters and digits
        text = re.sub(r'[^a-zA-Z\s]', '', text)
        # Tokenize
        tokens = word_tokenize(text)
        # Remove stopwords
        stop_words = set(stopwords.words('english'))
        tokens = [word for word in tokens if word not in stop_words]
        return tokens
    
    def analyze_sentiment(self, text):
        tokens = self.preprocess_text(text)
        
        positive_count = sum(1 for word in tokens if word in self.positive_words)
        negative_count = sum(1 for word in tokens if word in self.negative_words)
        
        if positive_count > negative_count:
            return 'positive', positive_count / (positive_count + negative_count + 1)
        elif negative_count > positive_count:
            return 'negative', negative_count / (positive_count + negative_count + 1)
        else:
            return 'neutral', 0.5

class MLBasedSentimentAnalyzer:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(max_features=5000, stop_words='english')
        self.model = LogisticRegression()
        self.is_trained = False
    
    def preprocess_text(self, text):
        # Convert to lowercase
        text = text.lower()
        # Remove special characters and digits
        text = re.sub(r'[^a-zA-Z\s]', '', text)
        return text
    
    def train(self, texts, labels):
        # Preprocess texts
        processed_texts = [self.preprocess_text(text) for text in texts]
        
        # Vectorize texts
        X = self.vectorizer.fit_transform(processed_texts)
        
        # Train model
        self.model.fit(X, labels)
        self.is_trained = True
        
        print("Model trained successfully!")
    
    def predict(self, text):
        if not self.is_trained:
            raise ValueError("Model must be trained before making predictions")
            
        # Preprocess text
        processed_text = self.preprocess_text(text)
        
        # Vectorize text
        X = self.vectorizer.transform([processed_text])
        
        # Predict
        prediction = self.model.predict(X)[0]
        probability = self.model.predict_proba(X)[0]
        
        # Get confidence score
        confidence = max(probability)
        
        return prediction, confidence

def create_sample_data():
    """Create sample data for demonstration"""
    texts = [
        "I love this product! It's amazing and works perfectly.",
        "This is the worst thing I've ever bought. Terrible quality.",
        "The movie was okay, nothing special but not bad either.",
        "Absolutely fantastic! I'm so happy with my purchase.",
        "Not worth the money. Very disappointed with this item.",
        "Great service and friendly staff. Highly recommended!",
        "Boring and confusing. I didn't understand what was happening.",
        "Excellent quality and fast delivery. Will buy again.",
        "Poor design and uncomfortable to use. Not recommended.",
        "Wonderful experience, exceeded my expectations completely."
    ]
    
    labels = ['positive', 'negative', 'neutral', 'positive', 'negative', 
              'positive', 'negative', 'positive', 'negative', 'positive']
    
    return texts, labels

def visualize_results(results):
    """Visualize sentiment analysis results"""
    sentiments = [result[1] for result in results]
    
    # Count sentiments
    sentiment_counts = {
        'positive': sentiments.count('positive'),
        'negative': sentiments.count('negative'),
        'neutral': sentiments.count('neutral')
    }
    
    # Create bar plot
    plt.figure(figsize=(8, 6))
    bars = plt.bar(sentiment_counts.keys(), sentiment_counts.values(), 
                   color=['green', 'red', 'blue'])
    plt.title('Sentiment Analysis Results')
    plt.xlabel('Sentiment')
    plt.ylabel('Count')
    
    # Add value labels on bars
    for bar in bars:
        height = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2., height,
                 f'{int(height)}',
                 ha='center', va='bottom')
    
    plt.tight_layout()
    plt.show()

def main():
    print("Sentiment Analysis with NLP")
    print("===========================")
    
    # Create sample data
    texts, labels = create_sample_data()
    
    print(f"\nAnalyzing {len(texts)} sample texts...")
    
    # 1. Rule-based analysis
    print("\n1. Rule-Based Sentiment Analysis:")
    rule_analyzer = RuleBasedSentimentAnalyzer()
    rule_results = []
    
    for i, text in enumerate(texts):
        sentiment, confidence = rule_analyzer.analyze_sentiment(text)
        rule_results.append((text, sentiment, confidence))
        print(f"   Text {i+1}: {sentiment} (confidence: {confidence:.2f})")
    
    # 2. ML-based analysis
    print("\n2. ML-Based Sentiment Analysis:")
    ml_analyzer = MLBasedSentimentAnalyzer()
    
    # Train the model
    ml_analyzer.train(texts, labels)
    
    ml_results = []
    for i, text in enumerate(texts):
        try:
            sentiment, confidence = ml_analyzer.predict(text)
            ml_results.append((text, sentiment, confidence))
            print(f"   Text {i+1}: {sentiment} (confidence: {confidence:.2f})")
        except Exception as e:
            print(f"   Text {i+1}: Error - {str(e)}")
    
    # 3. Compare results
    print("\n3. Comparison of Approaches:")
    print("   Text                           | Rule-Based | ML-Based")
    print("   " + "-" * 58)
    
    for i in range(len(texts)):
        text_preview = texts[i][:30] + "..." if len(texts[i]) > 30 else texts[i]
        rule_sent = rule_results[i][1]
        ml_sent = ml_results[i][1] if i < len(ml_results) else "N/A"
        print(f"   {text_preview:<30} | {rule_sent:<10} | {ml_sent}")
    
    # Visualize results (rule-based)
    print("\n4. Visualizing results...")
    visualize_results(rule_results)
    
    # Interactive prediction
    print("\n5. Try your own text (press Enter with empty text to exit):")
    while True:
        user_text = input("Enter text for sentiment analysis: ")
        if not user_text.strip():
            break
            
        # Analyze with rule-based approach
        sentiment, confidence = rule_analyzer.analyze_sentiment(user_text)
        print(f"   Rule-based: {sentiment} (confidence: {confidence:.2f})")
        
        # Analyze with ML approach (if trained)
        if ml_analyzer.is_trained:
            try:
                sentiment, confidence = ml_analyzer.predict(user_text)
                print(f"   ML-based: {sentiment} (confidence: {confidence:.2f})")
            except Exception as e:
                print(f"   ML-based: Error - {str(e)}")
        print()

if __name__ == "__main__":
    main()
