import axios from 'axios';

const API_BASE = '/api';

// ServiceNow API client configuration
const serviceNowClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

// Add request interceptor for authentication
serviceNowClient.interceptors.request.use(
  (config) => {
    // ServiceNow session authentication is handled via cookies
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
serviceNowClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('ServiceNow API Error:', error);
    return Promise.reject(error);
  }
);

export const serviceNowAPI = {
  // Leads API
  getLeads: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.stage) params.append('sysparm_query', `stage=${filters.stage}`);
    params.append('sysparm_limit', '1000');
    
    const response = await serviceNowClient.get(`/api/now/table/x_dxc_advisor_lead?${params}`);
    return response.data.result;
  },

  updateLead: async (leadId, data) => {
    const response = await serviceNowClient.patch(`/api/now/table/x_dxc_advisor_lead/${leadId}`, data);
    return response.data.result;
  },

  createLead: async (data) => {
    const response = await serviceNowClient.post('/api/now/table/x_dxc_advisor_lead', data);
    return response.data.result;
  },

  // Opportunities API
  getOpportunities: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.stage) params.append('sysparm_query', `stage=${filters.stage}`);
    params.append('sysparm_limit', '1000');
    
    const response = await serviceNowClient.get(`/api/now/table/x_dxc_advisor_opportunity?${params}`);
    return response.data.result;
  },

  updateOpportunity: async (opportunityId, data) => {
    const response = await serviceNowClient.patch(`/api/now/table/x_dxc_advisor_opportunity/${opportunityId}`, data);
    return response.data.result;
  },

  createOpportunity: async (data) => {
    const response = await serviceNowClient.post('/api/now/table/x_dxc_advisor_opportunity', data);
    return response.data.result;
  },

  // Quotes API
  getQuotes: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.status) params.append('sysparm_query', `status=${filters.status}`);
    params.append('sysparm_limit', '1000');
    
    const response = await serviceNowClient.get(`/api/now/table/x_dxc_advisor_quote?${params}`);
    return response.data.result;
  },

  updateQuote: async (quoteId, data) => {
    const response = await serviceNowClient.patch(`/api/now/table/x_dxc_advisor_quote/${quoteId}`, data);
    return response.data.result;
  },

  // Recent Items API
  getRecentItems: async () => {
    const response = await serviceNowClient.get('/api/now/table/sys_ui_list_recent?sysparm_limit=50');
    return response.data.result;
  },

  // Dashboard Stats
  getDashboardStats: async () => {
    const [leads, opportunities, quotes] = await Promise.all([
      serviceNowAPI.getLeads(),
      serviceNowAPI.getOpportunities(),
      serviceNowAPI.getQuotes()
    ]);

    return {
      leadsCount: leads.length,
      opportunitiesCount: opportunities.length,
      quotesCount: quotes.length
    };
  }
};

export default serviceNowAPI;
