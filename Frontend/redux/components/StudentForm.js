import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector, connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { setActiveUser, addUser, editUser } from '../actions/userManagement'
import axios from 'axios';
import { SubmissionError } from 'redux-form'
import _ from 'lodash'
import validator from 'email-validator'

const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.name = 'Required'
    }
    if (!values.email) {
        errors.email = 'Required'
    }
    else if (!validator.validate(values.email)) {
        errors.email = 'Not valid email';
    }
    if (!values.password) {
        errors.password = 'Required'
    }
    if (!values.password_confirmation) {
        errors.password_confirmation = 'Required'
    }
    return errors
}

const submit = (values, dispatch) => {
    if (!values._id) {
        return axios.post('http://localhost:3000/users',
            {
                ...values,
            })
            .then((res) => {
                console.log(res);
                if (!res.data.errors) {
                    dispatch(addUser(res.data.data));
                }
                else {
                    let errors = res.data.errors.map((error) => ({ [error.param]: error.msg }));
                    throw new SubmissionError(_.merge(...errors));
                }
            })
    }
    else {
        return axios.put('http://localhost:3000/users',
            {
                ...values,
                id: values._id
            })
            .then((res) => {
                if (!res.data.errors) {
                    dispatch(editUser(res.data.data));
                }
                else {
                    let errors = res.data.errors.map((error) => ({ [error.param]: error.msg }));
                    throw new SubmissionError(_.merge(...errors));
                }
            })
    }
}


const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
}) => (
        <div>
            <TextField
                {...input}
                margin="dense"
                label={label}
                type={type}
                fullWidth
            />
            {touched &&
                ((error && <span style={{ color: 'red' }}>* {error}</span>) ||
                    (warning && <span style={{ color: 'red' }}>* {warning}</span>))}
        </div>
    );

function StudentForm(props) {
    const { open, handleClickOpen, handleClose } = props;
    let { handleSubmit } = props;
    let dispatch = useDispatch();
    return (
        <React.Fragment>
            <Button variant="contained" color="primary" onClick={() => {
                dispatch(setActiveUser(''));
                handleClickOpen();
            }}
                style={{ background: 'linear-gradient(to top right, #003366 0%, #00cc99 100%)' }}
            >
                Create
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit(submit)}>
                    <DialogTitle id="form-dialog-title">Student Form</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            All the Fields are Required
                    </DialogContentText>
                        <Field name="name" label="Enter Name" component={renderField} type='text' />
                        <Field name="email" label="Enter Email" component={renderField} type='text' />
                        <Field name="password" label="Enter Password" component={renderField} type='password' />
                        <Field name="password_confirmation" label="Password Confirmation" component={renderField} type='password' />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                    </Button>
                        <Button type="submit" color="primary"  >
                            Submit
                    </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
}



StudentForm = reduxForm({
    form: 'student',
    destroyOnUnmount: false,
    validate,
})(StudentForm)


StudentForm = connect(
    state => ({
        initialValues: {
            ...state.usersData.activeUser,
            password_confirmation: state.usersData.activeUser.password
        },
        enableReinitialize: true,
    }),
    {}
)(StudentForm)

export default StudentForm