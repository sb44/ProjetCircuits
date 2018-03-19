// variables globales Pour maps
var infowindow = null; // info window open quand user click dessus. Global pour closer l'existant à chaque click sur autre ma
var montreal = null;
var CIRCUITS = [];
// Fin variables globales Pour maps

function afficherCarteEnsemble(listeCircuits) {
	CIRCUITS.splice(0, CIRCUITS.length); //vider le tableau
	for(var x in listeCircuits){
		CIRCUITS.push(listeCircuits[x]);
	}	
	construireCarte(listeCircuits);			
}

function filterThemeCircuits() {
	//debugger;
	$( "#map" ).hide( 500, function() {
		var selectionne = document.getElementById("themeCircuits").value;
		if (selectionne != "0") {
			var lstCircuits = CIRCUITS.filter(function (el) {
				return el.idTheme == selectionne;
			});
		} else {
			lstCircuits = CIRCUITS;
		}
		construireCarte(lstCircuits);
	});
}
//vue circuits
function construireCarte(listeCircuits) {
	//localistations lat et long.
	var centerMap = {lat: 45.870847, lng: -14.000323};
	montreal = {lat: 45.50884, lng: -73.58781};
	//base pour les icones des destinations
	var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
	//contenu pour les infoWindows

	var contentStringMtl = '<p><strong>Montréal</strong> est votre point de départ!</p>';

	//Hard codé... OK	
	/* Adding Map Legends */
	var legend = document.getElementById('mapLegend');
	if (legend.style.visibility === "hidden") {
		div= document.createElement('div');
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
	/* Push Legend to Right Top */
	//map.controls[google.maps.ControlPosition.RIGHT_TOP].push(legend);

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 2,
		zoomControl: false,
		scaleControl: false,
		scrollwheel: false,
		disableDoubleClickZoom: true,
		center: centerMap,
		styles: 
	[
	{
		"featureType": "all",
		"elementType": "labels.text.fill",
		"stylers": [
			{
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
		"stylers": [
			{
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
		"stylers": [
			{
				"visibility": "off"
			}
		]
	},
	{
		"featureType": "administrative",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#ff0000"
			}
		]
	},
	{
		"featureType": "administrative",
		"elementType": "geometry.fill",
		"stylers": [
			{
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
		"stylers": [
			{
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
		"stylers": [
			{
				"color": "#ef8bc0"
			}
		]
	},
	{
		"featureType": "administrative",
		"elementType": "labels.text.stroke",
		"stylers": [
			{
				"hue": "#ff0000"
			}
		]
	},
	{
		"featureType": "administrative",
		"elementType": "labels.icon",
		"stylers": [
			{
				"color": "#FF66DD"
			}
		]
	},
	{
		"featureType": "administrative.country",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#FF66DD"
			}
		]
	},
	{
		"featureType": "administrative.country",
		"elementType": "geometry.fill",
		"stylers": [
			{
				"color": "#ff0000"
			}
		]
	},
	{
		"featureType": "landscape",
		"elementType": "geometry",
		"stylers": [
			{
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
		"stylers": [
			{
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
		"stylers": [
			{
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
		"stylers": [
			{
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
		"stylers": [
			{
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
		"stylers": [
			{
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
		"stylers": [
			{
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
		"stylers": [
			{
				"color": "#F9A3FF"
			},
			{
				"lightness": 17
			}
		]
	}
	]
	});
	// TODO for looping fichier XML ou BD mysql...
	// addMarker(map, lasvegas, contentStringNY, google.maps.Animation.DROP, 'Las-Vegas (Courts-Séjours)', iconBase + 'sunny.png');

	taille=listeCircuits.length;
	var contentString, localisation;
	debugger;
	//Ajout de MTL:
	addMarker(map, montreal, contentStringMtl, google.maps.Animation.DROP, 'Montréal (Point de départ)', iconBase + 'airports.png');
	for(var i=0; i<taille; i++){
		localisation = {lat: parseFloat(listeCircuits[i].latitude), lng: parseFloat(listeCircuits[i].longitude)};
		contentString = '<a href="" onClick="afficherDetailCircuit(' + listeCircuits[i].idCircuit +');">' + listeCircuits[i].nomCircuit + ' (' + listeCircuits[i].nomTheme + ')</a><br>'+
		'<a href="" onClick="afficherGroupesVoyagesPourCircuit(' + listeCircuits[i].idCircuit +');"><span class="nav-link"><span class="oi oi-eye"></span> Afficher les départs!</span></a>';
		//'<a href="#" onClick="ajouterAuPanier(' + listeCircuits[i].idCircuit +');"><span class="nav-link"><span class="oi oi-cart id"></span> Ajouter au panier!</span></a>';

		//addMarker(map, position, contentString, animation, title, icon);
		addMarker(map, localisation, contentString, google.maps.Animation.DROP, listeCircuits[i].nomCircuit, listeCircuits[i].iconUrl + '');
	}
	//fin for looping

	/* Push Legend to Right Top */
	map.controls[google.maps.ControlPosition.RIGHT_TOP].push(legend);
	//Mettre la légend visible:
	legend.style.visibility='visible';				

	//}
	// Adds a marker to the map.
	function addMarker(map, position, contentString, animation, title, icon) {
		
		//resize icon
		var icon = {
			url: icon, // url
			scaledSize: new google.maps.Size(25, 25), // scaled size
		};
		
		var marker = new google.maps.Marker({
			position: position,
			map: map,
			icon: icon,
			title: title
		});
		marker.addListener('click', function() {
			if (infowindow) { // fermer le marker ouvert en clickant sur une autre https://stackoverflow.com/questions/4539905/cl
				infowindow.close();
			}
			infowindow = new google.maps.InfoWindow({
				content: contentString,
				maxWidth: 200
			});
			infowindow.open(map, marker)
		});
		
		
		if (position != montreal) {
		//debugger;
			//tracer ligne
			var latit = position.lat;
			var longit = position.lng;
			var curvLine = null;
			var montrealLatlng = new google.maps.LatLng(45.50884, -73.58781);
					/* var lineSymbol = {
						path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
						scale: 4,
						strokeColor: '#7B68EE'
					}; */
				var line = new google.maps.Polyline({
					path: [montrealLatlng, new google.maps.LatLng(latit, longit)],
					strokeColor: "#1B48FF",
					strokeOpacity: 1.0,
					strokeWeight: 2,
					geodesic: true,
					map: map,
					icons: [{
						//icon: lineSymbol,
						offset: '100%'
						}],
				});
		}
}

	$( "#map" ).show( 500, function() {

	});
}

function afficherDetailCircuit() {
	
}





function listerF(listFilms){
	var taille;
	var rep="<div class='table-users' style='overflow: scroll; height: 500px;'>";
	rep+="<div class='header'>Liste des films<span style='float:right;padding-right:10px;cursor:pointer;' onClick=\"$('#contenu').hide();\">X</span></div>";
	rep+="<table cellspacing='0'>";
	rep+="<tr><th>NUMERO</th><th>TITRE</th><th>DUREE</th><th>REALISATEUR</th><th>POCHETTE</th></tr>";
	taille=listFilms.length;
	for(var i=0; i<taille; i++){
		rep+="<tr><td>"+listFilms[i].idf+"</td><td>"+listFilms[i].titre+"</td><td>"+listFilms[i].duree+"</td><td>"+listFilms[i].res+"</td><td><img src='pochettes/"+listFilms[i].pochette+"' width=80 height=80></td></tr>";		 
	}
	rep+="</table>";
	rep+="</div>";
	$('#contenu').html(rep);
}

function afficherFiche(reponse){
  var uneFiche;
  if(reponse.OK) {
			uneFiche=reponse.fiche;
			$('#formFicheF h3:first-child').html("Fiche du film numero "+uneFiche.idf);
			$('#idf').val(uneFiche.idf);
			$('#titreF').val(uneFiche.titre);
			$('#dureeF').val(uneFiche.duree);
			$('#resF').val(uneFiche.res);
			$('#divFormFiche').show();
			document.getElementById('divFormFiche').style.display='block';
  } else {
			$('#messages').html("Film "+$('#numF').val()+" introuvable");
			setTimeout(function(){ $('#messages').html(""); }, 5000);
  }

}
// ********************** selon l'action, on appelle la méthode concerné *******************
var circuitsVue=function(reponse){
	//debugger;
	var action=reponse.action; 
	switch(action){
		case "listerCarte" :
			afficherCarteEnsemble(reponse.listeCircuits);
		case "enregistrer" :
		case "enlever" :
		case "modifier" :
			$('#messages').html(reponse.msg);
			setTimeout(function(){ $('#messages').html(""); }, 5000);
		break;
		case "lister" :
			listerF(reponse.listeFilms);
		break;
		case "fiche" :
			afficherFiche(reponse);
		break;
		default :
			alert("Erreur. on doit définir l'action pour le fichier circuitsControleurVue.js");
	}
}

