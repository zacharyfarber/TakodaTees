export const apiUrl =
  import.meta.env.MODE === 'production'
    ? 'https://takoda-tees-server-onb424jyf-zacharyfarber.vercel.app'
    : 'http://localhost:5000';
