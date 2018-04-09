//GLOBALES
//-EXPRESSIONS RÉGULIÈRES:
var REG_EMAIL = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;
var REG_PASSWORD = /^[A-Za-z\d]{5,20}.{1}$/;
var REG_DUREE = /^[0-9]{2,3}$/;
var REG_URL = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var REG_PRIX = /^\d{1,3}\.\d{2}\s*$/;
var REG_NOM = /^[a-zA-Z]+\s*$/;
var REG_NUMPASSEPORT = /^[0-9]{8}\s*$/;
var REG_DATE = /^\d{4}-\d{2}-\d{2}$/;
//-FIN EXPRESSIONSRÉGULIÈRES
//var FILMS = [];
//var NO_FILM; //no Film à supprimer
//var CONTENT_USER_LOGIN;

$(document).ready(function() {
    listerCarte();
    estConnecte();


    /***** Ajax loader gif *******/
    $(document).ajaxStart(function() {
        $("#fadeAj").css("display", "block");
        $("#modalAj").css("display", "block");
    });
    $(document).ajaxComplete(function() {
        $("#modalAj").css("display", "none");
        $("#fadeAj").css("display", "none");
    });
    /*****Fin  Ajax loader gif *******/

    // actualiserNumeroPanierNavBarPanier(); //TODO : mettre le bon numero du carte dans le navbar
});

///////////////////  Validation menu Inscription ///////////////////////

function validerNom(txt) {
    txt.value = txt.value.replace(/[^a-zA-Z-'\n\r.]+/g, '');
}

function validerCourriel(courriel) {
    var msg = document.getElementById("errCourEnr");
    if (REG_EMAIL.test(courriel.value) == false && courriel.value != "") {
        msg.innerHTML = "Adresse courriel non-valide";
        msg.className = "text-danger";
    } else {
        msg.innerHTML = "";
    }
}

function validerDate(date) {
    var msg = document.getElementById("errDateNaissance");
    var d = date.value
    var bday = d.split("-");
    var annee = bday[0];

    if (REG_DATE.test(date.value) == false || annee < 1900 || annee > 2017) {
        msg.innerHTML = "date non-valide";
        msg.className = "text-danger";
    } else {
        msg.innerHTML = "";
    }
}

function checkRegPass(passe) {
    var msg = document.getElementById("errMotPasseEnr");
    if (REG_PASSWORD.test(passe.value) == false) {
        msg.innerHTML = "Vous devez entrez un mot de passe valide de 5 à 20 caractères de composé de lettres et chiffres. Un caractère spéciale est permis à la fin.";
    } else {
        msg.innerHTML = "";
    }
}

function checkPass() {
    var goodColor = "#66cc66";
    var badColor = "#ff6666";
    var pass1 = document.getElementById('inputMotPasseEnr');
    var pass2 = document.getElementById('inputMotPasseConfEnr');
    var message = document.getElementById('errMotPasseConfEnr');

    if (pass1.value == pass2.value) {
        pass2.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = "";
    } else {
        pass2.style.backgroundColor = badColor;
        message.innerHTML = "Répetition incorrécte!";
        message.style.color = badColor;
    }
}

function validerEnregistrement() { // fonction qui retour true ou false
    //debugger;
    var prenomEnr = document.getElementById('inputPrenom').value;
    var nomEnr = document.getElementById('inputNom').value;
    var dateEnr = document.getElementById('inputDateNaissance').value.trim();
    var sexeEnr = document.getElementById('inputSexe').value;
    var courrielEnr = document.getElementById('inputCourEnr').value.trim();
    var motDePasseEnr = document.getElementById('inputMotPasseEnr').value.trim();
    var motDePasseConfEnr = document.getElementById('inputMotPasseConfEnr').value.trim();

    var errDateEnr = document.getElementById('errDateNaissance').innerHTML;
    var errCourrielEnr = document.getElementById('errCourEnr').innerHTML;
    var errMotDePasseEnr = document.getElementById('errMotPasseEnr').innerHTML;

    if (errCourrielEnr == "" && errDateEnr == "" && errMotDePasseEnr == "" && motDePasseEnr == motDePasseConfEnr && prenomEnr != "" && nomEnr != "" && dateEnr != "" && sexeEnr != "" && courrielEnr != "" && motDePasseEnr != "") {
        document.getElementById('errenr').innerHTML = "";
        //alert("On a vérifié le formulaire");
        enregUsager();
        return true;
    } else {
        //alert("il y un probleme avec formulaire")
        document.getElementById('errenr').innerHTML = "Vous devez remplir tous les champ";
        return false;
    }
}
/////////////////// Fin Validation Inscription ///////////////////////

/////////////////// Validation connexion ///////////////////////
function validerCourrielConn(courriel) {
    var msg = document.getElementById("errCourConn");
    if (REG_EMAIL.test(courriel.value) == false && courriel.value != "") {
        msg.innerHTML = "Adresse courriel non-valide";
        msg.className = "text-danger";
    } else {
        msg.innerHTML = "";
    }
}

function validerConnexion() { // fonction qui retour true ou false
    //debugger;
    var courriel = document.getElementById('inputCourConn').value.trim();
    var errCourConn = document.getElementById('errCourConn').innerHTML;
    if (errCourConn == "" && courriel !== "") {
        //document.getElementById('connect').setAttribute("aria-expanded", "false");
        connUsager();
        return true;
    } else {
        document.getElementById('errConn').innerHTML = "Il y un probleme de formulaire";
        return false;
    }
}

function twitter() {
    alert("twitter bouton");
}
/////////////////// Fin Validation connexion ///////////////////////
////////////////////////////////////////////////////////////////////

function envoyerFormulaire(leForm) {
    //debugger;
    leForm.submit();
}

function rendreVisible(el) {
    document.getElementById(el).style.display = 'block';
}

function rendreInvisible(el) {
    document.getElementById(el).style.display = 'none';
}
///////////////////////////  Debut Carles///////////////////////////////////////

function validerAjoutVoyageur(counter) { // fonction qui retour true ou false
    //debugger;
    var estValide = new Array(counter);
    var isValid = true;

    for (var i = 0; i < counter; i++) {
        estValide[i] = true;
    }

    for (var i = 0; i < counter; i++) {

        var j = i + 1;
        $('#errNomVoyageur' + j).hide();
        $('#errPrenomVoyageur' + j).hide();
        $('#errNaissanceVoyageur' + j).hide();
        $('#errCourrielVoyageur' + j).hide();
        $('#errExpirationPasseportVoyageur' + j).hide();
        $('#errNoPassportVoyageur' + j).hide();
        $('#errDepotVoyageur' + j).hide();

        var nomVoyageur = document.getElementById('nomVoyageur' + j).value.trim();
        var prenomVoyageur = document.getElementById('prenomVoyageur' + j).value.trim();
        var naissanceVoyageur = document.getElementById('naissanceVoyageur' + j).value.trim();
        var noPassportVoyageur = document.getElementById('noPassportVoyageur' + j).value.trim();
        var courrielVoyageur = document.getElementById('courrielVoyageur' + j).value.trim();
        var expirationPasseportVoyageur = document.getElementById('expirationPasseportVoyageur' + j).value.trim();
        var depotVoyageur = document.getElementById('depotVoyageur' + j).value.trim();


        var regex = new RegExp(REG_EMAIL);
        if (!regex.test(courrielVoyageur)) {
            $('#errCourrielVoyageur' + j).show();
            estValide[i] = false;
        }

        var regex = new RegExp(REG_NOM);
        if (nomVoyageur == "") {
            $('#errNomVoyageur' + j).show();
            estValide[i] = false;
        }


        var regex = new RegExp(REG_DATE);
        if (!regex.test(naissanceVoyageur)) {
            $('#errNaissanceVoyageur' + j).show();
            estValide[i] = false;
        }

        var regex = new RegExp(REG_DATE);
        if (!regex.test(expirationPasseportVoyageur) || expirationPasseportVoyageur < naissanceVoyageur) {
            $('#errExpirationPasseportVoyageur' + j).show();
            estValide[i] = false;
        }


        if (prenomVoyageur == "") {
            $('#errPrenomVoyageur' + j).show();
            estValide[i] = false;
        }


        if (depotVoyageur == "") {
            $('#errDepotVoyageur' + j).show();
            estValide[i] = false;
        }

        var regex = new RegExp(REG_NUMPASSEPORT);
        if (!regex.test(noPassportVoyageur)) {
            $('#errNoPassportVoyageur' + j).show();
            estValide[i] = false;
        }

        isValid = isValid && estValide[i];
    }
    return isValid;
}


function traitement() {
    //debugger;
    var counter = $('#idCounter').val();

    if (validerAjoutVoyageur(counter)) {
        creerSommaire();
        $('#divCreateCommandForm').hide();
    }

}

function hidePreviousForms() {
    // debugger;
    var counter = $('#idCounter').val();
    for (var i = 0; i <= counter; i++) {
        $('#divVoyageur' + i).hide();
    }
}



////////////////////////   Fin Carles//////////////////////////////////////////
function showAdminDiv() {
    $('#carouselExampleIndicators').addClass("hide").removeClass("show");
    $('#landing').addClass("hide").removeClass("show");
    $('#map').addClass("hide").removeClass("show");
    $('#consulterCircuitsContainer').addClass("hide").removeClass("show");
    $('#lesCards').addClass("hide").removeClass("show");

    $('#divDetailPanier').addClass("hide").removeClass("show");
    $('#divDetailSommaire').addClass("hide").removeClass("show");
    $('#divCreateCommandForm').addClass("hide").removeClass("show");

    $('#container-HQ').addClass("show").removeClass("hide");
}

function hideAdminDiv() {
    //debugger;
    listerCarte(); // pour selon les changements fait de l'admin
    $('#carouselExampleIndicators').addClass("show").removeClass("hide");
    $('#landing').addClass("show").removeClass("hide");
    $('#map').addClass("show").removeClass("hide");
    $('#consulterCircuitsContainer').addClass("show").removeClass("hide");
    $('#lesCards').addClass("show").removeClass("hide");

    //$('#divDetailPanier').addClass("show").removeClass("hide");
    //$('#divDetailSommaire').addClass("show").removeClass("hide");
    //$('#divCreateCommandForm').addClass("show").removeClass("hide");

    $('#container-HQ').addClass("hide").removeClass("show");
}

function toutHide() {
    //// sauf le header et footer
    $('#carouselExampleIndicators').addClass("hide").removeClass("show");
    $('#messages').addClass("hide").removeClass("show");
    $('#landing').addClass("hide").removeClass("show");
    $('#contenu').addClass("hide").removeClass("show");
    $('#map').addClass("hide").removeClass("show");
    $('#consulterCircuitsContainer').addClass("hide").removeClass("show");
    $('#lesCards').addClass("hide").removeClass("show");
    $('#monProf').addClass("hide").removeClass("show");
    $('#divDetailPanier').addClass("hide").removeClass("show");
    $('#divDetailSommaire').addClass("hide").removeClass("show");
    $('#divCreateCommandForm').addClass("hide").removeClass("show");
    $('#container-HQ').addClass("hide").removeClass("show");

}