"use client"

import { useState, useEffect } from "react";
import { AddTaskModal } from "../components/AddTaskModal";
import { CalendarTaskItem } from "../components/CalendarTaskItem";

// day picker imports
import { DayPicker } from "react-day-picker"
import 'react-day-picker/dist/style.css';
import format from "date-fns/format";

import { adminDB } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";

import { v4 as uuidv4 } from "uuid";

const calendarColRef = collection(adminDB, "calendar")

// const newUUID = uuidv4();


const Calendar = () => {

const [selectedDate, setSelectedDate] = useState();

const [currentTasks, setCurrentTasks] = useState({})

const [monthsData, setMonthsData] = useState({})


const [januaryDays, setJanuaryDays] = useState({})
const [februaryDays, setFebruaryDays] = useState({})
const [marchDays, setMarchDays] = useState({})
const [aprilDays, setAprilDays] = useState({})
const [mayDays, setMayDays] = useState({})
const [juneDays, setJuneDays] = useState({})
const [julyDays, setJulyDays] = useState({})
const [augustDays, setAugustDays] = useState({})
const [septemberDays, setSeptemberDays] = useState({})
const [octoberDays, setOctoberDays] = useState({})
const [novemberDays, setNovemberDays] = useState({})
const [decemberDays, setDecemberDays] = useState({})

const [daysWithTasks, setDaysWithTasks] = useState([])

const [addTaskModalIsOpen, setAddTaskModalIsOpen] = useState(false)


let footer = <p>Please pick a day.</p>;
if (selectedDate) {
    footer = <p>You picked {selectedDate}.</p>;
}

const bookedStyle = {border: "2px solid orange"}
const selectedStyle = {background: "orange"}


const handleSelectedDateAndTask = (day) => {
    
    // display selected date to user
    setSelectedDate(format(day, "PP"))

    // display tasks based on the day selected
    const targetDay = day.getDate()
    const targetMonth = day.toLocaleString("default", {month: "long"}).toLowerCase()

    const currentTasksObject = {
        month: targetMonth,
        day: targetDay,
        tasks: Object.values(monthsData[targetMonth][targetDay])
    };
    setCurrentTasks(currentTasksObject)
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

    console.log("useEffect fired")
    const fetchTasks = async () => {

        try {
            const snapshot = await getDocs(calendarColRef)
            snapshot.docs.forEach((doc) => {
                switch(doc.id) { 
                    case "august": 
                        setMonthsData({"august": doc.data()})
                    break;
                    case "september":
                        setMonthsData((prev) => ({...prev, "september": doc.data()}))
                    break;
                }
            })
        } catch(err) {
            console.log(err.message)
        }


    }

    fetchTasks()

    }, [])


//   useEffect(() => {
//     console.log("current tasks are:", currentTasks)
//   }, [currentTasks])



  //   CIRCLE ALL DAYS THAT CONTAIN TASKS ON THE CALENDAR
  useEffect(() => {


    // console.log("from 2nd useeffect:", Object.keys(monthsData.august))
    
//     const januaryTasksArray = []
//     const januaryKeys = Object.keys(januaryDays)
//     januaryKeys.forEach((key) => {
//         if(januaryDays[key][0]?.length !== 0) {
//             januaryTasksArray.push(new Date(`2023, 1, ${key}`))
//         }
//     })

//     const februaryTasksArray = []
//     const februaryKeys = Object.keys(februaryDays);
//     februaryKeys.forEach((key) => {
//         if (februaryDays[key][0]?.length !== 0) {
//             februaryTasksArray.push(new Date(`2023, 2, ${key}`))
//         }
//     });

//     const marchTasksArray = []
//     const marchKeys = Object.keys(marchDays);
//     marchKeys.forEach((key) => {
//         if (marchDays[key][0]?.length !== 0) {
//             marchTasksArray.push(new Date(`2023, 3, ${key}`))
//         }
//     });

//     const aprilTasksArray = []
//     const aprilKeys = Object.keys(aprilDays);
//     aprilKeys.forEach((key) => {
//         if (aprilDays[key][0]?.length !== 0) {
//             aprilTasksArray.push(new Date(`2023, 4, ${key}`))
//         }
//     });

//     const mayTasksArray = []
//     const mayKeys = Object.keys(mayDays);
//     mayKeys.forEach((key) => {
//         if (mayDays[key][0]?.length !== 0) {
//             mayTasksArray.push(new Date(`2023, 5, ${key}`))
//         }
//     });

//     const juneTasksArray = []
//     const juneKeys = Object.keys(juneDays);
//     juneKeys.forEach((key) => {
//         if (juneDays[key][0]?.length !== 0) {
//             juneTasksArray.push(new Date(`2023, 6, ${key}`))
//         }
//     });

//     const julyTasksArray = []
//     const julyKeys = Object.keys(julyDays);
//     julyKeys.forEach((key) => {
//         if (julyDays[key][0]?.length !== 0) {
//             julyTasksArray.push(new Date(`2023, 7, ${key}`))
//         }
//     });


// =================================================================

    const today = new Date()

    const augustTasksArray = []
    const augustKeys = Object.keys(monthsData.august || {});
    augustKeys.forEach((key) => {
        if(monthsData.august[key][1].length !== 0) {
            augustTasksArray.push(new Date(today.getFullYear(), 7, key))
        }
    });

    const septemberTasksArray = []
    const septemberKeys = Object.keys(monthsData.september || {});
    septemberKeys.forEach((key) => {
        if(monthsData.september[key][1].length !== 0) {
            septemberTasksArray.push(new Date(today.getFullYear(), 8, key))
        }
    });




    // =================================================================


//     const octoberTasksArray = []
//     const octoberKeys = Object.keys(octoberDays);
//     octoberKeys.forEach((key) => {
//         if (octoberDays[key][0]?.length !== 0) {
//             octoberTasksArray.push(new Date(`2023, 10, ${key}`))
//         }
//     });

//     const novemberTasksArray = []
//     const novemberKeys = Object.keys(novemberDays);
//     novemberKeys.forEach((key) => {
//         if (novemberDays[key][0]?.length !== 0) {
//             novemberTasksArray.push(new Date(`2023, 11, ${key}`))
//         }
//     });

//     const decemberTasksArray = []
//     const decemberKeys = Object.keys(decemberDays);
//     decemberKeys.forEach((key) => {
//         if (decemberDays[key][0]?.length !== 0) {
//             decemberTasksArray.push(new Date(`2023, 12, ${key}`))
//         }
//     });

//     setDaysWithTasks([
//         ...januaryTasksArray, 
//         ...februaryTasksArray,
//         ...marchTasksArray,
//         ...aprilTasksArray,
//         ...mayTasksArray,
//         ...juneTasksArray,
//         ...julyTasksArray,
//         ...augustTasksArray, 
//         ...septemberTasksArray,
//         ...octoberTasksArray,
//         ...novemberTasksArray,
//         ...decemberTasksArray
//     ])

    setDaysWithTasks([...augustTasksArray, ...septemberTasksArray])

  }, [monthsData])


//   useEffect(() => {
//     console.log("current tasks result:", currentTasks)
//   }, [currentTasks])

useEffect(() => {
    console.log("months data:", monthsData)
  }, [monthsData])


  return (
        <div className="h-[calc(100vh-50px)] p-24">

            <div className="bg-white grid grid-cols-2 mx-auto p-10">
                {/* calendar container */}
                <div className="grid place-items-center">
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
                <div className="flex flex-col">
                    <div className="grid grid-cols-2 border-b-2 pb-6 mb-6 border-gray-300">
                        <div className="grid place-items-center">{footer}</div>
                        <button className={`rounded h-9 w-fit mx-auto text-sm px-3 ${selectedDate ? "bg-green-400 text-gray-50 hover:bg-green-500 cursor-pointer" : "bg-gray-300 text-gray-100" }`} disabled={!selectedDate} onClick={handleAdd}>Add new task for this day</button>
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