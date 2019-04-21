/* Handler for the general User Interface elements
*/


const resetUI = function() {
    if (window.localStorage.getItem("userId")) {
        //We are logged in
        //Hide login and signup forms
        document.getElementById("login").classList.add("hide");
        document.getElementById("signup").classList.add("hide");

        //Show the post section
        document.getElementById("post").classList.remove("hide");

        //Update the greeting with the username
        document.getElementById("greeting").firstElementChild.innerHTML =
            "Welcome " + window.localStorage.getItem("username");
    }
    else {
        //We are a guest
        //Show the login and signup forms
        document.getElementById("login").classList.remove("hide");
        document.getElementById("signup").classList.remove("hide");

        //Hide the post section
        document.getElementById("post").classList.add("hide");

        //Reset the greeting to "Welcome Guest"
        document.getElementById("greeting").firstElementChild.innerHTML = "Welcome Guest";
    }
};

//Initial call
resetUI();



