import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NODE_ENV === 'production' 
    ? '/api' 
    : 'http://localhost:5000/api';

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/items`);
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching items:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/items`, { name, description });
      setItems([response.data, ...items]);
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>MERN Stack Deployment</h1>
        <p>Day 58 - Live on Vercel</p>
      </header>
      
      <main className="App-main">
        <section className="add-item">
          <h2>Add New Item</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <button type="submit">Add Item</button>
          </form>
        </section>

        <section className="items-list">
          <h2>Items</h2>
          {loading ? (
            <p>Loading...</p>
          ) : items.length === 0 ? (
            <p>No items yet. Add one above!</p>
          ) : (
            <div className="items-grid">
              {items.map((item) => (
                <div key={item._id} className="item-card">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <small>{new Date(item.createdAt).toLocaleString()}</small>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
