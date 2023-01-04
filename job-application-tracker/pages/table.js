import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { styled } from "@mui/material/styles";
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Select, MenuItem, Alert } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem, useGridApiRef, useGridApiEventHandler, useGridApiContext } from '@mui/x-data-grid';
import moment from "moment-timezone";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import JobApplied from "../models/jobModel";

const JobListTable = ({ jobs }) => {
  // console.log(jobs);
  // const apiRef = useGridApiContext();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [deleteJob, setDeleteJob] = React.useState();
  const [message, setMessage] = React.useState();
  const [status, setStatus] = React.useState('');

  const handleClickOpen = (jobId) => {
    setDeleteJob(jobId)
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const columns = [
    { field: '_id', headerName: 'ID', width: 90, sortable: true, hide: true },
    {
      field: 'appliedDate',
      headerName: 'Applied Date',
      width: 150,
      editable: false,
      sortable: true,
      valueFormatter: params =>
        moment(params?.value).format("YYYY/MM/DD"),
    },
    {
      field: 'companyName',
      headerName: 'Company name',
      width: 180,
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 180,
      editable: false,
    },
    {
      field: 'title',
      headerName: 'Job Title',
      sortable: false,
      width: 220,
    },
    {
      field: 'skills',
      headerName: 'Skills Required',
      width: 180,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 180,
      editable: true,
      // type: "singleSelect",
      // valueOptions: ["Pending", "Rejected", "Interview Scheduled", "Offer received"],
      renderCell: (params) => (
        <Select
          required
          id="select-status"
          name="status"
          // defaultValue={params.row.status}
          defaultValue={params.row.status ? params.row.status: "Pending"}
          sx={{ width: "100%", boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
          onChange={(e) => handleStatusOnChange(e.target.value, params.row.companyName, params.row._id)}
          // value={status}
        >
          <MenuItem value={"Pending"}>Pending</MenuItem>
          <MenuItem value={"Rejected"}>Rejected</MenuItem>
          <MenuItem value={"Interview Scheduled"}>Interview Scheduled</MenuItem>
          <MenuItem value={"Offer received"}>Offer received</MenuItem>
        </Select>
      )
    },
    // {
    //   field: 'icon_edit', headerName: 'Edit', flex: 1, renderCell: (params) => <EditIcon value={params.row.id} onClick={() => handleDelete(params.row.id)} color="success" />
    // },
    // {
    //   field: 'icon_delete', headerName: 'Delete', flex: 1, renderCell: (params) => <DeleteIcon value={params.row.id} onClick={() => handleDelete(params.row.id)} color="error" />
    // },
    {
      field: 'actions',
      type: 'actions',
      width: 50,

      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleClickOpen(params.row._id)}
          color="error"
        />,
      ],
    }
  ];

  const handleDelete = async (jobid) => {
    console.log(jobid);
    const response = await fetch(`/api/test/${jobid}`, {
      method: 'DELETE'
    })
    const data = await response.json()
    console.log(data)
    //fetch data again to refresh
    if (data.acknowledged) {
      handleClose();
      refreshData();
    }
  }

  const handleStatusOnChange = async (newStatus, companyName, jobid) => {
    console.log(newStatus);
    //set message for alert
    setMessage(`The status for application at ${companyName} has been changed to "${newStatus}"`)
    //save data to db
    const statusData = {
      status: newStatus
    }
    const JSONData = JSON.stringify(statusData)
    const response = await fetch(`/api/test/${jobid}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONData
    })
    const data = await response.json()
    console.log(data)
    refreshData();
  }

  // useGridApiEventHandler(apiRef, 'editCellPropsChange', handleCellDataChange);

  const refreshData = () => {
    router.replace(router.asPath);
  }

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    },5000)
    
  },[message])


  return (
    <Box sx={{
      height: 600,
      width: '100%'
    }}>
      {message && <Alert severity='info'>{message}</Alert>}
      <DataGrid
        rows={jobs}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={Math.random}
        sx={{
          '.MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          '&.MuiDataGrid-root': {
            border: 'none',
          },
        }}
      />
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          {"Are you sure you want to delete this job application record?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>Cancel</Button>
          <Button onClick={() => handleDelete(deleteJob)}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default JobListTable
