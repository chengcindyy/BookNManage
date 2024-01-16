import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="medium"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.service}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>         
                <Table size="medium" aria-label="prices">
                <TableHead>
                  <TableRow>
                    <TableCell>{row.range ? "Time" : "Package"}</TableCell>
                    <TableCell align="right">Price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(row.range || []).map((item) => (
                    <TableRow key={item.time}>
                      <TableCell component="th" scope="row">
                        {item.time}
                      </TableCell>
                      <TableCell align="right">{item.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {row.servicePackage && (
                <>  
                  <Table size="medium" aria-label="packages">
                    <TableBody>
                      {row.servicePackage.map((item) => (
                        <TableRow key={item.package}>
                          <TableCell component="th" scope="row">
                            {item.package}
                          </TableCell>
                          <TableCell align="right">{item.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              )}

            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    service: PropTypes.string.isRequired,
    range: PropTypes.arrayOf(
      PropTypes.shape({
        price: PropTypes.number.isRequired,
        time: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default function CollapsibleTable({ rows, title }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell style={{width: 50}}></TableCell>
            <TableCell sx={{fontWeight: 'bold', fontSize: '1.5em', textAlign: 'left'}}>{title}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.service} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CollapsibleTable.propTypes = {
  rows: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};
