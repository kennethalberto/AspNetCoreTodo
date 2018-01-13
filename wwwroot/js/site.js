// Write your JavaScript code.
$(document).ready(function() {
    $('#add-item-button').on('click', addItem);

    $('.done-checkbox').on('click', function(e) { 
        markCompleted(e.target);
    });

    $('.delete-user-button').on('click', function(e) {
        deleteUser(e.target);
    });
});

function addItem() {
    $('#add-item-error').hide();
    var newTitle = $('#add-item-title').val();
    var newDue = $('#add-item-due').val();

    $.post('/Todo/AddItem', { title: newTitle, dueAt: newDue }, function () {
        window.location = '/Todo';
    })
    .fail(function(data) {
        if (data && data.responseJSON) {
            var firstError = data.responseJSON[Object.keys(data.responseJSON)[0]];
            $('#add-item-error').text(firstError);
            $('#add-item-error').show();
        }
    });
}

function markCompleted(checkbox) {
    checkbox.disabled = true;

    $.post('/Todo/MarkDone', { id: checkbox.name }, function() {
        var row = checkbox.parentElement.parentElement;
        $(row).addClass('done');
    });
}

function deleteUser(button) {
    $.post('ManageUsers/DeleteUser', { id: button.name }, function () {
        window.location = '/ManageUsers';
    });
}