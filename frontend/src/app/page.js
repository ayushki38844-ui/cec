"use client";
import React, { useState } from 'react';

function GuidedPurchase() {
  const [formData, setFormData] = useState({ name: '', email: '', requirements: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      const res = await fetch('http://localhost:8000/api/requirements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('Our team will contact you super soon!');
        setFormData({ name: '', email: '', requirements: '' });
      } else {
        setStatus('Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('Failed to connect to server.');
    }
  };

  return (
    <div className="guided-purchase">
      <div className="container">
        <p>Not sure what exactly fulfills your need? Don't worry - we got your back.</p>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>Leave a note here describing your requirements.</p>

        <form className="inquiry-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Describe your requirements..."
            required
            value={formData.requirements}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
          />
          <button type="submit">Send Note</button>
        </form>
        {status && <div style={{ marginTop: '15px', color: 'var(--accent)' }}>{status}</div>}
      </div>
    </div>
  );
}

export default function Home() {
  const categories = [
    {
      title: "World of Electronics",
      subtitle: "Gadgets that build your style - carry your style",
      items: ["Mobile Gadgets", "Smart Watches", "Mouse", "Keyboard"]
    },
    {
      title: "World of Office Management",
      subtitle: "Empowering your IT Team",
      items: ["PCs", "Laptops", "Networking", "Printers", "Machines", "Server Rooms (CPU, GPU - 3 Dabbe)"]
    },
    {
      title: "World of Home Appliances",
      subtitle: "Electronics for your home - from kitchens to door bells",
      items: ["Mixi", "Grinder", "Oven", "TV", "Fridge", "Door Bells"]
    },
    {
      title: "Workplace Essentials",
      subtitle: "Everything else you need",
      items: ["Furniture", "Telephone", "Stationary Items", "Pens", "Paper"]
    }
  ];

  return (
    <main>
      <GuidedPurchase />

      <nav className="navbar">
        <div className="container">
          <div className="brand">Capital Electronics</div>
          <div style={{ color: 'var(--text-secondary)' }}>info@capitalelectronics.com</div>
        </div>
      </nav>

      <section className="hero">
        <div className="container animate-fade-in">
          <h1>Welcome to the World of Electronics</h1>
          <p>We make a workplace out of your buildings.</p>
          <div style={{ marginTop: '30px' }}>
            <a href="#explore" style={{
              padding: '12px 30px',
              background: 'var(--primary)',
              borderRadius: '30px',
              fontWeight: '600',
              display: 'inline-block'
            }}>Explore Catalog</a>
          </div>
        </div>
      </section>

      <section id="explore" className="section">
        <div className="container">
          <h2 className="section-title">Our Solutions</h2>

          <div className="bento-grid">
            {categories.map((cat, idx) => (
              <div key={idx} className="bento-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                <h3>{cat.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.9rem' }}>{cat.subtitle}</p>
                <div className="item-list">
                  {cat.items.map((item, i) => (
                    <span key={i} className="item-tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <h4>About Us</h4>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Capital Electronics provides end-to-end solutions for all your electronics, office management, and home appliance needs.
          </p>

          <div className="social-links">
            <a href="mailto:contact@capitalelectronics.com">contact@capitalelectronics.com</a>
            <a href="#">LinkedIn</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
          <div style={{ marginTop: '30px', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
            © 2026 Capital Electronics. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
