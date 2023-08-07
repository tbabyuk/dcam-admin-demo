"use client"

import { useState, useEffect } from "react";
import { AddTaskModal } from "../components/AddTaskModal";
import { CalendarTaskItem } from "../components/CalendarTaskItem";

// day picker imports
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css";
import format from "date-fns/format";

import { adminDB } from "@/firebase/config";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";


const calendarColRef = collection(adminDB, "calendar")



const Calendar = () => {

const [selectedDate, setSelectedDate] = useState("");
const [selectedDay, setSelectedDay] = useState("")
const [selectedMonth, setSelectedMonth] = useState("")
const [currentTasks, setCurrentTasks] = useState({})
const [monthsData, setMonthsData] = useState({})
const [daysWithTasks, setDaysWithTasks] = useState([])
const [addTaskModalIsOpen, setAddTaskModalIsOpen] = useState(false)


let footer = <p>Please pick a day.</p>;
if (selectedDate) {
    footer = <p>You picked {selectedDate}.</p>;
}

const bookedStyle = {border: "2px solid orange"}
const selectedStyle = {background: "orange"}


const handleSelectedDateAndTask = (day) => {
    // display tasks based on the day selected
    const targetDay = day.getDate()
    const targetMonth = day.toLocaleString("default", {month: "long"}).toLowerCase()

    // display selected date to user
    setSelectedDate(format(day, "PP"))
    setSelectedDay(targetDay)
    setSelectedMonth(targetMonth)
}

const handleAdd = () => {
    setAddTaskModalIsOpen(true)
  }

  const handleCloseAddTaskModal = (e) => {
    if(e.target.classList.contains("modal-overlay") || e.target.nodeName === "svg" || e.target.nodeName === "path") {
      setAddTaskModalIsOpen(false)
    }
  }


    // GET DATA FROM DB FOR EACH MONTH AND UPDATE STATE ACCORINGLY
    useEffect(() => {
        const unsub = onSnapshot(calendarColRef, snapshot => {
            console.log("onSnapshot fired")
            snapshot.docs.forEach((doc) => {
                switch(doc.id) { 
                    case "august": 
                        setMonthsData({"august": doc.data()})
                    break;
                    case "september":
                        setMonthsData((prev) => ({...prev, "september": doc.data()}))
                    break;
                    case "october":
                        setMonthsData((prev) => ({...prev, "october": doc.data()}))
                    break;
                    case "november":
                        setMonthsData((prev) => ({...prev, "november": doc.data()}))
                    break;
                    case "december":
                        setMonthsData((prev) => ({...prev, "december": doc.data()}))
                    break;
                }
            })
        })
        return () => {
            unsub()
        }
    }, [])


    // CIRCLE ALL DAYS THAT CONTAIN TASKS ON THE CALENDAR
    useEffect(() => {
        const today = new Date()
        const monthsArray = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
        const tasksArray = []

        monthsArray.forEach((month, index) => {
            const keys = Object.keys(monthsData[month] || {})
            keys.forEach((key) => {
                if(monthsData[month][key][1].length !== 0) {
                    tasksArray.push(new Date(today.getFullYear(), index, key))
                }
            })
        })
    setDaysWithTasks(tasksArray)
  }, [monthsData])


  useEffect(() => {
    const currentTasksObject = {
        month: selectedMonth,
        day: selectedDay,
        tasks: selectedMonth !== "" && selectedDay !== "" ? Object.values(monthsData[selectedMonth][selectedDay]) : []
    };
    setCurrentTasks(currentTasksObject)

  }, [selectedDate, selectedMonth, selectedDay, monthsData])

  return (
        <div className="h-[calc(100vh-50px)] px-5 pt-14 md:pt-24">

            <div className="bg-white grid grid-rows-2 md:grid-rows-none md:grid-cols-2 md:px-8 lg:px-28 xl:px-48 mx-auto">
                {/* calendar container */}
                <div className="flex justify-center mb-8 md:mb-0">
                    <DayPicker
                        mode="single"
                        selected={selectedDate}
                        modifiers={{booked: daysWithTasks}}
                        modifiersStyles={{booked: bookedStyle, selected: selectedStyle}}
                        onDayClick={handleSelectedDateAndTask}
                        fromMonth={new Date()}
                        toYear={new Date().getFullYear()}
                    />
                </div>

                {/* tasks container */}
                <div className="flex flex-col pt-5 lg:pe-10">
                    <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 border-b-2 pb-6 mb-6 border-gray-300">
                        <div className="grid place-items-center mb-5 md:mb-0">{footer}</div>
                        <button className={`rounded h-10 min-w-[150px] mx-auto text-sm px-3 ${selectedDate ? "bg-green-400 text-gray-50 hover:bg-green-500 cursor-pointer" : "bg-gray-300 text-gray-100" }`} disabled={!selectedDate} onClick={handleAdd}>Add new task</button>
                    </div>
                    <div className="tasks-list">
                        {currentTasks?.tasks ? (
                            currentTasks.tasks.map((task, index) => {
                                if(task) {
                                    return <CalendarTaskItem key={uuidv4()} index={index} month={currentTasks.month} day={currentTasks.day} task={task}  />
                                }
                            })
                            ) : ("no tasks to show for this day")
                        }
                    </div>

                </div>

            {addTaskModalIsOpen && 
                <AddTaskModal handleCloseAddTaskModal={handleCloseAddTaskModal} setAddTaskModalIsOpen={setAddTaskModalIsOpen} numCurrentTasks={currentTasks.tasks[0]?.length ? currentTasks.tasks.length : 0} selectedDate={selectedDate} selectedDay={selectedDay} selectedMonth={selectedMonth} />
            }
        </div>
    </div>
  )
}

export default Calendar