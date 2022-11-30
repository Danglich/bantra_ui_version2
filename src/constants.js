export const apiUrl =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:8000/api'
        : 'https://tiktok-lichdt.herokuapp.com/api';
