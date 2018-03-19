//requ�tes films
function enregUsager(){
	var formUsager = new FormData(document.getElementById('formEnr'));
	formUsager.append('action','enregistrer');
	alert("SVP attendere pour construit la partie submit");
	$.ajax({
		type : 'POST',
		url : 'Usagers/usagersControleur.php',
		data : formUsager,
		dataType : 'text', //text pour le voir en format de string
		//async : false,
		//cache : false,
		contentType : false,
		processData : false,
		success : function (reponse){ alert(reponse);
					//filmsVue(reponse); //appel de fonction javascript défini dans filmsControleurVue.js
		},
		fail : function (err){
			alert(1111);
		},
		error : function(erreur){
         	alert(2222);
		},
		complete : function(statut){
			alert(33333);
		}
	}); 
	alert("apres ajax");
}
function lister(){
	var formFilm = new FormData();
	formFilm.append('action','lister');//alert(formFilm.get("action"));
	$.ajax({
		type : 'POST',
		url : 'Films/filmsControleur.php',
		data : formFilm,
		contentType : false,
		processData : false,
		dataType : 'json', //text pour le voir en format de string
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
}
function modifier(){
	var leForm=document.getElementById('formFicheF');
	var formFilm = new FormData(leForm);
	formFilm.append('action','modifier');
	$.ajax({
		type : 'POST',
		url : 'Films/filmsControleur.php',
		data : formFilm,
		contentType : false, 
		processData : false,
		dataType : 'json', 
		success : function (reponse){//alert(reponse);
					$('#divFormFiche').hide();
					filmsVue(reponse);
		},
		fail : function (err){
		}
	});
}