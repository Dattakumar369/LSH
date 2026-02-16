import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageSquare, Send, Github, Linkedin, Twitter } from 'lucide-react';
import SEOHead from '../components/SEOHead';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="tutorial-page" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <SEOHead 
        title="Contact Us - LearnStackHub" 
        description="Get in touch with LearnStackHub. Have questions, suggestions, or feedback? We'd love to hear from you!"
      />
      <h1 className="tutorial-title">Contact Us</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
        Have questions, suggestions, or feedback? We'd love to hear from you!
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
        {/* Contact Information */}
        <div>
          <h2 style={{ marginBottom: '1.5rem' }}>Get in Touch</h2>
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ marginBottom: '1rem', lineHeight: '1.8' }}>
              We're here to help! Whether you have a question about our tutorials, want to report a bug, 
              or have suggestions for improvement, feel free to reach out.
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={20} />
              Email
            </h3>
            <p>
              <a href="mailto:dattudattakumar369@gmail.com" style={{ color: 'var(--accent-primary)' }}>
                dattudattakumar369@gmail.com
              </a>
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Response Time</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              We typically respond within 24-48 hours during business days.
            </p>
          </div>

          <div>
            <h3 style={{ marginBottom: '1rem' }}>Follow Us</h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a 
                href="https://github.com/Dattakumar369/learnstackhub" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--accent-primary)',
                  textDecoration: 'none'
                }}
              >
                <Github size={20} />
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 style={{ marginBottom: '1.5rem' }}>Send a Message</h2>
          
          {submitted ? (
            <div style={{
              background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
              border: '2px solid #22c55e',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <Send size={48} style={{ color: '#22c55e', marginBottom: '1rem' }} />
              <h3 style={{ color: '#166534', marginBottom: '0.5rem' }}>Message Sent!</h3>
              <p style={{ color: '#166534' }}>
                Thank you for contacting us. We'll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What is this regarding?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <Send size={18} />
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '2px solid var(--border-color)' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Frequently Asked Questions</h2>
        
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <h3 style={{ marginBottom: '0.5rem' }}>How can I contribute a tutorial?</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              Simply sign in to your account and click the "Add Tutorial" button. You can contribute new tutorials 
              or edit existing ones. All contributions are attributed to you.
            </p>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <h3 style={{ marginBottom: '0.5rem' }}>I found an error in a tutorial. How do I report it?</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              You can either edit the tutorial directly (if you're signed in) or contact us with the details. 
              We appreciate your help in keeping our content accurate!
            </p>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Can I use the code examples in my projects?</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              Yes! All code examples are provided for educational purposes and you're free to use them in your 
              projects. However, please review our Terms of Service for complete details.
            </p>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Is LearnStackHub free to use?</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              Yes, LearnStackHub is completely free! We believe quality education should be accessible to everyone. 
              Our platform is supported by advertisements.
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '2px solid var(--border-color)' }}>
        <Link to="/" className="btn btn-primary">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Contact;

