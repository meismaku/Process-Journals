/* UI BUILD: Thursday, May 16 2013 at  1:15:23 PM -- BUILD ID: BRANCH_NAME: release VERSION: 13.09.93 */
/* MD5: d2c6dadd2d616f2adce4c8a7bdad8b47 */

bby.requires('bby.ui.lightbox', function () {
	// Promotional message/Financing/Reward Zone Certificate links	
	$(document).on("click", "a.view-tbp", fsdiLightBox);

	// Close light box button
	if (typeof trackEvent !== 'undefined') {
		$(document).on('click', '.cboxClose', fsdiLightBoxClose);
	}
});

function fsdiLightBoxClose(event) {
			var u = track.uberCatName !== null ? track.uberCatName + ": " : '',
				p = track.parentCatName !== null ? track.parentCatName + ": " : '',
				c = track.catName !== null ? track.catName + ": " : '',
				page = u + p + c;
			trackEvent.event("event.link", {
				page: page,
			    clickAction: "fsdi: close"
			});
		}

function fsdiLightBox() {
		var lightBoxTitle = 'BEST BUY&reg; CREDIT CARD &amp; REWARD ZONE&reg; CREDIT CARD OFFERS';
		
		bby.ui.lightbox.create({
			prefix: 'fsdi-cc',
			css: {
				height: "550px",
				width: "745px"
			},
			title: lightBoxTitle,
			reuseWindow: false
		}, '<iframe id="fsdi-cc" width="745" height="515" src="' + this + '"></iframe>');

		bby.ui.lightbox.show({
			prefix: 'fsdi-cc'
		});
		
		// Create page for light box
		if (typeof trackEvent !== 'undefined') {
			var u = track.uberCatName !== null ? track.uberCatName + ": " : '',
				p = track.parentCatName !== null ? track.parentCatName + ": " : '',
				c = track.catName !== null ? track.catName + ": " : '',
				page = u + p + c,
				a = $(this),
				tab = a.data('active'),
				linkText = $.trim(a.text()).replace(/[;:,!\|\(\)]/g, "-"),
				listItemIndex = a.parents('li').index() + 1; // 1-based
			
			trackEvent.event("event.view", {
				page: page + "fsdi: ",
				productTab: (page + "fsdi: accessories: " + tab + ": " + listItemIndex),
				d_uberCat: track.uberCatName,
				d_category: track.d_category,
				templateName: lightBoxTitle,
				clickAction: track.d_category + ": fsdi: launch: " + linkText,
				prevPage: track.page
			});
		}
		return false;
	}