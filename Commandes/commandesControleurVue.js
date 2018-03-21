function addToCart(reponse) {
    $('#nbItemPanier').text("(" + reponse.itemCount + ")");
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
        input += "<input type='button' name='reserver' class='btn btn-outline-danger' value='Reserver'>";
        input += "</form>";
        input += "</td></tr>";
        total++;
    }
    input += "<tr><td colspan=\"3\"><strong>Total</strong></td>  <td>" + total + " circuits" + "</td>  <td></td>";
    input += " </table> </div> </div>";
    input += "<div class=\"row\">";
    input += "<div class=\"col-md-12 col-lg-10\"><a href='#'>Retour à la page d'accueil</a></div></div>";

    $('#divDetailPanier').html(input);
    // $('#divDetailPanier').append(input);
    $('#divDetailPanier').show();

}

// ********************** selon l'action, on appelle la méthode concerné *******************
var commandesVue = function(reponse) {
    debugger;
    var action = reponse.action;
    switch (action) {
        case "ajouterAuPanier":
            addToCart(reponse);
            break;
        case "ouvrirPanier":
            openCart(reponse);
            break;
        default:
            alert("Erreur. on doit définir l'action pour le fichier circuitsControleurVue.js");
    }
}