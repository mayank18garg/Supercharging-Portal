import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {styled} from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { getAllUserData} from '../../services/message.service';
import { PageLoader } from '../page-loader';
import {NavLink} from "react-router-dom"

// import { makeStyles } from '@mui/material/styles';

const columns = [
  { id: 'siteName', label: 'Site Name', width: 10, align: 'left' },
  { id: 'siteAddress', label: 'Site Address', width: 100, align: 'left' },
  {
    id: 'userEmail',
    label: 'User Email',
    width: 100,
    align: 'left',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'view',
    label: 'View',
    width: 50,
    align: 'center'
  }
];



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      // backgroundColor: 'rgba(90, 80, 255, 0.85)',
      // color: theme.palette.common.white,
      fontSize: 20,
      fontFamily: 'Gotham Book'
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      fontFamily: 'Gotham Book'
    },
  }));


export default function ViewSiteAdmin() {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [message, setMessage] = React.useState([]);

  React.useEffect(() => {
    let isMounted = true;
    const getMessage = async () => {
      const {data, error} = await getAllUserData();
      if(!isMounted){
        return;
      }

      if(data){
        setMessage(data);
      }

      if(error){
        setMessage(data);
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  },[]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: 1000, overflow: 'hidden', background:"transparent", borderColor: "pale", borderStyle: "solid" }}>
      <TableContainer sx={{ maxHeight: 4400, borderColor:"white", fontFamily: "Gotham Light" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {message
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.trt_id + row.userEmail }>
                    {columns.map((column) => {
                      if(column.id === 'view'){
                        return(
                          <StyledTableCell key={column.id} align={column.align}>
                            <NavLink to='/dashboard' style={{color:'black'}} state={{site_id: row.trt_id, site_name: row.siteName, userEmail: row.userEmail}}> View </NavLink>
                          </StyledTableCell>
                        );
                      }
                      else{
                        const value = row[column.id];
                        return (
                          <StyledTableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </StyledTableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
        { message.length > 0 ? 
        <TablePagination
          sx={{ '& .MuiTablePagination-selectLabel':{fontSize: 12}, '& .MuiToolbar-root':{display: 'flex', alignItems: 'baseline'}, fontSize: 12, '& .MuiTablePagination-displayedRows': {fontSize: 12}}}
          rowsPerPageOptions={[2, 5, 10]}
          component="div"
          count={message.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="pagination"
        /> :
        <PageLoader />
        }
    </Paper>
  );
}