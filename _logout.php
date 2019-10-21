<?php

$strCookie = 'PHPSESSID=' . $_COOKIE['PHPSESSID'] . '; path=/'; 

unset($_SESSION['verify']);
unset($_SESSION['_token']);

// create curl resource
$ch = curl_init();

// set url
curl_setopt($ch, CURLOPT_URL, REMOTE_SERVER . '/session/logout');
curl_setopt( $ch, CURLOPT_COOKIE, $strCookie ); 

session_write_close();

// $output contains the output string
$output = curl_exec($ch);

// close curl resource to free up system resources
curl_close($ch);

session_destroy();

header("Location: " . HTTP . ORIGIN);