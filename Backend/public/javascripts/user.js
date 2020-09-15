$(document).ready(function() {
    let userModal = $('#userModal');

    $('.js-create-user').on('click', function() {
        resetErrors(userModal);
        userModal.find('[name=password]').prop('disabled', false);
        userModal.find('[name=password_confirmation]').prop('disabled', false);
        userModal.find('[name=id]').val('');
        userModal.find('[name=name]').val('');
        userModal.find('[name=email]').val('');
        userModal.find('[name=password]').val('');
        userModal.find('[name=password_confirmation]').val('');
    })

    userModal.find('.js-save-user').on('click', function() {
        resetErrors(userModal);
        let id = userModal.find('[name=id]').val();
        if (id.length == 0) {
            // To Create User
            axios.post('/users', {
                name: userModal.find('[name=name]').val(),
                email: userModal.find('[name=email]').val(),
                password: userModal.find('[name=password]').val(),
                password_confirmation: userModal.find('[name=password_confirmation]').val(),
            }).then((result) => {
                if (result.data.status) {
                    location.reload(true);
                } else {
                    displayErrors(userModal, result.data.errors);
                }
            });
        } else {
            // To Update User
            axios.put('/users', {
                id: userModal.find('[name=id]').val(),
                name: userModal.find('[name=name]').val(),
                email: userModal.find('[name=email]').val(),
                password: userModal.find('[name=password]').val(),
                password_confirmation: userModal.find('[name=password_confirmation]').val(),
            }).then((result) => {
                if (result.data.status) {
                    location.reload(true);
                } else {
                    displayErrors(userModal, result.data.errors);
                }
            });
        }

    });

    $('body').on('click', '.js-edit-user', function() {
        resetErrors(userModal);
        userModal.find('[name=password]').prop('disabled', true);
        userModal.find('[name=password_confirmation]').prop('disabled', true);
        axios.get(`/users/get`, {
            params: {
                id: $(this).attr('data-id')
            }
        }).then((result) => {
            userModal.find('[name=id]').val(result.data.data._id);
            userModal.find('[name=name]').val(result.data.data.name);
            userModal.find('[name=email]').val(result.data.data.email);
            userModal.find('[name=password]').val(result.data.data.password);
            userModal.find('[name=password_confirmation]').val(result.data.data.password);
        })
    });

    $('body').on('click', '.js-delete-user', function() {
        if (confirm("Are you sure you want to delete it?")) {
            axios.delete(`/users`, {
                params: {
                    id: $(this).attr('data-id'),
                }
            }).then((result) => {
                if (result.data.status) {
                    location.reload(true);
                }
            })
        }
        return false;
    });
})