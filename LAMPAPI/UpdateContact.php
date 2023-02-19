<?php
	$inData = getRequestInfo();
	
	$contactName = $inData["editName"];
    	$contactPhone =$inData["editPhone"];
    	$contactEmail = $inData["editEmail"];
	$userId = $inData["userId"];
    	$changeId = $inData["cUserID"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("UPDATE Contacts SET Name = ?, Phone = ?, Email=? WHERE userID = ? AND ID = ?");
		$stmt->bind_param("sssss", $contactName, $contactPhone,$contactEmail,$userId,$changeId);
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
