<?php
	require_once("../BD/connexion.inc.php");
	$rep="<caption>LISTE DES FILMS</caption>";
	$rep.="<table border=1>";
	$rep.="<tr><th>NUMERO</th><th>TITRE</th><th>DUREE</th><th>REALISATEUR</th><th>POCHETTE</th></tr>";
	$requette="SELECT * FROM films";
	try{
		 $stmt = $connexion->prepare($requette);
		 $stmt->execute();
		 while($ligne=$stmt->fetch(PDO::FETCH_OBJ)){
			$rep.="<tr><td>".($ligne->idf)."</td><td>".($ligne->titre)."</td><td>".($ligne->duree)."</td><td>".($ligne->res)."</td><td><img src='../pochettes/".($ligne->pochette)."' width=80 height=80></td></tr>";		 }
	 }catch (Exception $e){
		echo "Probleme pour lister";
	 }finally {
		$rep.="</table>";
		unset($connexion);
		unset($stmt);
		echo $rep;
	 }
?>
<br><br>
<a href="../films.html">Retour à la page d'accueil</a>