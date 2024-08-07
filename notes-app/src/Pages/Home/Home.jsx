import React, { useEffect, useState } from 'react';
import Cards from '../../Components/Cards/Cards';
import { MdAdd } from 'react-icons/md';
import AddEditNote from '../../Components/AddEditNote/AddEditNote';
import Modal from 'react-modal';
import axiosInstance from '../../axiosInstance';

const Home = () => {


  const handleEdit = () => {
    console.log('Edit clicked');
  };

  const handleDelete = () => {
    console.log('Delete clicked');
  };

  const handlePinNote = () => {
    console.log('Pin clicked');
  };

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });


  //get all notes
  const [AllNotes,setAllNotes] =useState([])


  const getAllnotes = async ()=>{
    try {
      const response = await axiosInstance.get('/api/notes/getnotes');

      if(response.data.success){
        setAllNotes(response.data.notes)
      }
    
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    getAllnotes()
  },[])

  return (
    <div className="flex flex-col  p-5">

      {/* Note Cards */}
      {
  AllNotes.map((item, index) => {
    return (
      <Cards
        key={item._id} 
        title={item.title}
        date={item.date}
        content={item.content}
        tags={item.tags}
        isPinned={item.isPinned}
        onEdit={() => handleEdit(item)} 
        onDelete={() => handleDelete(item)} 
        onPinNote={() => handlePinNote(item)} 
      />
    );
  })
} 
      <div className="fixed bottom-10 right-10">
        <button
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
          onClick={() => {
            setOpenAddEditModal({ isShown: true, type: 'add', data: null });
          }}
        >
          <MdAdd size={25} />
        </button>
      </div>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => setOpenAddEditModal({ isShown: false })}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
        contentLabel="Add Note"
      >
        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-semibold mb-4">
            {openAddEditModal.type === 'add' ? 'Add Note' : 'Edit Note'}
          </h2>
          <AddEditNote type={openAddEditModal.type} noteData={openAddEditModal.data} getAllnotes={getAllnotes}/>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
