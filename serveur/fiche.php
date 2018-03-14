<script language="javascript" src="../js/global.js"></script>
<link rel="stylesheet" href="../css/films.css" type="text/css" />
<?php
	require_once("../BD/connexion.inc.php");
	
	function envoyerForm($ligne){
		global $idf;
		$rep = "<form id=\"formEnreg\"  enctype=\"multipart/form-data\" action=\"modifier.php\" method=\"POST\" onSubmit=\"return valider();\">\n"; 
		$rep.= "	<h3>Fiche du film ".$idf." </h3><br><br>\n"; 
		$rep.= "	<span onClick=\"rendreInvisible('divEnreg')\">X</span><br>\n"; 
		$rep.= "	Numero:<input type=\"text\" id=\"num\" name=\"num\" value='".$ligne->idf."' readonly><br>\n"; 
		$rep.= "	Titre:<input type=\"text\" id=\"titre\" name=\"titre\" value='".$ligne->titre."'><br>\n"; 
		$rep.= "	Duree:<input type=\"text\" id=\"duree\" name=\"duree\" value='".$ligne->duree."'><br>\n"; 
		$rep.= "	Realisateur:<input type=\"text\" id=\"res\" name=\"res\" value='".$ligne->res."'><br><br>\n"; 
		$rep.= "  Pochette:<input type=\"file\" id=\"pochette\" name=\"pochette\"><br><br>";
		$rep.= "	<input type=\"submit\" value=\"Envoyer\"><br>\n"; 
		$rep.= "</form>\n";
		return $rep;
	}
	//Obtenir le film en question
	$idf=$_POST['num'];
	$requette="SELECT * FROM films WHERE idf=?";
	$stmt = $connexion->prepare($requette);
	$stmt->execute(array($idf));
	if(!$ligne=$stmt->fetch(PDO::FETCH_OBJ)){
		echo "Film ".$idf." introuvable";
		unset($connexion);
		unset($stmt);
		exit;
	}
	unset($connexion);
	unset($stmt);
	echo envoyerForm($ligne);
?>