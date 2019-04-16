
(function($) {

	$( document ).ready( function() {

		/* VIEWPORT FIXES (http://timkadlec.com/2013/01/windows-phone-8-and-device-width/) */
		if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
		  var msViewportStyle = document.createElement('style');
		  msViewportStyle.appendChild(
		    document.createTextNode(
		      '@-ms-viewport{width:auto!important}'
		    )
		  );
		  document.querySelector('head').appendChild(msViewportStyle);
		}


		//javascript code hier

		var valOmschrijving;
		var valUurPrijs;
		var valUren;

		var sum = 0;
		var subTotaal = 0;
		var tax = 0;
		var totaal = 0;
		var verwijderCounter=0;


		// ADD ITEMS TO INVOICE 

		function addItems(){
			valOmschrijving = $('#formOmschrijving').val();
			valUurPrijs = $('#formUurprijs').val();
			valUren = $('#formUren').val();
			
			verwijderCounter++;
			itemUrenTotaal = valUurPrijs * valUren;
			sum += itemUrenTotaal;

			$("#omschrijving").append("<li data-verwijder='"+ verwijderCounter +"'>"+ valOmschrijving +"</li>");
			$("#uurprijs").append("<li data-verwijder='"+ verwijderCounter +"'>"+ valUurPrijs +"</li>");
			$("#aantal").append("<li data-verwijder='"+ verwijderCounter +"'>"+ valUren +"</li>");
			$('#lijntotaal').append("<li class='lijntotaal' data-verwijder='"+verwijderCounter+"'>"+itemUrenTotaal+"</li>");
			$("#verwijderLijn").append("<li><a class='verwijder'  data-verwijder='"+verwijderCounter+"'>verwijder</a></li>");

			$("#subtotaal").html(sum);
			calculateTax();
			calculateTotal();
			
		}



		// CALCULATE TAX
		function calculateTax(){
			tax = (sum * .21);
			$('#btwbedrag').html(tax.toFixed(2));
		}
		// CALCULATE TOTAL

		function calculateTotal(){
			totaal = (sum + tax);
			$("#totaal").html(totaal);

		}

		// CHANGE ENTERPRISE INFORMATION

		function changeEnterpriseInformation(){

			$("#factuurNummer").html($("#formOndernemingFactuurNummer").val());
			$("#ondernemingNaam").html($('#formOndernemingNaam').val());
			$("#ondernemingStraatNaam").html($('#formOndernemingStraatNaam').val());
			$("#ondernemingPostcode").html($('#formOndernemingPostcodeGemeente').val());
			$("#ondernemingBtwNummer").html($('#formOndernemingBtw').val());

		}

		// CHANGE CUSTOMER INFORMATION

		function changeCustomerInformation(){

			$("#klantNaam").html($('#formKlantNaam').val());
			$("#klantStraatNaam").html($('#formKlantStraatNaam').val());
			$("#klantPostcode").html($('#formKlantPostcodeGemeente').val());
			$("#klantBtwNummer").html($('#formKlantBtw').val());

		}



		// ACTIONS WHEN CLICK ON BUTTONS


		$("#factuurFormSend").click(function(){
			addItems();
		});

	
		$(document).on('click','.verwijder', function(){
		  
		   var tempTotaal = 0; 

		   var lijnId = $(this).attr("data-verwijder"); 
			
	
			$("[data-verwijder='" + lijnId + "']").each(function(){
				if($(this).hasClass('lijntotaal')) 
					tempTotaal = $(this).text(); 
				this.remove(); 
			});

			sum -= tempTotaal;
			$("#subtotaal").html(sum);
			calculateTax();
			calculateTotal();
		}) 
		

		$("#ondernemingFormSend").click(function(){
			changeEnterpriseInformation();
		});
		
		$("#klantFormSend").click(function(){
			changeCustomerInformation();
		});
		
	

		

		





	} );

})(jQuery);
