$(document).ready(function(){
	$("#hamburger-button").click(function(){
		$("#hb-row1").toggleClass("toggle");
		$("#hb-row2").toggleClass("toggle");
		$("#hb-row3").toggleClass("toggle");
		$("#nav-bar").toggleClass("toggle");
	});
	$("#name-hero").slideDown(300, 'linear', function(){
		$("#description-hero").slideDown(800, 'linear');
	});
	$("#home-button").click(function(){
		$("body").scrollTo("#home");
	});
	$("#publications-button").click(function(){
		$("body").scrollTo("#publications");
	});
	$("#skills-button").click(function(){
		$("body").scrollTo("#skills");
	});
	$("#contact-button").click(function(){
		$("body").scrollTo("#contact");
	});
	$(".pub-div").hover(
		function(){
			$(this).find(".pub-text").slideDown(300);
		},
		function(){
			$(this).find(".pub-text").slideUp(300);
		});
	const year = new Date().getFullYear();
	$("#copyright").html("Copyright "+year+" Dibyabiva Seth. All rights reserved.");
});