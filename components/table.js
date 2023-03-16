import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { styled } from "@mui/material/styles";
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Select, MenuItem, Alert } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem, useGridApiRef, useGridApiEventHandler, useGridApiContext } from '@mui/x-data-grid';
import moment from "moment-timezone";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteData, statusOnChange } from '../lib/api';

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
      width: 120,
      editable: false,
      sortable: true,
      valueFormatter: params =>
        moment(params?.value).format("YYYY/MM/DD"),
    },
    {
      field: 'companyName',
      headerName: 'Company name',
      flex: 1
    },
    {
      field: 'location',
      headerName: 'Location',
      flex: 1,
      editable: false,
    },
    {
      field: 'title',
      headerName: 'Job Title',
      sortable: false,
      flex: 1,
    },
    {
      field: 'skills',
      headerName: 'Skills Required',
      flex: 1,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
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
    // console.log(jobid);
    // const response = await fetch(`/api/test/${jobid}`, {
    //   method: 'DELETE'
    // })
    // const data = await response.json()

    deleteData(jobid);
    // console.log(data)
    //fetch data again to refresh
    if (data.acknowledged) {
      handleClose();
      refreshData();
    }
  }

  const handleStatusOnChange = async (newStatus, companyName, jobid) => {
    //set message for alert
    setMessage(`The status for application at ${companyName} has been changed to "${newStatus}"`)
    //save data to db
    const statusData = {
      status: newStatus
    }
    const JSONData = JSON.stringify(statusData)
    
    statusOnChange(jobid, JSONData);
    // const response = await fetch(`/api/test/${jobid}`,{
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSONData
    // })
    // const data = await response.json()
    // console.log(data)

    refreshData();
  }

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
