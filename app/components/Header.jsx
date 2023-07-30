import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
  return (
    <header className="h-[50px] bg-dcam-light-red px-3 md:px-6 flex justify-between items-center text-black">
      <RxHamburgerMenu size="30px" className="text-gray-50 cursor-pointer" />
      <img
        className="w-[130px]"
        src="/images/dcam-logo-white.png"
        alt="Da Capo Academy of Music Logo"
      />
      <button className="border-2 border-gray-50 text-gray-50 py-1 px-2 rounded hover:bg-gray-50 hover:text-dcam-light-red">
        Log Out
      </button>
    </header>
  );
};

export default Header;
