import { styled } from "@mui/material/styles";
import { TableContainer, TableHead, Table, TableBody, TableRow, TableCell, tableCellClasses, Paper, ColoredTableCell,Box } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import connectMongodb from "../utility/connectMongodb";
// import JobApplied from "../models/jobModel";

const header = ['Applied Date', 'Company name', 'Location', 'Job Title','Skills Required','Status','Edit','Delete']
const data = [['12/1', 'GitHub', 'Vancouver', 'IT Support', 'docker, Java', 'Pending', 'Edit', 'Del'], ['11/20', 'Rogers', 'Surrey', 'Web developer', 'rl24', 'Offer received', 'Edit', 'Del'], ['11/16', 'CIBC', 'Burnaby', 'Full Stack Developer', 'React, Next.js, HTML, BootStrap, Heroku, MongoDB', 'interview scheduled', 'Edit', 'Del']]

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'AppliedDate',
    headerName: 'Applied Date',
    width: 150,
    editable: true,
  },
  {
    field: 'CompanyName',
    headerName: 'Company name',
    width: 150,
    editable: true,
  },
  {
    field: 'Location',
    headerName: 'Location',
    width: 110,
    editable: true,
  },
  {
    field: 'JobTitle',
    headerName: 'Job Title',
    // description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 110,
  },
  {
    field: 'SkillsRequired',
    headerName: 'Skills Required',
    width: 110,
    editable: true,
  },
  {
    field: 'Status',
    headerName: 'Status',
    width: 110,
    editable: true,
  },
  {
    field: 'Edit',
    headerName: 'Edit',
    width: 110,
    editable: true,
  },
  {
    field: 'Delete',
    headerName: 'Delete',
    width: 110,
    editable: true,
  },

];

const rows = [
  { id: 1, AppliedDate: 'Snow', CompanyName: 'Jon', age: 35 },
  { id: 2, AppliedDate: 'Lannister', CompanyName: 'Cersei', age: 42 },
  { id: 3, AppliedDate: 'Lannister', CompanyName: 'Jaime', age: 45 },
  { id: 4, AppliedDate: 'Stark', CompanyName: 'Arya', age: 16 },
  { id: 5, AppliedDate: 'Targaryen', CompanyName: 'Daenerys', age: null },
  { id: 6, AppliedDate: 'Melisandre', CompanyName: null, age: 150 },
  { id: 7, AppliedDate: 'Clifford', CompanyName: 'Ferrara', age: 44 },
  { id: 8, AppliedDate: 'Frances', CompanyName: 'Rossini', age: 36 },
  { id: 9, AppliedDate: 'Roxie', CompanyName: 'Harvey', age: 65 },
];

// export const getServerSideProps = async () => {
//   try {
//     console.log('CONNECTION TO MONGO');

//     await connectMongodb();
//     console.log('CONNECTED TO MONGODB');

//     console.log('CREATING DOCUMENT');
//     const jobs = await JobApplied.find();

//     console.log('DOCUMENT CREATED');

//     return{
//       props: {
//         jobs: JSON.parse(JSON.stringify(jobs)),
//       },
//     };

//   } catch (err) {
//     res.json({ err });
//     return{
//       notFound: true,
//     };
//   }

// }

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

const JobListTable = ({jobs}) => (
  // <TableContainer component={Paper}>
  //   <Table>
  //     <TableHead>
  //       <TableRow>
  //         <StyledTableCell align="center">{header[0]}</StyledTableCell>
  //         <StyledTableCell align="center">{header[1]}</StyledTableCell>
  //         <StyledTableCell align="center">{header[2]}</StyledTableCell>
  //         <StyledTableCell align="center">{header[3]}</StyledTableCell>
  //         <StyledTableCell align="center">{header[4]}</StyledTableCell>
  //         <StyledTableCell align="center">{header[5]}</StyledTableCell>
  //         <StyledTableCell align="center">{header[6]}</StyledTableCell>
  //         <StyledTableCell align="center">{header[7]}</StyledTableCell>
  //       </TableRow>
  //     </TableHead>
  //     <TableBody>
  //       {data
  //         .map((row) => {
  //           return (
  //             <TableRow key={row}>
  //               <StyledTableCell align="center">{row[0]}</StyledTableCell>
  //               <StyledTableCell align="center">{row[1]}</StyledTableCell>
  //               <StyledTableCell align="center">{row[2]}</StyledTableCell>
  //               <StyledTableCell align="center">{row[3]}</StyledTableCell>
  //               <StyledTableCell align="center">{row[4]}</StyledTableCell>
  //               <StyledTableCell align="center">{row[5]}</StyledTableCell>
  //               <StyledTableCell align="center">{row[6]}</StyledTableCell>
  //               <StyledTableCell align="center">{row[7]}</StyledTableCell>
  //             </TableRow>
  //           )
  //         })}
  //     </TableBody>
  //   </Table>
  // </TableContainer>
  <Box sx={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      disableSelectionOnClick
      experimentalFeatures={{ newEditingApi: true }}
    />
  </Box>
)

export default JobListTable
