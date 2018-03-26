var counter = 1;


function addToCart(reponse) {
    if (reponse.itemCount) {
        $('#nbItemPanier').text("(" + reponse.itemCount + ")");
    } else {
        $('#nbItemPanier').text("(1)");
    }

}


function createSummary(reponse) {}


function displaySummary(reponse) {
    $('#divDetailSommaire').hide();
    var input = "";
    var sommaire = reponse.summaryList;
    var total = 0;
    input += "<div class=\"row\"><h3>Sommaire des Coûts</h3>";
    input += "<div class=\"col-md-12 col-lg-10\"><table border=\"0\" class=\"table table-hover\">";
    input += "<tr><th> Nom </th> <th> Prénom </th> <th> Catégorie</th> <th> Coût unitaire</th><th> </th></tr> ";
    input += "<p><h4>Circuit:</h4>" + sommaire[0].item_circuit + "</p >";

    for (var i = 0; i < sommaire.length; i++) {

        input += "<tr><td>" + sommaire[i].item_name + "</td>";
        input += "<td>" + sommaire[i].item_prenom + "</td>";
        input += "<td>" + sommaire[i].item_categorie + "</td>";
        input += "<td>" + sommaire[i].item_cout_unitaire + " $</td>";

        input += "<td><form>";
        input += "<input type=\"button\" name='supprimer' class='btn btn-outline-success' value=\"Supprimer \" onclick=\"supprimerVoyageur(" + sommaire[i].item_id + ");\">";
        input += "<input type=\"hidden\" name=\"idCommand\" id=\"idCommand\"  value=" + sommaire[i].item_id + ">";
        input += "</form>";
        input += "</td></tr>";
        total += parseInt(sommaire[i].item_cout_unitaire);
    }
    input += "<tr><td colspan=\"3\"><strong>Total</strong></td>  <td>" + total + "$</td>  <td></td>";
    input += " </table> </div> </div>";
    input += "<div class=\"row\">";


    $('#divDetailSommaire').html(input);
    $('#divDetailSommaire').show();
}




function register(reponse) {


}

function supprimer(reponse) {
    $('#nbItemPanier').text("(" + reponse.itemCount + ")");
    ouvrirPanier();
}


function deleteTraveler(reponse) {
    afficherSommaire();
}




function openCart(reponse) {
    $('#divDetailPanier').hide();
    var input = "";
    var circuit = reponse.itemList;
    var total = 0;

    input += "<div class=\"row\"><h3>Détails du panier</h3><div class=\"col-md-12 col-lg-10\"><table border=\"0\" class=\"table table-hover\">";
    input += "<tr><th> Circuit </th> <th> Départ </th> <th> Retour </th> <th> Prix Ajusté Adulte </th> <th> Prix Ajusté Enfant </th> <th> Prix Ajusté Bébé </th><th> </th></tr> ";


    for (var i = 0; i < circuit.length; i++) {

        input += "<tr>  <td > " + circuit[i].item_title + " </td>";
        input += "<td>" + circuit[i].item_Departure + "</td>";
        input += "<td>" + circuit[i].item_Return + " </td>";
        input += "<td>" + circuit[i].item_Adult_price * (1 - circuit[i].item_Rabais_Adulte) + "$</td>";
        input += "<td>" + circuit[i].item_Child_price * (1 - circuit[i].item_Child_discount) + " $</td>";
        input += "<td>" + circuit[i].item_Baby_price * (1 - circuit[i].item_Rabais_Bebe) + " $</td>";

        input += "<td><form>";
        input += "<input type=\"button\" name='reserver' class='btn btn-outline-success' value=\"Ajouter Voyageur\" onclick=\"ficheReservation(" + circuit[i].item_id + ");\">";
        input += "<input type=\"button\" name='supprimer' class='btn btn-outline-success' value=\"Supprimer \" onclick=\"deleteItem(" + circuit[i].item_id + ");\">";
        input += "<input type=\"hidden\" name=\"idCommande\" id=\"idCommande\"  value=" + circuit[i].item_id + ">";
        input += "</form>";
        input += "</td></tr>";
        total++;
    }
    input += "<tr><td colspan=\"3\"><strong>Total</strong></td>  <td>" + total + " circuits" + "</td>  <td></td>";
    input += " </table> </div> </div>";
    input += "<div class=\"row\">";


    $('#divDetailPanier').html(input);
    $('#divDetailPanier').show();

}


function createReservationForm(reponse) {
    var idCommande = reponse.idCommande;
    debugger;
    if ($('#idCommandeVoyageur1').val()) {
        counter++;
    };

    var reservation = "<div class=\"row\">";

    reservation += "<div class=\"col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-md-3\">";
    reservation += "<h3>Information des voyageurs:</h3>";
    reservation += "<h4>Voyageur " + counter + ":</h4>";

    reservation += "<div class = \"form-group\">";
    reservation += "<label for = \"nomVoyageur" + counter + "\"> Nom:</label><div class =\"col-xs-9\">";
    reservation += "<input type = \"text\" class = \"form-control\" id = \"nomVoyageur" + counter + "\" name =\"nomVoyageur" + counter + "\">";
    reservation += "</div> </div>";
    reservation += "<div class =\"form-group\" ><label for=\"prenomVoyageur" + counter + "\" > Prénom: </label>";
    reservation += "<div class = \"col-xs-9\">";
    reservation += "<input type =\"text\" class = \"form-control\"id =\"prenomVoyageur" + counter + "\" name = \"prenomVoyageur" + counter + "\">";
    reservation += "</div> </div>";
    reservation += "<div class =\"form-group\">";
    reservation += "<label for = \"naissanceVoyageur" + counter + "\">Date de Naissance:</label><div class = \"col-xs-9\">";
    reservation += "<input type = \"date\" class = \"form-control\" id = \"naissanceVoyageur" + counter + "\" name =\"naissanceVoyageur" + counter + "\">";
    reservation += "</div> </div>";
    reservation += "<div class = \"form-group\" ><label for =\"noPassportVoyageur" + counter + "\" > Numéro Passeport: </label> <div class = \"col-xs-9\">";
    reservation += "<input type = \"text\"class =\"form-control\" id = \"noPassportVoyageur" + counter + "\"name = \"noPassportVoyageur" + counter + "\" >";
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
    reservation += "</div> </div>";
    reservation += "<div class = \"form-group\">";
    reservation += "<label for = \"expirationPasseportVoyageur" + counter + "\"> Expiration passeport: </label>";
    reservation += "<div class = \"col-xs-9\">";
    reservation += "<input type = \"date\" class = \"form-control\" id = \"expirationPasseportVoyageur" + counter + "\" name =\"expirationPasseportVoyageur" + counter + "\">";
    reservation += "</div> </div>";
    reservation += "<div class =\"form-group\">";
    reservation += "<div class = \"col-xs-9\">";
    reservation += "<input type = \"hidden\" class =\"form-control\" id = \"idCommandeVoyageur" + counter + "\" name = \"idCommandeVoyageur1\" value =" + idCommande + " >";
    reservation += "</div> </div>";
    reservation += "<div class = \"form-group\">";
    reservation += "<label for = \"categorieVoyageur" + counter + "\" > Catégorie: </label>";
    reservation += "<div class = \"col-xs-9\" >";
    reservation += "<select class = \"form-control\" name = \"categorieVoyageur" + counter + "\">";
    reservation += "<option value = \"1\"selected > Adulte </option> ";
    reservation += "<option value = \"2\"> Enfant </option>";
    reservation += "<option value = \"3\"> Bébé </option>";
    reservation += "</select></div></div>";
    reservation += "<br><input type = \"button\"   id = \"btnAjouterVoyageur" + counter + "\"  class = \"btn btn-primary\"value = \"Ajouter voyageur\" onclick = \"ficheReservation(" + idCommande + ")\;$(this).hide();\">";
    reservation += "</div > </div>";

    // $('#CreateCommandForm').append(reservation);
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
            supprimer(reponse);
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
        default:
            alert("Erreur. on doit définir l'action pour le fichier commandesControleurVue.js");
    }
}