<?php
	require_once("../includes/modele.inc.php");
	$tabRes=array();

	
	function ajouterAuPanier(){
		session_start();
		global $tabRes;	
		$id=$_POST['numeroItem'];
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
				 if(!in_array($id, $item_array_id))  
				 {  
					  $count = count($_SESSION["shopping_cart"]);  
					  $item_array = array(  
						'item_id' =>$ligne->idCircuit,  
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
					  $_SESSION["shopping_cart"][$count] = $item_array;  
				 } else {  
					  $tabRes['msg']="Item déjà ajouté!";
				 }  
				 $tabRes['itemCount']= $count;	
			}  
			else  
			{  
				 $item_array = array(  
					       'item_id' =>$ligne->idCircuit,  
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
			}  

		}catch(Exception $e){
		}finally{
			unset($unModele);
		}
	}
	
	
	

	function ouvrirPanier(){
		session_start();
		//$_SESSION = array();
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


	
	//******************************************************
	//Contr�leur
	$action=$_POST['action'];
	switch($action){
		case "ouvrirPanier" :
		      ouvrirPanier();
		break;
		case "ajouterAuPanier" :
		      ajouterAuPanier();
		break;
	}
    echo json_encode($tabRes); // json_encode --> Retourne la représentation JSON d'une valeur 
?>