import React from 'react';
import {
  DxcCard,
  DxcChip,
  DxcBadge,
  DxcButton
} from '@dxc-technology/halstack-react';
import { format } from 'date-fns';
import './RecentTab.css';

const RecentTab = ({ recentItems }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
    } catch {
      return dateString;
    }
  };

  const getItemIcon = (type) => {
    switch (type) {
      case 'lead': return 'user-plus';
      case 'opportunity': return 'briefcase';
      case 'quote': return 'file-invoice';
      case 'task': return 'tasks';
      default: return 'circle';
    }
  };

  return (
    <div className="recent-tab">
      <div className="section-header">
        <div className="title-section">
          <h2 className="section-title">Recent Activity</h2>
          <DxcChip
            label={`${recentItems.length}`}
            color="info"
          />
        </div>
      </div>

      <div className="recent-list">
        {recentItems.length > 0 ? (
          recentItems.map((item, index) => (
            <DxcCard key={index} className="recent-item-card">
              <div className="recent-item-content">
                <div className="item-icon">
                  <i className={`fas fa-${getItemIcon(item.type)}`}></i>
                </div>
                
                <div className="item-details">
                  <h4 className="item-title">{item.title || item.name}</h4>
                  <div className="item-meta">
                    <span className="item-type">
                      <DxcBadge label={item.type} size="small" />
                    </span>
                    <span className="item-date">
                      <i className="fas fa-clock"></i> {formatDate(item.sys_updated_on)}
                    </span>
                  </div>
                </div>

                <div className="item-actions">
                  <DxcButton
                    label="Open"
                    size="small"
                    mode="text"
                    icon="external-link-alt"
                  />
                </div>
              </div>
            </DxcCard>
          ))
        ) : (
          <div className="no-data">
            <i className="fas fa-history" style={{ fontSize: '3rem', color: '#ccc' }}></i>
            <p>No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTab;
