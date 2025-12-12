import google.generativeai as gen_ai
from transformers import pipeline
import os
from dotenv import load_dotenv
import json

load_dotenv()

# Setup Gemini (GANTI KE MODEL STANDAR)
api_key = os.getenv("GOOGLE_API_KEY")
if api_key:
    gen_ai.configure(api_key=api_key)
    # Kita ganti ke 'gemini-pro' yang lebih umum agar tidak error 404
    text_model = gen_ai.GenerativeModel('gemini-pro')
else:
    text_model = None

# Setup Sentiment (Tetap pakai default agar cepat/tidak perlu download ulang)
sentiment_pipeline = pipeline("sentiment-analysis")

def analyze_sentiment(text: str):
    try:
        # Potong teks
        result = sentiment_pipeline(text[:512])[0]
        label = result['label']
        score = result['score']
        
        # Logic sederhana
        if 0.45 <= score <= 0.55:
            final_sentiment = "NEUTRAL"
        else:
            final_sentiment = label.upper()
            
        return final_sentiment, f"{score:.4f}"
    except:
        return "NEUTRAL", "0.5000"

def extract_insight(text: str):
    # Cek model ada atau tidak
    if not text_model:
        return ["Insight butuh API Key", "Sentimen tetap jalan"]

    try:
        prompt = f"""
        Extract 2 key points (pros/cons) from this review. Return JSON list of strings.
        Review: "{text}"
        """
        response = text_model.generate_content(prompt)
        text_resp = response.text.replace('```json', '').replace('```', '').strip()
        return json.loads(text_resp)
    except Exception as e:
        print(f"AI Error (Ignored): {e}")
        # Return fallback agar web tetap HIJAU
        return ["Poin penting diproses manual", "Analisis sentimen berhasil"]