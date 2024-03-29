<?php?> 
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Edit Contact</title>
    <meta charset="UTF-8">
    <link rel="shortcut icon" href="img/icons8-phone-50.png" type="image/jpg/png">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" 
    href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/contact.css">
    <script src="https://kit.fontawesome.com/8469c0e6bc.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
    <script type="text/javascript" src="js/code.js"></script>
    <script type="text/javascript">
        document.addEventListener('DOMContentLoaded', function() 
        {
            readCookie();
        }, false);
        function darkMode() {
            let element1 = document.body;
            element1.classList.toggle("dark-mode");
            let element2 = document.getElementById("editName");
            element2.classList.toggle("inputDarkMode");
            element2 = document.getElementById("editPhone");
            element2.classList.toggle("inputDarkMode");
            element2 = document.getElementById("editEmail");
            element2.classList.toggle("inputDarkMode");
        }
    </script>
</head>

<body>
    <h1>Edit Contact</h1>
    <div id="loggedInDiv">
        <span id="userName"></span><br>
        <button type="button" id="logoutButton" class="button" onclick="doLogout();">
            <i class="fa-solid fa-arrow-right-from-bracket fa-lg"></i> &nbsp;Log Out
        </button>
        <div class="switch">
            <label id="sliderLabel">
                <input type="checkbox" id="darkMode" onclick="darkMode()">
                <span class="slider">
                    <div class="darkModeIcons">
                        <div class="moon">
                            <i class="fa-solid fa-moon fa-xl"></i>
                        </div>
                        <div class="sun">
                            <i class="fa-solid fa-sun fa-lg"></i>
                        </div>
                    </div>
                </span>
            </label>
        </div><br>
    </div>
    
    <br id="sliderBreak2">
    <hr id="mobileSep2">
    <label for="editContact" id="editLabel">Edit Contact</label><br>
    <input type="text" id="editName" placeholder="Contact Name">
    <input type="text" id="editPhone" placeholder="Contact Phone">
    <input type="text" id="editEmail" placeholder="E-mail">
    <button type="button" id="addColorButton" class="buttons" onclick="editContact();">
        <i class="fa-solid fa-pen-to-square fa-lg"></i> &nbsp;Update Contact
    </button>
</body>

</html>

