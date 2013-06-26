/* UI BUILD: Thursday, May 16 2013 at  1:15:23 PM -- BUILD ID: BRANCH_NAME: release VERSION: 13.09.93 */
/* MD5: b7e3d0ca5a6c2222ab7627db86b7590d */

/* BUILT FROM: "src/projects/commerce/scripts/dev/projects/cart/pages/olsbrowse-search.js" */


var trackHaccs = {},
	addToCartTracker;
$(function(){
    var serviceFactory = new bby.cart.model.services.factory(document.frmSearchCompare.action,
															 "/site/olspage.jsp",
															 "/site/olspage.jsp"),
        addToCartDecorator = new bby.cart.model.decorators.shopping.fromList(document.frmSearchCompare),
        listAccessoriesDecorator = new bby.cart.model.decorators.shopAccessories(),
		viewPriceDecorator = new bby.cart.model.decorators.viewPrice(),
        modelState = new bby.cart.model.workflow.states.shopping(),
        model = new bby.cart.model.workflow.salesFlow(serviceFactory,
                                                addToCartDecorator,
                                                listAccessoriesDecorator,
												viewPriceDecorator,
                                                modelState,
                                                "/site/olspage.jsp?id=pcat17005&type=page&pageId=pcmcat174700050005&pageType=category&_DARGS=/site/en_US/global/nav/olsminicart.jsp_A&_DAV="),
        accessoriesView = new bby.cart.views.accessories(),
        viewPriceView = new bby.cart.views.viewPrice(),
        viewState = new bby.cart.views.states.shopping(),
        view = new bby.cart.views.salesFlow(model,
                                            viewState,
                                            accessoriesView,
											viewPriceView);

    bbyCartController = new bby.cart.controllers.salesFlow(model, view);

    var trackObjects = new  bby.cart.analytics.trackObjects(),
        trackEvt = new bby.cart.analytics.trackEvent(),
		haccsTracker = new bby.cart.analytics.trackers.lightbox.trackers.haccs(trackEvt, trackObjects, model),
		mapTracker = new bby.cart.analytics.trackers.lightbox.trackers.map(trackEvt, trackObjects, model),
		icrTracker = new bby.cart.analytics.trackers.lightbox.trackers.icr(trackEvt, trackObjects, model),
		trackingState = new bby.cart.analytics.trackers.lightbox.states.shopping();

	new bby.cart.analytics.trackers.lightbox.tracker(haccsTracker, mapTracker, icrTracker, model, trackingState);
	new bby.cart.analytics.trackers.cnet(trackEvt, trackObjects, model);
});
function trackGoToCart(){ bbyCartController.goToCart(); }
