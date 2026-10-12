import React, { useState } from 'react';
import { Mail, Phone, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { submitContactForm } from '../../services/api';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill out all fields.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await submitContactForm(formData);
      setStatus({ type: 'success', message: res.message || 'Message sent successfully!' });
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        {/* Left Column: Contact details & intro */}
        <div className="contact-info-col">
          <div className="section-tag-wrapper">
            <span className="section-tag-text">GET IN TOUCH</span>
            <span className="section-tag-line"></span>
          </div>

          <h2 className="section-main-title">Contact Us</h2>

          <p className="contact-subtitle">
            Have a project in mind or want to know more?<br />
            We'd love to hear from you!
          </p>

          <div className="contact-methods-list">
            {/* Business Email */}
            <a href="mailto:creftoofficial@gmail.com" className="contact-method-card">
              <div className="contact-method-icon">
                <Mail size={20} className="text-white" />
              </div>
              <div className="contact-method-text">
                <span className="contact-method-label">Business Email</span>
                <span className="contact-method-val">creftoofficial@gmail.com</span>
              </div>
            </a>

            {/* WhatsApp / Phone */}
            <a href="tel:9539572023" className="contact-method-card">
              <div className="contact-method-icon">
                <Phone size={20} className="text-white" />
              </div>
              <div className="contact-method-text">
                <span className="contact-method-label">WhatsApp / Phone</span>
                <span className="contact-method-val">9539572023</span>
              </div>
            </a>
          </div>
        </div>

        {/* Right Column: Sleek Form Card */}
        <div className="contact-form-col">
          <div className="contact-form-card">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={4}
                  className="form-textarea"
                  required
                ></textarea>
              </div>

              {status && (
                <div className={`form-feedback ${status.type}`}>
                  {status.type === 'success' ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <AlertCircle size={18} />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={loading}
                icon={<Send size={16} />}
                className="contact-submit-btn"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
