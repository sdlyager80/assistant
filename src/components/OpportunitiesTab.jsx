import React, { useState, useMemo } from 'react';
import './OpportunitiesTab.css';

const OpportunitiesTab = ({ opportunities, onRefresh }) => {
  const [selectedStage, setSelectedStage] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const stages = [
    { label: 'All', value: 'All' },
    { label: 'Qualify', value: 'Qualify' },
    { label: 'Develop', value: 'Develop' },
    { label: 'Propose', value: 'Propose' },
    { label: 'Negotiate', value: 'Negotiate' },
    { label: 'Closed', value: 'Closed' }
  ];

  const filteredOpportunities = useMemo(() => {
    if (selectedStage === 'All') return opportunities;
    return opportunities.filter(opp => opp.stage === selectedStage);
  }, [opportunities, selectedStage]);

  const paginatedOpportunities = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredOpportunities.slice(startIndex, startIndex + pageSize);
  }, [filteredOpportunities, currentPage]);

  const totalPages = Math.ceil(filteredOpportunities.length / pageSize);

  const getStageProgress = (stage) => {
    const stages = ['Qualify', 'Develop', 'Propose', 'Negotiate', 'Closed'];
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
      case 'Qualify': return 'user-check';
      case 'Develop': return 'lightbulb';
      case 'Propose': return 'file-contract';
      case 'Negotiate': return 'handshake';
      case 'Closed': return 'check-circle';
      default: return 'circle';
    }
  };

  const getRatingColor = (rating) => {
    switch (rating) {
      case 'High': return 'chip-error';
      case 'Medium': return 'chip-warning';
      case 'Low': return 'chip-info';
      default: return 'chip-default';
    }
  };

  return (
    <div className="opportunities-tab">
      <div className="section-header">
        <div className="title-section">
          <h2 className="section-title">All Opportunities</h2>
          <span className="chip chip-info">{filteredOpportunities.length}</span>
        </div>

        <div className="filter-section">
          <label htmlFor="stage-filter">
            <i className="fas fa-filter"></i> Filter by Stage
          </label>
          <select
            id="stage-filter"
            className="dropdown"
            value={selectedStage}
            onChange={(e) => {
              setSelectedStage(e.target.value);
              setCurrentPage(1);
            }}
          >
            {stages.map((stage) => (
              <option key={stage.value} value={stage.value}>
                {stage.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="opportunities-grid">
        {paginatedOpportunities.length > 0 ? (
          paginatedOpportunities.map((opp) => {
            const stageProgress = getStageProgress(opp.stage);

            return (
              <div key={opp.sys_id} className="opportunity-card card">
                <div className="card-header">
                  <span className="badge badge-grey">{opp.number}</span>
                  <span className="chip chip-small">{opp.sales_cycle_type}</span>
                </div>

                <div className="card-body">
                  <h3 className="card-title">
                    <i className="fas fa-user"></i> {opp.consumer}
                  </h3>

                  <div className="card-meta">
                    <div className="meta-item">
                      <span>{opp.short_description}</span>
                    </div>
                    {opp.rating && (
                      <span className={`chip chip-small ${getRatingColor(opp.rating)}`}>
                        {opp.rating}
                      </span>
                    )}
                  </div>

                  <div className="card-stats">
                    <div className="stat-item">
                      <i className="fas fa-money-bill-wave"></i>
                      <span>{opp.amount}</span>
                    </div>
                    <div className="stat-item">
                      <i className="fas fa-industry"></i>
                      <span>{opp.industry}</span>
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <button className="btn btn-primary btn-small">
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
          })
        ) : (
          <div className="no-data">
            <i className="fas fa-inbox" style={{ fontSize: '3rem', color: '#ccc' }}></i>
            <p>No opportunities found</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination-wrapper">
          <div className="paginator">
            <button
              className="page-btn"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="page-btn"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpportunitiesTab;
