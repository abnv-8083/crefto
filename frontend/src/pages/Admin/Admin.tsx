import React, { useState, useEffect } from 'react';
import {
  Save,
  RotateCcw,
  ExternalLink,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Home as HomeIcon,
  Activity,
  Info,
  Briefcase,
  Layers,
  Award,
  Compass,
  Mail,
  Sliders,
  LogOut,
} from 'lucide-react';
import { useContent, ISiteContent, IServiceItem, IProjectItem } from '../../context/ContentContext';
import { AdminLogin } from './AdminLogin';
import './Admin.css';

type AdminTab = 'hero' | 'marquee' | 'about' | 'services' | 'process' | 'projects' | 'advantages' | 'contact' | 'footer';

export const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('crefto_admin_auth') === 'true';
  });
  const { content, saveAll, resetToDefault, saving, lastSavedAt } = useContent();
  const [formData, setFormData] = useState<ISiteContent>(content);
  const [activeTab, setActiveTab] = useState<AdminTab>('hero');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Sync form data whenever initial content loads or changes remotely
  useEffect(() => {
    setFormData(content);
  }, [content]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSave = async () => {
    try {
      await saveAll(formData);
      showToast('All changes saved successfully! Live site updated.');
    } catch {
      showToast('Error saving changes. Saved locally.', 'error');
    }
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all website content back to factory defaults? Any custom edits will be reverted.')) {
      try {
        await resetToDefault();
        showToast('Site content reset to factory defaults.');
      } catch {
        showToast('Failed to reset content.', 'error');
      }
    }
  };

  const navigateToLive = () => {
    window.location.hash = '';
    if (window.location.pathname.startsWith('/admin')) {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  // Keyboard shortcut Ctrl+S / Cmd+S to save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [formData]);

  // Tab definitions
  const tabs = [
    { id: 'hero', label: 'Hero Banner', icon: <HomeIcon size={16} /> },
    { id: 'marquee', label: 'Marquee Ticker', icon: <Activity size={16} /> },
    { id: 'about', label: 'About & Vision', icon: <Info size={16} /> },
    { id: 'services', label: 'Services (6)', icon: <Briefcase size={16} /> },
    { id: 'process', label: 'Process Timeline', icon: <Compass size={16} /> },
    { id: 'projects', label: 'Selected Work', icon: <Layers size={16} /> },
    { id: 'advantages', label: 'Advantages Bento', icon: <Award size={16} /> },
    { id: 'contact', label: 'Contact & Inquiries', icon: <Mail size={16} /> },
    { id: 'footer', label: 'Footer & Socials', icon: <Sliders size={16} /> },
  ];

  if (!isAuthenticated) {
    return <AdminLogin onSuccess={() => setIsAuthenticated(true)} onCancel={navigateToLive} />;
  }

  return (
    <div className="admin-layout">
      {/* Top Header */}
      <header className="admin-navbar">
        <div className="admin-brand">
          <div className="admin-logo-badge">
            <img src="/logo/logo-dark.png" alt="Crefto Logo" className="admin-brand-logo-img" />
          </div>
          <span className="admin-badge-tag">ADMIN CONTROL PANEL</span>
        </div>

        <div className="admin-nav-actions">
          <div className="admin-status-text">
            <span className={`admin-status-dot ${saving ? 'saving' : ''}`} />
            <span>
              {saving
                ? 'Syncing changes...'
                : lastSavedAt
                ? `Saved at ${lastSavedAt.toLocaleTimeString()}`
                : 'Ready • Auto-synced'}
            </span>
          </div>

          <button
            type="button"
            className="admin-btn admin-btn-danger"
            onClick={handleReset}
            title="Reset to factory defaults"
          >
            <RotateCcw size={14} />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            onClick={navigateToLive}
            title="Exit Admin and View Live Site"
          >
            <ExternalLink size={14} />
            <span>View Live Site</span>
          </button>

          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            onClick={() => {
              sessionStorage.removeItem('crefto_admin_auth');
              setIsAuthenticated(false);
            }}
            title="Sign Out of Admin"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>

          <button
            type="button"
            className="admin-btn admin-btn-primary"
            onClick={handleSave}
            disabled={saving}
          >
            <Save size={15} />
            <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content */}
      <div className="admin-main-container">
        {/* Left Sidebar */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar-heading">Website Sections</div>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`admin-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id as AdminTab)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </aside>

        {/* Center / Right Content Panel */}
        <main className="admin-content-area">
          {/* TAB 1: HERO */}
          {activeTab === 'hero' && (
            <section>
              <div className="admin-section-header">
                <div className="admin-section-title-wrap">
                  <h2>Hero Section Configuration</h2>
                  <p>Customize the initial fold, main punchy headline, subheadings, CTAs, and telemetry numbers.</p>
                </div>
              </div>

              <div className="admin-card">
                <div className="admin-card-header">
                  <h3>Pill Badges & Main Headlines</h3>
                </div>
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-label">Status Pill Text</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.hero.statusPill}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero: { ...formData.hero, statusPill: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Partner Pill Subtext</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.hero.statusPillSub}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero: { ...formData.hero, statusPillSub: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Headline Part 1 (First Line)</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.hero.headlinePart1}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero: { ...formData.hero, headlinePart1: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Headline Part 2 (Second Line / Gradient)</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.hero.headlinePart2}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero: { ...formData.hero, headlinePart2: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group col-span-2">
                    <label className="admin-label">Hero Description (Elevator Pitch)</label>
                    <textarea
                      rows={3}
                      className="admin-textarea"
                      value={formData.hero.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero: { ...formData.hero, description: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Primary CTA Button Label</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.hero.primaryCtaText}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero: { ...formData.hero, primaryCtaText: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Secondary CTA Button Label</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.hero.secondaryCtaText}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero: { ...formData.hero, secondaryCtaText: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </div>

            </section>
          )}

          {/* TAB 2: MARQUEE */}
          {activeTab === 'marquee' && (
            <section>
              <div className="admin-section-header">
                <div className="admin-section-title-wrap">
                  <h2>Infinite Marquee Ticker</h2>
                  <p>Manage the rolling headline pill badges that glide horizontally beneath the hero.</p>
                </div>
              </div>

              <div className="admin-card">
                <div className="admin-card-header">
                  <h3>Marquee Items ({formData.marquee.items.length})</h3>
                </div>
                <div className="admin-form-grid">
                  {formData.marquee.items.map((item, idx) => (
                    <div key={idx} className="admin-form-group">
                      <div className="admin-label">
                        <span>Pill {idx + 1}</span>
                        <button
                          type="button"
                          className="admin-icon-btn danger"
                          onClick={() => {
                            const updated = formData.marquee.items.filter((_, i) => i !== idx);
                            setFormData({ ...formData, marquee: { items: updated } });
                          }}
                          title="Delete item"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <input
                        type="text"
                        className="admin-input"
                        value={item}
                        onChange={(e) => {
                          const updated = [...formData.marquee.items];
                          updated[idx] = e.target.value;
                          setFormData({ ...formData, marquee: { items: updated } });
                        }}
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="admin-add-item-btn"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      marquee: { items: [...formData.marquee.items, 'NEW CAPABILITY'] },
                    });
                  }}
                >
                  <Plus size={15} /> Add Marquee Phrase
                </button>
              </div>
            </section>
          )}

          {/* TAB 3: ABOUT */}
          {activeTab === 'about' && (
            <section>
              <div className="admin-section-header">
                <div className="admin-section-title-wrap">
                  <h2>About Section Configuration</h2>
                  <p>Edit agency philosophy, mission, vision, ChargeEase affiliation, and milestone statistics.</p>
                </div>
              </div>

              <div className="admin-card">
                <div className="admin-card-header">
                  <h3>Main Narrative Block</h3>
                </div>
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-label">Section Tag</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.about.sectionTag}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          about: { ...formData.about, sectionTag: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">CTA Button Label</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.about.ctaText}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          about: { ...formData.about, ctaText: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group col-span-2">
                    <label className="admin-label">Title / Heading</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.about.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          about: { ...formData.about, title: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group col-span-2">
                    <label className="admin-label">Description Paragraph 1</label>
                    <textarea
                      rows={3}
                      className="admin-textarea"
                      value={formData.about.description1}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          about: { ...formData.about, description1: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group col-span-2">
                    <label className="admin-label">Description Paragraph 2</label>
                    <textarea
                      rows={3}
                      className="admin-textarea"
                      value={formData.about.description2}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          about: { ...formData.about, description2: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Core Values Cards */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <h3>Core Values (Mission, Vision, Backing)</h3>
                </div>
                {formData.about.values.map((v, idx) => (
                  <div key={idx} className="admin-item-card">
                    <div className="admin-item-top">
                      <span className="admin-item-badge">Value {idx + 1}</span>
                      <button
                        type="button"
                        className="admin-icon-btn danger"
                        onClick={() => {
                          const updated = formData.about.values.filter((_, i) => i !== idx);
                          setFormData({ ...formData, about: { ...formData.about, values: updated } });
                        }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Title</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={v.title}
                        onChange={(e) => {
                          const updated = [...formData.about.values];
                          updated[idx].title = e.target.value;
                          setFormData({ ...formData, about: { ...formData.about, values: updated } });
                        }}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Description</label>
                      <textarea
                        rows={2}
                        className="admin-textarea"
                        value={v.description}
                        onChange={(e) => {
                          const updated = [...formData.about.values];
                          updated[idx].description = e.target.value;
                          setFormData({ ...formData, about: { ...formData.about, values: updated } });
                        }}
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="admin-add-item-btn"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      about: {
                        ...formData.about,
                        values: [...formData.about.values, { title: 'New Core Value', description: 'Description of this value' }],
                      },
                    });
                  }}
                >
                  <Plus size={15} /> Add Value Item
                </button>
              </div>

              {/* Statistics Strip */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <h3>Milestone Statistics (Bottom Strip)</h3>
                </div>
                <div className="admin-form-grid">
                  {formData.about.stats.map((st, idx) => (
                    <div key={idx} className="admin-item-card">
                      <div className="admin-item-top">
                        <span className="admin-item-badge">Stat {idx + 1}</span>
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Value (e.g. 50+, 99%)</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={st.value}
                          onChange={(e) => {
                            const updated = [...formData.about.stats];
                            updated[idx].value = e.target.value;
                            setFormData({ ...formData, about: { ...formData.about, stats: updated } });
                          }}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Label</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={st.label}
                          onChange={(e) => {
                            const updated = [...formData.about.stats];
                            updated[idx].label = e.target.value;
                            setFormData({ ...formData, about: { ...formData.about, stats: updated } });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* TAB 4: SERVICES */}
          {activeTab === 'services' && (
            <section>
              <div className="admin-section-header">
                <div className="admin-section-title-wrap">
                  <h2>Services Section Configuration</h2>
                  <p>Edit service cards, circular 3D carousel images, tags, and section descriptions.</p>
                </div>
              </div>

              <div className="admin-card">
                <div className="admin-card-header">
                  <h3>Section Header</h3>
                </div>
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-label">Section Tag</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.services.sectionTag}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          services: { ...formData.services, sectionTag: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Title</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.services.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          services: { ...formData.services, title: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group col-span-2">
                    <label className="admin-label">Description</label>
                    <textarea
                      rows={2}
                      className="admin-textarea"
                      value={formData.services.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          services: { ...formData.services, description: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Service Items */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <h3>Service Capabilities ({formData.services.services.length})</h3>
                </div>
                {formData.services.services.map((srv, idx) => (
                  <div key={srv.id || idx} className="admin-item-card">
                    <div className="admin-item-top">
                      <div className="flex items-center gap-2">
                        <span className="admin-item-badge">Service {srv.num || idx + 1}</span>
                        <strong className="text-white text-sm">{srv.title}</strong>
                      </div>
                      <button
                        type="button"
                        className="admin-icon-btn danger"
                        onClick={() => {
                          const updated = formData.services.services.filter((_, i) => i !== idx);
                          setFormData({ ...formData, services: { ...formData.services, services: updated } });
                        }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="admin-form-grid">
                      <div className="admin-form-group">
                        <label className="admin-label">Number Prefix</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={srv.num}
                          onChange={(e) => {
                            const updated = [...formData.services.services];
                            updated[idx].num = e.target.value;
                            setFormData({ ...formData, services: { ...formData.services, services: updated } });
                          }}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Service Title</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={srv.title}
                          onChange={(e) => {
                            const updated = [...formData.services.services];
                            updated[idx].title = e.target.value;
                            setFormData({ ...formData, services: { ...formData.services, services: updated } });
                          }}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Subtitle (Category)</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={srv.subtitle}
                          onChange={(e) => {
                            const updated = [...formData.services.services];
                            updated[idx].subtitle = e.target.value;
                            setFormData({ ...formData, services: { ...formData.services, services: updated } });
                          }}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Image URL (Carousel Card)</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={srv.src}
                          onChange={(e) => {
                            const updated = [...formData.services.services];
                            updated[idx].src = e.target.value;
                            setFormData({ ...formData, services: { ...formData.services, services: updated } });
                          }}
                        />
                      </div>
                      <div className="admin-form-group col-span-2">
                        <label className="admin-label">Service Description</label>
                        <textarea
                          rows={2}
                          className="admin-textarea"
                          value={srv.description}
                          onChange={(e) => {
                            const updated = [...formData.services.services];
                            updated[idx].description = e.target.value;
                            setFormData({ ...formData, services: { ...formData.services, services: updated } });
                          }}
                        />
                      </div>
                      <div className="admin-form-group col-span-2">
                        <label className="admin-label">
                          <span>Feature Tags</span>
                          <span className="admin-label-hint">Comma-separated</span>
                        </label>
                        <input
                          type="text"
                          className="admin-input"
                          value={srv.tags.join(', ')}
                          onChange={(e) => {
                            const updated = [...formData.services.services];
                            updated[idx].tags = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                            setFormData({ ...formData, services: { ...formData.services, services: updated } });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  className="admin-add-item-btn"
                  onClick={() => {
                    const newSrv: IServiceItem = {
                      id: `service-${Date.now()}`,
                      num: String(formData.services.services.length + 1).padStart(2, '0'),
                      title: 'New Service Capability',
                      subtitle: 'Engineering',
                      description: 'Comprehensive engineering tailored to your requirements.',
                      tags: ['Design System', 'Custom Motion'],
                      src: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=900&q=80&auto=format&fit=max',
                      alt: 'Service illustration',
                    };
                    setFormData({
                      ...formData,
                      services: {
                        ...formData.services,
                        services: [...formData.services.services, newSrv],
                      },
                    });
                  }}
                >
                  <Plus size={15} /> Add Service Card
                </button>
              </div>
            </section>
          )}

          {/* TAB 5: PROCESS */}
          {activeTab === 'process' && (
            <section>
              <div className="admin-section-header">
                <div className="admin-section-title-wrap">
                  <h2>Process Timeline & 3D HoloCards</h2>
                  <p>Edit the 4-phase agile engineering timeline, front-face philosophy quotes, and back-face blueprints.</p>
                </div>
              </div>

              <div className="admin-card">
                <div className="admin-card-header">
                  <h3>Section Header</h3>
                </div>
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-label">Section Tag</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.process.sectionTag}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          process: { ...formData.process, sectionTag: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Title</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.process.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          process: { ...formData.process, title: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group col-span-2">
                    <label className="admin-label">Description</label>
                    <textarea
                      rows={2}
                      className="admin-textarea"
                      value={formData.process.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          process: { ...formData.process, description: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Timeline Steps */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <h3>Timeline Steps ({formData.process.steps.length})</h3>
                </div>
                {formData.process.steps.map((st, idx) => (
                  <div key={idx} className="admin-item-card">
                    <div className="admin-item-top">
                      <span className="admin-item-badge">{st.phase} • Step {st.num}</span>
                      <strong className="text-white text-sm">{st.title}</strong>
                    </div>

                    <div className="admin-form-grid">
                      <div className="admin-form-group">
                        <label className="admin-label">Phase Label</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={st.phase}
                          onChange={(e) => {
                            const updated = [...formData.process.steps];
                            updated[idx].phase = e.target.value;
                            setFormData({ ...formData, process: { ...formData.process, steps: updated } });
                          }}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Title</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={st.title}
                          onChange={(e) => {
                            const updated = [...formData.process.steps];
                            updated[idx].title = e.target.value;
                            setFormData({ ...formData, process: { ...formData.process, steps: updated } });
                          }}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Subtitle</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={st.subtitle}
                          onChange={(e) => {
                            const updated = [...formData.process.steps];
                            updated[idx].subtitle = e.target.value;
                            setFormData({ ...formData, process: { ...formData.process, steps: updated } });
                          }}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Duration Chip</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={st.duration}
                          onChange={(e) => {
                            const updated = [...formData.process.steps];
                            updated[idx].duration = e.target.value;
                            setFormData({ ...formData, process: { ...formData.process, steps: updated } });
                          }}
                        />
                      </div>
                      <div className="admin-form-group col-span-2">
                        <label className="admin-label">Briefing Description</label>
                        <textarea
                          rows={2}
                          className="admin-textarea"
                          value={st.desc}
                          onChange={(e) => {
                            const updated = [...formData.process.steps];
                            updated[idx].desc = e.target.value;
                            setFormData({ ...formData, process: { ...formData.process, steps: updated } });
                          }}
                        />
                      </div>

                      {/* HoloCard Front Quote */}
                      <div className="admin-form-group col-span-2">
                        <label className="admin-label">3D Card Quote (Front Face)</label>
                        <textarea
                          rows={2}
                          className="admin-textarea"
                          value={st.quote}
                          onChange={(e) => {
                            const updated = [...formData.process.steps];
                            updated[idx].quote = e.target.value;
                            setFormData({ ...formData, process: { ...formData.process, steps: updated } });
                          }}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Quote Author</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={st.quoteAuthor}
                          onChange={(e) => {
                            const updated = [...formData.process.steps];
                            updated[idx].quoteAuthor = e.target.value;
                            setFormData({ ...formData, process: { ...formData.process, steps: updated } });
                          }}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Quote Category / Role</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={st.quoteRole}
                          onChange={(e) => {
                            const updated = [...formData.process.steps];
                            updated[idx].quoteRole = e.target.value;
                            setFormData({ ...formData, process: { ...formData.process, steps: updated } });
                          }}
                        />
                      </div>

                      {/* HoloCard Back Mission & Axiom */}
                      <div className="admin-form-group">
                        <label className="admin-label">Card Back: Mission Statement</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={st.backMission}
                          onChange={(e) => {
                            const updated = [...formData.process.steps];
                            updated[idx].backMission = e.target.value;
                            setFormData({ ...formData, process: { ...formData.process, steps: updated } });
                          }}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Card Back: KPI Target</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={st.backKpi}
                          onChange={(e) => {
                            const updated = [...formData.process.steps];
                            updated[idx].backKpi = e.target.value;
                            setFormData({ ...formData, process: { ...formData.process, steps: updated } });
                          }}
                        />
                      </div>
                      <div className="admin-form-group col-span-2">
                        <label className="admin-label">Card Back: Axiom / Guiding Principle</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={st.backAxiom}
                          onChange={(e) => {
                            const updated = [...formData.process.steps];
                            updated[idx].backAxiom = e.target.value;
                            setFormData({ ...formData, process: { ...formData.process, steps: updated } });
                          }}
                        />
                      </div>
                      <div className="admin-form-group col-span-2">
                        <label className="admin-label">
                          <span>Key Deliverables (Bullet points)</span>
                          <span className="admin-label-hint">Separated by semicolon (;)</span>
                        </label>
                        <input
                          type="text"
                          className="admin-input"
                          value={st.deliverables.join('; ')}
                          onChange={(e) => {
                            const updated = [...formData.process.steps];
                            updated[idx].deliverables = e.target.value.split(';').map((s) => s.trim()).filter(Boolean);
                            setFormData({ ...formData, process: { ...formData.process, steps: updated } });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* TAB 6: PROJECTS */}
          {activeTab === 'projects' && (
            <section>
              <div className="admin-section-header">
                <div className="admin-section-title-wrap">
                  <h2>Selected Work & 3D CardSwap Deck</h2>
                  <p>Edit client showcase projects, 3D card deck cover images, metrics, case study narratives, and deliverables.</p>
                </div>
              </div>

              <div className="admin-card">
                <div className="admin-card-header">
                  <h3>Section Header & Filter Categories</h3>
                </div>
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-label">Section Tag</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.projects.sectionTag}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          projects: { ...formData.projects, sectionTag: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Title</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.projects.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          projects: { ...formData.projects, title: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group col-span-2">
                    <label className="admin-label">Description</label>
                    <textarea
                      rows={2}
                      className="admin-textarea"
                      value={formData.projects.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          projects: { ...formData.projects, description: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group col-span-2">
                    <label className="admin-label">
                      <span>Filter Categories</span>
                      <span className="admin-label-hint">Comma-separated</span>
                    </label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.projects.categories.join(', ')}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          projects: {
                            ...formData.projects,
                            categories: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Projects List */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <h3>Showcase Projects ({formData.projects.projects.length})</h3>
                </div>
                {formData.projects.projects.map((proj, idx) => (
                  <div key={proj.id || idx} className="admin-item-card">
                    <div className="admin-item-top">
                      <div className="flex items-center gap-2">
                        <span className="admin-item-badge">#{idx + 1} {proj.category}</span>
                        <strong className="text-white text-sm">{proj.title}</strong>
                      </div>
                      <button
                        type="button"
                        className="admin-icon-btn danger"
                        onClick={() => {
                          const updated = formData.projects.projects.filter((_, i) => i !== idx);
                          setFormData({ ...formData, projects: { ...formData.projects, projects: updated } });
                        }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="admin-form-grid">
                      <div className="admin-form-group">
                        <label className="admin-label">Project Title</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={proj.title}
                          onChange={(e) => {
                            const updated = [...formData.projects.projects];
                            updated[idx].title = e.target.value;
                            setFormData({ ...formData, projects: { ...formData.projects, projects: updated } });
                          }}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Category</label>
                        <select
                          className="admin-select"
                          value={proj.category}
                          onChange={(e) => {
                            const updated = [...formData.projects.projects];
                            updated[idx].category = e.target.value as any;
                            setFormData({ ...formData, projects: { ...formData.projects, projects: updated } });
                          }}
                        >
                          <option value="Business Website">Business Website</option>
                          <option value="Web Application">Web Application</option>
                          <option value="E-Commerce">E-Commerce</option>
                        </select>
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Mock URL</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={proj.url}
                          onChange={(e) => {
                            const updated = [...formData.projects.projects];
                            updated[idx].url = e.target.value;
                            setFormData({ ...formData, projects: { ...formData.projects, projects: updated } });
                          }}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Impact Metric Badge</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={proj.metric}
                          onChange={(e) => {
                            const updated = [...formData.projects.projects];
                            updated[idx].metric = e.target.value;
                            setFormData({ ...formData, projects: { ...formData.projects, projects: updated } });
                          }}
                        />
                      </div>
                      <div className="admin-form-group col-span-2">
                        <label className="admin-label">Cover Image URL</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={proj.image}
                          onChange={(e) => {
                            const updated = [...formData.projects.projects];
                            updated[idx].image = e.target.value;
                            setFormData({ ...formData, projects: { ...formData.projects, projects: updated } });
                          }}
                        />
                      </div>
                      <div className="admin-form-group col-span-2">
                        <label className="admin-label">Short Description</label>
                        <textarea
                          rows={2}
                          className="admin-textarea"
                          value={proj.description}
                          onChange={(e) => {
                            const updated = [...formData.projects.projects];
                            updated[idx].description = e.target.value;
                            setFormData({ ...formData, projects: { ...formData.projects, projects: updated } });
                          }}
                        />
                      </div>
                      <div className="admin-form-group col-span-2">
                        <label className="admin-label">Full Case Study & Challenge Narrative</label>
                        <textarea
                          rows={3}
                          className="admin-textarea"
                          value={proj.fullCaseStudy}
                          onChange={(e) => {
                            const updated = [...formData.projects.projects];
                            updated[idx].fullCaseStudy = e.target.value;
                            setFormData({ ...formData, projects: { ...formData.projects, projects: updated } });
                          }}
                        />
                      </div>
                      <div className="admin-form-group col-span-2">
                        <label className="admin-label">
                          <span>Engineered Deliverables</span>
                          <span className="admin-label-hint">Separated by semicolon (;)</span>
                        </label>
                        <input
                          type="text"
                          className="admin-input"
                          value={proj.deliverables.join('; ')}
                          onChange={(e) => {
                            const updated = [...formData.projects.projects];
                            updated[idx].deliverables = e.target.value.split(';').map((s) => s.trim()).filter(Boolean);
                            setFormData({ ...formData, projects: { ...formData.projects, projects: updated } });
                          }}
                        />
                      </div>
                      <div className="admin-form-group col-span-2">
                        <label className="admin-label">
                          <span>Tech Stack Pills</span>
                          <span className="admin-label-hint">Comma-separated</span>
                        </label>
                        <input
                          type="text"
                          className="admin-input"
                          value={proj.tech.join(', ')}
                          onChange={(e) => {
                            const updated = [...formData.projects.projects];
                            updated[idx].tech = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                            setFormData({ ...formData, projects: { ...formData.projects, projects: updated } });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  className="admin-add-item-btn"
                  onClick={() => {
                    const newProj: IProjectItem = {
                      id: `project-${Date.now()}`,
                      title: 'New Client Flagship',
                      category: 'Business Website',
                      url: 'brandnewproject.com',
                      metric: '⚡ 99/100 Lighthouse',
                      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80&auto=format&fit=crop',
                      description: 'High-performance web architecture engineered for digital dominance.',
                      fullCaseStudy: 'Our team built a bespoke solution resulting in substantial speed and conversion improvements.',
                      stats: [
                        { label: 'Speed Increase', value: '+120%' },
                        { label: 'Conversion Lift', value: '+45%' },
                      ],
                      deliverables: [
                        'Custom React & Next.js Production Architecture',
                        'Sub-second Edge Cloud Deployment',
                      ],
                      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
                    };
                    setFormData({
                      ...formData,
                      projects: {
                        ...formData.projects,
                        projects: [...formData.projects.projects, newProj],
                      },
                    });
                  }}
                >
                  <Plus size={15} /> Add New Project Card
                </button>
              </div>
            </section>
          )}

          {/* TAB 7: ADVANTAGES */}
          {activeTab === 'advantages' && (
            <section>
              <div className="admin-section-header">
                <div className="admin-section-title-wrap">
                  <h2>Advantages Section & Spotlight Bento Cards</h2>
                  <p>Configure the 4 interactive Spotlight cards highlighting performance, WebGL 3D motion, and enterprise backing.</p>
                </div>
              </div>

              <div className="admin-card">
                <div className="admin-card-header">
                  <h3>Section Header</h3>
                </div>
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-label">Section Tag</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.advantages.sectionTag}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          advantages: { ...formData.advantages, sectionTag: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Title</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.advantages.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          advantages: { ...formData.advantages, title: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group col-span-2">
                    <label className="admin-label">Description</label>
                    <textarea
                      rows={2}
                      className="admin-textarea"
                      value={formData.advantages.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          advantages: { ...formData.advantages, description: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Bento Cards */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <h3>Bento Cards ({formData.advantages.cards.length})</h3>
                </div>
                {formData.advantages.cards.map((card, idx) => (
                  <div key={card.id || idx} className="admin-item-card">
                    <div className="admin-item-top">
                      <span className="admin-item-badge">Bento Card {idx + 1} {card.isLarge ? '• Large Span' : ''}</span>
                    </div>

                    <div className="admin-form-grid">
                      <div className="admin-form-group">
                        <label className="admin-label">Title</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={card.title}
                          onChange={(e) => {
                            const updated = [...formData.advantages.cards];
                            updated[idx].title = e.target.value;
                            setFormData({ ...formData, advantages: { ...formData.advantages, cards: updated } });
                          }}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Metric Badge</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={card.metric}
                          onChange={(e) => {
                            const updated = [...formData.advantages.cards];
                            updated[idx].metric = e.target.value;
                            setFormData({ ...formData, advantages: { ...formData.advantages, cards: updated } });
                          }}
                        />
                      </div>
                      <div className="admin-form-group col-span-2">
                        <label className="admin-label">Description</label>
                        <textarea
                          rows={2}
                          className="admin-textarea"
                          value={card.description}
                          onChange={(e) => {
                            const updated = [...formData.advantages.cards];
                            updated[idx].description = e.target.value;
                            setFormData({ ...formData, advantages: { ...formData.advantages, cards: updated } });
                          }}
                        />
                      </div>
                      <div className="admin-form-group col-span-2">
                        <label className="admin-label">
                          <span>Highlight Tags</span>
                          <span className="admin-label-hint">Comma-separated</span>
                        </label>
                        <input
                          type="text"
                          className="admin-input"
                          value={card.tags.join(', ')}
                          onChange={(e) => {
                            const updated = [...formData.advantages.cards];
                            updated[idx].tags = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                            setFormData({ ...formData, advantages: { ...formData.advantages, cards: updated } });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* TAB 8: CONTACT */}
          {activeTab === 'contact' && (
            <section>
              <div className="admin-section-header">
                <div className="admin-section-title-wrap">
                  <h2>Contact Information & Project Inquiry Form</h2>
                  <p>Manage official business email, phone, response SLA, and project scope chips.</p>
                </div>
              </div>

              <div className="admin-card">
                <div className="admin-card-header">
                  <h3>Contact Channels & Guarantees</h3>
                </div>
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-label">Section Tag</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.contact.sectionTag}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, sectionTag: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Title</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.contact.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, title: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group col-span-2">
                    <label className="admin-label">Description</label>
                    <textarea
                      rows={2}
                      className="admin-textarea"
                      value={formData.contact.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, description: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Official Business Email</label>
                    <input
                      type="email"
                      className="admin-input"
                      value={formData.contact.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, email: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Phone / WhatsApp Number</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.contact.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, phone: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group col-span-2">
                    <label className="admin-label">Response Guarantee Badge</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.contact.responseBadge}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, responseBadge: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group col-span-2">
                    <label className="admin-label">
                      <span>Inquiry Service Chips</span>
                      <span className="admin-label-hint">Comma-separated</span>
                    </label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.contact.servicesList.join(', ')}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: {
                            ...formData.contact,
                            servicesList: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* TAB 9: FOOTER & SOCIALS */}
          {activeTab === 'footer' && (
            <section>
              <div className="admin-section-header">
                <div className="admin-section-title-wrap">
                  <h2>Footer & Social Media Channels</h2>
                  <p>Configure company taglines, ChargeEase affiliation subtext, copyright notice, and social URLs.</p>
                </div>
              </div>

              <div className="admin-card">
                <div className="admin-card-header">
                  <h3>Brand Tagline & Copyright</h3>
                </div>
                <div className="admin-form-grid">
                  <div className="admin-form-group col-span-2">
                    <label className="admin-label">Brand Tagline</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.footer.tagline}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          footer: { ...formData.footer, tagline: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group col-span-2">
                    <label className="admin-label">ChargeEase Subtagline</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.footer.subtagline}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          footer: { ...formData.footer, subtagline: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group col-span-2">
                    <label className="admin-label">Copyright Notice</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.footer.copyright}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          footer: { ...formData.footer, copyright: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="admin-card">
                <div className="admin-card-header">
                  <h3>Official Social Links</h3>
                </div>
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-label">LinkedIn Profile URL</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.footer.socials.linkedin}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          footer: {
                            ...formData.footer,
                            socials: { ...formData.footer.socials, linkedin: e.target.value },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Instagram Profile URL</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.footer.socials.instagram}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          footer: {
                            ...formData.footer,
                            socials: { ...formData.footer.socials, instagram: e.target.value },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Twitter / X Profile URL</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.footer.socials.twitter}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          footer: {
                            ...formData.footer,
                            socials: { ...formData.footer.socials, twitter: e.target.value },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">GitHub Organization URL</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.footer.socials.github}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          footer: {
                            ...formData.footer,
                            socials: { ...formData.footer.socials, github: e.target.value },
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Sticky Bottom Save Bar */}
          <div className="admin-bottom-bar">
            <div className="admin-save-prompt">
              Press <strong>Ctrl + S</strong> or click Save to publish changes immediately.
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={navigateToLive}
              >
                Exit to Website
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                onClick={handleSave}
                disabled={saving}
              >
                <Save size={15} />
                <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Toast Notification */}
      {toast && (
        <div className={`admin-toast ${toast.type}`}>
          {toast.type === 'success' ? (
            <CheckCircle2 size={18} className="text-[#10b981]" />
          ) : (
            <AlertCircle size={18} className="text-[#ef4444]" />
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default Admin;
