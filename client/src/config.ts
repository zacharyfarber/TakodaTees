export const apiUrl =
  import.meta.env.MODE === 'production'
    ? 'http://localhost:5000'
    : 'http://localhost:5000';
