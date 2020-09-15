function displayErrors(modal, errorsArray) {
    errorsArray.map((error) => {
        modal.find(`[data-error=${error.param}]`).text(`* ${error.msg}`);
    });
}

function resetErrors(modal) {
    modal.find('div[data-error]').text('');
}