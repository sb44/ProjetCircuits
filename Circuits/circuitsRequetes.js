//requ�tes Cicuirts

function listerCarte() {
    debugger;
    var formFilm = new FormData();
    formFilm.append('action', 'listerCarte'); //alert(formFilm.get("action"));
    $.ajax({
        type: 'POST',
        url: 'Circuits/circuitsControleur.php',
        data: formFilm,
        contentType: false,
        processData: false,
        dataType: 'json', //text pour le voir en format de string
        success: function(reponse) { //alert(reponse);
            //debugger;
            circuitsVue(reponse);
        },
        fail: function(err) {
            //alert(err);
            //debugger;
        }
    });
}

function afficherGroupesVoyagesDeCircuit(noCircuit) {
    //debugger;
    if (document.getElementById('idDeparts').className == "collapse show")
        return; // annuler si on cache pour éviter requête inutile

    var formFilm = new FormData();
    formFilm.append('action', 'afficherGroupesVoyagesDeCircuit'); //alert(formFilm.get("action"));
    formFilm.append('noCircuit', noCircuit); //alert(formFilm.get("action"));
    $.ajax({
        type: 'POST',
        url: 'Circuits/circuitsControleur.php',
        data: formFilm,
        contentType: false,
        processData: false,
        dataType: 'json', //text pour le voir en format de string
        success: function(reponse) { //alert(reponse);
            //debugger;
            circuitsVue(reponse);
        },
        fail: function(err) {
            //alert(err);
            //debugger;
        }
    });
}

function afficherEtapesDeCircuit(noCircuit) {
    //debugger;
    if (document.getElementById('idEtapes').className == "collapse show")
        return; // annuler si on cache pour éviter requête inutile

    var formFilm = new FormData();
    formFilm.append('action', 'afficherEtapesDeCircuit'); //alert(formFilm.get("action"));
    formFilm.append('noCircuit', noCircuit); //alert(formFilm.get("action"));
    $.ajax({
        type: 'POST',
        url: 'Circuits/circuitsControleur.php',
        data: formFilm,
        contentType: false,
        processData: false,
        dataType: 'json', //text pour le voir en format de string
        success: function(reponse) {// alert(reponse);
            //debugger;
            circuitsVue(reponse);
        },
        fail: function(err) {
            //alert(err);
            //debugger;
        } 
    });

}