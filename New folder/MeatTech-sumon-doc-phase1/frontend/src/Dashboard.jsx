import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Star, 
  LogOut, 
  Plus, 
  Trash2, 
  ShoppingCart, 
  CheckCircle,
  ListOrdered,
  Search,
  Tag,
  Eye,
  Info,
  Phone,
  MapPin,
  Mail,
  Send,
  X,
  Flame,
  Award,
  Truck,
  Clock,
  Lock,
  UserCheck
} from 'lucide-react';

export default function MeatTechDashboard() {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // User Profile & Navigation State
  const [user, setUser] = useState({ name: 'Nafi', role: 'Premium Customer', points: 420 });
  const [activeTab, setActiveTab] = useState('Meat Store');

  // Search & Category Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Products Data
  const products = [
    { id: 1, name: 'Premium Beef (গরুর মাংস)', category: 'Beef', price: 750, unit: 'kg', image: '🥩', tag: 'Best Seller', isHot: true, desc: '100% Grass-fed fresh local beef. Cleaned & cut into medium curry pieces.' },
    { id: 2, name: 'Farm Fresh Chicken (মুরগির মাংস)', category: 'Poultry', price: 300, unit: 'kg', image: '🍗', tag: 'Fresh', isHot: false, desc: 'Hygienically processed live farm chicken. Antibiotic free.' },
    { id: 3, name: 'Deshi Mutton Cut (খাসির মাংস)', category: 'Mutton', price: 1100, unit: 'kg', image: '🍖', tag: 'Premium', isHot: true, desc: 'Tender and juicy young goat meat cut into prime curry pieces.' },
    { id: 4, name: 'Beef Liver (গরুর কলিজা)', category: 'Beef', price: 800, unit: 'kg', image: '🫀', tag: 'Popular', isHot: false, desc: 'Freshly sourced organic beef liver, rich in iron and nutrients.' },
    { id: 5, name: 'Deshi Broiler Whole (দেশি মুরগি)', category: 'Poultry', price: 480, unit: 'kg', image: '🐔', tag: 'Deshi', isHot: false, desc: 'Authentic village raised country chicken (Deshi Murgi).' },
    { id: 6, name: 'Spicy Chicken Sausage (চিকেন সসেজ)', category: 'Frozen & Snacks', price: 350, unit: '500g', image: '🌭', tag: 'Hot Item', isHot: true, desc: 'Delicious smoked spicy chicken sausages, perfect for breakfast or grilling.' },
    { id: 7, name: 'Chicken Meatball (চিকেন বল)', category: 'Frozen & Snacks', price: 320, unit: '500g', image: '🧆', tag: 'Frozen', isHot: false, desc: 'Tender chicken meatballs packed with rich aromatic herbs and garlic.' },
    { id: 8, name: 'Frozen Chicken Paratha (চিকেন পরোটা)', category: 'Frozen & Snacks', price: 240, unit: '10 Pcs', image: '🫓', tag: 'Ready Pack', isHot: true, desc: 'Crispy multi-layered parathas stuffed with mouthwatering minced chicken.' },
    { id: 9, name: 'Crispy Chicken Singara (চিকেন সিঙ্গারা)', category: 'Frozen & Snacks', price: 180, unit: '10 Pcs', image: '🥟', tag: 'Snacks', isHot: false, desc: 'Traditional tea-time crispy singara stuffed with spicy diced chicken & potato.' },
    { id: 10, name: 'Crispy Chicken Samosa (চিকেন সমোসা)', category: 'Frozen & Snacks', price: 200, unit: '10 Pcs', image: '📐', tag: 'Snacks', isHot: true, desc: 'Triangle golden crispy pastry filled with minced chicken & onions.' },
    { id: 11, name: 'Beef Burger Patties (গরুর প্যাটি)', category: 'Frozen & Snacks', price: 450, unit: '4 Pcs', image: '🍔', tag: 'Gourmet', isHot: true, desc: 'Juicy 100% thick beef patties for homemade gourmet burgers.' },
    { id: 12, name: 'Chicken Nugget Pack (চিকেন নুগেট)', category: 'Frozen & Snacks', price: 310, unit: '500g', image: '🧆', tag: 'Kids Choice', isHot: false, desc: 'Crispy breaded chicken nuggets, fast and easy to fry in 3 minutes.' }
  ];

  // Cart & Discount State
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');

  // Order History State
  const [orderHistory, setOrderHistory] = useState([
    {
      id: 'ORD-9821',
      date: '12 Aug 2026, 10:30 PM',
      items: [
        { name: 'Premium Beef (গরুর মাংস)', qty: 2, price: 750 },
        { name: 'Spicy Chicken Sausage (চিকেন সসেজ)', qty: 1, price: 350 }
      ],
      total: 1850,
      paymentMethod: 'bKash',
      status: 'Out for Delivery',
      address: 'House 42, Road 7, Dhanmondi, Dhaka',
      slot: 'Morning (8 AM - 11 AM)'
    }
  ]);

  const [orderSuccess, setOrderSuccess] = useState(false);

  // Checkout Form State
  const [checkoutData, setCheckoutData] = useState({
    name: 'Nafi',
    phone: '12345',
    address: 'Bashundhora Residential Area, Block: G, Dhaka',
    paymentMethod: 'bKash',
    deliverySlot: 'Morning (8 AM - 11 AM)'
  });

  // Review State
  const [reviews, setReviews] = useState([
    { name: 'Tanvir Rahman', rating: '5 Stars ★★★★★', comment: 'Bashundhora Block G-te matro 30 min e delivery pailam! Sausage & Paratha extreme testy.' },
    { name: 'Rafiqul Islam', rating: '5 Stars ★★★★★', comment: 'Samosa & Singara packaging and fresh taste overall awesome.' }
  ]);
  const [newReview, setNewReview] = useState({ name: 'Nafi', rating: '5 Stars ★★★★★', comment: '' });

  // Handle Login Action
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginPhone === '12345' && loginPassword === '12345') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('❌ Wrong Phone or Password! Use 12345 / 12345');
    }
  };

  // Handle Logout Action
  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginPhone('');
    setLoginPassword('');
    setLoginError('');
  };

  // Filter Products
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Cart Functions
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateQty = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id) => setCart(cart.filter(item => item.id !== id));

  // Calculations
  const calculateSubtotal = () => cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const discountAmount = (calculateSubtotal() * discountPercent) / 100;
  const deliveryFee = cart.length > 0 ? 60 : 0;
  const calculateTotal = () => Math.max(0, calculateSubtotal() - discountAmount + deliveryFee);
  const earnedPoints = Math.floor(calculateTotal() / 50);

  // Coupon Handler
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === 'MEAT10') {
      setDiscountPercent(10);
      setCouponMsg('✅ 10% Discount Applied!');
    } else {
      setCouponMsg('❌ Invalid Coupon Code!');
    }
  };

  // Place Order
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert('Your cart is empty!');

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }),
      items: [...cart],
      total: calculateTotal(),
      paymentMethod: checkoutData.paymentMethod,
      status: 'Processing',
      address: checkoutData.address,
      slot: checkoutData.deliverySlot
    };

    setOrderHistory([newOrder, ...orderHistory]);
    setUser(prev => ({ ...prev, points: prev.points + earnedPoints }));
    setOrderSuccess(true);
    setCart([]);
    setDiscountPercent(0);
    setCoupon('');
    setCouponMsg('');
    setTimeout(() => setOrderSuccess(false), 5000);
  };

  // Submit Review
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.comment) return;
    setReviews([newReview, ...reviews]);
    setNewReview({ name: 'Nafi', rating: '5 Stars ★★★★★', comment: '' });
  };

  // -------------------------------------------------------------
  // 1. LOGIN SCREEN UI (If NOT Logged In)
  // -------------------------------------------------------------
  if (!isLoggedIn) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginBox}>
          <div style={styles.loginHeader}>
            <div style={styles.brandAvatarLarge}>MT</div>
            <h2 style={{ margin: '10px 0 0 0', color: '#fff', fontSize: '22px' }}>MeatTech Portal</h2>
            <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '12px' }}>Fresh Meat & Frozen Food Delivery</p>
          </div>

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '20px' }}>
            <div>
              <label style={styles.loginLabel}>Phone Number / User ID</label>
              <div style={styles.inputWithIcon}>
                <Phone size={16} color="#38edf8" />
                <input 
                  type="text" 
                  placeholder="Enter Phone Number" 
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value)}
                  style={styles.loginInput}
                  required
                />
              </div>
            </div>

            <div>
              <label style={styles.loginLabel}>Password</label>
              <div style={styles.inputWithIcon}>
                <Lock size={16} color="#38edf8" />
                <input 
                  type="password" 
                  placeholder="Enter Password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  style={styles.loginInput}
                  required
                />
              </div>
            </div>

            {loginError && <p style={styles.errorText}>{loginError}</p>}

            <button type="submit" style={styles.btnLoginSubmit}>
              <UserCheck size={18} style={{ marginRight: '8px' }} /> Login to Dashboard
            </button>

            <div style={styles.demoNotice}>
              <strong>🔑 Demo Access:</strong>
              <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#38edf8' }}>Phone: <b>12345</b> | Password: <b>12345</b></p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. DASHBOARD MAIN UI (If Logged In)
  // -------------------------------------------------------------
  return (
    <div style={styles.container}>
      {/* Sidebar Navigation */}
      <aside style={styles.sidebar}>
        <div style={styles.brandBox}>
          <div style={styles.brandAvatar}>MT</div>
          <div>
            <h3 style={styles.brandTitle}>MeatTech</h3>
            <p style={styles.brandSubtitle}>Express Meat & Frozen</p>
          </div>
        </div>

        {/* User Badge */}
        <div style={styles.roleBox}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#94a3b8', fontSize: '11px' }}>Active User:</span>
            <span style={{ backgroundColor: '#0284c7', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '4px' }}>PRO</span>
          </div>
          <div style={{ color: '#38edf8', fontWeight: 'bold', fontSize: '15px', marginTop: '2px' }}>{user.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', color: '#f59e0b', fontSize: '12px' }}>
            <Award size={14} /> MeatPoints: <b>{user.points} pts</b>
          </div>
        </div>

        <nav style={styles.navList}>
          <button 
            onClick={() => setActiveTab('Meat Store')} 
            style={{ ...styles.navItem, ...(activeTab === 'Meat Store' ? styles.navItemActive : {}) }}
          >
            <ShoppingCart size={18} style={{ marginRight: '10px' }} /> Shop Fresh & Frozen
          </button>

          <button 
            onClick={() => setActiveTab('Order History')} 
            style={{ ...styles.navItem, ...(activeTab === 'Order History' ? styles.navItemActive : {}) }}
          >
            <ListOrdered size={18} style={{ marginRight: '10px' }} /> Track Orders ({orderHistory.length})
          </button>

          <button 
            onClick={() => setActiveTab('Reviews')} 
            style={{ ...styles.navItem, ...(activeTab === 'Reviews' ? styles.navItemActive : {}) }}
          >
            <Star size={18} style={{ marginRight: '10px' }} /> Reviews & Ratings
          </button>

          <button 
            onClick={() => setActiveTab('About Us')} 
            style={{ ...styles.navItem, ...(activeTab === 'About Us' ? styles.navItemActive : {}) }}
          >
            <Info size={18} style={{ marginRight: '10px' }} /> Support & Outlet
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={styles.mainContent}>
        {/* Top Header */}
        <header style={styles.header}>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#38edf8' }}>
              🥩 MeatTech SuperStore & Cold Hub
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={styles.cartBadge}>
              <ShoppingCart size={15} /> 
              <span>{cart.reduce((a, c) => a + c.qty, 0)} Items</span>
            </div>
            <button style={styles.btnPrimary}>{user.name}'s Account</button>
            <button onClick={handleLogout} style={styles.btnLogout}>
              <LogOut size={15} style={{ marginRight: '5px' }} /> Logout
            </button>
          </div>
        </header>

        {/* Success Alert Banner */}
        {orderSuccess && (
          <div style={styles.successAlert}>
            <CheckCircle size={24} />
            <div>
              <strong>Order Confirmed, {user.name}! (অর্ডার গ্রহণ করা হয়েছে)</strong>
              <p style={{ margin: 0, fontSize: '12px' }}>
                Your items are packed in ice-insulated box. Track status under <b>Track Orders</b>!
              </p>
            </div>
          </div>
        )}

        {/* TAB 1: MEAT STORE */}
        {activeTab === 'Meat Store' && (
          <div>
            {/* Dynamic Banner */}
            <div style={styles.promoBanner}>
              <div>
                <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', textTransform: 'uppercase', fontWeight: 'bold' }}>Limited Offer</span>
                <h3 style={{ margin: '4px 0 0 0', fontSize: '18px' }}>⚡ 10% Discount on All Raw Meat & Frozen Snacks!</h3>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', opacity: 0.9 }}>
                  Use Coupon Code: <b style={{ backgroundColor: '#fff', color: '#000', padding: '2px 8px', borderRadius: '4px' }}>MEAT10</b>
                </p>
              </div>
              <Tag size={36} />
            </div>

            {/* Filter & Search Bar */}
            <div style={styles.filterBar}>
              <div style={styles.searchBox}>
                <Search size={16} color="#94a3b8" />
                <input 
                  type="text" 
                  placeholder="Search Sausage, Paratha, Samosa, Singara, Beef..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={styles.searchInput}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['All', 'Beef', 'Poultry', 'Mutton', 'Frozen & Snacks'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      ...styles.catBtn,
                      ...(selectedCategory === cat ? styles.catBtnActive : {})
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Store Layout */}
            <div style={styles.storeGrid}>
              {/* Product Grid */}
              <div style={{ flex: 2 }}>
                <div style={styles.productGrid}>
                  {filteredProducts.map((prod) => (
                    <div key={prod.id} style={styles.productCard}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {prod.isHot ? (
                          <span style={styles.hotTag}><Flame size={10} style={{ marginRight: '2px' }} /> HOT</span>
                        ) : <span />}
                        <span style={styles.tag}>{prod.tag}</span>
                      </div>

                      <div style={{ fontSize: '42px', textAlign: 'center', margin: '10px 0' }}>{prod.image}</div>
                      <h4 style={{ margin: '5px 0', fontSize: '13px', height: '34px', color: '#f8fafc' }}>{prod.name}</h4>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '5px 0' }}>
                        <p style={{ color: '#10b981', fontWeight: 'bold', fontSize: '16px', margin: 0 }}>
                          ৳ {prod.price} <span style={{ fontSize: '10px', color: '#94a3b8' }}>/ {prod.unit}</span>
                        </p>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                        <button onClick={() => setSelectedProduct(prod)} style={styles.btnViewDetails}>
                          <Eye size={13} />
                        </button>
                        <button onClick={() => addToCart(prod)} style={styles.btnAddToCart}>
                          <Plus size={15} /> Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shopping Cart Side Panel */}
              <div style={{ flex: 1, minWidth: '320px' }}>
                <div style={styles.cartCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ margin: 0, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ShoppingCart size={18} color="#38edf8" /> Order Basket
                    </h3>
                    {cart.length > 0 && <span style={{ fontSize: '11px', color: '#10b981' }}>+ Earn {earnedPoints} pts</span>}
                  </div>

                  {cart.length === 0 ? (
                    <p style={{ color: '#64748b', fontSize: '12px', textAlign: 'center', margin: '30px 0' }}>
                      Basket is empty. Select fresh cut or frozen items to order!
                    </p>
                  ) : (
                    <>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
                        {cart.map((item) => (
                          <div key={item.id} style={styles.cartItem}>
                            <div>
                              <div style={{ fontWeight: 'bold', fontSize: '12px', color: '#e2e8f0' }}>{item.name}</div>
                              <div style={{ color: '#10b981', fontSize: '11px' }}>৳ {item.price} x {item.qty}</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <button onClick={() => updateQty(item.id, -1)} style={styles.btnQty}>-</button>
                              <span style={{ fontSize: '12px' }}>{item.qty}</span>
                              <button onClick={() => updateQty(item.id, 1)} style={styles.btnQty}>+</button>
                              <button onClick={() => removeFromCart(item.id)} style={styles.btnDeleteItem}>
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Coupon Section */}
                      <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '6px', marginTop: '12px' }}>
                        <input 
                          type="text" 
                          placeholder="Promo (MEAT10)"
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                          style={styles.input}
                        />
                        <button type="submit" style={styles.btnApply}>Apply</button>
                      </form>
                      {couponMsg && <p style={{ fontSize: '11px', margin: '4px 0 0 0', color: discountPercent > 0 ? '#10b981' : '#ef4444' }}>{couponMsg}</p>}

                      <div style={styles.divider} />

                      <div style={styles.billRow}><span>Subtotal:</span> <span>৳ {calculateSubtotal()}</span></div>
                      {discountAmount > 0 && (
                        <div style={{ ...styles.billRow, color: '#10b981' }}>
                          <span>Discount (10%):</span> <span>- ৳ {discountAmount}</span>
                        </div>
                      )}
                      <div style={styles.billRow}><span>Express Cold Delivery:</span> <span>৳ {deliveryFee}</span></div>
                      <div style={{ ...styles.billRow, fontSize: '15px', fontWeight: 'bold', color: '#38edf8', margin: '6px 0' }}>
                        <span>Total Amount:</span> <span>৳ {calculateTotal()}</span>
                      </div>

                      <div style={styles.divider} />

                      {/* Checkout Form */}
                      <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <input 
                          type="text" 
                          placeholder="Full Name" 
                          required 
                          style={styles.input} 
                          value={checkoutData.name}
                          onChange={e => setCheckoutData({...checkoutData, name: e.target.value})}
                        />
                        <input 
                          type="tel" 
                          placeholder="Phone Number" 
                          required 
                          style={styles.input} 
                          value={checkoutData.phone}
                          onChange={e => setCheckoutData({...checkoutData, phone: e.target.value})}
                        />
                        <textarea 
                          placeholder="Delivery Address" 
                          required 
                          style={{ ...styles.input, height: '38px', resize: 'none' }} 
                          value={checkoutData.address}
                          onChange={e => setCheckoutData({...checkoutData, address: e.target.value})}
                        />

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                          <div>
                            <label style={{ fontSize: '10px', color: '#94a3b8' }}>Delivery Slot:</label>
                            <select 
                              style={styles.input}
                              value={checkoutData.deliverySlot}
                              onChange={e => setCheckoutData({...checkoutData, deliverySlot: e.target.value})}
                            >
                              <option value="Morning (8 AM - 11 AM)">Morning Slot</option>
                              <option value="Afternoon (2 PM - 5 PM)">Afternoon Slot</option>
                              <option value="Evening (6 PM - 9 PM)">Evening Slot</option>
                            </select>
                          </div>
                          <div>
                            <label style={{ fontSize: '10px', color: '#94a3b8' }}>Payment Method:</label>
                            <select 
                              style={styles.input}
                              value={checkoutData.paymentMethod}
                              onChange={e => setCheckoutData({...checkoutData, paymentMethod: e.target.value})}
                            >
                              <option value="bKash">bKash</option>
                              <option value="Nagad">Nagad</option>
                              <option value="COD">Cash on Delivery</option>
                            </select>
                          </div>
                        </div>

                        <button type="submit" style={styles.btnCheckout}>
                          Place Order (৳ {calculateTotal()})
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDER HISTORY & LIVE TRACKING */}
        {activeTab === 'Order History' && (
          <div style={styles.card}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', color: '#38edf8', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Truck size={20} /> Order Tracking & Past Orders
            </h3>

            {orderHistory.length === 0 ? (
              <p style={{ color: '#64748b' }}>No past orders found.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {orderHistory.map((order) => (
                  <div key={order.id} style={styles.orderCard}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '10px' }}>
                      <div>
                        <strong style={{ fontSize: '15px', color: '#38edf8' }}>{order.id}</strong>
                        <div style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                          <Clock size={12} /> Placed: {order.date}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={styles.statusBadge}>{order.status}</span>
                        <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '4px' }}>Slot: {order.slot}</div>
                      </div>
                    </div>

                    {/* Progress Bar Visualizer */}
                    <div style={styles.trackerContainer}>
                      <div style={{ ...styles.trackerStep, color: '#10b981' }}>✔ Order Placed</div>
                      <div style={{ ...styles.trackerStep, color: '#10b981' }}>✔ Packing/Frozen</div>
                      <div style={{ ...styles.trackerStep, color: order.status === 'Out for Delivery' || order.status === 'Delivered' ? '#10b981' : '#64748b' }}>
                        {order.status === 'Out for Delivery' ? '🚚 On The Way' : 'On The Way'}
                      </div>
                      <div style={{ ...styles.trackerStep, color: order.status === 'Delivered' ? '#10b981' : '#64748b' }}>Delivered</div>
                    </div>

                    <div style={{ margin: '12px 0' }}>
                      {order.items.map((item, idx) => (
                        <div key={idx} style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', margin: '2px 0' }}>
                          <span>• {item.name} x {item.qty}</span>
                          <span>৳ {item.price * item.qty}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #1e293b', paddingTop: '10px', fontSize: '12px' }}>
                      <div><span style={{ color: '#94a3b8' }}>Payment Method:</span> <b>{order.paymentMethod}</b></div>
                      <div><span style={{ color: '#94a3b8' }}>Grand Total:</span> <b style={{ color: '#10b981', fontSize: '15px' }}>৳ {order.total}</b></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: REVIEWS */}
        {activeTab === 'Reviews' && (
          <div style={styles.gridTwoCol}>
            <div style={styles.card}>
              <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#38edf8' }}>
                Write Your Review
              </h3>
              <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  value={newReview.name} 
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  style={styles.input}
                  required 
                />
                <select 
                  value={newReview.rating} 
                  onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                  style={styles.input}
                >
                  <option value="5 Stars ★★★★★">5 Stars ★★★★★</option>
                  <option value="4 Stars ★★★★☆">4 Stars ★★★★☆</option>
                  <option value="3 Stars ★★★☆☆">3 Stars ★★★☆☆</option>
                </select>
                <textarea 
                  placeholder="Tell us about the meat freshness, packaging or sausage/samosa quality..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  style={{ ...styles.input, height: '80px', resize: 'none' }}
                  required
                />
                <button type="submit" style={styles.btnCheckout}>
                  <Send size={15} style={{ marginRight: '5px' }} /> Submit Review
                </button>
              </form>
            </div>

            <div style={styles.card}>
              <h3 style={{ margin: '0 0 15px 0', fontSize: '16px' }}>Customer Feedback</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {reviews.map((rev, i) => (
                  <div key={i} style={styles.cartItem}>
                    <div>
                      <strong style={{ fontSize: '13px', color: '#fff' }}>{rev.name}</strong>
                      <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#cbd5e1' }}>{rev.comment}</p>
                    </div>
                    <span style={{ color: '#f59e0b', fontSize: '11px', fontWeight: 'bold' }}>{rev.rating}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SUPPORT & OUTLET */}
        {activeTab === 'About Us' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={styles.card}>
              <h2 style={{ margin: '0 0 10px 0', color: '#38edf8', fontSize: '20px' }}>MeatTech Fresh & Frozen Express</h2>
              <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.6' }}>
                <b>MeatTech</b> is Bangladesh’s leading digital butcher & frozen food house. We guarantee 100% Halal organic cuts and delicious ready-to-fry meat snacks like Chicken Sausage, Meatballs, Parathas, Singaras, and Samosas delivered under strict temperature control.
              </p>
            </div>

            <div style={styles.gridTwoCol}>
              <div style={styles.contactCard}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <Phone size={22} color="#10b981" />
                  <div>
                    <strong style={{ fontSize: '14px' }}>Customer Hotline</strong>
                    <p style={{ margin: 0, color: '#10b981', fontSize: '17px', fontWeight: 'bold' }}>01725060706</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <MapPin size={22} color="#ef4444" />
                  <div>
                    <strong style={{ fontSize: '14px' }}>Main Distribution Center</strong>
                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '12px' }}>
                      Bashundhora Residential Area, Block: G, Dhaka, Bangladesh
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Mail size={22} color="#3b82f6" />
                  <div>
                    <strong style={{ fontSize: '14px' }}>Email Support</strong>
                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '12px' }}>support@meattech.com.bd</p>
                  </div>
                </div>
              </div>

              <div style={styles.card}>
                <h3 style={{ margin: '0 0 10px 0', color: '#38edf8', fontSize: '15px' }}>Quality Assurance</h3>
                <ul style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: '1.8', paddingLeft: '18px' }}>
                  <li><b>100% Halal Slaughtering</b> certified.</li>
                  <li><b>Zero Antibiotic & Preservative Free</b> live poultry & beef.</li>
                  <li><b>Insulated Ice Box Express Delivery</b> within 60 mins.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Product Modal */}
        {selectedProduct && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '16px' }}>{selectedProduct.name}</h3>
                <button onClick={() => setSelectedProduct(null)} style={styles.btnCloseModal}><X size={18} /></button>
              </div>
              <div style={{ fontSize: '55px', textAlign: 'center', margin: '15px 0' }}>{selectedProduct.image}</div>
              <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: '1.4' }}>{selectedProduct.desc}</p>
              <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981', margin: '10px 0' }}>৳ {selectedProduct.price} / {selectedProduct.unit}</p>
              <button 
                onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} 
                style={styles.btnCheckout}
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Complete CSS In JS Styles
const styles = {
  // Login Styles
  loginContainer: { display: 'flex', minHeight: '100vh', backgroundColor: '#070913', alignItems: 'center', justifyContent: 'center', fontFamily: "'Segoe UI', sans-serif" },
  loginBox: { backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '30px', width: '340px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' },
  loginHeader: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  brandAvatarLarge: { width: '50px', height: '50px', borderRadius: '12px', backgroundColor: '#ef4444', color: '#fff', fontSize: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  loginLabel: { color: '#94a3b8', fontSize: '11px', display: 'block', marginBottom: '4px' },
  inputWithIcon: { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#070913', border: '1px solid #1e293b', padding: '0 10px', borderRadius: '8px' },
  loginInput: { backgroundColor: 'transparent', border: 'none', color: '#fff', padding: '10px 0', fontSize: '13px', width: '100%', outline: 'none' },
  btnLoginSubmit: { backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' },
  errorText: { color: '#ef4444', fontSize: '11px', margin: '0', textAlign: 'center' },
  demoNotice: { backgroundColor: 'rgba(56, 237, 248, 0.1)', border: '1px solid #0284c7', padding: '10px', borderRadius: '8px', textAlign: 'center', color: '#cbd5e1', fontSize: '11px', marginTop: '10px' },

  // Dashboard Styles
  container: { display: 'flex', minHeight: '100vh', backgroundColor: '#070913', color: '#ffffff', fontFamily: "'Segoe UI', sans-serif" },
  sidebar: { width: '250px', backgroundColor: '#0b1120', borderRight: '1px solid #1e293b', padding: '20px 15px', display: 'flex', flexDirection: 'column' },
  brandBox: { display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', backgroundColor: 'rgba(15, 23, 42, 0.8)', borderRadius: '10px', border: '1px solid #1e293b' },
  brandAvatar: { width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#ef4444', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' },
  brandTitle: { margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#fff' },
  brandSubtitle: { margin: 0, fontSize: '10px', color: '#94a3b8' },
  roleBox: { margin: '15px 0', padding: '12px', borderRadius: '10px', border: '1px solid #1d4ed8', backgroundColor: 'rgba(30, 58, 138, 0.15)' },
  navList: { display: 'flex', flexDirection: 'column', gap: '6px' },
  navItem: { display: 'flex', alignItems: 'center', padding: '10px 12px', borderRadius: '8px', color: '#94a3b8', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '13px', textAlign: 'left' },
  navItemActive: { color: '#ffffff', backgroundColor: '#1e293b', borderLeft: '3px solid #38edf8' },
  mainContent: { flex: 1, padding: '20px 25px', overflowY: 'auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #1e293b', paddingBottom: '12px' },
  cartBadge: { backgroundColor: '#1e293b', border: '1px solid #38edf8', color: '#38edf8', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' },
  btnPrimary: { backgroundColor: '#ec4899', border: 'none', color: '#ffffff', padding: '6px 14px', borderRadius: '20px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' },
  btnLogout: { backgroundColor: '#1e293b', border: '1px solid #ef4444', color: '#ef4444', padding: '6px 12px', borderRadius: '20px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center' },
  promoBanner: { background: 'linear-gradient(90deg, #ec4899 0%, #8b5cf6 100%)', padding: '14px 20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  filterBar: { display: 'flex', justifyContent: 'space-between', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' },
  searchBox: { display: 'flex', alignItems: 'center', backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', padding: '0 10px', flex: 1, minWidth: '200px' },
  searchInput: { backgroundColor: 'transparent', border: 'none', color: '#fff', padding: '10px', fontSize: '12px', width: '100%', outline: 'none' },
  catBtn: { backgroundColor: '#0f172a', border: '1px solid #1e293b', color: '#94a3b8', padding: '7px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' },
  catBtnActive: { backgroundColor: '#0284c7', color: '#fff', border: 'none' },
  storeGrid: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '15px' },
  productCard: { backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '14px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  tag: { backgroundColor: '#1e293b', color: '#38edf8', fontSize: '10px', padding: '2px 6px', borderRadius: '6px', border: '1px solid #38edf8' },
  hotTag: { backgroundColor: '#ef4444', color: '#fff', fontSize: '9px', padding: '2px 6px', borderRadius: '6px', fontWeight: 'bold', display: 'flex', alignItems: 'center' },
  btnAddToCart: { backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', flex: 1, fontSize: '12px' },
  btnViewDetails: { backgroundColor: '#1e293b', color: '#94a3b8', border: '1px solid #334155', padding: '8px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  cartCard: { backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '16px' },
  cartItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#070913', padding: '8px 10px', borderRadius: '8px' },
  btnQty: { backgroundColor: '#1e293b', color: '#fff', border: 'none', width: '22px', height: '22px', borderRadius: '4px', cursor: 'pointer' },
  btnDeleteItem: { backgroundColor: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' },
  btnApply: { backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '0 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' },
  divider: { height: '1px', backgroundColor: '#1e293b', margin: '10px 0' },
  billRow: { display: 'flex', justifyContent: 'space-between', fontSize: '12px', margin: '3px 0', color: '#cbd5e1' },
  input: { width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#070913', color: '#fff', fontSize: '11px', boxSizing: 'border-box' },
  btnCheckout: { backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  successAlert: { backgroundColor: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#10b981', padding: '12px 18px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' },
  card: { backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '18px' },
  contactCard: { backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '8px' },
  gridTwoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  orderCard: { backgroundColor: '#070913', border: '1px solid #1e293b', borderRadius: '10px', padding: '15px' },
  statusBadge: { backgroundColor: 'rgba(56, 237, 248, 0.15)', color: '#38edf8', border: '1px solid #38edf8', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold' },
  trackerContainer: { display: 'flex', justifyContent: 'space-between', backgroundColor: '#0f172a', padding: '8px 12px', borderRadius: '8px', margin: '12px 0', fontSize: '10px', fontWeight: 'bold' },
  trackerStep: { flex: 1, textAlign: 'center' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  modalCard: { backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px', width: '320px' },
  btnCloseModal: { backgroundColor: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }
};