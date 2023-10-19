import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Internjson from "./Interjson.json";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

export default function About() {
  const [myDetails, setMyDetails] = useState([]);
  const [deleteId, setDeleteId] = useState();
  //store id in the state to find id to replace to update values
  const [passingId, setPassingId] = useState();
  //When button is 0, it indicates that you are in "add" mode. When button is 1, it means you are in "update" mode.
  const [changeButtonMode, setchangeButtonMode] = useState(0);
  // delete button
  //store index
  const [openDE, setOpenDE] = useState(false);
  //delete model
  const showModalDelete = () => {
    setOpenDE(true);
  };
  const handleOkDelete = () => {
    setOpenDE(false);
  };
  const handleCancelDelete = () => {
    setOpenDE(false);
  };
  //model
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
  //
  const [manageFilter, setManageFilter] = useState({
    collegeType: [],
    internType: [],
  });

  //inputfiled values
  const [inputDetails, setInputDetails] = useState([
    {
      Id: "",
      Name: "",
      Email: "",
      Phone: "",
      FatherName: "",
      MotherName: "",
      Address: "",
      Colleage: "",
      Degree: "",
      Year: "",
      Batch: "",
    },
  ]);

  const [columDefination] = useState([
    { field: "Id" },
    { field: "Name" },
    { field: "Email" },
    { field: "Phone" },
    { field: "FatherName" },
    { field: "MotherName" },
    { field: "Address" },
    { field: "Colleage" },
    { field: "Degree" },
    { field: "Year" },
    { field: "Batch" },
    {
      field: "Action",
      cellRenderer: ({ data }) => {
        return (
          <button
            onClick={() => {
              showModal();
              showModal1(data);
              setchangeButtonMode(1);
            }}
            className="bg-blue-400  w-[60px]"
          >
            Edit
          </button>
        );
      },
    },
    {
      field: "Action",
      cellRenderer: ({ data }) => {
        return (
          <button
            onClick={() => {
              showModalDelete();
              setDeleteId(data.Id);
            }}
            className="bg-red-400 w-[60px]"
          >
            Delete
          </button>
        );
      },
    },
  ]);

  //get input from onChange and set inputfields
  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setInputDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //find the max id in the table
  const generateUniqueID = () => {
    const maxID = myDetails.reduce(
      (max, user) => (user.Id > max ? user.Id : max),
      0
    );
    return maxID + 1;
  };

  //add user
  const onHandleSubmit = () => {
    const newId = generateUniqueID();
    // Create a new product object with the calculated ID and other details
    const pushData = [];
    pushData.unshift({
      Id: newId,
      Name: inputDetails.Name,
      Email: inputDetails.Email,
      Phone: inputDetails.Phone,
      FatherName: inputDetails.FatherName,
      MotherName: inputDetails.MotherName,
      Address: inputDetails.Address,
      Colleage: inputDetails.Colleage,
      Degree: inputDetails.Degree,
      Year: inputDetails.Year,
      Batch: inputDetails.Batch,
    });
    setMyDetails([...pushData, ...myDetails]);
    // Clear the input fields
    setInputDetails({
      Id: "",
      Name: "",
      Email: "",
      Phone: "",
      FatherName: "",
      MotherName: "",
      Address: "",
      Colleage: "",
      Degree: "",
      Year: "",
      Batch: "",
    });
  };

  //edit button show datas
  const showModal1 = (resiveObj) => {
    if (resiveObj) {
      setInputDetails({
        Id: resiveObj.Id,
        Name: resiveObj.Name,
        Email: resiveObj.Email,
        Phone: resiveObj.Phone,
        FatherName: resiveObj.FatherName,
        MotherName: resiveObj.MotherName,
        Address: resiveObj.Address,
        Colleage: resiveObj.Colleage,
        Degree: resiveObj.Degree,
        Year: resiveObj.Year,
        Batch: resiveObj.Batch,
      });
    }
    setPassingId(resiveObj.Id);
  };

  //JSON values
  useEffect(() => {
    setMyDetails(Internjson.Interns);
  }, []);
  //defauldcoldefs
  const defaultCol = {
    sortable: true,
    editable: true,
    filter: true,
    resizable: true,
    flex: 1,
  };

  //delete button
  const onHandleDelte = (del) => {
    let deleteArr = myDetails.findIndex((value) => value.Id === del);
    setMyDetails((prev) => {
      const preData = [...prev];
      preData.splice(deleteArr, 1);
      return preData;
    });
  };

  // handleEditOk update interns
  const handleEditOk = (Id) => {
    const index = myDetails.findIndex((item) => item?.Id === Id);
    if (index > -1) {
      myDetails[index] = {
        ...myDetails[index],
        Name: inputDetails.Name,
        Email: inputDetails?.Email,
        FatherName: inputDetails?.FatherName,
        MotherName: inputDetails?.MotherName,
        Address: inputDetails?.Address,
        Colleage: inputDetails?.Colleage,
        Degree: inputDetails.Degree,
        Year: inputDetails?.Year,
        Batch: inputDetails?.Batch,
      };
      setMyDetails([...myDetails]);
    }
  };

  //list of internCollege categories for show in autocomplete in array format
  const internCollege = Array.from(
    new Set(myDetails.map((item) => item?.Colleage)).values()
  );
  //list of intern Batch categories for show in autocomplete in array format
  const internType = Array.from(
    new Set(myDetails.map((item) => item?.Batch)).values()
  );

  //onSelect college multiple filtering
  const internCollegeItem = [];
  for (let i = 0; i < manageFilter?.collegeType?.length; i++) {
    const colleageFilter = myDetails.filter(
      (item) => item?.Colleage === manageFilter?.collegeType[i]
    );
    internCollegeItem.push(...colleageFilter);
  }

  //if i select multiple Colleage means it will show only filter data otherwise default data
  const colleageFilteredItems =
    internCollegeItem?.length === 0 ? myDetails : internCollegeItem;

  //internType multiple filtering
  const internTypeFilterItem = [];
  for (let j = 0; j < manageFilter?.internType?.length; j++) {
    const batchFilter = colleageFilteredItems.filter(
      (item) => item?.Batch === manageFilter?.internType[j]
    );
    internTypeFilterItem.push(...batchFilter);
  }

  //if i select multiple internType means it will show only filter data otherwise default data
  const bactchFilteredItems =
    internTypeFilterItem?.length === 0
      ? colleageFilteredItems
      : internTypeFilterItem;

  return (
    <>
      <div className=" flex  ">
        <div className=" w-[20%] p-4 ">
          <div className="pb-5">
            <button
              className="border-2 text-white border-gray-600 w-24 h-10 rounded-md bg-blue-600"
              onClick={() => {
                showModal();
                setInputDetails({
                  Id: "",
                  Name: "",
                  Email: "",
                  Phone: "",
                  FatherName: "",
                  MotherName: "",
                  Address: "",
                  Colleage: "",
                  Degree: "",
                  Year: "",
                  Batch: "",
                });
              }}
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
                  !inputDetails.Name||
                  !inputDetails.Email||
                  !inputDetails.Phone||
                  !inputDetails.FatherName||
                  !inputDetails.MotherName||
                  !inputDetails.Address||
                  !inputDetails.Colleage||
                  !inputDetails.Degree||
                  !inputDetails.Year||
                  !inputDetails.Batch
                }                               
                >
                  {changeButtonMode === 0 ? "ADD" : "UPDATE"}
                </Button>,
              ]}
            >
              <input
                className="border-2 border-gray-600 w-24 h-10 rounded-md p-4"
                style={{ height: "30px", width: "360px", marginBottom: "6px" }}
                name="Name"
                placeholder="Name"
                value={inputDetails.Name}
                onChange={onHandleChange}
              />
              <input
                className="border-2 border-gray-600 w-24 h-10 rounded-md p-4"
                style={{ height: "30px", width: "360px", marginBottom: "6px" }}
                name="Email"
                placeholder="email"
                value={inputDetails.Email}
                onChange={onHandleChange}
              />
              <input
                className="border-2 border-gray-600 w-24 h-10 rounded-md p-4"
                style={{ height: "30px", width: "360px", marginBottom: "6px" }}
                name="Phone"
                placeholder="Phone"
                value={inputDetails.Phone}
                onChange={onHandleChange}
              />
              <input
                className="border-2 border-gray-600 w-24 h-10 rounded-md p-4"
                style={{ height: "30px", width: "360px", marginBottom: "6px" }}
                name="FatherName"
                placeholder="FatherName"
                value={inputDetails.FatherName}
                onChange={onHandleChange}
              />
              <input
                className="border-2 border-gray-600 w-24 h-10 rounded-md p-4"
                style={{ height: "30px", width: "360px", marginBottom: "6px" }}
                name="MotherName"
                placeholder="MotherName"
                value={inputDetails.MotherName}
                onChange={onHandleChange}
              />
              <textarea
                placeholder="Address"
                rows={2}
                name="Address"
                value={inputDetails.Address}
                onChange={onHandleChange}
                className="w-[360px] border border-gray-600"
              ></textarea>
              <input
                className="border-2 border-gray-600 w-24 h-10 rounded-md p-4"
                style={{ height: "30px", width: "360px", marginBottom: "6px" }}
                name="Colleage"
                placeholder="Colleage"
                value={inputDetails.Colleage}
                onChange={onHandleChange}
              />
              <input
                className="border-2 border-gray-600 w-24 h-10 rounded-md p-4"
                style={{ height: "30px", width: "360px", marginBottom: "6px" }}
                name="Degree"
                placeholder="Degree"
                value={inputDetails.Degree}
                onChange={onHandleChange}
              />
              <input
                className="border-2 border-gray-600 w-24 h-10 rounded-md p-4"
                style={{ height: "30px", width: "360px", marginBottom: "6px" }}
                name="Year"
                value={inputDetails.Year}
                onChange={onHandleChange}
                placeholder="Year"
              />
              <input
                className="border-2 border-gray-600 w-24 h-10 rounded-md p-4"
                style={{ height: "30px", width: "360px", marginBottom: "6px" }}
                name="Batch"
                placeholder="Batch"
                value={inputDetails.Batch}
                onChange={onHandleChange}
              />
            </Modal>
          </div>
          <Autocomplete
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            options={internCollege}
            value={manageFilter.collegeType}
            onChange={(event, newValue) => {
              setManageFilter({ ...manageFilter, collegeType: newValue });
            }}
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
              options={internType}
              value={manageFilter.internType}
              onChange={(event, newValue) => {
                setManageFilter({ ...manageFilter, internType: newValue });
              }}
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
        <Modal
          title="ARE YOU WANT TO DELETE"
          open={openDE}
          onOk={() => {
            handleOkDelete();
            onHandleDelte(deleteId);
          }}
          onCancel={handleCancelDelete}
        ></Modal>
        <div className=" w-[80%] p-4 ">
          <div className=" ag-theme-alpine" style={{ height: 900 }}>
            <AgGridReact
              rowData={bactchFilteredItems}
              columnDefs={columDefination}
              defaultColDef={defaultCol} // Set onGridReady prop
            />
          </div>
        </div>
      </div>
    </>
  );
}
