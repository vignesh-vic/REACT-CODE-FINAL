// import * as React from 'react';
import { Button, Modal } from 'antd';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React,{useEffect, useState} from 'react'
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
  

export default function JSONtask() {

const [showDetails,setShowDetails]=useState([{
    id:'',
    title:'',
    description:'',
    category:'',
    price:'',
    rating:'',
    stock:'',
    image:'',

}]) 

const onHandleChange=(e)=>{
    const {name,value}=e.target;
    setShowDetails((prev)=>({
        ...prev,
        [name]:value
  
    }))
  }

const [myProduct,setProduct]=useState([]);

useEffect(()=>{
        fetch('https://dummyjson.com/products')
.then(res => res.json())
.then((data)=>{
    // console.log(data);
    // let len=data.products.length 
    const mm=[]; 
    for(let i=0; i<20; i++){
        mm.push({
            id:data.products[i].id,
            title:data.products[i].title,
            description:data.products[i].description,
            category:data.products[i].category,
            price:data.products[i].price,   
            rating:data.products[i].rating,   
            stock:data.products[i].stock,   
            image:data.products[i].images[0],   
        })
    }    setProduct([...myProduct,...mm]) 
});

    },[])

    // console.log("my",myProduct);

//input model
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

    //delete button
    const [isdelete, setIsdelete] = useState(false);
    const deleteModal = () => {
      setIsdelete(true);
    };
    const deletehandleOk = () => {
      setIsdelete(false);
    };
    const deletehandleCancel = () => {
      setIsdelete(false);
    };
    
    const onHandleSubmit = () => {
      // Check if required fields are not empty
      // if (
      //   !showDetails.title ||
      //   !showDetails.description ||
      //   !showDetails.category ||
      //   !showDetails.price ||
      //   !showDetails.rating ||
      //   !showDetails.stock
      // ) {
      //   return;
      // }
    
      // Calculate the new ID based on the length of myProduct array
      const newId = myProduct.length + 1;
    
      // Create a new product object with the calculated ID and other details
      const newProduct = {
        id: newId,
        title: showDetails.title,
        description: showDetails.description,
        category: showDetails.category,
        price: showDetails.price,
        rating: showDetails.rating,
        stock: showDetails.stock,
        image: '', // You can set the image as needed
      };
    
      // Add the new product to the myProduct array
      setProduct([...myProduct, newProduct]);
    
      // Clear the input fields
      setShowDetails({
        title: '',
        description: '',
        category: '',
        price: '',
        rating: '',
        stock: '',
        image: '',
      });
    
      setIsModalOpen(false); // Close the modal
    };
    
  


   //edit button
   const showModal1 = (r) => {
    setIsModalOpen(true);
    if (r) {
      setShowDetails({
        title: r.title,
        description: r.description,
        category: r.category,
        price: r.price,
        rating: r.rating,
        stock: r.stock
      });
    }
  };

  const handleDelete = (id) => {
    const updatedProduct = myProduct.filter((product) => product.id !== id);
    setProduct(updatedProduct);
    setIsdelete(false); //  delete confirmation modal
  };
  
  return (
    <div>
        
      <Button  type="primary" onClick={()=>{showModal(); setShowDetails({title:'',description:'',category:'',price:'',rating:'',stock:''}) }}>
ADD Product </Button> 
      <Modal open={isModalOpen} onOk={()=>{handleOk();onHandleSubmit()}} onCancel={handleCancel}>
      <input  name='title' placeholder='title'  style={{height:'30px',width:'360px',marginBottom:'6px'}} value={showDetails.title} onChange ={onHandleChange} /> <br/>
        <input style={{height:'30px',width:'360px',marginBottom:'6px'}} name='description' placeholder='description'  value={showDetails.description} onChange ={onHandleChange} /> <br/>
        <label>category</label><select name="category" onChange={onHandleChange}>
            <option value="">Select</option>
            <option value="smartphones">smartphones</option>
            <option value="fragrances	">fragrances	</option>
            <option value="skincare">skincare</option>
            <option value="laptops	">laptops	</option>
          
        </select><br/><br/>
        {/* <input name='category' style={{height:'30px',width:'360px',marginBottom:'6px'}} value={showDetails.category} onChange ={onHandleChange} placeholder='category' /><br/> */}
        <input name='price' style={{height:'30px',width:'360px',marginBottom:'6px'}} value={showDetails.price} onChange ={onHandleChange} placeholder='price' /><br/>
        <input name='rating' style={{height:'30px',width:'360px',marginBottom:'6px'}} value={showDetails.rating} onChange ={onHandleChange} placeholder='rating' /><br/>
        <input name='stock' style={{height:'30px',width:'360px',marginBottom:'6px'}} value={showDetails.stock} onChange ={onHandleChange} placeholder='stock' /><br/>
      </Modal>
      <h3 style={{float:'right'}}>TOTAL Number of Rows {myProduct.length}</h3>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>id</StyledTableCell>
            <StyledTableCell >title</StyledTableCell>
            <StyledTableCell >description</StyledTableCell>
            <StyledTableCell >category</StyledTableCell>
            <StyledTableCell >price</StyledTableCell>
            <StyledTableCell >rating</StyledTableCell>
            <StyledTableCell >stack</StyledTableCell>
            <StyledTableCell ></StyledTableCell>
            <StyledTableCell ></StyledTableCell>
            <StyledTableCell >image</StyledTableCell>
            <StyledTableCell >Delete</StyledTableCell>
            <StyledTableCell >Upadte</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myProduct.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell >{row.id}</StyledTableCell>
              <StyledTableCell >{row.title}</StyledTableCell>
              <StyledTableCell >{row.description}</StyledTableCell>
              <StyledTableCell >{row.category}</StyledTableCell>
              <StyledTableCell >{row.price}</StyledTableCell>
              <StyledTableCell >{row.rating}</StyledTableCell>
              <StyledTableCell >{row.stock}</StyledTableCell>
              <StyledTableCell ></StyledTableCell>
              <StyledTableCell ></StyledTableCell>
              
              <StyledTableCell><img style={{width:'90px'}} alt='hi' src={row.image}/></StyledTableCell>
              <StyledTableCell><Button style={{backgroundColor:'red'}} type="primary" onClick={() =>{ deleteModal();handleDelete(row.id)}}>
        Delete
      </Button>
      <Modal
     
     style={{
       top: 20,
     }}
     open={isdelete}
     onOk={() => { deletehandleOk() }}
     onCancel={deletehandleCancel}>

     <p>ARE YOU CONFIRM TO DELETE</p></Modal>
      {/* <Modal
        style={{
          top: 20,
        }}
        open={modal1Open}
        onOk={() => {setModal1Open(false)}}
        onCancel={() => setModal1Open(false)}
      >
       <h4>are you want to remove in this field</h4>
      </Modal> */} </StyledTableCell>
      <StyledTableCell>
  <Button
    type="primary"
    onClick={() => {
     
      showModal1(row);
     
    }}
  >
    UPDATE
  </Button>
</StyledTableCell>            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}
// Certainly! The code you provided is used to delete a specific row with a given ID from the `myProduct` state. Here's a breakdown of how it works:

// 1. `myProduct` is an array that contains your product data, and each object in this array represents a product with an `id` property.

// 2. The `filter` function is used to create a new array, `updatedProduct`, that includes all the elements from `myProduct` except for the one with the specified `id`.

//    - `myProduct.filter((product) => product.id !== id)` iterates through each element (product) in the `myProduct` array and checks if the `id` of the product is not equal to the `id` you want to delete.

//    - When the `id` of a product does not match the specified `id`, it is included in the `updatedProduct` array.

//    - When the `id` of a product matches the specified `id`, it is excluded from the `updatedProduct` array.

// 3. Finally, the `setProduct(updatedProduct)` statement updates the `myProduct` state with the filtered array, effectively removing the product with the specified `id`.

// In summary, this code filters out the product with the given `id` from the `myProduct` array and updates the state to reflect the modified array, effectively deleting the specified row from your product list.