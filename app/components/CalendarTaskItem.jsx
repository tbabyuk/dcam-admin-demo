"use client"

import {BiEdit} from "react-icons/bi"
import {RiDeleteBin6Line} from "react-icons/ri"
import { adminDB } from "@/firebase/config"
import { updateDoc, doc } from "firebase/firestore"
import { EditCalendarTaskModal } from "./EditCalendarTaskModal"
import { useState } from "react"



export const CalendarTaskItem = ({index, month, day, task}) => {

  const [showEditModal, setShowEditModal] = useState(false)

  const handleCloseModal = (e) => {
    console.log("logging target:", e.target.nodeName)

    if(e.target.classList.contains("modal-overlay") || e.target.nodeName === "svg" || e.target.nodeName === "path") {
      setShowEditModal(false)
    }
  }


  // edit calendar task item
  const handleSaveEdit = async (e, newText) => {
    e.preventDefault()
    console.log("new ntext is;...", newText)
    const docRef = doc(adminDB, "calendar", month)
    try {
      await updateDoc(docRef, {
        [`${day}.${index + 1}`]: newText
      })
      setShowEditModal(false)
    } catch(err) {
      console.log(err.message)
    } 
  }

  // delete calendar task item
  const handleDelete = async () => {
    const docRef = doc(adminDB, "calendar", month)
    try {
      await updateDoc(docRef, {
        [`${day}.${index + 1}`]: ""
      })
    } catch(err) {
      console.log(err.message)
    }    
  }


  return (
    <div className="max-w-[450px] mx-auto grid border-2 border-white bg-dcam-light-blue rounded mb-2 ps-2.5 pe-2" style={{gridTemplateColumns: "80% 20%"}}>
        <div className="break-words py-1.5 text-gray-50 text-sm">{task}</div>
        <div className="flex justify-evenly items-center">
            <BiEdit size="1.1rem" className="cursor-pointer text-gray-50 hover:rotate-12" onClick={() => setShowEditModal(true)} />
            <RiDeleteBin6Line size="1.1rem" className="cursor-pointer text-gray-50 hover:rotate-12" onClick={handleDelete} />
        </div>
        {showEditModal && <EditCalendarTaskModal handleCloseModal={handleCloseModal} handleSaveEdit={handleSaveEdit} task={task} />}
    </div>
  )
}