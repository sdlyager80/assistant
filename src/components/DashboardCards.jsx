import React from 'react';
import { DxcCard } from '@dxc-technology/halstack-react';
import './DashboardCards.css';

const DashboardCards = ({ stats, activeTab, onTabChange, darkMode }) => {
  const cards = [
    {
      label: 'Leads',
      value: stats.leadsCount,
      tab: 0,
      icon: 'fa-user-plus',
      activeIcon: 'fa-solid fa-user-plus fa-beat-fade',
      color: 'card-leads'
    },
    {
      label: 'Opportunities',
      value: stats.opportunitiesCount,
      tab: 1,
      icon: 'fa-briefcase',
      activeIcon: 'fa-solid fa-briefcase fa-beat-fade',
      color: 'card-opportunities'
    },
    {
      label: 'Quotes',
      value: stats.quotesCount,
      tab: 2,
      icon: 'fa-file-invoice',
      activeIcon: 'fa-solid fa-file-invoice fa-beat-fade',
      color: 'card-quotes'
    },
    {
      label: 'Recent',
      value: stats.recentCount,
      tab: 3,
      icon: 'fa-history',
      activeIcon: 'fa-solid fa-history fa-beat-fade',
      color: 'card-recent'
    }
  ];

  return (
    <div className={`dashboard-cards-wrapper ${darkMode ? 'dark-mode' : ''}`}>
      {cards.map((card, index) => (
        <div
          key={index}
          className={`dashboard-card ${card.color} ${activeTab === card.tab ? 'active' : ''}`}
          onClick={() => onTabChange(card.tab)}
        >
          <div className="card-badge">{card.value}</div>
          <i className={`fas ${activeTab === card.tab ? card.activeIcon : card.icon}`}></i>
          <div className="card-label">{card.label}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
