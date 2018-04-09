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
									'item_idGroupeVoyage'=>$idCommande
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
								'item_cout_unitaire' =>$prixUnitaire,
								'item_dateDepart'=>$ligne->dateDepart,
								'item_depotInitial'=>$depotInitial,
								'item_idGroupeVoyage'=>$idCommande
							 );  
							 $_SESSION["trip_Summary"][0] = $item_array;  
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
			$depotInitial=$_POST['depotVoyageur'.$j];
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
				$request="SELECT SUM(nbInscription) As inscrits FROM  commande WHERE commande.idGroupeVoyage=?";
				$unModele=new circuitsModele($request,array($idCommande));
				$stmt=$unModele->executer();
				if($ligne=$stmt->fetch(PDO::FETCH_OBJ)){
					$ligneNbCommande=$ligne->inscrits;
				}
			
			}catch(Exception $e){
			}finally{
				unset($unModele);
			}

			if($ligneNbCommande<$ligneCapacite){

				if(!$ligneNbCommande){

					try{
						$requette="INSERT INTO commande VALUES(0,?,?,?,?,?,?)";
						$unModele=new circuitsModele($requette,array($nbInscription,$today,$balance,$idCommande,$idUtilisateur,$depotInitial));
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
	
	}
}
echo json_encode($tabRes); // json_encode --> Retourne la représentation JSON d'une valeur 
?>