function ajouterAuPanier(id) {
    var formFilm = new FormData();
    formFilm.append('action', 'ajouterAuPanier');
    // formFilm.append('numeroItem', id);
    formFilm.append('idGroupeVoyage', id);

    $.ajax({
        type: 'POST',
        url: 'Commandes/commandesControleur.php',
        data: formFilm,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function(reponse) {
            //alert(reponse);
            commandesVue(reponse);
        },
        fail: function(err) {}
    });

}

function ouvrirPanier() {
    var formFilm = new FormData();
    formFilm.append('action', 'ouvrirPanier');
    $.ajax({
        type: 'POST',
        url: 'Commandes/commandesControleur.php',
        data: formFilm,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function(reponse) {
            // alert(reponse);
            commandesVue(reponse);
        },
        fail: function(err) {}
    });
}


function ficheReservation(idCommande) {
    //debugger;
    var formFilm = new FormData();
    formFilm.append('action', 'ficheReservation');
    formFilm.append('idCommande', idCommande);
    $.ajax({
        type: 'POST',
        url: 'Commandes/commandesControleur.php',
        data: formFilm,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function(reponse) {
            // alert(reponse);
            commandesVue(reponse);
        },
        fail: function(err) {}
    });
}

function enregisterVoyageur(balance) {
    var formFilm = new FormData(document.getElementById('CreateCommandForm'));
    formFilm.append('action', 'enregisterVoyageur');
    formFilm.append('balance', balance);

    $.ajax({
        type: 'POST',
        url: 'Commandes/commandesControleur.php',
        data: formFilm,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function(reponse) {
            //alert(reponse);
            commandesVue(reponse);
        },
        fail: function(err) {}
    });
}

function deleteItem(itemId) {
    var formFilm = new FormData();
    formFilm.append('action', 'deleteItem');
    formFilm.append('itemId', itemId);

    $.ajax({
        type: 'POST',
        url: 'Commandes/commandesControleur.php',
        data: formFilm,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function(reponse) {
            //alert(reponse);
            commandesVue(reponse);
        },
        fail: function(err) {}
    });
}


function supprimerVoyageur(id) {
    // debugger;
    var formFilm = new FormData();
    formFilm.append('action', 'supprimerVoyageur');
    formFilm.append('idVoyageur', id);

    $.ajax({
        type: 'POST',
        url: 'Commandes/commandesControleur.php',
        data: formFilm,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function(reponse) {
            //alert(reponse);
            commandesVue(reponse);
        },
        fail: function(err) {}
    });
}



function creerSommaire() {
    var formFilm = new FormData(document.getElementById('CreateCommandForm'));
    formFilm.append('action', 'creerSommaire');

    $.ajax({
        type: 'POST',
        url: 'Commandes/commandesControleur.php',
        data: formFilm,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function(reponse) {
            //alert(reponse);
            commandesVue(reponse);
        },
        fail: function(err) {}
    });
}

function afficherSommaire() {
    var formFilm = new FormData();
    formFilm.append('action', 'afficherSommaire');

    $.ajax({
        type: 'POST',
        url: 'Commandes/commandesControleur.php',
        data: formFilm,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function(reponse) {
            //alert(reponse);
            commandesVue(reponse);
        },
        fail: function(err) {}
    });
}