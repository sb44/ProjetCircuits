<?php
	require_once("../includes/modele.inc.php");
	use Abraham\TwitterOAuth\TwitterOAuth;
	$tabRes=array();

	function enregistrer(){
		global $tabRes;	
 		$prenom=$_POST['inputPrenom'];
		$nom=$_POST['inputNom'];
		$dateNaissance=$_POST['inputDateNaissance'];
		$courriel=$_POST['inputCourEnr'];
		$mdp=$_POST['inputMotPasseEnr'];
		$hash = password_hash($mdp, PASSWORD_DEFAULT); 
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
					$unModele=new circuitsModele($requete,array($courriel,$hash,"utilisateur"));
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

	//sb. N.B: utilisation modeleTranasctionnel
	function miseAjourProfilUsager() {
		global $tabRes;
		$tabRes['action']="miseAjourProfilUsager";

		$prenom=$_POST['inputPrenomModif'];
		$nom=$_POST['inputNomModif'];
		$dateNaissance=$_POST['inputDateNaissanceModif'];
		$courriel=$_POST['inputCourModif'];
		$idConnexion=$_POST['idConnexionModProf'];
		$idUtilisateur=$_POST['idUsagerModProf'];
		
		if ($_SESSION['idConnexion'] != $idConnexion || $_SESSION['idUtilisateur'] != $idUtilisateur) {
			//validation..
			$tabRes['msg']="erreur";
			return;
		}

		
		$requete = array();
		$params = array();

		$requete[]="UPDATE connexion SET connexion.courriel = ? WHERE connexion.idConnexion = ?";
		$params[] = array($courriel, $idConnexion);

		$requete[]="UPDATE utilisateur SET utilisateur.nom = ?, utilisateur.prenom = ?, utilisateur.dateNaissance = ? WHERE utilisateur.idUtilisateur = ?";
		$params[] = array($nom, $prenom, $dateNaissance, $idUtilisateur);

		$requete[]="SELECT utilisateur.nom, utilisateur.prenom, utilisateur.dateNaissance, connexion.courriel FROM utilisateur, connexion WHERE utilisateur.idConnexion = connexion.idConnexion AND utilisateur.idUtilisateur = ? AND connexion.idConnexion = ?";
		$params[] = array($idUtilisateur, $idConnexion);

		try {
			$unModele=new circuitsModeleTran($requete,$params);
			$stmt=$unModele->executer();
			
			//Validation... dans le tryCatch du modèle, le "try" retourne un OBJET $stmt tandis que le "catch" retourne NULL
			if ($stmt == null) {
				$tabRes['msg']="erreur";
				return;
			}

			if ($ligne=$stmt->fetch(PDO::FETCH_OBJ)){
			   $tabRes['profileUser']=$ligne;
			}

			$tabRes['msg']="ok";
		} catch(Exception $e) {
			$tabRes['msg']="erreur";
		} finally {
			unset($unModele);
		}
	}

	function connecter(){
		global $tabRes;	
 		$courriel=$_POST['inputCourConn'];
		$mdp=$_POST['inputMotPasseConn'];
		$tabRes['action']="connecter";
		try{
			$requete="SELECT * FROM connexion WHERE courriel = ? ";
			$unModele=new circuitsModele($requete,array($courriel));
			$stmt=$unModele->executer();
			//$tabRes['msg']=$stmt->fetch(PDO::FETCH_OBJ);
			
			 if($stmt->rowCount() > 0){ // si courriel existe
				$ligne=$stmt->fetch(PDO::FETCH_OBJ);
				$mdpDB=$ligne->motDePasse;
				$hash=password_verify($mdp,$mdpDB);
				$roleDB=$ligne->role;
				$idConnexion=$ligne->idConnexion;

				if ($hash) {
					$tabRes['msg']="ok";
					$_SESSION['idConnexion']=$idConnexion;
					$_SESSION['courriel']=$courriel;
					
					$requete="SELECT * FROM utilisateur WHERE idConnexion = ? ";
					$unModele=new circuitsModele($requete,array($idConnexion));
					$stmt=$unModele->executer();
					$ligne=$stmt->fetch(PDO::FETCH_OBJ);
					$idUtilisateur=$ligne->idUtilisateur;
					$nomUtilisateur=$ligne->nom;
					$_SESSION['idUtilisateur']=$idUtilisateur;
					$_SESSION['nomUtilisateur']=$nomUtilisateur;
					$tabRes['nomUtilisateur']=$nomUtilisateur;
					
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
	/* function enlever(){
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
	}  */
	


	function monProfile(){
		global $tabRes;
		$tabRes['action']="monProfile";
		if (isset($_SESSION['role'])) {
			$id=$_SESSION['idConnexion'];
			$tabRes['msg']="OK";
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
				$tabRes['msg']="NON";
			}finally{
				unset($unModele);
			}
			
		}elseif(isset($_SESSION['access_token'])){
			$tabRes['msg']="twitter";
			$tabRes['url_twitter']=$_SESSION['url_twitter'];
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
			
			$_SESSION['idConnexion']==null;
			$_SESSION['courriel']==null;
			$_SESSION['idUtilisateur']=null;
			session_destroy();
			session_unset();
			$tabRes['msg']="ok";
		}elseif(isset($_SESSION['access_token'])){
			$_SESSION['access_token']=null;
			session_destroy();
			session_unset();
			$tabRes['msg']="ok";
		}else{
			$tabRes['msg']="non";
		}
	}
	function estConnecter(){
		global $tabRes;
		$tabRes['action']="estConnecter";
		if (isset($_SESSION['idConnexion'])) {
			$tabRes['msg']="ok";
			$tabRes['nomUtilisateur']=$_SESSION['nomUtilisateur'];
			if ($_SESSION['role']=="admin") {
				$tabRes['role']="admin";
			}else{
				if(isset($_SESSION["shopping_cart"])) {  
					$count = count($_SESSION["shopping_cart"]);  
					$tabRes['itemCount']= $count;	
				}   
				$tabRes['role']="utilisateur";
			}
		}elseif(isset($_SESSION['oauth_token'])){
			$tabRes['msg']="ok";
			$tabRes['role']="twitter";
			if(isset($_SESSION["shopping_cart"])) {  
				$count = count($_SESSION["shopping_cart"]);  
				$tabRes['itemCount']= $count;	
			} 
		}elseif(isset($_SESSION['access_token'])){
			$tabRes['msg']="ok";
			$tabRes['role']="twitterApres";

			$user=continuTwitterProf();
			$tabRes['nomUtilisateur'] = $user->name;

			$tabRes['photoUrl'] = $user->profile_image_url;
			$tabRes['nomUtilisateur'] = $user->name;
			$_SESSION['nomUtilisateur']=$tabRes['nomUtilisateur'];
			$_SESSION['url_twitter'] = 'https://twitter.com/'.$user->screen_name;
			if(isset($_SESSION["shopping_cart"])) {  
				$count = count($_SESSION["shopping_cart"]);  
				$tabRes['itemCount']= $count;	
			} 
		}else{
			$tabRes['msg']="non";
			
		}

	}
	function connTwitter(){
		require "../twitteroauth/autoload.php";
		global $tabRes;
		$tabRes['action']="twittConn";
		try{
			////// pour verifier si le cUrl est installe ou non
			if (in_array  ('curl', get_loaded_extensions())){
				$tabRes['msg2']="curl oui";
			}else{
				$tabRes['msg2']="curl non";
			}
			//////////////////////////////////////////////////
			// main startup code
			$consumer_key = 'PEZYSRWGpIglJJ5WQfPBerN3b';
			$consumer_secret = 'rrK0FElLtIFvshw0gdhwz64LV4osUMMIc5G1tOQ4V9sCZ10LOn';
			//this code will return your valid url which u can use in iframe src to popup or can directly view the page as its happening in this example
			$connection = new TwitterOAuth($consumer_key, $consumer_secret);
			
			$temporary_credentials = $connection->oauth('oauth/request_token', array("oauth_callback" =>'http://127.0.0.1/Circuit/ProjetCircuits/circuits.html'));
			
			$_SESSION['oauth_token']=$temporary_credentials['oauth_token'];       
			$_SESSION['oauth_token_secret']=$temporary_credentials['oauth_token_secret'];
			$url = $connection->url("oauth/authorize", array("oauth_token" => $temporary_credentials['oauth_token'])); 

			$tabRes['msg']="ok";
			$tabRes['msg3']=$url;
		}catch(Exception $e){
			$tabRes['msg']="non";

        }

	}
	function twitterProf(){
		global $tabRes;
		global $header;
		$tabRes['action']="twitProf";
		try{
			require "../twitteroauth/autoload.php";
			$final_credentials=[];
			$oauth_token=$_SESSION['oauth_token'];
			$final_credentials['oauth_token']=$_SESSION['oauth_token'];
			$final_credentials['oauth_token_secret']=$_SESSION['oauth_token_secret'];

			unset($_SESSION['oauth_token']);
			unset($_SESSION['oauth_token_secret']);
			$consumer_key = 'PEZYSRWGpIglJJ5WQfPBerN3b';
			$consumer_secret = 'rrK0FElLtIFvshw0gdhwz64LV4osUMMIc5G1tOQ4V9sCZ10LOn';
			$connection = new TwitterOAuth($consumer_key, $consumer_secret);
			
			$headers =  getallheaders();
			foreach($headers as $key=>$val){
				$header[$key]= $val;
			}
			$newUrl=$header["Referer"];
			if( strpos( $newUrl, "denied" ) === false ) {
				$joda=parse_url($newUrl, PHP_URL_QUERY);
				$pairs = explode('&',$joda);
				foreach ($pairs as $pair) {
					$keyVal = explode('=',$pair);
					$key = &$keyVal[0];
					$val = urlencode($keyVal[1]);
					$monArr[$key]=$val;
				}
				//necessary to get access token other wise u will not have permision to get user info
				$params=array("oauth_verifier" => $monArr["oauth_verifier"],"oauth_token"=>$monArr["oauth_token"]);
				$access_token = $connection->oauth("oauth/access_token", $params);
				//now again create new instance using updated return oauth_token and oauth_token_secret because old one expired if u dont u this u will also get token expired error
				$connection = new TwitterOAuth($consumer_key, $consumer_secret,$access_token['oauth_token'],$access_token['oauth_token_secret']);
				$content = $connection->get("account/verify_credentials"); 
	
				$_SESSION['access_token']=$access_token;
				
				//$tabRes['msg1']="get kardam";
				 $tabRes['msg2']=$content;
				$tabRes['photoUrl'] = $content->profile_image_url;
				$tabRes['nomUtilisateur'] = $content->name;
				$_SESSION['nomUtilisateur']=$tabRes['nomUtilisateur'];
				$_SESSION['url_twitter'] = 'https://twitter.com/'.$content->screen_name;
				$tabRes['msg']="ok"; 
			}else{
				$tabRes['msg']="denied"; 
			}
		}catch(Exception $e){
			$tabRes['msg']="non";
		}
						

	}
	function continuTwitterProf(){
		require "../twitteroauth/autoload.php";
		
		$access_token = $_SESSION['access_token'];
		$consumer_key = 'PEZYSRWGpIglJJ5WQfPBerN3b';
		$consumer_secret = 'rrK0FElLtIFvshw0gdhwz64LV4osUMMIc5G1tOQ4V9sCZ10LOn';
		$connection = new TwitterOAuth($consumer_key,$consumer_secret, $access_token['oauth_token'], $access_token['oauth_token_secret']);
		$content = $connection->get("account/verify_credentials"); 
		return $content;
		/* $_SESSION['nomUtilisateur']=$tabRes['nomUtilisateur'];
		$tabRes['msg2']=$content;
		$tabRes['photoUrl'] = $content->profile_image_url;
		$tabRes['nomUtilisateur'] = $content->name;
		$_SESSION['nomUtilisateur']=$tabRes['nomUtilisateur'];
		$_SESSION['url_twitter'] = 'https://twitter.com/'.$content->screen_name;
		$tabRes['msg']="ok";	 */
	}

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
		case "estConnecter" :
			estConnecter();
		break;
		case "connecterTwitter" :
			connTwitter();
		break;
		case "profileTwitter" :
			twitterProf();
		break;
		case "continuProfileTwitter" :
			continuTwitterProf();
		case "miseAjourProfilUsager":
			miseAjourProfilUsager();
		break;
	}
    echo json_encode($tabRes); // json_encode --> Retourne la représentation JSON d'une valeur 
?>