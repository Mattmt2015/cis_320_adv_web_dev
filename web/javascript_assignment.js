console.log("Matt");

// Problem 1
function problemOneFunction(event)
{
    console.log("Hello");
}
var formButton1 = $('#button1');
formButton1.on("click", problemOneFunction);

// Problem 2
function problemTwoFunction(event)
{
    var v1 = $('#field1').val();
    var integerOne = parseInt(v1,10)
    console.log(integerOne);

    var v2 = $('#field2').val();
    var integerTwo = parseInt(v2, 10)
    console.log(integerTwo);

    console.log(integerOne + integerTwo);
    $('#field3').val(integerOne + integerTwo);
}
var formButton2 = $('#button2');
formButton2.on("click", problemTwoFunction);

// Problem 3
function problemThreeFunction(event)
{
    $("#paragraphToHide").toggle(500);
}
var formButton3 = $('#button3');
formButton3.on("click", problemThreeFunction);

// Problem 4
function problemFourFunction(event)
{
    var phoneNumber = $('#phoneField').val();

    var reg = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

    if (reg.test(phoneNumber))
    {
        console.log("Ok");
    } else
        {
        console.log("Bad");
    }
}
var formButton4 = $('#button4');
formButton4.on("click", problemFourFunction);

// Problem 5
function problemFiveFunction(event)
{
    // Create an empty object
    var formObject = {};

    // Set a field in the object to the value in this form field
    formObject.firstName = $('#firstName').val();
    formObject.lastName = $('#lastName').val();
    formObject.email = $('#email').val();

    // Build the JSON string based on that object's fields
    var jsonString = JSON.stringify(formObject);

    // Set a field to the JSON result so we can see it.
    $('#jsonResult').text(jsonString);


}
var formButton5 = $('#button5');
formButton5.on("click", problemFiveFunction());
