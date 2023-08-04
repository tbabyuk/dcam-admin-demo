import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export const SideNav = ({setSideNavIsOpen}) => {
  return (
        <motion.div 
            className="h-[calc(100vh-50px)] w-[190px] bg-black bg-opacity-80 absolute" 
            initial={{ x: -190, opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -190, opacity: 0.5 }}
            transition={{ duration: 0.5 }}
        >
            <ul className="flex flex-col text-gray-50 w-[80%] mx-auto mt-16 gap-10">
                <Link href="/dashboard" className="hover:text-dcam-light-red"><li onClick={() => setSideNavIsOpen(false)}>DASHBOARD</li></Link>
                <Link href="/todos" className="hover:text-dcam-light-red"><li onClick={() => setSideNavIsOpen(false)}>TO DO TASKS</li></Link>
                <Link href="/calendar" className="hover:text-dcam-light-red"><li onClick={() => setSideNavIsOpen(false)}>CALENDAR</li></Link>
                <Link href="/hours" className="hover:text-dcam-light-red"><li onClick={() => setSideNavIsOpen(false)}>TEACHER HOURS</li></Link>
            </ul>
        </motion.div>
  )
}