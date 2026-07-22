import React, { useState } from 'react';

const ProductReview = ({ productId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/reviews/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId, rating, comment })
    })
    .then(res => res.json())
    .then(data => setMessage('Review submitted successfully!'))
    .catch(err => setMessage('Failed to submit review.'));
  };

  return (
    <div style={{
      maxWidth: '450px',
      margin: '20px auto',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      backgroundColor: '#ffffff',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h3 style={{ marginTop: 0, color: '#333', textAlign: 'center' }}>
        ⭐ Submit Your Review
      </h3>
      
      {message && (
        <p style={{
          padding: '10px',
          borderRadius: '6px',
          backgroundColor: '#e6fffa',
          color: '#2b6cb0',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
            Rating (1 to 5 Stars):
          </label>
          <select 
            value={rating} 
            onChange={(e) => setRating(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc'
            }}
          >
            <option value="5">⭐⭐⭐⭐⭐ (5 - Excellent)</option>
            <option value="4">⭐⭐⭐⭐ (4 - Very Good)</option>
            <option value="3">⭐⭐⭐ (3 - Good)</option>
            <option value="2">⭐⭐ (2 - Fair)</option>
            <option value="1">⭐ (1 - Poor)</option>
          </select>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
            Your Feedback:
          </label>
          <textarea 
            rows="4" 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
            placeholder="Write your detailed feedback here..." 
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button 
          type="submit" 
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ProductReview;