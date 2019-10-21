<?php

$strCookie = 'PHPSESSID=' . $_COOKIE['PHPSESSID'] . '; path=/'; 

// create curl resource
$ch = curl_init();

// set url
curl_setopt($ch, CURLOPT_URL, REMOTE_SERVER . '/token');

//return the transfer as a string
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt( $ch, CURLOPT_COOKIE, $strCookie ); 

session_write_close();

// $output contains the output string
$output = curl_exec($ch);

// close curl resource to free up system resources
curl_close($ch);

$_SESSION['_token'] = $output;