import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import { Button, Modal } from 'antd';



export default function CustomizedTables() {
  

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  

      
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
  
  
  
  //initial table values  shows in table
  
  const initialData=[
  { empRoll:1,
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
    
    
  
  }



  //add and UPDATE POP UP
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };



  //store index
const [emptydel,setempty]=useState(0)


  //delete state
  const [isdelete, setIsdelete] = useState(false);
  const deleteModal = (i) => {
    setempty(i);
    setIsdelete(true);
  };
  const deletehandleOk = () => {
    setIsdelete(false);
  };
  const deletehandleCancel = () => {
    setIsdelete(false);
  };
  


  return (
    
    <div>
      
       <Button type="primary" onClick={()=>{showModal();setInput({ empRoll: '', empName: '', empAge: '', empEmail: '',empCountry:'',empGender:'',empfeedback:'' })}}>
       ADD USER
        </Button>
      <Modal title="" open={isModalOpen} onOk={()=>{handleOk();onHandleSubmit()}} onCancel={handleCancel}>
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
      </Modal>

    
        <br />
        <br />
        <br />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>empRoll</StyledTableCell>
            <StyledTableCell >empName</StyledTableCell>
            <StyledTableCell >empAge</StyledTableCell>
            <StyledTableCell >empEmail</StyledTableCell>
            <StyledTableCell >empCountry</StyledTableCell>
            <StyledTableCell >empGender</StyledTableCell>
            <StyledTableCell >Feedback</StyledTableCell>
            <StyledTableCell >Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {empDetails.length>0?empDetails.map((value,index) => (
            <StyledTableRow key={value.name}>
              <StyledTableCell component="th" scope="row">
                {value.empRoll}
              </StyledTableCell>
              <StyledTableCell >{value?.empName}</StyledTableCell>
              <StyledTableCell >{value?.empAge}</StyledTableCell>
              <StyledTableCell >{value?.empEmail}</StyledTableCell>
              <StyledTableCell >{value?.empCountry}</StyledTableCell>
              <StyledTableCell >{value?.empGender}</StyledTableCell>
              <StyledTableCell >{value?.empfeedback}</StyledTableCell>
              <StyledTableCell >
              
              <Button type="primary" onClick={()=>{showModal();onHandleEdit(index)}}>
                UPDATE
        </Button>
        <Button type="primary" onClick={() => deleteModal(index)}>
  DELETE
</Button>


      <Modal
     
        style={{
          top: 20,
        }}
        open={isdelete}
        onOk={() => { deletehandleOk(); onHandleDelte(emptydel); }}
        onCancel={deletehandleCancel}>

        <p>ARE YOU CONFIRM TO DELETE</p></Modal></StyledTableCell> 
            
            </StyledTableRow>
          )):( <StyledTableCell align="center">NO DATA in the table</StyledTableCell>)}
        </TableBody>
      </Table>
    </TableContainer>
    
     
    </div>
  );
}