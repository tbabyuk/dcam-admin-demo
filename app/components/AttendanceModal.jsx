"use client"


import {MdOutlineClose} from "react-icons/md"
import { useEffect, useState } from "react"
import {AiFillCheckSquare} from "react-icons/ai"
import {AiFillCloseSquare} from "react-icons/ai"

export const AttendanceModal = ({attendance, handleCloseModal}) => {

    console.log("att....", attendance)

    const [totalPay, setTotalPay] = useState(null)

    useEffect(() => {
        const calcTotalPay = () => {
            let total = 0;
            attendance.forEach((student) => {
                if(student.week1.present) {
                    total += student.pay
                }
                if(student.week2.present) {
                    total += student.pay
                }
            })
            setTotalPay(total)
        }
        calcTotalPay()
    }, [attendance])


  return (
    <div className="modal-overlay h-[100vh] w-[100%] bg-black bg-opacity-70 absolute left-0 top-0 flex flex-col items-center" onClick={(e) => handleCloseModal(e)}>
        <MdOutlineClose className="close-modal absolute top-5 right-7 cursor-pointer text-gray-50" size="4rem"  />
        <div className="modal overflow-auto w-[90%] md:w-[70%] lg:w-[50%] h-auto bg-white text-black mt-28 md:mt-20">
            <table className="bg-gray-100 w-full">
                <thead>
                    <tr className="text-gray-50 text-center bg-gray-400">
                        <th className="py-5 font-semibold text-sm">Student</th>
                        <th className="py-5 font-semibold text-sm">Wk 1</th>
                        <th className="py-5 font-semibold text-sm">Wk 2</th>
                        <th className="py-5 font-semibold text-sm">Wk 1 Pay</th>
                        <th className="py-5 font-semibold text-sm">Wk 2 Pay</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {attendance && 
                        attendance.map((student, index) => (
                            <tr key={index}>
                                <td className="py-3 text-center">{student.name}</td>
                                <td>{student.week1.present ? <AiFillCheckSquare size="1.2rem" className="text-green-500 mx-auto" /> : <AiFillCloseSquare size="1.2rem" className="text-red-500 mx-auto" />}</td>
                                <td>{student.week2.present ? <AiFillCheckSquare size="1.2rem" className="text-green-500 mx-auto" /> : <AiFillCloseSquare size="1.2rem" className="text-red-500 mx-auto" />}</td>
                                <td className="text-center">{student.week1?.present ? `$${student.pay.toFixed(2)}` : "$0.00"}</td>
                                <td className="text-center">{student.week2?.present ? `$${student.pay.toFixed(2)}` : "$0.00"}</td>
                            </tr>
                        ))
                    }
                    <tr className="bg-green-200">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td colspan="2" className="py-4 text-center col-span-2">Total Pay:<span className="font-semibold ms-3">${totalPay && totalPay.toFixed(2)}</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}