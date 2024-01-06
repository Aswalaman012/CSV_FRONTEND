import React, { useEffect, useState } from 'react';
import axios from 'axios';
import csvtojson from 'csvtojson';
import './App.css';

const App = () => {
  
 
  // sendData(data);
  const [students, setStudents] = useState([]);
  // const [students,setstudents]=useState([]);


  const fetchData = async () => {
    try {
        const response = await axios.get(
          "https://docs.google.com/spreadsheets/d/1-_TnhLaneNfg_cjZcVndDj0EMt2Y8Rk3fd1cOji8tvo/export?format=csv"
        );
  
       const data = await csvtojson().fromString(response.data);
        
        setStudents(data);
        sendData(data);
       }
    catch(err){
      console.error('Error!',err);
    }
    
  };
  const sendData=async(val)=>{
    try{
      const response=await axios.post('http://localhost:8000/api/students',val);
      console.log(response.data);
    }
    catch(err){
      console.error("ERROR", err)
    }
  }
useEffect(()=>{
  fetchData();
},[])
 
    

     
  //     sendData(data);

  return (
    
    <div className="">
      <h1>student data</h1>
      {/* <button onClick={sendData}>--</button> */}
      <table className='tab'>
        <thead>
          <tr>
            <th>serial</th>
            <th>name</th>
            <th>class</th>
            <th>age</th>
            <th>street</th>
            <th>city</th>
            <th>state</th>
            <th>zipcode</th>
            <th>hobby1</th>
            <th>hobby2</th>
            <th>hobby3</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.serial}</td>
              <td>{student.name}</td>
              <td>{student.standard}</td>
              <td>{student.age}</td>
              <td>{student.street}</td>
              <td>{student.city}</td>
              <td>{student.state}</td>
              <td>{student.zipcode}</td>
              <td>{student.hobby1}</td>
              <td>{student.hobby2}</td>
              <td>{student.hobby3}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;

