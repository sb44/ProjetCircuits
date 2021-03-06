var nbEtape = 0;
var nbJour = 0;

function gestionCircuit() {
	lireTousLesCircuits();
	$('#gestionPromotion').addClass('hide');
	$('#gestionPromotionA').removeClass('active');
	$('#gestionCircuit').removeClass('hide');
	$('#gestionCircuitA').addClass('active');
	$('#gestionGroupe').addClass('hide');
	$('#gestionGroupeA').removeClass('active');
	$('#nouveauGroupe').addClass('hide');
	$('#nouveauCircuit').addClass('hide');
	$('#nouvellePromotion').addClass('hide');

}

function gestionGroupe() {
	circuitVigueurLire();
	promotionLire(-1);
	$('#gestionPromotion').addClass('hide');
	$('#gestionPromotionA').removeClass('active');
	$('#gestionGroupe').removeClass('hide');
	$('#gestionGroupeA').addClass('active');
	$('#gestionCircuit').addClass('hide');
	$('#gestionCircuitA').removeClass('active');
	$('#nouveauGroupe').addClass('hide');
	$('#nouveauCircuit').addClass('hide');
	$('#nouvellePromotion').addClass('hide');
	lireTousLesGroupes();
}

function gestionPromotion() {
	promotionLire(0);
	$('#gestionPromotion').removeClass('hide');
	$('#gestionPromotionA').addClass('active');
	$('#gestionCircuit').addClass('hide');
	$('#gestionCircuitA').removeClass('active');
	$('#gestionGroupe').addClass('hide');
	$('#gestionGroupeA').removeClass('active');
	$('#nouveauGroupe').addClass('hide');
	$('#nouveauCircuit').addClass('hide');
	$('#nouvellePromotion').addClass('hide');
}

function nouveauGroupe(id) {
	$('#dateDepartGroupe').val("");
	$('#dateRetourGroupe').val("");
	$('#capaciteGroupe').val("");
	$('#nouveauGroupe').removeClass('hide');
	$('#btn-enregistrerGroupe').attr("onclick", 'enregistrerGroupe(0)');

	if (id!=0) {
		groupeLire(id);
	}
}

function nouvellePromotion(id) {

	$('#descriptionPromotion').val("");
	$('#rabaisAdultePromotion').val("");
	$('#rabaisEnfantPromotion').val("");
	$('#rabaisBebePromotion').val("");
	$('#nouvellePromotion').removeClass('hide');
	$('#btn-enregistrerPromotion').attr("onclick", 'enregistrerPromotion(0)');

	if (id!=0) {
		promotionLire(id);
	}
}

function annuler(id) {
	if(id==0) {
		$('#nouveauGroupe').addClass('hide');
	} else if(id==1) {
		$('#nouveauCircuit').addClass('hide');
		$('#gestionCircuit').removeClass('hide');
	} else if(id==2) {
		$('#nouvellePromotion').addClass('hide');
	}

}

function enregistrerGroupe(id) {
	//alert(id);
	groupeEnregistrer(id);
	//$('#nouveauGroupe').addClass('hide');
}

function enregistrerPromotion(id) {
	promotionEnregistrer(id);
}

function togglePromotion(val, id) {
	if (val ==1 ) {
		$('#promotion' + id).removeClass('hide');
		$('#promotionGroupe' + id).attr('onclick', 'togglePromotion(0, 1)');
		$('#iconGroupe' + id).removeClass('oi-caret-bottom').addClass('oi-caret-top');
	} else {
		$('#promotion' + id).addClass('hide');
		$('#promotionGroupe' + id).attr('onclick', 'togglePromotion(1, 1)');
		$('#iconGroupe' + id).removeClass('oi-caret-top').addClass('oi-caret-bottom');
	}	
}


function afficherListeCircuit(data) {
	$('#listeCircuit').empty();
	var length = data.length;
	for(i=0; i<length; i++) {
		j=i+1;
		if (data[i]['enVigueur'] == 0) {
			var icon = "oi oi-lock-locked";
			var active = 1;
		} else {
			var icon = "oi oi-lock-unlocked";
			var active = 0;
		}
		if (data[i]['urlImage']==null) {
			var imgTag = "";
		} else {
			var imgTag = data[i]['urlImage'];
		}
		var ligne = "<tr id='" + data[i]['idCircuit'] + "'>" 
			  +	"<td>" + j + "</td>"
			  +	"<td>" + data[i]['nom'] + "</td>"
			  +	"<td>" + data[i]['nomTheme'] + "</td>"
			  +	"<td>" + data[i]['capacite'] + "</td>"
			  +	"<td>" + data[i]['prix'] + "</td>"
			  //+	"<td>" + data[i]['urlImage'] + "</td>"
			  +	"<td><img src='./pochettes/" + imgTag + "' width=120 height=40></td>"
			  +	"<td><button type='button' title='Modifier circuit' onclick='lireCircuit(1," + data[i]['idCircuit'] 
				 + ")'><span class='oi oi-pencil'></span></button></td>"
			 +	"<td><button type='button' title='Activer/désactiver circuit' onclick='toggleVigueur(" + active + ", " + data[i]['idCircuit'] 
			     + ")'><span class='" + icon + "'></span></button></td>"
			  ;
		$('#listeCircuit').append(ligne);
	}
}

function afficherListeGroupe(data) {
	//alert("bbb");
	$('#listeGroupe').empty();
	var length = data.length;
	//alert("len="+length);
	for(i=0; i<length; i++) {
		j=i+1;
		/*if (data[i]['idpromotion'] == 1) {
			var promo = "Non";
		} else {
			var promo = "Oui";
		}*/
		ligne = "<tr id='groupe" + data[i]['idGroupeVoyage'] + "'>"
			  +	"<td>" + j + "</td>"
			  +	"<td>" + data[i]['nom'] + "</td>"
			  +	"<td>" + data[i]['dateDepart'] + "</td>"
			  +	"<td>" + data[i]['dateRetour'] + "</td>"
			  +	"<td>" + data[i]['capacite'] + "</td>"
			  +	"<td>" + data[i]['nbInscrit'] + "</td>"
			  +	"<td id='prixAdulteGV" + data[i]['idGroupeVoyage'] + "'>" + data[i]['prixAdulte'] + "</td>"
			  +	"<td id='prixEnfantGV" + data[i]['idGroupeVoyage'] + "'>" + data[i]['prixEnfant'] + "</td>"
			  +	"<td id='prixBebeGV" + data[i]['idGroupeVoyage'] + "'>" + data[i]['prixBebe'] + "</td>"
			  //+	"<td>" + promo + "</td>"
			  +	"<td><button type='button' title='Configurer le groupe voyage' onclick='nouveauGroupe(" + data[i]['idGroupeVoyage'] 
				 + ")'><span class='oi oi-pencil'></span></button></td>"
			 +	"<td><button id='btn-groupeVoyage" + data[i]['idGroupeVoyage'] + "' type='button' title='Voir le prix nette avec rabais' onclick='voirPromotion(" + data[i]['idGroupeVoyage'] 
			 + "," + data[i]['idpromotion'] + ")'><span class='oi oi-caret-bottom'></span></button></td></tr>";
		$('#listeGroupe').append(ligne);
	}
}

function voirPromotion(idGroupeVoyage, idpromotion) {
	promotionLire(idpromotion, idGroupeVoyage);
	$("#tempRow").remove();
	$("#tempRow2").remove();

	 $('#groupe' + idGroupeVoyage).after("<tr id='tempRow2'><td colspan='5'></td><td><strong>Prix Nette ($)</strong></td><td id='netteA'></td><td id='netteE'></td><td id='netteB'></td><td></td>"
	 + "<td><button type='button' title='Masquer le rabais de la promotion' onclick='fermerPromotion(" + idGroupeVoyage + ")'><span class='oi oi-caret-top'></span></button></td></tr>");
	
	 $('#groupe' + idGroupeVoyage).after("<tr id='tempRow'><td colspan='5'></td><td><strong>Rabais (%)</strong></td><td id='rabaisA'></td><td id='rabaisE'></td><td id='rabaisB'></td><td></td>"
	 + "<td></td></tr>");
	
	 //$('#btn-groupeVoyage'+idGroupeVoyage).prop("disabled", true);
}

function ouvrirPromotion(data, idGroupeVoyage) {
	$('#rabaisA').text(parseFloat(data['rabaisAdulte']));
	$('#rabaisE').text(parseFloat(data['rabaisEnfant']));
	$('#rabaisB').text(parseFloat(data['rabaisBebe']));

	$('#netteA').text(parseFloat($('#prixAdulteGV' + idGroupeVoyage).text() * (1 - parseFloat(data['rabaisAdulte']) * 0.01)).toFixed(2));
	$('#netteE').text(parseFloat($('#prixEnfantGV' + idGroupeVoyage).text() * (1 - parseFloat(data['rabaisEnfant']) * 0.01)).toFixed(2));
	$('#netteB').text(parseFloat($('#prixBebeGV' + idGroupeVoyage).text() * (1 - parseFloat(data['rabaisBebe']) * 0.01)).toFixed(2));

	//$('#netteA').text(($('#prixAdulteGV3').text()));
	//$('#netteE').text(parseFloat(data['rabaisEnfant']));
	//$('#netteB').text(parseFloat(data['rabaisBebe']));
}

function fermerPromotion(idGroupeVoyage) {
	//$("#tempRow").remove();
	$("#tempRow").remove();
	$("#tempRow2").remove();
	$('#btn-groupeVoyage'+idGroupeVoyage).prop("disabled", false);
}

function afficherListePromotion(data) {
	$("#listePromotion").empty();
	var length = data.length;
	for(i=0; i<length; i++) {
		j=i+1;
		ligne = "<tr id='promotion" + data[i]['idpromotion'] + "'>"
			  +	"<td>" + j + "</td>"
			  +	"<td>" + data[i]['idpromotion'] + "</td>"
			  +	"<td>" + data[i]['description'] + "</td>"
			  +	"<td>" + data[i]['rabaisAdulte'] + "%</td>"
			  +	"<td>" + data[i]['rabaisEnfant'] + "%</td>"
			  +	"<td>" + data[i]['rabaisBebe'] + "%</td>"
			  +	"<td><button type='button' onclick='nouvellePromotion(" + data[i]['idpromotion'] 
				 + ")'><span class='oi oi-pencil'></span></button></td></tr>";
			 //+	"<td><button type='button' onclick='voirPromotion(" + data[i]['idGroupeVoyage'] 
			 //    + ")'><span class='oi oi-caret-top'></span></button></td></tr>";
		$('#listePromotion').append(ligne);
	}
}

function enregistrerCircuit(id) {
	var editor = 'descriptionCircuit';
    var content = CKEDITOR.instances[editor].getData();

	if (id!=0) {
		supprimer(id);
	}
	circuitEnregistrer(id);
}

async function enregistrerEtape(idCircuit) {
	var nbEtape = document.getElementsByClassName("etape");
	var lengthEtape = nbEtape.length;
	for(i=1; i<lengthEtape; i++) {
		//alert("nb etape:" + i);
		await etapeEnregistrer(idCircuit, i);
	}
}

async function enregistrerJour(idEtape, nbEtape) {
	var nbJour = document.getElementsByClassName("jour etape"+ nbEtape);
	var lengthJour = nbJour.length;
	//alert("nbJour:" + lengthJour);
	for(j=1; j<=lengthJour;j++) {
		await jourEnregistrer(idEtape, nbEtape, j);
	} 
}	

function foldEtape(id) {
	$("#etapeFold" + id).toggle("slide");
	$("#etapeTitle" + id).toggleClass("oi-minus").toggleClass("oi-plus");
}

function foldJour(id) {
	$("#jourFold" + id).toggle("slide");
	$("#jourTitle" + id).toggleClass("oi-minus").toggleClass("oi-plus");
}

function addEtape(data) {
	var nb = document.querySelectorAll(".etape");
	var l = nb.length;
	if(data==null || data['photo']==null) {
		var imgTag = "";
	} else {
		var imgTag = "src='./pochettes/" + data['photo'] + "' width=200 height=200";
	}
	var view = { i: nbEtape, n: l, photo:imgTag};
	var template = document.getElementById('templateEtape').innerHTML;
	var output = Mustache.render(template, view);
	$('#etapes').append(output);

	if(data!=null) {
		content = data["description"];
		$('#paysEtape' + nbEtape).attr('value', data['pays']);			
	} else {
		content = "";
	}
	newEditor('desEtape'+ l, 'ckEtape'+ nbEtape, content);
	
	nbEtape++;
	return l;
}  

function addJour(id, data) {
	var nb = document.querySelectorAll(".jour.etape"+ id);
	var l = nb.length + 1;
	if(data==null || data['photo']==null) {
		var imgTag = "";
	} else {
		var imgTag = "src='./pochettes/" + data['photo'] + "' width=200 height=200";
		//alert(imgTag);
	}
	var view = { i: id, j:nbJour, n: l, photo:imgTag};
	var template = document.getElementById('templateJour').innerHTML;
	var output = Mustache.render(template, view);
  $('#joursEtape' + id).append(output);
  //alert('resto: '+ data["idRestaurant"]);
  if(data!=null) {
	  content1 = data["description"];	
	  content2 = data["Activites"];
	  $('#resto'+id+nbJour).val(data["idRestaurant"]);
	  $('#hotel'+id+nbJour).val(data["idHotel"]);
	  $('#villeJour'+id+nbJour).attr('value',data["ville"]);
  } else {
	  content1 = "";
	  content2 = "";
  }		
  newEditor('desJour'+ id + l, 'ckJour'+ nbJour, content1);
  newEditor('desActivite'+ id + l, 'ckActivite'+ nbJour, content2);
  nbJour++;
  return l;
}

function supprimerEtape(n) {
debugger;
  $("#templateEtape" + n).remove();
  var nb = document.querySelectorAll(".etape");
  var l = nb.length;
  for (var p=n; p<l; p++) {
	  q = p+1;
	  $("#templateEtape" + q).attr("id", "templateEtape" + p);
	  $("#sp" + q).html(p);
	  $("#sp" + q).attr("id", "sp" + p);
	  $("#etape" + q).attr("id", "etape" + p);
	  $("#joursEtape" + q).attr("id", "joursEtape" + p);
	  $("#btn-addJour" + q).attr("onclick", "addJour\(" + p + "\)");
	  $("#btn-addJour" + q).attr("id", "btn-addJour" + p);
	  $("#btn-supprimerEtape" + q).attr("onclick", "supprimerEtape\(" + p + "\)");
	  $("#btn-supprimerEtape" + q).attr("id", "btn-supprimerEtape" + p);
	  updateJour(q);
  }
}

function supprimerJour(id1, id2) {
  $("#templateJour" + id1  + id2).remove();
  var nb = document.querySelectorAll(".jour.etape" + id1);
  var l = nb.length+1;

  for (p=id2; p<l; p++) {
	  q = p+1;
	  $("#templateJour" + id1 + q).attr("id", "templateJour" + id1 + p);
	  $("#sp" + id1 + q).html(p);
	  $("#sp" + id1 + q).attr("id", "sp" + id1 + p);
	  $("#jour" + id1 + q).attr("id", "jour" + id1 + p);
	  $("#btn-jour" + id1 + q).attr("onclick", "supprimerJour\(" + id1 + "," + p + "\)");
	  $("#btn-jour" + id1 + q).attr("id", "btn-jour" + id1 + p);
  }
}

function updateJour(id) {
  var nb = document.querySelectorAll(".jour.etape" + id);
  var l = nb.length+1;
  //alert(l);
  //alert(id);
  id1 = id -1;

  for (var p=1; p<l; p++) {
	  $("#templateJour" + id + p).attr("id", "templateJour" + id1 + p);
	  $("#sp" + id + p).attr("id", "sp" + id1 + p);
	  $("#jour" + id + p).attr("class", "jour etape" + id1);
	  $("#jour" + id + p).attr("id", "jour" + id1 + p);
	  $("#btn-jour" + id + p).attr("onclick", "supprimerJour\(" + id1 + "," + p + "\)");
	  $("#btn-jour" + id + p).attr("id", "btn-jour" + id1 + p);
  }
}

function lireCircuit(op, id) {

	$('#gestionCircuit').addClass('hide');
	$('#nouveauCircuit').removeClass('hide');
	$('#etapes').empty();
	$('input').val("");
	$('themeCircuit').val("1");
	$('#descriptionCircuit > p').text("");
	$('#pochetteCircuit').attr('src','');
	themeLire();
	hotelLire();
	restoLire();
	if (op==0) {		
		$('#titre-nouveauCircuit').text("Nouveau Circuit");
	} else if (op==1) {		
		$('#titre-nouveauCircuit').text("Modifier Circuit");
	}
	if(id==0) {
		$('#btn-enregistrer').attr('onclick','enregistrerCircuit(0)');
		$('#pochetteCircuit').removeAttr('width').removeAttr('height');
		if (!(document.getElementById("descriptionCircuit"))) {
			newEditor('descriptionCircuit','ckCircuit', "");
		}
					
	} else {
		$('#btn-enregistrer').attr('onclick','enregistrerCircuit(' + id + ')');	
		$('#descriptionCircuit').remove();
		circuitLire(id);	
	} 
 
}

function afficherCircuit(data) {
	//alert("nommmmm:" + data["nom"]);	
	//alert('attendre');
	//var editorcir = "descriptionCircuit";
	//CKEDITOR.instances.editorcir.setData(data["description"]);
	newEditor('descriptionCircuit','ckCircuit', data["description"]);
	 $('#pochetteCircuit').attr('src','./pochettes/' + data["urlImage"]).attr('width', '400').attr('height','120');

  $('#nomCircuit').attr('value',data["nom"]);
  $('#nomCircuit').val(data["nom"]);
	$('#capCircuit').attr('value',data["capacite"]);
  $('#capCircuit').val(data["capacite"]);
  $('#prixCircuit').attr('value',data["prix"]);
  $('#prixCircuit').val(data["prix"]);
  $('#themeCircuit').val(data["idTheme"]);
  $('#latitudeCircuit').attr('value',data["latitude"]);
  $('#latitudeCircuit').val(data["latitude"]);
  $('#longitudeCircuit').attr('value',data["longitude"]);
  $('#longitudeCircuit').val(data["longitude"]);
 

  //alert("des data= " + data["description"]);
  

  var idCircuit = data["idCircuit"];
  etapeLire(idCircuit);
}

function afficherEtape(data) {

  nb = data.length;
  l = 0;
  //alert(data[0]["description"]);
  //alert("number:" + nbEtape);
  for (i=0; i < nb; i++) {
	  l = addEtape(data[i]);
	  //alert("etape" + l);
	  jourLire(l, data[i]["idEtape"]);
  }
}

function afficherJour(i, data) {

  nb = data.length;
  for (j=0; j < nb; j++) {
	  addJour(i, data[j]);
  }
}

function afficherGroupe(data) {
	//alert(data['dateDepart']);
	$("#circuitGroupe").val(data['idCircuit']);
	//$(".dateDepart").datepicker({dateFormat: 'mm-dd-yy'}).datepicker( "setDate", data['dateDepart']);
	var date1 = new Date(data['dateDepart']);
	date1.setDate(date1.getDate() + 1);
	var date2 = new Date(data['dateRetour']);
	date2.setDate(date2.getDate() + 1);
	$(".dateDepart").datepicker({dateFormat: 'mm-dd-yy'}).datepicker("setDate", date1);
	$(".dateRetour").datepicker({dateFormat: 'mm-dd-yy'}).datepicker("setDate", date2);
	$("#promotionGroupe").val(data['idpromotion']);
	$("#capaciteGroupe").val(data['capacite']);
	$("#prixAdulteGroupe").val(data['prixAdulte']);
	$("#prixEnfantGroupe").val(data['prixEnfant']);
	$("#prixBebeGroupe").val(data['prixBebe']);
	$("#btn-enregistrerGroupe").attr("onclick", "enregistrerGroupe(" + data['idGroupeVoyage'] + ")");
}

function afficherPromotion(data) {
	$("#descriptionPromotion").val(data['description']);
	$("#rabaisAdultePromotion").val(data['rabaisAdulte']);
	$("#rabaisEnfantPromotion").val(data['rabaisEnfant']);
	$("#rabaisBebePromotion").val(data['rabaisBebe']);
	$("#btn-enregistrerPromotion").attr("onclick", "enregistrerPromotion(" + data['idpromotion'] + ")");
}

function setDatepicker(date) {
	var idCircuit = document.getElementById("circuitGroupe").value;
	getCircuitDuree(date, idCircuit);
}

CKEDITOR.on( 'instanceCreated', function( evt ) {
  console.log( 'instanceCreated', evt, evt.editor );
  //var editor = event.editor,
  //element = editor.element;
  //editor.name = $(element).attr('name');
  //editor.name = "editor";
} );

function newEditor(id1, id2, content) {
  // This HTML could've come from AJAX data.
  var el = CKEDITOR.dom.element.createFromHtml('<div id="' + id1 +  '" contenteditable="true" class="col-sm-10 form-control">'+ content +'</div>');
  CKEDITOR.document.getById(id2).append(el);
  
  // Create editor instance on the new element.
  var editor1 = CKEDITOR.inline( el, {
	  toolbarGroups: [
		  { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		  { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		  { name: 'insert', groups: [ 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ]},
		  '/',
		  { name: 'styles', groups: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
		  { name: 'colors', groups: [ 'TextColor', 'BGColor' ] },
	  ]
  } );
}

function readURL(input, id, width, height) {
	//alert(width);
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			$('#'+id).attr('src', e.target.result).width(width).height(height);
		};

		reader.readAsDataURL(input.files[0]);
	}
}

