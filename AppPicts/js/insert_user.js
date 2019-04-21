/* Handler to add a new account, or sign up
	Calls insert_user.php to dump user in DB
*/


var insert_user = function() {
    //The form in the HTML
    const addForm = document.getElementById("signupForm");

    //Will contain the raw data from the DB
    let itemRaw = [];

    //When the user submits the form (clicks the button)
    addForm.addEventListener('submit', function (event) {
        event.preventDefault();

        //This is the backend file inserting in the DB
        const php = "php/insert_user.php";

        //This is what we send to the server for the PHP file
        const xhr = new XMLHttpRequest();
        let formData = new FormData(addForm);

        //Connect to the PHP
        xhr.open("POST", php, true);
        xhr.onreadystatechange = function () {
            console.log('readyState: ' + xhr.readyState);
            console.log('status: ' + xhr.status);
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Everything ok, get the response
                //console.log(xhr.responseText);

                itemRaw = JSON.parse(xhr.responseText);

                console.log("inserted user: "+itemRaw[0].id);

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
insert_user();
