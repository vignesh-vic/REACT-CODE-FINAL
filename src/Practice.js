import React, { useState } from 'react'
import './App.css'

export default function Practice() {

//initial State 

const [userDetails,setDetails]=useState([
   { name:'vignesh',
    age:'22',
    ph:'233'
}])



const onHandleChange=(e)=>{
    const {name,value}=e.target;

    setDetails((prve)=>({
      ...prve,
      [name]:value
    }))
  
}

const inHandleSubmit=()=>{
  console.log(userDetails);
}

  return (
    <div>
        <input className='border-2 mb-5 border-black' name='name' value={userDetails.name} onChange={onHandleChange} placeholder='user name'  /> <br/>
        <input className='border-2 mb-5 border-black' name='age' value={userDetails.age} onChange={onHandleChange} placeholder='user age'  /> <br/>
        <input className='border-2 border-black' name='ph' value={userDetails.ph} onChange={onHandleChange} placeholder='user ph'  /> <br/>
        <button onClick={()=>inHandleSubmit()} className='border-2 border-black'>Submit</button>
        <table>
          <tr>
            <th>name</th>
            <th>age</th>
            <th>ph</th>
          </tr>
          {userDetails.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.ph}</td>
            </tr>
          ))}

        </table>

    </div>
  )
}
