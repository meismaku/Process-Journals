/* UI BUILD: Wednesday, Mar 20 2013 at 12:34:23 PM */
/* MD5: 98802e55c6006a7adefe30f986d2c5c2 */

// CTG For List Item
$(document).ready(function(){	
	CTG_list = new CTG.Track();
	CTG_list.setPagename("ListPage");
	CTG_list.setDebug();
	CTG_list.ttype = 'MKTPL';
	$('#listView').find('.hproduct').each(function(i){
		if($(this).find('.seller').length > 0)
		{
			CTG_list.elementBind($(this),'.seller a',trackListItems('SellerName')); // Page 1 - Item 1
			CTG_list.elementBind($(this),'.info-main h3 a',trackListItems('ItemName')); // Page 1 - Item 2
			CTG_list.elementBind($(this),'.info-side h5 a',trackListItems('SellerLink')); // Page 1 - Item 4
			CTG_list.elementBind($(this),'.image-col a img',trackListItems('ItemImage'));
			CTG_list.elementBind($(this),'.bdt-addToCart',trackListItems('AddToCart'));
		}
	});
});

function trackListItems(tagDesc) {
	return function () {
		var itemsku = $(this).parents('.hproduct').attr('id');
		CTG_list.link_type = 'ListItem' + '_' + itemsku;
		CTG_list.link_header = tagDesc;
		CTG_list.imageLink($(this));	
		CTG_list.sendTrackingData();
	};
}