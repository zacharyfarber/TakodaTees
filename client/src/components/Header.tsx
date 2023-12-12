import { Link } from 'react-router-dom';

import Cart from './Cart';

function Header() {
  return (
    <div>
      <div>
        <Link to="/">Logo</Link>
      </div>

      <div>Takoda Tees</div>

      <div>
        <div>Search</div>

        <Cart />
      </div>
    </div>
  );
}

export default Header;
