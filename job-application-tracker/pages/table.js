import React from 'react';
import { useRouter } from 'next/router';
import { styled } from "@mui/material/styles";
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import moment from "moment-timezone";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { yellow } from '@mui/material/colors';
// import JobApplied from "../models/jobModel";

const header = ['Applied Date', 'Company name', 'Location', 'Job Title', 'Skills Required', 'Status', 'Edit', 'Delete']

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

const JobListTable = ({ jobs }) => {
  // console.log(jobs);
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [deleteJob, setDeleteJob] = React.useState();

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
      editable: true,
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
      editable: true,
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
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 180,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Pending", "Rejected", "Interview Scheduled", "Offer received"],
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
          // onClick={() => handleDelete(params.row._id)}
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

  const refreshData = () => {
    router.replace(router.asPath);
  }


  return (
    <Box sx={{
      height: 400,
      width: '100%'
    }}>
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
        {/* <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleDelete(deleteJob)} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default JobListTable
