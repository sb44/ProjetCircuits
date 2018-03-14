<?php
class Connexion{
	private $serveur;
	private $usager;
	private $motPasse;
	private $baseDonnees;
	private $connexion;
	
	function __construct($serveur, $usager, $motPasse, $baseDonnees){
		$this->serveur=$serveur;
		$this->usager=$usager;
		$this->motPasse=$motPasse;
		$this->baseDonnees=$baseDonnees;
	}
	
	function getConnexion(){
		return $this->connexion;
	}
	
	function connecter(){
	   try {
		  $dns = "mysql:host=$this->serveur;dbname=$this->baseDonnees";
		  $options = array(
			PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
		  );
		  $this->connexion = new PDO( $dns, $this->usager, $this->motPasse, $options );
		} catch ( Exception $e ) {
			//echo $e->getMessage();
			echo "Probleme de connexion au serveur de bd";
			exit();
		}
	}
	
	
}
?>