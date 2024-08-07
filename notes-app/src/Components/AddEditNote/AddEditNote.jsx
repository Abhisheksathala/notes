
import axiosInstance from "../../axiosInstance";
import { useState } from "react";
import Tags from "../Inputs/Tags";

const AddEditNote = ({noteData,type,getAllnotes}) => {


  const [form,setForm] = useState({
    title:'',
    content:'',
    tags:[]
  })


  const [error,setError] = useState(null)


const addNotes = async ()=>{
  try {
    const response = await axiosInstance.post("/api/notes/addnotes", form);

    if (response.data.success) {
      alert("Note added successfully");
      getAllnotes();
      setForm({title:'', content:'', tags:[]})
    } else {
      throw new Error(response.data.message || "Failed to add note");
    }
  } catch (error) {
    setError(error.message);
  }
}

const editNote = async ()=>{}



  console.log(form)
  const handleChanges = (e)=>{
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }
  const handleTagsChange = (newTags) => {
    setForm((prevForm) => ({ ...prevForm, tags: newTags }));
  };
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!form.title){
      setError("plz enter title")
      return;
    }
    if(!form.content){
      setError("plz enter content")
      return;
    }
    setError('')

    if(type === 'add'){
      addNotes()
    }else{
      editNote()
    }
    
  }

  return (
    <form className="space-y-4 p-4 bg-white shadow-md rounded-md" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="input-label" className="text-lg font-semibold mb-1">
          Title
        </label>
        <input
          type="text"
          onChange={handleChanges}
          value={form.title}
          placeholder="Go To gym"
          name="title"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="input-label" className="text-lg font-semibold mb-1">
          Content
        </label>
        <textarea
          name="content"
          onChange={handleChanges}
          value={form.content}
          rows={10}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <div className="flex flex-col">
        <label htmlFor="tags" className="text-lg font-semibold mb-1">
        <Tags setTags={handleTagsChange} tags={form.tags} />
        </label>
       
      </div>
{
  error && <p className="text-red-500">{error}</p>
}
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        ADD
      </button>
    </form>
  );
};

export default AddEditNote;
