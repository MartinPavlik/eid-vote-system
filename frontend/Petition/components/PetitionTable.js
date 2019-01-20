import React, { Component, Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from 'components/Link';
import { parseIsoDateToString } from '../utils';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#2b3d51',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class PetitionTable extends Component {
  render() {
    const { classes, rows } = this.props;

    return (
      <Fragment>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Název</CustomTableCell>
                <CustomTableCell align="right">Hlasování do</CustomTableCell>
                <CustomTableCell align="right">Podpisů</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow
                  key={row._id}
                  hover
                >
                  <TableCell align="right">
                    <Link href={`/petition/${row._id}`}>
                      {row.title}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{parseIsoDateToString(row.to)}</TableCell>
                  <TableCell align="right">{row.votes.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Fragment>
    );
  }
}


export default withStyles(styles)(PetitionTable);
