import React, { useState, useMemo } from 'react';
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
      case 'Approved': return 'chip-success';
      case 'Pending': return 'chip-warning';
      case 'Rejected': return 'chip-error';
      case 'Draft': return 'chip-info';
      default: return 'chip-default';
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
          <span className="chip chip-info">{quotes.length}</span>
        </div>
      </div>

      <div className="quotes-grid">
        {paginatedQuotes.length > 0 ? (
          paginatedQuotes.map((quote) => (
            <div key={quote.sys_id} className="quote-card card">
              <div className="card-header">
                <span className="badge badge-grey">{quote.number}</span>
                <span className={`chip chip-small ${getStatusColor(quote.status)}`}>
                  {quote.status}
                </span>
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
                <button className="btn btn-primary btn-small">
                  <i className="fas fa-clipboard"></i> View Details
                </button>
              </div>
            </div>
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

export default QuotesTab;
