
function enregistrerCircuit() {
	circuitEnregistrer();
/*	var idCircuit;
	circuitEnregistrer( function (output) {
		idCircuit = output;
	});
	alert("id Circuit" + idCircuit);

	var nbEtape = document.getElementsByClassName("etape");
	var lengthEtape = nbEtape.length;
	for(i=1; i<lengthEtape; i++) {
		var idEtape = etapeEnregistrer(idCircuit, i);
		alert("id etape = " + idEtape);
		var nbJour = document.getElementsByClassName("jour etape"+i);
		var lengthJour = nbJour.length;
		alert("nbJour:" + lengthJour);
		for(j=1; j<=lengthJour;j++) {
			jourEnregistrer(idEtape, i, j);
		}
	}  */
}

function enregistrerEtape(idCircuit) {
	var nbEtape = document.getElementsByClassName("etape");
	var lengthEtape = nbEtape.length;
	for(i=1; i<lengthEtape; i++) {
		alert("nb etape:" + i);
		etapeEnregistrer(idCircuit, i);
	}
}

function enregistrerJour(idEtape, nbEtape) {
	var nbJour = document.getElementsByClassName("jour etape"+ nbEtape);
	var lengthJour = nbJour.length;
	//alert("nbJour:" + lengthJour);
	for(j=1; j<=lengthJour;j++) {
		jourEnregistrer(idEtape, nbEtape, j);
	} 
}

function circuitEnregistrer() {
	var ret;
    var editor = 'desCircuit';
    var content = CKEDITOR.instances[editor].getData();
    //alert(content);
/*	$('#aaaa').validate({
		// Specify validation rules
		rules: {
		  //prixCircuit: "required",
		  //themeCircuit: "required",
		  //latitudeCircuit: "required",
		  //longitudeCircuit: "required",
		},
		// Specify validation error messages
		messages: {
			//prixCircuit: "Entrer le prix du circuit!",
			//themeCircuit: "Entrer le theme du circuit!",
			//latitudeCircuit: "Entrer le latitude du circuit!",
			//longitudeCircuit: "Entrer le longitude du circuit!",
		},
		// submit handler
		submitHandler: function(form) { alert("en2"); */
            var formData = new FormData(document.getElementById("circuit"));
			formData.append("desCircuit",content);
			$.ajax({
				url: "GroupesVoyage/tourControleur.php",
				type: 'POST',
				data: formData,
				success: function (data) {
					var data1 = parseInt(data);
					alert("id circuit: " + data1);
					alert("--"+ data1+ "---");
					enregistrerEtape(data1);				
				},
				//complete: function () {
				//	return ret;
				//},
                contentType: false,	
				processData: false,
				//async:false,
			});	
			
/*		}
	});   */
}

function etapeEnregistrer(idCircuit, nbEtape) {
	var ret;
    var editor = 'desEtape' + nbEtape;
	var content = CKEDITOR.instances[editor].getData();
 
            var formData = new FormData(document.getElementById("etape" + nbEtape));
			formData.append("desEtape",content);
			//formData.append("nbEtape",nbEtape);
			formData.append("idCircuit",idCircuit);
			$.ajax({
				url: "GroupesVoyage/tourControleur.php",
				type: 'POST',
				data: formData,
				success: function (data) {
					var data1 = parseInt(data);
					alert("id etape: " + data1);
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
			$.ajax({
				url: "GroupesVoyage/tourControleur.php",
				type: 'POST',
				data: formData,
				success: function (data) {
					alert("jour data = " + data);

                },
                contentType: false,	
				processData: false,
			});					
}