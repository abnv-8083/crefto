import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, Send, CheckCircle2, AlertCircle, Clock, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../../components/Button/Button';
import { submitContactForm } from '../../services/api';
import { useContent } from '../../context/ContentContext';

gsap.registerPlugin(ScrollTrigger);

export const Contact: React.FC = () => {
  const { content } = useContent();
  const contactData = content.contact;
  const sectionRef = useRef<HTMLElement>(null);
  const infoColRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [selectedService, setSelectedService] = useState('Bespoke Website');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const serviceOptions = contactData.servicesList && contactData.servicesList.length > 0
    ? contactData.servicesList
    : [
        'Bespoke Website',
        'Web Application',
        'E-Commerce Store',
        'Website Redesign',
        'Maintenance & Support',
      ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (infoColRef.current) {
        gsap.fromTo(
          infoColRef.current.children,
          { opacity: 0, x: -35 },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: infoColRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }

      if (formCardRef.current) {
        gsap.fromTo(
          formCardRef.current,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formCardRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill out all required fields.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const fullMessage = `[Project Type: ${selectedService}]\n\n${formData.message}`;
      const res = await submitContactForm({
        name: formData.name,
        email: formData.email,
        message: fullMessage,
      });
      setStatus({ type: 'success', message: res.message || 'Message sent successfully! We will get back to you shortly.' });
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="contact-section">
      <div className="contact-container">
        {/* Left Column: Contact details & intro */}
        <div ref={infoColRef} className="contact-info-col">
          <div className="section-tag-wrapper">
            <span className="section-tag-text">{contactData.sectionTag}</span>
            <span className="section-tag-line" />
          </div>

          <h2 className="section-main-title">{contactData.title}</h2>

          <p className="contact-subtitle">
            {contactData.description}
          </p>

          <div className="contact-guarantee-badge">
            <Clock size={15} className="text-[#34d399]" />
            <span>{contactData.responseBadge || 'Fast Response Guarantee: We reply within 2 business hours.'}</span>
          </div>

          <div className="contact-methods-list">
            {/* Business Email */}
            <a href={`mailto:${contactData.email || 'crefto@charease.in'}`} className="contact-method-card">
              <div className="contact-method-icon">
                <Mail size={20} className="text-white" />
              </div>
              <div className="contact-method-text">
                <span className="contact-method-label">Official Inquiries</span>
                <span className="contact-method-val">{contactData.email || 'crefto@charease.in'}</span>
              </div>
            </a>

            {/* WhatsApp / Phone */}
            <a href={`tel:${(contactData.phone || '9539572023').replace(/[^0-9+]/g, '')}`} className="contact-method-card">
              <div className="contact-method-icon">
                <Phone size={20} className="text-white" />
              </div>
              <div className="contact-method-text">
                <span className="contact-method-label">Direct WhatsApp / Call</span>
                <span className="contact-method-val">{contactData.phone || '+91 9539572023'}</span>
              </div>
            </a>
          </div>
        </div>

        {/* Right Column: Sleek Form Card */}
        <div ref={formCardRef} className="contact-form-col">
          <div className="contact-form-card">
            <div className="contact-form-header">
              <span className="form-card-badge">
                <Sparkles size={12} className="text-[#FF3838]" /> Direct Inquiry
              </span>
              <h3 className="form-card-title">Project Details</h3>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              {/* Project Type Selector Chips */}
              <div className="form-service-chips-wrapper">
                <label className="form-chips-label">I'm interested in:</label>
                <div className="form-service-chips">
                  {serviceOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      className={`service-chip-btn ${selectedService === opt ? 'active' : ''}`}
                      onClick={() => setSelectedService(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name *"
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
                    placeholder="Work Email Address *"
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
                  placeholder="Tell us about your project, timeline, and goals... *"
                  rows={4}
                  className="form-textarea"
                  required
                />
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
                {loading ? 'Submitting...' : 'Send Project Inquiry'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
