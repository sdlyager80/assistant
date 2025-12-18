import React, { useState, useMemo } from 'react';
import {
  DxcButton,
  DxcDropdown,
  DxcPaginator,
  DxcChip
} from '@dxc-technology/halstack-react';
import LeadCard from './LeadCard';
import LeadModal from './LeadModal';
import './LeadsTab.css';

const LeadsTab = ({ leads, onRefresh }) => {
  const [selectedStage, setSelectedStage] = useState('All');
  const [showStageDropdown, setShowStageDropdown] = useState(false);
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
    setShowStageDropdown(false);
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

  const stageOptions = stages.map(stage => ({
    label: stage,
    value: stage
  }));

  return (
    <div className="leads-tab">
      <div className="section-header">
        <div className="title-section">
          <h2 className="section-title">All Leads</h2>
          <DxcChip
            label={`${filteredLeads.length}`}
            color="info"
          />
        </div>
        
        <div className="filter-section">
          <DxcDropdown
            label="Filter by Stage"
            options={stageOptions}
            onSelectOption={(value) => handleFilterChange(value)}
            icon="filter"
          />
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
          <DxcPaginator
            currentPage={currentPage}
            itemsPerPage={pageSize}
            totalItems={filteredLeads.length}
            onPageChange={setCurrentPage}
          />
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
