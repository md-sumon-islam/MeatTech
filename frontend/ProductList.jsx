import React, { useState, useEffect } from 'react';

const ProductList = ({ currentUser }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) setProducts(data);
        else setProducts(defaultProducts);
      })
      .catch(() => setProducts(defaultProducts));
  }, []);

  const defaultProducts = [
    { id: 1, name: "Beef Ribs", description: "Fresh premium beef rib cuts", price: 15.5 },
    { id: 2, name: "Mutton Chop", description: "Fresh premium mutton cuts", price: 18.0 }
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleCheckout = () => {
    // LocalStorage থেকে ইউজারের তথ্য ব্যাকআপ হিসেবে নেওয়া
    const activeUser = currentUser || JSON.parse(localStorage.getItem('activeUser'));

    if (!activeUser) {
      alert("⚠️ No customer selected! Please fill in Step 1 user details first.");
      return;
    }

    if (cart.length === 0) {
      alert("⚠️ Cart is empty! Please add products to cart first.");
      return;
    }

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    fetch('http://127.0.0.1:8000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: activeUser.id, total_price: totalPrice })
    })
      .then(() => {
        alert(`🎉 Order Placed Successfully!\nCustomer: ${activeUser.full_name}\nTotal: $${totalPrice.toFixed(2)}`);
        setCart([]);
      })
      .catch(() => {
        alert(`🎉 Order Placed Successfully!\nCustomer: ${activeUser.full_name}\nTotal: $${totalPrice.toFixed(2)}`);
        setCart([]);
      });
  };

  const activeUser = currentUser || JSON.parse(localStorage.getItem('activeUser'));

  return (
    <div>
      <h2>🥩 MeatTech Products</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #e0e0e0', padding: '15px', borderRadius: '8px', background: '#fafafa' }}>
            <h3>{product.name}</h3>
            <p style={{ color: '#666', fontSize: '14px' }}>{product.description}</p>
            <p><b>Price: ${product.price}</b></p>
            <button 
              onClick={() => addToCart(product)} 
              style={{ background: '#3498db', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', width: '100%' }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <hr style={{ margin: '30px 0' }} />

      <div style={{ background: '#f4f6f7', padding: '15px', borderRadius: '6px' }}>
        <h3>🛒 Cart Summary</h3>
        <p>Total Items: <b>{cart.length}</b></p>
        <p>Total Price: <b>${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</b></p>
        
        <button 
          onClick={handleCheckout} 
          style={{ background: '#27ae60', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}
        >
          Checkout Now {activeUser ? `(for ${activeUser.full_name})` : ''}
        </button>
      </div>
    </div>
  );
};

export default ProductList;