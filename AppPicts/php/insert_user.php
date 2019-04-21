<?php
//First load the DB connection
require_once("db_connect.php");

//This will show errors in the browser if there are some
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($dbi) {
    //Build the SQL query
    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];

    $q = "INSERT INTO MMGramUSERS (username, password) VALUES (?,?)";

    //prepare statement, execute, store_result
    if ($insertStmt = $dbi->prepare($q)) {
        //update bind parameter types & variables as required
        //s=string, i=integer, d=double, b=blob
        $insertStmt->bind_param("ss", $username, $password);
        $insertStmt->execute();

            $rArray[] = [
                "id"=>$insertStmt->insert_id,
                "username"=>$username
            ];

        echo json_encode($rArray);

    } else {
        echo "Error";
    }

    //echo($insertedRows);
    $insertStmt->close();
    $dbi->close();
}

?>