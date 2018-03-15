//GLOBALES
//-EXPRESSIONS RÉGULIÈRES:
var REG_EMAIL = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
var REG_PASSWORD = /^[A-Za-z\d]{5,20}.{1}$/;
var REG_DUREE = /^[0-9]{2,3}$/;
var REG_URL = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var REG_PRIX = /^\d{1,3}\.\d{2}\s*$/;
//-FIN EXPRESSIONSRÉGULIÈRES
//var FILMS = [];
//var NO_FILM; //no Film à supprimer
//var CONTENT_USER_LOGIN;

window.onload = function() {
	//alert("hello");

}
function validerConnexion() {  // fonction qui retour true ou false
	debugger;
	var courriel = document.getElementById('username').value.trim();
	var motDePasse = document.getElementById('password').value.trim();
	
	var errCourConn = document.getElementById('errCourConn');
	var errMotPasseConn = document.getElementById('errMotPasseConn');
	
	var estValide = true;
	
	var regex = new RegExp(REG_EMAIL);
	if (!regex.test(courriel)) {
		errCourConn.innerHTML = "Vous devez entrez un courriel valide.";
		estValide = false;
	} else 
		errCourConn.innerHTML = "";
	
	var regex = new RegExp(REG_PASSWORD);	
	if (!regex.test(motDePasse)) {
		errMotPasseConn.innerHTML = "Vous devez entrez un mot de passe valide de 5 à 20 caractères de composé de lettres et chiffres. Un caractère spéciale est permis à la fin.";
		estValide = false;
	} else 
		errMotPasseConn.innerHTML = "";
	
	if (estValide)			
		return true;
	else
		return false;	
		
}
function validerEnregistrement() {   // fonction qui retour true ou false
	debugger;
	var courrielEnr = document.getElementById('username').value.trim();
	var motDePasseEnr = document.getElementById('password').value.trim();
	var motDePasseConfEnr = document.getElementById('confirm_password').value.trim(); 
	
	var errCourEnr = document.getElementById('errCourEnr');
	var errMotPasseEnr = document.getElementById('errMotPasseEnr');
	var errMotPasseConfEnr = document.getElementById('errMotPasseConfEnr');
	
	var estValide = true;
	var regex = new RegExp(REG_EMAIL);
	if (!regex.test(courrielEnr)) {
		errCourEnr.innerHTML = "Vous devez entrez un courriel valide.";
		estValide = false;
	} else
		errCourEnr.innerHTML = "";
	
	var regex = new RegExp(REG_PASSWORD);
	if (!regex.test(motDePasseEnr)) {
		errMotPasseEnr.innerHTML = "Vous devez entrez un mot de passe valide de 5 à 20 caractères composé de lettres et chiffres. Un caractère spéciale est permis à la fin.";
		estValide = false;
	} else 
		errMotPasseEnr.innerHTML = "";
		
	if (motDePasseConfEnr !== motDePasseEnr) {
		errMotPasseConfEnr.innerHTML = "Le mot de passe de confirmation ne correspond pas.";
		estValide = false;
	} else 
		errMotPasseConfEnr.innerHTML = "";
	
	if (estValide)
		return true;
	else
		return false;	
		
}
function validerAjoutModifFilm() {
	//debugger;
	var titre = document.getElementById('titre').value.trim();
	var realisateur = document.getElementById('realisateur').value.trim();
	var duree = document.getElementById('duree').value.trim(); 
	var prix = document.getElementById('prix').value.trim(); 
	var urlVid = document.getElementById('url').value.trim(); 
	//var fichePochette = document.getElementById('pochette').value; 
	
	var errTitre = document.getElementById('errTitre');
	var errRealisateur = document.getElementById('errRealisateur');
	var errDuree = document.getElementById('errDuree');
	var errPrix = document.getElementById('errPrix');
	var errUrlVid = document.getElementById('errUrlVid');
	//var errPochette = document.getElementById('errPochette');
	
	var estValide = true;
	var regex = new RegExp(REG_URL);
	if (!regex.test(urlVid)) {
		errUrlVid.innerHTML = "Vous devez entrez une adresse URL valide.";
		estValide = false;
	} else 
		errUrlVid.innerHTML = "";
	
	if (titre.trim() == "") {
		errTitre.innerHTML = "Vous devez entrez un titre valide.";
		estValide = false;
	} else
		errTitre.innerHTML = "";
		
	if (realisateur.trim() == "") {
		errRealisateur.innerHTML = "Vous devez entrez un nom de réalisateur valide.";
		estValide = false;
	} else 
		errRealisateur.innerHTML = "";
	
	var regex = new RegExp(REG_DUREE);
	if (!regex.test(duree)) {
		errDuree.innerHTML = "Vous devez entrez une durée valide comprenant entre 10 et 999 minutes.";
		estValide = false;
	} else 
		errDuree.innerHTML = "";
	
	var regex = new RegExp(REG_PRIX);
	if (!regex.test(prix)) {
		errPrix.innerHTML = "Vous devez entrez une prix de format valide entre 0.00 et 999.00.";
		estValide = false;
	} else 
		errPrix.innerHTML = "";
	
	if (estValide) {
		return true;
	} else
		return false
}
function resetForm(leForm) {
	
	leForm.reset();
	
	if (leForm.name === "formEnr") {
		document.getElementById('errCourEnr').innerHTML = "";
		document.getElementById('errMotPasseEnr').innerHTML = "";
		document.getElementById('errMotPasseConfEnr').innerHTML = "";
		
		//leForm.username.select();
		
	} else if (leForm.name === "formConn") {
		document.getElementById('errCourConn').innerHTML = "";
		document.getElementById('errMotPasseConn').innerHTML = "";
		
		//leForm.username.select();
		
	} else if (leForm.name === "formAjoutFilm") {
		document.getElementById('errTitre').innerHTML = "";
	    document.getElementById('errRealisateur').innerHTML = "";
		document.getElementById('errDuree').innerHTML = "";
		document.getElementById('errPrix').innerHTML = "";
		document.getElementById('errUrlVid').innerHTML = "";
		document.getElementById('errPochette').innerHTML = "";
		
		//leForm.inputTitre.select();
		
	}   
} 
function envoyerFormulaire(leForm) {
	//debugger;
	leForm.submit();
}
function rendreVisible(el) {
	document.getElementById(el).style.display='block';
}
function rendreInvisible(el) {
	document.getElementById(el).style.display='none';
}









//function supprimerFilm(noFilm) {
//	//debugger; 
//	var result = confirm("Confirmer la suppresson du film " + noFilm + " ?");
//	if (result) {
//		return true;
//	} else {
//		return false;
//	}
//	
//}

//function handleRecommencerAjoutOuModif(formAjoutFilm) {
//	//debugger;
//	var noFilm = document.getElementById('inputNoFilm').value;
//	if (noFilm == "") {
//		resetForm(formAjoutFilm);
//		rendreInvisible('formIdModifierFilm');
//	} else {
//		modifierFilm(noFilm);
//	}
//}
//function ajouterFilm() {
//	debugger;
//	rendreInvisible('formIdModifierFilm'); 
//	rendreVisible('divAjoutFilm');
//	document.getElementById('inputNoFilm').value = "";
//	document.getElementById('inputNoFilm').innerHTML = "";
//	document.getElementById('inputNoFilmHidden').value = "";	
//	document.getElementById('inputNoFilmHidden').innerHTML = "";	
//	resetForm(formAjoutFilm);
//	document.getElementById('AjoutOuModif').innerHTML='Ajout';
//	document.getElementById('divAjoutFilm').scrollIntoView();
//}
//function modifierFilm(noFilm) {
//	//debugger;
//	// D'abord, on vérifer dans notre Array en mémoire pour trouver l'entrée associé à ce noFilm
//	var film = FILMS.find(function(element) {
//		return element["noFilm"] == noFilm;
//	});
//	document.getElementById('AjoutOuModif').innerHTML = "Modification";
//	//ensuite, on reset le formulaire partager pour add/modifier
//	resetForm(formAjoutFilm);
//	//on remplit le formulaire
//	document.getElementById('inputNoFilm').value = noFilm;
//	document.getElementById('inputNoFilmHidden').value = noFilm;
//	document.getElementById('inputTitre').value = film['titre'];         
//	document.getElementById('inputRealis').value = film['realisateur'];  
//	
//	document.getElementById('selectCategorie').value = film['categorie'];  
//	
//	document.getElementById('inputDuree').value = film['duree'];         
//	document.getElementById('inputPrix').value = film['prix'];           
//	document.getElementById('inputUrlVid').value = film['urlVideo'];     
//	
//	document.getElementById('formIdModifierFilm').style.display='block';
//	rendreVisible('divAjoutFilm'); 
//	document.getElementById('divAjoutFilm').scrollIntoView();
//}

//function ajaxRequest(callback, strParams, url) {
//	//debugger;
//	var http = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');  // XMLHttpRequest object
//	//var url = "traiter.php";
//	var params = strParams; //"monAction=obtenirListeGlob&name=binny"; // "monAction=ipsum&name=binny";
//	http.open("POST", url, true);
//
//	//Send the proper header information along with the request
//	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//
//	http.onreadystatechange = function() {//Call a function when the state changes.
//		if(http.readyState == 4 && http.status == 200) {
//			//alert(http.responseText);
//			callback(http.responseText);
//		}
//	}
//	http.send(params);
//}
//function ajaxRequest(callback, strParams, url, targetOutputID) {
//	//debugger;
//	var http = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');  // XMLHttpRequest object
//	//var url = "traiter.php";
//	var params = strParams; //"monAction=obtenirListeGlob&name=binny"; // "monAction=ipsum&name=binny";
//	http.open("POST", url, true);
//
//	//Send the proper header information along with the request
//	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//
//	http.onreadystatechange = function() {//Call a function when the state changes.
//		if(http.readyState == 4 && http.status == 200) {
//			//alert(http.responseText);
//			callback(http.responseText, targetOutputID);
//		}
//	}
//	http.send(params);
//}


//function handleResetFormAjoutOuModif() {
//	
//	rendreInvisible('divAjoutFilm');
//	resetForm(formAjoutFilm);
//}
//function supprimerFilm(noFilm) {
//	//debugger; 
//	// REQUETE DANS LA BD POUR SUPPRIMER LE FILM ET MAJ DE LA VARIABLE EN MÉMOIRE
//	var result = confirm("Confirmer la suppresson du film " + noFilm + " ?");
//	if (result) {
//		//debugger;
//		NO_FILM = noFilm;
//		ajaxRequest(handleDeleteArrayFilms, 'monAction=E&noFilm=' + noFilm, 'serveur/gestionFilms.php');
//	}
//	
//}
//
//function handleAdminDiv() {
//	var divIdLanding = document.getElementById("landing");
//	ajaxRequest(handleLandingPageContentForUserType, 'monAction=landing', 'serveur/gestionMembres.php', divIdLanding);
//	
//	
//	//debugger; // TODO: AVEC LOOPING VARIABLE EN MÉMOIRE POUR INSÉRER DANS LE PANNEL ADMIN...
//	//var formCreerModif ="  <div id=\"tempAdmin\"> "; 
//	//formCreerModif +=" 	<div class=\"container\"> "; 
//	//formCreerModif +=" 	<h3 class=\"display-4\">Administration</h2> ";
//	//formCreerModif +="         <div class=\"row\"> "; 
//	//formCreerModif +="             <div class=\"col-lg-12\"> "; 
//	//formCreerModif +="                 <h3>Gestion des films</h3> "; 
//	//formCreerModif +="                 <table border=\"0\" class=\"table table-hover\" id=\"myTableAdmin\"> "; 
//	//formCreerModif +="                     <thead> "; 
//	//formCreerModif +="                         <tr> "; 
//	//formCreerModif +="                             <th>No. Film</th> "; 
//	//formCreerModif +="                             <th>Titre</th> "; 
//	//formCreerModif +="                             <th>Réalisateur</th> "; 
//	//formCreerModif +="                             <th>Catégorie</th> "; 
//	//formCreerModif +="                             <th>Durée</th> "; 
//	//formCreerModif +=" 							<th>Prix</th> "; 
//	//formCreerModif +=" 							<th>URL Vidéo</th> "; 
//	//formCreerModif +=" 							<th>Pochette</th> "; 
//	//formCreerModif +=" 							<th></th> "; 
//	//formCreerModif +=" 							<th></th> "; 
//	//formCreerModif +="                         </tr> "; 
//	//formCreerModif +="                     </thead> "; 
//	//formCreerModif +="                     <tbody> "; 
//	//formCreerModif +=" 					<!-- looping ici--> "; 
//	////debugger;
//	//for(i=0; i < FILMS.length; i++) {
//	//	formCreerModif +="                         <tr> "; 
//	//	formCreerModif +="                             <td>"+FILMS[i]["noFilm"]+"</td> "; 
//	//	formCreerModif +="                             <td>"+FILMS[i]["titre"]+"</td> "; 
//	//	formCreerModif +="                             <td>"+FILMS[i]["realisateur"]+"</td> "; 
//	//	formCreerModif +="                             <td>"+FILMS[i]["categorie"]+"</td> "; 
//	//	formCreerModif +="                             <td>"+FILMS[i]["duree"]+"</td> "; 
//	//	formCreerModif +=" 								<td>"+FILMS[i]["prix"]+"</td> "; 
//	//	formCreerModif +="                             <td><a href=" + FILMS[i]["urlVideo"] + ">" + FILMS[i]["urlVideo"] + "</a></td> ";  
//	//	formCreerModif +=" 							<td><img src='./pochettes/"+FILMS[i]["pochette"]+"' width=50 height=50></td> "; 
//	//	formCreerModif +=" 							<td><button type=\"button\" class=\"btn btn-link\" onClick=\"modifierFilm("+FILMS[i]["noFilm"]+"); rendreVisible('divAjoutFilm')\">Modifier</button> <!-- on recherche l'ID en mémoire --> "; 
//	//	formCreerModif +=" 							<td><button type=\"button\" class=\"btn btn-link\" onClick=\"supprimerFilm("+FILMS[i]["noFilm"]+")\">Supprimer</button> <!-- on recherche l'ID en mémoire --> "; 
//	//	formCreerModif +=" 						</tr> "; 
//	//}
//	//
//	//formCreerModif +=" 					<!-- fin looping ici--> "; 
//	//formCreerModif +="                     </tbody> "; 
//	//formCreerModif +="                     <tfoot> "; 
//	//formCreerModif +="                         <tr> "; 
//	//formCreerModif +="                             <td colspan=\"10\"></td> "; 
//	//formCreerModif +="                         </tr> "; 
//	//formCreerModif +="                     </tfoot> "; 
//	//formCreerModif +="                 </table> "; 
//	//formCreerModif +="             </div> "; 
//	//formCreerModif +="         </div> "; 
//	//formCreerModif +=" 		<div class=\"row\"> "; 
//	//formCreerModif +=" 			<div class=\"col-sm-12\"> "; 
//	////////formCreerModif +=" 				<a class=\"btn btn-outline-primary\" role=\"button\" onClick=\"rendreInvisible('formIdModifierFilm'); rendreVisible('divAjoutFilm'); resetForm(formAjoutFilm)\">Ajouter un film</a> "; 
//	//	formCreerModif +=" 				<a class=\"btn btn-outline-primary\" role=\"button\" onClick=\"ajouterFilm()\">Ajouter un film</a> "; 
//	//formCreerModif +=" 			</div> "; 
//	//formCreerModif +=" 			<div class=\"col-sm-12\"> "; 
//	//formCreerModif +=" 				<br> "; 
//	//formCreerModif +=" 			</div> "; 
//	//formCreerModif +=" 		</div> "; 
//	//formCreerModif +=" 		<div class=\"row\" id=\"divAjoutFilm\" style=\"display: none;\">  "; 
//	//	formCreerModif +=" 		<h4 id=\"AjoutOuModif\">Ajout</h4>  "; 
//	//formCreerModif +=" 			<div class=\"col-xs-12 col-sm-10 col-md-8 col-lg-6\"> "; 
//	//formCreerModif +=" 				 <form class=\"form\" role=\"form\" id=\"formAjoutFilm\" name=\"formAjoutFilm\" enctype=\"multipart/form-data\" onSubmit=\"return validerAjoutModifFilm('');\" method=\"post\" action=\"serveur/gestionFilms.php\" accept-charset=\"UTF-8\"> "; 
//	//formCreerModif +=" 					<div class=\"form-group\" style=\"display: none;\" id=\"formIdModifierFilm\"> "; 
//	//		formCreerModif +="						<input type=\"hidden\" name=\"monAction\" value=\"A\">";
//	//		formCreerModif +=" 						<input type=\"hidden\" class=\"form-control\" id=\"inputNoFilmHidden\" name=\"inputNoFilmHidden\"> ";
//	//formCreerModif +=" 						<label for=\"inputNoFilm\">No film</label> "; 
//	//formCreerModif +=" 						<input type=\"text\" class=\"form-control\" id=\"inputNoFilm\" name=\"inputNoFilm\" value=\"\" disabled> "; 
//	//formCreerModif +=" 					</div>	 "; 
//	//formCreerModif +=" 					<div class=\"form-group\"> "; 
//	//formCreerModif +=" 						<label for=\"inputTitre\">Titre</label> "; 
//	//formCreerModif +=" 						<input type=\"text\" class=\"form-control\" id=\"inputTitre\" name=\"inputTitre\" placeholder=\"Entrez le titre\"> "; 
//	//formCreerModif +=" 						<span id=\"errTitre\" class=\"error\"></span> "; 
//	//formCreerModif +=" 					</div> "; 
//	//formCreerModif +=" 					<div class=\"form-group\"> "; 
//	//formCreerModif +=" 						<label for=\"inputRealis\">Réalisateur</label> "; 
//	//formCreerModif +=" 						<input type=\"text\" class=\"form-control\" id=\"inputRealis\" name=\"inputRealis\" placeholder=\"Entrez le réalisateur\"> "; 
//	//formCreerModif +=" 						<span id=\"errRealisateur\" class=\"error\"></span> "; 
//	//formCreerModif +=" 					</div> "; 
//	//formCreerModif +=" 					<div class=\"form-group\"> "; 
//	//formCreerModif +=" 						<label for=\"selectCategorie\">Catégorie</label> "; 
//	//formCreerModif +=" 						<select class=\"form-control\" id=\"selectCategorie\" name=\"selectCategorie\" placeholder=\"Sélectionnez la catégorie\"> "; 
//	//formCreerModif +=" 							<option value=\"1\">Science-Fiction</option> "; 
//	//formCreerModif +=" 							<option value=\"2\">Comédie-Humour</option> "; 
//	//formCreerModif +=" 							<option value=\"3\">Action-Aventure</option> "; 
//	//formCreerModif +=" 							<option value=\"4\">Enfant-Famille</option> "; 
//	//formCreerModif +=" 							<option value=\"5\">Drame</option> "; 
//	//formCreerModif +=" 							<option value=\"6\">Horreur-Suspense</option> "; 
//	//formCreerModif +=" 							<option value=\"7\">Autres</option> "; 
//	//formCreerModif +=" 						</select> "; 
//	//formCreerModif +=" 					</div> "; 
//	//formCreerModif +=" 					<div class=\"form-group\"> "; 
//	//formCreerModif +=" 						<label for=\"inputDuree\">Durée</label> "; 
//	//formCreerModif +=" 						<input type=\"text\" class=\"form-control\" id=\"inputDuree\" name=\"inputDuree\" placeholder=\"Entrez la durée\"> "; 
//	//formCreerModif +=" 						<span id=\"errDuree\" class=\"error\"></span> "; 
//	//formCreerModif +=" 					</div> "; 
//	//formCreerModif +=" 					<div class=\"form-group\"> "; 
//	//formCreerModif +=" 						<label for=\"inputPrix\">Prix</label> "; 
//	//formCreerModif +=" 						<input type=\"text\" class=\"form-control\" id=\"inputPrix\" name=\"inputPrix\" placeholder=\"Entrez le prix\"> "; 
//	//formCreerModif +=" 						<span id=\"errPrix\" class=\"error\"></span> "; 
//	//formCreerModif +=" 					</div> "; 
//	//formCreerModif +=" 					<div class=\"form-group\"> "; 
//	//formCreerModif +=" 						<label for=\"inputUrlVid\">URL Vidéo</label> "; 
//	//formCreerModif +=" 						<input type=\"text\" class=\"form-control\" id=\"inputUrlVid\" name=\"inputUrlVid\" placeholder=\"Entrez l'URL vidéo\"> "; 
//	//formCreerModif +=" 						<span id=\"errUrlVid\" class=\"error\"></span> "; 
//	//formCreerModif +=" 					</div> "; 
//	//formCreerModif +=" 					 "; 
//	//formCreerModif +=" 					<div class=\"form-group\"> "; 
//	//formCreerModif +=" 						<label for=\"pochette\">Pochette</label> "; 
//	//formCreerModif +=" 						<input type=\"file\" class=\"form-control-file\" id=\"pochette\" name=\"pochette\"> "; 
//	//formCreerModif +=" 						<span id=\"errPochette\" class=\"error\"></span> "; 
//	//formCreerModif +=" 					</div> ";  
//	//formCreerModif +=" 					<span> "; 
//	//formCreerModif +=" 						<button type=\"submit\" class=\"btn btn-primary\">Soumettre</button> "; 
//	//formCreerModif +=" 						| <a class=\"btn btn-outline-secondary\" role=\"button\" onclick=\"handleRecommencerAjoutOuModif(formAjoutFilm)\">Recommencer</a> <!-- onclick=\"resetForm(formAjoutFilm); rendreInvisible('formIdModifierFilm')\" --> "; 
//	//formCreerModif +=" 						| <button type=\"reset\" class=\"btn btn-outline-dark\" onClick=\"rendreInvisible('divAjoutFilm'); resetForm(formAjoutFilm)\">Annuler</button> "; 
//	//formCreerModif +=" 					</span> "; 
//	//formCreerModif +=" 				</form> "; 
//	//formCreerModif +=" 			</div> "; 
//	//formCreerModif +=" 		</div> "; 
//	//formCreerModif +=" 	</div>		 "; 
//	//formCreerModif +=" </div> ";
//	//document.getElementById('landing').innerHTML = formCreerModif; 
//	
//}	
//
//