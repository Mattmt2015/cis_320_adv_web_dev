console.log("Hi, this is a test.");

// Main Javascript File

// Called when "Add Item" button is clicked
function showDialogAdd()
{
    // Print that we got here
    console.log("Opening add item dialog");

    $('#id').val("");
    $('#firstName').val("");
    $('#firstName').removeClass("is-invalid");
    $('#firstName').removeClass("is-valid");

    $('#lastName').val("");
    $('#lastName').removeClass("is-invalid");
    $('#lastName').removeClass("is-valid");

    $('#email').val("");
    $('#email').removeClass("is-invalid");
    $('#email').removeClass("is-valid");

    $('#phone').val("");
    $('#phone').removeClass("is-invalid");
    $('#phone').removeClass("is-valid");

    $('#birthday').val("");
    $('#birthday').removeClass("is-invalid");
    $('#birthday').removeClass("is-valid");

    // Show the hidden dialog
    $('#myModal').modal('show');
}

var addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);

// Save Changes Button
function saveChanges()
{
    console.log("Changes Saved");
    var id = parseInt($("#id").val());

    var firstName = $("#firstName").val();
    var regString = /.{1,30}/;
    console.log(firstName);
    if (regString.test(firstName))
    {
        console.log("Ok");
        $('#firstName').removeClass("is-invalid");
        $('#firstName').addClass("is-valid");
    } else
    {
        console.log("Bad");
        $('#firstName').addClass("is-invalid");
        $('#firstName').removeClass("is-valid");
    }

    var lastName = $("#lastName").val();
    console.log(lastName);
    if (regString.test(lastName))
    {
        console.log("Ok");
        $('#lastName').removeClass("is-invalid");
        $('#lastName').addClass("is-valid");
    } else
    {
        console.log("Bad");
        $('#lastName').addClass("is-invalid");
        $('#lastName').removeClass("is-valid");
    }

    var email = $("#email").val();
    console.log(email);
    if (regString.test(email))
    {
        console.log("Ok");
        $('#email').removeClass("is-invalid");
        $('#email').addClass("is-valid");
    } else
    {
        console.log("Bad");
        $('#email').addClass("is-invalid");
        $('#email').removeClass("is-valid");
    }

    regPhone = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    var phone = $("#phone").val();
    console.log(phone);
    if (regPhone.test(phone))
    {
        console.log("Ok");
        $('#phone').removeClass("is-invalid");
        $('#phone').addClass("is-valid");
    } else
    {
        console.log("Bad");
        $('#phone').addClass("is-invalid");
        $('#phone').removeClass("is-valid");
    }

    regDate = /^\d{4}-\d{2}-\d{2}$/;
    var birthday = $("#birthday").val();
    console.log(birthday);
    if (regDate.test(birthday))
    {
        console.log("Ok");
        $('#phone').removeClass("is-invalid");
        $('#phone').addClass("is-valid");
    } else
    {
        console.log("Bad");
        $('#phone').addClass("is-invalid");
        $('#phone').removeClass("is-valid");
    }

    var url = "api/name_list_edit";
    var dataToServer = { id : id, first : firstName, last : lastName, email : email, phone : phone, birthday : birthday};
    console.log(dataToServer);

    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(dataToServer),
        success: function(dataFromServer)
        {
            console.log(dataFromServer);
            // Need to figure out how to remove duplicate records
            var rows = $('#datatable tr');
            var i;
            for (i = 1; i < rows.length; i++){
                rows [i].remove();
            }
            updateTable();
            $('#myModal').modal('hide');

        },
        contentType: "application/json",
        dataType: 'text'
    });
}

var saveItemButton = $('#saveChanges');
saveItemButton.on("click", saveChanges);

function deleteItem(e)
{
    console.log("Delete");
    console.log(e.target.value);
    var personID = parseInt(e.target.value);
    var url = "api/name_list_delete";
    var dataToServer = {id: personID};
    console.log(dataToServer);

    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(dataToServer),
        success: function(dataFromServer)
        {
            console.log(dataFromServer);
            // Need to figure out how to remove duplicate records
            var rows = $('#datatable tr');
            var i;
            for (i = 1; i < rows.length; i++){
                rows [i].remove();
            }
            updateTable();

        },
        contentType: "application/json",
        dataType: 'text'
    });
}

function editItem(e)
{
    console.log("Edit");
    console.log(e.target.value);

    // Grab the id from the event
    var id = e.target.value;
    var firstName = e.target.parentNode.parentNode.querySelectorAll("td")[1].innerHTML;
    var lastName = e.target.parentNode.parentNode.querySelectorAll("td")[2].innerHTML;
    var email = e.target.parentNode.parentNode.querySelectorAll("td")[3].innerHTML;
    var phone = e.target.parentNode.parentNode.querySelectorAll("td")[4].innerHTML;
    var birthday = e.target.parentNode.parentNode.querySelectorAll("td")[5].innerHTML;

    $('#id').val(id); // Yes, now we set and use the hidden ID field
    $('#firstName').val(firstName);
    $('#lastName').val(lastName);
    $('#email').val(email);
    $('#phone').val(phone);
    $('#birthday').val(birthday);
    $('#myModal').modal('show');

}

function updateTable()
{
    // Here's where your code is going to go.
    var url = "api/name_list_get";

    $.getJSON(url, null, function(json_result)
        {
            for (var i = 0; i < json_result.length; i++)
            {
                console.log(json_result[i].first);
                var phone = json_result[i].phone.substring(0,3)+"-"+json_result[i].phone.substring(3,6)+"-"+
                    json_result[i].phone.substring(6,10);
                $('#datatable tr:last').after('<tr>' +
                    '<td>'+json_result[i].id+'</td>' +
                    '<td>'+json_result[i].first+ '</td>' +
                    '<td>'+json_result[i].last+'</td>' +
                    '<td>'+json_result[i].email+ '</td>' +
                    '<td>'+phone+'</td>' +
                    '<td>'+json_result[i].birthday+'</td>' +
                    '<td><button type=\'button\' name=\'delete\' class=\'deleteButton btn\' value=\'' + json_result[i].id + '\'>Delete</button></td>'+
                    '<td><button type=\'button\' name=\'edit\' class=\'editButton btn\' value=\'' + json_result[i].id + '\'>Edit</button></td> '+
                    '</tr>');
            }
            console.log("Done");
            var buttons = $(".deleteButton");
            buttons.on("click", deleteItem);

            var buttons = $(".editButton");
            buttons.on("click", editItem);
        }
    );
    console.log("Done");
}
// Call your code.
updateTable();