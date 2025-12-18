import React, { useState } from 'react';
import {
  DxcDialog,
  DxcButton,
  DxcTextInput,
  DxcSelect,
  DxcInset,
  DxcFlex,
  DxcHeading
} from '@dxc-technology/halstack-react';
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
    <DxcDialog
      isVisible={true}
      onBackgroundClick={onClose}
      overlay={true}
    >
      <div className="lead-modal-content">
        <div className="modal-header">
          <DxcHeading level={3} text={`Lead: ${lead.number}`} />
          <DxcButton
            icon="close"
            mode="text"
            onClick={onClose}
            size="small"
          />
        </div>

        <DxcInset space="1.5rem">
          <DxcFlex direction="column" gap="1.5rem">
            {/* Personal Information */}
            <div>
              <DxcHeading level={4} text="Personal Information" />
              <DxcFlex direction="column" gap="1rem" style={{ marginTop: '1rem' }}>
                <DxcFlex gap="1rem">
                  <DxcTextInput
                    label="First Name"
                    value={formData.first_name || ''}
                    onChange={(value) => handleChange('first_name', value)}
                    disabled={!isEditing}
                  />
                  <DxcTextInput
                    label="Last Name"
                    value={formData.last_name || ''}
                    onChange={(value) => handleChange('last_name', value)}
                    disabled={!isEditing}
                  />
                </DxcFlex>

                <DxcTextInput
                  label="Email"
                  value={formData.email || ''}
                  onChange={(value) => handleChange('email', value)}
                  disabled={!isEditing}
                  type="email"
                />

                <DxcTextInput
                  label="Business Phone"
                  value={formData.business_phone || ''}
                  onChange={(value) => handleChange('business_phone', value)}
                  disabled={!isEditing}
                  type="tel"
                />

                <DxcTextInput
                  label="Company"
                  value={formData.company || ''}
                  onChange={(value) => handleChange('company', value)}
                  disabled={!isEditing}
                />
              </DxcFlex>
            </div>

            {/* Lead Details */}
            <div>
              <DxcHeading level={4} text="Lead Details" />
              <DxcFlex direction="column" gap="1rem" style={{ marginTop: '1rem' }}>
                <DxcSelect
                  label="Stage"
                  options={stages.map(s => ({ label: s, value: s }))}
                  value={formData.stage}
                  onChange={(value) => handleChange('stage', value)}
                  disabled={!isEditing}
                />

                <DxcSelect
                  label="Lead Type"
                  options={leadTypes.map(t => ({ label: t, value: t }))}
                  value={formData.lead_type}
                  onChange={(value) => handleChange('lead_type', value)}
                  disabled={!isEditing}
                />

                <DxcSelect
                  label="Rating"
                  options={ratings.map(r => ({ label: r, value: r }))}
                  value={formData.lead_rating}
                  onChange={(value) => handleChange('lead_rating', value)}
                  disabled={!isEditing}
                />

                <DxcSelect
                  label="Industry"
                  options={industries.map(i => ({ label: i, value: i }))}
                  value={formData.industry}
                  onChange={(value) => handleChange('industry', value)}
                  disabled={!isEditing}
                />
              </DxcFlex>
            </div>
          </DxcFlex>
        </DxcInset>

        <div className="modal-footer">
          {!isEditing ? (
            <DxcFlex gap="0.5rem">
              <DxcButton
                label="Edit"
                icon="edit"
                mode="primary"
                onClick={() => setIsEditing(true)}
              />
              <DxcButton
                label="Close"
                mode="secondary"
                onClick={onClose}
              />
            </DxcFlex>
          ) : (
            <DxcFlex gap="0.5rem">
              <DxcButton
                label="Save"
                icon="save"
                mode="primary"
                onClick={handleSave}
              />
              <DxcButton
                label="Cancel"
                mode="secondary"
                onClick={handleCancel}
              />
            </DxcFlex>
          )}
        </div>
      </div>
    </DxcDialog>
  );
};

export default LeadModal;
