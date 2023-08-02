"use client"

import { adminDB } from "@/firebase/config"
import { useState } from "react"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"


const todosRef = collection(adminDB, "todos")


export const TodosHeader = () => {


  const [taskText, setTaskText] = useState("")
  const [priority, setPriority] = useState("low")


  const handleSubmit = async (e) => {
    e.preventDefault()

    // console.log("taskText:", taskText, "priority:", priority)
    
    try {
        await addDoc(todosRef, {
            text: taskText, 
            priority: priority,
            column: "tasks",
            created_at: serverTimestamp()
        })
        setTaskText("")
    } catch(err) {
        console.log(err.message)
    }
  }

  
  return (
    <form className="grid grid-cols-3" onSubmit={handleSubmit}>
        <input 
            className="ps-2 h-9 border-2 border-gray-200 rounded" 
            type="text" 
            placeholder="new todo item"
            value={taskText} 
            onChange={(e) => setTaskText(e.target.value)}
        />

        <div className="flex justify-evenly">
            <span className="flex items-center">
                <input 
                    className="me-2" 
                    type="radio"
                    name="priority" 
                    value="low"
                    checked={priority === "low"}
                    onChange={() => setPriority("low")}
                />
                Low
            </span>
            <span className="flex items-center">
                <input 
                    className="me-2" 
                    type="radio" 
                    name="priority" 
                    value="medium"
                    checked={priority === "medium"}
                    onChange={() => setPriority("medium")}
                />
                Medium
            </span>
            <span className="flex items-center">
                <input 
                    className="me-2" 
                    type="radio" 
                    name="priority" 
                    value="high"
                    checked={priority === "high"}
                    onChange={() => setPriority("high")}
                />
                High
            </span>
        </div>
        <button className="bg-green-500 rounded text-gray-50 hover:bg-green-600">Add Item</button>
    </form>
  )

}