// import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Button, Modal } from 'antd';
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.title,
});



export default function JSONtask() {

  const [isOKEnabled, setIsOKEnabled] = useState(false);

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
  
    //store index
const [emptydel,setempty]=useState(0)
    //delete button
    const [isdelete, setIsdelete] = useState(false);
    const deleteModal = (index) => {
      setempty(index);
      setIsdelete(true);
    };
    const deletehandleOk = () => {
      setIsdelete(false);
    };
    const deletehandleCancel = () => {
      setIsdelete(false);
    };


  const [showDetails, setShowDetails] = useState([
    {
      id:'',
      title: "",
      description: "",
      price: "",
      rating: "",
      stock: "",
      image: "",
    },
  ]);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setShowDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    const { title, description, price, rating, stock } = showDetails;
    const isRequiredFieldsFilled = title && description && price && rating && stock;
    setIsOKEnabled(isRequiredFieldsFilled);
  };

  const [myProduct, setProduct] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        const pushData = [];
        for (let i = 0; i < 20; i++) {
          pushData.push({
            id: data.products[i].id,
            title: data.products[i].title,
            description: data.products[i].description,
            category: data.products[i].category,
            price: data.products[i].price,
            rating: data.products[i].rating,
            stock: data.products[i].stock,
            image: data.products[i].images[0],
          });
        }
        setProduct([...myProduct, ...pushData]);
      });
  }, []);


  
//delete button
const onHandleDelte=(index)=>{
  setProduct((prev)=>{
      const preData=[...prev]
      preData.splice(index,1)
      return preData

  })
  setShowDetails({
    title: "",
    description: "",
    price: "",
    rating: "",
    stock: "",
  });  
  
  }


  const generateUniqueID = () => {
    const maxID = myProduct.reduce((max, user) => 
    (user.id > max ? user.id : max), 0 )
   
    return maxID + 1;
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
    // const newId = myProduct.length + 1;

    const newId = generateUniqueID();




    // Create a new product object with the calculated ID and other details
   myProduct.unshift({
      id: newId,
      title: showDetails.title,
      description: showDetails.description,
      price: showDetails.price,
      rating: showDetails.rating,
      stock: showDetails.stock,
      image: "", // You can set the image as needed
    }
    )
    // Add the new product to the myProduct array
    // setProduct([newProduct,...myProduct]);

    // Clear the input fields
    setShowDetails({
      title: "",
      description: "",
      price: "",
      rating: "",
      stock: "",
      image: "",
    });

    setIsModalOpen(false); // Close the modal
  };

  //edit button
  const showModal1 = (resiveObj) => {
    setIsModalOpen(true);
    if (resiveObj) {
      setShowDetails({
        title: resiveObj.title,
        description: resiveObj.description,
        price: resiveObj.price,
        rating:resiveObj.rating,
        stock: resiveObj.stock,
      });
    }
    setIsModalOpen(true);
  };


  const categories = [
    'All', 'smartphones', 'laptops', 'fragrances', 'skincare'
  ];

  
  return (
    
    <div>
      
      <Button
        type="primary"
        onClick={() => {
          showModal();
          setShowDetails({
            title: "",
            description: "",
            category: "",
            price: "",
            rating: "",
            stock: "",
          });
          setIsOKEnabled(false); // Disable "OK" button initially


        }}
      >
        ADD Product{" "}
      </Button>
     
      <Autocomplete
        id="filter-demo"
        options={categories}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Filter by Category" />}
        value={showDetails.category}
        onChange={(_, newValue) => {
          setShowDetails((prev) => ({
            ...prev,
            category: newValue,
          }));
        }}
      />
      <Modal
        open={isModalOpen}
        onOk={() => {
          handleOk();
          onHandleSubmit();
        }}
        onCancel={handleCancel}
        okButtonProps={{ disabled: !isOKEnabled }} // Disable "OK" button if isOKEnabled is false
      >
        <input
          name="title"
          placeholder="title"
          style={{ height: "30px", width: "360px", marginBottom: "6px" }}
          value={showDetails.title}
          onChange={onHandleChange}
        />{" "}
        <br />
        <input
          style={{ height: "30px", width: "360px", marginBottom: "6px" }}
          name="description"
          placeholder="description"
          value={showDetails.description}
          onChange={onHandleChange}
        />{" "}
       
        <br />
        <input
          name="price"
          style={{ height: "30px", width: "360px", marginBottom: "6px" }}
          value={showDetails.price}
          onChange={onHandleChange}
          placeholder="price"
        />
        <br />
        <input
          name="rating"
          style={{ height: "30px", width: "360px", marginBottom: "6px" }}
          value={showDetails.rating}
          onChange={onHandleChange}
          placeholder="rating"
        />
        <br />
        <input
          name="stock"
          style={{ height: "30px", width: "360px", marginBottom: "6px" }}
          value={showDetails.stock}
          onChange={onHandleChange}
          placeholder="stock"
        />
        <br />
      </Modal>
      <h3 style={{ float: "right" }}>
        TOTAL Number of Rows {myProduct.length}
      </h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>TITLE</StyledTableCell>
              <StyledTableCell>PRICE</StyledTableCell>
              <StyledTableCell>RATING</StyledTableCell>
              <StyledTableCell>STAOCK</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>IMAGE</StyledTableCell>
              <StyledTableCell>DELETE</StyledTableCell>
              <StyledTableCell>UPDATE</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           {myProduct.length>0?myProduct.map((row,index) => (
                <StyledTableRow key={row.index}>
                <StyledTableCell>{row?.id}</StyledTableCell>
                <StyledTableCell>{row?.title}</StyledTableCell>
                <StyledTableCell>{row?.price}</StyledTableCell>
                <StyledTableCell>{row?.rating}</StyledTableCell>
                <StyledTableCell>{row?.stock}</StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>
                  <img style={{ width: "90px" }} alt="hi" src={row.image} />
                </StyledTableCell>
                <StyledTableCell>
                <Button type="primary" onClick={() => deleteModal(index)}>
  DELETE
</Button>


      <Modal
     
        style={{
          top: 50,
        }}
        open={isdelete}
        onOk={() => {deletehandleOk();onHandleDelte(emptydel)}}
        onCancel={deletehandleCancel}>

        ARE YOU CONFIRM TO DELETE</Modal>
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    type="primary"
                    onClick={() => {
                      showModal1(row);
                      setIsOKEnabled(true);
                    }}
                  >
                    UPDATE
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            )):(<StyledTableCell align="center">NO DATA in the table</StyledTableCell>)}
          </TableBody>
        </Table>
      </TableContainer>
      
    </div>
  );
}