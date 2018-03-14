<?php
	require_once("../BD/connexion.inc.php");
	$idf=$_POST['num'];	
	$requette="SELECT * FROM films WHERE idf=?";
	$stmt = $connexion->prepare($requette);
	$stmt->execute(array($idf));
	if(!$ligne=$stmt->fetch(PDO::FETCH_OBJ)){
		echo "Film ".$num." introuvable";
		unset($connexion);
		unset($stmt);
		exit;
	}
	$pochette=$ligne->pochette;
	if($pochette!="avatar.jpg"){
		$rmPoc='../pochettes/'.$pochette;
		$tabFichiers = glob('../pochettes/*');
		//print_r($tabFichiers);
		// parcourir les fichier
		foreach($tabFichiers as $fichier){
		  if(is_file($fichier) && $fichier==trim($rmPoc)) {
			// enlever le fichier
			unlink($fichier);
			break;
		  }
		}
	}
	$requette="DELETE FROM films WHERE idf=?";
	$stmt = $connexion->prepare($requette);
	$stmt->execute(array($idf));
	unset($connexion);
	unset($stmt);
	echo "<br><b>LE FILM : ".$idf." A ETE RETIRE</b>";
?>
<br><br>
<a href="../films.html">Retour à la page d'accueil</a>