console.log("Hi, this is a test.");

// Main Javascript File

// Called when "Add Item" button is clicked
function showDialogAdd()
{
    // Print that we got here
    console.log("Opening add item dialog");

    // Clear out the values in the form.
    // Otherwise we'll keep values from when we last
    // opened or hit edit.
    // I'm getting it started, you can finish.

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
    var dataToServer = { first : firstName, last : lastName, email : email, phone : phone, birthday : birthday};
    console.log(dataToServer);

    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(dataToServer),
        success: function(dataFromServer)
        {
            console.log(dataFromServer);
            // Need to figure out how to remove duplicate records
            $('#datatable tr').remove();
            updateTable();
            $('#myModal').modal('hide');

        },
        contentType: "application/json",
        dataType: 'text'
    });
}

var saveItemButton = $('#saveChanges');
saveItemButton.on("click", saveChanges);


function updateTable()
{
    // Here's where your code is going to go.
    var url = "api/name_list_get";

    $.getJSON(url, null, function(json_result)
        {
            // json_result is an object. You can set a breakpoint, or print
            // it to see the fields. Specifically, it is an array of objects.
            // Here we loop the array and print the first name.
            for (var i = 0; i < json_result.length; i++)
            {
                console.log(json_result[i].first);
                var phone = json_result[i].phone.substring(0,3)+"-"+json_result[i].phone.substring(3,6)+"-"+
                    json_result[i].phone.substring(6,10);
                $('#datatable tr:last').after('<tr>' +
                    '<td>'+json_result[i].id+'</td>' +
                    '<td>'+json_result[i].last+ '</td>' +
                    '<td>'+json_result[i].email+'</td>' +
                    '<td>'+json_result[i].email+ '</td>' +
                    '<td>'+phone+'</td>' +
                    '<td>'+json_result[i].birthday+'</td>' +
                    '</tr>');
            }
            console.log("Done");
        }
    );
    console.log("Done");
}
// Call your code.
updateTable();