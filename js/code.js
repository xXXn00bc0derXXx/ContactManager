const urlBase = 'http://159.223.96.127/';
const extension = 'php';

let userId = 0;
let changeUserID = 0;
let firstName = "";
let lastName = "";
let darkModeOn = 0;
let editCache = [];
let editCookie = "";

function isDarkModeOn() {
	if (darkModeOn == 1) {
		document.getElementById("darkMode").click();
		darkModeOn = 1;
	}
	else {
		darkModeOn = 0;
	}
}
function darkMode() {
	let element1 = document.body;
	element1.classList.toggle("dark-mode");
	let element2;

	var path = window.location.pathname;
	var page = path.split("/").pop();
	if (page == "contact.html") {
		element2 = document.getElementById("searchText");
		element2.classList.toggle("inputDarkMode");
		element2 = document.getElementById("contactName");
		element2.classList.toggle("inputDarkMode");
		element2 = document.getElementById("contactPhone");
		element2.classList.toggle("inputDarkMode");
		element2 = document.getElementById("contactEmail");
		element2.classList.toggle("inputDarkMode");
	}
	else if (page == "index.html") {
		element2 = document.getElementById("loginName");
		element2.classList.toggle("inputDarkMode");
		element2 = document.getElementById("loginPassword");
		element2.classList.toggle("inputDarkMode");
		console.log("hey");
		element2 = document.getElementById("imgSeparator");
		element2.classList.toggle("imgSeparatorDarkMode");
		console.log("yo");
		element2 = document.getElementById("cancelContainer");
		element2.classList.toggle("cancelContainerDarkMode");
		console.log("yuh");
	}
	else if (page == "signUp.html") {
		element2 = document.getElementById("firstNameSign");
		element2.classList.toggle("inputDarkMode");
		element2 = document.getElementById("lastNameSign");
		element2.classList.toggle("inputDarkMode");
		element2 = document.getElementById("loginSign");
		element2.classList.toggle("inputDarkMode");
		element2 = document.getElementById("loginPasswordSign");
		element2.classList.toggle("inputDarkMode");
		element2 = document.getElementById("imgSeparator");
		element2.classList.toggle("imgSeparatorDarkMode");
		element2 = document.getElementById("cancelContainer");
		element2.classList.toggle("cancelContainerDarkMode");
	}
	else if (page == "edit.html") {
		element2 = document.getElementById("editName");
		element2.classList.toggle("inputDarkMode");
		element2 = document.getElementById("editPhone");
		element2.classList.toggle("inputDarkMode");
		element2 = document.getElementById("editEmail");
		element2.classList.toggle("inputDarkMode");
	}
	if (darkModeOn == 0) {
		darkModeOn = 1;
	}
	else if (darkModeOn == 1) {
		darkModeOn = 0;
	}
}

function deleteContact(deleteParam)
{
	let tmp = {userId:userId,deleteID:deleteParam};
	let jsonPayload = JSON.stringify(tmp);
	let url = urlBase + 'LAMPAPI/DeleteContact.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}
}
function editContact()
{
	/*  <input type="text" id="editName" placeholder="Contact Name">
    	<input type="text" id="editPhone" placeholder="Contact Phone">
    	<input type="text" id="editEmail" placeholder="E-mail"> 
	*/
	let eName = document.getElementById("editName").value;
	let ePhone = document.getElementById("editPhone").value;
	let eEmail = document.getElementById("editEmail").value;
	changeUserID = Number(localStorage.getItem("cId"));
	let tmp = {cUserID:changeUserID, userId:userId, editName:eName, editPhone:ePhone,editEmail:eEmail};

	let jsonPayload = JSON.stringify(tmp);
	let url = urlBase + 'LAMPAPI/UpdateContact.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				//document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		window.location.href ="contact.html";
		xhr.send(jsonPayload);
		//window.location.href= "contact.html";
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
		window.location.href = "contact.html";
	}
}
function goToEdit(updateParam)
{
	window.location.href = "edit.html";
	localStorage.setItem("cId", JSON.stringify(updateParam));
}
function editCacheCookie(i)
{
	editCookie = editCache[i];
	saveCookie();
}
function inputEditData()
{
	let i = 0;
	console.log(editCookie);
	let tmp = editCookie.split(" ");
	console.log(tmp);
	while (i < tmp.length) {
		if (tmp[i] === "") {
			tmp.splice(i, 1);
		}
		else {
			++i;
		}
	}
	console.log(tmp);
	let element1 = document.getElementById("editEmail");
	if(tmp.length >= 3) {
		element1.value = tmp.pop();
        element1 = document.getElementById("editPhone");
		element1.value = tmp.pop();
	}
	element1 = document.getElementById("editName");
	let tmp2 = "";
	for (let i = 0; i < tmp.length; i++)
	{
		tmp2 += tmp[i];
		if (i + 1 < tmp.length) {
			tmp2 += " ";
		}
	}
	element1.value = tmp2;
}
function searchContact()
{
	let srch = document.getElementById("searchText").value;
	document.getElementById("colorSearchResult").innerHTML = "";
	document.getElementById("colorList").innerHTML = "";
	let colorList = "";

	let tmp = {search:srch,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + 'LAMPAPI/SearchContact.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					colorList += jsonObject.results[i] + " <button type='button' onclick = 'editCacheCookie("+Number(i)+");goToEdit("+Number(jsonObject.id[i])+");'>Edit</button> <button type='button' onclick = 'deleteContact("+Number(jsonObject.id[i])+")'>Delete</button>";
					editCache[i] = jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						colorList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}
}

function addContact()
{
	/*contactName" placeholder="Contact Name">
    	<input type="text" id="contactPhone" placeholder="Contact Phone">
    	//<input type="text" id="contactEmail*/
	let newName = document.getElementById("contactName").value;
	let newPhone = document.getElementById("contactPhone").value;
	let newEmail = document.getElementById("contactEmail").value;
	document.getElementById("colorAddResult").innerHTML = "";

	//let tmp = {color:newColor,userId,userId};
	let tmp = {contactName:newName,contactPhone:newPhone,contactEmail:newEmail,userId:userId}
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + 'LAMPAPI/AddContact.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}
}
function doSignUp(){
	userId = 0;
	firstName = "";
	lastName = "";
	
	let fName = document.getElementById("firstNameSign").value;
	let lName = document.getElementById("lastNameSign").value;
	let loginSign = document.getElementById("loginSign").value;
	let passwordSign = document.getElementById("loginPasswordSign").value;

//	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

	let tmp = {fName:fName,lName:lName,login:loginSign,password:passwordSign};
//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + 'LAMPAPI/SignUp.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;

				if( userId < 1 )
				{
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}

				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();

				window.location.href = "contact.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
}

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	let login = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;
//	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

	let tmp = {login:login,password:password};
//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + 'LAMPAPI/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "contact.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}
function readDMCookie()
{
    let data = document.cookie;
    let splits = data.split(",");
    for(var i = 0; i < splits.length; i++)
        {
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "darkMode" )
		{
			darkModeOn = parseInt(tokens[1].trim());
		}
	}
}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "darkMode=" + darkModeOn + ",firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ",changeUserID= " + changeUserID + ",editCookie=" + editCookie + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
		else if( tokens[0] == "darkMode" )
		{
			darkModeOn = parseInt( tokens[1].trim() );
		}
		else if(tokens[0] == "editCookie")
		{
			editCookie = tokens[1];
		}
		/*else if(tokens[0] == "changeUserID")
		{
			changeUserID = parseInt( tokens[1].trim() );
		}
		*/
	}
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	darkModeOn = 0;
	editCookie = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	document.cookie = "darkMode= 0; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addColor()
{
	let newColor = document.getElementById("colorText").value;
	document.getElementById("colorAddResult").innerHTML = "";

	let tmp = {color:newColor,userId,userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + 'LAMPAPI/AddColor.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}
	
}

function searchColor()
{
	let srch = document.getElementById("searchText").value;
	document.getElementById("colorSearchResult").innerHTML = "";
	
	let colorList = "";

	let tmp = {search:srch,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + 'LAMPAPI/SearchColors.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					colorList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						colorList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}
	
}
