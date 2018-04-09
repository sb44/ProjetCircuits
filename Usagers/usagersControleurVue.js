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
    if (reponse.msg == "OK") {
        var Usager=reponse.utilisateurs;
        
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
        case "twittConn":
            connexionTwitter(reponse);
            break;
        case "twitProf":
            ficheTwitter(reponse);
            break;
        case "continuTwitProf":
            continueficheTwitter(reponse);
            break;

    }
}