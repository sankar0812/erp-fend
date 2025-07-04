import axios from 'axios';

const baseURLs = {

  // development: 'http://192.168.29.106:8060/', // API server url (Development)
  development: 'http://168.231.102.58:8070/', // API server url (Development)
 production: 'https://erp-bend.onrender.com/', // API server url (Production)
  staging: 'https://erp.dev.ideauxbill.in/',  // API server url (Staging)

};
const environment = process.env.NODE_ENV || 'development';
// const environment = 'production';

const request = axios.create({
  baseURL: baseURLs[environment],     // Sanjay

  headers: {
    'X-Requested-With': 'XMLHttpRequest',   
  },
});

export default request;

export const base = baseURLs[environment];     // Sanjay
