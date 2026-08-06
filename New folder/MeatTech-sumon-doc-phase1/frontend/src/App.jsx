// ==========================================
// FILE: frontend/src/App.jsx
// ==========================================
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchReviews = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/reviews');
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error('FastAPI backend error:', err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        const response = await fetch(`http://127.0.0.1:8000/api/reviews/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, rating: parseInt(rating), comment }),
        });

        if (response.ok) {
          setEditingId(null);
          resetForm();
          fetchReviews();
        }
      } else {
        const response = await fetch('http://127.0.0.1:8000/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, rating: parseInt(rating), comment }),
        });

        if (response.ok) {
          resetForm();
          fetchReviews();
        }
      }
    } catch (error) {
      alert('Cannot connect to FastAPI backend!');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setRating(5);
    setComment('');
  };

  const handleEdit = (review) => {
    setEditingId(review.id);
    setName(review.name);
    setRating(review.rating);
    setComment(review.comment);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    resetForm();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/reviews/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchReviews();
      }
    } catch (error) {
      alert('Failed to delete review!');
    }
  };

  return (
    <div className="container">
      <h2 className="title">MeatTech Product Review System</h2>
      
      <div className="card">
        <h3 className="card-title">{editingId ? 'Edit Review' : 'Add New Review'}</h3>
        <form onSubmit={handleSubmit} className="form-group">
          <input 
            type="text" 
            placeholder="Your Name" 
            className="input-field"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <select 
            className="select-field"
            value={rating} 
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
            <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
            <option value="3">⭐⭐⭐ (3 Stars)</option>
            <option value="2">⭐⭐ (2 Stars)</option>
            <option value="1">⭐ (1 Star)</option>
          </select>
          <textarea 
            placeholder="Write your review here..." 
            className="textarea-field"
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
            required 
          />
          <div className="btn-group">
            <button 
              type="submit" 
              disabled={loading} 
              className={`btn ${editingId ? 'btn-edit' : 'btn-primary'}`}
            >
              {loading ? 'Processing...' : editingId ? 'Update Review' : 'Submit Review'}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancelEdit} className="btn btn-cancel">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <h3 className="card-title" style={{ border: 'none' }}>Submitted Reviews ({reviews.length})</h3>
      <div>
        {reviews.length === 0 ? (
          <p style={{ color: '#64748b', textAlign: 'center', margin: '20px 0' }}>No reviews yet. Be the first to add one!</p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="review-item">
              <div className="review-header">
                <span className="review-name">{r.name}</span>
                <span className="review-stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
              </div>
              <p className="review-comment">{r.comment}</p>
              <div className="action-btn-group" style={{ marginTop: '12px', justifyContent: 'flex-end' }}>
                <button onClick={() => handleEdit(r)} className="btn-sm-edit">
                  Edit
                </button>
                <button onClick={() => handleDelete(r.id)} className="btn-sm-delete">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;