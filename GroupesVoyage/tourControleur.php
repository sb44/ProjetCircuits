<?php
	require_once("../includes/modele.inc.php");
	//$tabRes=array();

	function circuitEn(){
		$nom=$_POST['nomCircuit'];
		$des=$_POST['desCircuit'];
		$cap=$_POST['capCircuit'];
		//$photo=$_POST['photoCircuit'];
		//$photo=null;
		$prix=$_POST['prixCircuit'];
		$theme=$_POST['themeCircuit'];
		$latitude=$_POST['latitudeCircuit'];
		$longitude=$_POST['longitudeCircuit'];
		//try{
			$unModele=new circuitsModele();
			$pochette=$unModele->verserFichier("pochettes", "photoCircuit", "avatar.jpg",$nom);
			$requette="INSERT INTO circuit VALUES(0,?,?,?,?,?,?,?,?,?)";
			$unModele=new circuitsModele($requette,array($nom,$des,$cap,$pochette, $prix, "0", $theme, $latitude, $longitude));
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

	function updateCircuit(){
		$idCircuit=$_POST['idCircuit'];
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
			$requete="UPDATE circuit SET nom=?, description=?, capacite=?, urlImage=?, prix=?, enVigueur=?, idTheme=?, latitude=?, longitude=? WHERE idCircuit=?";
			$unModele=new circuitsModele($requete,array($nom,$des,$cap,$photo, $prix, "0", $theme, $latitude, $longitude, $idCircuit));
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

	function updatePromotion(){
		$idPromotion=$_POST['idPromotion'];
		$des=$_POST['descriptionPromotion'];
		$rabaisAdulte=$_POST['rabaisAdultePromotion'];
		$rabaisEnfant=$_POST['rabaisEnfantPromotion'];
		$rabaisBebe=$_POST['rabaisBebePromotion'];
		//$photo=$_POST['photoCircuit'];
		//try{
			//$unModele=new circuitsModele();
			//$pochete=$unModele->verserFichier("pochettes", "pochette", "avatar.jpg",$titre);
			$requete="UPDATE promotion SET description=?, rabaisAdulte=?, rabaisEnfant=?, rabaisBebe=? WHERE idpromotion=?";
			$unModele=new circuitsModele($requete,array($des, $rabaisAdulte, $rabaisEnfant, $rabaisBebe, $idPromotion));
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

	function updateGroupe(){			
		$idCircuit =$_POST['circuitGroupe'];
		$idGroupeVoyage =$_POST['idGroupeVoyage'];
		$dateDepart= date("Y-m-d H:i:s", strtotime($_POST['dateDepartGroupe']));
		$dateRetour= date("Y-m-d H:i:s", strtotime($_POST['dateRetourGroupe']));
		$capacite =$_POST['capaciteGroupe'];
		$idPromotion = $_POST['promotionGroupe'];
		$prixAdulte =$_POST['prixAdulteGroupe'];
		$prixEnfant = $_POST['prixEnfantGroupe'];
		$prixBebe =$_POST['prixBebeGroupe'];

/*		/////////////////// lire le prix /////////////////////////////
		$requete="SELECT prix FROM circuit WHERE idCircuit=?";
		$unModele=new circuitsModele($requete,array($idCircuit));
		$stmt=$unModele->executer();
		$ligne=$stmt->fetch(PDO::FETCH_OBJ);
		$prix = $ligne->prix;
		unset($unModele);

		/////////////////// lire la promotion ///////////////////////
		$requete="SELECT rabaisAdulte, rabaisEnfant, rabaisBebe FROM promotion WHERE idPromotion=?";
		$unModele=new circuitsModele($requete,array($idPromotion));
		$stmt=$unModele->executer();
		$ligne=$stmt->fetch(PDO::FETCH_OBJ);
		$rabaisAdulte = $ligne->rabaisAdulte;
		$rabaisEnfant = $ligne->rabaisEnfant;
		$rabaisBebe = $ligne->rabaisBebe;
		unset($unModele);

		////////////////////////////////////////////////////////////
		//try{
			//$unModele=new circuitsModele();
			//$pochete=$unModele->verserFichier("pochettes", "pochette", "avatar.jpg",$titre);

			$prixAdulte = $prix * (1-$rabaisAdulte);
			$prixEnfant = $prix * (1-$rabaisEnfant);
			$prixBebe = $prix * (1-$rabaisBebe);   */
			$requete="UPDATE groupeVoyage SET dateDepart=?, dateRetour=?, idCircuit=?, idPromotion=?, capacite=?, prixAdulte=?, prixEnfant=?, prixBebe=? WHERE idGroupeVoyage=?";
			$unModele=new circuitsModele($requete,array($dateDepart,$dateRetour,$idCircuit, $idPromotion,$capacite, $prixAdulte,$prixEnfant, $prixBebe, $idGroupeVoyage));
			$stmt=$unModele->executer();

		//}catch(Exception $e){
		//}finally{
			unset($unModele);
		//}                                     
		echo "$idCircuit";
	}

	function etapeEn(){
		//$photo=$_POST['photoEtape'];
		//$photo= null;
		$des =$_POST['desEtape'];
		$idCircuit=$_POST['idCircuit'];
		$pays = $_POST['paysEtape'];
		try{
			$unModele=new circuitsModele();
			$pochette=$unModele->verserFichier("pochettes", "photoEtape", "avatar.jpg",$idCircuit);
			$requette="INSERT INTO etape VALUES(0,?,?,?,?)";
			$unModele=new circuitsModele($requette,array($pochette,$des,$idCircuit,$pays));
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
		//$photo= null;//$_POST['photoEtape'];
		$idEtape=$_POST['idEtape'];
		$desActivite =$_POST['desActivite'];
		$idHotel = $_POST['hotel'];
		$idResto = $_POST['resto'];
		$ville = $_POST['ville'];
		//try{
			$unModele=new circuitsModele();
			$pochette=$unModele->verserFichier("pochettes", "photoJour", "avatar.jpg",$idEtape);
			$requette="INSERT INTO jour VALUES(0,?,?,?,?,?,?,?)";
			$unModele=new circuitsModele($requette,array($desJour,$pochette,$idEtape,$desActivite, $idHotel,$idResto, $ville));
			$stmt=$unModele->executer();
			$id = $unModele->LAST_ID;

		//}catch(Exception $e){
		//}finally{
			unset($unModele);
		//}
		echo "$id";
	}

	function groupeEn(){			
		$idCircuit =$_POST['circuitGroupe'];
		$dateDepart= date("Y-m-d H:i:s", strtotime($_POST['dateDepartGroupe']));
		$dateRetour= date("Y-m-d H:i:s", strtotime($_POST['dateRetourGroupe']));
		$capacite =$_POST['capaciteGroupe'];
		$idPromotion = $_POST['promotionGroupe'];
		$prixAdulte =$_POST['prixAdulteGroupe'];
		$prixEnfant = $_POST['prixEnfantGroupe'];
		$prixBebe =$_POST['prixBebeGroupe'];
		$nbInscri = 0;

/*		/////////////////// lire le prix /////////////////////////////
		$requete="SELECT prix FROM circuit WHERE idCircuit=?";
		$unModele=new circuitsModele($requete,array($idCircuit));
		$stmt=$unModele->executer();
		$ligne=$stmt->fetch(PDO::FETCH_OBJ);
		$prix = $ligne->prix;
		unset($unModele);

		/////////////////// lire la promotion ///////////////////////
		$requete="SELECT rabaisAdulte, rabaisEnfant, rabaisBebe FROM promotion WHERE idPromotion=?";
		$unModele=new circuitsModele($requete,array($idPromotion));
		$stmt=$unModele->executer();
		$ligne=$stmt->fetch(PDO::FETCH_OBJ);
		$rabaisAdulte = $ligne->rabaisAdulte;
		$rabaisEnfant = $ligne->rabaisEnfant;
		$rabaisBebe = $ligne->rabaisBebe;
		unset($unModele);

		////////////////////////////////////////////////////////////
		//try{
			//$unModele=new circuitsModele();
			//$pochete=$unModele->verserFichier("pochettes", "pochette", "avatar.jpg",$titre);

			$prixAdulte = $prix * (1-$rabaisAdulte);
			$prixEnfant = $prix * (1-$rabaisEnfant);
			$prixBebe = $prix * (1-$rabaisBebe);    */
			$requette="INSERT INTO groupeVoyage VALUES(0,?,?,?,?,?,?,?,?,?)";
			$unModele=new circuitsModele($requette,array($nbInscri,$dateDepart,$dateRetour,$idCircuit, $idPromotion,$capacite, $prixAdulte,$prixEnfant, $prixBebe));
			$stmt=$unModele->executer();
			$id = $unModele->LAST_ID;

		//}catch(Exception $e){
		//}finally{
			unset($unModele);
		//}                                     
		echo "$idCircuit";
	}
	
	function promotionEn(){
		$des=$_POST['descriptionPromotion'];
		$rabaisAdulte=$_POST['rabaisAdultePromotion'];
		$rabaisEnfant=$_POST['rabaisEnfantPromotion'];
		$rabaisBebe=$_POST['rabaisBebePromotion'];
		//$photo=$_POST['photoCircuit'];
		//try{
			//$unModele=new circuitsModele();
			//$pochete=$unModele->verserFichier("pochettes", "pochette", "avatar.jpg",$titre);
			$requette="INSERT INTO promotion VALUE(0,?,?,?,?,?)";
			$unModele=new circuitsModele($requette,array($des, $rabaisAdulte, $rabaisEnfant, $rabaisBebe, "1"));
			$stmt=$unModele->executer();
			$id = (int)$unModele->LAST_ID;
			//$tabRes['action']="enregistrer";
			//$tabRes['msg']="Circuit bien enregistre";
		//}catch(Exception $e){
		//}finally{
			unset($unModele);
		//}
		echo "$rabaisEnfant";
	}

	function circuitLi() {
		$id =$_POST['id'];
		$requette="SELECT * FROM circuit WHERE idCircuit=?";
		try{
			 $unModele=new circuitsModele($requette,array($id));
			 $stmt=$unModele->executer();
			$ligne=$stmt->fetch(PDO::FETCH_OBJ);
			$Res=$ligne;
		}catch(Exception $e){
		}finally{
			unset($unModele);
		}

		if ($Res==null) {
			echo "null";
		} else {
			echo json_encode($Res);
			//echo "$Res";
		}
	}

	function circuitVigueurLi() {
		$requette="SELECT * FROM circuit WHERE enVigueur=1";
		//try{
			$unModele=new circuitsModele($requette,array());
			$stmt=$unModele->executer();
			$tabRes=array();
			while($ligne=$stmt->fetch(PDO::FETCH_OBJ)){
			   $tabRes[]=$ligne;
			}
	   //}catch(Exception $e){
	   //}finally{
		   unset($unModele);
	   //}
		echo json_encode($tabRes);
	}

	function etapeLi() {
		$idCircuit =$_POST['idCircuit'];
		$requete="SELECT * FROM etape WHERE idCircuit=?";
		try{
			$unModele=new circuitsModele($requete,array($idCircuit));
			$stmt=$unModele->executer();
			$tabRes=array();
			while($ligne=$stmt->fetch(PDO::FETCH_OBJ)){
			   $tabRes[]=$ligne;
			}
	   }catch(Exception $e){
	   }finally{
		   unset($unModele);
	   }
		echo json_encode($tabRes);
	}

	function jourLi() {
		$idEtape =$_POST['idEtape'];
		$requette="SELECT * FROM jour WHERE idEtape=?";
		try{
			$unModele=new circuitsModele($requette,array($idEtape));
			$stmt=$unModele->executer();
			$tabRes=array();
			while($ligne=$stmt->fetch(PDO::FETCH_OBJ)){
			   $tabRes[]=$ligne;
			}
	   }catch(Exception $e){
	   }finally{
		   unset($unModele);
	   }
		echo json_encode($tabRes);
	}

	function groupeLi() {
		$idGroupeVoyage =$_POST['idGroupeVoyage'];
		$requette="SELECT g.idGroupeVoyage, g.nbInscrit, g.dateDepart, g.dateRetour, g.idCircuit, c.nom, g.idpromotion, g.capacite, g.prixAdulte, g.prixEnfant, g.prixBebe  FROM groupevoyage g, circuit c WHERE g.idCircuit = c.idCircuit AND idGroupeVoyage=?";
		//try{
			$unModele=new circuitsModele($requette,array($idGroupeVoyage));
			$stmt=$unModele->executer();
			$tabRes=array();
			$ligne=$stmt->fetch(PDO::FETCH_OBJ);
			$tabRes=$ligne;
	  // }catch(Exception $e){
	  // }finally{
		   unset($unModele);
	  // }
		echo json_encode($tabRes);
	}

	function themeLi() {
		$requette="SELECT * FROM theme";
		try{
			$unModele=new circuitsModele($requette,array());
			$stmt=$unModele->executer();
			$tabRes=array();
			while($ligne=$stmt->fetch(PDO::FETCH_OBJ)){
			   $tabRes[]=$ligne;
			}
	   }catch(Exception $e){
	   }finally{
		   unset($unModele);
	   }
		echo json_encode($tabRes);
	}

	function hotelLi() {
		$requette="SELECT * FROM hotel";
		try{
			$unModele=new circuitsModele($requette,array());
			$stmt=$unModele->executer();
			$tabRes=array();
			while($ligne=$stmt->fetch(PDO::FETCH_OBJ)){
			   $tabRes[]=$ligne;
			}
	   }catch(Exception $e){
	   }finally{
		   unset($unModele);
	   }
		echo json_encode($tabRes);
	}

	function restoLi() {
		$requette="SELECT * FROM restaurant";
		try{
			$unModele=new circuitsModele($requette,array());
			$stmt=$unModele->executer();
			$tabRes=array();
			while($ligne=$stmt->fetch(PDO::FETCH_OBJ)){
			   $tabRes[]=$ligne;
			}
	   }catch(Exception $e){
	   }finally{
		   unset($unModele);
	   }
		echo json_encode($tabRes);
	}

	function promotionLi() {
		$idPromotion =$_POST['idPromotion'];
		$requette="SELECT * FROM promotion WHERE idpromotion=?";		
		//try{
			$unModele=new circuitsModele($requette,array($idPromotion));
			$stmt=$unModele->executer();
			$tabRes=array();
			$ligne=$stmt->fetch(PDO::FETCH_OBJ);
			$tabRes=$ligne;
			
	   //}catch(Exception $e){
	   //}finally{
		   unset($unModele);
	   //}
		echo json_encode($tabRes);
	}

	function supprimer() {
		$idCircuit = $_POST['idCircuit'];
		$requete="SELECT idEtape FROM etape WHERE idCircuit=?";
		try{
			$unModele=new circuitsModele($requete,array($idCircuit));
			$stmt=$unModele->executer();
			$idEtape=array();
			while($ligne=$stmt->fetch(PDO::FETCH_OBJ)){
			   $idEtape[]=$ligne->idEtape;
			}
	   }catch(Exception $e){
	   }finally{
		   unset($unModele);
	   }

	   $requete="SELECT idJour FROM jour WHERE idEtape=?";
	   $idJour=array();

	   for($i=0; $i<sizeof($idEtape);$i++) {
			$unModele=new circuitsModele($requete,array($idEtape[$i]));
			$stmt=$unModele->executer();

			while($ligne=$stmt->fetch(PDO::FETCH_OBJ)){
				$idJour[$i][]=$ligne->idJour;
			}	
			unset($unModele);				 
		}
		
		$requete="DELETE FROM jour WHERE idJour=?";

		foreach($idJour as $item) {
			foreach($item as $id) {
				$unModele=new circuitsModele($requete,array($id));
				$stmt=$unModele->executer();
				unset($unModele);
			}
		}

		$requete="DELETE FROM etape WHERE idEtape=?";
		foreach($idEtape as $id) {
			$unModele=new circuitsModele($requete,array($id));
			$stmt=$unModele->executer();
			unset($unModele);			
		}
	}

	function lireTousLesCircuits() {
		//$requete="SELECT * FROM circuit";
		$requette="SELECT c.idCircuit, c.nom, c.description, c.capacite, c.urlImage, c.prix, c.enVigueur, c.latitude, c.longitude, t.nom nomTheme FROM circuit c, theme t WHERE c.idTheme = t.idTheme ORDER BY c.idCircuit";
		//try{
			$unModele=new circuitsModele($requette,array());
			$stmt=$unModele->executer();
			$tabRes=array();
			while($ligne=$stmt->fetch(PDO::FETCH_OBJ)){
			   $tabRes[]=$ligne;
			}
	   //}catch(Exception $e){
	   //}finally{
		   unset($unModele);
	   //}
		echo json_encode($tabRes);
	}

	function lireTousLesGroupes() {
		$requete="SELECT g.idGroupeVoyage, g.nbInscrit, g.dateDepart, g.dateRetour, c.nom, g.idpromotion, g.capacite, g.prixAdulte, g.prixEnfant, g.prixBebe  FROM groupevoyage g, circuit c WHERE g.idCircuit = c.idCircuit ORDER BY idGroupeVoyage DESC";
		//try{
			$unModele=new circuitsModele($requete,array());
			$stmt=$unModele->executer();
			$tabRes=array();
			while($ligne=$stmt->fetch(PDO::FETCH_OBJ)){
			   $tabRes[]=$ligne;
			}
	   //}catch(Exception $e){
	   //}finally{
		   unset($unModele);
	   //}
		echo json_encode($tabRes);
	}

	function lireTousLesPromotions() {
		$requette="SELECT * FROM promotion";		
		//try{
			$unModele=new circuitsModele($requette,array());
			$stmt=$unModele->executer();
			$tabRes=array();
			while($ligne=$stmt->fetch(PDO::FETCH_OBJ)){
			   $tabRes[]=$ligne;
			}
	   //}catch(Exception $e){
	   //}finally{
		   unset($unModele);
	   //}
		echo json_encode($tabRes);
	}

	function toggleVigueur() {
		$idCircuit =$_POST['idCircuit'];
		$vigueur =$_POST['vigueur'];
		//try{
			//$unModele=new circuitsModele();
			//$pochete=$unModele->verserFichier("pochettes", "pochette", "avatar.jpg",$titre);
			$requette="UPDATE circuit SET enVigueur=? WHERE idCircuit=?";
			$unModele=new circuitsModele($requette,array($vigueur, $idCircuit));
			$stmt=$unModele->executer();
		//}catch(Exception $e){
		//}finally{
			unset($unModele);
		//}		
	}

	function getDuree() {
		$idCircuit =$_POST['idCircuit'];
		$requette= "SELECT count(*) duree from jour, etape where jour.idEtape = etape.idEtape AND idCircuit = ?";
		$unModele=new circuitsModele($requette,array($idCircuit));
		$stmt=$unModele->executer();
		$ligne=$stmt->fetch(PDO::FETCH_OBJ);
		$Res=$ligne->duree;

		echo "$Res";
	}

	//******************************************************
	
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
		case "groupeEn" :
			groupeEn();
		break;
		case "promotionEn" :
			promotionEn();
		break;
		case "circuitLi" :
			circuitLi();
		break;
		case "circuitVigueurLi" :
			circuitVigueurLi();
		break;
		case "promotionLi" :
			promotionLi();
		break;
		case "etapeLi" : 
			etapeLi();
		break;
		case "jourLi" : 
			jourLi();
		break;
		case "groupeLi" : 
			groupeLi();
		break;
		case "themeLi" : 
			themeLi();
		break;
		case "hotelLi" : 
			hotelLi();
		break;
		case "restoLi" : 
			restoLi();
		break;
		case "promotionMiseAJour" : 
			updatePromotion();		
		break;
		case "circuitMiseAJour" : 
			updateCircuit();		
		break;
		case "groupeMiseAJour" : 
			updateGroupe();		
		break;
		case "circuitSupprimer" : 
			supprimer();		
		break;
		case "lireTousLesCircuits": 
			lireTousLesCircuits();		
		break;
		case "lireTousLesGroupes": 
			lireTousLesGroupes();		
		break;
		case "lireTousLesPromotions": 
			lireTousLesPromotions();		
		break;
		case "toggleVigueur": 
			toggleVigueur();		
		break;
		case "getDuree": 
			getDuree();		
		break;
	} 


	//SELECT count(*) from jour, etape where jour.idEtape = etape.idEtape AND idCircuit = 1   ----------- lire duree d'un circuit
?>