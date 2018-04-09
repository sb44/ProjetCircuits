var counter = 1;


function addToCart(reponse) {
    $('#nbItemPanier').text("(" + reponse.itemCount + ")");
}


function createSummary(reponse) {}

function displayOrders(reponse) {}



function displaySummary(reponse) {
    //  $('#btnEnregistrer').show();
    //debugger
    var groupeVoyages = Array();
    var nbSummaryItems = reponse.nbSummaryItems;

    if (nbSummaryItems > 0) {
        $('#divDetailSommaire').hide();
        var input = "";
        var sommaire = reponse.summaryList;
        var total = 0;
        var sousTotal = 0;
        var totalDepot = 0;
        var sousTotalDepot = 0;
        var balance = 0;
        var sousBalance = 0;
        input += "<div class=\"row\"><span onClick=\"$('#divDetailSommaire').hide();\">X</span><h3> Sommaire des Coûts</h3>";
        //input += "<div class=\"col-md-12 col-lg-10\"><table border=\"0\" class=\"table table-hover\">";
        // input += "<tr><th> Nom </th> <th> Prénom </th> <th> Catégorie</th> <th> Coût unitaire</th><th>Dépot Initial</th><th>Circuit</th><th></th><th></th></tr> ";

        for (var i = 0; i < sommaire.length; i++) {
            if (groupeVoyages.indexOf(sommaire[i].item_circuit + "(" + sommaire[i].item_dateDepart + ")") == -1) {
                groupeVoyages.push(sommaire[i].item_circuit + "(" + sommaire[i].item_dateDepart + ")");
            }
        }


        for (var j = 0; j < groupeVoyages.length; j++) {
            input += "<div class=\"col-md-12 col-lg-10\"><table border=\"0\" class=\"table table-hover\">";
            input += "<tr><td><strong> Groupe Voyage:</strong> " + groupeVoyages[j] + "</td></tr>";
            input += "<tr><th>Nom</th><th>Prénom</th><th>Catégorie</th><th>Coût unitaire</th><th>Dépot Initial</th><th></th><th></th><th></th></tr>";

            for (var i = 0; i < sommaire.length; i++) {

                if (sommaire[i].item_circuit + "(" + sommaire[i].item_dateDepart + ")" == groupeVoyages[j]) {
                    input += "<tr><td>" + sommaire[i].item_name + "</td>";
                    input += "<td>" + sommaire[i].item_prenom + "</td>";
                    input += "<td>" + sommaire[i].item_categorie + "</td>";
                    input += "<td>" + sommaire[i].item_cout_unitaire + " $</td>";
                    input += "<td>" + sommaire[i].item_depotInitial + " $</td>";
                    input += "<td></td>";
                    input += "<td><form>";
                    input += "<input type=\"button\" name='supprimer' class='btn btn-outline-success' value=\"Supprimer \" onclick=\"supprimerVoyageur(" + sommaire[i].item_id + ");\">";
                    input += "<input type=\"hidden\" name=\"idCommand\" id=\"idCommand" + i + "\"  value=" + sommaire[i].item_id + ">";
                    input += "</form>";
                    input += "</td></tr>";
                    sousTotal += parseFloat(sommaire[i].item_cout_unitaire);
                    sousTotalDepot += parseFloat(sommaire[i].item_depotInitial);
                    total += sousTotal;
                    totalDepot += sousTotalDepot;
                }
            }

            sousBalance = sousTotal - sousTotalDepot;
            input += "<tr><td colspan=\"3\"><strong>Sous Total</strong></td>  <td>" + sousTotal + " $</td><td>" + sousTotalDepot + " $</td><td></td><td><strong>Balance Partielle</strong></td><td><form>" + sousBalance + " $</td></tr>";
            sousTotal = 0;
            sousTotalDepot = 0;
        }

        balance = total - totalDepot
        input += "<tr><td colspan=\"3\"><strong>Total</strong></td>  <td>" + total + " $</td><td>" + totalDepot + " $</td><td></td><td><strong>Balance Totale</strong></td><td><form>" + balance + " $</td></tr>";

        input += " </table> </div> </div>";
        input += "<input type=\"hidden\" name=\"idBalance\" id=\"idBalance\"  value=" + balance + ">";
        input += "<div class=\"row\">";

        $('#divDetailSommaire').html(input);
        $('#divDetailSommaire').show();

    }

}


function register(reponse) {

}

function retirer(reponse) {
    $('#nbItemPanier').text("(" + reponse.itemCount + ")");
    ouvrirPanier();
}


function deleteTraveler(reponse) {
    if (reponse.nbSummaryItems > 1) {
        afficherSommaire();
    } else {
        $('#divDetailSommaire').hide();
    }

}


function cacherDivisionsPourCart() {
    $('#carouselExampleIndicators').addClass("hide").removeClass("show");
    $('#landing').addClass("hide").removeClass("show");
    $('#map').addClass("hide").removeClass("show");
    $('#consulterCircuitsContainer').addClass("hide").removeClass("show");
    $('#lesCards').addClass("hide").removeClass("show");
    $('#divCreateCommandForm').addClass("hide").removeClass("show");
    $('#container-HQ').addClass("hide").removeClass("show");
    $('#monProf').addClass("hide").removeClass("show");

    $('#divDetailPanier').addClass("show").removeClass("hide");
    $('#divDetailSommaire').addClass("show").removeClass("hide");
}

function montrerDivisionsSansCart() {
    $('#carouselExampleIndicators').addClass("show").removeClass("hide");
    $('#landing').addClass("show").removeClass("hide");
    $('#map').addClass("show").removeClass("hide");
    $('#consulterCircuitsContainer').addClass("show").removeClass("hide");
    $('#lesCards').addClass("show").removeClass("hide");
    $('#divCreateCommandForm').addClass("show").removeClass("hide");
    //$('#container-HQ').addClass("show").removeClass("hide");

    $('#divDetailPanier').addClass("hide").removeClass("show");
    $('#divDetailSommaire').addClass("hide").removeClass("show");
}

function openCart(reponse) {
    //debugger;
    cacherDivisionsPourCart();
    //$('#btnEnregistrer').hide();

    $('#divDetailPanier').hide();
    var input = "";
    var circuit = reponse.itemList;
    var total = 0;
    // <a href="javascript:void(0);" title="Retour au site visiteur et fermeture du panneau d'admnistration" onclick="hideAdminDiv();">Retour au site</a>

    input += "<div class=\"row mt-4\"><h6><a href=\"javascript:void(0);\" title=\"Retour au site et fermeture du panier (N.B. : Votre panier sera sauvegardé.)\" onclick=\"montrerDivisionsSansCart();\">Retour au site</a></h6><div class=\"col-md-12\"><table border=\"0\" class=\"table table-hover\">";
    input += "<div class=\"row mt-4\"><h3>Détails du panier</h3><div class=\"col-md-12\"><table border=\"0\" class=\"table table-hover\">";
    input += "<tr><th> Circuit </th> <th> Départ </th> <th> Retour </th> <th> Prix Adulte </th> <th> Prix Enfant </th> <th> Prix Bébé </th><th> </th></tr> ";

    // foreach puisque for ne fonctionne pas quand le circuit d'index 0 n'existe pas
    for (grVoy in circuit) { // for (var i = 0; i < circuit.length; i++) {
        input += "<tr>  <td > " + circuit[grVoy].item_title + " </td>";
        input += "<td>" + circuit[grVoy].item_Departure + "</td>";
        input += "<td>" + circuit[grVoy].item_Return + " </td>";
        input += "<td>" + (circuit[grVoy].item_Adult_price * (1 - (parseFloat(circuit[grVoy].item_Rabais_Adulte)) * 0.01)).toFixed(2) + " $</td>";
        input += "<td>" + (circuit[grVoy].item_Child_price * (1 - (parseFloat(circuit[grVoy].item_Child_discount)) * 0.01)).toFixed(2) + " $</td>";
        input += "<td>" + (circuit[grVoy].item_Baby_price * (1 - (parseFloat(circuit[grVoy].item_Rabais_Bebe)) * 0.01)).toFixed(2) + " $</td>";
        input += "<td><form>";
        input += "<input type=\"button\" name='reserver' class='btn btn-outline-success px-1 m-1' value=\"Ajouter Voyageur\" onclick=\"ficheReservation(" + circuit[grVoy].item_id + ");hidePreviousForms();\">";
        input += "<input type=\"button\" name='supprimer' class='btn btn-outline-danger px-1 m-1' value=\"Supprimer \" onclick=\"deleteItem(" + circuit[grVoy].item_id + ");\">";
        input += "<input type=\"hidden\" name=\"idCommande\" id=\"idCommande" + circuit[grVoy].item_id + "\"  value=" + circuit[grVoy].item_id + ">";
        input += "</form>";
        input += "</td></tr>";
        total++;
    }
    input += "<tr><td colspan=\"3\"><strong>Total</strong></td>  <td><strong>" + total + " circuit(s)" + "</strong></td><td></td><td></td> <td><form>";
    input += "<input type=\"button\" name=\"btnEnregistrer\" id=\"btnEnregistrer\" class='btn btn-outline-success px-1 m-1' value=\"Enregistrer\" onclick=\"enregisterVoyageur($('#idBalance').val());\"></form>";
    input += "<form><input type=\"button\" name='Sommaire' class='btn btn-outline-success px-1 m-1' value=\"Sommaire des Coûts\" onclick=\"afficherSommaire();\">";
    input += "</form></tr>";
    input += " </table> </div> </div>";
    input += "<div class=\"row\">";

    $('#divDetailPanier').html(input);
    $('#divDetailPanier').show();

}


function createReservationForm(reponse) {
    $('#divDetailSommaire').show();


    $('#divCreateCommandForm').show();
    $('#btnActualiserVoyageur').show();
    var errNomVoyageur = "Vous devez entrez un nom.";
    var errNaissanceVoyageur = "Vous devez entrez un courriel valide.";
    var errPrenomVoyageur = "Vous devez entrez un prénom.";
    var errNoPassportVoyageur = "Vous devez entrez un numéro de passeport à huit chiffres.";
    var errCourrielVoyageur = "Vous devez entrez un courriel valide.";
    var errExpirationPasseportVoyageur = "Vous devez entrez un date valide et posterieurea votre naissance.";
    var errDepotVoyageur = "Vous devez entrez un montant de depot";
    var idCommande = reponse.idCommande;

    if ($('#idCommandeVoyageur1').val()) {
        counter++;
    };

    var reservation = ""
    reservation = "<div id=\"divVoyageur" + counter + "\" class=\"row\">";
    reservation += "<div id=\"divnomVoyageur" + counter + "\" class=\"col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-md-3\">";
    //reservation += "<span onClick=\"$('#divnomVoyageur" + counter + "'\).hide();$('#btnActualiserVoyageur').hide();\">X</span><h3> Ajouter un Voyageur:</h3>";
    reservation += "<span onClick=\"$('#divnomVoyageur" + counter + "'\).remove();$('#btnActualiserVoyageur').hide();\">X</span><h3> Ajouter un Voyageur:</h3>";
    //reservation += "<h4>Voyageur " + counter + ":</h4>";
    reservation += "<div class = \"form-group\">";
    reservation += "<label for = \"nomVoyageur" + counter + "\"> Nom:</label><div class =\"col-xs-9\">";
    reservation += "<input type = \"text\" class = \"form-control\" id = \"nomVoyageur" + counter + "\" name =\"nomVoyageur" + counter + "\">";
    reservation += "<span id=\"errNomVoyageur" + counter + "\" style=\"display:none;\" class=\"text-danger\">" + errNomVoyageur + "</span>\n";
    reservation += "</div> </div>";
    reservation += "<div class =\"form-group\" ><label for=\"prenomVoyageur" + counter + "\" > Prénom: </label>";
    reservation += "<div class = \"col-xs-9\">";
    reservation += "<input type =\"text\" class = \"form-control\"id =\"prenomVoyageur" + counter + "\" name = \"prenomVoyageur" + counter + "\">";
    reservation += "<span id=\"errPrenomVoyageur" + counter + "\"  style=\"display:none;\" class=\"text-danger\">" + errPrenomVoyageur + "</span>\n";
    reservation += "</div> </div>";
    reservation += "<div class =\"form-group\">";
    reservation += "<label for = \"naissanceVoyageur" + counter + "\">Date de Naissance:</label><div class = \"col-xs-9\">";
    reservation += "<input type = \"date\" class = \"form-control\" id = \"naissanceVoyageur" + counter + "\"     name =\"naissanceVoyageur" + counter + "\">";
    reservation += "<span id=\"errNaissanceVoyageur" + counter + "\"     style=\"display:none;\" class=\"text-danger\">" + errNaissanceVoyageur + "</span>\n";
    reservation += "</div> </div>";
    reservation += "<div class = \"form-group\" ><label for =\"noPassportVoyageur" + counter + "\" > Numéro Passeport: </label> <div class = \"col-xs-9\">";
    reservation += "<input type = \"text\"class =\"form-control\" id = \"noPassportVoyageur" + counter + "\"name = \"noPassportVoyageur" + counter + "\" >";
    reservation += "<span id=\"errNoPassportVoyageur" + counter + "\"  style=\"display:none;\" class=\"text-danger\">" + errNoPassportVoyageur + "</span>\n";
    reservation += "</div> </div>";
    reservation += "<div class =\"form-group\" >";
    reservation += "<label for = \"sexeVoyageur" + counter + "\" > Sexe: </label>";
    reservation += "<div class = \"col-xs-9\" >";
    reservation += "<select class = \"form-control\"name = \"sexeVoyageur" + counter + "\">";
    reservation += "<option value = \"1\" selected > Masculin </option>";
    reservation += "<option value =\"2\"> Féminin </option> ";
    reservation += "</select> </div>";
    reservation += "</div>";
    reservation += "<div class = \"form-group\">";
    reservation += "<label for =\"courrielVoyageur" + counter + "\"> Courriel: </label>";
    reservation += "<div class = \"col-xs-9\">";
    reservation += "<input type = \"text\" class = \"form-control\" id = \"courrielVoyageur" + counter + "\" name = \"courrielVoyageur" + counter + "\">";
    reservation += "<span id=\"errCourrielVoyageur" + counter + "\"   style=\"display:none;\" class=\"text-danger\">" + errCourrielVoyageur + "</span>\n";
    reservation += "</div> </div>";
    reservation += "<div class = \"form-group\">";
    reservation += "<label for = \"expirationPasseportVoyageur" + counter + "\"> Expiration passeport: </label>";
    reservation += "<div class = \"col-xs-9\">";
    reservation += "<input type = \"date\" class = \"form-control\" id = \"expirationPasseportVoyageur" + counter + "\"  name =\"expirationPasseportVoyageur" + counter + "\">";
    reservation += "<span id=\"errExpirationPasseportVoyageur" + counter + "\"  style=\"display:none;\"  class=\"text-danger\">" + errExpirationPasseportVoyageur + "</span>\n";
    reservation += "</div> </div>";
    reservation += "<div class =\"form-group\">";
    reservation += "<div class = \"col-xs-9\">";
    reservation += "<input type = \"hidden\" class =\"form-control\" id = \"idCommandeVoyageur" + counter + "\" name = \"idCommandeVoyageur" + counter + "\" value =" + idCommande + " >";
    //reservation += "<input type = \"hidden\" class =\"form-control\" id = \"idGroupeVoyageur" + counter + "\" name = \"idGroupeVoyageur1\" value =" + idCommande + " >";
    reservation += "</div> </div>";
    reservation += "<div class = \"form-group\">";
    reservation += "<label for = \"categorieVoyageur" + counter + "\" > Catégorie: </label>";
    reservation += "<div class = \"col-xs-9\" >";
    reservation += "<select class = \"form-control\" name = \"categorieVoyageur" + counter + "\"  id= \"categorieVoyageur" + counter + "\">";
    reservation += "<option value = \"1\"selected > Adulte </option> ";
    reservation += "<option value = \"2\"> Enfant </option>";
    reservation += "<option value = \"3\"> Bébé </option>";
    reservation += "</select></div></div>";


    reservation += "<div class = \"form-group\">";
    reservation += "<label for =\"depotVoyageur" + counter + "\"> Dépot Initial: </label>";
    reservation += "<div class = \"col-xs-9\">";
    reservation += "<input type = \"text\" class = \"form-control\" id = \"depotVoyageur" + counter + "\" name = \"depotVoyageur" + counter + "\">";
    reservation += "<span id=\"errDepotVoyageur" + counter + "\"   style=\"display:none;\" class=\"text-danger\">" + errDepotVoyageur + "</span>\n";
    reservation += "</div> </div>";


    reservation += "<br><input type = \"button\"   id = \"btnAjouterVoyageur" + counter + "\"  class = \"btn btn-primary\" value = \"Ajouter voyageur\" onclick = \"ficheReservation(" + idCommande + ")\;$(this).hide();hidePreviousForms();\">";
    reservation += "</div></div>";

    $(reservation).insertBefore('#btnSubmitVoyageur');
    $('#idCounter').val(counter);
    $('#divCreateCommandForm').show();
}


// ********************** selon l'action, on appelle la méthode concerné *******************
var commandesVue = function(reponse) {
    var action = reponse.action;
    switch (action) {
        case "ajouterAuPanier":
            addToCart(reponse);
            break;
        case "ouvrirPanier":
            openCart(reponse);
            break;
        case "ficheReservation":
            createReservationForm(reponse);
            break;
        case "enregistrerVoyageur":
            register(reponse);
            break;
        case "deleteItem":
            retirer(reponse);
            break;
        case "creerSommaire":
            createSummary(reponse);
            break;
        case "afficherSommaire":
            displaySummary(reponse);
            break;
        case "supprimerVoyageur":
            deleteTraveler(reponse);
            break;
        case "listerCommandes":
            displayOrders(reponse);
            break;
        default:
            alert("Erreur. on doit définir l'action pour le fichier commandesControleurVue.js");
    }
}