/* requette qui concerne des utilissateurs */
/* 
function checkLoginState() {
	FB.getLoginStatus(function(response) {
	  statusChangeCallback(response);
	});
  } */

function enregUsager(){
	var formUsager = new FormData(document.getElementById('formEnr'));
	formUsager.append('action','enregistrer');
	$.ajax({
		type : 'POST',
		url : 'Usagers/usagersControleur.php',
		data : formUsager,
		dataType : 'json', //text pour le voir en format de string
		/* async : false, */
		//cache : false,
		contentType : false,
		processData : false,
		success : function (reponse){ //alert(reponse);
			usagersVue(reponse); //appel de fonction javascript dans usagersControleurVue.js
		},
		fail : function (err){
			alert(1111);
		}
	}); 
}
function connUsager(){
	var formconnexion = new FormData(document.getElementById('formConn'));
	formconnexion.append('action','connecter');
	$.ajax({
		type : 'POST',
		url : 'Usagers/usagersControleur.php',
		data : formconnexion,
		/* async : false, */
 		contentType : false,
		processData : false, 
		dataType : 'json', //text pour le voir en format de string
		success : function (reponse){//alert(reponse);
				usagersVue(reponse);
		},
		fail : function (err){
			alert("1111");
		}
	});
}

/* function lister(){
	var formconnexion = new FormData(document.getElementById('formConn'));
	formconnexion.append('action','connecter');//alert(formFilm.get("action"));
	$.ajax({
		type : 'POST',
		url : 'Usagers/usagersControleur.php',
		data : formconnexion,
		async : false,
		contentType : false,
		processData : false,
		dataType : 'text', //text pour le voir en format de string
		success : function (reponse){//alert(reponse);
					filmsVue(reponse);
		},
		fail : function (err){
		}
	});
}
function enlever(){
	var leForm=document.getElementById('formEnlever');
	var formFilm = new FormData(leForm);
	formFilm.append('action','enlever');//alert(formFilm.get("action"));
	$.ajax({
		type : 'POST',
		url : 'Films/filmsControleur.php',
		data : formFilm,//leForm.serialize(), //... si on n'écrivait pas la ligne "var formFilm = new FormData(leForm);", mais dans ce cas il faudrait inclure le input hidden
		contentType : false, //Enlever ces deux directives si vous utilisez serialize()
		processData : false,
		dataType : 'json', //text pour le voir en format de string
		success : function (reponse){//alert(reponse);
					filmsVue(reponse);
		},
		fail : function (err){
		}
	});
}
function obtenirFiche(){
	$('#divFiche').hide();
	var leForm=document.getElementById('formFiche');
	var formFilm = new FormData(leForm);
	formFilm.append('action','fiche');
	$.ajax({
		type : 'POST',
		url : 'Films/filmsControleur.php',
		data : formFilm,
		contentType : false, 
		processData : false,
		dataType : 'json', 
		success : function (reponse){//alert(reponse);
					filmsVue(reponse);
		},
		fail : function (err){
		}
	});
}*/
function listeUtilisateurs(){
	var formProfile = new FormData();
	formProfile.append('action','liste');
	$.ajax({
		type : 'POST',
		url : 'Usagers/usagersControleur.php',
		data : formProfile,
		contentType : false, 
		processData : false,
		dataType : 'text', 
		success : function (reponse){alert(reponse);
					//$('#divFormFiche').hide();
					//usagersVue(reponse);
		},
		fail : function (err){
		}
	});
} 
function monProfile(){
	var formProfile = new FormData();
	formProfile.append('action','monProfile');
	$.ajax({
		type : 'POST',
		url : 'Usagers/usagersControleur.php',
		data : formProfile,
		contentType : false, 
		processData : false,
		dataType : 'json', 
		success : function (reponse){//alert(reponse);
					//$('#divFormFiche').hide();
					$('#monProf').removeClass("hide");
					$('#carouselExampleIndicators').addClass("hide").removeClass("show");
					$('#landing').addClass("hide").removeClass("show");
					$('#map').addClass("hide").removeClass("show");
					$('#consulterCircuitsContainer').addClass("hide").removeClass("show");
					$('#lesCards').addClass("hide").removeClass("show"); 
					$('#divDetailPanier').addClass("hide").removeClass("show")
					usagersVue(reponse);
		},
		fail : function (err){
		}
	});
} 
function deconnecter(){
	var formdeconnexion = new FormData();
	formdeconnexion.append('action','deconnecter');
	$.ajax({
		type : 'POST',
		url : 'Usagers/usagersControleur.php',
		data : formdeconnexion,
		/* async : false, */
		contentType : false, 
		processData : false,
		dataType : 'json', 
		success : function (reponse){//alert(reponse);
					usagersVue(reponse); 
		},
		fail : function (err){
		}
	});
} 
function estConnecte(){
	var formdeconnexion = new FormData();
	formdeconnexion.append('action','estConnecter');
	$.ajax({
		type : 'POST',
		url : 'Usagers/usagersControleur.php',
		data : formdeconnexion,
		/* async : false, */
		contentType : false, 
		processData : false,
		dataType : 'json', 
		success : function (reponse){//alert(reponse);
					usagersVue(reponse); 
		},
		fail : function (err){
		}
	});
} 
function profileTwitter(){
	var formdeconnexion = new FormData();
	formdeconnexion.append('action','profileTwitter');
	$.ajax({
		type : 'POST',
		url : 'Usagers/usagersControleur.php',
		data : formdeconnexion,
		/* async : false, */
		contentType : false, 
		processData : false,
		dataType : 'json', 
		success : function (reponse){//alert(reponse);
					usagersVue(reponse); 
		},
		fail : function (err){
		}
	});
} 
function connUsagerTwitter(){
	var formconnexion = new FormData();
	formconnexion.append('action','connecterTwitter');
	$.ajax({
		type : 'POST',
		url : 'Usagers/usagersControleur.php',
		data : formconnexion,
		/* async : false, */
 		contentType : false,
		processData : false, 
		dataType : 'json', //text pour le voir en format de string
		success : function (reponse){//alert(reponse);
				usagersVue(reponse);
		},
		fail : function (err){
			alert("1111");
		}
	});
}
function modifierProf(){
 $("#monProf").addClass("hide");
 $('#carouselExampleIndicators').addClass("show").removeClass("hide");
    $('#landing').addClass("show").removeClass("hide");
    $('#map').addClass("show").removeClass("hide");
    $('#consulterCircuitsContainer').addClass("show").removeClass("hide");
    $('#lesCards').addClass("show").removeClass("hide");
}