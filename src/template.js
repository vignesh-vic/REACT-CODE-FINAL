[Yesterday 4:00 PM] Vimal Ramakrishnan

import React, { useState, useEffect } from 'react';

import { Button, Modal } from 'antd';

import { styled } from '@mui/material/styles';

import Table from '@mui/material/Table';

import TableBody from '@mui/material/TableBody';

import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import TableContainer from '@mui/material/TableContainer';

import TableHead from '@mui/material/TableHead';

import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';

import Autocomplete from '@mui/material/Autocomplete';

import TextField from '@mui/material/TextField';

import Rating from '@mui/material/Rating';

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

    '&:last-child td, &:last-child th': {

        border: 0,

    },

}));

 

const DeleteButton = styled(Button)(({ theme }) => ({

    backgroundColor: theme.palette.error.main,

    color: 'white',

    '&:hover': {

        backgroundColor: theme.palette.error.dark,

    },

    marginLeft: '10px',

}));

 

const EditButton = styled(Button)(({ theme }) => ({

    backgroundColor: theme.palette.primary.main,

    color: 'white',

    '&:hover': {

        backgroundColor: theme.palette.primary.dark,

    },

}));

 

function Five() {

    const [open, setOpen] = useState(false);

    const [productList, setProductList] = useState([]);

    const [val, setVal] = useState();

    const[filter,setFilter]=useState({

        type:[],

        categ:[],

        pri:'',

        rate:'',

        button:0,

        loading:false

    })

    const [value, setValue] = useState({

        id: 0,

        brand: '',

        category: '',

        price: '',

        rating: '',

        images: '',

    });

 

    // useEffect for count

    useEffect(() => {

        setValue({ ...value, count: filteredItems3.length });

    });

 

    // useEffect to get data from dummy JSON

    useEffect(() => {

        if (!productList?.length) {

 

            fetch('https://dummyjson.com/products')

                .then((res) => res.json())

                .then((data) => {

                    const { products = [] } = data || {}

                    if (products.length) {

                        const newData = [];

                        for (let i = 0; i < 20; i++) {

                            newData.push({

                                id: products[i]?.id,

                                brand: products[i]?.brand,

                                images: products[i]?.images[0],

                                category: products[i]?.category,

                                price: products[i]?.price,

                                rating: products[i]?.rating,

                            });

                        }

                        setProductList([...newData]);

                    }

                    else {

                        setProductList([]);

                    }

                });

        }

    }, []);

 

    // handleChange

    const handleChange = (e) => {

        const { name, value } = e.target;

        setValue((prev) => ({

            ...prev,

            [name]: value,

        }));

    };

 

    // Generate a unique ID

    const generateID = () => {

        const maxID = productList.reduce((max, item) => (item?.id > max ? item?.id : max), 0);

        return maxID + 1;

    };

 

    // handleSubmit

    const handleSubmit = () => {

        const idVal = generateID();

        productList.unshift({

            id: idVal,

            brand: value?.brand,

            category: value?.category,

            price: value?.price,

            rating: value?.rating,

            images: value?.images,

        });

 

        setValue({

            brand: '',

            category: '',

            price: '',

            rating: '',

            images: '',

        });

    };

 

    // handleEdit

    const handleEdit = (index) => {

        setValue({

            brand: index?.brand,

            category: index?.category,

            price: index?.price,

            rating: index?.rating,

            images: index?.images,

        });

        setVal(index.id);

    };

 

    // handleEditOk

    const handleEditOk = (id) => {

        const index = productList.findIndex((item) => item?.id === id);

        if (index > -1) {

            productList[index] = {

                ...productList[index],

                brand: value?.brand,

                category: value?.category,

                price: value?.price,

                rating: value?.rating,

                images: value?.images,

            };

            setProductList([...productList]);

        }

    };

 

    // handleDelete

    const handleDelete = (iid) => {

        const del = productList.findIndex((item) => item?.id === iid)

        const newArray = [...productList];

        newArray.splice(del, 1);

        setProductList(newArray);

    };

 

    const showModal = () => {

        setValue({

            brand: '',

            category: '',

            price: '',

            rating: '',

            images: '',

        });

        setOpen(true);

    };

 

    const showModaldel = () => {

        setFilter({...filter,loading:true});

 

    };

 

    const handleOkdel = () => {

        setFilter({...filter,loading:false});

    };

 

    const handleCancel1 = () => {

        setFilter({...filter,loading:false});

    };

 

    const handleOk = () => {

        setOpen(false);

    };

 

    const handleCancel = () => {

        setOpen(false);

    };

 

    let filteredItem = [];

    for (let i = 0; i < filter?.type?.length; i++) {

        const dummy = productList.filter((item) => item?.brand === filter?.type[i]);

 

        filteredItem.push(...dummy);

    }

    const filteredItems = filteredItem?.length === 0 ? productList : filteredItem;

    let filteredItem1 = [];

   

    for (let i = 0; i < filter?.categ?.length; i++) {

        const dummy = filteredItems.filter((item) => item?.category === filter?.categ[i]);

 

        filteredItem1.push(...dummy);

    }

    const filteredItems1 = filteredItem1?.length === 0 ? filteredItems : filteredItem1;

    const filteredItems2 = filter?.pri ? filteredItems1.filter((item) => item?.price <= filter?.pri) : filteredItems1;

    const filteredItems3 = filter?.rate ? filteredItems2.filter((item) => item?.rating <= filter?.rate) : filteredItems2;

    const categories = Array.from(new Set(productList.map(item => item?.category)).values());

    const brands = Array.from(new Set(productList.map(item => item?.brand)).values());

    const max = productList.reduce((max, item) => (item?.price > max ? item?.price : max), 0);

 

    return (

 

        <div>

            <h1 style={{ textAlign: 'center', backgroundColor: 'aqua', margin: '0', padding: '10px', top: '0', width: '100%', position: 'fixed', zIndex: '1' }}>PRODUCTS SHOP</h1>

            <div style={{ display: 'flex', marginTop: '5%' }}>

                <div style={{ width: '20%', position: 'fixed' }}>

                    <div >

                        <div>

                            <Button type="primary" onClick={showModal}>

                                Add Data

                            </Button>  {productList.length === 25 && '25 rows have been added'}</div>

 

                        <div> <h3 >Total number of rows: {value.count}</h3></div>

                    </div>

                    <div >

                        <h3>Select Brand</h3>

                        <Autocomplete

                            multiple

                            value={filter.type}

                            options={brands}

                            onChange={(event, newValue) => {

                                setFilter({...filter,type:newValue});

                            }}

                            renderInput={(params) => (

                                <TextField

                                    {...params}

 

                                    label="Brands"

                                    placeholder="Select brand"

                                />

                            )}

                        />

                    </div>

                    <div >

                        <h3>Select Category</h3>

                        <Autocomplete

                            multiple

                            value={filter.categ}

                            options={categories}

                            onChange={(event, newValue) => {

                                setFilter({...filter,categ:newValue});

                            }}

                            renderInput={(params) => (

                                <TextField

                                    {...params}

 

                                    label="Select Category"

                                    placeholder="Select Category"

                                />

                            )}

                        />

                    </div>

 

                    <div>

                        <h3>Select price:{filter.pri && filter.pri + ' and below'}</h3>0<input type='range' min='0' max={max}

                        onChange={(e) => setFilter({...filter,pri:e.target.value})} value={filter.pri} />{max}</div>

                    <div>

                        <h3>Select Rating:</h3>

                        <Rating

                            name="simple-controlled"

                            value={filter.rate}

                            onChange={(event, newValue) => {

                                setFilter({...filter,rate:newValue});

                            }}

                        />

                    </div>

                    <button onClick={() => { setFilter({type:[],categ:[],pri:'',rate:''});   }}>Clear</button>

                </div>

                <div style={{ width: '80%', paddingLeft: '20%' }}>

                    <Modal

                        open={open}

                        title="Enter the product Details"

                        onOk={handleOk}

                        onCancel={handleCancel}

                        footer={[

                            <Button key="back" onClick={handleCancel}>

                                Cancel

                            </Button>,

                            <Button

                                key="submit"

                                type="primary"

                               

                                onClick={filter.button === 0 ? () => {

                                    handleOk();

                                    handleSubmit();

                                } : () => {

                                    setFilter({...filter,button:0});

                                    handleOk();

                                    handleEditOk(val);

                                }}

                                disabled={!(value.category?.length !== 0 && value.brand?.length !== 0 && value.price?.length !== 0 &&

                                    value.rating?.length !== 0 && value.images?.length !== 0)}

                            >

                                {filter.button === 0 ? 'Add Detail' : 'Save changes'}

                            </Button>

                        ]}

                    >

                        <div>

                            <h3>Choose Category:</h3>

                            <Autocomplete

                                name="category"

                                value={value.category}

                                onChange={(event, newValue) => {

                                    setValue({ ...value, category: newValue });

                                }}

 

                                options={categories}

                                renderInput={(params) => <TextField {...params} label="" />}

                            />

                        </div>

                        <h3>Enter the brand:</h3>

                        <input name="brand" value={value.brand} onChange={handleChange} style={{ width: '100%', height: '50px' }} />

                        <h3>Enter Price:</h3>

                        <input name="price" value={value.price} onChange={handleChange} style={{ width: '100%', height: '50px' }} />

                        <h3>Enter the ratings:</h3>

                        <input name="rating" value={value.rating} onChange={handleChange} style={{ width: '100%', height: '50px' }} />

                        <h3>Enter the image URL:</h3>

                        <input name="images" value={value.images} onChange={handleChange} style={{ width: '100%', height: '50px' }} />

                    </Modal>

                    <TableContainer component={Paper}>

                        <Table sx={{ minWidth: 700 }} aria-label="customized table">

                            <TableHead>

                                <TableRow>

                                    <StyledTableCell>Id</StyledTableCell>

                                    <StyledTableCell align="right">Brand</StyledTableCell>

                                    <StyledTableCell align="right">Category</StyledTableCell>

                                    <StyledTableCell align="right">Price</StyledTableCell>

                                    <StyledTableCell align="right">Rating</StyledTableCell>

                                    <StyledTableCell align="right">Images</StyledTableCell>

                                    <StyledTableCell align="right">Edit</StyledTableCell>

                                    <StyledTableCell align="right">Delete</StyledTableCell>

                                </TableRow>

                            </TableHead>

                            <TableBody>

                                {filteredItems3.map((row, index) => (

                                    <StyledTableRow key={index}>

                                        <StyledTableCell align="right">{row.id}</StyledTableCell>

                                        <StyledTableCell align="right">{row.brand}</StyledTableCell>

                                        <StyledTableCell align="right">{row.category}</StyledTableCell>

                                        <StyledTableCell align="right">{row.price}</StyledTableCell>

                                        <StyledTableCell align="right">{row.rating}</StyledTableCell>

                                        <StyledTableCell component="th" scope="row" align="right">

                                            <img src={row.images} style={{ width: '100px', height: '100px' }} alt="no image" />

                                        </StyledTableCell>

                                        <StyledTableCell align="right">

                                            <EditButton onClick={() => {

                                                showModal();

                                                handleEdit(row);

                                                setFilter({...filter,button:1});

                                            }}>

                                                Edit

                                            </EditButton>

                                        </StyledTableCell>

                                        <StyledTableCell align="right">

                                            <DeleteButton onClick={() => { showModaldel(index); setVal(row.id) }}>

                                                Delete

                                            </DeleteButton>

                                        </StyledTableCell>

                                    </StyledTableRow>

                                ))}

                            </TableBody>

                        </Table>

                    </TableContainer>

                    <Modal

                        title="Are you sure you want to delete this field"

                        open={filter.loading}

                        onOk={() => {

                            handleOkdel();

                            handleDelete(val);

                        }}

                        onCancel={handleCancel1}

                    ></Modal>

                </div>

            </div>

        </div>

    );

}

 

export default Five;

 