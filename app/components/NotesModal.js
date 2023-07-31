
import {GrClose} from "react-icons/gr"
import {MdOutlineClose} from "react-icons/md"


export const NotesModal = ({notes, handleCloseModal}) => {
  return (
    <div className="modal-overlay h-[100vh] w-[100%] bg-black bg-opacity-70 absolute left-0 top-0 flex flex-col items-center" onClick={(e) => handleCloseModal(e)}>
        <MdOutlineClose className="close-modal absolute top-5 right-7 cursor-pointer text-gray-50" size="4rem"  />
        <div className="w-[50%] h-[60%] bg-white text-black p-5 mt-28">
            {notes && notes}
        </div>
    </div>
  )
}