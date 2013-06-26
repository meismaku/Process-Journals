/* UI BUILD: Thursday, May 16 2013 at  1:15:23 PM -- BUILD ID: BRANCH_NAME: release VERSION: 13.09.93 */
/* MD5: 2d837627d6c501534154f795e3424a57 */

$(document).ready(function(){var t=$(".help-tip");$(".bby-tipper").each(function(e){$.exists(t[e])&&$.trim($(t[e]).find(".css-content").text())>""&&new bby.infrastructure.widgets.tooltip.anchorTip(this,t[e]).hoverAnchor().below()})});