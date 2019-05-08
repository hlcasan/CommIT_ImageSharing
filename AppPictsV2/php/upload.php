<?php
//This script handles the upload of images to the server

//The folder where files will be saved
//This folder has to have the right permissions: 757
$store = '/uploads/';

//If we have a file...
if (!empty($_FILES)) {

    //The file we are collecting from the JS (Dropzone)
    $tempFile = $_FILES['file']['tmp_name'];

    //Cleanup the file name: remove spaces, remove dots (except the last one)
    $newFile = preg_replace("/\s/","",$_FILES['file']['name']);
    $newFile = preg_replace("/\.(?=.*\.)/","",$newFile);
    
    $newFile = rand() . "_" . $newFile;

    //The name and location of the file to save on the server
    $targetFile =  dirname(dirname( __FILE__ )) . $store . $newFile;

    //Move the file where we want it
    move_uploaded_file($tempFile,$targetFile);

    echo $newFile;
}
?>