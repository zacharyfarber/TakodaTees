export const apiUrl =
  import.meta.env.MODE === 'production'
    ? 'https://takoda-tees-server-zacharyfarber.vercel.app/'
    : 'http://localhost:5000';
