// import React, { useState } from 'react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
// import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";

import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

export default function About() {
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
  // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
  const top100Films = [
    { title: "Reservoir Dogs", year: 1992 },
    { title: "Braveheart", year: 1995 },
    { title: "M", year: 1931 },
    { title: "Requiem for a Dream", year: 2000 },
    { title: "Amélie", year: 2001 },
    { title: "A Clockwork Orange", year: 1971 },
    { title: "Like Stars on Earth", year: 2007 },
    { title: "Taxi Driver", year: 1976 },
    { title: "Lawrence of Arabia", year: 1962 },
    { title: "Double Indemnity", year: 1944 },
    {
      title: "Eternal Sunshine of the Spotless Mind",
      year: 2004,
    },
    { title: "Amadeus", year: 1984 },
    { title: "To Kill a Mockingbird", year: 1962 },
    { title: "Toy Story 3", year: 2010 },
    { title: "Logan", year: 2017 },
    { title: "Full Metal Jacket", year: 1987 },
    { title: "Dangal", year: 2016 },
    { title: "The Sting", year: 1973 },
    { title: "2001: A Space Odyssey", year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: "Toy Story", year: 1995 },
    { title: "Bicycle Thieves", year: 1948 },
    { title: "The Kid", year: 1921 },
    { title: "Inglourious Basterds", year: 2009 },
    { title: "Snatch", year: 2000 },
    { title: "3 Idiots", year: 2009 },
    { title: "Monty Python and the Holy Grail", year: 1975 },
  ];

  const [myDetails, setMyDetails] = useState([]);

  const [columDefination, setColumDefination] = useState([
    { field: "id", checkboxSelection: true },
    { field: "title" },
    { field: "brand" },
    { field: "description" },
    { field: "category" },
    { field: "price" },
    { field: "rating" },
    { field: "stock" },

    
  ]);

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

  const defaultCol = {
    sortable: true,
    editable: true,
    filter: true,
    resizable: true,
    flex: 1,
    floatingFilter: true,
  };

  return (
    <>
      <div className=" flex  ">
        <div className=" flex-col w-[20%] p-4 ">
          <div className="pb-5">
            <button
              className="border-2 text-white border-gray-600 w-24 h-10 rounded-md bg-blue-600"
              onClick={showModal}
            >
              Add Interns
            </button>
            <Modal
              open={open}
              title="Title"
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>,
                <Button key="submit" loading={loading} onClick={handleOk}>
                  ADD
                </Button>,
              ]}
            >
              <input
                className="border-2 p-4 border-gray-600 w-24 h-10 rounded-md"
                name="id"
                placeholder="id"
                style={{ height: "30px", width: "360px", marginBottom: "6px" }}
              />

              <input
                className="border-2 border-gray-600 w-24 h-10 rounded-md p-4"
                style={{ height: "30px", width: "360px", marginBottom: "6px" }}
                name="Name"
                placeholder="Name"
              />
              <input
                className="border-2 border-gray-600 w-24 h-10 rounded-md p-4"
                style={{ height: "30px", width: "360px", marginBottom: "6px" }}
                name="eamil"
                placeholder="email"
              />
            </Modal>
          </div>
          <Autocomplete
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            options={top100Films}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Intern Colleage"
                placeholder="colleges"
              />
            )}
          />{" "}
          <div className="mt-5">
            <Autocomplete
              multiple
              limitTags={2}
              id="multiple-limit-tags-batch"
              options={top100Films}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Intern Batch"
                  placeholder="Batch"
                />
              )}
            />
          </div>
        </div>

        <div className=" w-[80%] p-4 ">
          <div className=" ag-theme-alpine" style={{ height: 900 }}>
            <AgGridReact
              rowData={myDetails}
              columnDefs={columDefination}
              defaultColDef={defaultCol} // Set onGridReady prop
            />
          </div>
        </div>
      </div>
    </>
  );
}
