/* Handler for the display of the comments on a picture
	Gets values from select_comments.php
*/

var select_comments = function (imageId,commentsContainer) {

	//This is the backend file connecting to the DB
	const php = "php/select_comments.php";

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
			//console.log(itemRaw); // print response

			commentsContainer.innerHTML = "";

			//Dump items in the DOM
			for (let c in itemRaw) {
				//c contains every user found, one at a time

				//Container div for each person
				let commentDIV = document.createElement('div');
				let commentUser = document.createElement('p');
				let commentContent = document.createElement('p');

				//Setup links for each user
				commentUser.innerHTML = itemRaw[c].username;
				commentContent.innerHTML = itemRaw[c].content;

				//Dump the comment in the commentsContainer
				commentDIV.appendChild(commentUser);
				commentDIV.appendChild(commentContent);
				commentsContainer.appendChild(commentDIV);

			}
        }
	};
	//xhr.send();
	xhr.send(formData);
};
