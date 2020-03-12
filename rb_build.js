"use strict";

var pizzaDesc = $("#pizzaSummary").text();

$("#pizzaSize").change(function(){
	var pizzaSize = $("#pizzaSize").val();
	var crust =  $("#pizzaCrust").val();
	pizzaDesc = pizzaSize + "\" pizza, " + crust;
	$("#pizzaSummary").text(pizzaDesc);
});



$("#pizzaCrust").change(function(){
	var pizzaSize = $("#pizzaSize").val();
	var crust =  $("#pizzaCrust").val();	
	pizzaDesc = pizzaSize + "\" pizza, " + crust;
	$("#pizzaSummary").text(pizzaDesc);
});




$("#doubleSauce").click(function(){

	if($("#doubleSauce").is(":checked")){
		var imgDoubleSauce = "<img src='rb_doublesauce.png' id='imgDoubleSauce'/>";
		$("#previewBox").append(imgDoubleSauce);
		pizzaDesc = pizzaDesc + "," + $(this).attr("name");
		$("#pizzaSummary").text(pizzaDesc);
	}
	else{
		$("#imgDoubleSauce").remove();
	}
});


$("#doubleCheese").click(function(){

	if($("#doubleCheese").is(":checked")){
		var imgDoubleCheese = "<img src='rb_doublecheese.png' id='imgDoubleCheese'/>";
		$("#previewBox").append(imgDoubleCheese);
		pizzaDesc = pizzaDesc + "," + $(this).attr("name")
		$("#pizzaSummary").text(pizzaDesc);

	}
	else{
		$("#imgDoubleCheese").remove();
	}
});


$("input[type=radio]").click(function(){

	var name = $(this).attr('name');
	var id = "img" + name;
	var href = "rb_" + name + ".png";
	
	$("#"+id+"").remove();

	if($(this).val() != "none"){
		console.log("added");
		var img = "<img src='" + href + "' id='" + id + "' />";
		$("#previewBox").append(img);
		pizzaDesc+= ", " + $(this).attr('name') + "(" + $(this).attr('value') + ")";
		$("#pizzaSummary").text(pizzaDesc);
	}
	else{
		console.log("removed");
		$("#"+id+"").remove();
	}
	
});


var qty;
var price=0;
//calculate total price
function calculateTotalPrice(){

	var pizzaSize = $("#pizzaSize").val();
	var crust =  $("#pizzaCrust").val();
	pizzaDesc = $("#pizzaSummary").text();

	if(pizzaSize == "12")
		price = 11;
	if(pizzaSize == "14")
		price = 13;
	if(pizzaSize == "16")
		price = 16;
	if(crust == "stuffed")
		price = price + 3.00;
	if(crust == "pan")
		price = price + 2.00;

	if($("#doubleSauce").is(":checked")){
		//pizzaDesc+= ", double sauce";
		price = price + 1.50;
	}

	if($("#doubleCheese").is(":checked")){
		//pizzaDesc+= ", double cheese";
		price = price + 1.50;
	}


	$("#doubleCheese").prop("checked", false);
	$("#doubleSauce").prop("checked", false);

	$("input[type=radio]:checked").each(function(){

		if($(this).val() != "none"){

			//pizzaDesc+= ", " + $(this).attr('name') + "(" + $(this).attr('value') + ")";
			price = price + 1.50;

		}

	});
	
	qty = $("#pizzaQuantity").val();
	price = price * qty;
}


var total=0;
$("#addToCart").click(function(){
	var addItem;
	calculateTotalPrice();
	addItem = pizzaDesc;
	
	var rowToAdd  = "<tr><td>" + addItem + "</td><td>" + qty + "</td><td>" + price + "</td><td><input type='button' class='removeFromCart' value='x'/></td></tr>";
	total= total + price;


	$("#cartTable").find("tbody").append(rowToAdd);
	$("#cartTotal").val(total);


	addItem = "";
	pizzaDesc = "";

	qty = 0;
	price = 0;

	$('input[type = radio]').each(function(){
		console.log('Inreset');
		console.log($(this).val());
		if($(this).val() == "none"){
			console.log("value none")
			$(this).prop('checked', true);
		}

		else{
			$(this).attr('checked', false);
		}
	});

	
});



$("tbody").on("click", "input.removeFromCart", function(){

	total-= $(this).parent().parent().children()[2].innerHTML;
	$("#cartTotal").val(total);
	$(this).parent().parent().remove();


});	


