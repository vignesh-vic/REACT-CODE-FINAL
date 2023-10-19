import Rating from "@mui/material/Rating";
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


  //store id in the state to find id to replace to update values
  const [passingId, setPassingId] = useState();

  //When button is 0, it indicates that you are in "add" mode. When button is 1, it means you are in "update" mode.
  const [changeButtonMode, setchangeButtonMode] = useState(0);

  const [manageFilter, setManageFilter] = useState({
    brandType: [],
    categoryType: [],
    filterPrice: "",
    rate: "",
  });

  // const [loading, setLoading] = useState(false);
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


  const generateUniqueID = () => {
    const maxID = myProduct.reduce(
      (max, user) => (user.id > max ? user.id : max),0
      
    );

    return maxID + 1;
  };

  //add user
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

  };

  
  const showModal1 = (resiveObj, index) => {
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

    setPassingId(resiveObj.id);
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
    }
  };


  //brand multiple filtering 
  var brandFilteredItem = [];
  for (var i = 0; i < manageFilter?.brandType?.length; i++) {
    const brandFilter = myProduct.filter((item) => item?.brand === manageFilter?.brandType[i]);
    brandFilteredItem.push(...brandFilter);
  }


//if i select multiple brand means it will show only filter data otherwise default data
  const brandFilteredItems = brandFilteredItem?.length === 0 ? myProduct : brandFilteredItem;


//category multiple filtering 
  var categoryFilterItem = [];
  for (var j = 0; j < manageFilter?.categoryType?.length; j++) {
    const categoryFilter = brandFilteredItems.filter((item) => item?.category === manageFilter?.categoryType[j] );
    categoryFilterItem.push(...categoryFilter);
  }

//if i select multiple category means it will show only filter data otherwise default data
  const categoryFilteredItems = categoryFilterItem?.length === 0 ? brandFilteredItems : categoryFilterItem;

//price filtering
  const priceFilteredItems = manageFilter?.filterPrice? categoryFilteredItems.filter((item) => item?.price <= manageFilter?.filterPrice): categoryFilteredItems;

  const filteredItems3 = manageFilter?.rate? priceFilteredItems.filter((item) => item?.rating <= manageFilter?.rate) : priceFilteredItems;
  
  //list of categories for show in autocomplete in array format
  const categories = Array.from(
    new Set(myProduct.map((item) => item?.category)).values()
  );

  //list of brands for show in autocomplete in array format
  const BRAND = Array.from(
    new Set(myProduct.map((item) => item?.brand)).values()
  );


/* The above code is finding the maximum price from an array of products. */
  const max = myProduct.reduce((max, item) =>  (item?.price > max ? item?.price : max), 0);

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
              onClick={
                changeButtonMode === 0
                  ? () => {
                      onHandleSubmit();
                      handleOk();
                    }
                  : () => {
                    setchangeButtonMode(0);
                      handleEditOk(passingId);
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
              {changeButtonMode === 0 ? "ADD" : "UPDATE"}
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

          <br/>
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
          value={manageFilter.categoryType}
          onChange={(event, newValue) => {
            setManageFilter({ ...manageFilter, categoryType: newValue });
          }}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="CATEGORY" />}
        />
        <br/>
        <Autocomplete
          multiple
          id="disabled-options-demo"
          options={BRAND}
          value={manageFilter.brandType}
          getOptionLabel={(option) => option}
          onChange={(event, newValue) => {
            setManageFilter({ ...manageFilter, brandType: newValue });
          }}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="BRAND" />}
        />
        <br/>
        <br/>
        <div>
          <h3>RATE</h3>
          <Rating
            name="simple-controlled"
            value={manageFilter.rate}
            onChange={(event, newValue) => {
              setManageFilter({ ...manageFilter, rate:newValue });
            }}
          />

        </div>
        <div>

<h3>Select price:{manageFilter.filterPrice && manageFilter.filterPrice + ' and below'}</h3>0<input type='range' min='0' max={max}
onChange={(e) => setManageFilter({...manageFilter,filterPrice:e.target.value})} value={manageFilter.filterPrice} />{max}</div>
<button onClick={() => { setManageFilter({brandType:[],categoryType:[],filterPrice:'',rate:''});   }}>Clear</button>
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
                          setchangeButtonMode(1);
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
