<?php
    $inData = getRequestInfo();
    //{fName:fName,lName:lName,login:loginSign,password:passwordSign};
    $firstName = $inData["fName"];
    $lastName = $inData["lName"];
    $userName = $inData["login"];
    $password = $inData["password"];

	$id = 0;
	

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 	
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
    {
        $stmt = $conn->prepare("INSERT into Users (FirstName,LastName,Login,Password) VALUES(?,?,?,?)");
		$stmt->bind_param("ssss", $firstName, $lastName,$userName,$password);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
    }
    function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>
