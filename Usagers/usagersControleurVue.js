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
function getCommandesUsager(reponse) {
    debugger;
    if (reponse.msg == "ok") {
        var lstCommandes = reponse.listeCommandes;
        var noCommande;
        var noVoy= 0;
        //afficher tout les commandes ainsi que tout les utilisateurs
        for (var i = 0; i < lstCommandes.length; i++) {
            if (noCommande != lstCommandes[i].idCommande) { // nouvelle commande
                noVoy = 1;
                $('#fadsfads').after('<tr>'
                    +'<td></td>'
                    +'<td></td>'
                    +'<td></td>'
                    +'<td></td>'
                    +'<td></td>'
                    +'<td></td>'
                    +'<td></td>'
                    +'<td></td>'
                    +'<td></td>'
                    +'<td></td>'
                    +'<td></td>'
                    +'</tr>'
                    +'<tr bgcolor="#C6C8CA" id=comm' + lstCommandes[i].idCommande + '>'
                    +'<td style="border-top: 1px solid #CD5AB3;">'+ lstCommandes[i].idCommande + '</td>'
                    +'<td style="border-top: 1px solid #CD5AB3;">'+ lstCommandes[i].idGroupeVoyage +'</td>'
                    +'<td style="border-top: 1px solid #CD5AB3;">'+ lstCommandes[i].nbInscrit + ' / ' + lstCommandes[i].capacite  +'</td>'
                    +'<td style="border-top: 1px solid #CD5AB3;">'+ lstCommandes[i].dateInscription + '</td>'
                    +'<td style="border-top: 1px solid #CD5AB3;">'+ lstCommandes[i].dateDepart + '</td>'
                    +'<td style="border-top: 1px solid #CD5AB3;">'+ lstCommandes[i].dateRetour + '</td>'
                    +'<td style="border-top: 1px solid #CD5AB3;" class="text-success"><strong>'+ lstCommandes[i].prixTotal + '</strong></td>'
                    +'<td style="border-top: 1px solid #CD5AB3; color: #CD5AB3;"><strong>'+ lstCommandes[i].montantDepot + '</strong></td>'
                    +'<td style="border-top: 1px solid #CD5AB3;" class="text-danger"><strong>'+ lstCommandes[i].montantApayer + '</strong></td>'
                    +'<td style="border-top: 1px solid #CD5AB3;"><button type="button" class="payerLaBalance" name=' + lstCommandes[i].montantApayer + ' onclick="payerLaBalance(' + lstCommandes[i].idCommande + "," + lstCommandes[i].idUtilisateur + ')";><span class="oi oi-dollar" title="Régler votre balance à payer par PayPal maintenant!"></span></button></td>'
                    +'<td style="border-top: 1px solid #CD5AB3;"><button type="button" onclick="afficheVoyageursDeComm(' + lstCommandes[i].idCommande + ')";><span class="oi oi-caret-bottom" title="Afficher détails voyageurs"></span></button></td>'
                    +'</tr>'
                    +'<tr>'
                    +'<td></td>'
                    +'<td></td>'
                    +'<td colspan="4" style="border-top: 2px solid #ADAFB1"><strong>Coût total ($) <small><strong>(Toutes taxes inclues)</strong></small></strong></td>'
                    +'<td class="text-success" style="border-top: 2px solid #ADAFB1"><strong>'+ lstCommandes[i].prixTotal + '$</strong></td>'
                    +'<td></td>'
                    +'<td></td>'
                    +'<td></td>'
                    +'<td></td>'
                    +'</tr>'
                    +'<tr>'
                    +'<td></td>'
                    +'<td></td>'
                    +'<td colspan="3" style="border-top: 2px solid #ADAFB1"></td>'
                    +'<td colspan="2" style="border-top: 2px solid #ADAFB1"><button class="btnPayPalSB" name=' + lstCommandes[i].montantApayer + '>Payer la balance de ' + lstCommandes[i].montantApayer + ' $ maintenant</button></td>'
                    +'<td></td>'
                    +'<td></td>'
                    +'<td></td>'
                    +'<td></td>'
                    +'</tr>'
                    +'<tr>'
                    +'<td></td>'
                    +'<td></td>'
                    +'<td colspan="5" style="border-top: 2px solid #ADAFB1"></td>'
                    +'<td></td>'
                    +'<td></td>'
                    +'<td></td>'
                    +'<td></td>'
                    +'</tr>'
                    +'<tr bgcolor="#C6C8CA">'
                    +'<td style="border-bottom: 1px solid #CD5AB3;"></td>'
                    +'<td style="border-bottom: 1px solid #CD5AB3;"></td>'
                    +'<td colspan="7" style="border-bottom: 1px solid #CD5AB3;"><strong>Bon voyage!</strong></td>'
                    +'<td style="border-bottom: 1px solid #CD5AB3;"></td>'
                    +'<td style="border-bottom: 1px solid #CD5AB3;"><button type="button" onclick="cacherVoyageursDeComm(' + lstCommandes[i].idCommande + ')";><span class="oi oi-caret-top" title="Cacher ces détails de circuit"></span></button></td>'
                    +'</tr>');
                    
                    //ligne vide avant d'afficher header voyageurs
                    $('#comm' + lstCommandes[i].idCommande + '').after('<tr class="" id=comm' + lstCommandes[i].idCommande + i + 'vide' + '>'
                        +'<td></td>'
                        +'<td></td>'
                        +'<td></td>'
                        +'<td></td>'
                        +'<td></td>'
                        +'<td></td>'
                        +'<td></td>'
                        +'<td></td>'
                        +'<td></td>'
                        +'<td></td>'
                        +'<td></td>'
                        +'</tr>');
                    
                    // header voyageurs
                    $('#comm' + lstCommandes[i].idCommande + i + 'vide').after(''
                    +'<tr>'
                    +'<td></td>'
                    +'<td></td>'
                    +'<td colspan="5"><strong>Items de la commande no ' + lstCommandes[i].idCommande + ' (' + lstCommandes[i].nomCircuit + ')</strong></td>'
                    +'<td></td>'
                    +'<td></td>'
                    +'<td></td>'
                    +'<td></td>'
                    +'</tr>'
                    +'<tr class="" id=comm' + lstCommandes[i].idCommande + i + 'entete' + '>'
                        +'<td></td>'
                        +'<td></td>'
                        +'<td style="border-bottom: 2px solid #ADAFB1; border-top: 2px solid #ADAFB1;"><strong>No voyageur</strong></td>'
                        +'<td style="border-bottom: 2px solid #ADAFB1; border-top: 2px solid #ADAFB1;"><strong>Nom voyageur</strong></td>'
                        +'<td style="border-bottom: 2px solid #ADAFB1; border-top: 2px solid #ADAFB1;"><strong>Prénom voyageur</strong></td>'
                        +'<td style="border-bottom: 2px solid #ADAFB1; border-top: 2px solid #ADAFB1;"><strong>Type voyageur</strong></td>'
                        +'<td style="border-bottom: 2px solid #ADAFB1; border-top: 2px solid #ADAFB1;"><strong>Coût unitaire</strong></td>'
                        +'<td></td>'
                        +'<td></td>'
                        +'<td></td>'
                        +'<td></td>'
                        +'</tr>');

                    //voyageur 1
                    $('#comm' + lstCommandes[i].idCommande + i + 'entete').after('<tr class="" id=comm' + lstCommandes[i].idCommande + i + 'voy' + '>'
                        +'<td></td>'
                        +'<td></td>'
                        +'<td>1</td>'
                        +'<td>'+ lstCommandes[i].nomVoyageur + '</td>'
                        +'<td>'+ lstCommandes[i].prenomVoyageur + '</td>'
                        +'<td>'+ lstCommandes[i].typeVoyageur + '</td>'
                        +'<td class="text-success">'+ lstCommandes[i].coutVoyageur + '</td>'
                        +'<td></td>'
                        +'<td></td>'
                        +'<td></td>'
                        +'<td></td>'
                        +'</tr>');
            } else { 
                //on ajoute voyageur à la commande existante

                //voyageur i + 1
                $('#comm' + lstCommandes[i-1].idCommande + (i-1) + 'voy' + '').after('<tr class="" id=comm' + lstCommandes[i].idCommande + i + 'voy' + '>'
                    +'<td></td>'
                    +'<td></td>'
                    +'<td>'+ ++noVoy +'</td>'
                    +'<td>'+ lstCommandes[i].nomVoyageur + '</td>'
                    +'<td>'+ lstCommandes[i].prenomVoyageur + '</td>'
                    +'<td>'+ lstCommandes[i].typeVoyageur + '</td>'
                    +'<td class="text-success">'+ lstCommandes[i].coutVoyageur + '</td>'
                    +'<td></td>'
                    +'<td></td>'
                    +'<td></td>'
                    +'<td></td>'
                    +'</tr>'); 

            }
            noCommande = lstCommandes[i].idCommande;
        }
        
        //disablé les boutons où montant à payer est nul:
        $( ".payerLaBalance" ).each(function( index ) {
            debugger;    
            var latrib = $(this).attr('name');
            if (latrib == "0.00") {
                $(this).removeAttr('name').prop("disabled",true);
                $(this).attr('title', 'Cette balance de commande est réglé!');
            }else
                $(this).removeAttr('name');
          });

        // disablé les boutons (gros)
        $( ".btnPayPalSB" ).each(function( index ) {
            debugger;    
            var latrib = $(this).attr('name');
            if (latrib == "0.00") {
                $(this).removeAttr('name').prop("disabled",true);
                $(this).attr('title', 'Cette balance de commande est réglé!');
            }else
                $(this).removeAttr('name');
          });

          //cacher les rows 
            var comman = "";
            for (var i = 0; i < lstCommandes.length; i++) { 
                if (lstCommandes[i].idCommande != comman) {
                    cacherVoyageursDeComm(lstCommandes[i].idCommande);
                }
                comman = lstCommandes[i].idCommande;
            }
    }

    /*
    idCommande:"2"
    idGroupeVoyage:"1"
    nomCircuit:"Voyage organisé en Tanzanie & Zanzibar"
    nbInscrit:"2"
    capacite:"40"
    dateInscription:"2018-04-17"
    dateDepart:"2018-09-16"
    dateRetour:"2018-10-03"
    prixTotal:"4"
    montantDepot:"4"
    montantApayer:"0.00"
    nomVoyageur:"bouchard" ****************
    prenomVoyageur:"sasha" ****************
    typeVoyageur:"Adulte" ****************
    coutVoyageur:"2.00" ****************

    idCommande:"2"
    idGroupeVoyage:"1"
    nomCircuit:"Voyage organisé en Tanzanie & Zanzibar"
    nbInscrit:"2"
    capacite:"40"
    dateInscription:"2018-04-17"
    dateDepart:"2018-09-16"
    dateRetour:"2018-10-03"
    prixTotal:"4"
    montantDepot:"4"
    montantApayer:"0.00"
    nomVoyageur:"amiri" ****************
    prenomVoyageur:"arash" ****************
    typeVoyageur:"Adulte" ****************
    coutVoyageur:"2.00" ****************

    ...ensuite commande 3... etc.
    */
}
function afficheVoyageursDeComm(noCommande) {
    //on loop tout les rows  
    // (notre row d'index 2 correspond à notre plus récente commande)
    // stratégie: on trouve notre row d'index "noCommande" et on trouve la row "Bon voyage!""
    //debugger;
    var rowIndex = $('#comm' + noCommande +'').index(); //notre row d'index "noCommande"

    var table = document.getElementById('sgdfgdgsd');
    var rowLength = table.rows.length;
    var finalRow = rowLength;
    for(var i=rowIndex; i<rowLength; i+=1){
        var row = table.rows[i];
        row.style.display = '';
        //var cellLength = row.cells.length;
        //for(var y=0; y<cellLength; y+=1){
            var cell = row.cells[2];
            if (cell.innerText == "Bon voyage!") {
                finalRow = i;
                break;
            }
    }           




}
function cacherVoyageursDeComm(noCommande) {
    //debugger;
    var rowIndex = $('#comm' + noCommande +'').index(); //notre row d'index "noCommande"
    rowIndex +=2; //pour éviter de cacher la 1e
    var table = document.getElementById('sgdfgdgsd');
    var rowLength = table.rows.length;
    var finalRow = rowLength;
    for(var i=rowIndex; i<rowLength; i+=1){
        var row = table.rows[i];
        row.style.display = 'none';
        //var cellLength = row.cells.length;
        //for(var y=0; y<cellLength; y+=1){
            var cell = row.cells[2];
            if (cell.innerText == "Bon voyage!") {
                finalRow = i;
                break;
            }
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
        case "getCommandesUsager":
            getCommandesUsager(reponse);
            break;
    }
}