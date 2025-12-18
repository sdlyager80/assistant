import React, { useState, useMemo } from 'react';
import {
  DxcButton,
  DxcPaginator,
  DxcChip,
  DxcCard,
  DxcBadge
} from '@dxc-technology/halstack-react';
import { format } from 'date-fns';
import './QuotesTab.css';

const QuotesTab = ({ quotes, onRefresh }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const paginatedQuotes = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return quotes.slice(startIndex, startIndex + pageSize);
  }, [quotes, currentPage]);

  const totalPages = Math.ceil(quotes.length / pageSize);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'success';
      case 'Pending': return 'warning';
      case 'Rejected': return 'error';
      case 'Draft': return 'info';
      default: return 'default';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="quotes-tab">
      <div className="section-header">
        <div className="title-section">
          <h2 className="section-title">All Quotes</h2>
          <DxcChip
            label={`${quotes.length}`}
            color="info"
          />
        </div>
      </div>

      <div className="quotes-grid">
        {paginatedQuotes.length > 0 ? (
          paginatedQuotes.map((quote) => (
            <DxcCard key={quote.sys_id} className="quote-card">
              <div className="card-header">
                <DxcBadge label={quote.number} color="grey" />
                <DxcChip
                  label={quote.status}
                  color={getStatusColor(quote.status)}
                  size="small"
                />
              </div>

              <div className="card-body">
                <h3 className="card-title">
                  <i className="fas fa-file-invoice"></i> {quote.description}
                </h3>

                <div className="card-details">
                  <div className="detail-item">
                    <span className="detail-label">Amount:</span>
                    <span className="detail-value">{quote.amount}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Valid Until:</span>
                    <span className="detail-value">{formatDate(quote.valid_until)}</span>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <DxcButton
                  label="View Details"
                  icon="clipboard"
                  size="small"
                  mode="primary"
                />
              </div>
            </DxcCard>
          ))
        ) : (
          <div className="no-data">
            <i className="fas fa-inbox" style={{ fontSize: '3rem', color: '#ccc' }}></i>
            <p>No quotes found</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination-wrapper">
          <DxcPaginator
            currentPage={currentPage}
            itemsPerPage={pageSize}
            totalItems={quotes.length}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default QuotesTab;
