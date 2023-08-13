"use client"

import { useState, useEffect } from "react"
import { TodosHeader } from "../components/TodosHeader"
import { TaskItem } from "../components/TaskItem"
import { adminDB } from "@/firebase/config"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"


const todosRef = collection(adminDB, "todos")

const Todos = () => {

  const [tasksColumnTasks, setTasksColumnTasks] = useState([])
  const [progressColumnTasks, setProgressColumnTasks] = useState([])
  const [completedColumnTasks, setCompletedColumnTasks] = useState([])



  useEffect(() => {

    const q = query(todosRef, orderBy("created_at", "desc"));

    const unsub = onSnapshot(q, snapshot => {

        const tasksColumnArray = [];
        const progressColumnArray = [];
        const completedColumnArray = [];

        snapshot.forEach((doc) => {
            if(doc.data().column === "tasks") {
                tasksColumnArray.push({id: doc.id, ...doc.data()})
            } else if (doc.data().column === "progress") {
                progressColumnArray.push({id: doc.id, ...doc.data()})
            } else if (doc.data().column === "completed") {
                completedColumnArray.push({id: doc.id, ...doc.data()})
            }
        })
            setTasksColumnTasks(tasksColumnArray)
            setProgressColumnTasks(progressColumnArray)
            setCompletedColumnTasks(completedColumnArray)
    })

    return () => {
        unsub()
      }

}, [])


  return (
    <div className="h-[calc(100vh-50px)] p-5">
        <TodosHeader />
        {/* todos table */}
        <div className="todos bg-gray-100 grid grid-rows-3 md:grid-rows-none md:grid-cols-3 gap-0.5 mt-5 rounded min-h-[calc(100vh-130px)]">
            <div className="todo-tasks-column mb-10 md:mb-0">
                <div className="col-heading grid place-items-center bg-gray-300 h-10 text-sm">To Do Tasks</div>
                <div className="to-do-tasks-content p-4">
                    {tasksColumnTasks && 
                        tasksColumnTasks.map((item) => (
                            <TaskItem key={item.id} column={item.column} priority={item.priority} text={item.text} id={item.id} />
                        ))
                    }
                </div>
            </div>
            <div className="tasks-in-progress-column mb-10 md:mb-0">
                <div className="col-heading grid place-items-center bg-gray-300 h-10 text-sm">Tasks In Progress</div>
                <div className="tasks-in-progress-content p-4">
                    {progressColumnTasks && 
                        progressColumnTasks.map((item) => (
                            <TaskItem key={item.id} column={item.column} priority={item.priority} text={item.text} id={item.id} />
                        ))
                    }                
                </div>
            </div>
            <div className="completed-tasks-column mb-10 md:mb-0">
                <div className="col-heading grid place-items-center bg-gray-300 h-10 text-sm">Completed Tasks</div>
                <div className="completed-tasks-content p-4">
                    {completedColumnTasks && 
                        completedColumnTasks.map((item) => (
                            <TaskItem key={item.id} column={item.column} priority={item.priority} text={item.text} id={item.id} />
                        ))
                    }                  
                </div>
            </div>
        </div>
    </div>
  )
}

export default Todos