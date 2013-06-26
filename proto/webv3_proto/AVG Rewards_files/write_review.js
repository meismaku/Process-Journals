function show_review_form_buttons() {
    // hide drop-down menus        
    $('#score_shipping').hide();
    $('#score_service').hide();
    $('#score_quality').hide();
    $('#score_price').hide();
    $('#score_overall').hide();
            
    // show grade buttons        
    $('#score_shipping_buttons').css('display', 'block');
    $('#score_service_buttons').css('display', 'block');
    $('#score_quality_buttons').css('display', 'block');
    $('#score_price_buttons').css('display', 'block');
    $('#score_overall_buttons').css('display', 'block');
        
    var star_grade;
    
    // grade buttons persistence        
    if($("#score_shipping").val() != "Select"){
         star_grade = $("#score_shipping").val();
         for(var i=1; i<=parseInt(star_grade); i++) {
             $("#score_shipping_buttons .rating_"+i).removeClass("rating_"+i).addClass("rating_active_"+i);
         }
    }
    if($("#score_service").val() != "Select"){
         star_grade = $("#score_service").val();
         for(var i=1; i<=parseInt(star_grade); i++) {
             $("#score_service_buttons .rating_"+i).removeClass("rating_"+i).addClass("rating_active_"+i);
         }
    }
    if($("#score_quality").val() != "Select"){
         star_grade = $("#score_quality").val();
         for(var i=1; i<=parseInt(star_grade); i++) {
         $("#score_quality_buttons .rating_"+i).removeClass("rating_"+i).addClass("rating_active_"+i);
         }
    }
    if($("#score_price").val() != "Select"){
         star_grade = $("#score_price").val();
         for(var i=1; i<=parseInt(star_grade); i++) {
             $("#score_price_buttons .rating_"+i).removeClass("rating_"+i).addClass("rating_active_"+i);
         }
    }
    if($("#score_overall").val() != "Select"){
         star_grade = $("#score_overall").val();
         for(var i=1; i<=parseInt(star_grade); i++) {
             $("#score_overall_buttons .rating_"+i).removeClass("rating_"+i).addClass("rating_active_"+i);
         }
    }
   
    // grade buttons event handler                
    $(".review_div span").click(function(event) {
        var selectThis = event.target.getAttribute('score');
        var select = selectThis.split('-');
        
        // set selected value for dropdown menu
        $("#"+select[0]).val(select[1]);
                
        var grade = select[1];
        
        // remove previous active button
        for(var i=parseInt(grade)+1; i<=5; i++) {
            $("#"+select[0]+"_buttons .rating_active_"+i).removeClass("rating_active_"+i).addClass("rating_"+i);                
        }
        
        // make selected button active
        for(var i=1; i<=parseInt(grade); i++) {
            $("#"+select[0]+"_buttons .rating_hover_"+i).removeClass("rating_hover_"+i).addClass("rating_active_"+i);
        }
   });   
   
    // star hover             
    $(".review_div span").mouseover(function(event) {
        var selectThis = event.target.getAttribute('score');
        var select = selectThis.split('-');
                
        var grade = select[1];
        
        // make selected button active
        for(var i=1; i<=parseInt(grade); i++) {
            $("#"+select[0]+"_buttons .rating_"+i).removeClass("rating_"+i).addClass("rating_hover_"+i);
        }
   }); 
   
   // star mouse leave
   $(".review_div span").mouseleave(function(event) {
        var selectThis = event.target.getAttribute('score');
        var select = selectThis.split('-');
        
        // remove previous active button
        for(var i=1; i<=5; i++) {
            $("#"+select[0]+"_buttons .rating_hover_"+i).removeClass("rating_hover_"+i).addClass("rating_"+i);                
        }
   });
   
   
   
   // set buttons
   $("#review_form_reset").click(function() {
        for(var i=1; i<=5; i++) {
            $("#score_shipping_buttons .rating_active_"+i).removeClass("rating_active_"+i).addClass("rating_"+i);
            $("#score_service_buttons .rating_active_"+i).removeClass("rating_active_"+i).addClass("rating_"+i);
            $("#score_quality_buttons .rating_active_"+i).removeClass("rating_active_"+i).addClass("rating_"+i);
            $("#score_price_buttons .rating_active_"+i).removeClass("rating_active_"+i).addClass("rating_"+i);
        }
   });
            
}

function review_show_more_show_less() {
    $(".see_more").click(function(event) {
        var count = $(event.target).attr("count");
        $(event.target).hide();
        $(".socr_dtl[count='"+count+"']").show("slow");
        $(".see_less[count='"+count+"']").show("slow");
        
    });
    $(".see_less").click(function(event){
        var count = $(event.target).attr("count");
        $(".socr_dtl[count='"+count+"']").hide("slow");
        $(".see_more[count='"+count+"']").show("slow");
    });
}
        