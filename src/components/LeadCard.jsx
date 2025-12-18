import React from 'react';
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
      case 'Hot': return 'chip-error';
      case 'Warm': return 'chip-warning';
      case 'Cold': return 'chip-info';
      case 'Super Hot': return 'chip-error';
      default: return 'chip-default';
    }
  };

  const stageProgress = getStageProgress(lead.stage);

  return (
    <div className="lead-card card">
      <div className="card-header">
        <span className="badge badge-grey">{lead.number}</span>
        <span className="chip chip-small">{lead.lead_type}</span>
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
            <span className={`chip chip-small ${getRatingColor(lead.lead_rating)}`}>
              {lead.lead_rating}
            </span>
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
        <button className="btn btn-primary btn-small" onClick={onClick}>
          <i className="fas fa-clipboard"></i> View
        </button>
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
    </div>
  );
};

export default LeadCard;
