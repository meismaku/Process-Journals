try{Lm.ci={vid:"11303",cookieDomain:".bestbuy.com",refDomain:".bestbuy.com",imgs:[],getRef:function(){return document.referrer;},getLoc:function(){return window.document.location;},PIX:function(h,g,l,k,j,i){i=this.getLoc().protocol.toLowerCase()=="http:"?"cts-log.channelintelligence.com?":"ttwbs.channelintelligence.com?";i+="vid="+this.vid+"&eid="+h+"&tid="+g;if(l!==null){i+="&src="+l;}if(k!==null){i+="&sku="+k;}if(j!==null){i+="&tag="+j;}i+="&ref="+escape(this.getRef());return i;},RQV:function(f,d,g){var g=new RegExp("[\\?&]"+f+"=?([^&#]*)","i").exec(this.getLoc());if(g===null){return(typeof d=="undefined")?null:d;}else{if(g.length<2){return"";}else{return g[1];}}},RCV:function(g,f,i,h){f=document.cookie;i=f.indexOf(g+"=");h="";if(i>-1){h=f.indexOf(";",i+1);h=(h>0)?h:f.length;h=(h>i)?f.substring(i+g.length+1,h):"";}return h;},CC:function CC(g,f,i,h){if(i){h=new Date();h.setTime(h.getTime()+(i*24*60*60*1000));document.cookie=g+"="+f+"; expires="+h.toGMTString()+"; domain="+this.cookieDomain+"; path=/";}else{document.cookie=g+"="+f+"; domain="+this.cookieDomain+"; path=/";}},UID:function UID(f,d,g){d=new Date();g=this.vid+"-"+f+"-"+Math.floor(Math.random()*9999999999)+d.getFullYear().toString()+d.getMonth().toString()+d.getDay().toString()+d.getHours().toString()+d.getMinutes().toString()+d.getSeconds().toString()+d.getMilliseconds().toString();return g;},INIT:function(r,q,p,o,n,m,l,k,j){if(typeof r!="undefined"&&typeof r.catId!="undefined"&&r.catId=="pcat17014"){p=r.orderId;if(typeof p!="undefined"){q="truetag.channelintelligence.com?eid=1&";q=q+"cts=v15&"+"v="+this.vid+"&o="+p;if(this.RCV("ci_cpncode")!=""){q+="&cpncode="+this.RCV("ci_cpncode");}if(this.RCV("ci_tid")!=""){q+="&tid="+this.RCV("ci_tid");}m=(typeof r.skuList!="undefined")?r.skuList.split(","):((typeof r.skuId!="undefined")?r.skuId.split(","):"");l=(typeof r.qtyList!="undefined")?r.qtyList.split(","):[""];k=(typeof r.priceList!="undefined")?r.priceList.split(","):[""];if((l.length<m.length)||(k.length<m.length)){for(j=0;j<m.length;j++){l.push("");k.push("");}}for(p=0;p<m.length;p++){q+="&s="+m[p]+"|"+l[p]+"|"+k[p]+"|";}(typeof r.orderState!="undefined")?q+="&sstate="+r.orderState:"";(typeof r.orderZip!="undefined")?q+="&szip="+r.orderZip:"";if(typeof q!="undefined"){this.SEND(q,"https://");}}}else{if(typeof r!="undefined"&&typeof r.catId=="undefined"||r.catId!="pcat17005"){r=this.RQV("cpncode");p=this.RQV("ci_src");o=this.RQV("ci_sku");n=this.RQV("ci_tag");m=this.UID(o);if(n===null&&p===null&&r===null){l=this.RQV("ref");k=this.RQV("loc");j=this.RQV("AID");if(l==="39"&&j===null){}else{n=((l=="59"&&k!==null)?l+":"+k:l);}}if(r!==null){this.CC("ci_cpncode",r,14);this.CC("ci_src",this.RQV("srccode"),14);this.CC("ci_tid","",-1);}else{if(p!==null&&o!==null){this.CC("ci_cpncode","",-1);this.CC("ci_tid",m,14);this.CC("ci_src",p,14);q=this.PIX(23,m,p,o,null);}else{if(n!==null){this.CC("ci_cpncode","",-1);this.CC("ci_tid",m,14);this.CC("ci_tag",n,14);q=this.PIX(7,m,null,null,n);}else{if(this.getRef().toLowerCase().indexOf(this.refDomain)===-1&&this.getRef()!==""){q=this.PIX(13,null,null,null,null);}}}}p=this.RQV("st");if(p!==null&&p.indexOf("processingtime")===-1){this.SEND("truetag.channelintelligence.com?eid=32&v="+this.vid+"&search="+p,"http://");}if(typeof q!="undefined"){this.SEND(q);}}}},SEND:function(f,d,g){g=new Image();g.src=(typeof d=="undefined"?(this.getLoc().protocol.toLowerCase()=="http:"?"http://":"https://"):d)+f;}};Lm.LOAD("ci");}catch(e){}