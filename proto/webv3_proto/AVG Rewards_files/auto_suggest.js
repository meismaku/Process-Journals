/* ******************************
 * initialize global variables
 */
function autoSuggestControl(textbox) {
    this.cur = -1;
    this.layer = null;
    this.textbox = textbox;
    this.usertext = textbox.value; 
    this.timeoutId = null;
    this.jsonRequest = null;
    this.init();
    this.dropdown_highlighted = false;
}

/***********************************
 * if there are suggestions show drop down menu
 */
autoSuggestControl.prototype.autosuggest = function (suggestions) {
    this.cur = -1;
    
    if(suggestions.words.length > 0) {
        this.showSuggestions(suggestions);
    } else {
        this.hideSuggestions();
    }
    
};

/****************************************************
 * Handle keyup event when user type something into search field
 */
autoSuggestControl.prototype.handleKeyUp = function (event) {
    var keyCode = event.keyCode;
    var objThis = this;
    
    this.usertext = this.textbox.value;
    
    clearTimeout(this.timeoutId);
    
    if(keyCode == 8 || keyCode == 46) {
        this.timeoutId = setTimeout( function() {
            objThis.requestSuggestions();
        }, 250);
    } 
    else if((keyCode != 16 && keyCode < 32) || (22 <= keyCode && keyCode <= 46) || (112 <= keyCode && keyCode <= 123)) {
        // Do nothing
    } 
    else {
        this.timeoutId = setTimeout( function() {
            objThis.requestSuggestions();
        }, 250);
    }
};

/*************************************************
 * attach eventhandles
 */
autoSuggestControl.prototype.init = function() {
    var objThis = this;
    $(this.textbox).keyup(function(event) {
        objThis.handleKeyUp(event);
    });
    
    $(this.textbox).keydown(function(event) {
        objThis.handleKeyDown(event); 
    });
    
    $(this.textbox).blur( function() {
        objThis.hideSuggestions();
    });
    
    this.createDropDown();
};

/**********************************************
 * hide suggestion drop down menu
 */
autoSuggestControl.prototype.hideSuggestions = function() {
    this.layer.style.visibility = "hidden";
}

/**************************************************
 * highlight word in dropdown menu when user use the up/down key
 */
autoSuggestControl.prototype.highlightSuggestion = function(suggestionNode) {
    for(var i=0; i<this.layer.childNodes.length; i++) {
        var node = this.layer.childNodes[i];
        
        if(node == suggestionNode) {
            node.className = "current";
        } else if (node.className == "current") {
            node.className = "";
        }
    }
    this.dropdown_highlighted = true;
};

/**********************************************
 * init the dropdown menu structure and attach mouse eventhandlers
 */
autoSuggestControl.prototype.createDropDown = function() {
    this.layer = document.createElement("div");
    this.layer.className = "suggestions";
    this.layer.style.width = this.textbox.offsetWidth + "px";
    this.layer.style.visibility = "hidden";
    document.body.appendChild(this.layer);
  
    var objThis = this;
    
    $(this.layer).mousedown(function(event) {
        objThis.textbox.value = event.target.innerHTML;
        objThis.hideSuggestions();
    });
    
    $(this.layer).mouseover(function(event) {
        objThis.highlightSuggestion(event.target);
    });
    
    $(this.layer).mouseup(function() {
        objThis.textbox.focus();
    });
};

/*************************************
 * get left coordinate of the search textbox
 * - suggestion drop down menu position will be set relative to this coordinate
 */
autoSuggestControl.prototype.getLeft = function() {
    var node = this.textbox;
    var left = 0;
    
    while(node != document.body) {
        left += node.offsetLeft;
        node = node.offsetParent;
    }
    return left;
};

/*************************************
 * get top coordinate of the search textbox
 * - suggestion drop down menu position will be set relative to this corrdinate
 */
autoSuggestControl.prototype.getTop = function() {
    var node = this.textbox;
    var top = 0;
    
    while(node != document.body) {
        top += node.offsetTop;
        node = node.offsetParent;
    }
    
    return top;
};


/********************************************
 * create suggest word list and display drop-down menu
 */
autoSuggestControl.prototype.showSuggestions = function(suggestions) {
    var div = null;
    this.layer.innerHTML = "";
    
    for(var i=0; i<suggestions.words.length; i++) {
        div = document.createElement("div");
        div.appendChild(document.createTextNode(suggestions.words[i].word));
        this.layer.appendChild(div);
    }
    
    this.layer.style.left = this.getLeft() + "px";
    this.layer.style.top = (this.getTop()+this.textbox.offsetHeight) + "px";
    this.layer.style.visibility = "visible";
};


/*********************************************
 * highlight the selected word in drop-down menu 
 * and display it in search textbox
 */
autoSuggestControl.prototype.goToSuggestion = function(diff) {
    var suggestionNodes = this.layer.childNodes;
    
    if(suggestionNodes.length > 0) {
        var node = null;
        
        if(diff > 0) {
            if(this.cur < suggestionNodes.length-1) {
                node = suggestionNodes[++this.cur];
            }
        }
        else {
            if(this.cur > 0) {
                node = suggestionNodes[--this.cur];
            }
       }    
  
        
        if(node) {
            this.highlightSuggestion(node);
            this.textbox.value = node.innerHTML;
        }      
    }
};

/**************************************************
 * handle up/down arrow key event
 */
autoSuggestControl.prototype.handleKeyDown = function(event) {
    switch(event.keyCode) {
        case 38: // up arrow
            this.goToSuggestion(-1);
            if(event.preventDefault()) {
                event.preventDefault();
            }
            break;
        case 40: // down arrow
            this.goToSuggestion(1);
            if(event.preventDefault()) {
                event.preventDefault();
            }
            break;
        case 27: // esc
            this.textbox.value = this.usertext;
            this.hideSuggestions();
            break;
        case 13: //enter
            if(this.dropdown_highlighted == true) {
                event.preventDefault();
            }
            this.hideSuggestions();
            this.dropdown_highlighted = false;
            event.returnValue = false;

            break;          
    }
};

/************************************************
 * call php script to get list of suggest words
 * according to what is entered in the search textbox
 */
autoSuggestControl.prototype.requestSuggestions = function() {
    if(this.jsonRequest != null && this.jsonRequest.readyState != 0) {
        this.jsonRequest.abort();
    }
    
    var objThis = this;
    var data = this.usertext;
    
    if(data.length > 0) {
        var url = SERVER_DOMAIN+"/search/suggestions?data="+data;
        this.jsonRequest = $.getJSON(url, function(responseText) {
            
            objThis.autosuggest(responseText);
        
        });
    }
};


