"use client"

import { useFirebaseContext } from "../hooks/useFirebaseContext";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";

const Header = () => {

  const {currentUser, logOut} = useFirebaseContext()

  const handleLogout = () => {
    logOut()
  }


  return (
    <header className="h-[50px] bg-dcam-light-red px-3 md:px-6 flex justify-between items-center text-black">
      <RxHamburgerMenu size="30px" className="text-gray-50 cursor-pointer" />
      <Link href="/">
          <img
          className="w-[130px]"
          src="/images/dcam-logo-white.png"
          alt="Da Capo Academy of Music Logo"
          />
      </Link>
      {currentUser && <button className="border-2 border-gray-50 text-gray-50 py-1 px-2 rounded hover:bg-gray-50 hover:text-dcam-light-red" onClick={handleLogout}>Log Out</button>}

      {!currentUser && 
        <button className="invisible border-2 border-gray-50 text-gray-50 py-1 px-2 rounded hover:bg-gray-50 hover:text-dcam-light-red">Log Out</button>
      }

    </header>
  );
};

export default Header;
