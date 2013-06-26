function deal_voting(ajaxobject) {
    $('[class^="p-rating"]').click(function(event){
        var deal_id = $(event.target).attr('deal_id');
        var doc_id = $(event.target).attr('elastic_doc_id');
        var array_index = $(event.target).attr('elastic_results_array_index');
        
        var pathArray = window.location.pathname.split('/');

        var url = SERVER_DOMAIN+"/deals/upvote_deal_ajax?deal_id="+deal_id+"&dir="+pathArray[1]+"&script="+pathArray[2]+"&doc_id="+doc_id;
        $.getJSON(url, function(data) {
           if(data.message != null){
               $("body").append('<div class="modalOverlay">');
               $("body").append('<div id="alert_box">');
               $("#alert_box").show().html(data.message).center().fadeIn();
               $(".modalOverlay").click(function() {
                    $("#alert_box").remove();
                    $(".modalOverlay").remove();
               });
           } else {
               if(doc_id != undefined && array_index != undefined) {
                   ajaxobject.update_es_score_local_copy(array_index, data.score_up, data.score_down);
               }
               var nratingClass = (Math.abs(data.score_up) < Math.abs(data.score_down)) ? "color":"nocolor";
               var pratingClass = (Math.abs(data.score_up) > Math.abs(data.score_down)) ? "color":"nocolor";
               var html = '<div class="n-rating-' + nratingClass + '">' +
	                       '<div class="thumbs-down"></div>' +
	                       '<div class="thumb-cnt">' + Math.abs(data.score_down) + '</div>' +
                          '</div>' +
                          '<div class="p-rating-' + pratingClass + '">' +
	                       '<div class="thumbs-up"></div>' +
	                       '<div class="thumb-cnt">' + Math.abs(data.score_up) + '</div>' +
                          '</div>';
               $("#score_voting"+deal_id).hide().removeClass().html(html).fadeIn("slow");
           }
           
        });
    });
    
    $('[class^="n-rating"]').click(function(event) {
        var deal_id = $(event.target).attr('deal_id');
        var doc_id = $(event.target).attr('elastic_doc_id');
        var array_index = $(event.target).attr('elastic_results_array_index');
        
        var pathArray = window.location.pathname.split('/');
        
        var url = SERVER_DOMAIN+"/deals/downvote_deal_ajax?deal_id="+deal_id+"&dir="+pathArray[1]+"&script="+pathArray[2]+"&doc_id="+doc_id;
        $.getJSON(url, function(data) {
           if(data.message != null){
               $("body").append('<div class="modalOverlay">');
               $("body").append('<div id="alert_box">');
               $("#alert_box").show().html(data.message).center().fadeIn();
               $(".modalOverlay").click(function() {
                    $("#alert_box").remove();
                    $(".modalOverlay").remove();
               });
           } else {
               if(doc_id != undefined && array_index != undefined) {
                   ajaxobject.update_es_score_local_copy(array_index, data.score_up, data.score_down);
               }
               var nratingClass = (Math.abs(data.score_up) < Math.abs(data.score_down)) ? "color":"nocolor";
               var pratingClass = (Math.abs(data.score_up) > Math.abs(data.score_down)) ? "color":"nocolor";
               var html = '<div class="n-rating-' + nratingClass + '">' +
	                       '<div class="thumbs-down"></div>' +
	                       '<div class="thumb-cnt">' + Math.abs(data.score_down) + '</div>' +
                          '</div>' +
                          '<div class="p-rating-' + pratingClass + '">' +
	                       '<div class="thumbs-up"></div>' +
	                       '<div class="thumb-cnt">' + Math.abs(data.score_up) + '</div>' +
                          '</div>';
               $("#score_voting"+deal_id).hide().removeClass().html(html).fadeIn("slow");
           }
           
        });
    });
}


function review_voting() {
   $(".review_upvote").click(function(event){
       var review_id = $(event.target).attr('review_id');

       var url = SERVER_DOMAIN+"/reviews/upvote_review_ajax?review_id="+review_id;
       $.getJSON(url, function(data) {
           if(data.message != null){
               $("body").append('<div class="modalOverlay">');
               $("body").append('<div id="alert_box">');
               $("#alert_box").show().html(data.message).center().fadeIn();
               $(".modalOverlay").click(function() {
                    $("#alert_box").remove();
                    $(".modalOverlay").remove();
               });
           } else {
               $("#score_up"+review_id).hide().html(data.score+" People found this review helpful |").fadeIn("slow");
           }
       });
   });
   
   $(".review_downvote").click(function(event){
       var review_id = $(event.target).attr('review_id');

       var url = SERVER_DOMAIN+"/reviews/downvote_review_ajax?review_id="+review_id;
       $.getJSON(url, function(data) {
           if(data.message != null){
               $("body").append('<div class="modalOverlay">');
               $("body").append('<div id="alert_box">');
               $("#alert_box").show().html(data.message).center().fadeIn();
               $(".modalOverlay").click(function() {
                    $("#alert_box").remove();
                    $(".modalOverlay").remove();
               });
           } else {
               $("#score_down"+review_id).hide().html(data.score+" Not helpful").fadeIn("slow");
           }
       });
   });
}

function flag_as_inappropriate() {
    $(".flag").click(function(event) {
        var review_id = $(event.target).attr('review_id');
        
        var url = SERVER_DOMAIN+"/reviews/flag_review_ajax?review_id="+review_id;
        $.getJSON(url, function(data) {
            if(data.message != "Flagged") {
                $("body").append('<div class="modalOverlay">');
                $("body").append('<div id="alert_box">');
                $("#alert_box").show().html(data.message).center().fadeIn();
                $(".modalOverlay").click(function() {
                    $("#alert_box").remove();
                    $(".modalOverlay").remove();
                });
            } else {
                $("#flag"+review_id).hide().html(data.message).fadeIn("slow");
            } 
        });
    });
}
