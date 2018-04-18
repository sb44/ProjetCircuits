<html>
<head>
<title>Order Receipt</title>
<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
<div id="main">
<center><h1> Accusé de Reception</h1></center>
<div id="container">
<h2>Status de la Commande</h2>
<hr/>
<!-- checking success details by PHP $_REQUEST array -->
<img id="pizza-success" src="images/merci.jpg">

<?php if (isset($_REQUEST['st']) == 'completed') { ?>
   
		
<?php } else { ?>


    <?php 
//enregistrement dans la BD
require_once("./includes/modele.inc.php");

		session_start();
		global $tabRes;
		$balance=0;
		$nbInscriptions=0;
		$counter=0;

        $counter=count($_SESSION["trip_Summary"]);


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
			$nom = $_SESSION["trip_Summary"][$i]['item_name'];
			$prenom=$_SESSION["trip_Summary"][$i]['item_prenom'];
			$dateNaissance=$_SESSION["trip_Summary"][$i]['item_naissanceVoyageur'];
			$noPasseport=$_SESSION["trip_Summary"][$i]['item_id'];
			$idSexe=$_SESSION["trip_Summary"][$i]['item_sexeVoyageur'];
			$courriel=$_SESSION["trip_Summary"][$i]['item_courrielVoyageur'];
			$dateExpiration=$_SESSION["trip_Summary"][$i]['item_expirationPasseportVoyageur'];
			$Categorie=$_SESSION["trip_Summary"][$i]['item_categorie'];
			$idCommande=$_SESSION["trip_Summary"][$i]['item_idGroupeVoyage'];
		
			$nbInscription= $counter;
		

			switch($Categorie){
				case "Adulte":
				$idCategorie="1";
				break;
				case "Enfant":
				$idCategorie="2";
				break;
				case "Bébé":
				$idCategorie="3";
				break;
				}



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

			if(($ligneNbCommande&&$ligneNbCommande<$ligneCapacite &&!$groupeVoyageId) ||!$ligneNbCommande){

				if($groupeVoyageId!=$idCommande && $utilisateurId!=$idUtilisateur){

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
	
        ?>

<?php } 

if($groupeVoyageId){
    $msg="Circuit déja Payé!";
}else{
    $msg="Circuit enregistré avec Succés!";
}

?>

<center><h3 style="color:red;"><?php echo $msg?></h3></center>

<br><br>
<center><a id="backTopizza" href="circuits.html" ><< Retour au Marchand</a></center>
<br><br>
</div>

</div>
</body>
</html>