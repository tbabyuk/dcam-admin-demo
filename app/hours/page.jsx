"use client";

import { collection, getDocs } from "firebase/firestore";
import { staffDB } from "@/firebase/config";
import { useEffect, useState } from "react";
import { NotesModal } from "../components/NotesModal";
import { AttendanceModal } from "../components/AttendanceModal";

const colRefMeta = collection(staffDB, "meta-data");

const TeachersHours = () => {
  const [attendanceStatus, setAttendanceStatus] = useState({})
  const [showNotesModal, setShowNotesModal] = useState(false)
  const [showAttendanceModal, setShowAttendanceModal] = useState(false)
  const [currentTeacher, setCurrentTeacher] = useState("")
  const [currentWeek, setCurrentWeek] = useState("")

  // attendance records
  const [diegoAttendance, setDiegoAttendance] = useState([])
  const [michelleAttendance, setMichelleAttendance] = useState([])
  const [paulaAttendance, setPaulaAttendance] = useState([])


  const decideTeacher = (teacher) => {

      switch(teacher) {

        case "diego": {
          return diegoAttendance
          break;
        }
        case "michelle": {
          return michelleAttendance
          break;
        }
        case "paula": {
          return paulaAttendance
          break;
        }
      }
  }


  const handleNotesModal = (teacher, week) => {
    console.log("current teacher is:", teacher)
    setCurrentTeacher(teacher)
    setCurrentWeek(week)
    setShowNotesModal(true)
  }

  const handleAttendanceModal = (teacher) => {
    setCurrentTeacher(teacher)
    setShowAttendanceModal(true)
  }

  const handleCloseModal = (e) => {
    console.log("logging target:", e.target.nodeName)

    if(e.target.classList.contains("modal-overlay") || e.target.nodeName === "svg" || e.target.nodeName === "path") {
      setShowNotesModal(false)
      setShowAttendanceModal(false)
    }
  }

  // fetch data from "meta-data" when component first renders
  useEffect(() => {
    let attendance = {};

    const fetchData = async () => {
      try {
        const snapshot = await getDocs(colRefMeta);
        snapshot.docs.forEach((doc) => {
          console.log("logging doc:", doc.data(), doc.id);
          attendance[doc.id] = doc.data();
        });

        setAttendanceStatus(attendance);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, []);


  // fetch attendance data from all teachers when component first renders

  // collection Refs
  const diegoColRef = collection(staffDB, "diego-students")
  const michelleColRef = collection(staffDB, "michelle-students")
  const paulaColRef = collection(staffDB, "paula-students")


  useEffect(() => {

    const fetchData = async () => {

      let diegoAttendanceArray = [];
      let michelleAttendanceArray = [];
      let paulaAttendanceArray = [];

      try {
          const [diegoSnapshot, michelleSnapshot, paulaSnapshot ] = await Promise.all([
            getDocs(diegoColRef),
            getDocs(michelleColRef),
            getDocs(paulaColRef)
          ])

            console.log("logging Michelle's docs:", michelleSnapshot)
            diegoSnapshot.docs.forEach((doc) => {
                diegoAttendanceArray.push({name: doc.id, ...doc.data().attendance, pay: doc.data().pay})
            })
            setDiegoAttendance(diegoAttendanceArray)

            michelleSnapshot.docs.forEach((doc) => {
                michelleAttendanceArray.push({name: doc.id, ...doc.data().attendance, pay: doc.data().pay})
            })
            setMichelleAttendance(michelleAttendanceArray)

            paulaSnapshot.docs.forEach((doc) => {
                paulaAttendanceArray.push({name: doc.id, ...doc.data().attendance, pay: doc.data().pay})
            })
            setPaulaAttendance(paulaAttendanceArray)

      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);



  return (
    <main className="home-page h-[calc(100vh-50px)] pt-20 py-10 px-5 md:px-20 lg:px-40 xl:px-60 overflow-x-scroll">
      <h1 className="text-2xl font-semibold mb-8">Teachers&apos; Hours</h1>
      <table className="bg-gray-100 w-full rounded-md">
        <thead>
          <tr className="text-gray-50 text-center bg-gray-400">
            <th className="py-5 px-6 font-semibold text-sm">Teacher</th>
            <th className="py-5 px-6 font-semibold text-sm">Not Started</th>
            <th className="py-5 px-6 font-semibold text-sm">First Week Submitted</th>
            <th className="py-5 px-6 font-semibold text-sm">Both Weeks Submitted</th>
            <th className="py-5 px-6 font-semibold text-sm">Attendance</th>
            <th className="py-5 px-12 font-semibold text-sm">Teacher&apos;s Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
              <td className="py-4 px-4 text-center">Diego</td>
              <td><div className={`mx-auto ${!attendanceStatus.diego?.week1AttendanceSubmitted && !attendanceStatus.diego?. week2AttendanceSubmitted && "bg-gray-400"} rounded-full`} style={{width: "20px", height: "20px"}} /></td>
              <td><div className={`mx-auto ${attendanceStatus.diego?.week1AttendanceSubmitted && !attendanceStatus.diego?.week2AttendanceSubmitted && "bg-orange-400"} rounded-full`} style={{width: "20px", height: "20px"}} /></td>
              <td><div className={`mx-auto ${attendanceStatus.diego?.week1AttendanceSubmitted && attendanceStatus.diego?.week2AttendanceSubmitted && "bg-green-400"} rounded-full`} style={{width: "20px", height: "20px"}} /></td>
              <td>
                <div className="flex justify-around items-center px-4">
                    <button 
                        className={`btn-form ${attendanceStatus.diego?.week2AttendanceSubmitted ? "bg-green-400 hover:bg-green-500" : "bg-gray-400"} text-sm rounded py-1 px-2`} 
                        disabled={!attendanceStatus.diego?.week2AttendanceSubmitted}
                        onClick={() => handleAttendanceModal("diego")}>
                          Attendance
                    </button>
                </div>
              </td>
              <td>
                <div className="flex justify-around items-center">
                    <button 
                        className={`btn-form ${attendanceStatus.diego?.week1Notes ? "bg-green-400 hover:bg-green-500" : "bg-gray-400"} text-sm rounded py-1 px-2`} 
                        disabled={!attendanceStatus.diego?.week1Notes}
                        onClick={() => handleNotesModal("diego", "week1Notes")}>
                          Week1
                    </button>
                    <button 
                        className={`btn-form ${attendanceStatus.diego?.week2Notes ? "bg-green-400 hover:bg-green-500" : "bg-gray-400"} text-sm rounded py-1 px-2`} 
                        disabled={!attendanceStatus.diego?.week2Notes}
                        onClick={() => handleNotesModal("diego", "week2Notes")}>
                          Week2
                    </button>
                </div>
              </td>
          </tr>
          <tr className="bg-gray-200">
              <td className="py-4 text-center">Michelle</td>
              <td><div className={`mx-auto ${!attendanceStatus.michelle?.week1AttendanceSubmitted && !attendanceStatus.michelle?.week2AttendanceSubmitted && "bg-gray-400"} rounded-full`} style={{width: "20px", height: "20px"}} /></td>
              <td><div className={`mx-auto ${attendanceStatus.michelle?.week1AttendanceSubmitted && !attendanceStatus.michelle?.week2AttendanceSubmitted && "bg-orange-400"} rounded-full`} style={{width: "20px", height: "20px"}} /></td>
              <td><div className={`mx-auto ${attendanceStatus.michelle?.week1AttendanceSubmitted && attendanceStatus.michelle?.week2AttendanceSubmitted && "bg-green-400"} rounded-full`} style={{width: "20px", height: "20px"}} /></td>
              <td>
                <div className="flex justify-around items-center">
                    <button 
                        className={`btn-form ${attendanceStatus.michelle?.week2AttendanceSubmitted ? "bg-green-400 hover:bg-green-500" : "bg-gray-400"} text-sm rounded py-1 px-2`} 
                        disabled={!attendanceStatus.michelle?.week2AttendanceSubmitted}
                        onClick={() => handleAttendanceModal("michelle")}>
                          Attendance
                    </button>
                </div>
              </td>
              <td>
                <div className="flex justify-around items-center">
                    <button 
                        className={`btn-form ${attendanceStatus.michelle?.week1Notes ? "bg-green-400 hover:bg-green-500" : "bg-gray-400"} text-sm rounded py-1 px-2`} 
                        disabled={!attendanceStatus.michelle?.week1Notes}
                        onClick={() => handleNotesModal("michelle", "week1Notes")}>
                          Week1
                    </button>
                    <button 
                        className={`btn-form ${attendanceStatus.michelle?.week2Notes ? "bg-green-400 hover:bg-green-500" : "bg-gray-400"} text-sm rounded py-1 px-2`} 
                        disabled={!attendanceStatus.michelle?.week2Notes}
                        onClick={() => handleNotesModal("michelle", "week2Notes")}>
                          Week2
                    </button>
                </div>
              </td>          
          </tr>
          <tr>
              <td className="py-4 text-center">Paula</td>
              <td><div className={`mx-auto ${!attendanceStatus.paula?.week1AttendanceSubmitted && !attendanceStatus.paula?.week2AttendanceSubmitted && "bg-gray-400"} rounded-full`} style={{width: "20px", height: "20px"}} /></td>
              <td><div className={`mx-auto ${attendanceStatus.paula?.week1AttendanceSubmitted && !attendanceStatus.paula?.week2AttendanceSubmitted && "bg-orange-400"} rounded-full`} style={{width: "20px", height: "20px"}} /></td>
              <td><div className={`mx-auto ${attendanceStatus.paula?.week1AttendanceSubmitted && attendanceStatus.paula?.week2AttendanceSubmitted && "bg-green-400"} rounded-full`} style={{width: "20px", height: "20px"}} /></td>
              <td>
                <div className="flex justify-around items-center">
                    <button 
                        className={`btn-form ${attendanceStatus.paula?.week2AttendanceSubmitted ? "bg-green-400 hover:bg-green-500" : "bg-gray-400"} text-sm rounded py-1 px-2`} 
                        disabled={!attendanceStatus.paula?.week2AttendanceSubmitted}
                        onClick={() => handleAttendanceModal("paula")}>
                          Attendance
                    </button>
                </div>
              </td>
              <td>
                <div className="flex justify-around items-center">
                    <button 
                        className={`btn-form ${attendanceStatus.paula?.week1Notes ? "bg-green-400 hover:bg-green-500" : "bg-gray-400"} text-sm rounded py-1 px-2`} 
                        disabled={!attendanceStatus.paula?.week1Notes}
                        onClick={() => handleNotesModal("paula", "week1Notes")}>
                          Week1
                    </button>
                    
                    <button 
                        className={`btn-form ${attendanceStatus.paula?.week2Notes ? "bg-green-400 hover:bg-green-500" : "bg-gray-400"} text-sm rounded py-1 px-2`} 
                        disabled={!attendanceStatus.paula?.week2Notes}
                        onClick={() => handleNotesModal("paula", "week2Notes")}>
                          Week2
                        </button>
                </div>
              </td>          
          </tr>
        </tbody>
      </table>
      {showNotesModal && <NotesModal notes={attendanceStatus[currentTeacher]?.[currentWeek]} handleCloseModal={handleCloseModal} />}
      {showAttendanceModal && <AttendanceModal attendance={decideTeacher(currentTeacher)} handleCloseModal={handleCloseModal} />}
    </main>

  );
};

export default TeachersHours;
