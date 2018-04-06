<?php
require_once("connexion.inc.php");
// classes incluses : circuitsModele , circuitsModeleTransactionnel 
class circuitsModele {
	private $requete;
	private $params;
	private $connexion;
	public $LAST_ID = 0;
	
function __construct($requete=null,$params=null){
	$this->requete=$requete;
	$this->params=$params;
}
	
function obtenirConnexion(){
	$maConnexion = new Connexion("localhost", "root", "", "circuit");
	$maConnexion->connecter();
	return $maConnexion->getConnexion();
}
function executer(){
		$this->connexion = $this->obtenirConnexion(); // connexion
	try {
		$this->connexion->beginTransaction();
		$stmt = $this->connexion->prepare($this->requete);
		$stmt->execute($this->params);
		if(strpos($this->requete,'INSERT') !== false)
			$this->LAST_ID = $this->connexion->lastInsertId();
		
		$this->connexion->commit();
		$this->deconnecter(); // déconnexion
		return $stmt;   
	} catch(Exception $e) //en cas d'erreur
	{
		$this->connexion->rollback(); //on annule la transation
		echo 'Tout ne s\'est pas bien passé, voir les erreurs ci-dessous<br />';
		echo 'Erreur : '.$e->getMessage().'<br />';
		echo 'N° : '.$e->getCode();

		//on arrête l'exécution s'il y a du code après
		exit();
	}
}
/*
function executer(){
		$this->connexion = $this->obtenirConnexion(); // connexion
		$stmt = $this->connexion->prepare($this->requete);
		$stmt->execute($this->params);
		if(strpos($this->requete,'INSERT') !== false)
			$this->LAST_ID = $this->connexion->lastInsertId();
		
		$this->deconnecter(); // déconnexion
		return $stmt;		
	}
*/
function deconnecter(){
		unset($this->connexion);
}
	
// $dossier = nom du dossier sur le serveur qu'on a crée pour stocker les fichiers
// $inputNom = le name donné au formulaire de fichier.. " <input type="file" id="pochette" name="pochette"> "
// $fichierDefault = l'ancienne URL de pochette dans le cas d'un modif OU "avatar.jpg" dans le cas d'une insertion de nouveau film
// $chaine = le titre du film saisie par l'utilisateur
function verserFichier($dossier, $inputNom, $fichierDefaut, $chaine) {
	$dossier="../$dossier/";
	$nomPochette=sha1($chaine.time());
	$pochette=$fichierDefaut;
	if($_FILES[$inputNom]['tmp_name'] !== ""){
		//Upload de la photo
		$tmp = $_FILES[$inputNom]['tmp_name'];
		$fichier = $_FILES[$inputNom]['name'];
		$extension = strrchr($fichier,'.');
		@move_uploaded_file($tmp,$dossier.$nomPochette.$extension);
		// Enlever le fichier temporaire chargé
		@unlink($tmp); //effacer le fichier temporaire
		$pochette=$nomPochette.$extension;
	}
	return $pochette;
}
// $pochette = l'URL de la pochette stocké dans la BD, soit "avatar.jpg" ou autre
function enleverFichier($dossier,$pochette) {
	if($pochette!="avatar.jpg") {
		$rmPoc="../$dossier/".$pochette;
		$tabFichiers = glob("../$dossier/*");
		//print_r($tabFichiers);
		// parcourir les fichier
		foreach($tabFichiers as $fichier){
			if(is_file($fichier) && $fichier==trim($rmPoc)) {
				// enlever le fichier
				unlink($fichier);
				break;
			}
		}
	}
}
}//fin de la classe


class circuitsModeleTran {
	private $requete = array(); // accepte tableau de requete
	private $params = array(); // accepte tableau de paramas
	private $connexion;
	public $LAST_ID = 0;
	
function __construct($requete=null,$params=null){
	$this->requete=$requete;
	$this->params=$params;
}
	
function obtenirConnexion(){
	$maConnexion = new Connexion("localhost", "root", "", "circuit");
	$maConnexion->connecter();
	return $maConnexion->getConnexion();
}
function executer(){
	$this->connexion = $this->obtenirConnexion(); // connexion

	try {
		$this->connexion->beginTransaction();

		$length = sizeof($this->requete);
		
		//exécution de plusieurs requêtes
		for ($i=0; $i < $length; $i++) {
			// prepare de la requête i
			$stmt = $this->connexion->prepare($this->requete[$i]); 

			// exécution de la requête i
			if (isset($this->params[$i]))
				$stmt->execute($this->params[$i]);
			else
				$stmt->execute();	
		}
		$i-=1;
		if(strpos($this->requete[$i],'INSERT') !== false)
			$this->LAST_ID = $this->connexion->lastInsertId();

		$this->connexion->commit();
		$this->deconnecter(); // déconnexion
		return $stmt;   
	} catch(Exception $e) //en cas d'erreur
	{
		$this->connexion->rollback(); //on annule la transation
		echo 'Tout ne s\'est pas bien passé, voir les erreurs ci-dessous<br />';
		echo 'Erreur : '.$e->getMessage().'<br />';
		echo 'N° : '.$e->getCode();

		//on arrête l'exécution s'il y a du code après
		exit();
	}
}
/*
function executer(){
		$this->connexion = $this->obtenirConnexion(); // connexion
		$stmt = $this->connexion->prepare($this->requete);
		$stmt->execute($this->params);
		if(strpos($this->requete,'INSERT') !== false)
			$this->LAST_ID = $this->connexion->lastInsertId();
		
		$this->deconnecter(); // déconnexion
		return $stmt;		
	}
*/
function deconnecter(){
		unset($this->connexion);
}
	
// $dossier = nom du dossier sur le serveur qu'on a crée pour stocker les fichiers
// $inputNom = le name donné au formulaire de fichier.. " <input type="file" id="pochette" name="pochette"> "
// $fichierDefault = l'ancienne URL de pochette dans le cas d'un modif OU "avatar.jpg" dans le cas d'une insertion de nouveau film
// $chaine = le titre du film saisie par l'utilisateur
function verserFichier($dossier, $inputNom, $fichierDefaut, $chaine) {
	$dossier="../$dossier/";
	$nomPochette=sha1($chaine.time());
	$pochette=$fichierDefaut;
	if($_FILES[$inputNom]['tmp_name'] !== ""){
		//Upload de la photo
		$tmp = $_FILES[$inputNom]['tmp_name'];
		$fichier = $_FILES[$inputNom]['name'];
		$extension = strrchr($fichier,'.');
		@move_uploaded_file($tmp,$dossier.$nomPochette.$extension);
		// Enlever le fichier temporaire chargé
		@unlink($tmp); //effacer le fichier temporaire
		$pochette=$nomPochette.$extension;
	}
	return $pochette;
}
// $pochette = l'URL de la pochette stocké dans la BD, soit "avatar.jpg" ou autre
function enleverFichier($dossier,$pochette) {
	if($pochette!="avatar.jpg") {
		$rmPoc="../$dossier/".$pochette;
		$tabFichiers = glob("../$dossier/*");
		//print_r($tabFichiers);
		// parcourir les fichier
		foreach($tabFichiers as $fichier){
			if(is_file($fichier) && $fichier==trim($rmPoc)) {
				// enlever le fichier
				unlink($fichier);
				break;
			}
		}
	}
}
} //fin de classe

?>