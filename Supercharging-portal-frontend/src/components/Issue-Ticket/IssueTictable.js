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
import { getissueTickets } from '../../services/message.service';


// import { makeStyles } from '@mui/material/styles';

const columns = [
  { id: 'timestamp', label: 'Date', width: 100 },
  { id: 'title', label: 'Title', width: 100 },
  {
    id: 'type',
    label: 'Type',
    // minWidth: 100,
    width: 100
    // align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'status',
    label: 'Status',
    width: 100,
    // align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
];



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      // backgroundColor: 'rgba(90, 80, 255, 0.85)',
      borderColor: "white",
      // color: theme.palette.common.white,
      fontSize: 20
    },
    [`&.${tableCellClasses.body}`]: {
      borderColor:"white",
      fontSize: 14,
    },
  }));

  // const useStyles = makeStyles({
  //   caption: {
  //     color: "green",
  //     padding: 8,
  //     border: "1px dashed grey",
  //     fontSize: "0.875rem"
  //   },
  //   toolbar: {
  //     "& > p:nth-of-type(2)": {
  //       fontSize: "1.25rem",
  //       color: "red",
  //       fontWeight: 600
  //     }
  //   }
  // });

export default function IssueTicTable({trt_id, issueTicketData}) {
  // const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);
  const [message, setMessage] = React.useState([]);


  React.useEffect(() => {
    let isMounted = true;
    const getMessage = async () => {
      const {data, error} = await getissueTickets(trt_id);
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
  }, [trt_id, issueTicketData]);

  if(message.length > 0){
    message.map((data) => {['_id', 'userEmail', '__v'].forEach(e => delete data[e]);});
    message.map((data) => {data.timestamp = data.timestamp.slice(0,10)})
    
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: 700, overflow: 'hidden', background:"transparent", borderColor:"white", borderStyle:"solid" }}>
      <TableContainer sx={{ maxHeight: 4400, backgroundColor:"transparent" }}>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.title}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </StyledTableCell>
                      );
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
          
        /> :
        <span align='center'> No Data Found!</span>
        }
    </Paper>
  );
}