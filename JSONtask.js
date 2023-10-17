import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button, Modal } from "antd";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import "./App.css";

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
  //enable and diable button
  const [val, setVal] = useState();

  const [button, setButton] = useState(0);

  const [filter, setFilterto] = useState({
    type: [],

    categ: [],

    pri: "",

    rate: "",
  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  //store index
  const [emptydel, setempty] = useState(0);
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
      id: "",
      title: "",
      brand: "",
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
  const onHandleDelte = (index) => {
    setProduct((prev) => {
      const preData = [...prev];
      preData.splice(index, 1);
      return preData;
    });
    setShowDetails({
      title: "",
      brand: "",
      description: "",
      price: "",
      rating: "",
      stock: "",
      category: "",
    });
  };
  const generateprice = () => {
    const maxID = myProduct.reduce(
      (max, user) => (user.price > max ? user.price : max),
      
    );

    return maxID;
  };

  const generateUniqueID = () => {
    const maxID = myProduct.reduce(
      (max, user) => (user.id > max ? user.id : max),
      
    );

    return maxID + 1;
  };

  const onHandleSubmit = () => {
    const newId = generateUniqueID();

    // Create a new product object with the calculated ID and other details
    myProduct.unshift({
      id: newId,
      title: showDetails.title,
      brand: showDetails.brand,
      price: showDetails.price,
      description: showDetails.description,
      rating: showDetails.rating,
      stock: showDetails.stock,
      category: showDetails.category,
    });
    // Add the new product to the myProduct array
    // setProduct([newProduct,...myProduct]);

    // Clear the input fields
    setShowDetails({
      title: "",
      brand: "",
      description: "",
      price: "",
      rating: "",
      stock: "",
      category: "",
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
        category: resiveObj.category,
      });
    }

    setVal(resiveObj.id);
    setUpdateRowIndex(index); // Set the index of the product to be updated
  };

  // handleEditOk

  const handleEditOk = (id) => {
    const index = myProduct.findIndex((item) => item?.id === id);
    if (index > -1) {
      myProduct[index] = {
        ...myProduct[index],
        title: showDetails.title,
        brand: showDetails?.brand,
        description: showDetails?.description,
        category: showDetails?.category,
        price: showDetails?.price,
        rating: showDetails?.rating,
        stock: showDetails.stock,
        images: showDetails?.images,
      };

      setProduct([...myProduct]);
      console.log(myProduct);
    }
  };

  const [myRating, setRating] = useState();

  var filteredItem = [];
  for (var i = 0; i < filter?.type?.length; i++) {
    const dummy = myProduct.filter((item) => item?.brand === filter?.type[i]);
    filteredItem.push(...dummy);
  }

  const filteredItems = filteredItem?.length === 0 ? myProduct : filteredItem;

  var filteredItem1 = [];
  for (var i = 0; i < filter?.categ?.length; i++) {
    const dummy = filteredItems.filter(
      (item) => item?.category === filter?.categ[i]
    );
    filteredItem1.push(...dummy);
  }
  const filteredItems1 =
    filteredItem1?.length === 0 ? filteredItems : filteredItem1;

  const filteredItems2 = filter?.pri
    ? filteredItems1.filter((item) => item?.price <= filter?.pri)
    : filteredItems1;
console.log(filter.rate,"$");
  const filteredItems3 = filter?.rate
    ? filteredItems2.filter((item) => item?.rating <= filter?.rate)
    : filteredItems2;
  

  const categories = Array.from(
    new Set(myProduct.map((item) => item?.category)).values()
  );
  const BRAND = Array.from(
    new Set(myProduct.map((item) => item?.brand)).values()
  );
  const max = myProduct.reduce((max, item) => (item?.price > max ? item?.price : max), 0);

  return (
    <div style={{ display: "flex" }}>
      <div className="con1">
        <Button
          type="primary"
          onClick={() => {
            showModal();
            setShowDetails({
              title: "",
              brand: "",
              description: "",
              category: "",
              price: "",
              rating: "",
              stock: "",
            });
          }}
        >
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
              onClick={
                button === 0
                  ? () => {
                      onHandleSubmit();
                      handleOk();
                    }
                  : () => {
                      setButton(0);
                      handleEditOk(val);
                      handleOk();
                    }
              }
              disabled={
                !showDetails.title ||
                !showDetails.brand ||
                !showDetails.description ||
                !showDetails.category ||
                !showDetails.price ||
                !showDetails.rating ||
                !showDetails.stock
              }
            >
              {button === 0 ? "ADD" : "UPDATE"}{" "}
            </Button>,
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
            style={{ height: "30px", width: "360px", marginBottom: "6px" }}
            name="description"
            placeholder="description"
            value={showDetails.description}
            onChange={onHandleChange}
          />

          <br />
          <input
            name="brand"
            placeholder="brand"
            style={{ height: "30px", width: "360px", marginBottom: "6px" }}
            value={showDetails.brand}
            onChange={onHandleChange}
          />
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
          <input
            name="category"
            style={{ height: "30px", width: "360px", marginBottom: "6px" }}
            value={showDetails.category}
            onChange={onHandleChange}
            placeholder="category"
          />
          <br />
        </Modal>

        <Autocomplete
          multiple
          id="disabled-options-demo"
          options={categories}
          value={filter.categ}
          onChange={(event, newValue) => {
            setFilterto({ ...filter, categ: newValue });
          }}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="CATEGORY" />}
        />
        <br />
        <Autocomplete
          multiple
          id="disabled-options-demo"
          options={BRAND}
          value={filter.type}
          getOptionLabel={(option) => option}
          onChange={(event, newValue) => {
            setFilterto({ ...filter, type: newValue });
          }}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="BRAND" />}
        />
        <br />
        <br />
        <div>
          <h3>RATE</h3>
          <Rating
            name="simple-controlled"
            value={filter.rate}
            onChange={(event, newValue) => {
              setFilterto({ ...filter, rate:newValue });
            }}
          />

        </div>
        <div>

<h3>Select price:{filter.pri && filter.pri + ' and below'}</h3>0<input type='range' min='0' max={max}

onChange={(e) => setFilterto({...filter,pri:e.target.value})} value={filter.pri} />{max}</div>
    
        <button onClick={() => { setFilterto({type:[],categ:[],pri:'',rate:''});   }}>Clear</button>

      </div>
  

      <div className="con2">
        <h3 style={{ float: "right" }}>
          TOTAL Number of Rows {filteredItems3.length}
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
              {myProduct.length > 0 ? (
                filteredItems3.map((row, index) => (
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
                        onOk={() => {
                          deletehandleOk();
                          onHandleDelte(emptydel);
                        }}
                        onCancel={deletehandleCancel}
                      >
                        ARE YOU CONFIRM TO DELETE
                      </Modal>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button
                        type="primary"
                        onClick={() => {
                          showModal();
                          showModal1(row, index);
                          setButton(1);
                        }}
                      >
                        UPDATE
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableCell align="center">
                  NO DATA in the table
                </StyledTableCell>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
