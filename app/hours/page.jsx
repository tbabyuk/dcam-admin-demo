"use client";

import { collection, getDocs } from "firebase/firestore";
import { staffDB } from "@/firebase/config";
import { useEffect, useState } from "react";
import { NotesModal } from "../components/NotesModal";

const colRef = collection(staffDB, "meta-data");

const TeachersHours = () => {
  const [attendanceStatus, setAttendanceStatus] = useState({})
  const [showNotesModal, setShowNotesModal] = useState(false)
  const [currentTeacher, setCurrentTeacher] = useState("")
  const [currentWeek, setCurrentWeek] = useState("")

  console.log("logging attendanceStatus:", attendanceStatus)


  const handleNotesModal = (teacher, week) => {
    console.log("current teacher is:", teacher)
    setCurrentTeacher(teacher)
    setCurrentWeek(week)
    setShowNotesModal(true)
  }

  const handleCloseModal = (e) => {
    console.log("logging target:", e.target.nodeName)

    if(e.target.classList.contains("modal-overlay") || e.target.nodeName === "svg" || e.target.nodeName === "path") {
      setShowNotesModal(false)
    }
  }

  // fetch data when component first renders
  useEffect(() => {
    let attendance = {};

    const fetchData = async () => {
      try {
        const snapshot = await getDocs(colRef);
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



  return (
    <main className="home-page h-[calc(100vh-50px)] py-10 px-48">
      <h1 className="text-2xl font-semibold mb-8">Teachers' Hours</h1>
      <table className="bg-gray-100 w-full rounded-md">
        <thead>
          <tr className="text-gray-50 text-center bg-gray-400">
            <th className="py-5 font-semibold text-sm uppercase">Teacher</th>
            <th className="py-5 font-semibold text-sm uppercase">Not Started</th>
            <th className="py-5 font-semibold text-sm uppercase">First Week Submitted</th>
            <th className="py-5 font-semibold text-sm uppercase">Both Weeks Submitted</th>
            <th className="py-5 font-semibold text-sm uppercase">Teacher's Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
              <td className="py-4 text-center">Jonathan</td>
              <td><div className={`mx-auto ${!attendanceStatus.jonathan?.week1AttendanceSubmitted && !attendanceStatus.jonathan?.     week2AttendanceSubmitted && "bg-gray-400"} rounded-full`} style={{width: "20px", height: "20px"}} /></td>
              <td><div className={`mx-auto ${attendanceStatus.jonathan?.week1AttendanceSubmitted && !attendanceStatus.jonathan?.week2AttendanceSubmitted && "bg-orange-400"} rounded-full`} style={{width: "20px", height: "20px"}} /></td>
              <td><div className={`mx-auto ${attendanceStatus.jonathan?.week1AttendanceSubmitted && attendanceStatus.jonathan?.week2AttendanceSubmitted && "bg-green-400"} rounded-full`} style={{width: "20px", height: "20px"}} /></td>
              <td>
                <div className="flex justify-around items-center">
                    <button 
                        className={`btn-form ${attendanceStatus.jonathan?.week1Notes ? "bg-green-400 hover:bg-green-500" : "bg-gray-400"} text-sm rounded py-1 px-2`} 
                        disabled={!attendanceStatus.jonathan?.week1Notes}
                        onClick={() => handleNotesModal("jonathan", "week1Notes")}>
                          Week1
                    </button>
                    <button 
                        className={`btn-form ${attendanceStatus.jonathan?.week2Notes ? "bg-green-400 hover:bg-green-500" : "bg-gray-400"} text-sm rounded py-1 px-2`} 
                        disabled={!attendanceStatus.jonathan?.week2Notes}
                        onClick={() => handleNotesModal("jonathan", "week2Notes")}>
                          Week2
                    </button>
                </div>
              </td>
          </tr>
          <tr className="bg-gray-200">
              <td className="py-4 text-center">Rachel</td>
              <td><div className={`mx-auto ${!attendanceStatus.rachel?.week1AttendanceSubmitted && !attendanceStatus.rachel?.week2AttendanceSubmitted && "bg-gray-400"} rounded-full`} style={{width: "20px", height: "20px"}} /></td>
              <td><div className={`mx-auto ${attendanceStatus.rachel?.week1AttendanceSubmitted && !attendanceStatus.rachel?.week2AttendanceSubmitted && "bg-orange-400"} rounded-full`} style={{width: "20px", height: "20px"}} /></td>
              <td><div className={`mx-auto ${attendanceStatus.rachel?.week1AttendanceSubmitted && attendanceStatus.rachel?.week2AttendanceSubmitted && "bg-green-400"} rounded-full`} style={{width: "20px", height: "20px"}} /></td>
              <td>
                <div className="flex justify-around items-center">
                    <button 
                        className={`btn-form ${attendanceStatus.rachel?.week1Notes ? "bg-green-400 hover:bg-green-500" : "bg-gray-400"} text-sm rounded py-1 px-2`} 
                        disabled={!attendanceStatus.rachel?.week1Notes}
                        onClick={() => handleNotesModal("rachel", "week1Notes")}>
                          Week1
                    </button>
                    <button 
                        className={`btn-form ${attendanceStatus.rachel?.week2Notes ? "bg-green-400 hover:bg-green-500" : "bg-gray-400"} text-sm rounded py-1 px-2`} 
                        disabled={!attendanceStatus.rachel?.week2Notes}
                        onClick={() => handleNotesModal("rachel", "week2Notes")}>
                          Week2
                    </button>
                </div>
              </td>          
          </tr>
          <tr>
              <td className="py-4 text-center">Raul</td>
              <td><div className={`mx-auto ${!attendanceStatus.raul?.week1AttendanceSubmitted && !attendanceStatus.raul?.week2AttendanceSubmitted && "bg-gray-400"} rounded-full`} style={{width: "20px", height: "20px"}} /></td>
              <td><div className={`mx-auto ${attendanceStatus.raul?.week1AttendanceSubmitted && !attendanceStatus.raul?.week2AttendanceSubmitted && "bg-orange-400"} rounded-full`} style={{width: "20px", height: "20px"}} /></td>
              <td><div className={`mx-auto ${attendanceStatus.raul?.week1AttendanceSubmitted && attendanceStatus.raul?.week2AttendanceSubmitted && "bg-green-400"} rounded-full`} style={{width: "20px", height: "20px"}} /></td>
              <td>
                <div className="flex justify-around items-center">
                    <button 
                        className={`btn-form ${attendanceStatus.raul?.week1Notes ? "bg-green-400 hover:bg-green-500" : "bg-gray-400"} text-sm rounded py-1 px-2`} 
                        disabled={!attendanceStatus.raul?.week1Notes}
                        onClick={() => handleNotesModal("raul", "week1Notes")}>
                          Week1
                    </button>
                    
                    <button 
                        className={`btn-form ${attendanceStatus.raul?.week2Notes ? "bg-green-400 hover:bg-green-500" : "bg-gray-400"} text-sm rounded py-1 px-2`} 
                        disabled={!attendanceStatus.raul?.week2Notes}
                        onClick={() => handleNotesModal("raul", "week2Notes")}>
                          Week2
                        </button>
                </div>
              </td>          
          </tr>
          <tr className="bg-gray-200">
              <td className="py-4 text-center">Senya</td>
              <td><div className={`mx-auto ${!attendanceStatus.senya?.week1AttendanceSubmitted && !attendanceStatus.senya?.week2AttendanceSubmitted && "bg-gray-400"} rounded-full`} style={{width: "20px", height: "20px"}} /></td>
              <td><div className={`mx-auto ${attendanceStatus.senya?.week1AttendanceSubmitted && !attendanceStatus.senya?.week2AttendanceSubmitted && "bg-orange-400"} rounded-full`} style={{width: "20px", height: "20px"}} /></td>
              <td><div className={`mx-auto ${attendanceStatus.senya?.week1AttendanceSubmitted && attendanceStatus.senya?.week2AttendanceSubmitted && "bg-green-400"} rounded-full`} style={{width: "20px", height: "20px"}} /></td>
              <td>
                <div className="flex justify-around items-center">
                    <button 
                        className={`btn-form ${attendanceStatus.senya?.week1Notes ? "bg-green-400 hover:bg-green-500" : "bg-gray-400"} text-sm rounded py-1 px-2`} 
                        disabled={!attendanceStatus.senya?.week1Notes}
                        onClick={() => handleNotesModal("senya", "week1Notes")}>
                            Week1
                    </button>
                    <button 
                        className={`btn-form ${attendanceStatus.senya?.week2Notes ? "bg-green-400 hover:bg-green-500" : "bg-gray-400"} text-sm rounded py-1 px-2`} 
                        disabled={!attendanceStatus.senya?.week2Notes}
                        onClick={() => handleNotesModal("senya", "week2Notes")}>
                          Week2
                    </button>
                </div>
              </td>          
          </tr>
          <tr>
              <td className="py-4 text-center">Taisiya</td>
              <td><div className={`mx-auto ${!attendanceStatus.taisiya?.week1AttendanceSubmitted && !attendanceStatus.taisiya?.week2AttendanceSubmitted && "bg-gray-400"} rounded-full`} style={{width: "20px", height: "20px"}} /></td>
              <td><div className={`mx-auto ${attendanceStatus.taisiya?.week1AttendanceSubmitted && !attendanceStatus.taisiya?.week2AttendanceSubmitted && "bg-orange-400"} rounded-full`} style={{width: "20px", height: "20px"}} /></td>
              <td><div className={`mx-auto ${attendanceStatus.taisiya?.week1AttendanceSubmitted && attendanceStatus.taisiya?.week2AttendanceSubmitted && "bg-green-400"} rounded-full`} style={{width: "20px", height: "20px"}} /></td>
              <td>
                <div className="flex justify-around items-center">
                    <button 
                        className={`btn-form ${attendanceStatus.taisiya?.week1Notes ? "bg-green-400 hover:bg-green-500" : "bg-gray-400"} text-sm rounded py-1 px-2`} 
                        disabled={!attendanceStatus.taisiya?.week1Notes}
                        onClick={() => handleNotesModal("taisiya", "week1Notes")}>
                          Week1
                    </button>
                    <button 
                        className={`btn-form ${attendanceStatus.taisiya?.week2Notes ? "bg-green-400 hover:bg-green-500" : "bg-gray-400"} text-sm rounded py-1 px-2`} 
                        disabled={!attendanceStatus.taisiya?.week2Notes}
                        onClick={() => handleNotesModal("taisiya", "week2Notes")}>
                          Week2
                    </button>
                </div>
              </td>          
          </tr>
          <tr className="bg-gray-200">
              <td className="py-4 text-center">Tiago</td>
              <td><div className={`mx-auto ${!attendanceStatus.tiago?.week1AttendanceSubmitted && !attendanceStatus.tiago?.week2AttendanceSubmitted && "bg-gray-400"} rounded-full`} style={{width: "20px", height: "20px"}} /></td>
              <td><div className={`mx-auto ${attendanceStatus.tiago?.week1AttendanceSubmitted && !attendanceStatus.tiago?.week2AttendanceSubmitted && "bg-orange-400"} rounded-full`} style={{width: "20px", height: "20px"}} /></td>
              <td><div className={`mx-auto ${attendanceStatus.tiago?.week1AttendanceSubmitted && attendanceStatus.tiago?.week2AttendanceSubmitted && "bg-green-400"} rounded-full`} style={{width: "20px", height: "20px"}} /></td>
              <td>
                <div className="flex justify-around items-center">
                    <button 
                        className={`btn-form ${attendanceStatus.tiago?.week1Notes ? "bg-green-400 hover:bg-green-500" : "bg-gray-400"} text-sm rounded py-1 px-2`} 
                        disabled={!attendanceStatus.tiago?.week1Notes}
                        onClick={() => handleNotesModal("tiago", "week1Notes")}>
                          Week1
                    </button>
                    <button 
                        className={`btn-form ${attendanceStatus.tiago?.week2Notes ? "bg-green-400 hover:bg-green-500" : "bg-gray-400"} text-sm rounded py-1 px-2`} 
                        disabled={!attendanceStatus.tiago?.week2Notes}
                        onClick={() => handleNotesModal("tiago", "week2Notes")}>
                          Week2
                    </button>
                </div>
              </td>          
          </tr>
        </tbody>
      </table>
      {showNotesModal && <NotesModal notes={attendanceStatus[currentTeacher]?.[currentWeek]} handleCloseModal={handleCloseModal} />}
    </main>

  );
};

export default TeachersHours;
