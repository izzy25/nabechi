<?php

$strCookie = 'PHPSESSID=' . $_COOKIE['PHPSESSID'] . '; path=/'; 

if(!empty($_SESSION['verify'])){

    // create curl resource
    $ch = curl_init();

    // set url
    curl_setopt($ch, CURLOPT_URL, REMOTE_SERVER . '/session/' . $_SESSION['verify']);
    curl_setopt( $ch, CURLOPT_COOKIE, $strCookie ); 

    //return the transfer as a string
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    session_write_close();

    // $output contains the output string
    $output = curl_exec($ch);

    // close curl resource to free up system resources
    curl_close($ch);

    $parse = json_decode($output, true);

    if($parse == 100 || $parse == 50){

        

    }else{

        header("Location: " . HTTP . ORIGIN . '/login?y=false');

    }

}else{

    if(!empty($_POST)){

        // create curl resource
        $ch = curl_init();
    
        // set url
        curl_setopt($ch, CURLOPT_URL, REMOTE_SERVER . '/session');
        curl_setopt( $ch, CURLOPT_COOKIE, $strCookie ); 
    
        //return the transfer as a string
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $_POST);

        session_write_close();
    
        // $output contains the output string
        $output = curl_exec($ch);
    
        // close curl resource to free up system resources
        curl_close($ch);
    
        $parse = json_decode($output, true);
    
        if($output !== null && isset($parse['verification'])){
            session_start();
    
            $_SESSION['verify'] = $parse['verification'];
    
            header("Location: " . HTTP . ORIGIN . '/admin?y=true');
        }else{
            header("Location: " . HTTP . ORIGIN . '/login?y=false');
        }
    
    }else{

        header("Location: " . HTTP . ORIGIN . '/login?y=false');

    }

}