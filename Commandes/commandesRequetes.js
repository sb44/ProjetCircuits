function ajouterAuPanier(id) {
    var formFilm = new FormData();
    formFilm.append('action', 'ajouterAuPanier');
    formFilm.append('numeroItem', id);

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
    debugger;
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
    debugger;
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
            //alert(reponse);
            commandesVue(reponse);
        },
        fail: function(err) {}
    });
}