<?php
//First load the DB connection
require_once("db_connect.php");

//This will show errors in the browser if there are some
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($dbi) {
    //Build the SQL query
    $title = $_REQUEST['title'];
    $caption = $_REQUEST['caption'];
    $src= $_REQUEST['src'];
    $userId= $_REQUEST['userId'];

    //This is to make sure the message appears as entered
    $title = htmlentities($title,ENT_QUOTES);
    $caption = htmlentities($caption,ENT_QUOTES);

    $q = "INSERT INTO MMGramIMAGES (title, caption, src, userId) VALUES (?,?,?,?)";

    //This should contain 1 when the line is inserted
    $insertedRows = 0;

    //prepare statement, execute, store_result
    if ($insertStmt = $dbi->prepare($q)) {
        //update bind parameter types & variables as required
        //s=string, i=integer, d=double, b=blob
        $insertStmt->bind_param("sssi", $title, $caption,$src,$userId);
        $insertStmt->execute();
        $insertedRows += $insertStmt->affected_rows;
    } else {
        echo "Error";
    }

    //echo($insertedRows);
    $insertStmt->close();
    $dbi->close();
}
// Return to main page
echo "OK: $insertedRows item added";

?>