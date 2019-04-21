/* Handler for the display of images in the Gallery
	Uses the var itemRaw which comes json-encoded from the DB through select_images.php
*/

var select_images = function () {

	//This is the backend file connecting to the DB
	const php = "php/select_images.php";

	//Handles the server call to the PHP file and the data we get back
	const xhr = new XMLHttpRequest();

	//WE WILL USE THIS LATER
	let formData = new FormData();
	//formData.append("current",window.localStorage.getItem("userId"));

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

			//The HTML gallery for the list of names
			let gallery = document.getElementById('galleryContainer');

			//Clean up the html
			gallery.innerHTML = "";

			//Dump items in the DOM
			for (let c in itemRaw) {
				//c contains every user found, one at a time

				//Container div for each person
				let imageDIV = document.createElement('div');

				let imageTitle = document.createElement('h4');
				imageTitle.innerHTML = itemRaw[c].title;

				let imageCaption = document.createElement('p');
				imageCaption.innerHTML = itemRaw[c].caption;

				let imageBox = document.createElement('div');
				imageBox.style.backgroundImage = "url('uploads/"+itemRaw[c].src+"')";
				imageBox.classList.add("thumbnail");
				imageBox.appendChild(document.createElement("div"));

				//Setup links for each image to show full details
				imageDIV.addEventListener("click", function () {
					//Load the modal for the selected image
					select_single(itemRaw[c].id);
				});

				//Dump the link in the gallery
				imageDIV.appendChild(imageBox);
				imageDIV.appendChild(imageTitle);
				imageDIV.appendChild(imageCaption);

				gallery.appendChild(imageDIV);

			}
        }
	};
	xhr.send(formData);
};
//Init
select_images();
