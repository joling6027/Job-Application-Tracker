import { styled } from "@mui/material/styles";
import { TableContainer, TableHead, Table, TableBody, TableRow, TableCell, tableCellClasses, Paper, ColoredTableCell } from "@mui/material";

const header = ['Applied Date', 'Company name', 'Location', 'Job Title','Skills Required','Status','Edit','Delete']
const data = [['12/1', 'GitHub', 'Vancouver', 'IT Support', 'docker, Java', 'Pending', 'Edit', 'Del'], ['11/20', 'Rogers', 'Surrey', 'Web developer', 'rl24', 'Offer received', 'Edit', 'Del'], ['11/16', 'CIBC', 'Burnaby', 'Full Stack Developer', 'React, Next.js, HTML, BootStrap, Heroku, MongoDB', 'interview scheduled', 'Edit', 'Del']]

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const JobListTable = () => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <StyledTableCell align="center">{header[0]}</StyledTableCell>
          <StyledTableCell align="center">{header[1]}</StyledTableCell>
          <StyledTableCell align="center">{header[2]}</StyledTableCell>
          <StyledTableCell align="center">{header[3]}</StyledTableCell>
          <StyledTableCell align="center">{header[4]}</StyledTableCell>
          <StyledTableCell align="center">{header[5]}</StyledTableCell>
          <StyledTableCell align="center">{header[6]}</StyledTableCell>
          <StyledTableCell align="center">{header[7]}</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data
          .map((row) => {
            return (
              <TableRow key={row}>
                <StyledTableCell align="center">{row[0]}</StyledTableCell>
                <StyledTableCell align="center">{row[1]}</StyledTableCell>
                <StyledTableCell align="center">{row[2]}</StyledTableCell>
                <StyledTableCell align="center">{row[3]}</StyledTableCell>
                <StyledTableCell align="center">{row[4]}</StyledTableCell>
                <StyledTableCell align="center">{row[5]}</StyledTableCell>
                <StyledTableCell align="center">{row[6]}</StyledTableCell>
                <StyledTableCell align="center">{row[7]}</StyledTableCell>
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
  </TableContainer>
)

export default JobListTable
