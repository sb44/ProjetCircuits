<?php
	require_once("../includes/modele.inc.php");
	$tabRes=array();

	function enregistrer(){
		global $tabRes;	
 		$prenom=$_POST['inputPrenom'];
		$nom=$_POST['inputNom'];
		$dateNaissance=$_POST['inputDateNaissance'];
		$courriel=$_POST['inputCourEnr'];
		$mdp=$_POST['inputMotPasseEnr'];
		//$hash = password_hash($mdp, PASSWORD_DEFAULT); 
		try{
  			$requete="SELECT * FROM connexion WHERE courriel = ? ";
			$unModele=new circuitsModele($requete,array($courriel));
			$stmt=$unModele->executer();
			//$tabRes['msg']=$stmt->fetch(PDO::FETCH_OBJ);
			
			if($stmt->rowCount() > 0 ){ // si courriel existe
				$tabRes['action']="enregistrer";
				$tabRes['msg']="existe";
			}else{
					$requete=" INSERT INTO connexion VALUES(0,?,?,?) ";
					$unModele=new circuitsModele($requete,array($courriel,$mdp,"utilisateur"));
					$unModele->executer();
 					$lasId=$unModele->LAST_ID;
					$requete="INSERT INTO utilisateur VALUES(0,?,?,?,?)";
					$unModele=new circuitsModele($requete,array($nom,$prenom,$dateNaissance,$lasId));
					$stmt=$unModele->executer();
					$tabRes['action']="enregistrer";
					$tabRes['msg']="ok";
			} 
		}catch(Exception $e){
			$tabRes['action']="enregistrer";
			$tabRes['msg']="erreur";
		}finally{
			unset($unModele);
		}
	}
	function connecter(){
		global $tabRes;	
 		$courriel=$_POST['inputCourConn'];
		$mdp=$_POST['inputMotPasseConn'];
		//$hash = password_hash($mdp, PASSWORD_DEFAULT); 
		try{
			$requete="SELECT * FROM connexion WHERE courriel = ? ";
			$unModele=new circuitsModele($requete,array($courriel));
			$stmt=$unModele->executer();
			$tabRes['action']="connecter";
			//$tabRes['msg']=$stmt->fetch(PDO::FETCH_OBJ);
			
			 if($stmt->rowCount() > 0){ // si courriel existe
				$ligne=$stmt->fetch(PDO::FETCH_OBJ);
				$mdpDB=$ligne->motDePasse;
				$roleDB=$ligne->role;
				$idConnexion=$ligne->idConnexion;

				if ($mdpDB == $mdp) {
					$tabRes['msg']="ok";
					$_SESSION['idConnexion']=$idConnexion;
					$_SESSION['courriel']=$courriel;
					
					$requete="SELECT idUtilisateur FROM utilisateur WHERE idConnexion = ? ";
					$unModele=new circuitsModele($requete,array($idConnexion));
					$stmt=$unModele->executer();
					$ligne=$stmt->fetch(PDO::FETCH_OBJ);
					$idUtilisateur=$ligne->idUtilisateur;
					$_SESSION['idUtilisateur']=$idUtilisateur;
					
					if ($roleDB == 'utilisateur') {
						$tabRes['role']="utilisateur";
						$_SESSION['role']="utilisateur";
					} else {
						$tabRes['role']="admin";
						$_SESSION['role']="admin";
					} 
				} else {
					$tabRes['msg']="mdpIncorrecte";
				}
			}else{
					$tabRes['msg']="nonInscrit";
			} 
		}catch(Exception $e){
			$tabRes['msg']="erreur";
		}finally{
			unset($unModele);
		}
	}
/* 	function lister(){
		global $tabRes;
		$tabRes['action']="lister";
		$requete="SELECT * FROM films";
		try{
			 $unModele=new filmsModele($requete,array());
			 $stmt=$unModele->executer();
			 $tabRes['listeFilms']=array();
			 while($ligne=$stmt->fetch(PDO::FETCH_OBJ)){
			    $tabRes['listeFilms'][]=$ligne;
			}
		}catch(Exception $e){
		}finally{
			unset($unModele);
		}
	}
	
	function enlever(){
		global $tabRes;	
		$idf=$_POST['numE'];
		try{
			$requete="SELECT * FROM films WHERE idf=?";
			$unModele=new filmsModele($requete,array($idf));
			$stmt=$unModele->executer();
			if ($ligne=$stmt->fetch(PDO::FETCH_OBJ)) { //si le film existe, la on le supprime, puisque la requete DELEE FROM nous n'informera pas de ça en MYSQL
				$unModele->enleverFichier("pochettes",$ligne->pochette); //on supprime la pochette
				$requete="DELETE FROM films WHERE idf=?";
				$unModele=new filmsModele($requete,array($idf));
				$stmt=$unModele->executer();
				$tabRes['action']="enlever";
				$tabRes['msg']="Film ".$idf." bien enleve";
			}
			else {
				$tabRes['action']="enlever";
				$tabRes['msg']="Film ".$idf." introuvable";
			}
		}catch(Exception $e){
		}finally{
			unset($unModele);
		}
	} */
	
	function monProfile(){
		global $tabRes;
		$tabRes['action']="monProfile";
		if (isset($_SESSION['role'])) {
			if ($_SESSION['role']=="admin") {
				
				$requete="SELECT courriel FROM connexion WHERE idConnexion = ? ";
				$unModele=new circuitsModele($requete,array($id));
				$stmt=$unModele->executer();
				$ligne=$stmt->fetch(PDO::FETCH_OBJ);
				$tabRes['courriel']=$ligne->courriel;

			} else {
				$tabRes['msg']="vous n'êtes pas autorisé";
			}
			
			$id=$_SESSION['idConnexion'];
			$tabRes['msg']="ok";
			try{
				$requete="SELECT * FROM utilisateur WHERE idConnexion = ? ";
				$unModele=new circuitsModele($requete,array($id));
				$stmt=$unModele->executer();
				$ligne=$stmt->fetch(PDO::FETCH_OBJ);
				$tabRes['utilisateurs']=array();
				$tabRes['utilisateurs']=$ligne;
			}catch(Exception $e){
			}finally{
				unset($unModele);
			}
		}else{
			$tabRes['msg']="nonTrouve";
		}
	}
	function lister(){
		global $tabRes;
		$tabRes['action']="liste";
		if (isset($_SESSION['idConnexion'])) {
			$id=$_SESSION['idConnexion'];
			$tabRes['msg']="ok";
			
			try{
				$requete="SELECT courriel FROM connexion WHERE idConnexion = ? ";
				$unModele=new circuitsModele($requete,array($id));
				$stmt=$unModele->executer();
				$ligne=$stmt->fetch(PDO::FETCH_OBJ);
				$tabRes['courriel']=$ligne->courriel;
				
				$requete="SELECT * FROM utilisateur WHERE idConnexion = ? ";
				$unModele=new circuitsModele($requete,array($id));
				$stmt=$unModele->executer();
				$ligne=$stmt->fetch(PDO::FETCH_OBJ);
				$tabRes['utilisateurs']=array();
				$tabRes['utilisateurs']=$ligne;
			}catch(Exception $e){
			}finally{
				unset($unModele);
			}
		}else{
			$tabRes['msg']="nonTrouve";
		}
	}


	function deconnecter(){
		global $tabRes;
		$tabRes['action']="deconnecter";
		if (isset($_SESSION['idConnexion'])) {
			$_SESSION['idConnexion']=="";
			$_SESSION['courriel']=="";
			$_SESSION['idUtilisateur']="";
			
			session_unset();
			$tabRes['msg']="ok";
		}else{
			$tabRes['msg']="non";
		}
	}
	
/* 	function modifier(){
		global $tabRes;	
		$titre=$_POST['titreF'];
		$duree=$_POST['dureeF'];
		$res=$_POST['resF'];
		$idf=$_POST['idf']; 
		try{
			//Recuperer ancienne pochette
			$requette="SELECT pochette FROM films WHERE idf=?";
			$unModele=new filmsModele($requette,array($idf));
			$stmt=$unModele->executer();
			$ligne=$stmt->fetch(PDO::FETCH_OBJ);
			$anciennePochette=$ligne->pochette;
			$pochette=$unModele->verserFichier("pochettes", "pochette",$anciennePochette,$titre);	
			
			$requete="UPDATE films SET titre=?,duree=?, res=?, pochette=? WHERE idf=?";
			$unModele=new filmsModele($requete,array($titre,$duree,$res,$pochette,$idf));
			$stmt=$unModele->executer();
			$tabRes['action']="modifier";
			$tabRes['msg']="Film $idf bien modifie";
		}catch(Exception $e){
		}finally{
			unset($unModele);
		}
	} */
	//******************************************************
	//Contr�leur
	$action=$_POST['action'];
	session_start ();
	switch($action){
		case "enregistrer" :
			enregistrer();
		break;
		case "connecter" :
			connecter();
		break;
		case "monProfile" :
			monProfile();
		break;
		case "deconnecter" :
			deconnecter();
		break;
		case "liste" :
			lister();
		break;
	}
    echo json_encode($tabRes); // json_encode --> Retourne la représentation JSON d'une valeur 
?>