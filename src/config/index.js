const config = {
    basename: '',
    defaultPath: '/',
    defaultClientPath: '/practice',
    fontFamily: `'Inter', sans-serif`,
    borderRadius: 8,
    apiUrl: process.env.REACT_APP_BACKEND_URI || 'http://localhost:5000/api/v1'
};

export default config;
