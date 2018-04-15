// variables globales Pour maps
var map;
var infowindow = null; // info window open quand user click dessus. Global pour closer l'existant à chaque click sur autre ma
var montreal = null;
var CIRCUITS = [];
var mapLines = [];
var markersArray = [];
var refreshIntervalId;
var MAPLINE;
// Fin variables globales Pour maps

function afficherCarteEnsemble(listeCircuits) {
    debugger;
    CIRCUITS.splice(0, CIRCUITS.length); //vider le tableau
    for (var x in listeCircuits) {
        CIRCUITS.push(listeCircuits[x]);
    }
    $("#map").removeClass("show").addClass("hide");
    construireCarte(listeCircuits);
 
}

function filterThemeCircuits() {
    debugger;
    //enlevé tout les markers existant:
    for (var i = 0; i < markersArray.length; i++ ) {
        markersArray[i].setMap(null);
      }
      markersArray.length = 0;
    //enlevé tout les lignes existants:
    for (i = 0; i < mapLines.length; i++) { 
        mapLines[i].gObj.setMap(null)
    }
    mapLines.length = 0;

    var selectionne = document.getElementById("themeCircuits").value;
    if (selectionne != "0") {
        var options = document.getElementById("themeCircuits").getElementsByTagName("option");
        var optionHTML = options[document.getElementById("themeCircuits").selectedIndex].innerText;  
        var lstCircuits = CIRCUITS.filter(function(el) {
            return el.nomTheme == optionHTML;
        });
    } else {
        lstCircuits = CIRCUITS;
    }
    //if (!map) {
    //    $("#map").hide(450, function() {
    //        construireCarte(lstCircuits);
    //    });
    //} else {
        construireCarte(lstCircuits);
    //}

    /*
     $("#map").hide(500, function() {
        var selectionne = document.getElementById("themeCircuits").value;
        if (selectionne != "0") {
            var options = document.getElementById("themeCircuits").getElementsByTagName("option");
            var optionHTML = options[document.getElementById("themeCircuits").selectedIndex].innerText;  
            var lstCircuits = CIRCUITS.filter(function(el) {
                return el.nomTheme == optionHTML;
            });
        } else {
            lstCircuits = CIRCUITS;
        }
        construireCarte(lstCircuits);
    });
    */
}

function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

function afficherThemesSelectListAccueil(listeCircuits) {
    //debugger;
    //var selectListAcc = "<option class=\"bs-title-option\" value=\"\">Sélectionner les circuits à afficher par thème...</option>";
    var selectListAcc = ""; var lastTheme = "";

    var themes = [];
    for (i = 0; i < listeCircuits.length; i++) { 
        if (!isInArray(listeCircuits[i].nomTheme, themes))
            themes.push(listeCircuits[i].nomTheme);
    }

    for (i = 0; i < themes.length; i++) { 
        selectListAcc += "<option value=\"" + (i+1) + "\">" + themes[i] + "</option> ";
    }
    var w2 = document.getElementById('themeCircuits');
    w2.innerHTML = "<option value=\"0\" selected>Tous</option>\"";
    w2.innerHTML += selectListAcc;
}

//vue circuits
 function construireCarte(listeCircuits) {

    debugger;
    //localistations lat et long.
    var centerMap = { lat: 45.870847, lng: -14.000323 };
    montreal = { lat: 45.50884, lng: -73.58781 };
    //base pour les icones des destinations
    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    //contenu pour les infoWindows

    var contentStringMtl = '<p><strong>Montréal</strong> est votre point de départ!</p>';

    var legend = document.getElementById('mapLegend');
    //debugger;

    var themes = []; var tempThemes = [];
    for (i = 0; i < listeCircuits.length; i++) { 
        if (!isInArray(listeCircuits[i].nomTheme, tempThemes)) {
            var theme = {iconUrl: listeCircuits[i].iconUrl, nomTheme: listeCircuits[i].nomTheme};
            themes.push(theme);
            tempThemes.push(listeCircuits[i].nomTheme);
        }
            
    }

    //var prevThem ="";
    if (legend.style.visibility === "hidden") {
        for (i = 0; i < themes.length; i++) { 
            //debugger;
            var div = document.createElement('div');
            div.innerHTML = '<span><img src=' + themes[i].iconUrl + '>' + themes[i].nomTheme + '</span>';
            div.setAttribute("align", "left");
            legend.appendChild(div); 
        }
    }

    /* Adding Map Legends
    var legend = document.getElementById('mapLegend');
    if (legend.style.visibility === "hidden") {
        div = document.createElement('div');
        div.innerHTML = '<span><img src=' + iconBase + 'horsebackriding.png' + '> Safari</span>';
        div.setAttribute("align", "left");
        legend.appendChild(div);
        var div = document.createElement('div');
        div.setAttribute("align", "left");
        div.innerHTML = '<span><img src=' + iconBase + 'lodging.png' + '> Yoga et Méditation</span>';
        legend.appendChild(div);
        var div = document.createElement('div');
        div.setAttribute("align", "left");
        div.innerHTML = '<span><img src=' + iconBase + 'hiker.png' + '> Voyages et Randonnées</span>';
        legend.appendChild(div);
        var div = document.createElement('div');
        div.setAttribute("align", "left");
        div.innerHTML = '<span><img src=' + iconBase + 'sunny.png' + '> Courts-Séjours</span>';
        legend.appendChild(div);
    }
     */
    /* Push Legend to Right Top */
    //map.controls[google.maps.ControlPosition.RIGHT_TOP].push(legend);
    if (!map) {
    //debugger;
    //await createGoogleMap();

    createGoogleMap();
    function createGoogleMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        zoomControl: false,
        scaleControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        center: centerMap,
        styles: [{
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{
                        "saturation": 36
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [{
                        "visibility": "on"
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ff0000"
                }]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [{
                        "color": "#FF66DD"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{
                        "color": "#FF66DD"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#ef8bc0"
                }]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "hue": "#ff0000"
                }]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.icon",
                "stylers": [{
                    "color": "#FF66DD"
                }]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#FF66DD"
                }]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ff0000"
                }]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 29
                    },
                    {
                        "weight": 0.2
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#F9A3FF"
                    },
                    {
                        "lightness": 17
                    }
                ]
            }
        ]
    });
    
    }
    }
    // TODO for looping fichier XML ou BD mysql...
    // addMarker(map, lasvegas, contentStringNY, google.maps.Animation.DROP, 'Las-Vegas (Courts-Séjours)', iconBase + 'sunny.png');
    

    taille = listeCircuits.length;
    var contentString, localisation;
    //debugger;
    //$("#map").show(450, function() {
    //Ajout de MTL:
    addMarker(-1, map, montreal, contentStringMtl, null, 'Montréal (Point de départ)', iconBase + 'airports.png');
    
    $("#map").removeClass("hide").addClass("show");
    
    for (var i = 0; i < taille; i++) {
        localisation = { lat: parseFloat(listeCircuits[i].latitude), lng: parseFloat(listeCircuits[i].longitude) };
        contentString = '<a href="javascript:void(0);" title="Consulter ce circuit!" onClick="afficherCardCircuit(' + listeCircuits[i].idCircuit + ');">' + '<span class="oi oi-eye"></span> ' + listeCircuits[i].nomCircuit + ' (' + listeCircuits[i].nomTheme + ')</a>';
        //addMarker(map, position, contentString, animation, title, icon);
        addMarker(listeCircuits[i].idCircuit, map, localisation, contentString, google.maps.Animation.DROP, listeCircuits[i].nomCircuit, listeCircuits[i].iconUrl + '');
    }
    //fin for looping

    /* Push Legend to Right Top */
    if (legend.style.visibility === "hidden") {
        map.controls[google.maps.ControlPosition.RIGHT_TOP].push(legend);
    }
    //Mettre la légend visible:
    legend.style.visibility = 'visible';

    // Adds a marker to the map.
    function addMarker(noCirc, map, position, contentString, animation, title, icon) {

        //resize icon
        var icon = {
            url: icon, // url
            scaledSize: new google.maps.Size(25, 25), // scaled size
        };

        var marker = new google.maps.Marker({
            position: position,
            //animation, animation,
            map: map,
            icon: icon,
            title: title
        });
        
        markersArray.push(marker);
        marker.addListener('click', function() {
            debugger;
            if (infowindow) { // fermer le marker ouvert en clickant sur une autre https://stackoverflow.com/questions/4539905/cl
                 handleCloseInfoWindow();
            }

             animateCircle(noCirc);

            infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 200
            });

            google.maps.event.addListener(infowindow,'closeclick', function(){
                 handleCloseInfoWindow();
             });

            infowindow.open(map, marker);

            function handleCloseInfoWindow() {
                if (infowindow) { // fermer le marker ouvert en clickant sur une autre https://stackoverflow.com/questions/4539905/cl
                    infowindow.close();
                }
                if (MAPLINE) { // enlevé l'icone d'avion de la ligne
                    var icons = MAPLINE.get('icons');
                    icons[0].icon = "";
                    icons[0].offset = "";
                    MAPLINE.set('icons', icons);
                }
    
                if (refreshIntervalId) { // arrêter le timer
                    clearInterval(refreshIntervalId);
                }

            }

        });



        if (position != montreal) {
            //debugger;
            //tracer ligne
            var latit = position.lat;
            var longit = position.lng;
            var curvLine = null;
            var montrealLatlng = new google.maps.LatLng(45.50884, -73.58781);
/*
             var lineSymbol = {
            	path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            	scale: 4,
            	strokeColor: '#7B68EE'
            };
*/
            var line = new google.maps.Polyline({
                path: [montrealLatlng, new google.maps.LatLng(latit, longit)],
                strokeColor: "#1B48FF",
                strokeOpacity: 1.0,
                strokeWeight: 2,
                geodesic: true,
                map: map,
                icons: [{
                    //icon: lineSymbol,
                    //offset: '100%'
                }],
            });
            var lineObj = {gObj:line, idCircuit:listeCircuits[i].idCircuit};
            mapLines.push(lineObj);
        }
    }

    
    //callback();
    //});
}
function animateCircle(noCirc) {
//debugger;
    for (i = 0; i < mapLines.length; i++) { 
        if(mapLines[i].idCircuit == noCirc) {
            MAPLINE = mapLines[i].gObj;
            break;
        }
    }
    if (MAPLINE == null)
        return;


    var lineSymbol = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 4,
        strokeColor: '#7B68EE'
    };

    var icons = MAPLINE.get('icons');
    icons[0].icon = lineSymbol;
    icons[0].offset = 100 + '%';

    var count = 0;
    refreshIntervalId = window.setInterval(function() {

      count = (count + 1) % 200;

      var icons = MAPLINE.get('icons');
      icons[0].offset = (count / 2) + '%';
      MAPLINE.set('icons', icons);

  }, 20);

}

function afficherCardCircuit(noCircuit) {
    var circuit = CIRCUITS.filter(function(el) {
        return el.idCircuit == noCircuit;
    });

    var leCircuit = " 	<div class=\"col-md-10 offset-md-1\"> ";
    leCircuit += " 		<!-- foreach circuit-->";
    leCircuit += " 		<div class=\"card border-light mb-3\"> ";
    leCircuit += " 		  <h5 class=\"card-header text-white\" style=\"background-color: #CD5AB3;\">" + strip_html_tags(circuit[0].nomCircuit) + " (" + strip_html_tags(circuit[0].nomTheme) + ")</h5>  ";
    leCircuit += " 			  <img class=\"card-img-top pt-3 px-3 img-fluid rounded-0\" style=\"background-color: #FBF6E0;\" src='./pochettes/" + circuit[0].urlImage + "' alt=\"Card image cap\">";
    leCircuit += " 				<div class=\"card-body\" style=\"background-color: #FBF6E0;\"> ";
    leCircuit += " 					<p class=\"card-text center\">";
    leCircuit += " 						" + strip_html_tags(circuit[0].description) + "";
    leCircuit += " 					</p>";
    leCircuit += " ";
    leCircuit += " 				<!-- Text en bas du card de circuit -->";
    leCircuit += " 				<p class=\"card-text center\">";
    leCircuit += " 					<small class=\"text-muted\">&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"oi oi-dollar\">&nbsp;&nbsp;</span>Valeur du circuit : "+ circuit[0].prix +" $</small>";
    leCircuit += " 				</p>";
    leCircuit += " 				<div class=\"col-12\" title=\"Afficher les étapes...\">";
    leCircuit += " 						<a data-toggle=\"collapse\" class=\"collapsed btn btn-info\" style=\"background-color: #00AA9E;\" href=\"#idEtapes\" aria-label=\"Expand/Collapse Card 1\" aria-expanded=\"false\" role=\"button\" onClick=\"afficherEtapesDeCircuit(" + circuit[0].idCircuit + ")\">";
    leCircuit += " 							<i class=\"fa\" aria-hidden=\"true\"></i>";
    leCircuit += " 							<span class=\"sr-only\">Expand/Collapse Card 1</span>";
    leCircuit += " 						</a>";
    leCircuit += " 						<span data-toggle=\"collapse\" class=\"collapsed btn btn-outline\" href=\"#idEtapes\" aria-label=\"Expand/Collapse Card 1\" aria-expanded=\"false\" onClick=\"afficherEtapesDeCircuit(" + circuit[0].idCircuit + ")\">";
    leCircuit += " 							<h6>Afficher les étapes!</h6>";
    leCircuit += " 						</span>				";
    leCircuit += " 				</div>";
    leCircuit += " 				";
    leCircuit += " ";
    leCircuit += " 			   <div id=\"lesCardsEtape\" class=\"card-deck mt-2\">";
    leCircuit += " ";
    leCircuit += " 					<div class=\"col-10 offset-1\">";
    leCircuit += " 							<div class=\"collapse\" id=\"idEtapes\">";
    //leCircuit +=" 								<!-- foreach ÉTAPE -->";
    //leCircuit +=" 								<h5>LE NOM DE L'ÉTAPE</h5> ";
    //leCircuit +=" 								<!-- foreach jour d'ÉTAPE -->";
    //leCircuit +=" 								<div class=\"card bg-light border-light mb-3\"> ";
    //leCircuit +=" 									<h6 class=\"card-header bg-light\">JOURS 1 - Départ de Montréal</h6>  ";
    //leCircuit +=" 										<img class=\"card-img-top mt-3 px-3 img-fluid rounded-circle\" src='./pochettes/tanzaniemain.jpg' alt=\"Card image cap\">";
    //leCircuit +=" 										<div class=\"card-body\"> ";
    //leCircuit +=" 											<p class=\"card-text center\">Rencontre avec notre accompagnateur de l’équipe Traditours à l’aéroport de Montréal. Assistance aux formalités d’enregistrement et envol à destination de Kilimandjaro. Repas et nuits à bord.</p>";
    //leCircuit +=" 									</div>";
    //leCircuit +=" 								</div>";
    //leCircuit +=" 							<!-- fin foreach jour d'ÉTAPE -->";
    //leCircuit +=" 							<!-- Fin foreach ÉTAPE -->";
    leCircuit += " 							</div>";
    leCircuit += " 					</div>";
    leCircuit += " 			   </div> ";
    leCircuit += " ";
    leCircuit += " 					<div class=\"col-12\" title=\"Afficher les départs de ce circuit...\">";
    leCircuit += " 							<a data-toggle=\"collapse\" class=\"collapsed btn btn-success\" href=\"#idDeparts\" aria-label=\"Expand/Collapse Card 1\" aria-expanded=\"false\" role=\"button\" onClick=\"afficherGroupesVoyagesDeCircuit(" + circuit[0].idCircuit + ")\">";
    leCircuit += " 								<i class=\"fa\" aria-hidden=\"true\"></i>";
    leCircuit += " 								<span class=\"sr-only\">Expand/Collapse Card 1</span>";
    leCircuit += " 							</a>";
    leCircuit += " 							";
    leCircuit += " 							<span data-toggle=\"collapse\" class=\"collapsed btn btn-outline\" href=\"#idDeparts\" aria-label=\"Expand/Collapse Card 1\" aria-expanded=\"false\" onClick=\"afficherGroupesVoyagesDeCircuit(" + circuit[0].idCircuit + ")\">";
    leCircuit += " 								<h6>Afficher les départs!</h6>";
    leCircuit += " 							</span>";
    leCircuit += " 					</div>";
    leCircuit += " 					";
    leCircuit += " 					<div class=\"col-sm-10 offset-sm-1 col-lg-8 offset-lg-2\">";
    leCircuit += " 						<div class=\"collapse\" id=\"idDeparts\">";
    //leCircuit +=" 								<!-- for each départs de circuit spécifique-->";
    //leCircuit +=" 								<div class=\"card bg-light border-light mb-3\"> ";
    //leCircuit +=" 									<h6 class=\"card-header bg-light\">Départ 1</h6>  ";
    //leCircuit +=" 										<div class=\"card-body\"> ";
    //leCircuit +=" 											<h6 class=\"card-title\">Date Départ: </h6> ";
    //leCircuit +=" 											<h6 class=\"card-title\">Date Retour: <h6>";
    //leCircuit +=" 											<p class=\"card-text center\">Capacité: </p>";
    //leCircuit +=" 											<p class=\"card-text center\">Prix pour un adulte: </p>";
    //leCircuit +=" 											<p class=\"card-text center\">Prix pour un enfant: </p>";
    //leCircuit +=" 											<p class=\"card-text center\">Prix pour un bébé: </p>";
    //leCircuit +=" 											<a href=\"\" title=\"Ajouter l'item et accéder au panier situé au coin supérieur droit de la barre de navigation.\" onClick=\"ajouterAuPanier(' + listeCircuits[i].idCircuit +');\"><span class=\"nav-link\"><span class=\"oi oi-cart id\"></span> Ajouter au panier!</span></a>";
    //leCircuit +=" 										</div>";
    //leCircuit +=" 								</div>";
    //leCircuit +=" 								<!-- fin for each départs de circuit spécifique -->";
    leCircuit += " 						</div>";
    leCircuit += " 					</div>";
    leCircuit += " ";
    leCircuit += " 			  </div>";
    leCircuit += " 			  <div class=\"card-footer text-white\" style=\"background-color: #CD5AB3;\" >";
    leCircuit += " 					Bon voyage!";
    leCircuit += " 			  </div> ";
    leCircuit += " 		</div> <!-- FIN foreach circuit-->";
    leCircuit += " ";
    leCircuit += " 	</div> ";
    $("#lesCards").hide(400, function() {

    });
    document.getElementById('lesCards').innerHTML = leCircuit;



    $("#lesCards").show(400, function() {

    });
}
function afficherEtapes(listeJours) {
    //alert("arriver à afficherEtapes dans circuitsControleurVue.js");
    debugger;
    var taille = listeJours.length;
    if (taille == 0) {
        var errorMess = "<p class=\"text-danger text-left\">";
        errorMess += "Désolé! Ce circuit ne contient pas d'étapes! Veuillez vérifer plus tard!"
        errorMess += "</p>";
        document.getElementById('idEtapes').innerHTML = errorMess;
        return;
    }

    var leCircuit = idEtape ="";
    var noEtape = 1;
    for (var i = 0; i < taille; i++) {
        //leCircuit +=" 								<!-- foreach ÉTAPE -->";
        if (idEtape == "" || idEtape != listeJours[i].etapeId)
            leCircuit +=" 								<h5 class=\"text-white p-2 mt-2 rounded-top\" style=\"background-color: #00AA9E;\">L'étape " + noEtape++ + " : " + strip_html_tags(listeJours[i].etapeDescription) + "</h5> ";
        //leCircuit +=" 								<!-- foreach jour d'ÉTAPE -->";
        leCircuit +=" 								<div class=\"card border-light m-2\" style=\"background-color: #F7F7F7;\"> "; 
        leCircuit +=" 									<h6 class=\"card-header\">JOUR " + (i+1) + " - " + strip_html_tags(listeJours[i].jourDescription) + "</h6>  ";
        leCircuit +=" <div class=\"row p-2\">";  
        leCircuit +=" 	<div class=\"col-sm-7\"> ";
        if (listeJours[i].jourActivites != "null" && listeJours[i].jourActivites != "" && listeJours[i].jourActivites != null) {
            leCircuit +=" 		<p class=\"card-text center\">" + listeJours[i].jourActivites + "</p>";
        }
        //hotel + resto:
        leCircuit +=" 		<p class=\"card-text center\"><span class=\"oi oi-bug id\"></span>  Restaurant : <a href=" + listeJours[i].joururlRestaurant +">" + listeJours[i].jourrestaurantNom + "</a></p>";
        leCircuit +=" 		<p class=\"card-text center\"><span class=\"oi oi-briefcase id\"></span>  Accomodement : <a href=" + listeJours[i].joururlHotel +">" + listeJours[i].hotelNom + "</a></p>";
        
        leCircuit +=" </div> ";

        leCircuit +="   <div class=\"col-sm-5\">";
            if (listeJours[i].jourPhoto != "null" && listeJours[i].jourPhoto != "" && listeJours[i].jourPhoto != null){
                leCircuit +=" 		<img class=\"card-img-top mt-2 px-2 rounded\" src='./pochettes/" + listeJours[i].jourPhoto + "' alt=\"Card image cap\">";
            }
        leCircuit +=" </div> ";
        leCircuit +=" </div>";
        leCircuit +="</div>";
        //leCircuit +=" 							<!-- fin foreach jour d'ÉTAPE -->";
        //leCircuit +=" 							<!-- Fin foreach ÉTAPE -->";
        idEtape = listeJours[i].etapeId;
    }

    document.getElementById('idEtapes').innerHTML = leCircuit;

}

function afficherGroupesVoyage(listeGroupesVoyage) {
    //debugger;
    var taille = listeGroupesVoyage.length;

    if (taille == 0) {
        var errorMess = "<p class=\"text-danger text-left\">";
        errorMess += "Désolé! Aucun départ n'est actuellement offert pour ce circuit. Veuillez vérifer plus tard!"
        errorMess += "</p>";
        document.getElementById('idDeparts').innerHTML = errorMess;
        return;
    }

    var groupeVoy = "";
    for (var i = 0; i < taille; i++) {
        groupeVoy += "  								<div class=\"card bg-light border-light mb-3\"> ";
        groupeVoy += " 									<h5 class=\"card-header bg-success text-white\">Départ " + (i+1) + " : " + listeGroupesVoyage[i].dateDepart + " - " + "Retour : " + listeGroupesVoyage[i].dateRetour + "</h5>  ";
        groupeVoy += " 										<div class=\"card-body\"> ";
        groupeVoy += " 											<p class=\"card-text center\">Capacité: </h6><strong>" + listeGroupesVoyage[i].capacite + " personnes.</strong></p>";
        groupeVoy += " 											<p class=\"card-text center\"><span class=\"oi oi-dollar\">&nbsp;&nbsp;</span>Prix pour un adulte: </h6><strong>" + listeGroupesVoyage[i].prixAdulte + " $</strong></p>";
        groupeVoy += " 											<p class=\"card-text center\"><span class=\"oi oi-dollar\">&nbsp;&nbsp;</span>Prix pour un enfant: </h6><strong>" + listeGroupesVoyage[i].prixEnfant + " $</strong></p>";
        groupeVoy += " 											<p class=\"card-text center\"><span class=\"oi oi-dollar\">&nbsp;&nbsp;</span>Prix pour un bébé: </h6><strong>" + listeGroupesVoyage[i].prixBebe + " $</strong></p>";
        groupeVoy += " 											<a href=\"javascript:void(0);\" title=\"Ajouter l'item et accéder au panier situé au coin supérieur droit de la barre de navigation.\" onClick=\"ajouterAuPanier(" + listeGroupesVoyage[i].idGroupeVoyage + ");\"><span class=\"nav-link\"><span class=\"oi oi-cart id\"></span> Ajouter au panier!</span></a>";
        groupeVoy += " 										</div>";
        groupeVoy += "                                          <div class=\"card-footer bg-success text-white\"><strong>Promotion en cours : " + listeGroupesVoyage[i].description + "</strong></div> ";

        groupeVoy += " 								</div>";
        
    }
    groupeVoy += "  <small class=\"text-muted\">&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"oi oi-info\">&nbsp;&nbsp;</span>Les prix affichés pour chaque départ incluent leur promotion. Pour tout information, contactez-nous.</small>";
    document.getElementById('idDeparts').innerHTML = groupeVoy;
}

function strip_html_tags(str)
{
   if ((str===null) || (str===''))
       return false;
  else
   str = str.toString();
  return str.replace(/<[^>]*>/g, '');
}

// ********************** selon l'action, on appelle la méthode concerné *******************
var circuitsVue = function(reponse) {
    //debugger;
    var action = reponse.action;
    switch (action) {
        case "listerCarte":
            afficherCarteEnsemble(reponse.listeCircuits);
            afficherThemesSelectListAccueil(reponse.listeCircuits);
            break;
        case "afficherGroupesVoyagesDeCircuit":
            afficherGroupesVoyage(reponse.listeGroupesVoyage);
            break;
        case "afficherEtapesDeCircuit":
            afficherEtapes(reponse.listeEtapes);
            break;
        default:
            alert("Erreur. on doit définir l'action pour le fichier circuitsControleurVue.js");
    }
}