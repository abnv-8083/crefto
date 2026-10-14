import React, { useState, useRef } from 'react';
import {
  Plus,
  Trash2,
  Copy,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ArrowDown,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  Search,
  Sparkles,
  Layers,
  X,
  RefreshCw,
  Globe,
  Sliders,
} from 'lucide-react';
import { IProjectsContent, IProjectItem } from '../../context/ContentContext';
import { uploadImageToCloudinary } from '../../services/api';
import './ProjectManager.css';

interface ProjectManagerProps {
  projectsContent: IProjectsContent;
  onChange: (updated: IProjectsContent) => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

// Client-side image optimization helper
const processAndOptimizeImage = (file: File, maxWidth = 1280, quality = 0.85): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Use webp if supported, or jpeg
        const dataUrl = canvas.toDataURL('image/webp', quality);
        resolve(dataUrl);
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const ProjectManager: React.FC<ProjectManagerProps> = ({
  projectsContent,
  onChange,
  showToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilterCategory, setSelectedFilterCategory] = useState('All');
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});
  const [dragOverProjectId, setDragOverProjectId] = useState<string | null>(null);
  const [processingImageId, setProcessingImageId] = useState<string | null>(null);
  const [urlInputModes, setUrlInputModes] = useState<Record<string, boolean>>({});

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const projects = projectsContent.projects || [];
  const categories = projectsContent.categories || ['All', 'Business Website', 'Web Application', 'E-Commerce'];

  // Toggle individual card accordion
  const toggleExpand = (id: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const next: Record<string, boolean> = {};
    projects.forEach((p) => {
      next[p.id] = true;
    });
    setExpandedProjects(next);
  };

  const collapseAll = () => {
    setExpandedProjects({});
  };

  // Update a single project property
  const updateProject = (index: number, updates: Partial<IProjectItem>) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = { ...updatedProjects[index], ...updates };
    onChange({
      ...projectsContent,
      projects: updatedProjects,
    });
  };

  // Reorder projects (move up / down)
  const moveProject = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === projects.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updatedProjects = [...projects];
    const [moved] = updatedProjects.splice(index, 1);
    updatedProjects.splice(targetIndex, 0, moved);

    onChange({
      ...projectsContent,
      projects: updatedProjects,
    });
    showToast(`Project moved ${direction}`, 'success');
  };

  // Duplicate a project
  const duplicateProject = (index: number) => {
    const original = projects[index];
    const duplicated: IProjectItem = {
      ...original,
      id: `project-${Date.now()}`,
      title: `${original.title} (Copy)`,
    };
    const updatedProjects = [...projects];
    updatedProjects.splice(index + 1, 0, duplicated);

    onChange({
      ...projectsContent,
      projects: updatedProjects,
    });
    setExpandedProjects((prev) => ({ ...prev, [duplicated.id]: true }));
    showToast(`Duplicated "${original.title}"`, 'success');
  };

  // Delete a project
  const deleteProject = (index: number) => {
    const target = projects[index];
    if (window.confirm(`Are you sure you want to delete "${target.title}"?`)) {
      const updatedProjects = projects.filter((_, i) => i !== index);
      onChange({
        ...projectsContent,
        projects: updatedProjects,
      });
      showToast(`Deleted "${target.title}"`, 'success');
    }
  };

  // Add a new project
  const addNewProject = () => {
    const newProj: IProjectItem = {
      id: `project-${Date.now()}`,
      title: 'New Client Flagship',
      category: 'Business Website',
      url: 'newproject.com',
      metric: '⚡ 99/100 Lighthouse',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80&auto=format&fit=crop',
      description: 'High-performance bespoke web architecture engineered for market leadership.',
      fullCaseStudy: 'We engineered a bespoke solution resulting in substantial speed and conversion improvements.',
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

    onChange({
      ...projectsContent,
      projects: [newProj, ...projects],
    });

    setExpandedProjects((prev) => ({ ...prev, [newProj.id]: true }));
    showToast('New project created! Ready for image upload.', 'success');
  };

  // Handle image file upload (via file input or drag-and-drop to Cloudinary)
  const handleImageFile = async (index: number, file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please upload a valid image file (PNG, JPG, WebP, SVG)', 'error');
      return;
    }

    const projId = projects[index].id;
    setProcessingImageId(projId);

    try {
      // 1. Upload to Cloudinary CDN
      try {
        const uploadRes = await uploadImageToCloudinary(file, 'projects');
        updateProject(index, { image: uploadRes.secure_url });
        showToast('Image uploaded to Cloudinary CDN successfully!', 'success');
        return;
      } catch (cloudErr) {
        console.warn('Cloudinary API error, falling back to local optimization:', cloudErr);
      }

      // 2. Fallback to client-side optimized dataUrl if upload endpoint is offline
      const optimizedDataUrl = await processAndOptimizeImage(file);
      updateProject(index, { image: optimizedDataUrl });
      showToast('Image optimized and loaded locally.', 'success');
    } catch {
      showToast('Failed to process image. Please try again.', 'error');
    } finally {
      setProcessingImageId(null);
    }
  };

  // Filter projects by search and category
  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      selectedFilterCategory === 'All' || p.category.toLowerCase() === selectedFilterCategory.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      p.title.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.url.toLowerCase().includes(query) ||
      p.tech.some((t) => t.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="project-manager-container">
      {/* 1. Header & Section Config */}
      <div className="admin-section-header">
        <div className="admin-section-title-wrap">
          <h2>Project Portfolio & 3D Card Management</h2>
          <p>
            Manage client showcase projects, upload high-res cover screenshots, configure metrics, and reorder the 3D deck.
          </p>
        </div>
        <button type="button" className="admin-btn admin-btn-primary" onClick={addNewProject}>
          <Plus size={16} />
          <span>New Project</span>
        </button>
      </div>

      {/* Global Section Metadata */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>
            <Sliders size={16} className="text-[#FF3838]" />
            <span>Section Header & Category Filter Tags</span>
          </h3>
        </div>
        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label className="admin-label">Section Tag</label>
            <input
              type="text"
              className="admin-input"
              value={projectsContent.sectionTag}
              onChange={(e) => onChange({ ...projectsContent, sectionTag: e.target.value })}
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Title</label>
            <input
              type="text"
              className="admin-input"
              value={projectsContent.title}
              onChange={(e) => onChange({ ...projectsContent, title: e.target.value })}
            />
          </div>
          <div className="admin-form-group col-span-2">
            <label className="admin-label">Description</label>
            <textarea
              rows={2}
              className="admin-textarea"
              value={projectsContent.description}
              onChange={(e) => onChange({ ...projectsContent, description: e.target.value })}
            />
          </div>
          <div className="admin-form-group col-span-2">
            <label className="admin-label">
              <span>Filter Categories (Live Tab Bar)</span>
              <span className="admin-label-hint">Comma-separated</span>
            </label>
            <input
              type="text"
              className="admin-input"
              value={projectsContent.categories.join(', ')}
              onChange={(e) =>
                onChange({
                  ...projectsContent,
                  categories: e.target.value
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
            />
          </div>
        </div>
      </div>

      {/* 2. Management Toolbar & Filter Bar */}
      <div className="project-mgmt-toolbar">
        <div className="project-mgmt-search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search projects by title, category, or tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="project-search-input"
          />
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery('')} className="clear-search-btn">
              <X size={14} />
            </button>
          )}
        </div>

        <div className="project-mgmt-category-pills">
          {['All', ...categories.filter((c) => c !== 'All')].map((cat) => (
            <button
              key={cat}
              type="button"
              className={`cat-pill-btn ${selectedFilterCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedFilterCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="project-mgmt-view-actions">
          <span className="project-count-badge">
            {filteredProjects.length} of {projects.length} Projects
          </span>
          <button type="button" onClick={expandAll} className="view-toggle-btn">
            Expand All
          </button>
          <button type="button" onClick={collapseAll} className="view-toggle-btn">
            Collapse All
          </button>
        </div>
      </div>

      {/* 3. Projects List with Image Upload */}
      <div className="project-cards-stack">
        {filteredProjects.length === 0 ? (
          <div className="project-empty-state">
            <Layers size={36} className="text-[#FF3838]" />
            <h4>No projects found</h4>
            <p>Try clearing your search query or add a new project card.</p>
            <button type="button" className="admin-btn admin-btn-primary" onClick={addNewProject}>
              <Plus size={15} /> Add First Project
            </button>
          </div>
        ) : (
          filteredProjects.map((proj) => {
            const actualIndex = projects.findIndex((p) => p.id === proj.id);
            const isExpanded = expandedProjects[proj.id] ?? false;
            const isUrlMode = urlInputModes[proj.id] ?? false;
            const isDragging = dragOverProjectId === proj.id;
            const isProcessing = processingImageId === proj.id;

            return (
              <div key={proj.id} className={`project-item-card ${isExpanded ? 'expanded' : 'collapsed'}`}>
                {/* Card Header Bar */}
                <div className="project-item-header" onClick={() => toggleExpand(proj.id)}>
                  <div className="project-header-left">
                    {/* Small thumbnail preview */}
                    <div className="project-header-thumb">
                      {proj.image ? (
                        <img src={proj.image} alt={proj.title} />
                      ) : (
                        <ImageIcon size={18} className="thumb-placeholder-icon" />
                      )}
                    </div>
                    <div className="project-header-info">
                      <div className="project-header-title-row">
                        <span className="project-index-tag">#{actualIndex + 1}</span>
                        <strong className="project-title-text">{proj.title}</strong>
                        <span className="project-category-badge">{proj.category}</span>
                      </div>
                      <div className="project-header-meta">
                        <span className="project-url-meta">
                          <Globe size={11} />
                          {proj.url || 'No URL'}
                        </span>
                        <span className="project-metric-meta">
                          <Sparkles size={11} className="text-[#FF3838]" />
                          {proj.metric || 'No metric'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions in header */}
                  <div className="project-header-actions" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      className="header-action-btn"
                      onClick={() => moveProject(actualIndex, 'up')}
                      disabled={actualIndex === 0}
                      title="Move card up in 3D deck"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      type="button"
                      className="header-action-btn"
                      onClick={() => moveProject(actualIndex, 'down')}
                      disabled={actualIndex === projects.length - 1}
                      title="Move card down in 3D deck"
                    >
                      <ArrowDown size={14} />
                    </button>
                    <button
                      type="button"
                      className="header-action-btn"
                      onClick={() => duplicateProject(actualIndex)}
                      title="Duplicate project"
                    >
                      <Copy size={14} />
                    </button>
                    <button
                      type="button"
                      className="header-action-btn danger"
                      onClick={() => deleteProject(actualIndex)}
                      title="Delete project"
                    >
                      <Trash2 size={14} />
                    </button>
                    <button
                      type="button"
                      className="header-action-btn chevron"
                      onClick={() => toggleExpand(proj.id)}
                      title={isExpanded ? 'Collapse' : 'Expand'}
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>

                {/* Collapsible Content Body */}
                {isExpanded && (
                  <div className="project-item-body">
                    {/* Media Upload & Preview Row */}
                    <div className="project-media-section">
                      <div className="project-media-preview-box">
                        <label className="admin-label">
                          <span>Project Cover Image Preview</span>
                          <span className="admin-label-hint">Live 16:9 3D Deck Mockup</span>
                        </label>

                        <div className="project-preview-frame">
                          {proj.image ? (
                            <img src={proj.image} alt={proj.title} className="preview-img" />
                          ) : (
                            <div className="no-image-placeholder">
                              <ImageIcon size={32} />
                              <span>No cover image selected</span>
                            </div>
                          )}

                          {isProcessing && (
                            <div className="preview-loading-overlay">
                              <RefreshCw size={24} className="spin-icon" />
                              <span>Uploading to Cloudinary...</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Dropzone & Upload Controls */}
                      <div className="project-upload-controls-box">
                        <div className="upload-header-toggle">
                          <label className="admin-label">Upload or Link Media</label>
                          <div className="mode-toggle-pills">
                            <button
                              type="button"
                              className={`mode-btn ${!isUrlMode ? 'active' : ''}`}
                              onClick={() => setUrlInputModes((prev) => ({ ...prev, [proj.id]: false }))}
                            >
                              <Upload size={12} /> Upload File
                            </button>
                            <button
                              type="button"
                              className={`mode-btn ${isUrlMode ? 'active' : ''}`}
                              onClick={() => setUrlInputModes((prev) => ({ ...prev, [proj.id]: true }))}
                            >
                              <LinkIcon size={12} /> Image URL
                            </button>
                          </div>
                        </div>

                        {!isUrlMode ? (
                          /* Drag & Drop File Upload Box */
                          <div
                            className={`image-dropzone ${isDragging ? 'drag-over' : ''}`}
                            onDragOver={(e) => {
                              e.preventDefault();
                              setDragOverProjectId(proj.id);
                            }}
                            onDragLeave={() => setDragOverProjectId(null)}
                            onDrop={(e) => {
                              e.preventDefault();
                              setDragOverProjectId(null);
                              const file = e.dataTransfer.files?.[0];
                              if (file) handleImageFile(actualIndex, file);
                            }}
                            onClick={() => fileInputRefs.current[proj.id]?.click()}
                          >
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden-file-input"
                              ref={(el) => {
                                fileInputRefs.current[proj.id] = el;
                              }}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageFile(actualIndex, file);
                              }}
                            />
                            <div className="dropzone-icon-wrap">
                              <Upload size={24} className="text-[#FF3838]" />
                            </div>
                            <strong className="dropzone-title">Click to upload or drag & drop</strong>
                            <p className="dropzone-hint">
                              PNG, JPG, WebP, or SVG • Auto-optimized for instant 3D rendering
                            </p>
                          </div>
                        ) : (
                          /* Manual Image URL Input Box */
                          <div className="image-url-input-box">
                            <input
                              type="text"
                              className="admin-input"
                              placeholder="Paste image URL (https://...)"
                              value={proj.image}
                              onChange={(e) => updateProject(actualIndex, { image: e.target.value })}
                            />
                            <p className="url-hint">
                              Supports any direct image URL from Unsplash, CDN, or Cloudinary.
                            </p>
                          </div>
                        )}

                        {/* Quick Action Buttons for Media */}
                        <div className="image-action-buttons">
                          <button
                            type="button"
                            className="img-action-btn"
                            onClick={() => fileInputRefs.current[proj.id]?.click()}
                          >
                            <Upload size={13} /> Change Image
                          </button>
                          {proj.image && (
                            <button
                              type="button"
                              className="img-action-btn danger"
                              onClick={() => updateProject(actualIndex, { image: '' })}
                            >
                              <Trash2 size={13} /> Remove Image
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Form Fields Grid */}
                    <div className="admin-form-grid">
                      <div className="admin-form-group">
                        <label className="admin-label">Project Title</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={proj.title}
                          onChange={(e) => updateProject(actualIndex, { title: e.target.value })}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-label">Category</label>
                        <select
                          className="admin-select"
                          value={proj.category}
                          onChange={(e) => updateProject(actualIndex, { category: e.target.value as any })}
                        >
                          {categories
                            .filter((c) => c !== 'All')
                            .map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-label">Live Display Mock URL</label>
                        <input
                          type="text"
                          className="admin-input"
                          placeholder="e.g. clientbrand.com"
                          value={proj.url}
                          onChange={(e) => updateProject(actualIndex, { url: e.target.value })}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-label">Impact Metric Badge</label>
                        <input
                          type="text"
                          className="admin-input"
                          placeholder="e.g. ⚡ 99/100 Lighthouse"
                          value={proj.metric}
                          onChange={(e) => updateProject(actualIndex, { metric: e.target.value })}
                        />
                      </div>

                      <div className="admin-form-group col-span-2">
                        <label className="admin-label">Short Description (Card Deck Hover)</label>
                        <textarea
                          rows={2}
                          className="admin-textarea"
                          value={proj.description}
                          onChange={(e) => updateProject(actualIndex, { description: e.target.value })}
                        />
                      </div>

                      <div className="admin-form-group col-span-2">
                        <label className="admin-label">Full Case Study Narrative (Modal Detail View)</label>
                        <textarea
                          rows={3}
                          className="admin-textarea"
                          value={proj.fullCaseStudy}
                          onChange={(e) => updateProject(actualIndex, { fullCaseStudy: e.target.value })}
                        />
                      </div>

                      {/* Dynamic Key Stats Editor */}
                      <div className="admin-form-group col-span-2">
                        <label className="admin-label">
                          <span>Key Metrics & Performance Stats</span>
                          <button
                            type="button"
                            className="inline-add-btn"
                            onClick={() => {
                              const newStats = [...(proj.stats || []), { label: 'New Metric', value: '+100%' }];
                              updateProject(actualIndex, { stats: newStats });
                            }}
                          >
                            <Plus size={12} /> Add Metric
                          </button>
                        </label>
                        <div className="stats-editor-grid">
                          {(proj.stats || []).map((st, sIdx) => (
                            <div key={sIdx} className="stat-editor-item">
                              <input
                                type="text"
                                className="admin-input stat-val-input"
                                placeholder="+120%"
                                value={st.value}
                                onChange={(e) => {
                                  const updatedStats = [...proj.stats];
                                  updatedStats[sIdx].value = e.target.value;
                                  updateProject(actualIndex, { stats: updatedStats });
                                }}
                              />
                              <input
                                type="text"
                                className="admin-input stat-label-input"
                                placeholder="Speed Increase"
                                value={st.label}
                                onChange={(e) => {
                                  const updatedStats = [...proj.stats];
                                  updatedStats[sIdx].label = e.target.value;
                                  updateProject(actualIndex, { stats: updatedStats });
                                }}
                              />
                              <button
                                type="button"
                                className="delete-stat-btn"
                                onClick={() => {
                                  const updatedStats = proj.stats.filter((_, i) => i !== sIdx);
                                  updateProject(actualIndex, { stats: updatedStats });
                                }}
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Deliverables Editor */}
                      <div className="admin-form-group col-span-2">
                        <label className="admin-label">
                          <span>Engineered Deliverables</span>
                          <span className="admin-label-hint">Separated by semicolon (;)</span>
                        </label>
                        <input
                          type="text"
                          className="admin-input"
                          value={(proj.deliverables || []).join('; ')}
                          onChange={(e) => {
                            const updated = e.target.value
                              .split(';')
                              .map((s) => s.trim())
                              .filter(Boolean);
                            updateProject(actualIndex, { deliverables: updated });
                          }}
                        />
                      </div>

                      {/* Tech Stack Pills Editor */}
                      <div className="admin-form-group col-span-2">
                        <label className="admin-label">
                          <span>Tech Stack Pills</span>
                          <span className="admin-label-hint">Comma-separated</span>
                        </label>
                        <input
                          type="text"
                          className="admin-input"
                          value={(proj.tech || []).join(', ')}
                          onChange={(e) => {
                            const updated = e.target.value
                              .split(',')
                              .map((s) => s.trim())
                              .filter(Boolean);
                            updateProject(actualIndex, { tech: updated });
                          }}
                        />
                        {/* Interactive Pill Display */}
                        <div className="tech-pills-preview">
                          {(proj.tech || []).map((t, tIdx) => (
                            <span key={tIdx} className="tech-pill">
                              {t}
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = proj.tech.filter((_, i) => i !== tIdx);
                                  updateProject(actualIndex, { tech: updated });
                                }}
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProjectManager;
