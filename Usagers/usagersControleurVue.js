/* //vue films
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

} */
function InscritUsager(reponse) {
    var msg = document.getElementById('errenr');
    //debugger;
    if (reponse.msg == "ok") {
        msg.innerHTML = "Merci pour vous inscrire chez nous ! vous pouvez maintenant vous connecter";
        msg.className = "text-success";
        setTimeout(function() {
            $('#inscription-dropdown').removeClass("show");
            msg.innerHTML = "";
            document.getElementById("formEnr").reset();
            $('#connexion-dropdown').addClass("show");
        }, 2000);

    } else if (reponse.msg == "existe") {
        msg.innerHTML = "L'utilisateur avec ce courriel déja existe";
        msg.className = "text-danger";
    } else if (reponse.msg == "erreur") {
        msg.innerHTML = "Il y a un probléme d'inscription , veuillez commncer à nouveau";
        msg.className = "text-danger";
    }

}

function seConnecter(reponse) {
    var msg = document.getElementById('errConn');
    //debugger;
    if (reponse.msg == "ok") {
        msg.innerHTML = "Merci pour vous connecter chez TOURISTIA";
        msg.className = "text-success";
        setTimeout(function() {
            $('#connexion-dropdown').removeClass("show");
            msg.innerHTML = "";
            document.getElementById("formConn").reset();
        }, 1200);

        $('#navDeconnexion').toggleClass("hide");
        $('#navEnregistrement').toggleClass("hide");
        $('#navConnexion').toggleClass("hide");
        if (reponse.role == "admin") {
            $('#navConnecteAdmin').toggleClass("hide");
        } else {
            $('#navPanier').toggleClass("hide");
            $('#monProfile').toggleClass("hide");
        }

    } else if (reponse.msg == "mdpIncorrecte") {
        msg.innerHTML = "Votre mot de passe est incorrecte";
        msg.className = "text-danger";
    } else if (reponse.msg == "nonInscrit") {
        msg.innerHTML = "Ce courriel n'est pas encore inscrit dans le système , veuillez vous inscrire";
        msg.className = "text-danger";
    }

}

function deconnexion(reponse) {
    if (reponse.msg == "ok") {
        //alert("deconnexion complète");
        location.reload(true);
    } else {
        alert("problème au moment de déconnexion");
    }
}
function monProfileUs(reponse) {
    if (reponse.msg == "OK") {
        var Usager=reponse.utilisateurs;
        
        $("#inputPrenomModif").attr("placeholder",Usager.prenom);
        $("#inputNomModif").attr("placeholder",Usager.nom);
        $("#inputDateNaissanceModif").attr("value",Usager.dateNaissance);
        $("#inputCourModif").attr("placeholder",reponse.courriel);
    } else {
        alert("problème de trouve votre profil");
    }
}

function connecterValide(reponse) {
    if (reponse.msg == "ok") {
        $('#navDeconnexion').removeClass("hide");
        $('#navEnregistrement').addClass("hide");
        $('#navConnexion').addClass("hide");
        if (reponse.role == "admin") {
            $('#navConnecteAdmin').removeClass("hide");
        } else {
            $('#navPanier').removeClass("hide");
            $('#monProfile').removeClass("hide");
                    if (reponse.itemCount) {
                        $('#nbItemPanier').text("(" + reponse.itemCount + ")");
                    } else {
                        $('#nbItemPanier').text("(1)");
                    }
        }
    } else {

    }
}

// ********************** selon l'action, on appelle la méthode concerné *******************
var usagersVue = function(reponse) {
    var action = reponse.action;
    switch (action) {
        case "enregistrer":
            InscritUsager(reponse);
            break;
        case "connecter":
            seConnecter(reponse);
            break;
        case "monProfile":
            monProfileUs(reponse);
            break;
        case "deconnecter":
            deconnexion(reponse);
            break;
        case "fiche":
            afficherFiche(reponse);
            break;
        case "estConnecter":
            connecterValide(reponse);
            break;

    }
}