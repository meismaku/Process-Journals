function merchant_pop_up_events() {
    var popupTimeout;
    $(".merchant_pop_up").hover(function(event){
          popupTimeout = setTimeout(showPopup, 60);
          
          function showPopup() {
              var count = $(event.target).attr('count');
              var merchant_id = $(event.target).attr('merchant_id');
              var popupbox = $(event.target).find("#"+count);
          
              var url = SERVER_DOMAIN+"/merchants/merchant_popup?merchant_id="+merchant_id;
              $.getJSON(url, function(responseText) {
                  /*var html = "Url: "+responseText.url+
                             "<br/># Reviews:"+responseText.review_count+
                             "<br/>Score:"+responseText.score+
                             "<br/>Shipping Score:"+responseText.shipping_score;*/
                  var html = '<img class="merch-reportcard-img" src="/images/levis.jpg""></div>'+
                        		  '<span class="merchant-popup-right">'+
                      		         
                                      '<span class="merchant-popup-score">'+
                                      responseText.merchant.calc_score_overall+
                                        '<div class="merchant-overall-stars"></div>'+
                                      '</span>'+
                                      
                                      '<span class="merchant-popup-score">'+
                                      	'<span style="color:#999999; font-size:10px;">'+ '[Based on ' +
	                                  responseText.merchant.review_count+' reviews]</span>'+
                                      '</span>'+
                                        
                                      '<span class="merchant-popup-score">'+
                                       responseText.merchant.calc_score_shipping+ 
                                        '<div class="merchant-popup-score-title">&nbsp;&nbsp; SHIPPING</div>'+
                                      '</span>'+
                                      
                                      '<span class="merchant-popup-score">'+
                                      	responseText.merchant.calc_score_service+
                                      	'<div class="merchant-popup-score-title">&nbsp;&nbsp;CUSTOMER SERVICE</div>'+
                                      '</span>'+
                                      
                                      '<span class="merchant-popup-score">'+
                                        responseText.merchant.calc_score_quality+
                                        '<div class="merchant-popup-score-title">&nbsp;&nbsp;PRODUCT QUALITY</div>'+
                                      '</span>'+
                                      
                                      '<span class="merchant-popup-score">'+
                                        responseText.merchant.calc_score_price+
                                        '<div class="merchant-popup-score-title">&nbsp;&nbsp;PRICE</div>'+
                                      '</span> </span>';
                                     
                  popupbox.html(html)
              });
              popupbox.slideDown(150);
          }
    }, hidePopup);
    
    function hidePopup() {
          if(popupTimeout) {
              clearTimeout(popupTimeout);
          }
          $(this).find(".popup").slideUp(150);
    }
}
