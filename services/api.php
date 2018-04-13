<?php
require_once("REST.inc.php");
/* Exemples d'Utilisation en local de tout les méthodes: 

http://localhost/Circuit/ProjetCircuits/services/circuits          // Tous les circuits
http://localhost/Circuit/ProjetCircuits/services/trouvercircuit/3  // Un circuit en particulier 
http://localhost/Circuit/ProjetCircuits/services/groupes 		   // Tous les groupes	
http://localhost/Circuit/ProjetCircuits/services/trouvergroupe/3   // Un groupe en particulier

/* Exemples d'Utilisation serveur de tout les méthodes:

https://touristia.000webhostapp.com/services/circuits          // Tous les circuits
https://touristia.000webhostapp.com/services/trouvercircuit/3  // Un circuit en particulier 
https://touristia.000webhostapp.com/services/groupes 		   // Tous les groupes	
https://touristia.000webhostapp.com/services/trouvergroupe/3   // Un groupe en particulier

*/

class CircuitAPI extends REST {

	public $donnees = "";
	
	private $SERVEUR = "";
	private $USAGER = "";
	private $PASS = "";
	private $BD = ""; // NOM DE BD

	private $bd = NULL;
	private $connexion = NULL;
	public function __construct(){
		parent::__construct();				
		$this->dbConnect();					
	}
	
	private function dbConnect(){
		
		if ($_SERVER['REMOTE_ADDR']=='127.0.0.1' || $_SERVER['REMOTE_ADDR']=="::1") { 
			//pour local
			$this->SERVEUR = "127.0.0.1";
			$this->USAGER = "root";
			$this->PASS = "";
			$this->BD = "circuit";
		} else {
			//serveur 000webhost
			$this->SERVEUR = "localhost";
			$this->USAGER = "id5166593_root";
			$this->PASS = "12345678";
			$this->BD = "id5166593_circuitvoyage";
		}
		$this->connexion = new mysqli($this->SERVEUR, $this->USAGER, $this->PASS, $this->BD);
		mysqli_set_charset($this->connexion, 'utf8'); //ajout SB
	}
	
	//Dynamiquemment appelle la méthode selon le string du URI
	
	public function processApi(){
		$params="";
		$listeParams = explode('/',$_REQUEST['param']); // $_REQUEST est Un tableau associatif qui contient par défaut le contenu des variables $_GET, $_POST et $_COOKIE
		$demande=$listeParams[0]; //action
		if(isset($listeParams[1])){//élément Enlever-Dossier-Maj
			$params=$listeParams[1];
		}
		if((int)method_exists($this,$demande) > 0) // Vérifie si la méthode $demande (donnée par le contenu de la variable)existe dans notre classe pour l’objet courant $this.
			$this->$demande($params);//action dans URI qui est le nom de la fonction a appeller
		else
			$this->response('',404); // Fonction n'existe pas alors "Page not found".
	}

	private function circuits(){	
		if($this->get_request_method() != "GET"){
			$this->response('',406);
		}
		$requete="SELECT circuit.idCircuit, circuit.nom AS nomCircuit, circuit.description, circuit.capacite, circuit.urlImage, circuit.prix, theme.idTheme, theme.nom AS nomTheme, theme.iconUrl, circuit.latitude, circuit.longitude FROM circuit, theme WHERE circuit.idTheme = theme.idTheme AND circuit.enVigueur = 1";
		try{
			$listeCircuits = $this->connexion->query($requete);
			if($listeCircuits->num_rows > 0){
				$tab = array();
				while($ligne = $listeCircuits->fetch_object()){
					$ligne->urlImage = "pochettes/".$ligne->urlImage;
					//if (strlen($ligne->titre)>28)
						//$ligne->titre = substr($ligne->titre,0,28)."...";
					$tab[] = $ligne;
				}
				mysqli_free_result($listeCircuits);
				$this->response($this->json($tab), 200); // envoi des données
			}else
				$this->response('',204);	// Si aucun "No Content" status
		}catch (Exception $e){
			$this->response('',500);    //Gros probleme
		}
	}

	private function trouvercircuit($num) {
		if($this->get_request_method() != "GET"){
			$this->response('',406);
		}
		try{
			$requete="SELECT circuit.idCircuit, circuit.nom AS nomCircuit, circuit.description, circuit.capacite, circuit.urlImage, circuit.prix, theme.idTheme, theme.nom AS nomTheme, theme.iconUrl, circuit.latitude, circuit.longitude FROM circuit, theme WHERE circuit.idTheme = theme.idTheme AND circuit.enVigueur = 1 AND circuit.idCircuit=?";
			$stmt = $this->connexion->prepare($requete);
			$stmt->bind_param("i", $num);
			$stmt->execute();
			$result = $stmt->get_result();
			if($ligne = $result->fetch_object()){
			  	$tab[] = $ligne;
				$this->response($this->json($tab),200); //OK
			}
			else
				$this->response('',204);	// "No Content" status 
		}catch(Exception $e){
			$this->response('',500);    //Gros probleme
		}
	}

	private function groupes() {
		if($this->get_request_method() != "GET"){
			$this->response('',406);
		}
		$requete="SELECT g.idGroupeVoyage, g.nbInscrit, g.dateDepart, g.dateRetour, c.nom, g.idpromotion, g.capacite, g.prixAdulte, g.prixEnfant, g.prixBebe FROM groupevoyage g, circuit c WHERE g.idCircuit = c.idCircuit ORDER BY idGroupeVoyage DESC";
		try {
			$listeCircuits = $this->connexion->query($requete);
			if($listeCircuits->num_rows > 0){
				$tab = array();
				while($ligne = $listeCircuits->fetch_object()){
					//$ligne->urlImage = "pochettes/".$ligne->urlImage;
					//if (strlen($ligne->titre)>28)
						//$ligne->titre = substr($ligne->titre,0,28)."...";
					$tab[] = $ligne;
				}
				mysqli_free_result($listeCircuits);
				$this->response($this->json($tab), 200); // envoi des données
			}else
				$this->response('',204);	// Si aucun "No Content" status
		}catch (Exception $e){
			$this->response('',500);    //Gros probleme
		}
	}

	private function trouvergroupe($num) {
		if($this->get_request_method() != "GET"){
			$this->response('',406);
		}
		try{
			$requete="SELECT g.idGroupeVoyage, g.nbInscrit, g.dateDepart, g.dateRetour, c.nom, g.idpromotion, g.capacite, g.prixAdulte, g.prixEnfant, g.prixBebe  FROM groupevoyage g, circuit c WHERE g.idCircuit = c.idCircuit AND g.idGroupeVoyage=? ORDER BY idGroupeVoyage DESC";
			$stmt = $this->connexion->prepare($requete);
			$stmt->bind_param("i", $num);
			$stmt->execute();
			$result = $stmt->get_result();
			if($ligne = $result->fetch_object()){
			  	$tab[] = $ligne;
				$this->response($this->json($tab),200); //OK
			}
			else
				$this->response('',204);	// "No Content" status 
		}catch(Exception $e){
			$this->response('',500);    //Gros probleme
		}
	}

	/*
	private function films(){	
		if($this->get_request_method() != "GET"){
			$this->response('',406);
		}
		$requete="SELECT * FROM films";
		try{
			$listeFilms = $this->connexion->query($requete);
			if($listeFilms->num_rows > 0){
				$tab = array();
				while($ligne = $listeFilms->fetch_object()){
					$ligne->pochette = "pochettes/".$ligne->pochette;
					if (strlen($ligne->titre)>28)
						$ligne->titre = substr($ligne->titre,0,28)."...";
					$tab[] = $ligne;
				}
				mysqli_free_result($listeFilms);
				$this->response($this->json($tab), 200); // envoi des données
			}else
				$this->response('',204);	// Si aucun "No Content" status
		}catch (Exception $e){
			$this->response('',500);    //Gros probleme
		}
	}
	
	
	private function ajouter(){
		if($this->get_request_method() != "POST"){
			$this->response('',406);
		}
		if(!empty($_POST)){
			try{
				$titre = $_POST['titre'];
				$duree = $_POST['duree'];
				$dossier="../pochettes/";
				$nomPochette="avatar.jpg";
				if(!empty($_FILES)){
					//Upload de la photo
					$tmp = $_FILES['pochette']['tmp_name'];
					$fichier= $_FILES['pochette']['name'];
					$extension=strrchr($fichier,'.');
					$nomPochette=sha1($titre.time()).$extension;
					@move_uploaded_file($tmp,$dossier.$nomPochette);
					// Enlever le fichier temporaire chargé
					@unlink($tmp); //effacer le fichier temporaire
				}
				$requete="INSERT INTO films VALUES(0,?,?,?)";
				$stmt = $this->connexion->prepare($requete);
				$stmt->bind_param("sis", $titre,$duree,$nomPochette);
				$stmt->execute();
				$etat = array('etat' => "Success", "msg" => "Film ".$this->connexion->insert_id." bien enregistré");
				$this->response($this->json($etat),200); //OK
			}catch(Exception $e){
				$this->response('',500);    //Gros probleme
			}
		}else
			$this->response('',204);	//"No Content" status
	}

private function enlever($num){
		if($this->get_request_method() != "DELETE"){
			$this->response('',406);
		}
		try{
			//Pour touver le nom de la pochette
			$requete="SELECT * FROM films WHERE num=?";
			$stmt = $this->connexion->prepare($requete);
			$stmt->bind_param("i", $num);
			$stmt->execute();
			$result = $stmt->get_result();
			$dossier="../pochettes/";
			if($ligne = $result->fetch_object()){
			  if($ligne->pochette!="avatar.png")
				unlink($dossier.$ligne->pochette);
				$requete="DELETE FROM films WHERE num=?";
				$stmt = $this->connexion->prepare($requete);
				$stmt->bind_param("i", $num);
				$stmt->execute();
				$etat = array('etat' => "Success", "msg" => "Film ".$num." enleve");
				$this->response($this->json($etat),200); //OK
			}
			else
				$this->response('',204);	// "No Content" status 
		}catch(Exception $e){
			$this->response('',500);    //Gros probleme
		}
	}
	
	private function trouver($num){
		if($this->get_request_method() != "GET"){
			$this->response('',406);
		}
		try{
			$requete="SELECT * FROM films WHERE num=?";
			$stmt = $this->connexion->prepare($requete);
			$stmt->bind_param("i", $num);
			$stmt->execute();
			$result = $stmt->get_result();
			if($ligne = $result->fetch_object()){
			  	$tab[] = $ligne;
				$this->response($this->json($tab),200); //OK
			}
			else
				$this->response('',204);	// "No Content" status 
		}catch(Exception $e){
			$this->response('',500);    //Gros probleme
		}
	}
	private function maj(){
		global $connexion;
		if($this->get_request_method() != "PUT"){
			$this->response('',406);
		}
		try{
			$num=$this->_request['numM'];
			$titre=$this->_request['titre'];
			$duree=$this->_request['duree'];
			$dossier="../pochettes/";
			$nomFichier="avatar.jpg";
			if(isset($_FILES) && !empty($_FILES)){
				$etat = array('etat' => "Success", "msg" => $titre."111  ".$duree."  ".$num);
				$requete="SELECT * FROM films WHERE num=?";
				$stmt =$this->connexion->prepare($requete);
				$stmt->bind_param("i", $num);
				$stmt->execute();
				$result = $stmt->get_result();
				if($ligne = $result->fetch_object())
					if ($ligne->pochette!="avatar.jpg")
					     unlink($dossier.$ligne->pochette);
				//Upload de la photo
				$tmp = $_FILES['pochette']['tmp_name'];
				$fichier= $_FILES['pochette']['name'];
				$extension=strrchr($fichier,'.');
				$nomFichier=sha1($titre.time()).$extension;//générer un nom de film
				@move_uploaded_file($tmp,$dossier.$nomFichier);
				// Enlever le fichier temporaire chargé
				@unlink($tmp); //effacer le fichier temporaire
				$requete="UPDATE films set titre=?,duree=?,pochette='$nomFichier' WHERE num=?";
			}
			else
				$requete="UPDATE films set titre=?,duree=? WHERE num=?";
			$stmt = $this->connexion->prepare($requete);
			$stmt->bind_param("sii",$titre,$duree,$num);
			$stmt->execute();
			$etat = array('etat' => "Success", "msg" => "Film ".$num." modifie");
			$this->response($this->json($etat),200); //OK
		}catch(Exception $e){
			$this->response('',500);    //Gros probleme
		} 
}
*/
	//Encoder array en JSON
	private function json($data){
		if(is_array($data)){
			return json_encode($data);
		}
	}
}

// Initialiser le API
$api = new CircuitAPI;
$api->processApi();
?>