const config = {
    basename: '',
    defaultPath: '/',
    defaultClientPath: '/practice',
    fontFamily: `'Inter', sans-serif`,
    borderRadius: 8,
    apiUrl: process.env.REACT_APP_BACKEND_URI || 'http://localhost:9000/v1'
};

export default config;
