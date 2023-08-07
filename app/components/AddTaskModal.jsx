"use client"


import { useState } from "react"
import {MdOutlineClose} from "react-icons/md"
import { adminDB } from "@/firebase/config"
import {doc, updateDoc} from "firebase/firestore"


export const AddTaskModal = ({handleCloseAddTaskModal, setAddTaskModalIsOpen, numCurrentTasks, selectedDate, selectedDay, selectedMonth}) => {

    const [newText, setNewText] = useState("")


    // add calendar task item
    const handleSaveTask = async (e) => {
    e.preventDefault()

    console.log("here is the task you want to save...", newText, "for date:", selectedDate)
    const docRef = doc(adminDB, "calendar", selectedMonth)
    try {
      await updateDoc(docRef, {
        [`${selectedDay}.${numCurrentTasks + 1}`]: newText
      })
        setAddTaskModalIsOpen(false)
    } catch(err) {
      console.log(err.message)
    } 
  }


    return (
      <div className="modal-overlay h-[100vh] w-[100%] z-10 bg-black bg-opacity-70 absolute left-0 top-0 flex flex-col items-center" onClick={(e) => handleCloseAddTaskModal(e)}>
          <MdOutlineClose className="close-modal absolute top-5 right-7 cursor-pointer text-gray-50" size="4rem"  />
          <form className="flex flex-col w-[90%] md:w-[60%] lg:w-[50%] rounded bg-white text-black p-5 mt-36 md:mt-60" onSubmit={handleSaveTask}>
              <p className="mb-4 text-center">Adding task for: <span className="ms-4 font-semibold">{selectedDate}</span></p>
              <input 
                className="ps-2 h-9 border-2 border-gray-200 rounded mb-4" 
                type="text" 
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                autoFocus
              />
              <button className="h-9 bg-green-400 rounded text-gray-50 hover:bg-green-500">Add Task</button>
          </form>
      </div>
    )
  }