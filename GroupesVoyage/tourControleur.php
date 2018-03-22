<?php
	require_once("../includes/modele.inc.php");
	//$tabRes=array();

	function circuitEn(){
		$nom=$_POST['nomCircuit'];
		$des=$_POST['desCircuit'];
		$cap=$_POST['capCircuit'];
		//$photo=$_POST['photoCircuit'];
		$photo=null;
		$prix=$_POST['prixCircuit'];
		$theme=$_POST['themeCircuit'];
		$latitude=$_POST['latitudeCircuit'];
		$longitude=$_POST['longitudeCircuit'];
		//try{
			//$unModele=new circuitsModele();
			//$pochete=$unModele->verserFichier("pochettes", "pochette", "avatar.jpg",$titre);
			$requete="INSERT INTO circuit VALUES(0,?,?,?,?,?,?,?,?,?)";
			$unModele=new circuitsModele($requete,array($nom,$des,$cap,$photo, $prix, "0", $theme, $latitude, $longitude));
			$stmt=$unModele->executer();
			$id = (int)$unModele->LAST_ID;
			//$tabRes['action']="enregistrer";
			//$tabRes['msg']="Circuit bien enregistre";
		//}catch(Exception $e){
		//}finally{
			unset($unModele);
		//}
		echo "$id";
	}

	function etapeEn(){
		//$photo=$_POST['photoEtape'];
		$photo= null;
		$des =$_POST['desEtape'];
		$idCircuit=$_POST['idCircuit'];
		$pays = "Canada";
		try{
			//$unModele=new circuitsModele();
			//$pochete=$unModele->verserFichier("pochettes", "pochette", "avatar.jpg",$titre);
			$requete="INSERT INTO etape VALUES(0,?,?,?,?)";
			$unModele=new circuitsModele($requete,array($photo,$des,$idCircuit,$pays));
			$stmt=$unModele->executer();
			$id = $unModele->LAST_ID;

		}catch(Exception $e){
		}finally{
			unset($unModele);
		}
		echo "$id";
	}

	function jourEn(){	
		
		$desJour =$_POST['desJour'];
		$photo= null;//$_POST['photoEtape'];
		$idEtape=$_POST['idEtape'];
		$desActivite =$_POST['desActivite'];
		$idHotel = $_POST['hotel'];
		$idResto = $_POST['resto'];
		$ville = $_POST['ville'];
//		try{
			//$unModele=new circuitsModele();
			//$pochete=$unModele->verserFichier("pochettes", "pochette", "avatar.jpg",$titre);
			$requete="INSERT INTO jour VALUES(0,?,?,?,?,?,?,?)";
			$unModele=new circuitsModele($requete,array($desJour,$photo,$idEtape,$desActivite, $idHotel,$idResto, $ville));
			$stmt=$unModele->executer();
			$id = $unModele->LAST_ID;

//		}catch(Exception $e){
//		}finally{
			unset($unModele);
//		}
		echo "$id";
	}
	
/*	function lister(){
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
	}   */
	//******************************************************
	//Contr�leur
	$action=$_POST['type'];
	switch($action){
		case "circuitEn" :
			circuitEn();
		break;
		case "etapeEn" :
			etapeEn();			
		break;
		case "jourEn" :
			jourEn();
		break;
		case "fiche" :
			fiche();
		break;
		case "modifier" :
			modifier();
		break;
	}
    //echo json_encode($tabRes); // json_encode --> Retourne la représentation JSON d'une valeur 
?>