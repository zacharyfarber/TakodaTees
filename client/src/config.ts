export const apiUrl =
  import.meta.env.MODE === 'production'
    ? 'takoda-tees-server.vercel.app'
    : 'http://localhost:5000';
