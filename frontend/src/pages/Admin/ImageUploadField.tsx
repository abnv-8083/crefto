import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Trash2, RefreshCw, CheckCircle2, Link as LinkIcon } from 'lucide-react';
import { uploadImageToCloudinary } from '../../services/api';
import './ImageUploadField.css';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  showToast?: (message: string, type?: 'success' | 'error') => void;
  hint?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  folder = 'services',
  showToast,
  hint,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isCloudinary = Boolean(value && value.includes('cloudinary.com'));

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      if (showToast) {
        showToast('Please select a valid image file (PNG, JPG, WebP, SVG)', 'error');
      }
      return;
    }

    setIsUploading(true);
    try {
      const res = await uploadImageToCloudinary(file, folder);
      onChange(res.secure_url);
      if (showToast) {
        showToast('Image uploaded to Cloudinary CDN successfully!', 'success');
      }
    } catch (err: any) {
      console.error('Failed to upload image to Cloudinary:', err);
      if (showToast) {
        showToast(err.message || 'Image upload failed. Please try again.', 'error');
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
    // Reset file input so user can pick same file again if desired
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <div className="image-upload-field-container">
      <div className="image-upload-field-header">
        <label className="admin-label">
          <span>{label}</span>
          {hint && <span className="admin-label-hint">{hint}</span>}
        </label>
        {isCloudinary && (
          <span className="image-upload-cdn-badge">
            <CheckCircle2 size={12} /> Cloudinary CDN
          </span>
        )}
      </div>

      <div
        className={`image-upload-card-layout ${isDragging ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleInputChange}
        />

        {/* Thumbnail Preview / Dropzone */}
        <div
          className="image-upload-thumbnail-box"
          onClick={() => fileInputRef.current?.click()}
          title="Click to choose a new image file"
        >
          {isUploading && (
            <div className="image-upload-loading-overlay">
              <RefreshCw size={20} className="spin-icon" />
              <span>Uploading...</span>
            </div>
          )}

          {value ? (
            <img src={value} alt="Preview" className="image-upload-thumbnail-img" />
          ) : (
            <div className="image-upload-empty-state">
              <ImageIcon size={24} />
              <span>Click to Upload</span>
            </div>
          )}
        </div>

        {/* Controls & URL input */}
        <div className="image-upload-controls">
          <div className="image-upload-btn-row">
            <button
              type="button"
              className="image-upload-action-btn primary"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <Upload size={14} />
              <span>{value ? 'Change Image' : 'Upload Image'}</span>
            </button>

            {value && (
              <button
                type="button"
                className="image-upload-action-btn danger"
                onClick={() => onChange('')}
                disabled={isUploading}
                title="Remove image"
              >
                <Trash2 size={14} />
                <span>Remove</span>
              </button>
            )}
          </div>

          {/* Editable URL Input */}
          <div className="image-upload-url-input-wrap">
            <LinkIcon size={13} className="text-gray-400" />
            <input
              type="text"
              className="image-upload-url-input"
              value={value}
              placeholder="Or paste direct image URL (https://...)"
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadField;
