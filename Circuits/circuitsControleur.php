<?php

	require_once("../includes/modele.inc.php");
	$tabRes=array();

	function enregistrer(){
		global $tabRes;	
		$titre=$_POST['titre'];
		$duree=$_POST['duree'];
		$res=$_POST['res'];
		try{
			$unModele=new filmsModele();
			$pochete=$unModele->verserFichier("pochettes", "pochette", "avatar.jpg",$titre);
			$requete="INSERT INTO films VALUES(0,?,?,?,?)";
			$unModele=new filmsModele($requete,array($titre,$duree,$res,$pochete));
			$stmt=$unModele->executer();
			$tabRes['action']="enregistrer";
			$tabRes['msg']="Film bien enregistre";
		}catch(Exception $e){
		}finally{
			unset($unModele);
		}
	}
	
	function listerCarte(){
		global $tabRes;
		$tabRes['action']="listerCarte";
		//$requete="SELECT idCircuit FROM circuit";
		$requete="SELECT circuit.idCircuit, circuit.nom AS nomCircuit, circuit.description, circuit.capacite, circuit.urlImage, circuit.prix, theme.idTheme, theme.nom AS nomTheme, theme.iconUrl, circuit.latitude, circuit.longitude FROM circuit, theme WHERE circuit.idTheme = theme.idTheme AND circuit.enVigueur = 1";
		//$requete="SELECT description FROM jour";
		try{
			 $unModele=new circuitsModele($requete,array());
			 $stmt=$unModele->executer();
			 $tabRes['listeCircuits']=array();
			 while($ligne=$stmt->fetch(PDO::FETCH_OBJ)){
			    $tabRes['listeCircuits'][]=$ligne;
			 }
		}catch(Exception $e){
		}finally{
			unset($unModele);
		}
	}
	
	 function afficherGroupesVoyagesDeCircuit(){
		global $tabRes;
		$idCircuit=$_POST['noCircuit'];
		$tabRes['action']="afficherDetailCircuit";
		$requete="SELECT circuit.idCircuit, circuit.nom AS nomCircuit, circuit.description, circuit.capacite, circuit.urlImage, circuit.prix, theme.idTheme, theme.nom AS nomTheme, theme.iconUrl, circuit.latitude, circuit.longitude FROM circuit, theme WHERE circuit.idTheme = theme.idTheme AND circuit.enVigueur = 1";
		//$requete="SELECT description FROM jour";
		try{
			 $unModele=new circuitsModele($requete,array());
			 $stmt=$unModele->executer();
			 $tabRes['listeCircuits']=array();
			 while($ligne=$stmt->fetch(PDO::FETCH_OBJ)){
			    $tabRes['listeCircuits'][]=$ligne;
			 }
		}catch(Exception $e){
		}finally{
			unset($unModele);
		}
	}
	
	function lister(){
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
	}
	
	function fiche(){
		global $tabRes;
		$idf=$_POST['numF'];
		$tabRes['action']="fiche";
		$requete="SELECT * FROM films WHERE idf=?";
		try{
			 $unModele=new filmsModele($requete,array($idf));
			 $stmt=$unModele->executer();
			 $tabRes['fiche']=array();
			 if($ligne=$stmt->fetch(PDO::FETCH_OBJ)){
			    $tabRes['fiche']=$ligne;
				$tabRes['OK']=true;
			}
			else{
				$tabRes['OK']=false;
			}
		}catch(Exception $e){
		}finally{
			unset($unModele);
		}
	}
	
	function modifier(){
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
	}
	//******************************************************
	//Contr�leur
	$action=$_POST['action'];
	switch($action){
		case "enregistrer" :
			enregistrer();
		break;
		case "listerCarte" :
			listerCarte();
		break;
		case "lister" :
			lister();
		break;
		case "enlever" :
			enlever();
		break;
		case "fiche" :
			fiche();
		break;
		case "modifier" :
			modifier();
		break;
	}
	echo json_encode($tabRes); // json_encode --> Retourne la représentation JSON d'une valeur 
	//echo $tabRes; 
?>