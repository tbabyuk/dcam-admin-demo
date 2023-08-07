"use client"

import { RxHamburgerMenu } from "react-icons/rx";
import {CgClose} from "react-icons/cg"
import Link from "next/link";
import { useState } from "react";
import { SideNav } from "./SideNav";
import { AnimatePresence } from "framer-motion";



const Header = () => {

  // const {currentUser, logOut} = useFirebaseContext()
  const [sideNavIsOpen, setSideNavIsOpen] = useState(false)

  const handleLogout = () => {
    logOut()
  }



  return (
    <>
      <header className="h-[50px] bg-dcam-regular-blue px-3 md:px-6 flex justify-between items-center text-black">
        <div className="w-[80px]">{!sideNavIsOpen ?<RxHamburgerMenu size="30px" className="text-gray-50 cursor-pointer" onClick={() => setSideNavIsOpen(true)} /> : <CgClose className="text-gray-50 cursor-pointer" size="2rem" onClick={() => setSideNavIsOpen(false)} />}</div>
        <Link href="/">
            <img
            className="w-[130px]"
            src="/images/dcam-logo-white.png"
            alt="Da Capo Academy of Music Logo"
            />
        </Link>
        <button className="w-[80px] border-2 border-gray-50 text-gray-50 py-1 px-2 rounded" onClick={handleLogout} disabled>Demo</button>
      </header>
      <AnimatePresence>
        {sideNavIsOpen && <SideNav setSideNavIsOpen={setSideNavIsOpen} />}
      </AnimatePresence>
    </>
  );
};

export default Header;
