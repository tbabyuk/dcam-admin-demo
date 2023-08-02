

import {BiEdit} from "react-icons/bi"
import {RiDeleteBin6Line} from "react-icons/ri"
import {LuArrowRightSquare} from "react-icons/lu"
import { adminDB } from "@/firebase/config"
import { deleteDoc, doc } from "firebase/firestore"

export const TaskItem = ({text, priority, id}) => {

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

  const handleDelete = async (id) => {
    const docRef = doc(adminDB, "todos", id)

    try {
      await deleteDoc(docRef)
      console.log("document deleted")
    } catch(err) {
      console.log("problem deleting document:", err.message)
    }
  }


  return (
    <div className={`grid border-2 border-white ${decidePriority(priority)} rounded mb-2`} style={{gridTemplateColumns: "80% 20%"}}>
        <div className="break-words py-1.5 ps-2.5 text-sm">{text && text}</div>
        <div className="flex justify-evenly items-center">
            <BiEdit size="1.1rem" className="cursor-pointer text-gray-500" />
            <RiDeleteBin6Line size="1.1rem" className="cursor-pointer text-gray-500" onClick={() => handleDelete(id)} />
            <LuArrowRightSquare size="1.1rem" className="cursor-pointer text-gray-500" />
        </div>
        
    </div>
  )
}