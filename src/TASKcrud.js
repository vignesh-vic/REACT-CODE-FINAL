import React, { useState } from 'react'
import './App.css'
export default function Newcrud() {

    

    
//initial input filed useState
const [inputDetails,setInput]=useState([
    {
        empRoll:'',
        empName:'',
        empAge:'',
        empEmail:'',
        empCountry:'',
        empGender:'',
        empfeedback:''
    }
]) 

//change button
const [isEdit, setIsEdit] = useState(false);



//initial table values  shows in table

const initialData=[
{   empRoll:1,
    empName:'karthick',
    empAge:23,
    empEmail:'karthick@gmail.com',
    empCountry:'india',
    empGender:'Male',
    empfeedback:'good'
},
{
    empRoll:2,
    empName:'kumar',
    empAge:20,
    empEmail:'kumar@gmail.com',
    empCountry:'USA',
    empGender:'Male',
    empfeedback:'good'

},
{
    empRoll:3,
    empName:'Arun',
    empAge:21,
    empEmail:'Arun@gmail.com',
    empCountry:'india',
    empGender:'Male',
    empfeedback:'good'

}

]
//alreay some values in useState
const [empDetails,setDetails]=useState(initialData);


//onchange to set input values to inputDetails
const onHandleChange=(e)=>{
    const {name,value}=e.target;
    setInput((prev)=>({
        ...prev,
        [name]:value

    }))
}



//submit button function
const onHandleSubmit =()=>{
    if(!inputDetails.empName||!inputDetails.empAge||!inputDetails.empEmail||!inputDetails.empCountry||!inputDetails.empGender)return;
    const finIndex=empDetails.findIndex(y=>Number(y.empRoll)===Number(inputDetails.empRoll))
    if (finIndex>-1){
empDetails[finIndex]={
    ...empDetails[finIndex],
    empName:inputDetails.empName,
    empAge:inputDetails.empAge,
    empEmail:inputDetails.empEmail,
    empCountry:inputDetails.empCountry,
    empGender:inputDetails.empGender,
    empfeedback:inputDetails.empfeedback
}
setDetails([...empDetails])
setInput({ empRoll: '', empName: '', empAge: '', empEmail: '',empCountry:'',empGender:'',empfeedback:'' });
setIsEdit(false);

    }else{
        const neData=[...empDetails]
        neData.push({
            empRoll:inputDetails.empRoll,
            empName:inputDetails.empName,
            empAge:inputDetails.empAge,
            empEmail:inputDetails.empEmail,
            empCountry:inputDetails.empCountry,
            empGender:inputDetails.empGender,
            empfeedback:inputDetails.empfeedback
        });
        setDetails([...neData])
        setInput({empRoll:'',empName:'',empAge:'',empEmail:'',empCountry:'',empGender:'',empfeedback:''}) //input 
    }
    }





//delete button
const onHandleDelte=(index)=>{
    setDetails((prev)=>{
        const preData=[...prev]
        preData.splice(index,1)
        return preData

    })
    setInput({ empRoll: '', empName: '', empAge: '', empEmail: '',empCountry:'',empGender:'',empfeedback:'' });


}

//edit button
const onHandleEdit=(index)=>{
    const allData=empDetails[index]
    setInput({
        empRoll:allData.empRoll,
        empName:allData.empName,
        empAge:allData.empAge,
        empEmail:allData.empEmail,
        empCountry:allData.empCountry,
        empGender:allData.empGender,
        empfeedback:allData.empfeedback
    })
    
    setIsEdit(true);

}
  return (
    <div>
        <h2>Register form</h2>
        <input name='empRoll' placeholder='User Roll'  value={inputDetails.empRoll} onChange={onHandleChange} /> <br/>
        <input name='empName' placeholder='use Name'  value={inputDetails.empName} onChange={onHandleChange} /> <br/>
        <input name='empAge' value={inputDetails.empAge} onChange={onHandleChange} placeholder='user Age' /><br/>
        <input name='empEmail' value={inputDetails.empEmail} onChange={onHandleChange} placeholder='user Email' /><br/>
        <label>Country</label><select name="empCountry" onChange={onHandleChange}>
            <option value="">Select</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="Uk">Uk</option>
            <option value="Europe">Eroupe</option>
            <option value="Canada">Canada</option>
        </select> <br/>
         <br/>
        <label >Gender</label>
        Male<input type="radio" name="empGender" value="Male" checked={inputDetails.empGender === "Male"} onChange={onHandleChange} />
        FeMale<input type="radio" name="empGender" value="FeMale" checked={inputDetails.empGender === "FeMale"}  onChange={onHandleChange} /> 
        <br />
        <br />
           <label>Feedback</label> <br/>
            <textarea name='empfeedback' placeholder='feedback'  value={inputDetails.empfeedback} onChange={onHandleChange}>

            </textarea> <br/><br/>
        <button id='submit' onClick={()=>onHandleSubmit()} >{isEdit ? 'Update' : 'Submit'}</button> <br />
        <br />
        <br />
        <br />
    <div className='container'>
    <table style={{border: '2px solid black'}}>
        <thead>
          <tr>
          <th colSpan={8}>User Details</th>
          </tr>
          <tr>
            <th>Roll</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Country</th>
            <th>Gender</th>
            <th>feedback</th>
            <th>Action</th>
          </tr>

        </thead>
        <tbody>
        { empDetails.length>0?(empDetails.map((value,index)=>
 
            <tr key={index}>
                <td>{value?.empRoll}</td>
                <td>{value?.empName}</td>
                <td>{value?.empAge}</td>
                <td>{value?.empEmail} </td>
                <td>{value?.empCountry} </td>
                <td>{value?.empGender} </td>
                <td>{value?.empfeedback} </td>
               <td><button onClick={()=>onHandleEdit(index)} id='edit' >EDIT</button> 
                <button onClick={()=>onHandleDelte(index)} id='delete'>DELETE</button>
                </td> 
              </tr>
        
            )):(
            
            <tr>
                
                <td colSpan={8}>NO USERS IN THE TABLE </td>
            </tr>)}
            </tbody> 
    </table>
    </div>
    </div>
        
  )
}


//css code
// *{
//     margin: 10px;
//     padding: 1px;
// }
// table, td, th {
//     border: 1px solid;
//     padding: 7px;

//   }
  
//   table {
  
//     border-collapse: collapse;
//   }
//   th,td{
//     text-align: center;
//   }

//   button{
//     padding: 8px;
//   }
//   #edit{
//     background-color: rgb(2, 87, 216);
//     cursor: pointer;
//     border: none;
//     border-radius: 5px;
//   }

//   #delete{
//     background-color:rgb(243, 51, 51);
//     cursor: pointer;
//     border: none;
//     border-radius: 5px;
//   }
//   .container{
// position: absolute;
// right:40px ;
// top: 45px;
// }
// #submit{
//   background-color: rgba(0, 26, 255, 0.904);
//   outline: none;
//   border: none;
//   cursor: pointer;
//   border-radius: 6px;
//   width: 80px;
//   color: white;
// }