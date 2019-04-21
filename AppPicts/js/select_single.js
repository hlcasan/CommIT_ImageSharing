/* Handler for the display of a single image inside a modal
*/

var select_single = function (imageId) {

	//This is the backend file connecting to the DB
	const php = "php/select_single.php";

	//Handles the server call to the PHP file and the data we get back
	const xhr = new XMLHttpRequest();

	//Prepare form data to select the right image
	let formData = new FormData();
	formData.append("userId",window.localStorage.getItem("userId"));
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
            //console.log(xhr.responseText);
			itemRaw = JSON.parse(xhr.responseText);
			//console.log(itemRaw); // print response

			//Prepare the modal
			let modal = document.createElement("div");
			modal.classList.add("modal");
			modal.id = "modal";

			//Prepare the close button
			let close = document.createElement("div");
			close.innerHTML = "<i class='far fa-times-circle'></i>"; //Uses FontAwesome library
			close.classList.add("closeBttn");
			close.addEventListener("click", function(e) {
				modal.parentNode.removeChild(modal);
			});


			//Prepare the image section
			let imageSECTION = document.createElement('section');

			let imageTitle = document.createElement('h4');
			imageTitle.innerHTML = itemRaw[0].title;

			let imageCaption = document.createElement('p');
			imageCaption.innerHTML = itemRaw[0].caption;

			let imageTag = document.createElement('img');
			imageTag.src = "uploads/"+itemRaw[0].src;

			//Drop image elements in the image section
			imageSECTION.appendChild(imageTag);
			imageSECTION.appendChild(imageTitle);
			imageSECTION.appendChild(imageCaption);


			//Prepare the messages section
			let commentsSECTION = document.createElement('section');

			//Prepare list of comments
			let commentsContainer = document.createElement("div");

			commentsSECTION.appendChild(commentsContainer);

			//Call the function to get the list of comments >> select_comments.js
			select_comments(imageId,commentsContainer);

			//Prepare the form IF user is logged in
			if (window.localStorage.getItem("userId")) {

				let formContainer = document.createElement("div");
				formContainer.setAttribute("id","addCommentSection");

				let commentForm = document.createElement('form');
				commentForm.setAttribute("id","commentForm");

				let commentContent = document.createElement("textarea");
				commentContent.setAttribute("name","content")

				let commentSubmit = document.createElement("input");
				commentSubmit.setAttribute("type","submit");
				commentSubmit.setAttribute("value","Send");

				commentForm.appendChild(commentContent);

				commentForm.appendChild(commentSubmit);
				formContainer.appendChild(commentForm);
				commentsSECTION.appendChild(formContainer);

				//call the function to handle the form >> insert_comment.js
				insert_comment(imageId,commentForm);

			}

			//Drop the sections (and the close button) in the modal
			modal.appendChild(imageSECTION);
			modal.appendChild(commentsSECTION);
			modal.appendChild(close);


			//Drop the modal in the document
			document.body.appendChild(modal);

		}
	};
	xhr.send(formData);
};


