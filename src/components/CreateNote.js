import React, { useState , useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
const CreateNote = () => {
  // const Navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
   const [getNote, setGetNote] = useState([]);
  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3000/create", {
      title,
      body,
    });
    if (!response.data || response.status === 400) {
      console.log("invalid request || no data found");
    }
    getNotes()
    setTitle("");
    setBody("");
  };

  // for fetching the note data
 
  const getNotes = async (e) => {
    // e.preventDefault()
    const response = await fetch("http://localhost:3000/fetch");
    const data = await response.json();
    console.log(data);
    const arr = Array.from(data.notes);
    console.log(arr);
    setGetNote(arr);
  };
  useEffect(() => {
    getNotes();
  }, []);

  // deleting the data using api
  // const deleteNote = async (id) => {
  //   const del = await fetch(`http://localhost:3000/delete/${id}` 
  //   ,{method:'GET'}
  //   )
  //   if(del.status==400) {
  //     console.log("unable to delete the note")
  //   }
  // };

   const deleteNote = async(id) => {
    try{
      const del = await axios.get(`http://localhost:3000/delete/${id}`)
      console.log("succesfully deleted")
      getNotes()
    }catch(err) {
      console.log("unable to delete data")
    }
   }


  // for deleting the data
  // const deleteNote= (val) => {
  //   const data = getNote.filter((e) => {
  //     return e.id !== val;
  //   });
  //   setGetNote(data);
  // };

  return (
    <>
      <div className="container">
        <div>
          <div className="row">
            <div className="col-md-12">
              <card className="card p-5 m-5">
                <form>
                  <div>
                    <input
                      className="form-control w-full mb-3"
                      type="text"
                      name="title"
                      required
                      placeholder="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    ></input>
                    <input
                      className="form-control w-full mb-3"
                      type="text"
                      name="body"
                      required
                      placeholder="body"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                    ></input>
                    <button
                      type="submit"
                      className="btn bg-primary text-white"
                      onClick={submitHandler}
                    >
                      Create Note
                    </button>
                  </div>
                </form>
              </card>
            </div>
          </div>
        </div>
        <div className="row">
          {getNote
            .slice(0)
            .reverse()
            .map((ele) => {
              let {title , body , id} = ele
              console.log(ele)
              return (
                  <div className="col-md-8 p-3" key={id}>
                    <div>{title}</div>
                    <div>{body}</div>
                    <button onClick={()=>{deleteNote(id)}}>Delete</button>
                    <hr></hr>
                  </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default CreateNote;
