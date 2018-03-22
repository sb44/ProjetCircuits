var nbEtape = 0;
var nbJour = 0;

  function foldEtape(id) {
		$("#etapeFold" + id).toggle("slide");
		$("#etapeTitle" + id).toggleClass("oi-minus").toggleClass("oi-plus");
  }

  function foldJour(id) {
		$("#jourFold" + id).toggle("slide");
		$("#jourTitle" + id).toggleClass("oi-minus").toggleClass("oi-plus");
  }

  function addEtape() {
		var nb = document.querySelectorAll(".etape");
		var l = nb.length;
		var view = { i: nbEtape, n: l};
		var template = document.getElementById('templateEtape').innerHTML;
		var output = Mustache.render(template, view);
		$('#etapes').append(output);
		newEditor('desEtape'+ l, 'ckEtape'+ nbEtape, 'desEtape');
		nbEtape++;
		//var a = $('#desEtape'+nbEtape++).val();
		//alert(a);
  }

  function addJour(id) {
	 	 var nb = document.querySelectorAll(".jour.etape"+ id);
	 	 var l = nb.length + 1;
	 	 var view = { i: id, j:nbJour, n: l};
	 	 var template = document.getElementById('templateJour').innerHTML;
	 	 var output = Mustache.render(template, view);
		$('#joursEtape' + id).append(output);
		newEditor('desJour'+ l, 'ckJour'+ nbJour, "ckJour");
		newEditor('desActivite'+ l, 'ckActivite'+ nbJour, "ckActivite");
		nbJour++;
	}
	
	function supprimerEtape(n) {
		$("#templateEtape" + n).remove();
		var nb = document.querySelectorAll(".etape");
		var l = nb.length;
		for (p=n; p<l; p++) {
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
		alert(l);
		alert(id);
		id1 = id -1;

		for (p=1; p<l; p++) {
			$("#templateJour" + id + p).attr("id", "templateJour" + id1 + p);
			$("#sp" + id + p).attr("id", "sp" + id1 + p);
			$("#jour" + id + p).attr("class", "jour etape" + id1);
			$("#jour" + id + p).attr("id", "jour" + id1 + p);
			$("#btn-jour" + id + p).attr("onclick", "supprimerJour\(" + id1 + "," + p + "\)");
			$("#btn-jour" + id + p).attr("id", "btn-jour" + id1 + p);
		}
	}


	CKEDITOR.on( 'instanceCreated', function( evt ) {
		console.log( 'instanceCreated', evt, evt.editor );
		//var editor = event.editor,
		//element = editor.element;
		//editor.name = $(element).attr('name');
		//editor.name = "editor";
	} );
	
	function newEditor(id1, id2, name) {
		// This HTML could've come from AJAX data.
		var el = CKEDITOR.dom.element.createFromHtml('<div id="' + id1 +  '" name="' + name + '" contenteditable="true"></div>');
		CKEDITOR.document.getById(id2).append(el);
		
		// Create editor instance on the new element.
		var editor1 = CKEDITOR.inline( el, {
			toolbarGroups: [
				{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
				{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
			]
		} );
	}

