const configs = {
    production: { apiUrl: 'http://localhost:3010' },
    staging: { apiUrl: 'http://localhost:3010' },
    development: { apiUrl: 'http://localhost:3010' },
};

const environment = process.env.NODE_ENV === 'development' ? 'development' : process.env.NODE_ENV === 'production' ? 'production' : 'staging';

export const config = configs[environment];