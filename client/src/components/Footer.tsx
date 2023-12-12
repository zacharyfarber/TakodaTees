import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div>
        <Link to="/about">About</Link>

        <Link to="/policies">Policies</Link>

        <p>© 2023</p>
      </div>

      <div>Sign Up for Our Newsletter</div>

      <div>
        <p>Contact Us</p>

        <p>takodateesshop@gmail.com</p>

        <p>for questions / inquiries</p>
      </div>
    </footer>
  );
}

export default Footer;
