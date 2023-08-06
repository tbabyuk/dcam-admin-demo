"use client"

import {BiEdit} from "react-icons/bi"
import {RiDeleteBin6Line} from "react-icons/ri"
import { adminDB } from "@/firebase/config"
import { updateDoc, deleteField, doc, setDoc } from "firebase/firestore"
import { EditTaskModal } from "./EditTaskModal"
import { useState } from "react"



export const CalendarTaskItem = ({index, month, day, task}) => {

  console.log("logging task from CalendarTaskItem:", month, day, task)
  const [showEditTaskModal, setShowEditTaskModal] = useState(false)


  const handleCloseEditModal = (e) => {
    console.log("logging target:", e.target.nodeName)

    if(e.target.classList.contains("modal-overlay") || e.target.nodeName === "svg" || e.target.nodeName === "path") {
      setShowEditTaskModal(false)
    }
  }


  // edit todo item
  const handleSaveEdit = async (e, newText) => {
    e.preventDefault()
    const docRef = doc(adminDB, "todos", id)
    try {
      await setDoc(docRef, {text: newText}, {merge: true})
      setShowEditTaskModal(false)
    } catch(err) {
      console.log(err.message)
    }
  }

  // delete task item
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
    <div className="grid border-2 border-white bg-dcam-light-blue rounded mb-2 ps-2.5 pe-2" style={{gridTemplateColumns: "85% 15%"}}>
        <div className="break-words py-1.5 text-gray-50 text-sm">{task}</div>
        <div className="flex justify-evenly items-center">
            <BiEdit size="1.1rem" className="cursor-pointer text-gray-50 hover:rotate-12" onClick={() => setShowEditTaskModal(true)} />
            <RiDeleteBin6Line size="1.1rem" className="cursor-pointer text-gray-50 hover:rotate-12" onClick={handleDelete} />
        </div>
        {showEditTaskModal && <EditTaskModal handleCloseEditModal={handleCloseEditModal} handleSaveEdit={handleSaveEdit} />}
    </div>
  )
}