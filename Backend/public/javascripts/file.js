$(document).ready(function() {
    $('body').find('.js-file-upload').on('click', function() {
        var formData = new FormData();
        var file = document.querySelector('#file');
        formData.append("filename", file.files[0]);
        axios.post('/files/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((result) => {
            console.log(result.data);
            if (result.data.status) {
                location.reload(true);
            }
        })
    });
})