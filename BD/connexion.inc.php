<?php
	define("USAGER","root");
	define("PASSE","");
	try {
	  $dns = 'mysql:host=localhost;dbname=h18bdfilms';
	  $options = array(
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
	  );
	  $connexion = new PDO( $dns, USAGER, PASSE, $options );
	} catch ( Exception $e ) {
	    //echo $e->getMessage();
		echo "Probleme de connexion au serveur de bd";
		exit();
	}
?>