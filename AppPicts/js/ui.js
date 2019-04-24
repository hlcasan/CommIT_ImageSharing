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
            
        let logout = document.createElement("div");
        logout.classList.add("logout");
        logout.innerHTML = "logout";
        logout.addEventListener("click", function () {
        	window.localStorage.removeItem("userId");
        	window.localStorage.removeItem("username");
        	window.location.href = "index.html";
        })
        document.getElementById("greeting").appendChild(logout);
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
    
    //Refresh the gallery
    select_images();
};

//Initial call
resetUI();



