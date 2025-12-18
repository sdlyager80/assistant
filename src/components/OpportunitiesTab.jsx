import React, { useState, useMemo } from 'react';
import {
  DxcButton,
  DxcDropdown,
  DxcPaginator,
  DxcChip,
  DxcCard,
  DxcBadge,
  DxcFlex
} from '@dxc-technology/halstack-react';
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
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'info';
      default: return 'default';
    }
  };

  return (
    <div className="opportunities-tab">
      <div className="section-header">
        <div className="title-section">
          <h2 className="section-title">All Opportunities</h2>
          <DxcChip
            label={`${filteredOpportunities.length}`}
            color="info"
          />
        </div>
        
        <div className="filter-section">
          <DxcDropdown
            label="Filter by Stage"
            options={stages}
            onSelectOption={(value) => {
              setSelectedStage(value);
              setCurrentPage(1);
            }}
            icon="filter"
          />
        </div>
      </div>

      <div className="opportunities-grid">
        {paginatedOpportunities.length > 0 ? (
          paginatedOpportunities.map((opp) => {
            const stageProgress = getStageProgress(opp.stage);
            
            return (
              <DxcCard key={opp.sys_id} className="opportunity-card">
                <div className="card-header">
                  <DxcBadge label={opp.number} color="grey" />
                  <DxcChip label={opp.sales_cycle_type} size="small" />
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
                      <DxcChip
                        label={opp.rating}
                        color={getRatingColor(opp.rating)}
                        size="small"
                      />
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
                  <DxcButton
                    label="View"
                    icon="clipboard"
                    size="small"
                    mode="primary"
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
          <DxcPaginator
            currentPage={currentPage}
            itemsPerPage={pageSize}
            totalItems={filteredOpportunities.length}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default OpportunitiesTab;
