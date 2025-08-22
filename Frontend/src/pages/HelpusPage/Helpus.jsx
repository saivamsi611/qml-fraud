import React, { useState } from 'react';
import './Helpus.css';

const HelpUsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Help request submitted:', { name, email, message });
    alert('Thank you for your feedback! We will get back to you soon.');
    // Reset form
    setName('');
    setEmail('');
    setMessage('');
  };

  // Simple back handler using window.history
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="helpus-container">

      {/* Back Button */}
      <button className="back-btn" onClick={handleBack}>
        ← Back
      </button>

      <h2>Help Us Improve QML Fraud Detection</h2>
      <p>
        Have questions, feedback, or want to contribute? Send us a message below!
      </p>

      <form onSubmit={handleSubmit} className="helpus-form">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </label>

        <label>
          Message:
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="How can we help you?"
            required
            rows={5}
          />
        </label>

        <button type="submit" className="helpus-submit-btn">Send Message</button>
      </form>
    </div>
  );
};

export default HelpUsPage;
