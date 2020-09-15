import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import StudentForm from './StudentForm';
import { setActiveUser, deleteUser, initUsersState } from '../actions/userManagement'




const useStyles = makeStyles(theme => ({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        padding: '0 30px',
        width: '300px',
        height: '300px',
    },
    flexContainer: {
        height: '100vh',
    },
    textFields: {
        width: '250px',
        background: 'white',
        borderRadius: '5px',
    },
    fab: {
        marginRight: '6px',
        marginLeft: '6px',
    },
    th: {
        background: '#009999',
        color: 'white',
        fontSize: '16px',
    }
}));

function Table(props) {
    const classes = useStyles();
    const { headerRow, bodyData, keysToBeMapped, rowIdentifier, editAction, deleteAction } = props;
    return (
        <Paper >
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            headerRow.map((cellData, index) => {
                                if (index == 0)
                                    return <TableCell align="left" className={classes.th}>{cellData}</TableCell >;
                                else
                                    return <TableCell align="right" className={classes.th}>{cellData}</TableCell >;
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        bodyData.map((data, index) => {
                            return (
                                <TableRow key={index}>
                                    {
                                        keysToBeMapped.map((key, index) => {
                                            if (index === 0)
                                                return <TableCell >{index + 1}</TableCell >
                                            else
                                                return <TableCell align="right">{bodyData[key]}</TableCell >;
                                        })
                                    }
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
            </Table>
        </Paper>
    );
}

export default Table;
