

import {BiEdit} from "react-icons/bi"
import {RiDeleteBin6Line} from "react-icons/ri"
import {LuArrowLeftSquare, LuArrowRightSquare} from "react-icons/lu"
import { adminDB } from "@/firebase/config"
import { deleteDoc, doc, setDoc } from "firebase/firestore"

export const TaskItem = ({column, text, priority, id}) => {

  const decidePriority = (priority) => {
    switch (priority) {
        case "low":
            return "bg-gray-200"
        case "medium":
            return "bg-orange-200"
        case "high":
            return "bg-red-200"
        default:
            return "bg-gray-200"
    }
  }


  const handleEdit = (text, id) => {


    // const docRef = doc(adminDB, "todos", id)

    prompt("")
    // try{
    //   await setDoc(docRef, {

    //   })
    // } catch(err) {

    // }
    // console.log("logging id:", id)
  }

  // const handleDelete = async (id) => {
  //   const docRef = doc(adminDB, "todos", id)

  //   try {
  //     await deleteDoc(docRef)
  //     console.log("document deleted")
  //   } catch(err) {
  //     console.log("problem deleting document:", err.message)
  //   }
  // }

  const handleMoveBack = async (id, column) => {
    const docRef = doc(adminDB, "todos", id)
    const newColumn = column === "progress" ? "tasks" : "progress"
    try {
      await setDoc(docRef, {column: newColumn}, {merge: true})
    } catch(err) {
      console.log(err.message)
    }
  }

  const handleMoveForward = async (id, column) => {
    const docRef = doc(adminDB, "todos", id)
    const newColumn = column === "tasks" ? "progress" : "completed"
    try {
      await setDoc(docRef, {column: newColumn}, {merge: true})
    } catch(err) {
      console.log(err.message)
    }
  }


  return (
    <div className={`grid border-2 border-white ${decidePriority(priority)} rounded mb-2 ps-2.5 pe-2`} style={{gridTemplateColumns: "77% 23%"}}>
        <div className="break-words py-1.5 text-sm">{text && text}</div>
        <div className="flex justify-evenly items-center">
            {column === "progress" || column === "completed" ? <LuArrowLeftSquare size="1.1rem" className="cursor-pointer text-gray-500 hover:rotate-12" onClick={() => handleMoveBack(id, column)} /> : ""}
            <BiEdit size="1.1rem" className="cursor-pointer text-gray-500 hover:rotate-12" onClick={() => handleEdit(id)} />
            <RiDeleteBin6Line size="1.1rem" className="cursor-pointer text-gray-500 hover:rotate-12" onClick={() => handleDelete(text, id)} />
            {column === "tasks" || column === "progress" ? <LuArrowRightSquare size="1.1rem" className="cursor-pointer text-gray-500 hover:rotate-12" onClick={() => handleMoveForward(id, column)} /> : ""}
        </div>
    </div>
  )
}