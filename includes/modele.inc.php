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

	if ($_SERVER['REMOTE_ADDR']=='127.0.0.1' || $_SERVER['REMOTE_ADDR']=="::1") { 
		// pour serveur local dev
		$maConnexion = new Connexion("localhost", "root", "", "circuit");
	} else { 
		// pour serveur production
		$maConnexion = new Connexion("localhost", "id5166593_root", "12345678", "id5166593_circuitvoyage");
	}
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

/* Classe pour transaction

   Pour bien utiliser cette classe, on doit, dans respecter cette convention dans le controleur externe :
    - pour les Insert de même entité, utiliser le format pour requete...
	   requete[] = "('INSERT INTO foo VALUES(0, ?, ?, ?), (0, ?, ?, ?), (0, ?, ?, ?)')";
	- nommer dans nos params notre clé étrangère "FK"...
	   params[]  = array($des, $rabaisAdulte, "FK")
	
	Limites d'utilisation, une seule FK est possible par requête
*/
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
	if ($_SERVER['REMOTE_ADDR']=='127.0.0.1' || $_SERVER['REMOTE_ADDR']=="::1") { 
		// pour serveur local dev
		$maConnexion = new Connexion("localhost", "root", "", "circuit");
	} else { 
		// pour serveur production
		$maConnexion = new Connexion("localhost", "id5166593_root", "12345678", "id5166593_circuitvoyage");
	}
	$maConnexion->connecter();
	return $maConnexion->getConnexion();
}
function executer(){
	$this->connexion = $this->obtenirConnexion(); // connexion

	try {
		$this->connexion->beginTransaction();

		// Exécution de plusieurs requêtes
		$length = sizeof($this->requete); //nombre de requetes de la transaction
		for ($i=0; $i < $length; $i++) {
			// preparation de la requête i" 
			$stmt = $this->connexion->prepare($this->requete[$i]); 

			// exécution de la requête i
			if (isset($this->params[$i])) {
				// Si Last->ID existe, on présume une clé étrangère à fixer dans la prochaine requête "i" fixé comme paramètre arbitraire préalablement nommé "FK" notre autre contrôleur. 
				if ($this->LAST_ID !== 0) { // https://stackoverflow.com/questions/8668826/search-and-replace-value-in-php-array
					$this->params[$i] = 
						array_replace(
							$this->params[$i],
							array_fill_keys(
								array_keys(
									$this->params[$i], "FK"
								), 
								$this->LAST_ID)
						);
				}
				$stmt->execute($this->params[$i]);
			}	
			else
				$stmt->execute();
				
			// obtention du dernier ID (si insertion)
			if(strpos($this->requete[$i],'INSERT') !== false)
				$this->LAST_ID = $this->connexion->lastInsertId();
			else
				$this->LAST_ID = 0;

		} //fin forloop d'Exécution de plusieurs requêtes

		$this->connexion->commit(); // commit si l'exécution de tout les requêtes est un succès
		$this->deconnecter(); // déconnexion
		return $stmt;   
	} catch(Exception $e) //en cas d'erreur
	{
		$this->connexion->rollback(); //on annule la transation
		//echo 'Tout ne s\'est pas bien passé, voir les erreurs ci-dessous<br />';
		//echo 'Erreur : '.$e->getMessage().'<br />';
		//echo 'N° : '.$e->getCode();

		//on arrête l'exécution s'il y a du code après
		return;
		//exit();
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