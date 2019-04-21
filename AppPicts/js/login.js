/* Handler for log in
	Checks with the DB through login.php
	Sets the localstorage values for userId and username
*/


const login = function() {
    //The form in the HTML
    const loginForm = document.getElementById("loginForm");

    //Will contain the raw data from the DB
    let itemRaw = [];

    //When the user submits the form (clicks the button)
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        //This is the backend file inserting in the DB
        const php = "php/login.php";

        //This is what we send to the server for the PHP file
        const xhr = new XMLHttpRequest();
        let formData = new FormData(loginForm);

        //Connect to the PHP
        xhr.open("POST", php, true);
        xhr.onreadystatechange = function () {
            //console.log('readyState: ' + xhr.readyState);
            //console.log('status: ' + xhr.status);
            if (xhr.readyState == 4 && xhr.status == 200) {
                itemRaw = JSON.parse(xhr.responseText);

                //Get the user details
                itemRaw = JSON.parse(xhr.responseText);
                //console.log(itemRaw); // print response

                //Set the local storage
                window.localStorage.setItem('userId',itemRaw[0].id);
                window.localStorage.setItem('username',itemRaw[0].username);

                //Update the UI
                resetUI();
            }
        };
        xhr.send(formData);

    });
};
//Init
login();
