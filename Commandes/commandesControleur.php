<?php
	require_once("../includes/modele.inc.php");
	
	$tabRes=array();

	function ajouterAuPanier(){
		session_start();
		global $tabRes;	
		$id=$_POST['idGroupeVoyage'];
		$count=0;
	
		try{
			$requette="SELECT circuit.idCircuit,circuit.nom,circuit.capacite,circuit.enVigueur,groupevoyage.prixAdulte,groupevoyage.prixEnfant,groupevoyage.prixBebe,groupevoyage.dateDepart,groupevoyage.dateRetour,promotion.rabaisAdulte,promotion.rabaisEnfant,promotion.rabaisBebe FROM circuit,groupevoyage,promotion WHERE groupevoyage.idGroupeVoyage = ? AND circuit.idCircuit = groupevoyage.idCircuit AND groupevoyage.idpromotion = promotion.idpromotion";
			$unModele=new circuitsModele($requette,array($id));
			$stmt=$unModele->executer();
			$ligne=$stmt->fetch(PDO::FETCH_OBJ);
			$tabRes['action']="ajouterAuPanier";	

			if(isset($_SESSION["shopping_cart"]))  
			{  
				 $item_array_id = array_column($_SESSION["shopping_cart"], "item_id"); 
				 $count = count($_SESSION["shopping_cart"]); 
				 if(!in_array($id, $item_array_id))  
				 {    
					  $item_array = array(  
						'item_id' =>$id,  
						'item_title' => $ligne->nom,  
						'item_Adult_price'=> $ligne->prixAdulte,  
						'item_Child_price' => $ligne->prixEnfant,  
						'item_Baby_price' => $ligne->prixBebe,  
						'item_Promotion_Status' => $ligne->enVigueur, 
						'item_Departure'=> $ligne->dateDepart, 
						'item_Return' => $ligne->dateRetour, 
						'item_Rabais_Adulte'=> $ligne->rabaisAdulte, 
						'item_Child_discount'=> $ligne->rabaisEnfant,
						'item_Rabais_Bebe'=> $ligne->rabaisBebe
					  );
					  $it = 0; $loop = true;
					  do {
						if (!isset($_SESSION["shopping_cart"][$it])) {
							$_SESSION["shopping_cart"][$it] = $item_array;
							$loop = false;
						}
						$it++;
					  } while ($loop);
					  
					  //$_SESSION["shopping_cart"][$count] = $item_array; 
					  $count = $count + 1;	//SB: AJOUT DE CETTE LIGNE 
				 } else {  
					  $tabRes['msg']="Item déjà ajouté!";
				 }  
				 $tabRes['itemCount']= $count;
			}  
			else  
			{  
				 $item_array = array(  
					       'item_id' =>$id,  
						   'item_title' => $ligne->nom,  
						   'item_Adult_price'=> $ligne->prixAdulte,  
						   'item_Child_price' => $ligne->prixEnfant,  
						   'item_Baby_price' => $ligne->prixBebe,  
						   'item_Promotion_Status' => $ligne->enVigueur, 
						   'item_Departure'=> $ligne->dateDepart, 
						   'item_Return' => $ligne->dateRetour, 
						   'item_Rabais_Adulte'=> $ligne->rabaisAdulte, 
						   'item_Child_discount'=> $ligne->rabaisEnfant,
						   'item_Rabais_Bebe'=> $ligne->rabaisBebe 
				 );  
				 $_SESSION["shopping_cart"][0] = $item_array;  
				 $tabRes['itemCount'] = 1; //SB: AJOUT DE CETTE LIGNE
			}  

		}catch(Exception $e){
		}finally{
			unset($unModele);
		}
		
	}


	function ouvrirPanier(){
		session_start();
		global $tabRes;
		$items=array();
		$tabRes['action']="ouvrirPanier";
		
				if(!empty($_SESSION["shopping_cart"]))  
				{  
					 foreach($_SESSION["shopping_cart"] as $keys => $values) {  
						$items[$keys]["item_title"]=$values["item_title"];
						$items[$keys]["item_Adult_price"]=$values['item_Adult_price'];
						$items[$keys]["item_Rabais_Adulte"]=$values["item_Rabais_Adulte"];
						$items[$keys]["item_id"]=$values["item_id"];
						$items[$keys]["item_Departure"]=$values["item_Departure"];
						$items[$keys]["item_Return"]=$values["item_Return"];
						$items[$keys]["item_Child_price"]=$values["item_Child_price"];
						$items[$keys]["item_Child_discount"]=$values["item_Child_discount"];
						$items[$keys]["item_Rabais_Bebe"]=$values["item_Rabais_Bebe"];
						$items[$keys]["item_Baby_price"]=$values["item_Baby_price"];
					 }  
					 
				}  
				$tabRes['itemList']=$items;
		}


		function deleteItem(){
			session_start();
			global $tabRes;
			$itemId=$_POST['itemId'];
			$tabRes['action']="deleteItem";
			
			foreach ($_SESSION["shopping_cart"] as $keys => $values) {
                if ($values["item_id"] == $itemId) {
                    unset($_SESSION["shopping_cart"][$keys]);
                }
			}
			
			$itemCount=count($_SESSION["shopping_cart"]);
			$tabRes['itemCount']=$itemCount;

		}
	

		function supprimerVoyageur(){
			session_start();
			global $tabRes;
			$itemId=$_POST['idVoyageur'];
			$tabRes['action']="supprimerVoyageur";
			
			foreach ($_SESSION["trip_Summary"] as $keys => $values) {
                if ($values["item_id"] == $itemId) {
                    unset($_SESSION["trip_Summary"][$keys]);
                }
			}
			$itemCount=count($_SESSION["trip_Summary"]);
			$tabRes['itemCount']=$itemCount;
		    $tabRes['nbSummaryItems']=count($_SESSION["trip_Summary"]);
		}
	


		function listerCommandes($idUtilisateur){
			//http://localhost/CircuitVoyage/Commandes/commandesControleur.php?afficherCommandes&idUtilisateur=1
			global $tabRes;
			$idUtilisateur=$idUtilisateur;
	
			$requette="SELECT * FROM commande WHERE idUtilisateur = ? ";
			$unModele=new circuitsModele($requette,array($idUtilisateur));
			$stmt=$unModele->executer();

			while($ligne=$stmt->fetch(PDO::FETCH_OBJ)){
			    $tabRes['listeCommandes'][]=$ligne;
			}
			
		}


	function ficheReservation(){
			global $tabRes;
			$idCommande=$_POST['idCommande'];
			$tabRes['action']="ficheReservation";
			$tabRes['idCommande']=$idCommande;
		}
	
	

	function afficherSommaire(){
		session_start();
		global $tabRes;
		$items=array();
		
				if(!empty($_SESSION["trip_Summary"]))  
				{  
					 foreach($_SESSION["trip_Summary"] as $keys => $values) {  
						$items[$keys]["item_name"]=$values["item_name"];
						$items[$keys]["item_prenom"]=$values['item_prenom'];
						$items[$keys]["item_categorie"]=$values["item_categorie"];
						$items[$keys]["item_cout_unitaire"]=$values["item_cout_unitaire"];
						$items[$keys]["item_circuit"]=$values["item_circuit"];
						$items[$keys]["item_id"]=$values["item_id"];
						$items[$keys]["item_dateDepart"]=$values["item_dateDepart"];
						$items[$keys]["item_depotInitial"]=$values["item_depotInitial"];
						$items[$keys]["item_idGroupeVoyage"]=$values["item_idGroupeVoyage"];
					 }  
					 
				}  
				$tabRes['summaryList']=$items;
				$tabRes['nbSummaryItems']=count($_SESSION["trip_Summary"]); 
				$tabRes['action']="afficherSommaire";
				
		}
	
	
		function creerSommaire(){
			session_start();
			global $tabRes;
			$counter=$_POST['idCounter'];
			
//ifo liee a la commande

           date_default_timezone_set('America/Montreal');
			$today = date("y/m/d"); 
			$idUtilisateur=$_SESSION['idUtilisateur'];


			for( $i=0; $i<$counter;$i++){
				$j=$i+1;
				$idcommande=$_POST['idCommandeVoyageur'.$j];
				array_push($items, $idcommande);
			   $result=array_count_values($items);
			}



//info commandeajout

			for( $i=0; $i<$counter;$i++){
				$j=$i+1;
				$nom = $_POST['nomVoyageur'.$j];
				$prenom=$_POST['prenomVoyageur'.$j];
				$dateNaissance=$_POST['naissanceVoyageur'.$j];
				$noPasseport=$_POST['noPassportVoyageur'.$j];
				$idSexe=$_POST['sexeVoyageur'.$j];
				$courriel=$_POST['courrielVoyageur'.$j];
				$dateExpiration=$_POST['expirationPasseportVoyageur'.$j];
				$idCategorie=$_POST['categorieVoyageur'.$j];
				$depotInitial=$_POST['depotVoyageur'.$j];
				$idCommande=$_POST['idCommandeVoyageur'.$j];



				$nbInscription=$result[$idCommande];//ajout carles


				// calcul de montant total 
				if(!empty($_SESSION["trip_Summary"]))  
				{  
					foreach($_SESSION["trip_Summary"] as $keys => $values) {  
						if($values["item_idGroupeVoyage"]==$idCommande){
							$balance+=$values['item_cout_unitaire'];
						}
					}  
				}  




				
	
				try{
					$count=0;
					$categorie="";
					$prixUnitaire="";
					

					$requette="SELECT ROUND(groupevoyage.prixAdulte * (1 - promotion.rabaisAdulte/100), 2) AS prixAdulte,groupevoyage.dateDepart,ROUND(groupevoyage.prixEnfant * (1 - promotion.rabaisEnfant/100), 2) AS prixEnfant,ROUND(groupevoyage.prixBebe * (1 - promotion.rabaisBebe/100), 2) AS prixBebe,circuit.nom FROM groupevoyage,circuit,promotion WHERE groupevoyage.idGroupeVoyage = ? AND groupevoyage.idcircuit=circuit.idCircuit AND groupevoyage.idpromotion = promotion.idpromotion";
					$unModele=new circuitsModele($requette,array($idCommande));
					$stmt=$unModele->executer();
					$ligne=$stmt->fetch(PDO::FETCH_OBJ);

					switch($idCategorie){
					case "1":
					$categorie="Adulte";
					$prixUnitaire=$ligne->prixAdulte;
					break;
					case "2":
					$categorie="Enfant";
					$prixUnitaire=$ligne->prixEnfant;
					break;
					case "3":
					$categorie="Bébé";
					$prixUnitaire=$ligne->prixBebe;
					break;
					}

						if(isset($_SESSION["trip_Summary"]))  
						{  
							 $item_array_id = array_column($_SESSION["trip_Summary"], "item_id");  
							 if(!in_array($noPasseport, $item_array_id))  
							 {  
								  $count = count($_SESSION["trip_Summary"]);  
								  $item_array = array(  
									'item_id' =>$noPasseport, 
									'item_circuit' =>$ligne->nom, 
									'item_name' => $nom,  
									'item_prenom'=> $prenom,  
									'item_categorie' => $categorie,  
									'item_cout_unitaire' => $prixUnitaire,
									'item_dateDepart'=>$ligne->dateDepart,
									'item_depotInitial'=>$depotInitial,
									'item_idGroupeVoyage'=>$idCommande,
									'item_sexeVoyageur'=>$idSexe,
									'item_naissanceVoyageur'=>$dateNaissance,
									'item_expirationPasseportVoyageur'=>$dateExpiration,
									'item_courrielVoyageur'=>$courriel
								  );  
								  $_SESSION["trip_Summary"][$count] = $item_array;  
							 } else {  
								  $tabRes['msg']="Item déjà ajouté!";
							 }  
							 $tabRes['itemCount']= $count;	
						}  
						else  
						{  
							 $item_array = array(  
								   'item_id' =>$noPasseport, 
									'item_circuit' =>$ligne->nom, 
									'item_name' => $nom,  
									'item_prenom'=> $prenom,  
									'item_categorie' => $categorie,  
									'item_cout_unitaire' => $prixUnitaire,
									'item_dateDepart'=>$ligne->dateDepart,
									'item_depotInitial'=>$depotInitial,
									'item_idGroupeVoyage'=>$idCommande,
									'item_sexeVoyageur'=>$idSexe,
									'item_naissanceVoyageur'=>$dateNaissance,
									'item_expirationPasseportVoyageur'=>$dateExpiration,
									'item_courrielVoyageur'=>$courriel
							 );  
							 $_SESSION["trip_Summary"][0] = $item_array;  
						}  
			

                  // inscription  des info de commande dans une variable de session  
						if(isset($_SESSION["trip_Order"]))  
						{  
							 $order_array_id = array_column($_SESSION["trip_Order"], "item_idGroupeVoyage");  
							 if(!in_array($idCommande,  $order_array_id))  
							 {  
								 $countOrder = count($_SESSION["trip_Order"]);  
								  $order_array = array(  
									'item_idGroupeVoyage' =>$idCommande, 
									'item_nbInscription' =>$nbInscription, 
									'item_paymentDate' => $today,  
									'item_userId'=>$idUtilisateur,
									'item_balance'=>$balance
								  );  
								  $_SESSION["trip_Order"][$countOrder] =$order_array;  
							 } else {  
								  $tabRes['msg']="Item déjà ajouté!";
							 }  
							 $tabRes['itemCount']= $countOrder;	
						}  
						else  
						{  
							 $item_array = array(  
								   'item_idGroupeVoyage' =>$idCommande, 
									'item_nbInscription' =>$nbInscription, 
									'item_paymentDate' => $today,  
									'item_userId'=>$idUtilisateur ,
									'item_balance'=>$balance
							 );  
							 $_SESSION["trip_Order"][0] = $order_array;  
						}  
			


					}catch(Exception $e){
					}finally{
						unset($unModele);
					}
					$tabRes['action']="creerSommaire";
			}
			echo json_encode($tabRes);
		}
			




	function enregistrerVoyageur(){
		session_start();

		global $tabRes;
		$depotInitial=0;
		$counter=$_POST['idCounter'];
		$lastId=0;
	   $utilisateurId=0;
	   $groupeVoyageId=0;
	   $tabRes['action']="enregistrerVoyageur";
		$items=array();
		$cout=array();

		date_default_timezone_set('America/Montreal');
		$today = date("y/m/d"); 
		$idUtilisateur=$_SESSION['idUtilisateur'];
		$ligneCapacite=0;
		$ligneNbCommande=0;
		$ligneRangCommande=1;
		$nbInscription=0;


		for( $i=0; $i<$counter;$i++){
			$j=$i+1;
			$idcommande=$_POST['idCommandeVoyageur'.$j];
			array_push($items, $idcommande);
		   $result=array_count_values($items);
		}
		
		for( $i=0; $i<$counter;$i++){
			$j=$i+1;
			$nom = $_POST['nomVoyageur'.$j];
			$prenom=$_POST['prenomVoyageur'.$j];
			$dateNaissance=$_POST['naissanceVoyageur'.$j];
			$noPasseport=$_POST['noPassportVoyageur'.$j];
			$idSexe=$_POST['sexeVoyageur'.$j];
			$courriel=$_POST['courrielVoyageur'.$j];
			$dateExpiration=$_POST['expirationPasseportVoyageur'.$j];
			$idCategorie=$_POST['categorieVoyageur'.$j];
			$idCommande=$_POST['idCommandeVoyageur'.$j];
		
			$nbInscription=$result[$idCommande];
			
			if(!empty($_SESSION["trip_Summary"]))  
			{  
				foreach($_SESSION["trip_Summary"] as $keys => $values) {  
					if($values["item_idGroupeVoyage"]==$idCommande){
						$balance+=$values['item_cout_unitaire'];
					}
				}  
			}  

	

			try{
				$request="SELECT groupevoyage.capacite FROM groupevoyage  WHERE groupevoyage.idGroupeVoyage=?";
				$unModele=new circuitsModele($request,array($idCommande));
				$stmt=$unModele->executer();
				if($ligne=$stmt->fetch(PDO::FETCH_OBJ)){
					$ligneCapacite=$ligne->capacite;
				}
				
			}catch(Exception $e){
			}finally{
				unset($unModele);
			}


			try{
				$request="SELECT SUM(nbInscription) As inscrits,idUtilisateur,idGroupeVoyage FROM  commande WHERE commande.idGroupeVoyage=?";
				$unModele=new circuitsModele($request,array($idCommande));
				$stmt=$unModele->executer();
				if($ligne=$stmt->fetch(PDO::FETCH_OBJ)){
					$ligneNbCommande=$ligne->inscrits;
					$utilisateurId=$ligne->idUtilisateur;
					$groupeVoyageId=$ligne->idGroupeVoyage;
				}
			
			}catch(Exception $e){
			}finally{
				unset($unModele);
			}

			if($ligneNbCommande<$ligneCapacite){

				if($groupeVoyageId!=$idCommande&& $utilisateurId!=$idUtilisateur){

					try{
						$requette="INSERT INTO commande VALUES(0,?,?,?,?,?,?)";
						$unModele=new circuitsModele($requette,array($nbInscription,$today,$balance,$idCommande,$idUtilisateur,0));
						$stmt=$unModele->executer();
						$lastId=$unModele->LAST_ID;
					}catch(Exception $e){
					}finally{
						unset($unModele);
					}
				}
				
			try{
				$requete="INSERT INTO voyageur VALUES(0,?,?,?,?,?,?,?,?,?)";
				$unModele=new circuitsModele($requete,array($courriel,$nom,$prenom,$idCategorie,$idSexe,$dateNaissance,$noPasseport,$dateExpiration,$lastId));
				$stmt=$unModele->executer();
				$tabRes['action']="enregistrerVoyageur";
			}catch(Exception $e){
			}finally{
				unset($unModele);
			}	
			}
		}
	
	}
		




function payer(){
	session_start();
	global $tabRes;
	$items=array();
	$idGroupeVoyage=$_POST['idVoyage'];
	$balance=0;
	$tabRes['action']="payer";
}

function paypal(){
	session_start();
	// Database variables
	$host = "localhost"; //database location
	$user = ""; //database username
	$pass = ""; //database password
	$db_name = ""; //database name
	
	// PayPal settings
	$paypal_email = 'kouayacarles@gmail.com';
	$return_url = 'http://localhost/Circuit/ProjetCircuits/circuits.html';
	//$cancel_url = 'http://localhost/Circuit/ProjetCircuits/payment-cancelled.html';
	$notify_url = 'http://localhost/Circuit/ProjetCircuits/Commandes/commandeControleur.php?action=paypal';
	

	$idGroupe=$_POST["idGroupeVoyage"];
	
	
	$item_name = 'Test Item';
	$item_amount = 1.00;
	
	
	// Include Functions
	//include("functions.php");

	require_once("../includes/function.php");
	
	// Check if paypal request or response
	if (!isset($_POST["txn_id"]) && !isset($_POST["txn_type"])){
		$querystring = '';
		
		// Firstly Append paypal account to querystring
		$querystring .= "?business=".urlencode($paypal_email)."&";
		
		// Append amount& currency (£) to quersytring so it cannot be edited in html
		
		//The item name and amount can be brought in dynamically by querying the $_POST['item_number'] variable.
		$querystring .= "item_name=".urlencode($item_name)."&";
		$querystring .= "amount=".urlencode($item_amount)."&";
		/*
		//loop for posted values and append to querystring
		foreach($_POST as $key => $value){
			$value = urlencode(stripslashes($value));
			$querystring .= "$key=$value&";
		}
		
	*/
	
		$parameter = array(  
			'cmd' =>$_POST['cmd'], 
			'no_note' =>$_POST['no_note'], 
			'lc' => $_POST['lc'],  
			'currency_code'=>$_POST['currency_code'],
			'bn'=>$_POST['bn'],
			'first_name'=>$_POST['first_name'],
			'last_name'=>$_POST['last_name'],
			'payer_email'=>$_POST['payer_email'],
			'item_number'=>$_POST['item_number']
		  ); 
	
	
		  foreach($parameter as $key => $value){
			$value = urlencode(stripslashes($value));
			$querystring .= "$key=$value&";
		}
	
	
	
	
	
	
		// Append paypal return addresses
		$querystring .= "return=".urlencode(stripslashes($return_url))."&";
		$querystring .= "cancel_return=".urlencode(stripslashes($cancel_url))."&";
		$querystring .= "notify_url=".urlencode($notify_url);
		
		// Append querystring with custom field
		//$querystring .= "&custom=".USERID;
		
		// Redirect to paypal IPN
		header('location:https://www.sandbox.paypal.com/cgi-bin/webscr'.$querystring);
		exit();
	} else {



		//Database Connection
		$link = mysql_connect($host, $user, $pass);
		mysql_select_db($db_name);
		
		// Response from Paypal
	
		// read the post from PayPal system and add 'cmd'
		$req = 'cmd=_notify-validate';
		foreach ($_POST as $key => $value) {
			$value = urlencode(stripslashes($value));
			$value = preg_replace('/(.*[^%^0^D])(%0A)(.*)/i','${1}%0D%0A${3}',$value);// IPN fix
			$req .= "&$key=$value";
		}
		
		// assign posted variables to local variables
		$data['item_name']			= $_POST['item_name'];
		$data['item_number'] 		= $_POST['item_number'];
		$data['payment_status'] 	= $_POST['payment_status'];
		$data['payment_amount'] 	= $_POST['mc_gross'];
		$data['payment_currency']	= $_POST['mc_currency'];
		$data['txn_id']				= $_POST['txn_id'];
		$data['receiver_email'] 	= $_POST['receiver_email'];
		$data['payer_email'] 		= $_POST['payer_email'];
		$data['custom'] 			= $_POST['custom'];
			
		// post back to PayPal system to validate
		$header = "POST /cgi-bin/webscr HTTP/1.0\r\n";
		$header .= "Content-Type: application/x-www-form-urlencoded\r\n";
		$header .= "Content-Length: " . strlen($req) . "\r\n\r\n";
		
		$fp = fsockopen ('ssl://www.sandbox.paypal.com', 443, $errno, $errstr, 30);
		
		if (!$fp) {
			// HTTP ERROR
			
		} else {
			fputs($fp, $header . $req);
			while (!feof($fp)) {
				$res = fgets ($fp, 1024);
				if (strcmp($res, "VERIFIED") == 0) {
					
					// Used for debugging
					// mail('user@domain.com', 'PAYPAL POST - VERIFIED RESPONSE', print_r($post, true));
							
					// Validate payment (Check unique txnid & correct price)
					$valid_txnid = check_txnid($data['txn_id']);
					$valid_price = check_price($data['payment_amount'], $data['item_number']);
					// PAYMENT VALIDATED & VERIFIED!
					if ($valid_txnid && $valid_price) {
						
						$orderid = updatePayments($data);
						


						if ($orderid) {
							// Payment has been made & successfully inserted into the Database
						} else {
							// Error inserting into DB
							// E-mail admin or alert user
							// mail('user@domain.com', 'PAYPAL POST - INSERT INTO DB WENT WRONG', print_r($data, true));
						}
					} else {
						// Payment made but data has been changed
						// E-mail admin or alert user
						
					}
				
				} else if (strcmp ($res, "INVALID") == 0) {
				
					// PAYMENT INVALID & INVESTIGATE MANUALY!
					// E-mail admin or alert user
					
					// Used for debugging
					//@mail("user@domain.com", "PAYPAL DEBUGGING", "Invalid Response<br />data = <pre>".print_r($post, true)."</pre>");
				}
			}
		fclose ($fp);
		}
	}

}



//******************************************************
	//Contr�leur
	if(isset($_POST['action'])){

	$action=$_POST['action'];
	switch($action){
	case "ouvrirPanier" :
		      ouvrirPanier();
		break;
	case "ajouterAuPanier" :
		      ajouterAuPanier();
		break;

	case "ficheReservation" :
		    ficheReservation();
		break;
		
	case "enregisterVoyageur" :
	      enregistrerVoyageur();
	break;
	case "creerSommaire" :
	      creerSommaire();
	break;
		
	case "deleteItem" :
	       deleteItem();
	break;
		
	case "afficherSommaire":
	    afficherSommaire();
	break;
	case "supprimerVoyageur":
	      supprimerVoyageur();
	break;
	case "payer":
	      payer();
	break;
	case "paypal":
	      paypal();
	break;
}

}else if(isset($_GET['action'])){
	$action=$_GET['action'];
	switch($action){
	case "ouvrirPanier" :
		      ouvrirPanier();
		break;
	case "ajouterAuPanier" :
		      ajouterAuPanier();
		break;

		
	case "enregisterVoyageur" :
	      enregistrerVoyageur();
	break;
	case "creerSommaire" :
	      creerSommaire();
	break;
		
	case "deleteItem" :
	       deleteItem();
	break;
		
	case "afficherSommaire":
	    afficherSommaire();
	break;
	case "supprimerVoyageur":
	      supprimerVoyageur();
	break;
	
	case "payer":
	      payer();
	break;
	case "paypal":
	paypal();
    break;
	
	}
}
echo json_encode($tabRes); // json_encode --> Retourne la représentation JSON d'une valeur 
?>