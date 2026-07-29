import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ full_name: '', email: '', phone: '', address: '' });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.full_name || !formData.email || !formData.phone || !formData.address) return;

    if (editingId) {
    
      await fetch(`http://127.0.0.1:8000/api/users/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setMessage('✅ User profile updated successfully!');
      setEditingId(null);
    } else {
    
      await fetch('http://127.0.0.1:8000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setMessage('✅ New user profile added successfully!');
    }

    setFormData({ full_name: '', email: '', phone: '', address: '' });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setFormData({
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      address: user.address
    });
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this user profile?')) {
      await fetch(`http://127.0.0.1:8000/api/users/${id}`, { method: 'DELETE' });
      setMessage('🗑️ User profile deleted successfully!');
      fetchUsers();
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', padding: '25px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '5px' }}>👤 User Profile Management</h2>
      <p style={{ textAlign: 'center', color: '#7f8c8d', fontSize: '14px', marginBottom: '20px' }}>Full CRUD Operations (Add, Read, Update, Delete) with SQLite</p>

      {message && (
        <p style={{ backgroundColor: '#d4edda', color: '#155724', padding: '12px', borderRadius: '6px', textAlign: 'center', fontWeight: 'bold' }}>
          {message}
        </p>
      )}

      {}
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #e9ecef', marginBottom: '30px' }}>
        <h3 style={{ marginTop: 0, color: '#34495e' }}>{editingId ? '✏️ Edit User Profile' : '➕ Add New User'}</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Full Name:</label>
            <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="e.g. Md Sumon Islam" required style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div>
            <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Email Address:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g. sumon@example.com" required style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div>
            <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Phone Number:</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. 01580341803" required style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div>
            <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Address:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="e.g. Dhaka, Bangladesh" required style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
        </div>

        <div style={{ marginTop: '15px' }}>
          <button type="submit" style={{ padding: '10px 20px', background: editingId ? '#f39c12' : '#27ae60', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            {editingId ? 'Update User' : 'Save User Profile'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setFormData({ full_name: '', email: '', phone: '', address: '' }); }} style={{ marginLeft: '10px', padding: '10px 20px', background: '#95a5a6', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Cancel
            </button>
          )}
        </div>
      </form>

      
      <h3 style={{ color: '#2c3e50' }}>📋 Stored User Profiles ({users.length})</h3>
      {users.length === 0 ? <p style={{ color: '#7f8c8d' }}>No user profiles available. Please add one above.</p> : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ backgroundColor: '#2c3e50', color: '#ffffff', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Name</th>
                <th style={{ padding: '10px' }}>Email</th>
                <th style={{ padding: '10px' }}>Phone</th>
                <th style={{ padding: '10px' }}>Address</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} style={{ borderBottom: '1px solid #dddddd' }}>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>{u.full_name}</td>
                  <td style={{ padding: '10px' }}>{u.email}</td>
                  <td style={{ padding: '10px' }}>{u.phone}</td>
                  <td style={{ padding: '10px' }}>{u.address}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <button onClick={() => handleEdit(u)} style={{ marginRight: '8px', padding: '6px 12px', background: '#3498db', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDelete(u.id)} style={{ padding: '6px 12px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);