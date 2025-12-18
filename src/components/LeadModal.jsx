import React, { useState } from 'react';
import './LeadModal.css';

const LeadModal = ({ lead, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...lead });

  const stages = ['New', 'Contacted', 'Nurturing', 'Qualified', 'Disqualified'];
  const industries = ['Insurance', 'Finance', 'Technology', 'Healthcare'];
  const ratings = ['Cold', 'Warm', 'Hot', 'Super Hot'];
  const leadTypes = ['New Business', 'Existing Business'];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...lead });
    setIsEditing(false);
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-dialog">
        <div className="lead-modal-content">
          <div className="modal-header">
            <h3>Lead: {lead.number}</h3>
            <button className="btn-icon" onClick={onClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="modal-body">
            {/* Personal Information */}
            <div className="form-section">
              <h4>Personal Information</h4>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="first_name">First Name</label>
                  <input
                    id="first_name"
                    type="text"
                    className="form-input"
                    value={formData.first_name || ''}
                    onChange={(e) => handleChange('first_name', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="last_name">Last Name</label>
                  <input
                    id="last_name"
                    type="text"
                    className="form-input"
                    value={formData.last_name || ''}
                    onChange={(e) => handleChange('last_name', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="form-input"
                    value={formData.email || ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="business_phone">Business Phone</label>
                  <input
                    id="business_phone"
                    type="tel"
                    className="form-input"
                    value={formData.business_phone || ''}
                    onChange={(e) => handleChange('business_phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    type="text"
                    className="form-input"
                    value={formData.company || ''}
                    onChange={(e) => handleChange('company', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            {/* Lead Details */}
            <div className="form-section">
              <h4>Lead Details</h4>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="stage">Stage</label>
                  <select
                    id="stage"
                    className="form-input"
                    value={formData.stage || ''}
                    onChange={(e) => handleChange('stage', e.target.value)}
                    disabled={!isEditing}
                  >
                    {stages.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="lead_type">Lead Type</label>
                  <select
                    id="lead_type"
                    className="form-input"
                    value={formData.lead_type || ''}
                    onChange={(e) => handleChange('lead_type', e.target.value)}
                    disabled={!isEditing}
                  >
                    {leadTypes.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="lead_rating">Rating</label>
                  <select
                    id="lead_rating"
                    className="form-input"
                    value={formData.lead_rating || ''}
                    onChange={(e) => handleChange('lead_rating', e.target.value)}
                    disabled={!isEditing}
                  >
                    {ratings.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="industry">Industry</label>
                  <select
                    id="industry"
                    className="form-input"
                    value={formData.industry || ''}
                    onChange={(e) => handleChange('industry', e.target.value)}
                    disabled={!isEditing}
                  >
                    {industries.map(i => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            {!isEditing ? (
              <div className="button-group">
                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button className="btn btn-secondary" onClick={onClose}>
                  Close
                </button>
              </div>
            ) : (
              <div className="button-group">
                <button className="btn btn-primary" onClick={handleSave}>
                  <i className="fas fa-save"></i> Save
                </button>
                <button className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadModal;
