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

function Students() {
    const classes = useStyles();
    let dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    var users = useSelector((state) => { return state.usersData.users });

    React.useEffect(() => {
        axios.get(`/users/get-all`).then((res) => {
            if (res.status == 200) {
                dispatch(initUsersState(res.data.data));
            }
        });
    }, []);

    function handleClickOpen() {
        setOpen(true);
    }
    function handleClose() {
        setOpen(false);
    }

    return (
        <Box display="flex" flexDirection="column">
            <Box>
                <StudentForm handleClickOpen={handleClickOpen} handleClose={handleClose} open={open} name={'ali'} />
            </Box>
            <Box style={{ marginTop: '10px' }}>
                <Paper >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" className={classes.th}>Id</TableCell >
                                <TableCell align="right" className={classes.th}>Name</TableCell >
                                <TableCell align="right" className={classes.th}>Email</TableCell >
                                <TableCell align="right" className={classes.th}>Password</TableCell >
                                <TableCell align="right" className={classes.th}>Actions</TableCell >
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                users.map((user, index) => {
                                    if (user._id) {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell >{index + 1}</TableCell >
                                                <TableCell align="right">{user.name}</TableCell >
                                                <TableCell align="right">{user.email}</TableCell >
                                                <TableCell align="right">{user.password}</TableCell >
                                                <TableCell align="right">
                                                    <Fab size="small" color="secondary" aria-label="edit" className={classes.fab}
                                                        onClick={
                                                            () => {
                                                                dispatch(setActiveUser(user));
                                                                setOpen(true);
                                                            }
                                                        }
                                                    >
                                                        <EditIcon />
                                                    </Fab>
                                                    <Fab size="small" aria-label="delete" className={classes.fab}
                                                        onClick={
                                                            () => {
                                                                if (window.confirm('Are you sure you wish to delete this item?'))
                                                                    dispatch(deleteUser(user._id));
                                                            }
                                                        }
                                                    >
                                                        <DeleteIcon />
                                                    </Fab>
                                                </TableCell >
                                            </TableRow>
                                        );
                                    }
                                    else {
                                        return null;
                                    }
                                })
                            }
                        </TableBody>
                    </Table>
                </Paper>
            </Box>
        </Box >
    );
}

export default Students;
