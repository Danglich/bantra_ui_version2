export const apiUrl =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:8000/api'
        : 'https://web-tra-server.onrender.com/api';
