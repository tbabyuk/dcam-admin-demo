"use client"

import { useState, useEffect } from "react"
import { TodosHeader } from "../components/TodosHeader"
import { TaskItem } from "../components/TaskItem"
import { adminDB } from "@/firebase/config"
import { collection, getDocs, onSnapshot, query, orderBy } from "firebase/firestore"


const todosRef = collection(adminDB, "todos")

const Todos = () => {

//   const [todos, setTodos] = useState([
//     {priority: "high", text: "i am high priority"},
//     {priority: "medium", text: "i am medium priority"},
//     {priority: "low", text: "i am low priority"},
//     {priority: "medium", text: "i am medium priority"},
//     {priority: "high", text: "i am high priority"}
//   ])

  const [tasksColumnTasks, setTasksColumnTasks] = useState([])
  const [progressColumnTasks, setProgressColumnTasks] = useState([])
  const [completedColumnTasks, setCompletedColumnTasks] = useState([])


//   useEffect(() => {

//   const fetchTodos = async () => {

//     const tasksColumnArray = [];
//     const progressColumnArray = [];
//     const completedColumnArray = [];

//     try {
//         const docSnapshot = await getDocs(todosRef)
//         docSnapshot.forEach((doc) => {
//             console.log(doc.data().column)
//             if(doc.data().column === "tasks") {
//                 tasksColumnArray.push({id: doc.id, ...doc.data()})
//             } else if (doc.data().column === "progress") {
//                 progressColumnArray.push({id: doc.id, ...doc.data()})
//             } else if (doc.data().column === "completed") {
//                 completedColumnArray.push({id: doc.id, ...doc.data()})
//             }
//         })
//         console.log("logging cols:", tasksColumnArray, progressColumnArray, completedColumnArray)
//         setTasksColumnTasks(tasksColumnArray)
//         setProgressColumnTasks(progressColumnArray)
//         setCompletedColumnTasks(completedColumnArray)
//     } catch(err) {
//         console.log(err.message)
//     }
//   }

//     fetchTodos()

//   }, [])



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
        <div className="todos grid grid-cols-3 gap-0.5 mt-5 rounded min-h-[calc(100vh-130px)]">
            <div className="to-do-tasks-column">
                <div className="col-heading grid place-items-center bg-gray-300 h-10">To Do Tasks</div>
                <div className="to-do-tasks-content p-4 bg-gray-100 h-[500px]">
                    {tasksColumnTasks && 
                        tasksColumnTasks.map((item) => (
                            <TaskItem key={item.id} priority={item.priority} text={item.text} id={item.id} />
                        ))
                    }
                </div>
            </div>
            <div className="tasks-in-progress-column">
                <div className="col-heading grid place-items-center bg-gray-300 h-10">Tasks In Progress</div>
                <div className="tasks-in-progress-content p-4 bg-gray-100 h-[500px]">
                    {progressColumnTasks && 
                        progressColumnTasks.map((item) => (
                            <TaskItem key={item.id} priority={item.priority} text={item.text} id={item.id} />
                        ))
                    }                
                </div>
            </div>
            <div className="completed-tasks-column">
                <div className="col-heading grid place-items-center bg-gray-300 h-10">Completed Tasks</div>
                <div className="completed-tasks-content p-4 bg-gray-100 h-[500px]">
                    {completedColumnTasks && 
                        completedColumnTasks.map((item) => (
                            <TaskItem key={item.id} priority={item.priority} text={item.text} id={item.id} />
                        ))
                    }                  
                </div>
            </div>
        </div>
    </div>
  )
}

export default Todos