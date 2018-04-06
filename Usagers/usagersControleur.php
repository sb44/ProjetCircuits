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


	function connecter(){
		global $tabRes;	
 		$courriel=$_POST['inputCourConn'];
		$mdp=$_POST['inputMotPasseConn'];
		try{
			$requete="SELECT * FROM connexion WHERE courriel = ? ";
			$unModele=new circuitsModele($requete,array($courriel));
			$stmt=$unModele->executer();
			$tabRes['action']="connecter";
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
			$tabRes['msg']="ok";

			if ($_SESSION['role']=="admin") {
				$requete="SELECT courriel FROM connexion WHERE idConnexion = ? ";
				$unModele=new circuitsModele($requete,array($id));
				$stmt=$unModele->executer();
				$ligne=$stmt->fetch(PDO::FETCH_OBJ);
				$tabRes['courriel']=$ligne->courriel; 
				$tabRes['msg']="vous etes admin";
			} else {
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
	function estConnecter(){
		global $tabRes;
		$tabRes['action']="estConnecter";
		if (isset($_SESSION['idConnexion'])) {
			$tabRes['msg']="ok";
			if ($_SESSION['role']=="admin") {
				$tabRes['role']="admin";
			}else{
				if(isset($_SESSION["shopping_cart"]))  
				{  
					$count = count($_SESSION["shopping_cart"]);  
					$tabRes['itemCount']= $count;	
				}   
				 
				$tabRes['role']="utilisateur";
			}
		}elseif(isset($_SESSION['oauth_token'])){
			
			$tabRes['msg']="twitter";
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
			
			// REDIRECTING TO THE URL
			//header('Location: ' . $url); 
			$tabRes['msg1']="try";
			$tabRes['msg3']=$url;
		}catch(Exception $e){
			$tabRes['msg']="non";

        }
			/* 			require_once '../twitteroauth/lib/EpiCurl.php';
			require_once '../twitteroauth/lib/EpiOAuth.php';
			require_once '../twitteroauth/lib/EpiTwitter.php';
			require_once '../twitteroauth/lib/secret.php';
			
			$twitterObj = new EpiTwitter($consumer_key, $consumer_secret);
			$oauth_token = $_GET['oauth_token'];
			$tabRes['msg']="ok";
 			if($oauth_token == ''){
				$url = $twitterObj->getAuthorizationUrl();
				echo "<div style='width:200px;margin-top:200px;margin-left:auto;margin-right:auto'>";
				echo "<a href='$url'>Sign In with Twitter</a>";
				echo "</div>";
			}else{
				$twitterObj->setToken($_GET['oauth_token']);
				$token = $twitterObj->getAccessToken();
				$twitterObj->setToken($token->oauth_token, $token->oauth_token_secret);
				$_SESSION['ot'] = $token->oauth_token;
				$_SESSION['ots'] = $token->oauth_token_secret;
				$twitterInfo= $twitterObj->get_accountVerify_credentials();
				$twitterInfo->response;

				$username = $twitterInfo->screen_name;
				$profilepic = $twitterInfo->profile_image_url;

				include 'update.php';
			}  */
	}
	function twitterProf(){
		require "../twitteroauth/autoload.php";
		global $tabRes;
		global $header;
		$tabRes['action']="twitProf";

				$oauth_token=$_SESSION['oauth_token'];
				unset($_SESSION['oauth_token']);
				$consumer_key = 'PEZYSRWGpIglJJ5WQfPBerN3b';
				$consumer_secret = 'rrK0FElLtIFvshw0gdhwz64LV4osUMMIc5G1tOQ4V9sCZ10LOn';
				$connection = new TwitterOAuth($consumer_key, $consumer_secret);
				
				$headers =  getallheaders();
				foreach($headers as $key=>$val){
					$header[$key]= $val;
				}
				$newUrl=$header["Referer"];
				//$tabRes['msg3']=$newUrl;
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
 				$connection = new TwitterOAuth($consumer_key, $consumer_secret,
				$access_token['oauth_token'],$access_token['oauth_token_secret']);
				$content = $connection->get("account/verify_credentials"); 
				
				//$tabRes['msg1']="get kardam";
				$tabRes['msg2']=$content;
				$tabRes['msg4'] = $content->profile_image_url;
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
	}
    echo json_encode($tabRes); // json_encode --> Retourne la représentation JSON d'une valeur 
?>