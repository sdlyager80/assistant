import React from 'react';
import { DxcCard, DxcButton, DxcChip, DxcBadge } from '@dxc-technology/halstack-react';
import './LeadCard.css';

const LeadCard = ({ lead, onClick }) => {
  const getStageProgress = (stage) => {
    const stages = ['New', 'Contacted', 'Nurturing', 'Qualified', 'Disqualified'];
    const currentIndex = stages.indexOf(stage);
    
    return stages.map((s, index) => ({
      name: s,
      icon: getStageIcon(s),
      completed: index < currentIndex,
      active: s === stage
    }));
  };

  const getStageIcon = (stage) => {
    switch (stage) {
      case 'New': return 'user-plus';
      case 'Contacted': return 'phone';
      case 'Nurturing': return 'seedling';
      case 'Qualified': return 'check-circle';
      case 'Disqualified': return 'times-circle';
      default: return 'circle';
    }
  };

  const getRatingColor = (rating) => {
    switch (rating) {
      case 'Hot': return 'error';
      case 'Warm': return 'warning';
      case 'Cold': return 'info';
      case 'Super Hot': return 'error';
      default: return 'default';
    }
  };

  const stageProgress = getStageProgress(lead.stage);

  return (
    <DxcCard className="lead-card">
      <div className="card-header">
        <DxcBadge label={lead.number} color="grey" />
        <DxcChip label={lead.lead_type} size="small" />
      </div>

      <div className="card-body">
        <h3 className="card-title">
          <i className="fas fa-user"></i> {lead.first_name} {lead.last_name}
        </h3>

        <div className="card-meta">
          <div className="meta-item">
            <i className="fas fa-building"></i>
            <span>{lead.company}</span>
          </div>
          {lead.lead_rating && (
            <DxcChip
              label={lead.lead_rating}
              color={getRatingColor(lead.lead_rating)}
              size="small"
            />
          )}
        </div>

        <div className="card-contact">
          {lead.business_phone && (
            <div className="contact-item">
              <i className="fas fa-mobile-alt"></i>
              <span>{lead.business_phone}</span>
            </div>
          )}
          {lead.email && (
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <span>{lead.email}</span>
            </div>
          )}
        </div>
      </div>

      <div className="card-footer">
        <DxcButton
          label="View"
          icon="clipboard"
          size="small"
          mode="primary"
          onClick={onClick}
        />
      </div>

      {/* Stage Progress Bar */}
      <div className="stage-progress">
        {stageProgress.map((stage, index) => (
          <div
            key={index}
            className={`progress-step ${stage.completed ? 'completed' : ''} ${stage.active ? 'active' : ''}`}
          >
            <div className="progress-circle">
              <i className={`fas fa-${stage.icon}`}></i>
            </div>
            <p className="progress-label">{stage.name}</p>
          </div>
        ))}
      </div>
    </DxcCard>
  );
};

export default LeadCard;
