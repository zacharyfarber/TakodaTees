import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className="bg-black h-[5.25rem] flex items-center border-t border-[#F0F0F0] text-[#F0F0F0] justify-between">
        <div className="flex flex-col navbar-start items-start w-[20%] border-r-2 border-white h-full justify-center">
          <div className="flex flex-col font-libre text-base text-center mx-auto gap-1">
            <Link to="/about">About</Link>

            <Link to="/policies">Policies</Link>
          </div>
        </div>

        <div className="navbar-center w-[40%] text-center font-libre text-lg">
          {/* <button
            className="h-10 w-[15rem] text-center text-black bg-[#FFF]"
            disabled
          >
            sign up for udpates
          </button> */}
          <p>© Copyright 2023 Takoda Tees</p>
        </div>

        <div className="navbar-end flex flex-col items-end w-[20%] border-l-2 border-white h-full justify-center">
          <div className="text-center font-libre text-base mx-auto">
            <p>Contact Us</p>

            <p className="italic">takodateesshop@gmail.com</p>

            <p className="text-xs">for questions / inquiries</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
