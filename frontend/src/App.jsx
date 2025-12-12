import { useState, useEffect } from 'react';
import axios from 'axios';
import { Send, Loader2, AlertCircle, CheckCircle2, XCircle, HelpCircle, Sparkles } from 'lucide-react';
import './App.css';

const API_URL = "http://localhost:8000/api";

function App() {
  const [inputText, setInputText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('analyze');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_URL}/reviews`);
      setReviews(res.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${API_URL}/analyze-review`, {
        text: inputText
      });
      setReviews([res.data, ...reviews]);
      setInputText("");
      // Otomatis pindah ke history agar user melihat hasilnya
      setActiveTab('history'); 
    } catch (err) {
      console.error(err);
      setError("Server Backend belum aktif.");
    } finally {
      setLoading(false);
    }
  };

  const getSentimentDetails = (sentiment) => {
    if (sentiment === 'POSITIVE') return { icon: <CheckCircle2 size={16} />, class: 'badge-pos' };
    if (sentiment === 'NEGATIVE') return { icon: <XCircle size={16} />, class: 'badge-neg' };
    return { icon: <HelpCircle size={16} />, class: 'badge-neu' };
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="main-header">
        <h1>Review Analyzer <span className="highlight">Pro</span></h1>
        <p>Powered by AI Sentiment Engine</p>
      </header>

      {/* Tabs */}
      <div className="tabs-container">
        <button 
          className={`tab-btn ${activeTab === 'analyze' ? 'active' : ''}`}
          onClick={() => setActiveTab('analyze')}
        >
          <Sparkles size={16} /> Analyze
        </button>
        <button 
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History ({reviews.length})
        </button>
      </div>

      <main className="main-card">
        {/* Tab 1: Input */}
        {activeTab === 'analyze' && (
          <section className="analyze-section">
            <div className="input-group">
              <label>Masukkan Ulasan Produk</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Contoh: Laptop ini sangat bagus desainnya, warna hitamnya elegan, tapi sayang harganya terlalu mahal..."
                rows={6}
                disabled={loading}
              />
            </div>
            
            {error && <div className="error-banner"><AlertCircle size={18}/> {error}</div>}
            
            <button type="submit" className="submit-btn" onClick={handleAnalyze} disabled={loading || !inputText.trim()}>
              {loading ? <Loader2 className="spin" size={20} /> : <Send size={20} />}
              {loading ? "Processing..." : "ANALYZE NOW"}
            </button>
          </section>
        )}

        {/* Tab 2: History */}
        {activeTab === 'history' && (
          <section className="history-section">
            {reviews.length === 0 ? (
              <div className="empty-state">
                <p>Belum ada data review.</p>
              </div>
            ) : (
              <div className="cards-list">
                {reviews.map((review) => {
                  const details = getSentimentDetails(review.sentiment);
                  return (
                    <div key={review.id} className="review-card">
                      <div className="card-top">
                        <span className={`sentiment-badge ${details.class}`}>
                          {details.icon} {review.sentiment}
                        </span>
                        <span className="date">{new Date(review.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="review-text">"{review.product_text}"</p>
                      <div className="insights">
                        <strong>Key Insights:</strong>
                        <ul>
                          {review.key_points && review.key_points.map((p, i) => (
                            <li key={i}>💗 {p}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;