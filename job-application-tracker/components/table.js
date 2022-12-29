import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import moment from "moment-timezone";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import JobApplied from "../models/jobModel";

const header = ['Applied Date', 'Company name', 'Location', 'Job Title','Skills Required','Status','Edit','Delete']
const data = [['12/1', 'GitHub', 'Vancouver', 'IT Support', 'docker, Java', 'Pending', 'Edit', 'Del'], ['11/20', 'Rogers', 'Surrey', 'Web developer', 'rl24', 'Offer received', 'Edit', 'Del'], ['11/16', 'CIBC', 'Burnaby', 'Full Stack Developer', 'React, Next.js, HTML, BootStrap, Heroku, MongoDB', 'interview scheduled', 'Edit', 'Del']]



// const rows = [
//   { id: 1, AppliedDate: 'Snow', CompanyName: 'Jon', age: 35 },
//   { id: 2, AppliedDate: 'Lannister', CompanyName: 'Cersei', age: 42 },
//   { id: 3, AppliedDate: 'Lannister', CompanyName: 'Jaime', age: 45 },
//   { id: 4, AppliedDate: 'Stark', CompanyName: 'Arya', age: 16 },
//   { id: 5, AppliedDate: 'Targaryen', CompanyName: 'Daenerys', age: null },
//   { id: 6, AppliedDate: 'Melisandre', CompanyName: null, age: 150 },
//   { id: 7, AppliedDate: 'Clifford', CompanyName: 'Ferrara', age: 44 },
//   { id: 8, AppliedDate: 'Frances', CompanyName: 'Rossini', age: 36 },
//   { id: 9, AppliedDate: 'Roxie', CompanyName: 'Harvey', age: 65 },
// ];



// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

const JobListTable = ({jobs}) => {
  console.log(jobs);

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
      editable: true,
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
      valueOptions: ["Pending", "Rejected", "Interview Scheduled","Offer received"],
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
          onClick={() => handleDelete(params.row._id)}
          color="error"
        />,
      ],
    }
  ];

  const handleDelete = (jobid) => {
      console.log(jobid)
  }


  return(
  <Box sx={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={jobs}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10]}
      disableSelectionOnClick
      experimentalFeatures={{ newEditingApi: true }}
      getRowId={Math.random}
    />
  </Box>
  )
}

export default JobListTable
