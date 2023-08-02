

import {BiEdit} from "react-icons/bi"
import {RiDeleteBin6Line} from "react-icons/ri"
import {LuArrowRightSquare} from "react-icons/lu"

export const TaskItem = ({text, priority}) => {

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


  return (
    <div className={`grid border-2 border-white ${decidePriority(priority)} rounded mb-2`} style={{gridTemplateColumns: "80% 20%"}}>
        <div className="break-words py-1.5 ps-2.5 text-sm">{text && text}</div>
        <div className="flex justify-evenly items-center">
            <BiEdit size="1.1rem" className="cursor-pointer text-gray-500" />
            <RiDeleteBin6Line size="1.1rem" className="cursor-pointer text-gray-500" />
            <LuArrowRightSquare size="1.1rem" className="cursor-pointer text-gray-500" />
        </div>
        
    </div>
  )
}