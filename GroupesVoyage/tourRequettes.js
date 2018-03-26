
function circuitEnregistrer(id) {
    var editor = 'descriptionCircuit';
    var content = CKEDITOR.instances[editor].getData();
	//alert("content= "+content);
	$('#circuit').validate({
		// Specify validation rules
		rules: {
		  nomCircuit: "required",
		  prixCircuit: "required",
		  //themeCircuit: "required",
		  latitudeCircuit: "required",
		  longitudeCircuit: "required",
		},
		// Specify validation error messages
		messages: {
			nomCircuit: "Entrer le nom du circuit!",
			prixCircuit: "Entrer le prix du circuit!",
			//themeCircuit: "Entrer le theme du circuit!",
			latitudeCircuit: "Entrer le latitude du circuit!",
			longitudeCircuit: "Entrer le longitude du circuit!",
		},
		
	});  
	
	if ($('#circuit').valid()) {
		var formData = new FormData(document.getElementById("circuit"));
		formData.append("desCircuit",content);

		if (id==0) {
			var op = "circuitEn";
			//alert("new circuit");
		} else {
			var op = "circuitMiseAJour";
			formData.append("idCircuit",id);
			//alert("edit circuit");
		}

		formData.append("type",op);
		$.ajax({
			url: "GroupesVoyage/tourControleur.php",
			type: 'POST',
			data: formData,
			success: function (data) {
				alert("circuit info: " + data);
				if (id==0) {						
					var data1 = parseInt(data);
					enregistrerEtape(data1);
				} else {
					//alert("new data=" + data);
					enregistrerEtape(id);
				}									
			},
			contentType: false,	
			processData: false,
			//async:false,
		});	
	}
}

function etapeEnregistrer(idCircuit, nbEtape) {
	var ret;
    var editor = 'desEtape' + nbEtape;
	var content = CKEDITOR.instances[editor].getData();
 
            var formData = new FormData(document.getElementById("etape" + nbEtape));
			formData.append("desEtape",content);
			formData.append("idCircuit",idCircuit);
			formData.append("type","etapeEn");
			$.ajax({
				url: "GroupesVoyage/tourControleur.php",
				type: 'POST',
				data: formData,
				success: function (data) {
					var data1 = parseInt(data);
					//alert("id etape: " + data1);
					enregistrerJour(data1, nbEtape);
                },
                contentType: false,	
				processData: false,
			});
									
}

function jourEnregistrer(idEtape, nbEtape, nbJour) {
	var editor1 = 'desJour' + nbJour;
	var editor2 = 'desActivite' + nbJour;
	var content1 = CKEDITOR.instances[editor1].getData();
	var content2 = CKEDITOR.instances[editor2].getData();
 
            var formData = new FormData(document.getElementById("jour" + nbEtape + nbJour));
			formData.append("desJour",content1);
			formData.append("desActivite",content2);
			formData.append("idEtape",idEtape);
			formData.append("type","jourEn");
			$.ajax({
				url: "GroupesVoyage/tourControleur.php",
				type: 'POST',
				data: formData,
				//dataType: json,
				success: function (data) {
					//alert(data);
                },
                contentType: false,	
				processData: false,
			});					
}


function circuitLire(idCircuit) {
	var formData = new FormData();
	formData.append("type","circuitLi");
	formData.append("id", idCircuit);
	//alert(idCircuit);
	$.ajax({
		url: "GroupesVoyage/tourControleur.php",
		type: 'POST',
		data: formData,
		success: function (data) {
			alert(data);
				data1 = JSON.parse(data);
				//alert("AAA = "+ data1["description"]);
				//alert(data1["nom"]);
				afficherCircuit(data1);						
		},
		contentType: false,	
		processData: false,
	});	       
}

function etapeLire(idCircuit) {
	var formData = new FormData();
	formData.append("type","etapeLi");
	formData.append("idCircuit", idCircuit);
	$.ajax({
		url: "GroupesVoyage/tourControleur.php",
		type: 'POST',
		data: formData,
		success: function (data) {
			//alert(data);
			data1 = JSON.parse(data);
			afficherEtape(data1);				
		},
		contentType: false,	
		processData: false,
	});	       
}

function jourLire(i, idEtape) {
	var formData = new FormData();
	formData.append("type","jourLi");
	formData.append("idEtape", idEtape);
	$.ajax({
		url: "GroupesVoyage/tourControleur.php",
		type: 'POST',
		data: formData,
		success: function (data) {
			//alert("jour data=: "+data);
			data1 = JSON.parse(data);
			afficherJour(i, data1);				
		},
		contentType: false,	
		processData: false,
	});	       
}

function groupeLire(idGroupeVoyage){
	var formData = new FormData();
	formData.append("type","groupeLi");
	formData.append("idGroupeVoyage", idGroupeVoyage);
	$.ajax({
		url: "GroupesVoyage/tourControleur.php",
		type: 'POST',
		data: formData,
		success: function (data) {
			//alert(data);
			data1 = JSON.parse(data);
			afficherGroupe(data1);			
		},
		contentType: false,	
		processData: false,
	});	
}

function supprimer(idCircuit) {
	var formData = new FormData();
	formData.append("type","circuitSupprimer");
	formData.append("idCircuit", idCircuit);
	$.ajax({
		url: "GroupesVoyage/tourControleur.php",
		type: 'POST',
		data: formData,
		success: function (data) {
			alert("data");			
		},
		contentType: false,	
		processData: false,
	});	       
}

function lireTousLesCircuits() {
	var formData = new FormData();
	formData.append("type","lireTousLesCircuits");
	$.ajax({
		url: "GroupesVoyage/tourControleur.php",
		type: 'POST',
		data: formData,
		success: function (data) {
			//alert("circuit data = " + data);
			data1 = JSON.parse(data);
			afficherListeCircuit(data1);			
		},
		contentType: false,	
		processData: false,
	});	       
}

function lireTousLesGroupes() {
	var formData = new FormData();
	formData.append("type","lireTousLesGroupes");
	$.ajax({
		url: "GroupesVoyage/tourControleur.php",
		type: 'POST',
		data: formData,
		success: function (data) {
			alert("groupe data = " + data);
			data1 = JSON.parse(data);
			afficherListeGroupe(data1);			
		},
		contentType: false,	
		processData: false,
	});	       
}

function toggleVigueur(vigueur, idCircuit) {
	var formData = new FormData();
	formData.append("type","toggleVigueur");
	formData.append("idCircuit",idCircuit);
	formData.append("vigueur",vigueur);

	$.ajax({
		url: "GroupesVoyage/tourControleur.php",
		type: 'POST',
		data: formData,
		success: function (data) {
			//alert(data);
			//data1 = JSON.parse(data);
			lireTousLesCircuits() ;			
		},
		contentType: false,	
		processData: false,
	});	       
}

function groupeEnregistrer(id) {
	$('#groupeForm').validate({
		// Specify validation rules
		rules: {
		  circuitGroupe: "required",
		  dateDepartGroupe: "required",
		  dateRetourGroupe: "required",
		  capaciteGroupe:"required",
		  prixAdulteGroupe:"required",
		  prixEnfantGroupe:"required",
		  prixBebeGroupe:"required",
		  //promotionGroupe:"required",
		},
		// Specify validation error messages
		messages: {
			circuitGroupe: "Entrer le prix du circuit!",
			dateDepartGroupe: "Entrer la date depart!",
			dateRetourGroupe: "Entrer la date retour!",
			capaciteGroupe: "Entrer la capacite du groupe!",
			prixAdulteGroupe:"Entrer le rabais d'adulte!",
			prixEnfantGroupe:"Entrer le rabais d'enfant!",
			prixBebeGroupe:"Entrer le rabais de bebe!",
			//promotionGroupe:"Entrer le longitude du circuit!", 
		},
	});
		if ($('#groupeForm').valid()) {
			if (id==0) {
				var op = "groupeEn";
			} else {
				var op = "groupeMiseAJour";
			}
            var formData = new FormData(document.getElementById("groupeForm"));
			formData.append("type",op);
			formData.append("idGroupeVoyage", id);
			//alert("groupe info: "+ formData.get('circuitGroupe'));
			$.ajax({
				url: "GroupesVoyage/tourControleur.php",
				type: 'POST',
				data: formData,
				success: function (data) {
					//alert(data);
					//$('#nouveauGroupe').addClass('hide');	
					gestionGroupe();								
				},
                contentType: false,	
				processData: false,
				//async:false,
			});	
			
		}
}

function promotionEnregistrer(id) {
	$('#promotionForm').validate({
		// Specify validation rules
		rules: {
			rabaisAdultePromotion: "required",
			rabaisEnfantPromotion: "required",
			rabaisBebePromotion: "required",
		},
		// Specify validation error messages
		messages: {
			rabaisAdultePromotion: "Entrer le rabais d'adulte!",
			rabaisEnfantPromotion: "Entrer le rabais d'enfant!",
			rabaisBebePromotion: "Entrer le rabais de bebe!",
		},
	});
		if ($('#promotionForm').valid()) {
			var formData = new FormData(document.getElementById("promotionForm"));
			if (id==0) {
				var op = "promotionEn";
			} else {
				var op = "promotionMiseAJour";
				formData.append("idPromotion", id);
			}
			formData.append("type",op);
			
			//alert("groupe info: "+ formData.get('circuitGroupe'));
			$.ajax({
				url: "GroupesVoyage/tourControleur.php",
				type: 'POST',
				data: formData,
				success: function (data) {
					alert(data);
					//$('#nouveauGroupe').addClass('hide');	
					gestionPromotion();								
				},
                contentType: false,	
				processData: false,
				//async:false,
			});	
			
		}
}

function getCircuitDuree(date, idCircuit) {
	var formData = new FormData();
	formData.append("type","getDuree");
	formData.append("idCircuit",idCircuit);
	$.ajax({
		url: "GroupesVoyage/tourControleur.php",
		type: 'POST',
		data: formData,
		success: function (data) {
			alert(parseInt(data));
			data1 = parseInt(data);
			if (date == "depart") {
				var dateRetour = $(".dateRetour").datepicker( "getDate" );
                var dateDepart = new Date(dateRetour);
                dateDepart.setDate(dateRetour.getDate() - data1);
                $( ".dateDepart" ).datepicker( "setDate", dateDepart);
			} else if(date == "retour") {
				var dateDepart = $(".dateDepart").datepicker( "getDate" );
				alert(dateDepart);
				var dateRetour = new Date(dateDepart);
				alert(dateDepart.getDate());
				dateRetour.setDate(dateDepart.getDate() + data1);
				alert(dateRetour);
                $( ".dateRetour" ).datepicker( "setDate", dateRetour );
			}									
		},
		contentType: false,	
		processData: false,
		//async:false,
	});	
}

function circuitVigueurLire() {
	var formData = new FormData();
	formData.append("type","circuitVigueurLi");
	$.ajax({
		url: "GroupesVoyage/tourControleur.php",
		type: 'POST',
		data: formData,
		success: function (data) {
			//alert(data);
			data1 = JSON.parse(data);
				//afficherCircuit(data1);
			$("#circuitGroupe").empty();
			for(i=0;i<data1.length;i++) {
				$("#circuitGroupe").append("<option value='" + data1[i]['idCircuit'] +"'>" + data1[i]['nom'] + "</option>")
			}						
		},
		contentType: false,	
		processData: false,
	});	       
}

function promotionLire(idPromotion) {
	var formData = new FormData();
	if (idPromotion <= 0) {
		formData.append("type","lireTousLesPromotions");
	} else {
		formData.append("type","promotionLi");
		formData.append("idPromotion",idPromotion);
	}

	$.ajax({
		url: "GroupesVoyage/tourControleur.php",
		type: 'POST',
		data: formData,
		success: function (data) {
			alert(data);
			data1 = JSON.parse(data);
			if(idPromotion == -1) {
				$("#promotionGroupe").empty();
				for(i=0;i<data1.length;i++) {
					$("#promotionGroupe").append("<option value='" + data1[i]['idpromotion'] +"'>" 
					+ data1[i]['idpromotion'] + ":  " +  data1[i]['rabaisAdulte'] + "%, " 
					+ data1[i]['rabaisEnfant'] + "%, " +  data1[i]['rabaisBebe'] + "%</option>");
				}
			} else if (idPromotion == 0) {
				afficherListePromotion(data1);
			} else {
				afficherPromotion(data1);
				ouvrirPromotion(data1);
			}						
		},
		contentType: false,	
		processData: false,
	});	       
}

function themeLire() {
	var formData = new FormData();
	formData.append("type","themeLi");
	$.ajax({
		url: "GroupesVoyage/tourControleur.php",
		type: 'POST',
		data: formData,
		success: function (data) {
			alert(data);
			data1 = JSON.parse(data);
			$("#themeCircuit").empty();
			for(i=0;i<data1.length;i++) {
				$("#themeCircuit").append("<option value='" + data1[i]['idTheme'] +"'>" 
				+ data1[i]['nom'] + "</option>")
			}						
		},
		contentType: false,	
		processData: false,
	});	       
}

function hotelLire() {
	var formData = new FormData();
	formData.append("type","hotelLi");
	$.ajax({
		url: "GroupesVoyage/tourControleur.php",
		type: 'POST',
		data: formData,
		success: function (data) {
			alert(data);
			data1 = JSON.parse(data);
			$("#hotel\\{\\{i\\}\\}\\{\\{j\\}\\}").empty();
			for(i=0;i<data1.length;i++) {
				$("#hotel\\{\\{i\\}\\}\\{\\{j\\}\\}").append("<option value='" + data1[i]['idHotel'] +"'>" 
				+ data1[i]['nom'] + "</option>")
			}						
		},
		contentType: false,	
		processData: false,
	});	       
}

function restoLire() {
	var formData = new FormData();
	formData.append("type","restoLi");
	$.ajax({
		url: "GroupesVoyage/tourControleur.php",
		type: 'POST',
		data: formData,
		success: function (data) {
			alert(data);
			data1 = JSON.parse(data);
			$("#resto\\{\\{i\\}\\}\\{\\{j\\}\\}").empty();
			for(i=0;i<data1.length;i++) {
				$("#resto\\{\\{i\\}\\}\\{\\{j\\}\\}").append("<option value='" + data1[i]['idRestaurant'] +"'>" 
				+ data1[i]['nom'] + "</option>")
			}						
		},
		contentType: false,	
		processData: false,
	});	       
}