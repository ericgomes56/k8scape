import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '',
});

export const getNodes = () => api.get('/api/nodes');
export const getPods = (namespace: string) => api.get(namespace ? `/api/pods?namespace=${namespace}` : '/api/pods');
export const getDeployments = () => api.get('/api/deployments');
export const getNamespaces = () => api.get('/api/namespaces');
export const getPodMetrics = () => api.get('/api/pod-metrics');

export default api;
