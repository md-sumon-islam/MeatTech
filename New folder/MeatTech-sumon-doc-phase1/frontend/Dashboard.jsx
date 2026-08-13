import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  User, 
  ShoppingBag, 
  Star, 
  FileText, 
  Bell, 
  ShieldCheck, 
  LogOut, 
  Plus, 
  Trash2, 
  Send 
} from 'lucide-react';

export default function MeatTechDashboard() {
  const [activeTab, setActiveTab] = useState('Product Reviews');

  // --- ১. তোমার কাজ: Product Review (FastAPI Backend Integration) ---
  const [reviews, setReviews] = useState([]);
  const [productName, setProductName] = useState('');
  const [rating, setRating] = useState('5 Stars');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  // ব্যাকএন্ড থেকে রিভিউ লোড করা
  const fetchReviews = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/reviews');
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // নতুন রিভিউ সাবমিট করা (POST Request)
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!productName || !comment) return;
    setLoading(true);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: productName,
          rating: rating,
          comment: comment
        })
      });

      if (res.ok) {
        setProductName('');
        setComment('');
        fetchReviews(); // রিভিউ লিস্ট আপডেট করা
      }
    } catch (err) {
      console.error('Error submitting review:', err);
    } finally {
      setLoading(false);
    }
  };

  // --- ২. তোমার কাজ: Meat Inventory Management ---
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Premium Beef Ribeye', category: 'Beef', stock: '120 kg', status: 'In Stock' },
    { id: 2, name: 'Fresh Mutton Leg', category: 'Mutton', stock: '45 kg', status: 'Low Stock' },
  ]);
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('');

  const handleAddInventory = (e) => {
    e.preventDefault();
    if (!itemName || !itemCategory) return;
    const newItem = {
      id: Date.now(),
      name: itemName,
      category: itemCategory,
      stock: '50 kg',
      status: 'In Stock'
    };
    setInventory([...inventory, newItem]);
    setItemName('');
    setItemCategory('');
  };

  const handleDeleteInventory = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  // সাইডবার নেভিগেশন আইটেম
  const navItems = [
    { name: 'Product Reviews', icon: <Star size={18} /> },
    { name: 'Meat Inventory', icon: <ShoppingBag size={18} /> },
    { name: 'Quality Records', icon: <ShieldCheck size={18} /> },
    { name: 'System Alerts', icon: <Bell size={18} /> },
  ];

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.brandBox}>
          <div style={styles.brandAvatar}>MT</div>
          <div>
            <h3 style={styles.brandTitle}>MeatTech Core</h3>
            <p style={styles.brandSubtitle}>Operations & Supply Interface</p>
          </div>
        </div>

        {/* Sumon's Part Tag */}
        <div style={styles.roleBox}>
          <span style={{ color: '#8b949e', fontSize: '11px' }}>Role Managed by </span>
          <br />
          <span style={{ color: '#38edf8', fontWeight: 'bold', fontSize: '13px' }}>Sumon (Admin / Auth)</span>
        </div>

        {/* Navigation */}
        <nav style={styles.navList}>
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              style={{
                ...styles.navItem,
                ...(activeTab === item.name ? styles.navItemActive : {}),
              }}
            >
              <span style={{ marginRight: '12px' }}>{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main style={styles.mainContent}>
        {/* Header Bar */}
        <header style={styles.header}>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
              MeatTech Quality & Review Management
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={styles.btnOutline}>Notifications</button>
            <button style={styles.btnPrimary}>My Profile (Sumon)</button>
            <button style={styles.btnLogout}>
              <LogOut size={15} style={{ marginRight: '5px' }} /> Logout
            </button>
          </div>
        </header>

        {/* Title */}
        <div style={{ marginBottom: '20px' }}>
          <h1 style={{ fontSize: '28px', margin: '0 0 6px 0', fontWeight: 'bold' }}>
            {activeTab}
          </h1>
          <p style={{ color: '#8b949e', margin: 0, fontSize: '13px' }}>
            Manage frontend operations, API integrations, and product reviews.
          </p>
        </div>

        {/* TAB 1: PRODUCT REVIEWS (YOUR MAIN WORK) */}
        {activeTab === 'Product Reviews' && (
          <div style={styles.gridContainer}>
            {/* Form Column */}
            <div style={styles.leftColumn}>
              <div style={styles.card}>
                <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#38edf8' }}>
                  Submit Product Review
                </h3>
                <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={styles.label}>Product Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Fresh Beef Cut" 
                      value={productName} 
                      onChange={(e) => setProductName(e.target.value)}
                      style={styles.input}
                      required
                    />
                  </div>

                  <div>
                    <label style={styles.label}>Rating</label>
                    <select 
                      value={rating} 
                      onChange={(e) => setRating(e.target.value)}
                      style={styles.input}
                    >
                      <option value="5 Stars">5 Stars ★★★★★</option>
                      <option value="4 Stars">4 Stars ★★★★☆</option>
                      <option value="3 Stars">3 Stars ★★★☆☆</option>
                      <option value="2 Stars">2 Stars ★★☆☆☆</option>
                      <option value="1 Star">1 Star ★☆☆☆☆</option>
                    </select>
                  </div>

                  <div>
                    <label style={styles.label}>Comment</label>
                    <textarea 
                      placeholder="Write your review here..." 
                      value={comment} 
                      onChange={(e) => setComment(e.target.value)}
                      style={{ ...styles.input, height: '80px', resize: 'none' }}
                      required
                    />
                  </div>

                  <button type="submit" style={styles.btnSubmit} disabled={loading}>
                    <Send size={16} /> {loading ? 'Processing...' : 'Submit Review'}
                  </button>
                </form>
              </div>
            </div>

            {/* Live Review Feed Column */}
            <div style={styles.rightColumn}>
              <div style={styles.card}>
                <h3 style={{ margin: '0 0 15px 0', fontSize: '16px' }}>Live Product Reviews</h3>
                {reviews.length === 0 ? (
                  <p style={{ color: '#64748b', fontSize: '13px' }}>No reviews submitted yet.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '400px', overflowY: 'auto' }}>
                    {reviews.map((rev, index) => (
                      <div key={index} style={styles.reviewCard}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <strong style={{ fontSize: '14px', color: '#fff' }}>{rev.name}</strong>
                          <span style={{ fontSize: '12px', color: '#f59e0b' }}>{rev.rating}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '13px', color: '#cbd5e1' }}>{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MEAT INVENTORY */}
        {activeTab === 'Meat Inventory' && (
          <div style={styles.gridContainer}>
            <div style={styles.leftColumn}>
              <div style={styles.card}>
                <h3 style={{ margin: '0 0 15px 0', fontSize: '16px' }}>Add Meat Stock</h3>
                <form onSubmit={handleAddInventory} style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    type="text" 
                    placeholder="Meat Item Name" 
                    value={itemName} 
                    onChange={(e) => setItemName(e.target.value)}
                    style={styles.input}
                  />
                  <input 
                    type="text" 
                    placeholder="Category" 
                    value={itemCategory} 
                    onChange={(e) => setItemCategory(e.target.value)}
                    style={styles.input}
                  />
                  <button type="submit" style={styles.btnAdd}>
                    <Plus size={16} /> Add
                  </button>
                </form>
              </div>

              <div style={styles.card}>
                <h3 style={{ margin: '0 0 15px 0', fontSize: '16px' }}>Current Stock</h3>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.tableHeader}>
                      <th style={styles.th}>Item</th>
                      <th style={styles.th}>Category</th>
                      <th style={styles.th}>Stock</th>
                      <th style={styles.th}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((item) => (
                      <tr key={item.id} style={styles.tableRow}>
                        <td style={styles.td}>{item.name}</td>
                        <td style={styles.td}>{item.category}</td>
                        <td style={styles.td}>{item.stock}</td>
                        <td style={styles.td}>
                          <button onClick={() => handleDeleteInventory(item.id)} style={styles.btnDelete}>
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={styles.rightColumn}>
              <div style={styles.card}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Admin Overview</h4>
                <p style={{ color: '#8b949e', fontSize: '13px' }}>
                  Sumon will handle Admin authentication & login access for this dashboard.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Visual Glassmorphic Dark Styles
const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#070913',
    color: '#ffffff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#0b1120',
    borderRight: '1px solid #1e293b',
    padding: '20px 15px',
    display: 'flex',
    flexDirection: 'column',
  },
  brandBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderRadius: '10px',
    border: '1px solid #1e293b',
  },
  brandAvatar: {
    width: '35px',
    height: '35px',
    borderRadius: '8px',
    backgroundColor: '#0284c7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '13px',
  },
  brandTitle: { margin: 0, fontSize: '14px', fontWeight: '600' },
  brandSubtitle: { margin: 0, fontSize: '10px', color: '#94a3b8' },
  roleBox: {
    margin: '15px 0',
    padding: '10px',
    borderRadius: '12px',
    border: '1px solid #1d4ed8',
    backgroundColor: 'rgba(30, 58, 138, 0.2)',
  },
  navList: { display: 'flex', flexDirection: 'column', gap: '5px' },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 14px',
    borderRadius: '8px',
    color: '#94a3b8',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '13px',
    textAlign: 'left',
  },
  navItemActive: {
    color: '#ffffff',
    backgroundColor: '#1e293b',
    borderLeft: '3px solid #38edf8',
  },
  mainContent: { flex: 1, padding: '20px 25px', overflowY: 'auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  btnOutline: {
    backgroundColor: 'transparent',
    border: '1px solid #38edf8',
    color: '#38edf8',
    padding: '6px 14px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  btnPrimary: {
    backgroundColor: '#ec4899',
    border: 'none',
    color: '#ffffff',
    padding: '6px 16px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  btnLogout: {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    color: '#ffffff',
    padding: '6px 14px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
  },
  gridContainer: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  leftColumn: { display: 'flex', flexDirection: 'column', gap: '15px' },
  rightColumn: { display: 'flex', flexDirection: 'column', gap: '15px' },
  card: {
    backgroundColor: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '12px',
    padding: '18px',
  },
  label: { fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '5px' },
  input: {
    width: '100%',
    padding: '9px 12px',
    borderRadius: '8px',
    border: '1px solid #334155',
    backgroundColor: '#070913',
    color: '#fff',
    fontSize: '13px',
    boxSizing: 'border-box',
  },
  btnSubmit: {
    backgroundColor: '#10b981',
    color: '#fff',
    border: 'none',
    padding: '10px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontWeight: 'bold',
    fontSize: '13px',
  },
  reviewCard: {
    backgroundColor: '#070913',
    border: '1px solid #1e293b',
    borderRadius: '8px',
    padding: '10px 12px',
  },
  btnAdd: {
    backgroundColor: '#0284c7',
    color: '#fff',
    border: 'none',
    padding: '9px 15px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { borderBottom: '1px solid #334155', textAlign: 'left' },
  th: { padding: '8px', color: '#94a3b8', fontSize: '12px' },
  tableRow: { borderBottom: '1px solid #1e293b' },
  td: { padding: '10px 8px', fontSize: '13px' },
  btnDelete: { backgroundColor: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' },
};