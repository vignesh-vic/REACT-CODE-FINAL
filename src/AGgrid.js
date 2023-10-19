import React, { useState ,useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

export default function AGgrid() {
    const  [myDetails,setMyDetails]=useState([])

const [columDefination,setColumDefination]=useState([
    {field:'id',checkboxSelection:true },
    {field:'title'},
    {field:'brand'},
    {field:'description'},
    {field:'category'},
    {field:'price'},
    {field:'rating'},
    {field:'stock'},
   
      {
        field: 'image',
        cellRenderer: ({data}) => {
                return <img src={data.image} style={{height: '100px', width: '100px'}} />;
        }
    }
])


useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
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
        setMyDetails([...pushData]);
      });
  }, []);



const defaultCol={
    sortable:true,editable:true,filter:true,resizable:true,flex:1,floatingFilter:true
}

  return (
    <div className="ag-theme-alpine" style={{width:1750, height: 900}}>

      <AgGridReact rowData={myDetails} columnDefs={columDefination} defaultColDef={defaultCol}       // Set onGridReady prop

 />
    </div>
  )
}
