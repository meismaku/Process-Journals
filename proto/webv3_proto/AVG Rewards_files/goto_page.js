    function gotopage() {
        $(".gotopage").click(function(event){
            event.preventDefault();
            var currentLocation = window.location.href;
            var kind = $(this).attr('kind');
            
            if(kind == null) {
                var pagenum = $("#gotopagenum").val();
            } else {
                if(kind == 'deals') {
                    var pagenum = $("#gotopagenumdeals").val();
                } else if(kind == 'merchants') {
                    var pagenum = $("#gotopagenummerchants").val();
                }
            }
              
            var lastpage = parseInt($(this).attr('lastpage'));
            
            if(1 <= pagenum && pagenum <= lastpage) {
                if(window.location.href.indexOf("search_results") > -1) {
                    if(window.location.hash) {
                        var hash_array = String(window.location.hash).substring(1).split("-");
                        
                        if(hash_array[0].substring(0, 1) == "m") {
                            if(kind == 'deals') {
                                split_deal_hash = String(hash_array[1]).split("/");
                                window.location.hash = "#"+hash_array[0]+"-"+hash_array[1].substring(0,2)+pagenum+"/"+split_deal_hash[1];
                            } else {
                                split_deal_hash = String(hash_array[0]).split("/");
                                window.location.hash = "#"+hash_array[0].substring(0,2)+pagenum+"/"+split_deal_hash[1]+"-"+hash_array[1];
                            }
                        } else {
                            if(kind == 'merchants') {
                                split_deal_hash = String(hash_array[1]).split("/");
                                window.location.hash = "#"+hash_array[0]+"-"+hash_array[1].substring(0,2)+pagenum+"/"+split_deal_hash[1];
                            } else {
                                split_deal_hash = String(hash_array[0]).split("/");
                                window.location.hash = "#"+hash_array[0].substring(0,2)+pagenum+"/"+split_deal_hash[1]+"-"+hash_array[1];
                            }
                        } 
                    } else {
                        if(kind == 'deals') {
                            window.location.hash = "#mr1/0-dr"+pagenum+"/0";
                        } else {
                            window.location.hash = "#dr1/0-mr"+pagenum+"/0";
                        }
                    }
                } else {
                    var splitLocation = currentLocation.split("&per_page=");
                    window.location = splitLocation[0]+"&per_page="+(pagenum-1)*10;
                }
            } else {
                alert("Invalid page, enter page in the range of 1 to "+lastpage);
            }
        });
    }

