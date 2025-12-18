import React, { useState, useMemo } from 'react';
import LeadCard from './LeadCard';
import LeadModal from './LeadModal';
import './LeadsTab.css';

const LeadsTab = ({ leads, onRefresh }) => {
  const [selectedStage, setSelectedStage] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const pageSize = 9;

  const stages = ['All', 'New', 'Contacted', 'Nurturing', 'Qualified', 'Disqualified'];

  const filteredLeads = useMemo(() => {
    if (selectedStage === 'All') return leads;
    return leads.filter(lead => lead.stage === selectedStage);
  }, [leads, selectedStage]);

  const paginatedLeads = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredLeads.slice(startIndex, startIndex + pageSize);
  }, [filteredLeads, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredLeads.length / pageSize);

  const handleFilterChange = (stage) => {
    setSelectedStage(stage);
    setCurrentPage(1);
  };

  const handleLeadClick = (lead) => {
    setSelectedLead(lead);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedLead(null);
  };

  const handleSaveLead = async (updatedLead) => {
    try {
      // Save to ServiceNow
      await onRefresh();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving lead:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="leads-tab">
      <div className="section-header">
        <div className="title-section">
          <h2 className="section-title">All Leads</h2>
          <span className="chip chip-info">{filteredLeads.length}</span>
        </div>

        <div className="filter-section">
          <label htmlFor="stage-filter">
            <i className="fas fa-filter"></i> Filter by Stage
          </label>
          <select
            id="stage-filter"
            className="dropdown"
            value={selectedStage}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            {stages.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="leads-grid">
        {paginatedLeads.length > 0 ? (
          paginatedLeads.map((lead) => (
            <LeadCard
              key={lead.sys_id}
              lead={lead}
              onClick={() => handleLeadClick(lead)}
            />
          ))
        ) : (
          <div className="no-data">
            <i className="fas fa-inbox" style={{ fontSize: '3rem', color: '#ccc' }}></i>
            <p>No leads found</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination-wrapper">
          <div className="paginator">
            <button
              className="page-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="page-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      )}

      {showModal && selectedLead && (
        <LeadModal
          lead={selectedLead}
          onClose={handleCloseModal}
          onSave={handleSaveLead}
        />
      )}
    </div>
  );
};

export default LeadsTab;
