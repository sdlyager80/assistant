import React, { useState, useEffect } from 'react';
import LeadsTab from './components/LeadsTab';
import OpportunitiesTab from './components/OpportunitiesTab';
import QuotesTab from './components/QuotesTab';
import RecentTab from './components/RecentTab';
import DashboardCards from './components/DashboardCards';
import serviceNowAPI from './services/serviceNowAPI';
import './App.css';
import dxcLogo from './assets/DXCHorizontalTaglineFullColorDark.png';

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    leads: [],
    opportunities: [],
    quotes: [],
    recentItems: []
  });

  const [stats, setStats] = useState({
    leadsCount: 0,
    opportunitiesCount: 0,
    quotesCount: 0,
    recentCount: 0
  });

  // Load data on mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [leads, opportunities, quotes, recentItems] = await Promise.all([
        serviceNowAPI.getLeads(),
        serviceNowAPI.getOpportunities(),
        serviceNowAPI.getQuotes(),
        serviceNowAPI.getRecentItems()
      ]);

      setDashboardData({
        leads,
        opportunities,
        quotes,
        recentItems
      });

      setStats({
        leadsCount: leads.length,
        opportunitiesCount: opportunities.length,
        quotesCount: quotes.length,
        recentCount: recentItems.length
      });
    } catch (error) {
      console.error('Error loading data:', error);
      // Load mock data for development/demo
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  const loadMockData = () => {
    // Mock data for demonstration
    const mockLeads = [
      {
        sys_id: '1',
        number: 'LEAD0001',
        first_name: 'John',
        last_name: 'Smith',
        company: 'ABC Insurance',
        email: 'john.smith@example.com',
        business_phone: '555-0101',
        lead_type: 'New Business',
        lead_rating: 'Hot',
        stage: 'Qualified'
      },
      {
        sys_id: '2',
        number: 'LEAD0002',
        first_name: 'Sarah',
        last_name: 'Johnson',
        company: 'XYZ Corp',
        email: 'sarah.j@example.com',
        business_phone: '555-0102',
        lead_type: 'Existing Business',
        lead_rating: 'Warm',
        stage: 'Contacted'
      }
    ];

    const mockOpportunities = [
      {
        sys_id: '1',
        number: 'OPP0001',
        consumer: 'Johnson Family',
        short_description: 'Life Insurance Policy',
        amount: '$50,000',
        industry: 'Insurance',
        rating: 'High',
        stage: 'Propose',
        sales_cycle_type: 'Standard'
      }
    ];

    const mockQuotes = [
      {
        sys_id: '1',
        number: 'QTE0001',
        description: 'Auto Insurance Quote',
        amount: '$1,200',
        status: 'Pending',
        valid_until: '2025-01-31'
      }
    ];

    setDashboardData({
      leads: mockLeads,
      opportunities: mockOpportunities,
      quotes: mockQuotes,
      recentItems: []
    });

    setStats({
      leadsCount: mockLeads.length,
      opportunitiesCount: mockOpportunities.length,
      quotesCount: mockQuotes.length,
      recentCount: 0
    });
  };

  const tabs = [
    {
      label: `Leads (${stats.leadsCount})`,
      icon: 'user-plus'
    },
    {
      label: `Opportunities (${stats.opportunitiesCount})`,
      icon: 'briefcase'
    },
    {
      label: `Quotes (${stats.quotesCount})`,
      icon: 'file-invoice'
    },
    {
      label: `Recent (${stats.recentCount})`,
      icon: 'history'
    }
  ];

  const renderTabContent = () => {
    if (loading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          <div className="spinner">
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '3rem', color: '#1B75BB' }}></i>
            <p style={{ marginTop: '1rem' }}>Loading...</p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 0:
        return <LeadsTab leads={dashboardData.leads} onRefresh={loadAllData} />;
      case 1:
        return <OpportunitiesTab opportunities={dashboardData.opportunities} onRefresh={loadAllData} />;
      case 2:
        return <QuotesTab quotes={dashboardData.quotes} onRefresh={loadAllData} />;
      case 3:
        return <RecentTab recentItems={dashboardData.recentItems} />;
      default:
        return null;
    }
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Advisor Assistant</h1>
        </div>
      </header>

      <main className="app-main">
        <div className="app-inset">
          {/* Dashboard Cards */}
          <DashboardCards
            stats={stats}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            darkMode={darkMode}
          />

          {/* Tabs */}
          <div className="tabs-container">
            <div className="tabs">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`tab ${activeTab === index ? 'active' : ''}`}
                  onClick={() => setActiveTab(index)}
                >
                  <i className={`fas fa-${tab.icon}`}></i>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {renderTabContent()}
          </div>

          {/* Powered By Footer */}
          <div className="app-footer">
            <div className="footer-text">Powered by</div>
            <img
              src={dxcLogo}
              alt="DXC Technology"
              className="footer-logo"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
