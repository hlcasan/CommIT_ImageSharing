/* Handler for the display of the  likes on a picture
	Gets values from select_likes.php
*/

var select_likes = function (imageId) {

	//This is the backend file connecting to the DB
	const php = "php/select_likes.php";

	//Handles the server call to the PHP file and the data we get back
	const xhr = new XMLHttpRequest();

	//Send the users for the conversation to the PHP
	let formData = new FormData();
        formData.append("imageId",imageId);

	//Will contain the raw data from the DB
	let itemRaw = [];

	//Connect to the PHP
    xhr.open("POST", php, true);
    xhr.onreadystatechange = function() {
        //This is stuff to tell us what is going on
    	//console.log('readyState: ' + xhr.readyState);
        //console.log('status: ' + xhr.status);
        if (xhr.readyState == 4 && xhr.status == 200) {
            //Everything ok, get the names in JSON
            itemRaw = JSON.parse(xhr.responseText);
			//console.log(xhr.responseText); // print response

			document.getElementById("counter").innerHTML = itemRaw[0].c;

        }
	};
	//xhr.send();
	xhr.send(formData);
};

