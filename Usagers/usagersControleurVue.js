//vue films
function listerF(listFilms){
	var taille;
	var rep="<div class='table-users' style='overflow: scroll; height: 500px;'>";
	rep+="<div class='header'>Liste des films<span style='float:right;padding-right:10px;cursor:pointer;' onClick=\"$('#contenu').hide();\">X</span></div>";
	rep+="<table cellspacing='0'>";
	rep+="<tr><th>NUMERO</th><th>TITRE</th><th>DUREE</th><th>REALISATEUR</th><th>POCHETTE</th></tr>";
	taille=listFilms.length;
	for(var i=0; i<taille; i++){
		rep+="<tr><td>"+listFilms[i].idf+"</td><td>"+listFilms[i].titre+"</td><td>"+listFilms[i].duree+"</td><td>"+listFilms[i].res+"</td><td><img src='pochettes/"+listFilms[i].pochette+"' width=80 height=80></td></tr>";		 
	}
	rep+="</table>";
	rep+="</div>";
	$('#contenu').html(rep);
}

function afficherFiche(reponse){
  var uneFiche;
  if(reponse.OK) {
			uneFiche=reponse.fiche;
			$('#formFicheF h3:first-child').html("Fiche du film numero "+uneFiche.idf);
			$('#idf').val(uneFiche.idf);
			$('#titreF').val(uneFiche.titre);
			$('#dureeF').val(uneFiche.duree);
			$('#resF').val(uneFiche.res);
			$('#divFormFiche').show();
			document.getElementById('divFormFiche').style.display='block';
  } else {
			$('#messages').html("Film "+$('#numF').val()+" introuvable");
			setTimeout(function(){ $('#messages').html(""); }, 5000);
  }

}
function InscritUsager(reponse){
  var msg=document.getElementById('errenr');
  debugger;
	if(reponse.msg == "ok"){
		msg.innerHTML = "Merci pour vous inscrire chez nous ! vous pouvez maintenant vous connecter";
			msg.className = "text-success";

	}
	else if(reponse.msg == "existe") {
		msg.innerHTML = "L'utilisateur avec ce courriel déja existe";
		msg.className = "text-danger";
	}
	else if (reponse.msg == "erreur") {
		msg.innerHTML = "Il y a un probléme d'inscription , veuillez commncer à nouveau";
		msg.className = "text-danger";
	}

}
// ********************** selon l'action, on appelle la méthode concerné *******************
var usagersVue=function(reponse){
	var action=reponse.action; 
	switch(action){
		case "enregistrer" :

		break;
		case "enlever" :
		case "modifier" :
			$('#messages').html(reponse.msg);
			setTimeout(function(){ $('#messages').html(""); }, 5000);
		break;
		case "lister" :
			listerF(reponse.listeFilms);
		break;
		case "fiche" :
			afficherFiche(reponse);
		break;
		
	}
}

