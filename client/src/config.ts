export const apiUrl =
  import.meta.env.MODE === 'production'
    ? 'https://takoda-tees-server-git-main-zacharyfarber.vercel.app'
    : 'http://localhost:5000';
