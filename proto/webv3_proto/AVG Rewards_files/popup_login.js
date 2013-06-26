function popup_login() {
       $('#review_form_submit').click(function(event) {
            event.preventDefault();
            var error = '';
            if($("#review_form select[name=score_shipping]").val() == "Select"){
                error += 'Shipping Score is required<br />';
            }
            if($("#review_form select[name=score_service]").val() == "Select"){
                error += 'Service Score is required<br />';
            }
            if($("#review_form select[name=score_quality]").val() == "Select"){
                error += 'Quality Score is required<br />';
            }
            if($("#review_form select[name=score_price]").val() == "Select"){
                error += 'Price Score is required<br />';
            }
            if($("#review_form select[name=score_overall]").val() == "Select"){
                error += 'Overall Score is required<br />';
            }
            if($("#review_form textarea[name=body]").val() == "" || $("#review_form textarea[name=body]").val() == "Enter Your Reviews Here, Min 50 Characters"){
                error += 'Comment is required<br />';
            }
            else if($("#review_form textarea[name=body]").val().length < 50){
                error += 'Comment is too short, minimum 50 characters.<br />';
            }
           /* if($("#review_form input[name=captcha]").val().length != 8){
                error += 'Captcha is invalid<br />';
           }    
            else {
                var url = SERVER_DOMAIN+"/reviews/validate_captcha?captcha="+$("#review_form input[name=captcha]").val();
                $.ajax({url: url,
                    success: function(msg){
                        if(msg != '1') {
                            error += 'Captcha does not match<br />';
                        }
                    }, 
                    async: false
                });
            }*/
            
            if(error != ""){
                $('#form_errors').html(error).show();
            } else {    
                $('#form_errors').hide();
            
                $.ajaxSetup({cache:false});
                $.ajax({url:SERVER_DOMAIN+"/auth/is_logged_in", success:function(data) {
                    if(data != 'yes'){
                        $('#ajax_login').center().fadeIn();
                    } else {
                        $('#review_form').submit();
                    }
                 }});
            }
        });
        
        $("#close_login_form").click(function(event) {
            event.preventDefault();
            $('#ajax_login').fadeOut();
        });
        
        
        $('#ajaxLoginLink').click(function(event) {
            event.preventDefault();
            
            var error = '';
            if($("#ajax_form input[name=identity]").val() == ""){
                error += 'Email is required<br />';
            }
            if($("#ajax_form input[name=password]").val() == ""){
                error += 'Password is required<br />';
            }
            
            if(error != ""){
                $('#login_form_errors').html(error).show();
            } else {  
                $('#login_form_errors').hide();
                
                $.post(SERVER_DOMAIN+"/auth/login_ajax", $("#ajax_form").serialize(),
                    function(data) {
                        if(data == 'loggedin') {
                             $('#review_form').submit();
                        } else {
                             $('#login_form_errors').html("Invalid User").show();
                        }
                    }
                );
            }
        });
        
        $('#ajaxRegisterSubmit').click(function(event) {
            event.preventDefault();
            var error = '';

            if($("#ajax_register_form input[name=first_name]").val() == ""){
                error += 'First Name is Required.<br />';
            }
            if($("#ajax_register_form input[name=last_name]").val() == ""){
                error += 'Last Name is Required.<br />';
            }
            if($("#ajax_register_form input[name=email]").val() == ""){
                error += 'Email is Required.<br />';
            }
            if($("#ajax_register_form input[name=password]").val() == ""  || 
               $("#ajax_register_form input[name=password]").val().length < 6){
                error += 'Password is Invalid.<br />';
            }
            if($("#ajax_register_form input[name=password_confirm]").val() == ""  ||
               $("#ajax_register_form input[name=password_confirm]").val().length < 6){
                error += 'Confirm Password is Invalid.<br />';
            }
            if($("#ajax_register_form input[name=password]").val() != 
               $("#ajax_register_form input[name=password_confirm]").val()){
                error += 'Passwords do not match.<br />';
            }
            if(!($("#agree").is(':checked'))){
                error += 'Please agree to terms<br/>';
            }
            
            if(error != ""){
                $('#register_form_errors').html(error).show();
            } else {  
                $('#register_form_errors').hide();
                $.post(SERVER_DOMAIN+"/auth/register_ajax", $("#ajax_register_form").serialize(),
                function(data) {
                    if(data.message == 'registered') {
                        $("#user_id").val(data.user_id);
                        $('#review_form').submit();
                    } else {
                        $('#register_form_errors').html(data.message).show();
                    }
                });
            }
        });
        
        $('#facebook_ajax').click(function(event) {
            event.preventDefault();
            var popup_window = window.open($('#facebook_ajax')[0].href, 'Facebook', 'width=900,height=600,location=no');
            var interval_id = setInterval(function() {check_is_logged_in(popup_window, interval_id);}, 500);          
            return false;
        });
        
        $('#google_ajax').click(function(event) {
            event.preventDefault();
            var popup_window = window.open($('#google_ajax')[0].href, 'Google', 'width=900,height=600,location=no');
            var interval_id = setInterval(function() {check_is_logged_in(popup_window, interval_id);}, 500);
            return false;
        });
       
}

jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - this.outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - this.outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}

function check_is_logged_in(popup, interval_id){
    if(popup == null) {
        $.ajax({url: SERVER_DOMAIN+"/auth/is_logged_in",
            success: function(msg){
                if(msg == 'yes') {
                    $('#review_form').submit();
                    clearInterval(interval_id);
                    window.focus();
                }
            }});
    }
    else if(!popup.closed) {
        $.ajax({url: SERVER_DOMAIN+"/auth/is_logged_in",
            success: function(msg){
                if(msg == 'yes') {
                    popup.close();
                    $('#review_form').submit();
                    clearInterval(interval_id);
                    window.focus();
                }
            }});
    } 
}


