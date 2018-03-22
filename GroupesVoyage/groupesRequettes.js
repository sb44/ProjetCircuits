function enregister() {
	enregisterCircuit();
}

function enregisterCircuit() {
	$("#circuit").validate({
		// Specify validation rules
		rules: {
		  prixCircuit: "required",
		  themeCircuit: "required",
		  latitudeCircuit: "required",
		  longitudeCircuit: "required",
		},
		// Specify validation error messages
		messages: {
			prixCircuit: "Entrer le prix du circuit!",
			themeCircuit: "Entrer le theme du circuit!",
			latitudeCircuit: "Entrer le latitude du circuit!",
			longitudeCircuit: "Entrer le longitude du circuit!",
		},
		// submit handler
		submitHandler: function(form) {   
			$.ajax({
				url: "GroupesVoyage/authentification.php",
				type: 'POST',
				data: $(form).serialize(),
				success: function (data) {
					var result = JSON.parse(data);	

					if(result[0] == true) {
						//alert("OK");
						$user=result[1];
						$role=result[2];
						$("#gestion").addClass("show").removeClass("hide");
						$("#gestionFilm").addClass("show").removeClass("hide");
						$("#login").addClass("hide").removeClass("show");
						updateGestionFilm();												
					}else{
						alert("No");
					}
				},
			});						
		}
	});
}