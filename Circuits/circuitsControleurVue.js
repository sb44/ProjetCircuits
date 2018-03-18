// variables globales Pour maps
var infowindow = null; // info window open quand user click dessus. Global pour closer l'existant à chaque click sur autre ma
var montreal = null;
// Fin variables globales Pour maps

//vue circuits
function afficherCarte(listeCircuits) {
	debugger;
	
			//function initMap() {
			//debugger;
			//localistations lat et long.
			var centerMap = {lat: 45.870847, lng: -14.000323};
			montreal = {lat: 45.50884, lng: -73.58781};
			var lasvegas = {lat: 36.114647, lng: -115.172813};
			var washington = {lat: 38.907214, lng: -77.036872}; 
			var tanzanie = {lat: -3.386925, lng: 36.682995};
			var india = {lat: 20.593684, lng: 78.96288};
			var spain = {lat: 40.416775, lng: -3.703790};
			//base pour les icones des destinations
			var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
			//contenu pour les infoWindows
			var contentStringMtl = '<div id="content">'+
				'<div id="siteNotice">'+
				'</div>'+
				'<h2 id="firstHeading" class="firstHeading">Montréal (Québec, Canada)</h2>'+
				'<div id="bodyContent">'+
				'<p>La ville de <b>Montréal</b> est votre point de départ à tout les circuits de voyages que nous vous proposons!</p>'+
				'</div>'+
				'</div>';
			var contentStringNY = '<div id="content">'+
					'<div id="siteNotice">'+
				'</div>'+
				'<h2 id="firstHeading" class="firstHeading">Las-Vegas (États-Unis, Nevada)</h2>'+
				'<div id="bodyContent">'+
				'<p>Le circuit de <b>Las-Vegas</b> est le premier proposé parmi les <b>Courts-Séjours</b>. Situé à proximité, il vous épatera par sa splendeur! Bon voyage!</p>'+
				'</div>'+
				'</div>';
			var contentStringWashington = '<div id="content">'+
				'<div id="siteNotice">'+
				'</div>'+
				'<h2 id="firstHeading" class="firstHeading">Washington (États-Unis, Washington)</h2>'+
				'<div id="bodyContent">'+
				'<p>Le circuit de <b>Washington</b> est le premier proposé parmi les <b>Courts-Séjours</b>. Situé à proximité, il vous épatera par sa splendeur! Bon voyage!</p>'+
				'</div>'+
				'</div>';		
				
			var contentStringTanzanie = '<div id="content">'+
				'<div id="siteNotice">'+
				'</div>'+
				'<h2 id="firstHeading" class="firstHeading">Tanzanie (États-Unis, Washington)</h2>'+
				'<div id="bodyContent">'+
				'<p>Le circuit de <b>Tanzanie</b> est le premier proposé parmi les <b>Courts-Séjours</b>. Situé à proximité, il vous épatera par sa splendeur! Bon voyage!</p>'+
				'</div>'+
				'</div>';
				
			var contentStringIndia = '<div id="content">'+
				'<div id="siteNotice">'+
				'</div>'+
				'<h2 id="firstHeading" class="firstHeading">India (États-Unis, Washington)</h2>'+
				'<div id="bodyContent">'+
				'<p>Le circuit de <b>Tanzanie</b> est le premier proposé parmi les <b>Courts-Séjours</b>. Situé à proximité, il vous épatera par sa splendeur! Bon voyage!</p>'+
				'</div>'+
				'</div>';
				
			var contentStringSpain = '<div id="content">'+
				'<div id="siteNotice">'+
				'</div>'+
				'<h2 id="firstHeading" class="firstHeading">Spain (États-Unis, Washington)</h2>'+
				'<div id="bodyContent">'+
				'<p>Le circuit de <b>Spain</b> est le premier proposé parmi les <b>Courts-Séjours</b>. Situé à proximité, il vous épatera par sa splendeur! Bon voyage!</p>'+
				'</div>'+
				'</div>'; 
			/* Adding Map Legends */
			var legend = document.getElementById('mapLegend');
			div= document.createElement('div');
			div.innerHTML = '<span><img src=' + iconBase + 'sunny.png' + '> Courts-Séjours</span>';
			div.setAttribute("align", "left");
			legend.appendChild(div);
			var div = document.createElement('div');
			div.setAttribute("align", "left");
			div.innerHTML = '<span><img src=' + iconBase + 'horsebackriding.png' + '> Safari</span>';
			legend.appendChild(div);
			var div = document.createElement('div');
				div.setAttribute("align", "left");
			div.innerHTML = '<span><img src=' + iconBase + 'hiker.png' + '> Voyages et Randonnées</span>';
			legend.appendChild(div);
			var div = document.createElement('div');
			div.setAttribute("align", "left");
			div.innerHTML = '<span><img src=' + iconBase + 'lodging.png' + '> Yoga et Méditation</span>';
			legend.appendChild(div);
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
			
			//addMarker(map, position, contentString, animation, title, icon);
			// TODO for looping fichier XML ou BD mysql...
			addMarker(map, montreal, contentStringMtl, google.maps.Animation.DROP, 'Montréal (Point de départ)', iconBase + 'airports.png');
			addMarker(map, lasvegas, contentStringNY, google.maps.Animation.DROP, 'Las-Vegas (Courts-Séjours)', iconBase + 'sunny.png');
			addMarker(map, washington, contentStringWashington, google.maps.Animation.DROP, 'Washington (Courts-Séjours)', iconBase + 'sunny.png');
					
			addMarker(map, tanzanie, contentStringTanzanie, google.maps.Animation.DROP, 'Tanzanie (Safari)', iconBase + 'horsebackriding.png');
			addMarker(map, india, contentStringIndia, google.maps.Animation.DROP, 'India du Nord (Yoga et Méditation)', iconBase + 'lodging.png');
			addMarker(map, spain, contentStringSpain, google.maps.Animation.DROP, 'Espagne (Voyages et Randonnées)', iconBase + 'hiker.png');
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
							strokeColor: "#FFFFFF",
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
	debugger;
	var action=reponse.action; 
	switch(action){
		case "listerCarte" :
			afficherCarte(reponse.listeCircuits);
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
		
	}
}

