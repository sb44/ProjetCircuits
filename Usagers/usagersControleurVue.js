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
    //alert(1111);
    var msg = document.getElementById('errConn');
    if (reponse.msg == "ok") {
        msg.innerHTML = "Merci pour vous connecter chez TOURISTIA";
        msg.className = "text-success";
        setTimeout(function() {
            $('#connexion-dropdown').removeClass("show");
            msg.innerHTML = "";
            document.getElementById("formConn").reset();
        }, 1200);
        $('#navDeconnexion').removeClass("hide");
        $('#navEnregistrement').addClass("hide");
        $('#navConnexion').addClass("hide");
        if (reponse.role == "admin") {
            $('#navConnecteAdmin').toggleClass("hide");
        } else if(reponse.role == "utilisateur") {
            $('#navPanier').removeClass("hide");
            $('#monProfile').removeClass("hide");
            $('#monProfMot').append(reponse.nomUtilisateur);
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
        window.location.href="http://127.0.0.1/Circuit/ProjetCircuits/circuits.html";
    } else {
        alert("problème au moment de déconnexion");
    }
}
function monProfileUs(reponse) {
    //debugger;
    if (reponse.msg == "OK") {
        var Usager=reponse.utilisateurs;
        
        //ajout sb mod profil
        $("#inputPrenomModifInit").text(Usager.prenom);
        $("#inputNomModifInit").text(Usager.nom);
        $("#inputDateNaissanceModifInit").text(Usager.dateNaissance);
        $("#inputCourModifInit").text(reponse.courriel);

        $("#inputPrenomModif").val(Usager.prenom);
        $("#inputNomModif").val(Usager.nom);
        $("#inputDateNaissanceModif").val(Usager.dateNaissance);
        $("#inputCourModif").val(reponse.courriel);
        $("#idConnexionModProf").val(Usager.idConnexion);
        $("#idUsagerModProf").val(Usager.idUtilisateur);
        //$("#btnmodifierUsager").attr("onclick", "modifierUsager\(" + Usager.idUtilisateur + "," + Usager.idConnexion + "\)");
        //fin ajout sb

        
        $("#inputPrenomModif").attr("placeholder",Usager.prenom);
        $("#inputNomModif").attr("placeholder",Usager.nom);
        $("#inputDateNaissanceModif").attr("value",Usager.dateNaissance);
        $("#inputCourModif").attr("placeholder",reponse.courriel);
        
        toutHide();
        $('#monProf').removeClass("hide");

    }else if(reponse.msg == "twitter") {
        alert("Vous pouvez voir votre profile sur le twitter!!!");
        window.location.href=reponse.url_twitter;
        
    }else{
        alert("problème de trouver votre profil");
    }
}

function connecterValide(reponse) {
    if (reponse.msg == "ok") {
        $('#navDeconnexion').removeClass("hide");
        $('#navEnregistrement').addClass("hide");
        $('#navConnexion').addClass("hide");

        if (reponse.role == "admin") {
            $('#navConnecteAdmin').removeClass("hide");
        }else if(reponse.role == "utilisateur") {
            $('#navPanier').removeClass("hide");
            $('#monProfile').removeClass("hide");
            $('#monProfMot').append(reponse.nomUtilisateur);

            if (reponse.itemCount) {
                $('#nbItemPanier').text("(" + reponse.itemCount + ")");
            } else {
                $('#nbItemPanier').text("(0)");
            }
        }else if(reponse.role == "twitter") {
            //alert("vous etes connecter par votre compte twitter");
            
            if (reponse.itemCount) {
                $('#nbItemPanier').text("(" + reponse.itemCount + ")");
            } else {
                $('#nbItemPanier').text("(0)");
            }
            profileTwitter();
        }else if(reponse.role == "twitterApres") {
           // alert("vous avez fait refresh mais encore connecter par twitter");
            
            if (reponse.itemCount) {
                $('#nbItemPanier').text("(" + reponse.itemCount + ")");
            } else {
                $('#nbItemPanier').text("(0)");
            }
            $('#navEnregistrement').addClass("hide");
            $('#navConnexion').addClass("hide");
            
            $('#navDeconnexion').removeClass("hide");
            $('#navPanier').removeClass("hide").addClass("show");
            $('#monProfile').removeClass("hide").addClass("show");
        
            $('#imgTwitter').attr('src', reponse.photoUrl);
            $('#monProfMot').append(reponse.nomUtilisateur);
            $('#imgTwitter').removeClass("hide");
            //profileTwitter();
        }
    }else{
        //alert("non connecte");
        
    }
}
function connexionTwitter(reponse) {
    try {
        
        if (reponse.msg2 == "curl oui") {
            window.location.replace(reponse.msg3);
        } else {
            alert("cUrl non installé");
        }
    } catch (error) {
        alert("probleme de cUrl avec Apache")
    }
}
function ficheTwitter(reponse) {
    if (reponse.msg == "ok") {
        
        $('#navEnregistrement').addClass("hide");
        $('#navConnexion').addClass("hide");
        
        $('#navDeconnexion').removeClass("hide");
        $('#navPanier').removeClass("hide").addClass("show");
        $('#monProfile').removeClass("hide").addClass("show");
    
        $('#imgTwitter').attr('src', reponse.photoUrl);
        $('#monProfMot').append(reponse.nomUtilisateur);
        $('#imgTwitter').removeClass("hide");

    } else if(reponse.msg == "non") {
        alert("yejayi moshkele");
    } else if(reponse.msg == "denied") {
        alert("Vous n'avez pas autoriser le twitter");
        $('#navEnregistrement').removeClass("hide");
        $('#navConnexion').removeClass("hide");
        
        $('#navDeconnexion').addClass("hide");
    }
    
   
            //window.location.replace(reponse.msg4);
}
function continueficheTwitter(reponse) {
    
    $('#navEnregistrement').addClass("hide");
    $('#navConnexion').addClass("hide");
    
    $('#navDeconnexion').removeClass("hide");
    $('#navPanier').removeClass("hide");
    $('#monProfile').removeClass("hide");

    $('#imgTwitter').attr('src', reponse.photoUrl);
    $('#monProfMot').append(reponse.nomUtilisateur);
    $('#imgTwitter').removeClass("hide");
            //window.location.replace(reponse.msg4);
}

function miseAjourProfilUsager(reponse) {
    debugger;
    if (reponse.msg == "ok") {

        var profileUser = reponse.profileUser;
        //modifier l'affichage de base: 
        $("#inputPrenomModifInit").text(profileUser.prenom);
        $("#inputNomModifInit").text(profileUser.nom);
        $("#inputDateNaissanceModifInit").text(profileUser.dateNaissance);
        $("#inputCourModifInit").text(profileUser.courriel);

        $('#monProfMot').html("<img id=\"imgTwitter\" src=\"\" alt=\"\" class=\"hide rounded-circle mr-2\" style=\"height: 30px;\"><i class=\"fa fa-pencil-square-o mr-1\"></i>");
        $('#monProfMot').append(profileUser.nom);

        //afficher succès et effacer apres 4 secondes:
        $('#successModProfil').text("Profil modifié avec succès!");
        setTimeout(function() {
            $('#successModProfil').text("");
          }, 4500); 
    } else {
        // erreur:
        $('#errModProfil').text("Il y a eu un problème pour la modification de votre profile sur le server : \"" + reponse.msg + "\". Veuillez réeassayer.");
    }
}

// ********************** selon l'action, on appelle la méthode concerné *******************
var usagersVue = function(reponse) {
    debugger;
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
        case "twittConn":
            connexionTwitter(reponse);
            break;
        case "twitProf":
            ficheTwitter(reponse);
            break;
        case "continuTwitProf":
            continueficheTwitter(reponse);
            break;
        case "miseAjourProfilUsager":
            miseAjourProfilUsager(reponse);
            break;
    }
}