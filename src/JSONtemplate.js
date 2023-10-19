import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
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
import './App.css';

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





export default function JSONtask() {

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  // //enable and diable button
  // const [isOKEnabled, setIsOKEnabled] = useState(false);

  //   //input model
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  //   const showModal = () => {
  //     setIsModalOpen(true);
  //   };
  //   const handleOk = () => {
  //     setIsModalOpen(false);
  //   };
  //   const handleCancel = () => {
  //     setIsModalOpen(false);
  //   };
  
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


    //JSON fetch datas
  const [myProduct, setProduct] = useState([]);

  const [updateRowIndex, setUpdateRowIndex] = useState(null);

  const [showDetails, setShowDetails] = useState([
    {
      id:'',
      title: "",
      brand:"",
      description: "",
      price: "",
      rating: "",
      stock: "",
      category: "",
      image: "",
    },
  ]);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setShowDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    const { title,brand, description, price, rating, stock ,category } = showDetails;
    const isRequiredFieldsFilled = title && brand && description && price && rating && stock && category;
    // setIsOKEnabled(isRequiredFieldsFilled);
  };



  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const pushData = [];
        for (let i = 0; i < 20; i++) {
          pushData.push({
            id: data.products[i].id,
            title: data.products[i].title,
            brand: data.products[i].brand,            
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
    brand:"",
    description: "",
    price: "",
    rating: "",
    stock: "",
    category:""
  });  
  
  }


  const generateUniqueID = () => {
    const maxID = myProduct.reduce((max, user) => 
    (user.id > max ? user.id : max), 0 )
   
    return maxID + 1;
  };

  const onHandleSubmit = () => {
    const newId = generateUniqueID();

    // Create a new product object with the calculated ID and other details
   myProduct.unshift({
      id: newId,
      title: showDetails.title,
      brand:showDetails.brand,
      description: showDetails.description,
      price: showDetails.price,
      rating: showDetails.rating,
      stock: showDetails.stock,
      category:showDetails.category,
      image: "", // You can set the image as needed
    }
    )
    // Add the new product to the myProduct array
    // setProduct([newProduct,...myProduct]);

    // Clear the input fields
    setShowDetails({
      title: "",
      brand:'',
      description: "",
      price: "",
      rating: "",
      stock: "",
      category:"",
      image: "",
    });

    // setIsModalOpen(false); // Close the modal
  };

  const showModal1 = (resiveObj, index) => {
    // setIsModalOpen(true);
    if (resiveObj) {
      setShowDetails({
        title: resiveObj.title,
        brand: resiveObj.brand,
        description: resiveObj.description,
        price: resiveObj.price,
        rating: resiveObj.rating,
        stock: resiveObj.stock,
        category:resiveObj.category
      });
    }
    setUpdateRowIndex(index); // Set the index of the product to be updated
  };

  const [myFilter,setFilter]=useState()
  const [myBrand,setBrand]=useState()
  const [myPrice,setPrice]=useState()
 const categories = Array.from(new Set(myProduct.map(item => item.category)).values());
 const BRAND = Array.from(new Set(myProduct.map(item => item.brand)).values());
  // Create a state variable for the selected price range
  const [selectedPriceRange, setSelectedPriceRange] = useState({
    min: 0,
    max: 1749, // You can adjust the min and max values as needed
  });
 const filterData = myProduct.filter((item) => {
  if (!myFilter && !myBrand) {
    return (
      item.price >= selectedPriceRange.min &&
      item.price <= selectedPriceRange.max
    );
  }
  if (myFilter && myBrand) {
    return (
      item.category === myFilter &&
      item.brand === myBrand &&
      item.price >= selectedPriceRange.min &&
      item.price <= selectedPriceRange.max
    );
  }
  if (myFilter) {
    return (
      item.category === myFilter &&
      item.price >= selectedPriceRange.min &&
      item.price <= selectedPriceRange.max
    );
  }
  if (myBrand) {
    return (
      item.brand === myBrand &&
      item.price >= selectedPriceRange.min &&
      item.price <= selectedPriceRange.max
    );
  }
  if (myPrice) {
    return item.price === myPrice;
  }
  return false; // Return false for cases not covered
});

// const categoryFilter=myFilter?myProduct.filter((items)=>items.category===myFilter):myProduct
// const brandFilter=myFilter?myProduct.filter((items)=>items.category===myFilter):categoryFilter
  return (
    
    <div style={{display:'flex'}}>
  
      <div className='con1'>
      <Button type="primary" onClick={showModal}>
        ADD USER
      </Button>
      <Modal
        open={open}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            CANCEL
          </Button>,
        
          <Button
            key="link"
            type="primary"
            loading={loading}
            onClick={onHandleSubmit}
          >
ADD          </Button>,
        ]}
      >
        <input
          name="title"
          placeholder="title"
          style={{ height: "30px", width: "360px", marginBottom: "6px" }}
          value={showDetails.title}
          onChange={onHandleChange}
        />
        <input
          name="brand"
          placeholder="brand"
          style={{ height: "30px", width: "360px", marginBottom: "6px" }}
          value={showDetails.brand}
          onChange={onHandleChange}
        />
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
         {/* <Button
        type="primary"
        onClick={() => {
          showModal();
          setShowDetails({
            title: "",
            brand:"",
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
      </Button><br/><br/> */}
      <Autocomplete
      id="disabled-options-demo"
      options={categories}
      value={myFilter}
      getOptionLabel={(option) =>option}
      onChange={(_,value)=>{
        setFilter(value)
      }}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="CATEGORY" />}
    />
    <br/>
      <Autocomplete
      id="disabled-options-demo"
      options={BRAND}
      value={myBrand}
      getOptionLabel={(option) =>option}
      onChange={(_,value)=>{
        setBrand(value)
      }}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="BRAND" />}
    />

     

 
        
       
     
     
      <input
        type="range"
        min="0"
        max="1749" // You can adjust the min and max values as needed
        step="1"
        value={selectedPriceRange.min}
        onChange={(e) =>
          setSelectedPriceRange({
            ...selectedPriceRange,
            min: parseInt(e.target.value),
          })
        }
      />
      <div>{selectedPriceRange.min} - {selectedPriceRange.max}
</div>
</div>
        <div className='con2'>
        <h3 style={{ float: "right" }}>
        TOTAL Number of Rows {myProduct.length}
      </h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>TITLE</StyledTableCell>
              <StyledTableCell>DESCRIPTION</StyledTableCell>
              <StyledTableCell>BRAND</StyledTableCell>
              <StyledTableCell>PRICE</StyledTableCell>
              <StyledTableCell>RATING</StyledTableCell>
              <StyledTableCell>STAOCK</StyledTableCell>
              <StyledTableCell>CATEGORY</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>IMAGE</StyledTableCell>
              <StyledTableCell>DELETE</StyledTableCell>
              <StyledTableCell>UPDATE</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           {myProduct.length>0?filterData.map((row,index) => (
                <StyledTableRow key={row.index}>
                <StyledTableCell>{row?.id}</StyledTableCell>
                <StyledTableCell>{row?.title}</StyledTableCell>
                <StyledTableCell>{row?.description}</StyledTableCell>
                <StyledTableCell>{row?.brand}</StyledTableCell>
                <StyledTableCell>{row?.price}</StyledTableCell>
                <StyledTableCell>{row?.rating}</StyledTableCell>
                <StyledTableCell>{row?.stock}</StyledTableCell>
                <StyledTableCell>{row?.category}</StyledTableCell>
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
    onClick={() => showModal1(row, index)}
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
    </div>
  );
}