import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Logo from '../assets/images/logo.png';
import CartContext from '../contexts/CartContext';
import Cart from './Cart';
import LazyImage from './LazyImage';

function Header() {
  const searchRef = useRef<HTMLInputElement>(null);

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const { setCartOpen } = useContext(CartContext)!;

  const [, checkoutPage] = useState<'shipping' | 'payment' | 'confirmation'>(
    'shipping'
  );

  useEffect(() => {
    setCartOpen(false);
  }, [pathname]);

  return (
    <header>
      {!pathname.includes('checkout') ? (
        <div className="bg-black h-14 flex items-center border-b border-[#F0F0F0]">
          <div className="navbar-start ml-2">
            <Link to="/">
              <LazyImage src={Logo} alt="Logo" className="h-12 w-12" />
            </Link>
          </div>

          <div className="text-[#F0F0F0] font-libre font-bold text-5xl navbar-center">
            Takoda Tees
          </div>

          <div className="navbar-end mr-2 flex items-center">
            <div className="flex h-6 items-center bg-[#F0F0F0] border-[#F0F0F0] rounded-lg">
              <button className="m-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  onClick={() => searchRef.current?.focus()}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.32401 14.8953L4.67934 11.5399C5.0222 11.1974 5.55184 11.1274 5.97148 11.3689C6.84469 11.8631 7.85433 12.1428 8.92861 12.1428C12.2797 12.1428 15 9.42244 15 6.07139C15 2.72034 12.2797 0 8.92861 0C5.57756 0 2.85722 2.72034 2.85722 6.07139C2.85722 7.14567 3.13686 8.15566 3.62757 9.03137C3.86757 9.44923 3.79792 9.97637 3.45685 10.3174C2.4965 11.2842 0.104732 13.676 0.104732 13.676C-0.0349102 13.8153 -0.0349102 14.0417 0.104732 14.181L0.819014 14.8953C0.958298 15.0349 1.18473 15.0349 1.32401 14.8953ZM8.92861 0.714281C11.8854 0.714281 14.2857 3.11462 14.2857 6.07139C14.2857 9.02816 11.8854 11.4285 8.92861 11.4285C5.97184 11.4285 3.5715 9.02816 3.5715 6.07139C3.5715 3.11462 5.97184 0.714281 8.92861 0.714281Z"
                    fill="#1E1E1E"
                  />
                </svg>
              </button>

              <input
                ref={searchRef}
                className="border-[#F0F0F0] rounded-r-lg focus:outline-none bg-[#F0F0F0]"
              />
            </div>

            <Cart />
          </div>
        </div>
      ) : (
        <div className="bg-black h-14 flex items-center border-b border-[#F0F0F0]">
          <div className="navbar-start ml-2">
            <button
              onClick={() => {
                if (pathname.includes('shipping')) navigate(-1);

                if (pathname.includes('payment')) checkoutPage('shipping');

                if (pathname.includes('confirmation')) checkoutPage('payment');
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M25 10C23.8278 4.29768 18.7303 -8.18729e-07 12.6263 -5.51912e-07C5.65774 -2.47308e-07 -8.4795e-07 5.60116 -5.46392e-07 12.5C-2.44835e-07 19.3988 5.65774 25 12.6263 25C18.7303 25 23.8278 20.7023 25 15L13.8889 15L13.8889 18.1256L5.05051 12.5L13.8889 6.87558L13.8889 10L25 10Z"
                  fill="#F0F0F0"
                />
              </svg>
            </button>
          </div>

          <div className="text-[#F0F0F0] font-libre font-bold text-5xl navbar-center">
            Checkout
          </div>

          <div className="navbar-end mr-2 flex items-center"></div>
        </div>
      )}
    </header>
  );
}

export default Header;
