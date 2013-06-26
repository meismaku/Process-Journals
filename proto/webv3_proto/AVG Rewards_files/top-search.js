$(".topSearch").mouseenter(function(){
	$(this).filter(':not(:animated)').animate({opacity:1,width:"420px"},260);
}).mouseleave(function(){
	$(this).animate({width:"90px",opacity:0.4},200);
});


/* I will move this to a better location soon */
function social_hover() {

$(".social-hover").mouseenter(function(){
	$(this).find(".social-media-hover").filter(':not(:animated)').css({"margin-right":"0px"}).animate({opacity:1,width:"330px","z-index":"1000"},100);
	$(this).find(".social-media").filter(':not(:animated)').animate({opacity:0,"z-index":"0"},100);
}).mouseleave(function(){
	$(this).find(".social-media").animate({opacity:1,"z-index":"1000"},10);
	$(this).find(".social-media-hover").animate({opacity:0,"margin-right":"-100px"},250).css({"z-index":"0",width:"0px"});
});

        $(".sharelink").click(function(){
            window.prompt('Press CTRL+C to copy link, when finish click OK button', $(this).attr('value'));
            
        });
}

$(document).ready(function() {
	$('.my-sticky-element').waypoint('sticky');
});
	