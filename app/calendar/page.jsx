"use client"

import { useState, useEffect } from "react";
import { AddTaskModal } from "../components/AddTaskModal";

// day picker imports
import { DayPicker } from "react-day-picker"
import 'react-day-picker/dist/style.css';
import format from "date-fns/format";

import { adminDB } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";

const calendarColRef = collection(adminDB, "calendar")

const Calendar = () => {

const [selectedDate, setSelectedDate] = useState();
const [selectedDateDetails, setSelectedDateDetails] = useState({})
const [bookedDays, setBookedDays] = useState([])

const [currentTasks, setCurrentTasks] = useState([])


const [januaryAllDays, setJanuaryAllDays] = useState({})
const [augustAllDays, setAugustAllDays] = useState({})


const [januaryDaysWithTasksFormatted, setJanuaryDaysWithTasksFormatted] = useState([])
const [januaryDaysWithTasks, setJanuaryDaysWithTasks] = useState([])



const [addTaskModalIsOpen, setAddTaskModalIsOpen] = useState(false)



let footer = <p>Please pick a day.</p>;
if (selectedDate) {
    footer = <p>You picked {selectedDate}.</p>;
}

const bookedStyle = {border: "2px solid orange"}
const selectedStyle = {background: "orange"}


const handleSelectedDate = (day) => {
    const monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    setSelectedDate(format(day, "PP"))
    setSelectedDateDetails({
      selectedDay: day.getDate(),
      selectedMonth: monthArray[day.getMonth()].toLowerCase(),
      selectedYear: day.getYear()
    })

    console.log(januaryDaysWithTasks, januaryDaysWithTasks.length)

    console.log("int time of selected date:", day.getTime())

    if(januaryDaysWithTasks.includes(day.getTime())) {
        setCurrentTasks(januaryAllDays[day.getDate()])
    } else {
        console.log("no")
    }
}

const handleAdd = () => {
    setAddTaskModalIsOpen(true)
  }

  const handleCloseAddTaskModal = (e) => {
    console.log("logging target:", e.target.nodeName)

    if(e.target.classList.contains("modal-overlay") || e.target.nodeName === "svg" || e.target.nodeName === "path") {
      setAddTaskModalIsOpen(false)
    }
  }


  useEffect(() => {
    const fetchTasks = async () => {
        try {
            const snapshot = await getDocs(calendarColRef)
            snapshot.docs.forEach((doc) => {
            
                switch(doc.id) {
                    case "january":
                      console.log("january tasks detected:", doc.data())
                    setJanuaryAllDays(doc.data())
                    break;
                    case "august":
                        console.log("august tasks detected:", doc.data())
                    break;
                }
            })


        } catch(err) {
            console.log(err.message)
        }
    }

    fetchTasks()
  }, [])


  useEffect(() => {
    console.log("logging january data:", januaryAllDays)

    // choose only days with tasks
    const januaryKeys = Object.keys(januaryAllDays)

    console.log("jan keys:", januaryKeys)

    januaryKeys.forEach((key) => {
        if(januaryAllDays[key][0].length !== 0) {
            // console.log("frog:", key)
            setJanuaryDaysWithTasksFormatted((prev) => [...prev, new Date(`2023, 1, ${key}`)])
            setJanuaryDaysWithTasks((prev) => [...prev, new Date(`2023, 1, ${key}`).getTime()])
        }
    })
    
  }, [januaryAllDays])


  useEffect(() => {
    console.log("jan days with tasks", januaryDaysWithTasks)
  }, [januaryDaysWithTasks])

  return (
        <div className="bg-yellow-200 h-[calc(100vh-50px)] p-24">

            <div className="bg-white grid grid-cols-2 mx-auto p-10">
                {/* calendar container */}
                <div className="grid place-items-center">
                    <DayPicker
                        mode="single"
                        selected={selectedDate}
                        modifiers={{booked: januaryDaysWithTasks}}
                        modifiersStyles={{booked: bookedStyle, selected: selectedStyle}}
                        onDayClick={handleSelectedDate}
                        fromYear={2023}
                        toYear={2023}
                    />
                </div>

                {/* tasks container */}
                <div className="flex flex-col">
                    <div className="grid grid-cols-2 border-b-2 pb-6 border-gray-300">
                        <div className="grid place-items-center">{footer}</div>
                        <button className={`rounded h-9 w-fit mx-auto text-sm px-3 ${selectedDate ? "bg-green-400 text-gray-50 hover:bg-green-500 cursor-pointer" : "bg-gray-300 text-gray-100" }`} disabled={!selectedDate} onClick={handleAdd}>Add new task for this day</button>
                    </div>
                    <div className="tasks-list">
                        {currentTasks[0]?.length ? (
                
                        currentTasks.map((task, index) => (
                        <li key={index}>
                            <span>{task}</span>
                            <span>something</span>
                        </li>
                        ))
                        ) : ("no tasks to show for this day")}
                    </div>

                </div>



            {/* {editTaskModalIsOpen &&
            <EditTaskModal currentDate={selectedDate} currentTask={currentTasks[targetId]} taskKey={targetId + 1} month={selectedDateDetails.selectedMonth} day={selectedDateDetails.selectedDay} closeEditTaskModal={closeEditTaskModal}/>
            } */}

            {addTaskModalIsOpen && 
            <AddTaskModal handleCloseAddTaskModal={handleCloseAddTaskModal} selectedDate={selectedDate} />
            }
        </div>
    </div>
  )
}

export default Calendar