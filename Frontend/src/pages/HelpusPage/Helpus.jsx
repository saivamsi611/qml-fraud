import React, { useState } from 'react';
import axios from 'axios';
import './Helpus.css';

const HelpUsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false); // ✅ Processing state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true); // show dialog
    try {
      const response = await axios.post('http://localhost:5000/api/help', { name, email, message });
      console.log('Help request submitted:', response.data);
      alert('✅ Thank you for your feedback! We will get back to you soon.');
      setName(''); setEmail(''); setMessage('');
    } catch (error) {
      console.error('Error submitting help request:', error);
      alert('❌ Failed to send message. Please try again later.');
    } finally {
      setIsProcessing(false); // hide dialog
    }
  };

  const handleBack = () => window.history.back();

  return (
    <div className="helpus-container">
      {isProcessing && (
        <div className="processing-dialog">
          <div className="processing-content">
            <p>⏳ Sending your message...</p>
          </div>
        </div>
      )}

      <button className="back-btn" onClick={handleBack}>← Back</button>
      <h2>Help Us Improve QML Fraud Detection</h2>
      <p>Have questions, feedback, or want to contribute? Send us a message below!</p>

      <form onSubmit={handleSubmit} className="helpus-form">
        <label>Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required />
        </label>
        <label>Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
        </label>
        <label>Message:
          <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="How can we help you?" required rows={5} />
        </label>
        <button type="submit" className="helpus-submit-btn">Send Message</button>
      </form>
    </div>
  );
};

export default HelpUsPage;
