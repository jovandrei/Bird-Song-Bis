/*
 * FancyBox - jQuery Plugin
 * Simple and fancy lightbox alternative
 *
 * Examples and documentation at: http://fancybox.net
 *
 * Copyright (c) 2008 - 2010 Janis Skarnelis
 * That said, it is hardly a one-person project. Many people have submitted bugs, code, and offered their advice freely. Their support is greatly appreciated.
 *
 * Version: 1.3.4 (11/11/2010)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

;(function($) {
	var tmp, loading, overlay, wrap, outer, content, close, title, nav_left, nav_right,

		selectedIndex = 0, selectedOpts = {}, selectedArray = [], currentIndex = 0, currentOpts = {}, currentArray = [],

		ajaxLoader = null, imgPreloader = new Image(), imgRegExp = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i, swfRegExp = /[^\.]\.(swf)\s*$/i,

		loadingTimer, loadingFrame = 1,

		titleHeight = 0, titleStr = '', start_pos, final_pos, busy = false, fx = $.extend($('<div/>')[0], { prop: 0 }),

		isIE6 = $.browser.msie && $.browser.version < 7 && !window.XMLHttpRequest,

		/*
		 * Private methods 
		 */

		_abort = function() {
			loading.hide();

			imgPreloader.onerror = imgPreloader.onload = null;

			if (ajaxLoader) {
				ajaxLoader.abort();
			}

			tmp.empty();
		},

		_error = function() {
			if (false === selectedOpts.onError(selectedArray, selectedIndex, selectedOpts)) {
				loading.hide();
				busy = false;
				return;
			}

			selectedOpts.titleShow = false;

			selectedOpts.width = 'auto';
			selectedOpts.height = 'auto';

			tmp.html( '<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>' );

			_process_inline();
		},

		_start = function() {
			var obj = selectedArray[ selectedIndex ],
				href, 
				type, 
				title,
				str,
				emb,
				ret;

			_abort();

			selectedOpts = $.extend({}, $.fn.fancybox.defaults, (typeof $(obj).data('fancybox') == 'undefined' ? selectedOpts : $(obj).data('fancybox')));

			ret = selectedOpts.onStart(selectedArray, selectedIndex, selectedOpts);

			if (ret === false) {
				busy = false;
				return;
			} else if (typeof ret == 'object') {
				selectedOpts = $.extend(selectedOpts, ret);
			}

			title = selectedOpts.title || (obj.nodeName ? $(obj).attr('title') : obj.title) || '';

			if (obj.nodeName && !selectedOpts.orig) {
				selectedOpts.orig = $(obj).children("img:first").length ? $(obj).children("img:first") : $(obj);
			}

			if (title === '' && selectedOpts.orig && selectedOpts.titleFromAlt) {
				title = selectedOpts.orig.attr('alt');
			}

			href = selectedOpts.href || (obj.nodeName ? $(obj).attr('href') : obj.href) || null;

			if ((/^(?:javascript)/i).test(href) || href == '#') {
				href = null;
			}

			if (selectedOpts.type) {
				type = selectedOpts.type;

				if (!href) {
					href = selectedOpts.content;
				}

			} else if (selectedOpts.content) {
				type = 'html';

			} else if (href) {
				if (href.match(imgRegExp)) {
					type = 'image';

				} else if (href.match(swfRegExp)) {
					type = 'swf';

				} else if ($(obj).hasClass("iframe")) {
					type = 'iframe';

				} else if (href.indexOf("#") === 0) {
					type = 'inline';

				} else {
					type = 'ajax';
				}
			}

			if (!type) {
				_error();
				return;
			}

			if (type == 'inline') {
				obj	= href.substr(href.indexOf("#"));
				type = $(obj).length > 0 ? 'inline' : 'ajax';
			}

			selectedOpts.type = type;
			selectedOpts.href = href;
			selectedOpts.title = title;

			if (selectedOpts.autoDimensions) {
				if (selectedOpts.type == 'html' || selectedOpts.type == 'inline' || selectedOpts.type == 'ajax') {
					selectedOpts.width = 'auto';
					selectedOpts.height = 'auto';
				} else {
					selectedOpts.autoDimensions = false;	
				}
			}

			if (selectedOpts.modal) {
				selectedOpts.overlayShow = true;
				selectedOpts.hideOnOverlayClick = false;
				selectedOpts.hideOnContentClick = false;
				selectedOpts.enableEscapeButton = false;
				selectedOpts.showCloseButton = false;
			}

			selectedOpts.padding = parseInt(selectedOpts.padding, 10);
			selectedOpts.margin = parseInt(selectedOpts.margin, 10);

			tmp.css('padding', (selectedOpts.padding + selectedOpts.margin));

			$('.fancybox-inline-tmp').unbind('fancybox-cancel').bind('fancybox-change', function() {
				$(this).replaceWith(content.children());				
			});

			switch (type) {
				case 'html' :
					tmp.html( selectedOpts.content );
					_process_inline();
				break;

				case 'inline' :
					if ( $(obj).parent().is('#fancybox-content') === true) {
						busy = false;
						return;
					}

					$('<div class="fancybox-inline-tmp" />')
						.hide()
						.insertBefore( $(obj) )
						.bind('fancybox-cleanup', function() {
							$(this).replaceWith(content.children());
						}).bind('fancybox-cancel', function() {
							$(this).replaceWith(tmp.children());
						});

					$(obj).appendTo(tmp);

					_process_inline();
				break;

				case 'image':
					busy = false;

					$.fancybox.showActivity();

					imgPreloader = new Image();

					imgPreloader.onerror = function() {
						_error();
					};

					imgPreloader.onload = function() {
						busy = true;

						imgPreloader.onerror = imgPreloader.onload = null;

						_process_image();
					};

					imgPreloader.src = href;
				break;

				case 'swf':
					selectedOpts.scrolling = 'no';

					str = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + selectedOpts.width + '" height="' + selectedOpts.height + '"><param name="movie" value="' + href + '"></param>';
					emb = '';

					$.each(selectedOpts.swf, function(name, val) {
						str += '<param name="' + name + '" value="' + val + '"></param>';
						emb += ' ' + name + '="' + val + '"';
					});

					str += '<embed src="' + href + '" type="application/x-shockwave-flash" width="' + selectedOpts.width + '" height="' + selectedOpts.height + '"' + emb + '></embed></object>';

					tmp.html(str);

					_process_inline();
				break;

				case 'ajax':
					busy = false;

					$.fancybox.showActivity();

					selectedOpts.ajax.win = selectedOpts.ajax.success;

					ajaxLoader = $.ajax($.extend({}, selectedOpts.ajax, {
						url	: href,
						data : selectedOpts.ajax.data || {},
						error : function(XMLHttpRequest, textStatus, errorThrown) {
							if ( XMLHttpRequest.status > 0 ) {
								_error();
							}
						},
						success : function(data, textStatus, XMLHttpRequest) {
							var o = typeof XMLHttpRequest == 'object' ? XMLHttpRequest : ajaxLoader;
							if (o.status == 200) {
								if ( typeof selectedOpts.ajax.win == 'function' ) {
									ret = selectedOpts.ajax.win(href, data, textStatus, XMLHttpRequest);

									if (ret === false) {
										loading.hide();
										return;
									} else if (typeof ret == 'string' || typeof ret == 'object') {
										data = ret;
									}
								}

								tmp.html( data );
								_process_inline();
							}
						}
					}));

				break;

				case 'iframe':
					_show();
				break;
			}
		},

		_process_inline = function() {
			var
				w = selectedOpts.width,
				h = selectedOpts.height;

			if (w.toString().indexOf('%') > -1) {
				w = parseInt( ($(window).width() - (selectedOpts.margin * 2)) * parseFloat(w) / 100, 10) + 'px';

			} else {
				w = w == 'auto' ? 'auto' : w + 'px';	
			}

			if (h.toString().indexOf('%') > -1) {
				h = parseInt( ($(window).height() - (selectedOpts.margin * 2)) * parseFloat(h) / 100, 10) + 'px';

			} else {
				h = h == 'auto' ? 'auto' : h + 'px';	
			}

			tmp.wrapInner('<div style="width:' + w + ';height:' + h + ';overflow: ' + (selectedOpts.scrolling == 'auto' ? 'auto' : (selectedOpts.scrolling == 'yes' ? 'scroll' : 'hidden')) + ';position:relative;"></div>');

			selectedOpts.width = tmp.width();
			selectedOpts.height = tmp.height();

			_show();
		},

		_process_image = function() {
			selectedOpts.width = imgPreloader.width;
			selectedOpts.height = imgPreloader.height;

			$("<img />").attr({
				'id' : 'fancybox-img',
				'src' : imgPreloader.src,
				'alt' : selectedOpts.title
			}).appendTo( tmp );

			_show();
		},

		_show = function() {
			var pos, equal;

			loading.hide();

			if (wrap.is(":visible") && false === currentOpts.onCleanup(currentArray, currentIndex, currentOpts)) {
				$.event.trigger('fancybox-cancel');

				busy = false;
				return;
			}

			busy = true;

			$(content.add( overlay )).unbind();

			$(window).unbind("resize.fb scroll.fb");
			$(document).unbind('keydown.fb');

			if (wrap.is(":visible") && currentOpts.titlePosition !== 'outside') {
				wrap.css('height', wrap.height());
			}

			currentArray = selectedArray;
			currentIndex = selectedIndex;
			currentOpts = selectedOpts;

			if (currentOpts.overlayShow) {
				overlay.css({
					'background-color' : currentOpts.overlayColor,
					'opacity' : currentOpts.overlayOpacity,
					'cursor' : currentOpts.hideOnOverlayClick ? 'pointer' : 'auto',
					'height' : $(document).height()
				});

				if (!overlay.is(':visible')) {
					if (isIE6) {
						$('select:not(#fancybox-tmp select)').filter(function() {
							return this.style.visibility !== 'hidden';
						}).css({'visibility' : 'hidden'}).one('fancybox-cleanup', function() {
							this.style.visibility = 'inherit';
						});
					}

					overlay.show();
				}
			} else {
				overlay.hide();
			}

			final_pos = _get_zoom_to();

			_process_title();

			if (wrap.is(":visible")) {
				$( close.add( nav_left ).add( nav_right ) ).hide();

				pos = wrap.position(),

				start_pos = {
					top	 : pos.top,
					left : pos.left,
					width : wrap.width(),
					height : wrap.height()
				};

				equal = (start_pos.width == final_pos.width && start_pos.height == final_pos.height);

				content.fadeTo(currentOpts.changeFade, 0.3, function() {
					var finish_resizing = function() {
						content.html( tmp.contents() ).fadeTo(currentOpts.changeFade, 1, _finish);
					};

					$.event.trigger('fancybox-change');

					content
						.empty()
						.removeAttr('filter')
						.css({
							'border-width' : currentOpts.padding,
							'width'	: final_pos.width - currentOpts.padding * 2,
							'height' : selectedOpts.autoDimensions ? 'auto' : final_pos.height - titleHeight - currentOpts.padding * 2
						});

					if (equal) {
						finish_resizing();

					} else {
						fx.prop = 0;

						$(fx).animate({prop: 1}, {
							 duration : currentOpts.changeSpeed,
							 easing : currentOpts.easingChange,
							 step : _draw,
							 complete : finish_resizing
						});
					}
				});

				return;
			}

			wrap.removeAttr("style");

			content.css('border-width', currentOpts.padding);

			if (currentOpts.transitionIn == 'elastic') {
				start_pos = _get_zoom_from();

				content.html( tmp.contents() );

				wrap.show();

				if (currentOpts.opacity) {
					final_pos.opacity = 0;
				}

				fx.prop = 0;

				$(fx).animate({prop: 1}, {
					 duration : currentOpts.speedIn,
					 easing : currentOpts.easingIn,
					 step : _draw,
					 complete : _finish
				});

				return;
			}

			if (currentOpts.titlePosition == 'inside' && titleHeight > 0) {	
				title.show();	
			}

			content
				.css({
					'width' : final_pos.width - currentOpts.padding * 2,
					'height' : selectedOpts.autoDimensions ? 'auto' : final_pos.height - titleHeight - currentOpts.padding * 2
				})
				.html( tmp.contents() );

			wrap
				.css(final_pos)
				.fadeIn( currentOpts.transitionIn == 'none' ? 0 : currentOpts.speedIn, _finish );
		},

		_format_title = function(title) {
			if (title && title.length) {
				if (currentOpts.titlePosition == 'float') {
					return '<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">' + title + '</td><td id="fancybox-title-float-right"></td></tr></table>';
				}

				return '<div id="fancybox-title-' + currentOpts.titlePosition + '">' + title + '</div>';
			}

			return false;
		},

		_process_title = function() {
			titleStr = currentOpts.title || '';
			titleHeight = 0;

			title
				.empty()
				.removeAttr('style')
				.removeClass();

			if (currentOpts.titleShow === false) {
				title.hide();
				return;
			}

			titleStr = $.isFunction(currentOpts.titleFormat) ? currentOpts.titleFormat(titleStr, currentArray, currentIndex, currentOpts) : _format_title(titleStr);

			if (!titleStr || titleStr === '') {
				title.hide();
				return;
			}

			title
				.addClass('fancybox-title-' + currentOpts.titlePosition)
				.html( titleStr )
				.appendTo( 'body' )
				.show();

			switch (currentOpts.titlePosition) {
				case 'inside':
					title
						.css({
							'width' : final_pos.width - (currentOpts.padding * 2),
							'marginLeft' : currentOpts.padding,
							'marginRight' : currentOpts.padding
						});

					titleHeight = title.outerHeight(true);

					title.appendTo( outer );

					final_pos.height += titleHeight;
				break;

				case 'over':
					title
						.css({
							'marginLeft' : currentOpts.padding,
							'width'	: final_pos.width - (currentOpts.padding * 2),
							'bottom' : currentOpts.padding
						})
						.appendTo( outer );
				break;

				case 'float':
					title
						.css('left', parseInt((title.width() - final_pos.width - 40)/ 2, 10) * -1)
						.appendTo( wrap );
				break;

				default:
					title
						.css({
							'width' : final_pos.width - (currentOpts.padding * 2),
							'paddingLeft' : currentOpts.padding,
							'paddingRight' : currentOpts.padding
						})
						.appendTo( wrap );
				break;
			}

			title.hide();
		},

		_set_navigation = function() {
			if (currentOpts.enableEscapeButton || currentOpts.enableKeyboardNav) {
				$(document).bind('keydown.fb', function(e) {
					if (e.keyCode == 27 && currentOpts.enableEscapeButton) {
						e.preventDefault();
						$.fancybox.close();

					} else if ((e.keyCode == 37 || e.keyCode == 39) && currentOpts.enableKeyboardNav && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'SELECT') {
						e.preventDefault();
						$.fancybox[ e.keyCode == 37 ? 'prev' : 'next']();
					}
				});
			}

			if (!currentOpts.showNavArrows) { 
				nav_left.hide();
				nav_right.hide();
				return;
			}

			if ((currentOpts.cyclic && currentArray.length > 1) || currentIndex !== 0) {
				nav_left.show();
			}

			if ((currentOpts.cyclic && currentArray.length > 1) || currentIndex != (currentArray.length -1)) {
				nav_right.show();
			}
		},

		_finish = function () {
			if (!$.support.opacity) {
				content.get(0).style.removeAttribute('filter');
				wrap.get(0).style.removeAttribute('filter');
			}

			if (selectedOpts.autoDimensions) {
				content.css('height', 'auto');
			}

			wrap.css('height', 'auto');

			if (titleStr && titleStr.length) {
				title.show();
			}

			if (currentOpts.showCloseButton) {
				close.show();
			}

			_set_navigation();
	
			if (currentOpts.hideOnContentClick)	{
				content.bind('click', $.fancybox.close);
			}

			if (currentOpts.hideOnOverlayClick)	{
				overlay.bind('click', $.fancybox.close);
			}

			$(window).bind("resize.fb", $.fancybox.resize);

			if (currentOpts.centerOnScroll) {
				$(window).bind("scroll.fb", $.fancybox.center);
			}

			if (currentOpts.type == 'iframe') {
				$('<iframe id="fancybox-frame" name="fancybox-frame' + new Date().getTime() + '" frameborder="0" hspace="0" ' + ($.browser.msie ? 'allowtransparency="true""' : '') + ' scrolling="' + selectedOpts.scrolling + '" src="' + currentOpts.href + '"></iframe>').appendTo(content);
			}

			wrap.show();

			busy = false;

			$.fancybox.center();

			currentOpts.onComplete(currentArray, currentIndex, currentOpts);

			_preload_images();
		},

		_preload_images = function() {
			var href, 
				objNext;

			if ((currentArray.length -1) > currentIndex) {
				href = currentArray[ currentIndex + 1 ].href;

				if (typeof href !== 'undefined' && href.match(imgRegExp)) {
					objNext = new Image();
					objNext.src = href;
				}
			}

			if (currentIndex > 0) {
				href = currentArray[ currentIndex - 1 ].href;

				if (typeof href !== 'undefined' && href.match(imgRegExp)) {
					objNext = new Image();
					objNext.src = href;
				}
			}
		},

		_draw = function(pos) {
			var dim = {
				width : parseInt(start_pos.width + (final_pos.width - start_pos.width) * pos, 10),
				height : parseInt(start_pos.height + (final_pos.height - start_pos.height) * pos, 10),

				top : parseInt(start_pos.top + (final_pos.top - start_pos.top) * pos, 10),
				left : parseInt(start_pos.left + (final_pos.left - start_pos.left) * pos, 10)
			};

			if (typeof final_pos.opacity !== 'undefined') {
				dim.opacity = pos < 0.5 ? 0.5 : pos;
			}

			wrap.css(dim);

			content.css({
				'width' : dim.width - currentOpts.padding * 2,
				'height' : dim.height - (titleHeight * pos) - currentOpts.padding * 2
			});
		},

		_get_viewport = function() {
			return [
				$(window).width() - (currentOpts.margin * 2),
				$(window).height() - (currentOpts.margin * 2),
				$(document).scrollLeft() + currentOpts.margin,
				$(document).scrollTop() + currentOpts.margin
			];
		},

		_get_zoom_to = function () {
			var view = _get_viewport(),
				to = {},
				resize = currentOpts.autoScale,
				double_padding = currentOpts.padding * 2,
				ratio;

			if (currentOpts.width.toString().indexOf('%') > -1) {
				to.width = parseInt((view[0] * parseFloat(currentOpts.width)) / 100, 10);
			} else {
				to.width = currentOpts.width + double_padding;
			}

			if (currentOpts.height.toString().indexOf('%') > -1) {
				to.height = parseInt((view[1] * parseFloat(currentOpts.height)) / 100, 10);
			} else {
				to.height = currentOpts.height + double_padding;
			}

			if (resize && (to.width > view[0] || to.height > view[1])) {
				if (selectedOpts.type == 'image' || selectedOpts.type == 'swf') {
					ratio = (currentOpts.width ) / (currentOpts.height );

					if ((to.width ) > view[0]) {
						to.width = view[0];
						to.height = parseInt(((to.width - double_padding) / ratio) + double_padding, 10);
					}

					if ((to.height) > view[1]) {
						to.height = view[1];
						to.width = parseInt(((to.height - double_padding) * ratio) + double_padding, 10);
					}

				} else {
					to.width = Math.min(to.width, view[0]);
					to.height = Math.min(to.height, view[1]);
				}
			}

			to.top = parseInt(Math.max(view[3] - 20, view[3] + ((view[1] - to.height - 40) * 0.5)), 10);
			to.left = parseInt(Math.max(view[2] - 20, view[2] + ((view[0] - to.width - 40) * 0.5)), 10);

			return to;
		},

		_get_obj_pos = function(obj) {
			var pos = obj.offset();

			pos.top += parseInt( obj.css('paddingTop'), 10 ) || 0;
			pos.left += parseInt( obj.css('paddingLeft'), 10 ) || 0;

			pos.top += parseInt( obj.css('border-top-width'), 10 ) || 0;
			pos.left += parseInt( obj.css('border-left-width'), 10 ) || 0;

			pos.width = obj.width();
			pos.height = obj.height();

			return pos;
		},

		_get_zoom_from = function() {
			var orig = selectedOpts.orig ? $(selectedOpts.orig) : false,
				from = {},
				pos,
				view;

			if (orig && orig.length) {
				pos = _get_obj_pos(orig);

				from = {
					width : pos.width + (currentOpts.padding * 2),
					height : pos.height + (currentOpts.padding * 2),
					top	: pos.top - currentOpts.padding - 20,
					left : pos.left - currentOpts.padding - 20
				};

			} else {
				view = _get_viewport();

				from = {
					width : currentOpts.padding * 2,
					height : currentOpts.padding * 2,
					top	: parseInt(view[3] + view[1] * 0.5, 10),
					left : parseInt(view[2] + view[0] * 0.5, 10)
				};
			}

			return from;
		},

		_animate_loading = function() {
			if (!loading.is(':visible')){
				clearInterval(loadingTimer);
				return;
			}

			$('div', loading).css('top', (loadingFrame * -40) + 'px');

			loadingFrame = (loadingFrame + 1) % 12;
		};

	/*
	 * Public methods 
	 */

	$.fn.fancybox = function(options) {
		if (!$(this).length) {
			return this;
		}

		$(this)
			.data('fancybox', $.extend({}, options, ($.metadata ? $(this).metadata() : {})))
			.unbind('click.fb')
			.bind('click.fb', function(e) {
				e.preventDefault();

				if (busy) {
					return;
				}

				busy = true;

				$(this).blur();

				selectedArray = [];
				selectedIndex = 0;

				var rel = $(this).attr('rel') || '';

				if (!rel || rel == '' || rel === 'nofollow') {
					selectedArray.push(this);

				} else {
					selectedArray = $("a[rel=" + rel + "], area[rel=" + rel + "]");
					selectedIndex = selectedArray.index( this );
				}

				_start();

				return;
			});

		return this;
	};

	$.fancybox = function(obj) {
		var opts;

		if (busy) {
			return;
		}

		busy = true;
		opts = typeof arguments[1] !== 'undefined' ? arguments[1] : {};

		selectedArray = [];
		selectedIndex = parseInt(opts.index, 10) || 0;

		if ($.isArray(obj)) {
			for (var i = 0, j = obj.length; i < j; i++) {
				if (typeof obj[i] == 'object') {
					$(obj[i]).data('fancybox', $.extend({}, opts, obj[i]));
				} else {
					obj[i] = $({}).data('fancybox', $.extend({content : obj[i]}, opts));
				}
			}

			selectedArray = jQuery.merge(selectedArray, obj);

		} else {
			if (typeof obj == 'object') {
				$(obj).data('fancybox', $.extend({}, opts, obj));
			} else {
				obj = $({}).data('fancybox', $.extend({content : obj}, opts));
			}

			selectedArray.push(obj);
		}

		if (selectedIndex > selectedArray.length || selectedIndex < 0) {
			selectedIndex = 0;
		}

		_start();
	};

	$.fancybox.showActivity = function() {
		clearInterval(loadingTimer);

		loading.show();
		loadingTimer = setInterval(_animate_loading, 66);
	};

	$.fancybox.hideActivity = function() {
		loading.hide();
	};

	$.fancybox.next = function() {
		return $.fancybox.pos( currentIndex + 1);
	};

	$.fancybox.prev = function() {
		return $.fancybox.pos( currentIndex - 1);
	};

	$.fancybox.pos = function(pos) {
		if (busy) {
			return;
		}

		pos = parseInt(pos);

		selectedArray = currentArray;

		if (pos > -1 && pos < currentArray.length) {
			selectedIndex = pos;
			_start();

		} else if (currentOpts.cyclic && currentArray.length > 1) {
			selectedIndex = pos >= currentArray.length ? 0 : currentArray.length - 1;
			_start();
		}

		return;
	};

	$.fancybox.cancel = function() {
		if (busy) {
			return;
		}

		busy = true;

		$.event.trigger('fancybox-cancel');

		_abort();

		selectedOpts.onCancel(selectedArray, selectedIndex, selectedOpts);

		busy = false;
	};

	// Note: within an iframe use - parent.$.fancybox.close();
	$.fancybox.close = function() {
		if (busy || wrap.is(':hidden')) {
			return;
		}

		busy = true;

		if (currentOpts && false === currentOpts.onCleanup(currentArray, currentIndex, currentOpts)) {
			busy = false;
			return;
		}

		_abort();

		$(close.add( nav_left ).add( nav_right )).hide();

		$(content.add( overlay )).unbind();

		$(window).unbind("resize.fb scroll.fb");
		$(document).unbind('keydown.fb');

		content.find('iframe').attr('src', isIE6 && /^https/i.test(window.location.href || '') ? 'javascript:void(false)' : 'about:blank');

		if (currentOpts.titlePosition !== 'inside') {
			title.empty();
		}

		wrap.stop();

		function _cleanup() {
			overlay.fadeOut('fast');

			title.empty().hide();
			wrap.hide();

			$.event.trigger('fancybox-cleanup');

			content.empty();

			currentOpts.onClosed(currentArray, currentIndex, currentOpts);

			currentArray = selectedOpts	= [];
			currentIndex = selectedIndex = 0;
			currentOpts = selectedOpts	= {};

			busy = false;
		}

		if (currentOpts.transitionOut == 'elastic') {
			start_pos = _get_zoom_from();

			var pos = wrap.position();

			final_pos = {
				top	 : pos.top ,
				left : pos.left,
				width :	wrap.width(),
				height : wrap.height()
			};

			if (currentOpts.opacity) {
				final_pos.opacity = 1;
			}

			title.empty().hide();

			fx.prop = 1;

			$(fx).animate({ prop: 0 }, {
				 duration : currentOpts.speedOut,
				 easing : currentOpts.easingOut,
				 step : _draw,
				 complete : _cleanup
			});

		} else {
			wrap.fadeOut( currentOpts.transitionOut == 'none' ? 0 : currentOpts.speedOut, _cleanup);
		}
	};

	$.fancybox.resize = function() {
		if (overlay.is(':visible')) {
			overlay.css('height', $(document).height());
		}

		$.fancybox.center(true);
	};

	$.fancybox.center = function() {
		var view, align;

		if (busy) {
			return;	
		}

		align = arguments[0] === true ? 1 : 0;
		view = _get_viewport();

		if (!align && (wrap.width() > view[0] || wrap.height() > view[1])) {
			return;	
		}

		wrap
			.stop()
			.animate({
				'top' : parseInt(Math.max(view[3] - 20, view[3] + ((view[1] - content.height() - 40) * 0.5) - currentOpts.padding)),
				'left' : parseInt(Math.max(view[2] - 20, view[2] + ((view[0] - content.width() - 40) * 0.5) - currentOpts.padding))
			}, typeof arguments[0] == 'number' ? arguments[0] : 200);
	};

	$.fancybox.init = function() {
		if ($("#fancybox-wrap").length) {
			return;
		}

		$('body').append(
			tmp	= $('<div id="fancybox-tmp"></div>'),
			loading	= $('<div id="fancybox-loading"><div></div></div>'),
			overlay	= $('<div id="fancybox-overlay"></div>'),
			wrap = $('<div id="fancybox-wrap"></div>')
		);

		outer = $('<div id="fancybox-outer"></div>')
			.append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>')
			.appendTo( wrap );

		outer.append(
			content = $('<div id="fancybox-content"></div>'),
			close = $('<a id="fancybox-close"></a>'),
			title = $('<div id="fancybox-title"></div>'),

			nav_left = $('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'),
			nav_right = $('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>')
		);

		close.click($.fancybox.close);
		loading.click($.fancybox.cancel);

		nav_left.click(function(e) {
			e.preventDefault();
			$.fancybox.prev();
		});

		nav_right.click(function(e) {
			e.preventDefault();
			$.fancybox.next();
		});

		if ($.fn.mousewheel) {
			wrap.bind('mousewheel.fb', function(e, delta) {
				if (busy) {
					e.preventDefault();

				} else if ($(e.target).get(0).clientHeight == 0 || $(e.target).get(0).scrollHeight === $(e.target).get(0).clientHeight) {
					e.preventDefault();
					$.fancybox[ delta > 0 ? 'prev' : 'next']();
				}
			});
		}

		if (!$.support.opacity) {
			wrap.addClass('fancybox-ie');
		}

		if (isIE6) {
			loading.addClass('fancybox-ie6');
			wrap.addClass('fancybox-ie6');

			$('<iframe id="fancybox-hide-sel-frame" src="' + (/^https/i.test(window.location.href || '') ? 'javascript:void(false)' : 'about:blank' ) + '" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(outer);
		}
	};

	$.fn.fancybox.defaults = {
		padding : 10,
		margin : 40,
		opacity : false,
		modal : false,
		cyclic : false,
		scrolling : 'auto',	// 'auto', 'yes' or 'no'

		width : 560,
		height : 340,

		autoScale : true,
		autoDimensions : true,
		centerOnScroll : false,

		ajax : {},
		swf : { wmode: 'transparent' },

		hideOnOverlayClick : true,
		hideOnContentClick : false,

		overlayShow : true,
		overlayOpacity : 0.7,
		overlayColor : '#777',

		titleShow : true,
		titlePosition : 'float', // 'float', 'outside', 'inside' or 'over'
		titleFormat : null,
		titleFromAlt : false,

		transitionIn : 'fade', // 'elastic', 'fade' or 'none'
		transitionOut : 'fade', // 'elastic', 'fade' or 'none'

		speedIn : 300,
		speedOut : 300,

		changeSpeed : 300,
		changeFade : 'fast',

		easingIn : 'swing',
		easingOut : 'swing',

		showCloseButton	 : true,
		showNavArrows : true,
		enableEscapeButton : true,
		enableKeyboardNav : true,

		onStart : function(){},
		onCancel : function(){},
		onComplete : function(){},
		onCleanup : function(){},
		onClosed : function(){},
		onError : function(){}
	};

	$(document).ready(function() {
		$.fancybox.init();
	});

})(jQuery);
/*************************************************
Star Rating System
First Version: 21 November, 2006
Second Version: 17 May, 2007
Author: Ritesh Agrawal (http://php.scripts.psu.edu/rja171/widgets/rating.php)
Inspiration: Will Stuckey's star rating system (http://sandbox.wilstuckey.com/jquery-ratings/)
Half-Star Addition: Karl Swedberg
Demonstration: http://examples.learningjquery.com/rating/
Usage: $('#rating').rating({maxvalue:5, curvalue:0});

arguments
options
  increment : 1, // value to increment by
	maxvalue: number of stars
	curvalue: number of selected stars
	

************************************************/

jQuery.fn.rating = function(options) {
	
	var settings = {
    increment : 0.5, // value to increment by
    maxvalue  : 5,   // max number of stars
    curvalue  : 0    // number of selected stars
  };
	
  if(options) {
    jQuery.extend(settings, options);
  };
  jQuery.extend(settings, {cancel: (settings.maxvalue > 1) ? true : false});
   
   
  var container = jQuery(this);
	
	jQuery.extend(container, {
    averageRating: settings.curvalue

  });
  settings.increment = (settings.increment < .75) ? .5 : 1;
  var s = 0;
	for(var i= 0; i <= settings.maxvalue ; i++){
    if (i == 0) {
	    if(settings.cancel == true){
        var div = '<div class="cancel"><a href="#0" title="Cancel Rating">Cancel Rating</a></div>';
        container.append(div);
      }
    } else {
      var $div = $('<div class="star"></div>')
        .append('<a href="#'+i+'" title="Give it '+i+'/'+settings.maxvalue+'">'+i+'</a>')
        .appendTo(container);
      if (settings.increment == .5) {
        if (s%2) {
          $div.addClass('star-left');
        } else {
          $div.addClass('star-right');
        }
      }
    }
    i=i-1+settings.increment;
    s++;
  }
	
  var stars = jQuery(container).children('.star');
  var cancel = jQuery(container).children('.cancel');
	
  stars
    .mouseover(function(){
      event.drain();
      event.fill(this);
    })
    .mouseout(function(){
      event.drain();
      event.reset();
    })
    .focus(function(){
      event.drain();
      event.fill(this)
    })
    .blur(function(){
      event.drain();
      event.reset();
    });

  stars.click(function(e, prevent_callback){
		
		settings.curvalue = jQuery(this).children('a')[0].href.split('#')[1];
		
		$(this).toggleClass('on');
		
		event.drain();
		event.reset();

		if(!prevent_callback) set_rating(settings.curvalue, this);
		
		return false;
	});

  // cancel button events
	if(cancel){
    cancel
    .mouseover(function(){
      event.drain();
      jQuery(this).addClass('on')
    })
    .mouseout(function(){
      event.reset();
      jQuery(this).removeClass('on')
    })
    .focus(function(){
      event.drain();
      jQuery(this).addClass('on')
    })
    .blur(function(){
      event.reset();
      jQuery(this).removeClass('on')
    });
      
    // click events.
    cancel.click(function(e, prevent_rating){

	  settings.curvalue = 0;
	  
      event.drain();
      event.reset();

	  if(!prevent_rating) set_rating(jQuery(this).children('a')[0].href.split('#')[1], this);

	  return false;
    });
  }
        
	var event = {
		fill: function(el){ // fill to the current mouse position.
			var index = stars.index(el) + 1;
			stars
				.children('a').css('width', '100%').end()
				.slice(0,index).addClass('hover').end();
		},
		drain: function() { // drain all the stars.
			stars
				.filter('.on').removeClass('on').end()
				.filter('.hover').removeClass('hover').end();
		},
		reset: function(){ // Reset the stars to the default index.
			stars.slice(0,settings.curvalue / settings.increment).addClass('on').end();
		}
	}        
	event.reset();
	
	return(this);	
}

$().ready(function(){
	//Bind the rating images via the form
	$("form").mouseover(function(){
		me = $(this).find("div.starrating img.rateme");
		if(!me.length) return;
		$(this).unbind("mouseover"); //Removes this event
		var i = $(me).attr("id").substring(3);
		var ratingparent = $(me).parent();
		var ratingval = $(me).attr("name");
		var ratingparentparent = ratingparent.parent();
		
		var animerating = ratingval;
	
		if (!animerating) animerating = 0;
		
		ratingparent.remove();
		ratingparentparent.append("<div id='rate" + i + "' class='starrating' name='" + ratingval + "'>&nbsp;</div>");
	
		var rate = "#rate" + i;
		$(rate).rating({increment:.5, curvalue:animerating});
	
	 });
});
/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
* Licensed under the MIT License (LICENSE.txt).
*
* Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
* Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
* Thanks to: Seamus Leahy for adding deltaX and deltaY
*
* Version: 3.0.4
*
* Requires: 1.2.2+
*/

(function(d){function g(a){var b=a||window.event,i=[].slice.call(arguments,1),c=0,h=0,e=0;a=d.event.fix(b);a.type="mousewheel";if(a.wheelDelta)c=a.wheelDelta/120;if(a.detail)c=-a.detail/3;e=c;if(b.axis!==undefined&&b.axis===b.HORIZONTAL_AXIS){e=0;h=-1*c}if(b.wheelDeltaY!==undefined)e=b.wheelDeltaY/120;if(b.wheelDeltaX!==undefined)h=-1*b.wheelDeltaX/120;i.unshift(a,c,h,e);return d.event.handle.apply(this,i)}var f=["DOMMouseScroll","mousewheel"];d.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=
f.length;a;)this.addEventListener(f[--a],g,false);else this.onmousewheel=g},teardown:function(){if(this.removeEventListener)for(var a=f.length;a;)this.removeEventListener(f[--a],g,false);else this.onmousewheel=null}};d.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);
/*
 * Metadata - jQuery plugin for parsing metadata from elements
 *
 * Copyright (c) 2006 John Resig, Yehuda Katz, J�örn Zaefferer, Paul McLanahan
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.metadata.js 3640 2007-10-11 18:34:38Z pmclanahan $
 *
 */

/**
 * Sets the type of metadata to use. Metadata is encoded in JSON, and each property
 * in the JSON will become a property of the element itself.
 *
 * There are four supported types of metadata storage:
 *
 *   attr:  Inside an attribute. The name parameter indicates *which* attribute.
 *          
 *   class: Inside the class attribute, wrapped in curly braces: { }
 *   
 *   elem:  Inside a child element (e.g. a script tag). The
 *          name parameter indicates *which* element.
 *   html5: Values are stored in data-* attributes.
 *          
 * The metadata for an element is loaded the first time the element is accessed via jQuery.
 *
 * As a result, you can define the metadata type, use $(expr) to load the metadata into the elements
 * matched by expr, then redefine the metadata type and run another $(expr) for other elements.
 * 
 * @name $.metadata.setType
 *
 * @example <p id="one" class="some_class {item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("class")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from the class attribute
 * 
 * @example <p id="one" class="some_class" data="{item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("attr", "data")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a "data" attribute
 * 
 * @example <p id="one" class="some_class"><script>{item_id: 1, item_label: 'Label'}</script>This is a p</p>
 * @before $.metadata.setType("elem", "script")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a nested script element
 * 
 * @example <p id="one" class="some_class" data-item_id="1" data-item_label="Label">This is a p</p>
 * @before $.metadata.setType("html5")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a series of data-* attributes
 *
 * @param String type The encoding type
 * @param String name The name of the attribute to be used to get metadata (optional)
 * @cat Plugins/Metadata
 * @descr Sets the type of encoding to be used when loading metadata for the first time
 * @type undefined
 * @see metadata()
 */

(function($) {

$.extend({
  metadata : {
    defaults : {
      type: 'class',
      name: 'metadata',
      cre: /({.*})/,
      single: 'metadata'
    },
    setType: function( type, name ){
      this.defaults.type = type;
      this.defaults.name = name;
    },
    get: function( elem, opts ){
      var settings = $.extend({},this.defaults,opts);
      // check for empty string in single property
      if ( !settings.single.length ) settings.single = 'metadata';
      
      var data = $.data(elem, settings.single);
      // returned cached data if it already exists
      if ( data ) return data;
      
      data = "{}";
      
      var getData = function(data) {
        if(typeof data != "string") return data;
        
        if( data.indexOf('{') < 0 ) {
          data = eval("(" + data + ")");
        }
      }
      
      var getObject = function(data) {
        if(typeof data != "string") return data;
        
        data = eval("(" + data + ")");
        return data;
      }
      
      if ( settings.type == "html5" ) {
        var object = {};
        $( elem.attributes ).each(function() {
          var name = this.nodeName;
          if(name.match(/^data-/)) name = name.replace(/^data-/, '');
          else return true;
          object[name] = getObject(this.nodeValue);
        });
      } else {
        if ( settings.type == "class" ) {
          var m = settings.cre.exec( elem.className );
          if ( m )
            data = m[1];
        } else if ( settings.type == "elem" ) {
          if( !elem.getElementsByTagName ) return;
          var e = elem.getElementsByTagName(settings.name);
          if ( e.length )
            data = $.trim(e[0].innerHTML);
        } else if ( elem.getAttribute != undefined ) {
          var attr = elem.getAttribute( settings.name );
          if ( attr )
            data = attr;
        }
        object = getObject(data.indexOf("{") < 0 ? "{" + data + "}" : data);
      }
      
      $.data( elem, settings.single, object );
      return object;
    }
  }
});

/**
 * Returns the metadata object for the first member of the jQuery object.
 *
 * @name metadata
 * @descr Returns element's metadata object
 * @param Object opts An object contianing settings to override the defaults
 * @type jQuery
 * @cat Plugins/Metadata
 */
$.fn.metadata = function( opts ){
  return $.metadata.get( this[0], opts );
};

})(jQuery);
/**
 * jQuery.query - Query String Modification and Creation for jQuery
 * Written by Blair Mitchelmore (blair DOT mitchelmore AT gmail DOT com)
 * Licensed under the WTFPL (http://sam.zoy.org/wtfpl/).
 * Date: 2009/8/13
 *
 * @author Blair Mitchelmore
 * @version 2.1.7
 *
 **/
new function(settings) { 
  // Various Settings
  var $separator = settings.separator || '&';
  var $spaces = !!settings.spaces;
  var $suffix = settings.suffix === false ? '' : '[]';
  var $prefix = settings.prefix === false ? false : true;
  var $hash = $prefix ? settings.hash === true ? "#" : "?" : "";
  var $numbers = settings.numbers === false ? false : true;
  
  jQuery.query = new function() {
    var is = function(o, t) {
      return o != undefined && o !== null && (!!t ? o.constructor == t : true);
    };
    var parse = function(path) {
      var m, rx = /\[([^[]*)\]/g, match = /^([^[]+)(\[.*\])?$/.exec(path), base = match[1], tokens = [];
      while (m = rx.exec(match[2])) tokens.push(m[1]);
      return [base, tokens];
    };
    var set = function(target, tokens, value) {
      var o, token = tokens.shift();
      if (typeof target != 'object') target = null;
      if (token === "") {
        if (!target) target = [];
        if (is(target, Array)) {
          target.push(tokens.length == 0 ? value : set(null, tokens.slice(0), value));
        } else if (is(target, Object)) {
          var i = 0;
          while (target[i++] != null);
          target[--i] = tokens.length == 0 ? value : set(target[i], tokens.slice(0), value);
        } else {
          target = [];
          target.push(tokens.length == 0 ? value : set(null, tokens.slice(0), value));
        }
      } else if (token && token.match(/^\s*[0-9]+\s*$/)) {
        var index = parseInt(token, 10);
        if (!target) target = [];
        target[index] = tokens.length == 0 ? value : set(target[index], tokens.slice(0), value);
      } else if (token) {
        var index = token.replace(/^\s*|\s*$/g, "");
        if (!target) target = {};
        if (is(target, Array)) {
          var temp = {};
          for (var i = 0; i < target.length; ++i) {
            temp[i] = target[i];
          }
          target = temp;
        }
        target[index] = tokens.length == 0 ? value : set(target[index], tokens.slice(0), value);
      } else {
        return value;
      }
      return target;
    };
    
    var queryObject = function(a) {
      var self = this;
      self.keys = {};
      
      if (a.queryObject) {
        jQuery.each(a.get(), function(key, val) {
          self.SET(key, val);
        });
      } else {
        jQuery.each(arguments, function() {
          var q = "" + this;
          q = q.replace(/^[?#]/,''); // remove any leading ? || #
          q = q.replace(/[;&]$/,''); // remove any trailing & || ;
          if ($spaces) q = q.replace(/[+]/g,' '); // replace +'s with spaces
          
          jQuery.each(q.split(/[&;]/), function(){
            var key = decodeURIComponent(this.split('=')[0] || "");
            var val = decodeURIComponent(this.split('=')[1] || "");
            
            if (!key) return;
            
            if ($numbers) {
              if (/^[+-]?[0-9]+\.[0-9]*$/.test(val)) // simple float regex
                val = parseFloat(val);
              else if (/^[+-]?[0-9]+$/.test(val)) // simple int regex
                val = parseInt(val, 10);
            }
            
            val = (!val && val !== 0) ? true : val;
            
            if (val !== false && val !== true && typeof val != 'number')
              val = val;
            
            self.SET(key, val);
          });
        });
      }
      return self;
    };
    
    queryObject.prototype = {
      queryObject: true,
      has: function(key, type) {
        var value = this.get(key);
        return is(value, type);
      },
      GET: function(key) {
        if (!is(key)) return this.keys;
        var parsed = parse(key), base = parsed[0], tokens = parsed[1];
        var target = this.keys[base];
        while (target != null && tokens.length != 0) {
          target = target[tokens.shift()];
        }
        return typeof target == 'number' ? target : target || "";
      },
      get: function(key) {
        var target = this.GET(key);
        if (is(target, Object))
          return jQuery.extend(true, {}, target);
        else if (is(target, Array))
          return target.slice(0);
        return target;
      },
      SET: function(key, val) {
        var value = !is(val) ? null : val;
        var parsed = parse(key), base = parsed[0], tokens = parsed[1];
        var target = this.keys[base];
        this.keys[base] = set(target, tokens.slice(0), value);
        return this;
      },
      set: function(key, val) {
        return this.copy().SET(key, val);
      },
      REMOVE: function(key) {
        return this.SET(key, null).COMPACT();
      },
      remove: function(key) {
        return this.copy().REMOVE(key);
      },
      EMPTY: function() {
        var self = this;
        jQuery.each(self.keys, function(key, value) {
          delete self.keys[key];
        });
        return self;
      },
      load: function(url) {
        var hash = url.replace(/^.*?[#](.+?)(?:\?.+)?$/, "$1");
        var search = url.replace(/^.*?[?](.+?)(?:#.+)?$/, "$1");
        return new queryObject(url.length == search.length ? '' : search, url.length == hash.length ? '' : hash);
      },
      empty: function() {
        return this.copy().EMPTY();
      },
      copy: function() {
        return new queryObject(this);
      },
      COMPACT: function() {
        function build(orig) {
          var obj = typeof orig == "object" ? is(orig, Array) ? [] : {} : orig;
          if (typeof orig == 'object') {
            function add(o, key, value) {
              if (is(o, Array))
                o.push(value);
              else
                o[key] = value;
            }
            jQuery.each(orig, function(key, value) {
              if (!is(value)) return true;
              add(obj, key, build(value));
            });
          }
          return obj;
        }
        this.keys = build(this.keys);
        return this;
      },
      compact: function() {
        return this.copy().COMPACT();
      },
      toString: function() {
        var i = 0, queryString = [], chunks = [], self = this;
        var encode = function(str) {
          str = str + "";
          if ($spaces) str = str.replace(/ /g, "+");
          
          var output = encodeURIComponent(str);
          
          //Unencode the stuff in RFC 3986
          output = output
          			.replace(/%2C/g, ',')
    	  			.replace(/%21/g, '!')
    	  			.replace(/%27/g, "'")
    	  			.replace(/%28/g, '(')
    	  			.replace(/%29/g, ')')
    	  			.replace(/%2A/g, '*');
          
          return output;
          
        };
        var addFields = function(arr, key, value) {
          if (!is(value) || value === false) return;
          var o = [encode(key)];
          if (value !== true) {
            o.push("=");
            o.push(encode(value));
          }
          arr.push(o.join(""));
        };
        var build = function(obj, base) {
          var newKey = function(key) {
            return !base || base == "" ? [key].join("") : [base, "[", key, "]"].join("");
          };
          jQuery.each(obj, function(key, value) {
            if (typeof value == 'object') 
              build(value, newKey(key));
            else
              addFields(chunks, newKey(key), value);
          });
        };
        
        build(this.keys);
        
        if (chunks.length > 0) queryString.push($hash);
        queryString.push(chunks.join($separator));
        
        return queryString.join("");
      }
    };
    
    return new queryObject(location.search, location.hash);
  };
}(jQuery.query || {}); // Pass in jQuery.query as settings object
/*!
 * jQuery blockUI plugin
 * Version 2.35 (23-SEP-2010)
 * @requires jQuery v1.2.3 or later
 *
 * Examples at: http://malsup.com/jquery/block/
 * Copyright (c) 2007-2008 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to Amir-Hossein Sobhi for some excellent contributions!
 */

;(function($) {

if (/1\.(0|1|2)\.(0|1|2)/.test($.fn.jquery) || /^1.1/.test($.fn.jquery)) {
	alert('blockUI requires jQuery v1.2.3 or later!  You are using v' + $.fn.jquery);
	return;
}

$.fn._fadeIn = $.fn.fadeIn;

var noOp = function() {};

// this bit is to ensure we don't call setExpression when we shouldn't (with extra muscle to handle
// retarded userAgent strings on Vista)
var mode = document.documentMode || 0;
var setExpr = $.browser.msie && (($.browser.version < 8 && !mode) || mode < 8);
var ie6 = $.browser.msie && /MSIE 6.0/.test(navigator.userAgent) && !mode;

// global $ methods for blocking/unblocking the entire page
$.blockUI   = function(opts) { install(window, opts); };
$.unblockUI = function(opts) { remove(window, opts); };

// convenience method for quick growl-like notifications  (http://www.google.com/search?q=growl)
$.growlUI = function(title, message, timeout, onClose) {
	var $m = $('<div class="growlUI"></div>');
	if (title) $m.append('<h1>'+title+'</h1>');
	if (message) $m.append('<h2>'+message+'</h2>');
	if (timeout == undefined) timeout = 3000;
	$.blockUI({
		message: $m, fadeIn: 700, fadeOut: 1000, centerY: false,
		timeout: timeout, showOverlay: false,
		onUnblock: onClose, 
		css: $.blockUI.defaults.growlCSS
	});
};

// plugin method for blocking element content
$.fn.block = function(opts) {
	return this.unblock({ fadeOut: 0 }).each(function() {
		if ($.css(this,'position') == 'static')
			this.style.position = 'relative';
		if ($.browser.msie)
			this.style.zoom = 1; // force 'hasLayout'
		install(this, opts);
	});
};

// plugin method for unblocking element content
$.fn.unblock = function(opts) {
	return this.each(function() {
		remove(this, opts);
	});
};

$.blockUI.version = 2.35; // 2nd generation blocking at no extra cost!

// override these in your code to change the default behavior and style
$.blockUI.defaults = {
	// message displayed when blocking (use null for no message)
	message:  '<h1>Please wait...</h1>',

	title: null,	  // title string; only used when theme == true
	draggable: true,  // only used when theme == true (requires jquery-ui.js to be loaded)
	
	theme: false, // set to true to use with jQuery UI themes
	
	// styles for the message when blocking; if you wish to disable
	// these and use an external stylesheet then do this in your code:
	// $.blockUI.defaults.css = {};
	css: {
		padding:	'12px',
		margin:		'0 0 0 -210px',
		width:		'420px',
		top:		'25%',
		left:		'50%',
		color:		'#000',
		border:		'1px solid #919191',
		backgroundColor:'#fff',
		'-webkit-border-radius': '8px',
		'-moz-border-radius': '8px',
		'border-radius': '8px'
	},
	
	// minimal style set used when themes are used
	themedCSS: {
		width:	'30%',
		top:	'40%',
		left:	'35%'
	},

	// styles for the overlay
	overlayCSS:  {
		backgroundColor: '#000',
		opacity: 0.6
	},

	// styles applied when using $.growlUI
	growlCSS: {
		width:  	'350px',
		top:		'10px',
		left:   	'',
		right:  	'10px',
		border: 	'none',
		padding:	'5px',
		opacity:	0.6,
		cursor: 	'default',
		color:		'#fff',
		backgroundColor: '#000',
		'-webkit-border-radius': '10px',
		'-moz-border-radius': '10px',
		'border-radius': '10px'
	},
	
	// IE issues: 'about:blank' fails on HTTPS and javascript:false is s-l-o-w
	// (hat tip to Jorge H. N. de Vasconcelos)
	iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank',

	// force usage of iframe in non-IE browsers (handy for blocking applets)
	forceIframe: false,

	// z-index for the blocking overlay
	baseZ: 1000,

	// set these to true to have the message automatically centered
	centerX: true, // <-- only effects element blocking (page block controlled via css above)
	centerY: true,

	// allow body element to be stetched in ie6; this makes blocking look better
	// on "short" pages.  disable if you wish to prevent changes to the body height
	allowBodyStretch: true,

	// enable if you want key and mouse events to be disabled for content that is blocked
	bindEvents: true,

	// be default blockUI will supress tab navigation from leaving blocking content
	// (if bindEvents is true)
	constrainTabKey: true,

	// fadeIn time in millis; set to 0 to disable fadeIn on block
	fadeIn:  200,

	// fadeOut time in millis; set to 0 to disable fadeOut on unblock
	fadeOut:  400,

	// time in millis to wait before auto-unblocking; set to 0 to disable auto-unblock
	timeout: 0,

	// disable if you don't want to show the overlay
	showOverlay: true,

	// if true, focus will be placed in the first available input field when
	// page blocking
	focusInput: true,

	// suppresses the use of overlay styles on FF/Linux (due to performance issues with opacity)
	applyPlatformOpacityRules: true,
	
	// callback method invoked when fadeIn has completed and blocking message is visible
	onBlock: null,

	// callback method invoked when unblocking has completed; the callback is
	// passed the element that has been unblocked (which is the window object for page
	// blocks) and the options that were passed to the unblock call:
	//	 onUnblock(element, options)
	onUnblock: null,

	// don't ask; if you really must know: http://groups.google.com/group/jquery-en/browse_thread/thread/36640a8730503595/2f6a79a77a78e493#2f6a79a77a78e493
	quirksmodeOffsetHack: 4,

	// class name of the message block
	blockMsgClass: 'blockMsg'
};

// private data and functions follow...

var pageBlock = null;
var pageBlockEls = [];

function install(el, opts) {
	var full = (el == window);
	var msg = opts && opts.message !== undefined ? opts.message : undefined;
	opts = $.extend({}, $.blockUI.defaults, opts || {});
	opts.overlayCSS = $.extend({}, $.blockUI.defaults.overlayCSS, opts.overlayCSS || {});
	var css = $.extend({}, $.blockUI.defaults.css, opts.css || {});
	var themedCSS = $.extend({}, $.blockUI.defaults.themedCSS, opts.themedCSS || {});
	msg = msg === undefined ? opts.message : msg;

	// remove the current block (if there is one)
	if (full && pageBlock)
		remove(window, {fadeOut:0});

	// if an existing element is being used as the blocking content then we capture
	// its current place in the DOM (and current display style) so we can restore
	// it when we unblock
	if (msg && typeof msg != 'string' && (msg.parentNode || msg.jquery)) {
		var node = msg.jquery ? msg[0] : msg;
		var data = {};
		$(el).data('blockUI.history', data);
		data.el = node;
		data.parent = node.parentNode;
		data.display = node.style.display;
		data.position = node.style.position;
		if (data.parent)
			data.parent.removeChild(node);
	}

	var z = opts.baseZ;

	// blockUI uses 3 layers for blocking, for simplicity they are all used on every platform;
	// layer1 is the iframe layer which is used to supress bleed through of underlying content
	// layer2 is the overlay layer which has opacity and a wait cursor (by default)
	// layer3 is the message content that is displayed while blocking

	var lyr1 = ($.browser.msie || opts.forceIframe) 
		? $('<iframe class="blockUI" style="z-index:'+ (z++) +';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+opts.iframeSrc+'"></iframe>')
		: $('<div class="blockUI" style="display:none"></div>');
	var lyr2 = $('<div class="blockUI blockOverlay" style="z-index:'+ (z++) +';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');
	
	var lyr3, s;
	if (opts.theme && full) {
		s = '<div class="blockUI ' + opts.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+z+';display:none;position:fixed">' +
				'<div class="ui-widget-header ui-dialog-titlebar blockTitle">'+(opts.title || '&nbsp;')+'</div>' +
				'<div class="ui-widget-content ui-dialog-content"></div>' +
			'</div>';
	}
	else if (opts.theme) {
		s = '<div class="blockUI ' + opts.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'+z+';display:none;position:absolute">' +
				'<div class="ui-widget-header ui-dialog-titlebar blockTitle">'+(opts.title || '&nbsp;')+'</div>' +
				'<div class="ui-widget-content ui-dialog-content"></div>' +
			'</div>';
	}
	else if (full) {
		s = '<div class="blockUI ' + opts.blockMsgClass + ' blockPage" style="z-index:'+z+';display:none;position:fixed"></div>';
	}			
	else {
		s = '<div class="blockUI ' + opts.blockMsgClass + ' blockElement" style="z-index:'+z+';display:none;position:absolute"></div>';
	}
	lyr3 = $(s);

	// if we have a message, style it
	if (msg) {
		if (opts.theme) {
			lyr3.css(themedCSS);
			lyr3.addClass('ui-widget-content');
		}
		else 
			lyr3.css(css);
	}

	// style the overlay
	if (!opts.applyPlatformOpacityRules || !($.browser.mozilla && /Linux/.test(navigator.platform)))
		lyr2.css(opts.overlayCSS);
	lyr2.css('position', full ? 'fixed' : 'absolute');

	// make iframe layer transparent in IE
	if ($.browser.msie || opts.forceIframe)
		lyr1.css('opacity',0.0);

	//$([lyr1[0],lyr2[0],lyr3[0]]).appendTo(full ? 'body' : el);
	var layers = [lyr1,lyr2,lyr3], $par = full ? $('body') : $(el);
	$.each(layers, function() {
		this.appendTo($par);
	});
	
	if (opts.theme && opts.draggable && $.fn.draggable) {
		lyr3.draggable({
			handle: '.ui-dialog-titlebar',
			cancel: 'li'
		});
	}

	// ie7 must use absolute positioning in quirks mode and to account for activex issues (when scrolling)
	var expr = setExpr && (!$.boxModel || $('object,embed', full ? null : el).length > 0);
	if (ie6 || expr) {
		// give body 100% height
		if (full && opts.allowBodyStretch && $.boxModel)
			$('html,body').css('height','100%');

		// fix ie6 issue when blocked element has a border width
		if ((ie6 || !$.boxModel) && !full) {
			var t = sz(el,'borderTopWidth'), l = sz(el,'borderLeftWidth');
			var fixT = t ? '(0 - '+t+')' : 0;
			var fixL = l ? '(0 - '+l+')' : 0;
		}

		// simulate fixed position
		$.each([lyr1,lyr2,lyr3], function(i,o) {
			var s = o[0].style;
			s.position = 'absolute';
			if (i < 2) {
				full ? s.setExpression('height','Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:'+opts.quirksmodeOffsetHack+') + "px"')
					 : s.setExpression('height','this.parentNode.offsetHeight + "px"');
				full ? s.setExpression('width','jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"')
					 : s.setExpression('width','this.parentNode.offsetWidth + "px"');
				if (fixL) s.setExpression('left', fixL);
				if (fixT) s.setExpression('top', fixT);
			}
			else if (opts.centerY) {
				if (full) s.setExpression('top','(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');
				s.marginTop = 0;
			}
			else if (!opts.centerY && full) {
				var top = (opts.css && opts.css.top) ? parseInt(opts.css.top) : 0;
				var expression = '((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + '+top+') + "px"';
				s.setExpression('top',expression);
			}
		});
	}

	// show the message
	if (msg) {
		if (opts.theme)
			lyr3.find('.ui-widget-content').append(msg);
		else
			lyr3.append(msg);
		if (msg.jquery || msg.nodeType)
			$(msg).show();
	}

	if (($.browser.msie || opts.forceIframe) && opts.showOverlay)
		lyr1.show(); // opacity is zero
	if (opts.fadeIn) {
		var cb = opts.onBlock ? opts.onBlock : noOp;
		var cb1 = (opts.showOverlay && !msg) ? cb : noOp;
		var cb2 = msg ? cb : noOp;
		if (opts.showOverlay)
			lyr2._fadeIn(opts.fadeIn, cb1);
		if (msg)
			lyr3._fadeIn(opts.fadeIn, cb2);
	}
	else {
		if (opts.showOverlay)
			lyr2.show();
		if (msg)
			lyr3.show();
		if (opts.onBlock)
			opts.onBlock();
	}

	// bind key and mouse events
	bind(1, el, opts);

	if (full) {
		pageBlock = lyr3[0];
		pageBlockEls = $(':input:enabled:visible',pageBlock);
		if (opts.focusInput)
			setTimeout(focus, 20);
	}
	else
		center(lyr3[0], opts.centerX, opts.centerY);

	if (opts.timeout) {
		// auto-unblock
		var to = setTimeout(function() {
			full ? $.unblockUI(opts) : $(el).unblock(opts);
		}, opts.timeout);
		$(el).data('blockUI.timeout', to);
	}
};

// remove the block
function remove(el, opts) {
	var full = (el == window);
	var $el = $(el);
	var data = $el.data('blockUI.history');
	var to = $el.data('blockUI.timeout');
	if (to) {
		clearTimeout(to);
		$el.removeData('blockUI.timeout');
	}
	opts = $.extend({}, $.blockUI.defaults, opts || {});
	bind(0, el, opts); // unbind events
	
	var els;
	if (full) // crazy selector to handle odd field errors in ie6/7
		els = $('body').children().filter('.blockUI').add('body > .blockUI');
	else
		els = $('.blockUI', el);

	if (full)
		pageBlock = pageBlockEls = null;

	if (opts.fadeOut) {
		els.fadeOut(opts.fadeOut);
		setTimeout(function() { reset(els,data,opts,el); }, opts.fadeOut);
	}
	else
		reset(els, data, opts, el);
};

// move blocking element back into the DOM where it started
function reset(els,data,opts,el) {
	els.each(function(i,o) {
		// remove via DOM calls so we don't lose event handlers
		if (this.parentNode)
			this.parentNode.removeChild(this);
	});

	if (data && data.el) {
		data.el.style.display = data.display;
		data.el.style.position = data.position;
		if (data.parent)
			data.parent.appendChild(data.el);
		$(el).removeData('blockUI.history');
	}

	if (typeof opts.onUnblock == 'function')
		opts.onUnblock(el,opts);
};

// bind/unbind the handler
function bind(b, el, opts) {
	var full = el == window, $el = $(el);

	// don't bother unbinding if there is nothing to unbind
	if (!b && (full && !pageBlock || !full && !$el.data('blockUI.isBlocked')))
		return;
	if (!full)
		$el.data('blockUI.isBlocked', b);

	// don't bind events when overlay is not in use or if bindEvents is false
	if (!opts.bindEvents || (b && !opts.showOverlay)) 
		return;

	// bind anchors and inputs for mouse and key events
	var events = 'mousedown mouseup keydown keypress';
	b ? $(document).bind(events, opts, handler) : $(document).unbind(events, handler);

// former impl...
//	   var $e = $('a,:input');
//	   b ? $e.bind(events, opts, handler) : $e.unbind(events, handler);
};

// event handler to suppress keyboard/mouse events when blocking
function handler(e) {
	// allow tab navigation (conditionally)
	if (e.keyCode && e.keyCode == 9) {
		if (pageBlock && e.data.constrainTabKey) {
			var els = pageBlockEls;
			var fwd = !e.shiftKey && e.target == els[els.length-1];
			var back = e.shiftKey && e.target == els[0];
			if (fwd || back) {
				setTimeout(function(){focus(back)},10);
				return false;
			}
		}
	}
	var opts = e.data;
	// allow events within the message content
	if ($(e.target).parents('div.' + opts.blockMsgClass).length > 0)
		return true;

	// allow events for content that is not being blocked
	return $(e.target).parents().children().filter('div.blockUI').length == 0;
};

function focus(back) {
	if (!pageBlockEls)
		return;
	var e = pageBlockEls[back===true ? pageBlockEls.length-1 : 0];
	if (e)
		e.focus();
};

function center(el, x, y) {
	var p = el.parentNode, s = el.style;
	var l = ((p.offsetWidth - el.offsetWidth)/2) - sz(p,'borderLeftWidth');
	var t = ((p.offsetHeight - el.offsetHeight)/2) - sz(p,'borderTopWidth');
	if (x) s.left = l > 0 ? (l+'px') : '0';
	if (y) s.top  = t > 0 ? (t+'px') : '0';
};

function sz(el, p) {
	return parseInt($.css(el,p))||0;
};

})(jQuery);
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('h.i[\'1a\']=h.i[\'z\'];h.O(h.i,{y:\'D\',z:9(x,t,b,c,d){6 h.i[h.i.y](x,t,b,c,d)},17:9(x,t,b,c,d){6 c*(t/=d)*t+b},D:9(x,t,b,c,d){6-c*(t/=d)*(t-2)+b},13:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t+b;6-c/2*((--t)*(t-2)-1)+b},X:9(x,t,b,c,d){6 c*(t/=d)*t*t+b},U:9(x,t,b,c,d){6 c*((t=t/d-1)*t*t+1)+b},R:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t+b;6 c/2*((t-=2)*t*t+2)+b},N:9(x,t,b,c,d){6 c*(t/=d)*t*t*t+b},M:9(x,t,b,c,d){6-c*((t=t/d-1)*t*t*t-1)+b},L:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t*t+b;6-c/2*((t-=2)*t*t*t-2)+b},K:9(x,t,b,c,d){6 c*(t/=d)*t*t*t*t+b},J:9(x,t,b,c,d){6 c*((t=t/d-1)*t*t*t*t+1)+b},I:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t*t*t+b;6 c/2*((t-=2)*t*t*t*t+2)+b},G:9(x,t,b,c,d){6-c*8.C(t/d*(8.g/2))+c+b},15:9(x,t,b,c,d){6 c*8.n(t/d*(8.g/2))+b},12:9(x,t,b,c,d){6-c/2*(8.C(8.g*t/d)-1)+b},Z:9(x,t,b,c,d){6(t==0)?b:c*8.j(2,10*(t/d-1))+b},Y:9(x,t,b,c,d){6(t==d)?b+c:c*(-8.j(2,-10*t/d)+1)+b},W:9(x,t,b,c,d){e(t==0)6 b;e(t==d)6 b+c;e((t/=d/2)<1)6 c/2*8.j(2,10*(t-1))+b;6 c/2*(-8.j(2,-10*--t)+2)+b},V:9(x,t,b,c,d){6-c*(8.o(1-(t/=d)*t)-1)+b},S:9(x,t,b,c,d){6 c*8.o(1-(t=t/d-1)*t)+b},Q:9(x,t,b,c,d){e((t/=d/2)<1)6-c/2*(8.o(1-t*t)-1)+b;6 c/2*(8.o(1-(t-=2)*t)+1)+b},P:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d)==1)6 b+c;e(!p)p=d*.3;e(a<8.w(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.r(c/a);6-(a*8.j(2,10*(t-=1))*8.n((t*d-s)*(2*8.g)/p))+b},H:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d)==1)6 b+c;e(!p)p=d*.3;e(a<8.w(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.r(c/a);6 a*8.j(2,-10*t)*8.n((t*d-s)*(2*8.g)/p)+c+b},T:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d/2)==2)6 b+c;e(!p)p=d*(.3*1.5);e(a<8.w(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.r(c/a);e(t<1)6-.5*(a*8.j(2,10*(t-=1))*8.n((t*d-s)*(2*8.g)/p))+b;6 a*8.j(2,-10*(t-=1))*8.n((t*d-s)*(2*8.g)/p)*.5+c+b},F:9(x,t,b,c,d,s){e(s==u)s=1.l;6 c*(t/=d)*t*((s+1)*t-s)+b},E:9(x,t,b,c,d,s){e(s==u)s=1.l;6 c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},16:9(x,t,b,c,d,s){e(s==u)s=1.l;e((t/=d/2)<1)6 c/2*(t*t*(((s*=(1.B))+1)*t-s))+b;6 c/2*((t-=2)*t*(((s*=(1.B))+1)*t+s)+2)+b},A:9(x,t,b,c,d){6 c-h.i.v(x,d-t,0,c,d)+b},v:9(x,t,b,c,d){e((t/=d)<(1/2.k)){6 c*(7.q*t*t)+b}m e(t<(2/2.k)){6 c*(7.q*(t-=(1.5/2.k))*t+.k)+b}m e(t<(2.5/2.k)){6 c*(7.q*(t-=(2.14/2.k))*t+.11)+b}m{6 c*(7.q*(t-=(2.18/2.k))*t+.19)+b}},1b:9(x,t,b,c,d){e(t<d/2)6 h.i.A(x,t*2,0,c,d)*.5+b;6 h.i.v(x,t*2-d,0,c,d)*.5+c*.5+b}});',62,74,'||||||return||Math|function|||||if|var|PI|jQuery|easing|pow|75|70158|else|sin|sqrt||5625|asin|||undefined|easeOutBounce|abs||def|swing|easeInBounce|525|cos|easeOutQuad|easeOutBack|easeInBack|easeInSine|easeOutElastic|easeInOutQuint|easeOutQuint|easeInQuint|easeInOutQuart|easeOutQuart|easeInQuart|extend|easeInElastic|easeInOutCirc|easeInOutCubic|easeOutCirc|easeInOutElastic|easeOutCubic|easeInCirc|easeInOutExpo|easeInCubic|easeOutExpo|easeInExpo||9375|easeInOutSine|easeInOutQuad|25|easeOutSine|easeInOutBack|easeInQuad|625|984375|jswing|easeInOutBounce'.split('|'),0,{}))

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */

jQuery.url=function(){var segments={};var parsed={};var options={url:window.location,strictMode:false,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};var parseUri=function(){str=decodeURI(options.url);var m=options.parser[options.strictMode?"strict":"loose"].exec(str);var uri={};var i=14;while(i--){uri[options.key[i]]=m[i]||""}uri[options.q.name]={};uri[options.key[12]].replace(options.q.parser,function($0,$1,$2){if($1){uri[options.q.name][$1]=$2}});return uri};var key=function(key){if(!parsed.length){setUp()}if(key=="base"){if(parsed.port!==null&&parsed.port!==""){return parsed.protocol+"://"+parsed.host+":"+parsed.port+"/"}else{return parsed.protocol+"://"+parsed.host+"/"}}return(parsed[key]==="")?null:parsed[key]};var param=function(item){if(!parsed.length){setUp()}return(parsed.queryKey[item]===null)?null:parsed.queryKey[item]};var setUp=function(){parsed=parseUri();getSegments()};var getSegments=function(){var p=parsed.path;segments=[];segments=parsed.path.length==1?{}:(p.charAt(p.length-1)=="/"?p.substring(1,p.length-1):path=p.substring(1)).split("/")};return{setMode:function(mode){strictMode=mode=="strict"?true:false;return this},setUrl:function(newUri){options.url=newUri===undefined?window.location:newUri;setUp();return this},segment:function(pos){if(!parsed.length){setUp()}if(pos===undefined){return segments.length}return(segments[pos]===""||segments[pos]===undefined)?null:segments[pos]},attr:key,param:param}}();
;(function($){function Hovertip(elem,conf){var tooltip=$('<div></div>').addClass(conf.className).html(elem.attr('title')).insertAfter(elem);tooltip.hide();elem.removeAttr('title');function setPosition(posX,posY){tooltip.css({left:posX,top:posY});}
function updatePosition(event){var tooltipWidth=tooltip.outerWidth();var tooltipHeight=tooltip.outerHeight();var $window=$(window);var windowWidth=$window.width()+$window.scrollLeft();var windowHeight=$window.height()+$window.scrollTop();var posX=event.pageX+conf.offset[0];var posY=event.pageY+conf.offset[1];if(posX+tooltipWidth>windowWidth){posX=windowWidth-tooltipWidth;}
if(posY+tooltipHeight>windowHeight){posY=event.pageY-conf.offset[1]-tooltipHeight;}
setPosition(posX,posY);}
elem.hover(function(event){updatePosition(event);conf.show(tooltip);},function(){conf.hide(tooltip);});}
$.fn.hovertip=function(conf){var defaultConf={offset:[5,5],className:'hovertip',show:function(tooltip){tooltip.fadeIn(25);},hide:function(tooltip){tooltip.fadeOut(25);}};$.extend(defaultConf,conf);this.each(function(){var el=new Hovertip($(this),defaultConf);$(this).data("hovertip",el);});}})(jQuery);
/*
 * jQuery Autocomplete plugin 1.1
 *
 * Copyright (c) 2009 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.autocomplete.js 15 2009-08-22 10:30:27Z joern.zaefferer $
 * 
 */

;(function($) {
	
$.fn.extend({
	autocomplete: function(urlOrData, options) {
		var isUrl = typeof urlOrData == "string";
		options = $.extend({}, $.Autocompleter.defaults, {
			url: isUrl ? urlOrData : null,
			data: isUrl ? null : urlOrData,
			delay: isUrl ? $.Autocompleter.defaults.delay : 10,
			max: options && !options.scroll ? 10 : 150
		}, options);
		
		// if highlight is set to false, replace it with a do-nothing function
		options.highlight = options.highlight || function(value) { return value; };
		
		// if the formatMatch option is not specified, then use formatItem for backwards compatibility
		options.formatMatch = options.formatMatch || options.formatItem;
		
		return this.each(function() {
			new $.Autocompleter(this, options);
		});
	},
	result: function(handler) {
		return this.bind("result", handler);
	},
	search: function(handler) {
		return this.trigger("search", [handler]);
	},
	flushCache: function() {
		return this.trigger("flushCache");
	},
	setOptions: function(options){
		return this.trigger("setOptions", [options]);
	},
	unautocomplete: function() {
		return this.trigger("unautocomplete");
	}
});

$.Autocompleter = function(input, options) {

	var KEY = {
		UP: 38,
		DOWN: 40,
		DEL: 46,
		TAB: 9,
		RETURN: 13,
		ESC: 27,
		COMMA: 188,
		PAGEUP: 33,
		PAGEDOWN: 34,
		BACKSPACE: 8
	};

	// Create $ object for input element
	var $input = $(input).attr("autocomplete", "off").addClass(options.inputClass);

	var timeout;
	var previousValue = "";
	var cache = $.Autocompleter.Cache(options);
	var hasFocus = 0;
	var lastKeyPressCode;
	var config = {
		mouseDownOnSelect: false
	};
	var lastCacheLength = 0;
	var select = $.Autocompleter.Select(options, input, selectCurrent, config);
	
	var blockSubmit;
	
	// prevent form submit in opera when selecting with return key
	$.browser.opera && $(input.form).bind("submit.autocomplete", function() {
		if (blockSubmit) {
			blockSubmit = false;
			return false;
		}
	});
	
	// only opera doesn't trigger keydown multiple times while pressed, others don't work with keypress at all
	$input.bind(($.browser.opera ? "keypress" : "keydown") + ".autocomplete", function(event) {
		// a keypress means the input has focus
		// avoids issue where input had focus before the autocomplete was applied
		hasFocus = 1;
		// track last key pressed
		lastKeyPressCode = event.keyCode;
		switch(event.keyCode) {
		
			case KEY.UP:
				event.preventDefault();
				if ( select.visible() ) {
					select.prev();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.DOWN:
				event.preventDefault();
				if ( select.visible() ) {
					select.next();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.PAGEUP:
				event.preventDefault();
				if ( select.visible() ) {
					select.pageUp();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.PAGEDOWN:
				event.preventDefault();
				if ( select.visible() ) {
					select.pageDown();
				} else {
					onChange(0, true);
				}
				break;
			
			// matches also semicolon
			case options.multiple && $.trim(options.multipleSeparator) == "," && KEY.COMMA:
			case KEY.TAB:
			case KEY.RETURN:
				if( selectCurrent() ) {
					// stop default to prevent a form submit, Opera needs special handling
					event.preventDefault();
					blockSubmit = true;
					return false;
				}
				break;
				
			case KEY.ESC:
				select.hide();
				break;
				
			default:
				clearTimeout(timeout);
				timeout = setTimeout(onChange, options.delay);
				break;
		}
	}).focus(function(){
		// track whether the field has focus, we shouldn't process any
		// results if the field no longer has focus
		hasFocus++;
	}).blur(function() {
		hasFocus = 0;
		if (!config.mouseDownOnSelect) {
			hideResults();
		}
	}).click(function() {
		// show select when clicking in a focused field
		if ( hasFocus++ > 1 && !select.visible() ) {
			onChange(0, true);
		}
	}).bind("search", function() {
		// TODO why not just specifying both arguments?
		var fn = (arguments.length > 1) ? arguments[1] : null;
		function findValueCallback(q, data) {
			var result;
			if( data && data.length ) {
				for (var i=0; i < data.length; i++) {
					if( data[i].result.toLowerCase() == q.toLowerCase() ) {
						result = data[i];
						break;
					}
				}
			}
			if( typeof fn == "function" ) fn(result);
			else $input.trigger("result", result && [result.data, result.value]);
		}
		$.each(trimWords($input.val()), function(i, value) {
			request(value, findValueCallback, findValueCallback);
		});
	}).bind("flushCache", function() {
		cache.flush();
	}).bind("setOptions", function() {
		$.extend(options, arguments[1]);
		// if we've updated the data, repopulate
		if ( "data" in arguments[1] )
			cache.populate();
	}).bind("unautocomplete", function() {
		select.unbind();
		$input.unbind();
		$(input.form).unbind(".autocomplete");
	});
	
	
	function selectCurrent() {
		var selected = select.selected();
		if( !selected )
			return false;
		
		var v = selected.result;
		previousValue = v;
		
		if ( options.multiple ) {
			var words = trimWords($input.val());
			if ( words.length > 1 ) {
				var seperator = options.multipleSeparator.length;
				var cursorAt = $(input).selection().start;
				var wordAt, progress = 0;
				$.each(words, function(i, word) {
					progress += word.length;
					if (cursorAt <= progress) {
						wordAt = i;
						return false;
					}
					progress += seperator;
				});
				words[wordAt] = v;
				// TODO this should set the cursor to the right position, but it gets overriden somewhere
				//$.Autocompleter.Selection(input, progress + seperator, progress + seperator);
				v = words.join( options.multipleSeparator );
			}
			v += options.multipleSeparator;
		}
		
		$input.val(v);
		hideResultsNow();
		$input.trigger("result", [selected.data, selected.value]);
		return true;
	}
	
	function onChange(crap, skipPrevCheck) {
		if( lastKeyPressCode == KEY.DEL ) {
			select.hide();
			return;
		}
		
		var currentValue = $input.val();
		
		if ( !skipPrevCheck && currentValue == previousValue )
			return;
		
		previousValue = currentValue;
		
		currentValue = lastWord(currentValue);
		if ( currentValue.length >= options.minChars) {
			$input.addClass(options.loadingClass);
			if (!options.matchCase)
				currentValue = currentValue.toLowerCase();
			request(currentValue, receiveData, hideResultsNow);
		} else {
			stopLoading();
			select.hide();
		}
	};
	
	function trimWords(value) {
		if (!value)
			return [""];
		if (!options.multiple)
			return [$.trim(value)];
		return $.map(value.split(options.multipleSeparator), function(word) {
			return $.trim(value).length ? $.trim(word) : null;
		});
	}
	
	function lastWord(value) {
		if ( !options.multiple )
			return value;
		var words = trimWords(value);
		if (words.length == 1) 
			return words[0];
		var cursorAt = $(input).selection().start;
		if (cursorAt == value.length) {
			words = trimWords(value)
		} else {
			words = trimWords(value.replace(value.substring(cursorAt), ""));
		}
		return words[words.length - 1];
	}
	
	// fills in the input box w/the first match (assumed to be the best match)
	// q: the term entered
	// sValue: the first matching result
	function autoFill(q, sValue){
		// autofill in the complete box w/the first match as long as the user hasn't entered in more data
		// if the last user key pressed was backspace, don't autofill
		if( options.autoFill && (lastWord($input.val()).toLowerCase() == q.toLowerCase()) && lastKeyPressCode != KEY.BACKSPACE ) {
			// fill in the value (keep the case the user has typed)
			$input.val($input.val() + sValue.substring(lastWord(previousValue).length));
			// select the portion of the value not typed by the user (so the next character will erase)
			$(input).selection(previousValue.length, previousValue.length + sValue.length);
		}
	};

	function hideResults() {
		clearTimeout(timeout);
		timeout = setTimeout(hideResultsNow, 200);
	};

	function hideResultsNow() {
		var wasVisible = select.visible();
		select.hide();
		clearTimeout(timeout);
		stopLoading();
		if (options.mustMatch) {
			// call search and run callback
			$input.search(
				function (result){
					// if no value found, clear the input box
					if( !result ) {
						if (options.multiple) {
							var words = trimWords($input.val()).slice(0, -1);
							$input.val( words.join(options.multipleSeparator) + (words.length ? options.multipleSeparator : "") );
						}
						else {
							$input.val( "" );
							$input.trigger("result", null);
						}
					}
				}
			);
		}
	};

	function receiveData(q, data) {
		if ( data && data.length && hasFocus ) {
			stopLoading();
			select.display(data, q);
			autoFill(q, data[0].value);
			select.show();
		} else {
			hideResultsNow();
		}
	};

	function request(term, success, failure) {
		
		if (!options.matchCase)
			term = term.toLowerCase();
		
		var data = cache.load(term);
		
		// recieve the cached data
		if (data && data.length && lastCacheLength < options.max) {
			success(term, data);
			lastCacheLength = data.length;
		// if an AJAX url has been supplied, try loading the data now
		} else if( (typeof options.url == "string") && (options.url.length > 0) ){
			
			var extraParams = {
				timestamp: +new Date()
			};
			$.each(options.extraParams, function(key, param) {
				extraParams[key] = typeof param == "function" ? param() : param;
			});
			
			$.ajax({
				// try to leverage ajaxQueue plugin to abort previous requests
				mode: "abort",
				// limit abortion to this input
				port: "autocomplete" + input.name,
				dataType: options.dataType,
				url: options.url,
				data: $.extend({
					q: lastWord(term),
					limit: options.max
				}, extraParams),
				success: function(data) {
					var parsed = options.parse && options.parse(data) || parse(data);
					cache.add(term, parsed);
					lastCacheLength = parsed.length;
					success(term, parsed);
				}
			});
		} else {
			// if we have a failure, we need to empty the list -- this prevents the the [TAB] key from selecting the last successful match
			select.emptyList();
			failure(term);
		}
	};
	
	function parse(data) {
		var parsed = [];
		var rows = data.split("\n");
		for (var i=0; i < rows.length; i++) {
			var row = $.trim(rows[i]);
			if (row) {
				row = row.split("|");
				parsed[parsed.length] = {
					data: row,
					value: row[0],
					result: options.formatResult && options.formatResult(row, row[0]) || row[0]
				};
			}
		}
		return parsed;
	};

	function stopLoading() {
		$input.removeClass(options.loadingClass);
	};

};

$.Autocompleter.defaults = {
	inputClass: "ac_input",
	resultsClass: "ac_results",
	loadingClass: "ac_loading",
	minChars: 1,
	delay: 400,
	matchCase: false,
	matchSubset: true,
	matchContains: true, //Modified by kenaniah
	cacheLength: 10,
	max: 100,
	mustMatch: false,
	extraParams: {},
	selectFirst: true,
	formatItem: function(row) { return row[0]; },
	formatMatch: null,
	autoFill: false,
	width: 0,
	multiple: false,
	multipleSeparator: ", ",
	highlight: function(value, term) {
		return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");
	},
    scroll: true,
    scrollHeight: 180
};

$.Autocompleter.Cache = function(options) {

	var data = {};
	var length = 0;
	
	function matchSubset(s, sub) {
		if (!options.matchCase){ 
			s = s.toLowerCase();
			sub = sub.toLowerCase();
		}
		var i = s.indexOf(sub);
		if (options.matchContains == "word"){
			i = s.toLowerCase().search("\\b" + sub.toLowerCase());
		}
		if (i == -1) return false;
		return i == 0 || options.matchContains;
	};
	
	function add(q, value) {
		if (length > options.cacheLength){
			flush();
		}
		if (!data[q]){ 
			length++;
		}
		data[q] = value;
	}
	
	function populate(){
		if( !options.data ) return false;
		// track the matches
		var stMatchSets = {},
			nullData = 0;

		// no url was specified, we need to adjust the cache length to make sure it fits the local data store
		if( !options.url ) options.cacheLength = 1;
		
		// track all options for minChars = 0
		stMatchSets[""] = [];
		
		// loop through the array and create a lookup structure
		for ( var i = 0, ol = options.data.length; i < ol; i++ ) {
			var rawValue = options.data[i];
			// if rawValue is a string, make an array otherwise just reference the array
			rawValue = (typeof rawValue == "string") ? [rawValue] : rawValue;
			
			var value = options.formatMatch(rawValue, i+1, options.data.length);
			if ( value === false )
				continue;
				
			var firstChar = value.charAt(0).toLowerCase();
			// if no lookup array for this character exists, look it up now
			if( !stMatchSets[firstChar] ) 
				stMatchSets[firstChar] = [];

			// if the match is a string
			var row = {
				value: value,
				data: rawValue,
				result: options.formatResult && options.formatResult(rawValue) || value
			};
			
			// push the current match into the set list
			stMatchSets[firstChar].push(row);

			// keep track of minChars zero items
			if ( nullData++ < options.max ) {
				stMatchSets[""].push(row);
			}
		};

		// add the data items to the cache
		$.each(stMatchSets, function(i, value) {
			// increase the cache size
			options.cacheLength++;
			// add to the cache
			add(i, value);
		});
	}
	
	// populate any existing data
	setTimeout(populate, 25);
	
	function flush(){
		data = {};
		length = 0;
	}
	
	return {
		flush: flush,
		add: add,
		populate: populate,
		load: function(q) {
			if (!options.cacheLength || !length){
				return null;
			}
			/* 
			 * if dealing w/local data and matchContains than we must make sure
			 * to loop through all the data collections looking for matches
			 */
			if( !options.url && options.matchContains ){
				// track all matches
				var csub = [];
				// loop through all the data grids for matches
				for( var k in data ){
					// don't search through the stMatchSets[""] (minChars: 0) cache
					// this prevents duplicates
					if( k.length > 0 ){
						var c = data[k];
						$.each(c, function(i, x) {
							// if we've got a match, add it to the array
							if (matchSubset(x.value, q)) {
								csub.push(x);
							}
						});
					}
				}				
				return csub;
			} else 
			// if the exact item exists, use it
			if (data[q]){
				return data[q];
			} else
			if (options.matchSubset) {
				var csub = [];
				for (var i = q.length - 1; i >= options.minChars; i--) {
					$.each(data, function(i, c){
						$.each(c, function(i, x) {
							if (matchSubset(x.value, q)) {
								csub[csub.length] = x;
							}
						});
						return csub;
					});
				}
				if(csub.length) return $.unique(csub);
			}
			return null;
		}
	};
};

$.Autocompleter.Select = function (options, input, select, config) {
	var CLASSES = {
		ACTIVE: "ac_over"
	};
	
	var listItems,
		active = -1,
		data,
		term = "",
		needsInit = true,
		element,
		list;
	
	// Create results
	function init() {
		if (!needsInit)
			return;
		element = $("<div/>")
		.hide()
		.addClass(options.resultsClass)
		.css("position", "absolute")
		.appendTo(document.body);
	
		list = $("<ul/>").appendTo(element).mouseover( function(event) {
			if(target(event).nodeName && target(event).nodeName.toUpperCase() == 'LI') {
	            active = $("li", list).removeClass(CLASSES.ACTIVE).index(target(event));
			    $(target(event)).addClass(CLASSES.ACTIVE);            
	        }
		}).click(function(event) {
			$(target(event)).addClass(CLASSES.ACTIVE);
			select();
			// TODO provide option to avoid setting focus again after selection? useful for cleanup-on-focus
			input.focus();
			return false;
		}).mousedown(function() {
			config.mouseDownOnSelect = true;
		}).mouseup(function() {
			config.mouseDownOnSelect = false;
		});
		
		if( options.width > 0 )
			element.css("width", options.width);
			
		needsInit = false;
	} 
	
	function target(event) {
		var element = event.target;
		while(element && element.tagName != "LI")
			element = element.parentNode;
		// more fun with IE, sometimes event.target is empty, just ignore it then
		if(!element)
			return [];
		return element;
	}

	function moveSelect(step) {
		listItems.slice(active, active + 1).removeClass(CLASSES.ACTIVE);
		movePosition(step);
        var activeItem = listItems.slice(active, active + 1).addClass(CLASSES.ACTIVE);
        if(options.scroll) {
            var offset = 0;
            listItems.slice(0, active).each(function() {
				offset += this.offsetHeight;
			});
            if((offset + activeItem[0].offsetHeight - list.scrollTop()) > list[0].clientHeight) {
                list.scrollTop(offset + activeItem[0].offsetHeight - list.innerHeight());
            } else if(offset < list.scrollTop()) {
                list.scrollTop(offset);
            }
        }
	};
	
	function movePosition(step) {
		active += step;
		if (active < 0) {
			active = listItems.size() - 1;
		} else if (active >= listItems.size()) {
			active = 0;
		}
	}
	
	function limitNumberOfItems(available) {
		return options.max && options.max < available
			? options.max
			: available;
	}
	
	function fillList() {
		list.empty();
		var max = limitNumberOfItems(data.length);
		for (var i=0; i < max; i++) {
			if (!data[i])
				continue;
			var formatted = options.formatItem(data[i].data, i+1, max, data[i].value, term);
			if ( formatted === false )
				continue;
			var li = $("<li/>").html( options.highlight(formatted, term) ).addClass(i%2 == 0 ? "ac_even" : "ac_odd").appendTo(list)[0];
			$.data(li, "ac_data", data[i]);
		}
		listItems = list.find("li");
		if ( options.selectFirst ) {
			listItems.slice(0, 1).addClass(CLASSES.ACTIVE);
			active = 0;
		}
		// apply bgiframe if available
		if ( $.fn.bgiframe )
			list.bgiframe();
	}
	
	return {
		display: function(d, q) {
			init();
			data = d;
			term = q;
			fillList();
		},
		next: function() {
			moveSelect(1);
		},
		prev: function() {
			moveSelect(-1);
		},
		pageUp: function() {
			if (active != 0 && active - 8 < 0) {
				moveSelect( -active );
			} else {
				moveSelect(-8);
			}
		},
		pageDown: function() {
			if (active != listItems.size() - 1 && active + 8 > listItems.size()) {
				moveSelect( listItems.size() - 1 - active );
			} else {
				moveSelect(8);
			}
		},
		hide: function() {
			element && element.hide();
			listItems && listItems.removeClass(CLASSES.ACTIVE);
			active = -1;
		},
		visible : function() {
			return element && element.is(":visible");
		},
		current: function() {
			return this.visible() && (listItems.filter("." + CLASSES.ACTIVE)[0] || options.selectFirst && listItems[0]);
		},
		show: function() {
			var offset = $(input).offset();
			element.css({
				width: typeof options.width == "string" || options.width > 0 ? options.width : $(input).width(),
				top: offset.top + input.offsetHeight,
				left: offset.left
			}).show();
            if(options.scroll) {
                list.scrollTop(0);
                list.css({
					maxHeight: options.scrollHeight,
					overflow: 'auto'
				});
				
                if($.browser.msie && typeof document.body.style.maxHeight === "undefined") {
					var listHeight = 0;
					listItems.each(function() {
						listHeight += this.offsetHeight;
					});
					var scrollbarsVisible = listHeight > options.scrollHeight;
                    list.css('height', scrollbarsVisible ? options.scrollHeight : listHeight );
					if (!scrollbarsVisible) {
						// IE doesn't recalculate width when scrollbar disappears
						listItems.width( list.width() - parseInt(listItems.css("padding-left")) - parseInt(listItems.css("padding-right")) );
					}
                }
                
            }
		},
		selected: function() {
			var selected = listItems && listItems.filter("." + CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);
			return selected && selected.length && $.data(selected[0], "ac_data");
		},
		emptyList: function (){
			list && list.empty();
		},
		unbind: function() {
			element && element.remove();
		}
	};
};

$.fn.selection = function(start, end) {
	if (start !== undefined) {
		return this.each(function() {
			if( this.createTextRange ){
				var selRange = this.createTextRange();
				if (end === undefined || start == end) {
					selRange.move("character", start);
					selRange.select();
				} else {
					selRange.collapse(true);
					selRange.moveStart("character", start);
					selRange.moveEnd("character", end);
					selRange.select();
				}
			} else if( this.setSelectionRange ){
				this.setSelectionRange(start, end);
			} else if( this.selectionStart ){
				this.selectionStart = start;
				this.selectionEnd = end;
			}
		});
	}
	var field = this[0];
	if ( field.createTextRange ) {
		var range = document.selection.createRange(),
			orig = field.value,
			teststring = "<->",
			textLength = range.text.length;
		range.text = teststring;
		var caretAt = field.value.indexOf(teststring);
		field.value = orig;
		this.selection(caretAt, caretAt + textLength);
		return {
			start: caretAt,
			end: caretAt + textLength
		}
	} else if( field.selectionStart !== undefined ){
		return {
			start: field.selectionStart,
			end: field.selectionEnd
		}
	}
};

})(jQuery);
$(document).ready(function(){
	
	//Popup
	$("#expandButtonTemplate").delegate('.buttonUpdateRecs', 'click', function(event){
		
		event.stopImmediatePropagation();
		event.preventDefault();
		
		var $self = $("#expandButtonTemplate"); 
		var data = $self.data();
		var params = data.recparams;
		params.reason = tinyMCE.get("recs_popup_editor").getContent();
		params.both_ways = $self.find(":checkbox").is(":checked");
		params.rec_location = 'popup';
		
		$self.find(".error,.success").fadeOut('fast');
		
		$self.find(".progress-img").show();
		
		//Get the rec data
		$.ajax({
			url: "/rec_data.php?save_rec=1",
			type: "POST",
			data: params,
			dataType: 'json',
			success: function(data) {
			
				$self.find(".progress-img").hide();
			
				if(data.success){
					$self.find(".success").html("Your recommendation was saved successfully.").fadeIn('fast');
				}else{
					var error_contents = "<ul>";
					for(var i=0; i < data.errors.length; i++){
						error_contents += "<li>" + data.errors[i] + "</li>";
					}
					error_contents += "</ul>";
					$self.find(".error").html(error_contents).fadeIn('fast');
				}
			}
		});
	});
	
	//Page
	$("#addRecsButton").click(function(event){
		
		event.stopImmediatePropagation();
		event.preventDefault();
		
		var $self = $("#addRecommendation");
		var data = {};
		$.each($self.serializeArray(), function(index, value){
			data[value.name] = value.value;
		});
		
		var params = {
			totype: data.from_type, //set to data.to_type when cross recs is enabled
			toid: data.to_id,
			fromtype: data.from_type,
			fromid: data.from_id,
			reason: tinyMCE.get("reason").getContent(),
			both_ways: $self.find(":checkbox").is(":checked"),
			rec_location: 'page'
		};
		
		$self.find(".error,.success").fadeOut('fast');
		
		$self.find(".progress-img").show();
		
		//Get the rec data
		$.ajax({
			url: "/rec_data.php?save_rec=1",
			type: "POST",
			data: params,
			dataType: 'json',
			success: function(data) {
			
				$self.find(".progress-img").hide();
			
				if(data.success){
					
					$self.find(".success").html("Your recommendation was saved successfully.").fadeIn('fast');
					
					var rec = data.data;
					
					//Get the right table to update
					var classType = rec.to_type + "RecsList";

				    var newRow = '';
				    newRow = newRow + "<tr>";
				    newRow = newRow + "<td class=\'tableTitle\'><a rel=\'nofollow\' href=\'/" + rec.to_type + "/" + rec.to.url_slug + "/recommendations/add\'>" + rec.to.name + "</a></td>";
				    newRow = newRow + "<td class=\'tableEditRec\'><div class=\'expandButton\'><div><h6 class=\'editRecs\' data-totype=\'" + rec.to_type + "\' data-toid=\'" + rec.to_id + "\' data-fromtype=\'" + rec.from_type + "\' data-fromid=\'" + rec.from_id + "\'>Edit rec</h6></div></div></td>";
				    newRow = newRow + "<td class=\'tableDate\'><span>" + rec.pretty_date + "</span></td>";
				    newRow = newRow + "<td class=\'tableRecStatus\'><span>" + rec.status + "</span></td>";
				    newRow = newRow + "<td class=\'tableDel\'><a class=\'delButton\' rel=\'nofollow\' href=\'/" + rec.from_type + "/" + rec.from.url_slug + "/recommendations/add\?id=" + rec.from_id + "\&del=true\' onClick='return confirmDelete(\"recommendation\")'><span>del</span></a></td>";
				    newRow = newRow + "</tr>";

				    $("." + classType + " tr:first").after(newRow);
					
				}else{
					var error_contents = "<ul>";
					for(var i=0; i < data.errors.length; i++){
						error_contents += "<li>" + data.errors[i] + "</li>";
					}
					error_contents += "</ul>";
					$self.find(".error").html(error_contents).fadeIn('fast');
				}
			}
		});
	});
	
	/**
	 * Note for TinyMCE inside jquery ui dialogs (or hidden editors in general), you need to destroy / recreate the editor every time you 
	 * hide / show it, respectively.
	 */ 
	
    $('body').delegate('.expandButton', 'click', function(event){

    	//Cancel the events
    	event.stopImmediatePropagation();
		event.preventDefault();
		
		var data = $(this).find("h6").data();
		
		//Data posted in ajax request
		var params = {
			totype: data.totype,
			toid: data.toid,
			fromtype: data.fromtype,
			fromid: data.fromid
		};
		
		//Get the rec data
		$.ajax({
			url: "/rec_data.php",
			type: "POST",
			data: params,
			dataType: 'json',
			success: function(data) {
				//Alert errors
				if(data.error){
					alert(data.error);
					return;
				}
				
				var $self = $("#expandButtonTemplate"); 
				var clickFunc = function(event){ $self.dialog('close'); };
				
				//Set up the dialog
				$self
					.dialog({autoOpen: false})
					.dialog("option", {
						title: data.my_rec_exists ? "Update Recommendation" : "Add Recommendation",
						modal: true,
						width: 380,
						resizable: false,
						draggable: false,
						position: {
							my: 'left top',
							at: 'left bottom',
							of: $(event.target).is("h6") ? $(event.target).parent() : $(event.target),
							offset: "0 0" //left top
						},
						open: function(event, ui){
							$(".ui-widget-overlay")
								.bind('click', clickFunc)
								.addClass("no-overlay")
							;
						},
						close: function(event, ui){
							$(".ui-widget-overlay")
								.removeClass("no-overlay")
								.unbind('click', clickFunc)
							;
						}
					})
				;
				//Set up the header
				$self.prev().removeClass("ui-widget-header").addClass("expandButtonHeader");
				
				//Set up the dialog contents
				$self.find(".from_entry_name").html(data.from.name);
				$self.find(".to_entry_name").html(data.to.name);
				$self.find(".exBut-addLink").attr('href', '/' + data.from_type + '/' + data.from.url_slug + '/recommendations/add')
				$self.find(":checkbox").prop("checked", data.my_reverse_rec_exists);
				$self.find(".error").html("").hide();
				$self.find(".success").html("").hide();
				
				//Destroy the old editor
				tinyMCE.execCommand('mceRemoveControl', false, "recs_popup_editor");
				
				//Open the dialog
				$self.dialog("open");
								
				//Set up tinymce
				tinyMCE.execCommand('mceAddControl', false, "recs_popup_editor");
				tinyMCE.get("recs_popup_editor").setContent(data.reason ? data.reason : "");
				tinyMCE.execCommand("recs_popup_editor", "mceFocus");
				
				//Save the data params
				$self.data('recparams', params);
				
			}
		});
		
		return false;
		
    });
		
});


function contractButton(){
	$('#expandedButton div div').remove();
	$('#expandedButton').attr('id','').removeClass('expandedButton');
}
$(document).ready(function(){
	
	//------------------------------------------
	// Item lists
	//------------------------------------------
	$("DIV.list-container").each(function(){
		$(this).data('append-count', $(this).children().length);
	});
	
	//------------------------------------------
	// Auto complete fields
	//------------------------------------------
	$('INPUT.autocomplete').each(function(){
		
		var defaults = {
			minChars:3,
			cacheLength:50,
			max:50,
			delay: 10,
			mustMatch: true,
			dataType: "json"
		};
		
		var options = $.extend(defaults, $(this).metadata());
		options.formatItem = function(item){ return item.name; };
		
		if(options.mode) options.url = "/autocomplete.php?mode=" + options.mode;
		
		$(this).autocomplete(options.url, options);
		
		//Do we supply another field with the ID value?
		if(options.field){
			$(this).result(function(event, item){
				$(options.field).val(item.id);
			});
		}
		
	});
	
	//------------------------------------------
	// Form fields with replacement values
	//------------------------------------------
	$("INPUT.defaultReplace,TEXTAREA.defaultReplace")
		.focus(defaultFocus)
		.blur(defaultBlur)
		.change(defaultFocus)
		.blur();
	
	$("FORM").submit(function(){
		$(this).find(".defaultReplace").each(function(){
			if($(this).val() == $(this).attr("title")){
				$(this).val("");
			}
		});
	});
	
	//------------------------------------------
	// Event handlers
	//------------------------------------------
	$(".click").each(function(){
		var options = $(this).metadata();
		if(options.clickHandler) $(this).click(options.clickHandler);
	});
	$(".change").each(function(){
		var options = $(this).metadata();
		if(options.changeHandler) $(this).change(options.changeHandler);
	});
	
	
}); // End Document Ready

//Copies an element to a list container
function appendTo(){
	
	var data = $(this).metadata();
	var $dest = $(data.which);
	var $el = $(data.appendFrom ? data.appendFrom : $dest.metadata().appendFrom);
	
	var $copy = $el.clone(true);
	var num = $dest.data("append-count");
	
	$copy.find("[name]").each(function(){
		var n = $(this).attr("name");
		n = n.replace("[]", "[" + num + "]")
		$(this).attr("name", n);
	});
	
	$copy.attr('id', null);
	
	$dest.append($copy);
	$dest.data("append-count", num + 1);
	
	return false;
	
};

//Handler for a default-replace input
function defaultBlur(){
	if ($(this).val() == "" || $(this).val() == $(this).attr("title")) {
		$(this).addClass("default-field").val($(this).attr("title"));
	}
};

//Handler for a default-replace input
function defaultFocus() {
	if ($(this).val() == $(this).attr("title")) {
		$(this).val("");
		$(this).removeClass("default-field");
	} else {
		$(this).prev("label").hide();
		$(this).removeClass("default-field");
	}
}

//Handler for the search type switcher
function changeTitleSearchType(){
	
	var field = $("#title-search");
	var val = field.val() == field.attr("title") ? "" : field.val();
	if(!val) return;
	
	var url = "/" + $(this).val() + "/all?" + $.param({"name": val});
	
	window.location = url;
	
}

function updatePerPage(field){
	window.location='?per_page=' + field.value;
}
$().ready(function() {
	
	amp = jQuery.support.hrefNormalized ? '&' : '&amp;';

	//Advanced filter click
	$('#advanced_filter').click(function() {
		
		$('#advanced_filter_main_dropdown').toggle();
		
		//Are we switching to visible?
		visible = $('#qf_overlay').css('display') == 'none';
		
		$('#qf_overlay').css('display', visible ? '' : 'none');
		advanced = "";
		if($('#advanced_filter span span').html().indexOf("advanced") != -1) advanced = " advanced";
		$('#advanced_filter span span').toggleClass('showMore').toggleClass('showLess');
		
		return false;
	});
	
	//Show more tags click
	$('#advanced_filter_tags').click(function() {
		$('#advanced_more_tags').toggle();
		$('#advanced_filter_tags').toggleClass('moreTagsSmall').toggleClass('lessTagsSmall');
		curr = $('#advanced_filter_tags').attr("class");
		$('#advanced_filter_tags').html( curr == 'moreTagsSmall' ? '+ more tags' : '- less tags' );
		return false;
	});
	
	//Tags click
	$(".filter").click(function(){
		current = $(this).find("span").attr('class');
		if(current == 'null') current = 'include';
		else if(current == 'include') current = $(this).hasClass('inclusive') ? 'null' : 'exclude';
		else current = $(this).hasClass('ternary') ? 'null' : 'include';
		$(this).find("span").removeClass().addClass(current);
	});
	
	$(".formStudio").autocomplete(
		"/autocomplete.php?type=studios", 
		{
			minChars:3,
			cacheLength:50,
			max:50,
			delay: 10
		}
	);
	
	$(".formArtist").autocomplete(
		"/autocomplete.php?type=people", 
		{
			minChars:3,
			cacheLength:50,
			max:50,
			delay: 10
		}
	);
	
	$(".formAuthor").autocomplete(
		"/autocomplete.php?type=people", 
		{
			minChars:3,
			cacheLength:50,
			max:50,
			delay: 10
		}
	);
	
});

var ajax_filter_query_string;
var ajax_filter_callback_func;
var amp = '&';

function filter_button_update(el, show_alert){
	if(!$) return;
	
	if(show_alert && show_alert.length){
		alert(show_alert);
		return;
	}
	
	$(el).find("span span").toggleClass('off').toggleClass('on');
}

function qf_submit(filter_callback_func){ //arg not required
	
	if(!$) return;
	
	var $qs = $.query.copy().EMPTY();
	$qs.SET('ft', 'qf');
	
	var val, name, which;
	
	//Get values from the form
	$("#qfForm :input").each( function(){ 
		val = $(this).val();
		name = $(this).attr("name");
		
		//Handle default replace fields
		if($(this).hasClass("defaultReplace") && val == $(this).attr("title")) val = "";
		
		if(val.length && name.length){
			
			$qs.SET(name, val);
			
		}
		
	});
	
	$(".headerBarBox .switch").map(function(){ 
		//Figure out which class to search for
		which = $(this).find("span span").hasClass("qs_invert") ? 'off' : 'on';
		if($(this).find("span span").hasClass(which)){
			
			$qs.SET($(this).attr("name"), $(this).attr("value"));

		}
	});
	if(filter_callback_func){
		//Call the loading function in the mean time
		if(typeof showFilterLoading == 'function') showFilterLoading();
		//Dispatch the request
		var dispatcher = new Ajax( "POST", "/ajax_filter.php" + $qs.toString(), false, true);
		dispatcher.callFunction( 'ajax_get_filtered_entries', [filter_callback_func]);
		ajax_filter_query_string = $qs.toString();
		ajax_filter_callback_func = filter_callback_func;
	}else{
		location.href = get_filter_destination("./all")+$qs.toString().replace(/&/, amp);
	}
}

//Used for characters only, as the information is very different than anime/manga
function qc_submit(filter_callback_func) { //arg not required
	
	if(!$) return;
	
	var $qs = $.query.copy().EMPTY();

	//Get values from the form
	$("#qaForm :input").each( function(){ 
		val = $(this).val();
		name = $(this).attr("name");
		
		//Handle default replace fields
		if($(this).hasClass("defaultReplace") && val == $(this).attr("title")) val = "";
		
		if(val.length && name.length){
			
			$qs.SET(name, val);
			
		}
		
	});

	//Get tags
	var include_tags = [];
	var exclude_tags = [];
	$(".filterTags .filter span").map(function(){ 
		if($(this).hasClass("include")) include_tags.push($(this).attr("value"));
		if($(this).hasClass("exclude")) exclude_tags.push($(this).attr("value"));
	});

	$qs.SET("include_tags", include_tags.length ? include_tags.join(",") : "none");
	$qs.SET("exclude_tags", exclude_tags.length ? exclude_tags.join(",") : "none");

	if(filter_callback_func){
		//Call the loading function in the mean time
		if(typeof showFilterLoading == 'function') showFilterLoading();
		//Dispatch the request
		var dispatcher = new Ajax( "POST", "/ajax_filter.php" + $qs.toString(), false, true);
		dispatcher.callFunction( 'ajax_get_filtered_entries', [filter_callback_func]);
		ajax_filter_query_string = $qs.toString();
		ajax_filter_callback_func = filter_callback_func;
	}else{
		location.href = get_filter_destination("/characters/all") + $qs.toString().replace(/&/, amp);
	}
}

//Used for people only, as the information is very different than anime/manga
function qp_submit() { 
	
	if(!$) return;
	
	var $qs = $.query.copy().EMPTY();

	//Get values from the form
	$("#qaForm :input").each( function(){ 
		val = $(this).val();
		name = $(this).attr("name");
		
		//Handle default replace fields
		if($(this).hasClass("defaultReplace") && val == $(this).attr("title")) val = "";
		
		if(val.length && name.length){
			
			$qs.SET(name, val);
			
		}
		
	});

	location.href = get_filter_destination("/people/all") + $qs.toString().replace(/&/, amp);
}

function qa_submit(filter_callback_func){ //arg not required
	
	if(!$) return;
	
	var $qs = $.query.copy().EMPTY();
	
	var name, val, which;
	
	//Get values from the form
	$("#qaForm :input").each( function(){ 
		val = $(this).val();
		name = $(this).attr("name");
		
		//Handle default replace fields
		if($(this).hasClass("defaultReplace") && val == $(this).attr("title")) val = "";
		
		if(val.length && name.length){
			
			$qs.SET(name, val);
			
		}
		
	});
	
	//Get show only switch
	$(".filterShowOnly .switch").map(function(){ 
		//Figure out which class to search for
		which = $(this).find("span span").hasClass("qs_invert") ? 'off' : 'on';
		if($(this).find("span span").hasClass(which)){
			
			$qs.SET($(this).attr("name"), $(this).attr("value"));
			
		}
	});
	
	//Get types
	var include_types = [];
	$(".filterType .filter span").map(function(){ 
		if($(this).hasClass("include")) include_types.push($(this).attr("value"));
	});
	
	$qs.SET("include_types", include_types.length ? include_types.join(",") : "none");
	
	//Get tags
	var include_tags = [];
	var exclude_tags = [];
	$(".filterTags .filter span").map(function(){ 
		if($(this).hasClass("include")) include_tags.push($(this).attr("value"));
		if($(this).hasClass("exclude")) exclude_tags.push($(this).attr("value"));
	});
	
	//Get status
	var include_status = [];
	$(".filterStatus .filter span").map(function(){ 
		if($(this).hasClass("include")) include_status.push($(this).attr("value"));
	});
	
	$qs.SET("include_tags", include_tags.length ? include_tags.join(",") : "none");
	$qs.SET("exclude_tags", exclude_tags.length ? exclude_tags.join(",") : "none");
	$qs.SET("include_status", include_status.length ? include_status.join(",") : "none");
	
	if($("#advanced_more_tags .filter span[class!='null']").length){
		
		$qs.SET("mt", "1"); //Show more tags state
		
	}
	
	if(filter_callback_func){
		//Call the loading function in the mean time
		if(typeof showFilterLoading == 'function') showFilterLoading();
		//Dispatch the request
		var dispatcher = new Ajax( "POST", "/ajax_filter.php" + $qs.toString(), false, true);
		dispatcher.callFunction( 'ajax_get_filtered_entries', [filter_callback_func]);
		ajax_filter_query_string = $qs.toString();
		ajax_filter_callback_func = filter_callback_func;
	}else{
		location.href = get_filter_destination("./all")+$qs.toString().replace(/&/, amp);
	}
}

function qu_submit(filter_callback_func){ //arg not required
	
	if(!$) return;
	
	var $qs = $.query.copy();
	
	//Get values from the form
	$("#qaForm :input").each( function(){ 
		val = $(this).val();
		name = $(this).attr("name");
		
		//Handle default replace fields
		if($(this).hasClass("defaultReplace") && val == $(this).attr("title")) val = "";
		
		if(val.length && name.length){
			$qs.SET(name, val);
		}
		
	});
	
	if(filter_callback_func){
		//Call the loading function in the mean time
		if(typeof showFilterLoading == 'function') showFilterLoading();
		//Dispatch the request
		var dispatcher = new Ajax( "POST", "/ajax_filter.php" + $qs.toString(), false, true);
		dispatcher.callFunction( 'ajax_get_filtered_entries', [filter_callback_func]);
		ajax_filter_query_string = $qs.toString();
		ajax_filter_callback_func = filter_callback_func;
	}else{
		location.href = get_filter_destination("./all")+$qs.toString().replace(/&/, amp);
	}
}

function get_filter_destination(dest){
	var page = $.url.attr("directory").split("/").pop();
	if(page == "anime" || page == "manga" || page == "all"){
		return "";
	}else{
		return dest;
	}
	
}

function doSearch(obj){
	if(obj.value.length){
		$('#results').load('?search='+escape(obj.value));
	}
}

$().ready(function() {
	$("#anime_id,#anime_id1,#anime_id2").autocomplete(
		"/autocomplete.php?type=anime", 
		{
			minChars:3,
			cacheLength:50,
			max:50,
			delay: 10
		}
	);
});

$().ready(function() {
	$("#manga_id,#manga_id1,#manga_id2").autocomplete(
		"/autocomplete.php?type=manga", 
		{
			minChars:3,
			cacheLength:50,
			max:50,
			delay: 10
		}
	);
});

$().ready(function() {
	$("#tag_id").autocomplete(
		"/autocomplete.php?type=tag", 
		{
			minChars:3,
			cacheLength:50,
			max:50,
			delay: 10
		}
	);
});

function view(num){
	$('#view0').hide();
	$('#view1').hide();
	$('#view2').hide();
	$('#view'+num).show();
}
var addthis_config = {              
	username: "sothis", 
	ui_delay: 10000
}
// JavaScript Document
function toggle_friend(friend_id){
	
	el = $("span.friend"+friend_id+" span");
	if(el.hasClass("addFriend")){
		action = 'add';
	}else{
		action = 'remove';
	}
	
	$("img.friend"+friend_id).removeClass('hidden');
	x_ajax_manage_friend(friend_id, action, toggle_friend_cb);
	
}

function toggle_friend_cb(response){
	if(response.success){
		if(response.action == 'remove'){
			$("span.friend"+response.friend_id+" span").removeClass('removeFriend').addClass('addFriend').html("add as friend");
		}else{
			$("span.friend"+response.friend_id+" span").removeClass('addFriend').addClass('removeFriend').html("remove as friend");
		}
	}else{
		alert(response.error);
	}
	$("img.friend"+response.friend_id).addClass('hidden');
	
	displayBadges(response.badges);
	
}
		$(document).ready(function(){
				$("div.screenBrowserPrev").click(function() {
					var obj = $(this);
					var screen_num = obj.next().children('img').attr("id");
					var img_name = obj.next().children('img').attr("name");
					
					screen_num = parseInt(screen_num.substring(3));

					//Go to the last image if you're on the first
					if (screen_num == 1)	{
						screen_num = window.total_screens;
					} else {
						screen_num -= 1;
					}
					
					if(window.total_screens == 0) return false;

					obj.next().children('img').attr("src", "/images/anime/screenshots/" + img_name + screen_num + ".jpg");
					obj.next().children('img').attr("id", "img"+screen_num);
					
					return false;
				});

				$("div.screenBrowserNext a").click(function() {
					var obj = $(this);
					var screen_num = obj.parent().prev().children('img').attr("id");
					var img_name = obj.parent().prev().children('img').attr("name");
					
					screen_num = parseInt(screen_num.substring(3));
					
					//Go to the last image if you're on the first
					if (screen_num == window.total_screens)	{
						screen_num = 1;
					} else {
						screen_num = screen_num + 1;
					}
					
					if(window.total_screens == 0) return false;

					obj.parent().prev().children('img').attr("src", "/images/anime/screenshots/" + img_name + screen_num + ".jpg");
					obj.parent().prev().children('img').attr("id", "img"+screen_num);
					
					return false;
				});
		});	//end jquery load
// JavaScript Document
String.prototype.trim = function(){
	return this.replace(/^\s+|\s+$/g,"");
}
String.prototype.ltrim = function(){
	return this.replace(/^\s+/,"");
}
String.prototype.rtrim = function()
{
	return this.replace(/\s+$/,"");
}
$(document).ready(function() {
    createJsSelect();
    
    $(".jsSelect dt a").click(function() {
        $(".jsSelect dd ul").toggle();
    });

    $(document).bind('click', function(e) {
        var $clicked = $(e.target);
        if (! $clicked.parents().hasClass("jsSelect"))
            $(".jsSelect dd ul").hide();
    });
                
    $(".jsSelect dd ul li a").click(function() {
        var text = $(this).html();
        $(".jsSelect dt a").html(text);
        $(".jsSelect dd ul").hide();
        
        var source = $("#selectSource");
        source.val($(this).find("span.value").html());
    });
});

function createJsSelect(){
    
	var source = $("#selectSource");
    var selected = source.find("option[selected]");
    var options = $("option", source);
    
    $("#selectContainer").append('<dl id="selectTarget" class="jsSelect" style="margin: 0px;"></dl>')
    $("#selectTarget").append('<dt><a href="javascript:;">' + selected.text() + 
        '<span class="value">' + selected.val() + 
        '</span></a></dt>')
    $("#selectTarget").append('<dd><ul></ul></dd>')

    options.each(function(){
        $("#selectTarget dd ul").append('<li><a href="javascript:;">' + 
            $(this).text() + '<span class="value">' + 
            $(this).val() + '</span></a></li>');
    });
    selectSource = document.getElementById('selectSource');
    selectSource.style.cssText='display: none; width: 0;';
    
}
//Saves the data from a table row
function saveRow(button){
	tr = button.parentNode.parentNode;
	
	inputs = tr.getElementsByTagName("INPUT");

	
	data = new Object();
	data['id'] = tr.getElementsByTagName("TD")[0].innerHTML;
	//Filter out links?
	if(tr.getElementsByTagName("TD")[0].childNodes[0].nodeType != 3) data['id'] = tr.getElementsByTagName("TD")[0].firstChild.innerHTML;
	
	for(i = 0; i < inputs.length; i++){
		
		if(!inputs[i].name.length) continue;
		if(inputs[i].tagName == "INPUT" && inputs[i].type == "checkbox" && !inputs[i].checked) continue;
		data[inputs[i].name] = inputs[i].value;
		
	}
	
	if(data['end_year']) {
		ok = confirm("Are you sure you want to mark this series as completed?");
		if(!ok) return;
	}
	
	tr.getElementsByTagName("IMG")[0].style.display = '';
	
	$.post("?", data, saveRowcb);
	
}

function saveRowcb(response){
	window.location.replace(window.location.href);
}
$(document).ready(function(){
	
	$(".closeAchievementDialog,.blockOverlay").live('click', function(){
		$.unblockUI();
		return false;
	});

});

function displayBadges(data)
{
	
	//Only run if we have data
	if(!data || !data.badges) return;
	
	var extra = data['more_added'];
	var badges = data['badges'];
	
	//Don't display popup if there aren't any badges
	if(!badges.length) return;
	
	var $dialog = $("#achievementDialog");
	var $block = $("#badgeBlockHTML div.badgeBlock");
	
	if(parseInt(extra) > 0){
		$dialog.find(".badgeAdditional").show().find(".additionalNum").html(extra);
	}else{
		$dialog.find(".badgeAdditional").hide();
	}
	
	$("#badgeContainer").empty();
	
	$.each(badges, function(k, badge){
		var $newblock = $block.clone();
		
		$newblock.find(".badgeLink").attr('href', '/badges/' + badge['url_slug']).last().html(badge['is_added'] ? badge['name'] : '<strong>LOST</strong>: ' + badge['name']);
		$newblock.find(".badgeDescription").html(badge['description']);
		$newblock.find(".badgeImage").attr('src', '/images/badges/' + badge['image_path'] + '.png').attr('alt', badge['name']);
                
                //Gift badge stuff
                if (badge['gift_from_user_id'])
                {
                    //Output the gift username/link
                    $newblock.find(".badgeFromUserLink").attr('href', '/users/' + badge['gift_from_user_name']).last().html(badge['gift_from_user_name']);
                    $newblock.find(".badgeFromUser").show();
                    
                    if (badge['gift_message'])
                    {
                       $newblock.find(".badgeGiftMessage").html(badge['gift_message']).show();     
                    }
                }
                
		$newblock.appendTo("#badgeContainer");
		
	});
		
	$.blockUI({ message: $('#achievementDialog') });
	
}
// JavaScript Document
function viewTab(name, parent){
	
	//Make sure jQuery is loaded
	if(!$) return;
	
	if($("#" + parent).find("#" + name + "Tab").length == 0) {
            return;
        }

	//Switch to new tab
	newTab = $("#"+parent).find(".tabViewStack .tab").css("display", "none").end().find("#"+name+"Tab").css("display", "");
	idx = newTab.end().find(".tabViewStack .tab").index(newTab);
	
	//Switch the tab header
	$("#"+parent).find(".tabNavigationBar").children().removeClass("selected").eq(idx).addClass("selected");
}

var seed = 0;
var query = "";

function update(button){
	if(!$) return;
	
	//Make sure the other filter button is off for unwatched and unmarked
	if($("#"+button).attr("name") == "filter"){ 
		change = $("#"+button).attr("value") == "unmarked" ? "anime_not_watched" : "unmarked";
		$(".headerBarBox").find(".switch[value="+change+"] span span").addClass('off').removeClass('on');
		if(change == "anime_not_watched") $(".headerBarBox").find(".switch[value=manga_not_read] span span").addClass('off').removeClass('on');

		//Update off to on
		$("#"+button).find("span span").toggleClass('off').toggleClass('on');
	}
	else if ($("#"+button).attr("name") == "only_friends")	{
		$("#"+button).find("span span").toggleClass('off').toggleClass('on');
	}
	else {
		$("#"+button).find("span span").toggleClass('exclude').toggleClass('on');
	}
	
	$("#recsArea").empty().html($("#recNotice").html());
	
	//Build the query string
	seed = Math.random();
	query = "?ajax=true&seed="+seed;
	$(".headerBarBox .switch").map(function(){ 
		//Figure out which class to search for
		which = $(this).find("span span").hasClass("qs_invert") ? 'exclude' : 'on';
		if($(this).find("span span").hasClass(which)) query += "&" + $(this).attr("name") + "=" + $(this).attr("value");
	});
	
	//Dispatch the query
	$.get(query, {}, handleResult);
}

function defaults(){
	
	if(!$) return;

	//Reset all filters
	$(".headerBarBox").find(".switch span span").map(function(){
		if($(this).hasClass("qs_invert")){
			$(this).addClass('on').removeClass('exclude');
		}else{
			$(this).addClass('off').removeClass('on');
		}
	});
	
	update("none");
	
}

function handleResult(response){
	//Check the seed in the result
	
	html = $(response);
	if(html.eq(0).html() == seed) $("#recsArea").empty().html(html.find("#recsArea").html());
}
//Normal editor
tinyMCE.init({
	mode : "specific_textareas",
	editor_selector : "mceEditor",
	theme : "advanced",
	plugins : "paste,preview,media",
	theme_advanced_buttons1 : "bold,italic,underline,|,paste,pastetext,pasteword,bullist,numlist,|,undo,redo,|,link,unlink,|,preview",
	theme_advanced_buttons2 : "",
	theme_advanced_buttons3 : "",
	theme_advanced_buttons4 : "",
	theme_advanced_toolbar_location : "top",
	theme_advanced_toolbar_align : "left",
	theme_advanced_path : false,
	valid_elements : "em,i,a[href|target=_blank|name|title],strong/b,p,ol,ul,li,span[!style]",
	paste_use_dialog : true,
	paste_create_paragraphs : true,
	paste_create_linebreaks : false,
	paste_force_cleanup_wordpaste : true,
	paste_strip_class_attributes: "all",
	paste_auto_cleanup_on_paste : true,
	paste_convert_headers_to_strong : true,
	paste_convert_middot_lists : true,
	paste_unindented_list_class : "",
	entity_encoding: "raw",
	convert_urls: false
});

//Blog editor
tinyMCE.init({
	mode : "specific_textareas",
	editor_selector : "mceEditorBlog",
	theme : "advanced",
	width : "542",
	height : "450",
	plugins : "paste,preview,media",
	theme_advanced_buttons1 : "bold,italic,underline,strikethrough,paste,bullist,numlist,|,justifyleft,justifycenter,justifyright,|,image,media,|,undo,redo,|,link,unlink,|,preview",
	theme_advanced_buttons2 : "",
	theme_advanced_buttons3 : "",
	theme_advanced_buttons4 : "",
	theme_advanced_toolbar_location : "top",
	theme_advanced_toolbar_align : "left",
	theme_advanced_path : false,
	//valid_elements : "em,i,a[href|target=_blank|name|title],strong/b,p[style],ol,ul,li,span[!style],img[src|title|alt|style|width|height],object[*],embed[*],br",
	paste_use_dialog : true,
	paste_create_paragraphs : true,
	paste_create_linebreaks : false,
	paste_force_cleanup_wordpaste : true,
	paste_strip_class_attributes: "all",
	paste_auto_cleanup_on_paste : true,
	paste_convert_headers_to_strong : true,
	paste_convert_middot_lists : true,
	paste_unindented_list_class : "",
	entity_encoding: "raw",
	convert_urls: false
});

//Full editor
tinyMCE.init({
	mode : "specific_textareas",
	editor_selector : "mceEditorFull",
	theme : "advanced",
	plugins : "paste,preview,media",
	theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,paste,pasteword,|,bullist,numlist,|,justifyleft,justifycenter,justifyright,|,image,media",
	theme_advanced_buttons2 : "charmap,|,link,unlink,anchor,|,undo,redo,|,preview",
	theme_advanced_buttons3 : "",
	theme_advanced_buttons4 : "",
	theme_advanced_toolbar_location : "top",
	theme_advanced_toolbar_align : "left",
	theme_advanced_path : false,
	valid_elements : "em,i,a[href|target=_blank|name|title],strong/b,p[style],ol,ul,li,span[!style],img[src|title|alt|style|width|height],object[*],embed[*],br",
	paste_use_dialog : true,
	paste_create_paragraphs : true,
	paste_create_linebreaks : false,
	paste_force_cleanup_wordpaste : true,
	paste_strip_class_attributes: "all",
	paste_auto_cleanup_on_paste : true,
	paste_convert_headers_to_strong : true,
	paste_convert_middot_lists : true,
	paste_unindented_list_class : "",
	entity_encoding: "raw",
	convert_urls: false
});
/*
Copyright (c) 2005 JSON.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The Software shall be used for Good, not Evil.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

Array.prototype.______array = '______array';

var JSON = {
    org: 'http://www.JSON.org',
    copyright: '(c)2005 JSON.org',
    license: 'http://www.crockford.com/JSON/license.html',

    stringify: function (arg) {
        var c, i, l, s = '', v;

        switch (typeof arg) {
        case 'object':
            if (arg) {
                if (arg.______array == '______array') {
                    for (i = 0; i < arg.length; ++i) {
                        v = this.stringify(arg[i]);
                        if (s) {
                            s += ',';
                        }
                        s += v;
                    }
                    return '[' + s + ']';
                } else if (typeof arg.toString != 'undefined') {
                    for (i in arg) {
                        v = arg[i];
                        if (typeof v != 'undefined' && typeof v != 'function') {
                            v = this.stringify(v);
                            if (s) {
                                s += ',';
                            }
                            s += this.stringify(i) + ':' + v;
                        }
                    }
                    return '{' + s + '}';
                }
            }
            return 'null';
        case 'number':
            return isFinite(arg) ? String(arg) : 'null';
        case 'string':
            l = arg.length;
            s = '"';
            for (i = 0; i < l; i += 1) {
                c = arg.charAt(i);
                if (c >= ' ') {
                    if (c == '\\' || c == '"') {
                        s += '\\';
                    }
                    s += c;
                } else {
                    switch (c) {
                        case '\b':
                            s += '\\b';
                            break;
                        case '\f':
                            s += '\\f';
                            break;
                        case '\n':
                            s += '\\n';
                            break;
                        case '\r':
                            s += '\\r';
                            break;
                        case '\t':
                            s += '\\t';
                            break;
                        default:
                            c = c.charCodeAt();
                            s += '\\u00' + Math.floor(c / 16).toString(16) +
                                (c % 16).toString(16);
                    }
                }
            }
            return s + '"';
        case 'boolean':
            return String(arg);
        default:
            return 'null';
        }
    },
    parse: function (text) {
        var at = 0;
        var ch = ' ';

        function error(m) {
            throw {
                name: 'JSONError',
                message: m,
                at: at - 1,
                text: text
            };
        }

        function next() {
            ch = text.charAt(at);
            at += 1;
            return ch;
        }

        function white() {
            while (ch != '' && ch <= ' ') {
                next();
            }
        }

        function str() {
            var i, s = '', t, u;

            if (ch == '"') {
outer:          while (next()) {
                    if (ch == '"') {
                        next();
                        return s;
                    } else if (ch == '\\') {
                        switch (next()) {
                        case 'b':
                            s += '\b';
                            break;
                        case 'f':
                            s += '\f';
                            break;
                        case 'n':
                            s += '\n';
                            break;
                        case 'r':
                            s += '\r';
                            break;
                        case 't':
                            s += '\t';
                            break;
                        case 'u':
                            u = 0;
                            for (i = 0; i < 4; i += 1) {
                                t = parseInt(next(), 16);
                                if (!isFinite(t)) {
                                    break outer;
                                }
                                u = u * 16 + t;
                            }
                            s += String.fromCharCode(u);
                            break;
                        default:
                            s += ch;
                        }
                    } else {
                        s += ch;
                    }
                }
            }
            error("Bad string");
        }

        function arr() {
            var a = [];

            if (ch == '[') {
                next();
                white();
                if (ch == ']') {
                    next();
                    return a;
                }
                while (ch) {
                    a.push(val());
                    white();
                    if (ch == ']') {
                        next();
                        return a;
                    } else if (ch != ',') {
                        break;
                    }
                    next();
                    white();
                }
            }
            error("Bad array");
        }

        function obj() {
            var k, o = {};

            if (ch == '{') {
                next();
                white();
                if (ch == '}') {
                    next();
                    return o;
                }
                while (ch) {
                    k = str();
                    white();
                    if (ch != ':') {
                        break;
                    }
                    next();
                    o[k] = val();
                    white();
                    if (ch == '}') {
                        next();
                        return o;
                    } else if (ch != ',') {
                        break;
                    }
                    next();
                    white();
                }
            }
            error("Bad object");
        }

        function num() {
            var n = '', v;
            if (ch == '-') {
                n = '-';
                next();
            }
            while (ch >= '0' && ch <= '9') {
                n += ch;
                next();
            }
            if (ch == '.') {
                n += '.';
                while (next() && ch >= '0' && ch <= '9') {
                    n += ch;
                }
            }
            if (ch == 'e' || ch == 'E') {
                n += 'e';
                next();
                if (ch == '-' || ch == '+') {
                    n += ch;
                    next();
                }
                while (ch >= '0' && ch <= '9') {
                    n += ch;
                    next();
                }
            }
            v = +n;
            if (!isFinite(v)) {
                error("Bad number");
            } else {
                return v;
            }
        }

        function word() {
            switch (ch) {
                case 't':
                    if (next() == 'r' && next() == 'u' && next() == 'e') {
                        next();
                        return true;
                    }
                    break;
                case 'f':
                    if (next() == 'a' && next() == 'l' && next() == 's' &&
                            next() == 'e') {
                        next();
                        return false;
                    }
                    break;
                case 'n':
                    if (next() == 'u' && next() == 'l' && next() == 'l') {
                        next();
                        return null;
                    }
                    break;
            }
            error("Syntax error");
        }

        function val() {
            white();
            switch (ch) {
                case '{':
                    return obj();
                case '[':
                    return arr();
                case '"':
                    return str();
                case '-':
                    return num();
                default:
                    return ch >= '0' && ch <= '9' ? num() : word();
            }
        }

        return val();
    }
};

//Note: $$ is a reference to document.getElementById

function set_status(obj){
	
	var data = $(obj).closest("FORM").metadata();	
	var id = data.id;
	var mode = data.mode;
	
	jQuery.each($('.loader'+id), function(){
		$$(this.id).style.display = '';
	});
	
	if(mode == 'anime'){
		x_ajax_set_anime_status(id, obj.value, status_anime_cb);
	}else{
		x_ajax_set_manga_status(id, obj.value, status_manga_cb);
	}
	
}

function status_anime_cb(response){
	
	var id = response.anime_id;
	
	jQuery.each($('.loader'+id), function(){
		$$(this.id).style.display = 'none';
	});
	
	jQuery.each($('.stat'+id), function(){
	
		var el = $$(this.id);

		if(response.success) el.currentValue = response.status_id;

		el.value = el.currentValue; //el.value used below for setting status ID
	
	});
	
	
	$("span.display"+id).attr('class', 'display'+id+' status'+response.status_id);

	
	jQuery.each($('.episodes'+id), function(){
		
		var e = $$(this.id); //The episode dropdown
		
		switch(parseInt(response.status_id)){
			case 0: //No status
			case 4: //Want to watch
			case 6: //Won't watch
				e.value = 0;
				e.disabled = true;
				break;
			case 1: //Watched
				e.value = e.options[e.options.length-1].value;
				e.disabled = true;
				break;
			case 2: //Watching
			case 3: //Dropped
			case 5: //Stalled
				e.disabled = false;
				break;
		}			
		
	});
	
	jQuery.each($('form.anime'+id+' div.starrating'), function(){
			
		var s = $('#'+this.id); //anime list
		
		switch(parseInt(response.status_id)){
			case 0: //No status
			case 4: //Want to watch
			case 6: //Won't watch
				s.children(".cancel").triggerHandler("click", true);
				//s.stars("disable");
				break;
			case 1: //Watched
				//s.stars("enable");
				break;
			case 2: //Watching
			case 3: //Dropped
			case 5: //Stalled
				//s.stars("enable");
				break;
		}
		
	});	
	
	if(response.error) alert(response.error);
	
	displayBadges(response.badges);

}

function status_manga_cb(response){

	var id = response.manga_id;

	jQuery.each($('.loader'+id), function(){
		$$(this.id).style.display = 'none';
	});


	jQuery.each($('.stat'+id), function(){

		var el = $$(this.id);

		if(response.success) el.currentValue = response.status_id;

		el.value = el.currentValue; //el.value is used later on in this script

	});


	$("span.display"+id).attr('class', 'display'+id+' status'+response.status_id);
	
	var volume_val = 0;
	
	jQuery.each($('.volumes'+id), function(){

		var e = $$(this.id); //The volume dropdown

		switch(parseInt(response.status_id)){
			case 0: //No status
			case 4: //Want to read
			case 6: //Won't read
				e.value = 0;
				e.disabled = true;
				break;
			case 1: //Read
				e.value = e.options[e.options.length-1].value;
				volume_val = e.value;
				e.disabled = true;
				break;
			case 2: //Reading
			case 3: //Dropped
			case 5: //Stalled
				e.disabled = false;
				break;
		}

	});

	jQuery.each($('.chapters'+id), function(){

		var e = $$(this.id); //The chapter dropdown

		switch(parseInt(response.status_id)){
			case 0: //No status
			case 4: //Want to read
			case 6: //Won't read
				e.value = 0;
				e.disabled = true;
				break;
			case 1: //Read
				if(volume_val > 0){
					e.value = 0;
				}else{
					e.value = e.options[e.options.length-1].value;
				}
				e.disabled = true;
				break;
			case 2: //Reading
			case 3: //Dropped
			case 5: //Stalled
				e.disabled = false;
				break;
		}

	});

	jQuery.each($('form.manga'+id+' div.starrating'), function(){
		
		var s = $('#'+this.id); //manga list
		switch(parseInt(response.status_id)){
			case 0: //No status
			case 4: //Want to read
			case 6: //Won't read
				s.children(".cancel").triggerHandler("click", true);
				//s.stars("disable");
				break;
			case 1: //Read
				//s.stars("enable");
				break;
			case 2: //Reading
			case 3: //Dropped
			case 5: //Stalled
				//s.stars("enable");
				break;
		}
	});

	if(response.error) alert(response.error);
	
	displayBadges(response.badges);

}

function set_episodes(obj){
	
	var anime_id = obj.className.substring(8);
	
	jQuery.each($('.loader'+anime_id), function(){
		$$(this.id).style.display = '';
	});
	
	x_ajax_set_episodes(anime_id, obj.value, episodes_cb);
	
}

function episodes_cb(response){

	jQuery.each($('.loader'+response.anime_id), function(){
		$$(this.id).style.display = 'none';
	});
	
	jQuery.each($('.episodes'+response.anime_id), function(){
		
		var el = $$(this.id); //The episode dropdown		
		if(!response.success){
			el.value = 0;
		}else{
			el.value = response.episodes;
		}
	});
	
	if(response.error) alert(response.error);
	
	displayBadges(response.badges);
	
}

function set_volumes(obj){
	
	var manga_id = obj.className.substring(7);

	if($('.chapters'+manga_id)[0].value > 0){
		ok = confirm("You can only keep track of chapters OR volumes for each anime. If you continue, chapters will be set to 0 and volumes will be set.");
		if(!ok){
			obj.value = 0;
			return;
		}
	}

	jQuery.each($('.loader'+manga_id), function(){
		$$(this.id).style.display = '';
	});
	
	x_ajax_set_manga_read(manga_id, 0, obj.value, volumes_cb);
	
}

function volumes_cb(response){

	jQuery.each($('.loader'+response.manga_id), function(){
		$$(this.id).style.display = 'none';
	});

	jQuery.each($('.volumes'+response.manga_id), function(){

		var el = $$(this.id); //The volumes dropdown
		if(!response.success){
			el.value = 0;
		}else{
			el.value = response.volumes;
		}
	});

	jQuery.each($('.chapters'+response.manga_id), function(){

		var el = $$(this.id); //The volumes dropdown
		if(response.success){
			el.value = 0;
		}
	});

	if(response.error) alert(response.error);
	
	displayBadges(response.badges);
	
}

function set_chapters(obj){
	
	var manga_id = obj.className.substring(8);

	if($('.volumes'+manga_id)[0].value > 0){
		var ok = confirm("You can only keep track of chapters OR volumes for each anime. If you continue, volumes will be set to 0 and chapters will be set.");
		if(!ok){
			obj.value = 0;
			return;
		}
	}

	jQuery.each($('.loader'+manga_id), function(){
		$$(this.id).style.display = '';
	});
	
	x_ajax_set_manga_read(manga_id, obj.value, 0, chapters_cb);
	
}

function chapters_cb(response){

	jQuery.each($('.loader'+response.manga_id), function(){
		$$(this.id).style.display = 'none';
	});

	jQuery.each($('.chapters'+response.manga_id), function(){

		var el = $$(this.id); //The chapters dropdown
		if(!response.success){
			el.value = 0;
		}else{
			el.value = response.chapters;
		}
	});

	jQuery.each($('.volumes'+response.manga_id), function(){

		var el = $$(this.id); //The volumes dropdown
		if(response.success){
			el.value = 0;
		}
	});

	if(response.error) alert(response.error);
	
	displayBadges(response.badges);
	
}

function set_rating(rating, obj){
	
	var data = $(obj).closest("FORM").metadata();
	var id = data.id;
	var mode = data.mode;
	
	jQuery.each($('.loader'+id), function(){
		$$(this.id).style.display = '';
	});
	
	if(mode == 'anime'){
		x_ajax_set_anime_rating(id, rating, rating_anime_cb);
	}else{
		x_ajax_set_manga_rating(id, rating, rating_manga_cb);
	}
	
}

function rating_anime_cb(response){
	
	jQuery.each($('.loader'+response.anime_id), function(){
		$$(this.id).style.display = 'none';
	});
	
	jQuery.each($('form.anime'+response.anime_id+' div.starrating'), function(){
		
		var el = $('#'+this.id);
		
		if(!response.success || response.rating == 0){
			el.children(".cancel").triggerHandler("click", true);
		}else{
			response.rating = parseFloat(response.rating);
			var index = (response.rating * 2) - 1;
			el.children(".star").eq(index).triggerHandler("click", true);
		}
		
	});
	
	if(response.error) alert(response.error);
	
	displayBadges(response.badges);

}

function rating_manga_cb(response){

	jQuery.each($('.loader'+response.manga_id), function(){
		$$(this.id).style.display = 'none';
	});

	jQuery.each($('form.manga'+response.manga_id+' div.starrating'), function(){

		var el = $('#'+this.id);

		if(!response.success || response.rating == 0){
			el.children(".cancel").triggerHandler("click", true);
		}else{
			response.rating = parseFloat(response.rating);
			var index = (response.rating * 2) - 1;
			el.children(".star").eq(index).triggerHandler("click", true);
		}

	});

	if(response.error) alert(response.error);
	
	displayBadges(response.badges);

}

//Shorthand for document.getElementById
var $$ = function(arg){ return document.getElementById(arg); }

//Report comment
function confirmDeleteComment()
{
	var agree=confirm("Are you sure you want to delete this comment? This action can't be undone.");
	if (agree)
		return true;
	else
		return false;
}	

//Report comment
function confirmDelete(type)
{
	var agree=confirm("Are you sure you want to delete this " + type + "? This action can't be undone.");
	if (agree)
		return true;
	else
		return false;
}	

//Report comment
function confirmBlockUser()
{
	var agree=confirm("Are you sure you want to block this user? Any profile comments they've left you will be removed. You can't undo this action at the moment, but will be able to in the future.");
	if (agree)
		return true;
	else
		return false;
}	

// JavaScript Document
function FormValidator(form)
{

	//Validation expressions to be used
 	this.expressions = {
		"email" : new RegExp(/^([a-zA-Z0-9_\-])+(\.([a-zA-Z0-9_\-])+)*@((\[(((([0-1])?([0-9])?[0-9])|(2[0-4][0-9])|(2[0-5][0-5])))\.(((([0-1])?([0-9])?[0-9])|(2[0-4][0-9])|(2[0-5][0-5])))\.(((([0-1])?([0-9])?[0-9])|(2[0-4][0-9])|(2[0-5][0-5])))\.(((([0-1])?([0-9])?[0-9])|(2[0-4][0-9])|(2[0-5][0-5]))\]))|((([a-zA-Z0-9])+(([\-])+([a-zA-Z0-9])+)*\.)+([a-zA-Z])+(([\-])+([a-zA-Z0-9])+)*))$/),
	"string" : new RegExp(/^[a-zA-Z-]*$/)
	};
	
	//Set up some basics
	var self = this;
	this.form = $(form);
	this.elements = null;
	this.aReturn = new Array();

	this.init = function()
	{
		this.elements = this.form.find("[validator]");
		this.loadFields();
	}

	this.loadFields = function(){
		//Loop through each element that has a validator attribute within our form
		jQuery.each(this.elements, function()
		{
			the_element = this;
			if (typeof(the_element) != "function")
			{
				//If the parent element contains a span with a Check class, bind it to the blur
				//the class set will determine whether a green check mark or a red x will show up
				$(the_element).bind("blur", function(e)
				{
					$(the_element).parent().find("span.check").attr('className', self.Check(this, false) ? "check ok" : "check not");
				});
			}
		});
	}
	
	//Perform validation on fields
	this.Validate = function()
	{
		this.aReturn = new Array();
		jQuery.each(this.elements, function()
		{
			the_element = this;
			if (typeof(the_element) != "function")
				this.aReturn[the_element.id] = this.Check(the_element);
		});
		//Did it succeed?
		return this.IsValidated();
	}
	
	//Clear all error messages on the form
	this.Reset = function()
	{
		this.form.find('span.error').hide();
	}

	this.Check = function(the_element, show_errors)
	{
		if (typeof(show_errors) == "undefined")
			show_errors = true;
		
		//Find all of the conditions that the field is validated by
		var sValidator = $(the_element).attr("validator"),
				aConditions = sValidator.split(' '),
				isOK = true;

		for(i in aConditions)
		{
			key = aConditions[i];

			if (typeof(key) == "string")
			{
				if (key == "required")
					isOK = isOK == false ? false : this.CheckRequired(the_element);
				else if (key == "date")
					isOK = isOK == false ? false : this.CheckDate(the_element);
				else if (key == "password")
					isOK = isOK == false ? false : this.CheckPassword(the_element);
				else if (key.indexOf("max") != -1)
					isOK = isOK == false ? false : this.CheckMax(the_element, key);
				else if (key.indexOf("min") != -1)
					isOK = isOK == false ? false : this.CheckMin(the_element, key);
				else if (key.indexOf("equal_") != -1)
					isOK = isOK == false ? false : this.CheckEqual(the_element, key, true);
				else if (key.indexOf("different_") != -1)
					isOK = isOK == false ? false : this.CheckEqual(the_element, key, false);
				else
					isOK = isOK == false ? false : this.CheckRegex(the_element, key);
			}
		}

		this.ShowError(isOK, the_element, show_errors);

		return isOK;
	}

	this.ShowError = function(isOK, the_element, show_errors)
	{
		if(isOK || !show_errors){
			$(the_element).parent().find('span.error').hide();
		}else{
			$(the_element).parent().find('span.error').show();
		}
	}

	this.IsFormElement = function(the_element)
	{
		if (the_element.tagName == "SELECT" || the_element.tagName == "INPUT" || the_element.tagName == "TEXTAREA")
			return true;
		else
			return false;
	}

	this.CanBeChecked = function(the_element)
	{
		if (the_element.tagName == "SELECT" && the_element.options.length == 0)
			return false;
		else
			return true;
	}

	this.CheckRequired = function(the_element)
	{
		if (this.IsFormElement(the_element))
			return this.CanBeChecked(the_element) && $(the_element).val().trim() == "" ? false : true;
		else
		{
			var bValidate = true;
			this.form.each(function(oInnerElement)
			{
				bValidate = self.CheckRequired(oInnerElement) == false ? false : bValidate;
			});

			return bValidate;
		}
	}

	this.CheckMax = function(the_element, key)
	{
		var iMax = Number(key.replace(/max/g, ""));

		if (this.IsFormElement(the_element))
			return $(the_element).val().length > iMax ? false : true;
		else
		{
			var bValidate = true;
			this.form.each(function(oInnerElement)
			{
				bValidate = self.CheckMax(oInnerElement, key) == false ? false : bValidate;
			});

			return bValidate;
		}
	}

	this.CheckMin = function(the_element, key)
	{
		var iMin = Number(key.replace(/min/g, ""));

		if (this.IsFormElement(the_element))
			return $(the_element).val().length < iMin ? false : true;
		else
		{
			var bValidate = true;
			this.form.each(function(oInnerElement)
			{
				bValidate = self.CheckMin(oInnerElement, key) == false ? false : bValidate;
			});

			return bValidate;
		}
	}

	/**
	* Check date
	* @param the_element HTMLreference
	* @return bool
	*/
	this.CheckDate = function(the_element)
	{
		var iYear, iDay, iMonth;

		this.form.each(function(oInnerElement)
		{
			if (oInnerElement.name.indexOf("_y") != -1)
				iYear = $(oInnerElement).val();
			else if (oInnerElement.name.indexOf("_m") != -1)
				iMonth = $(oInnerElement).val();
			else if (oInnerElement.name.indexOf("_d") != -1)
				iDay = $(oInnerElement).val();
		});

		if (!(iYear > 0 && iMonth > 0 && iDay > 0))
			return false;

		var oDate = new Date(iYear, iMonth-1, iDay) ;
		return oDate.getDate() == iDay && oDate.getMonth()+1 == iMonth && iYear == oDate.getFullYear() ? true : false;
	}

	/**
	* Check password
	* @return bool
	*/

	this.CheckPassword = function(the_element)
	{
		var sTemp = '';
		for (var i=0; i<the_element.value.length; i++)
		{
			var sCar = the_element.value.substring(i, i + 1);
			iTest = 0;
			iCount = 0;
			while(iTest == 0 && iCount < sTemp.length)
			{
				var sCarTemp = sTemp.substring(iCount, iCount + 1);
				if(sCarTemp == sCar)
					iTest = 1;
				iCount++;
			}

			if(iTest == 0)
				sTemp = sTemp + sCar;
		}

		if(sTemp.length < 3)
			return false;
		return true;
	}

	/**
	* Check equality between 2 input
	* @param the_element HTMLreference
	* @param key equals_ + id to check equality
	* @return bool
	*/
	this.CheckEqual = function(the_element, key, bEqual)
	{
		var sId = key.substr(bEqual ? 6 : 10);
		if (this.IsFormElement(the_element) && bEqual == true)
			return this.CanBeChecked(the_element) && $(the_element).val() == $(sId).val() ? true : false;
		else if (this.IsFormElement(the_element) && bEqual == false)
			return this.CanBeChecked(the_element) && $(the_element).val() != $(sId).val() ? true : false;
		else
		{
			var bValidate = true;
			var key = key;

			this.form.each(function(oInnerElement)
			{
				bValidate = self.CheckEqual(oInnerElement, key, bEqual) == false ? false : bValidate;
			});

			return bValidate;
		}
	}

	this.CheckRegex = function(the_element, key)
	{
		if (this.IsFormElement(the_element))
		{
			var oRe = this.expressions[key];
			if (oRe)
				return this.CanBeChecked(the_element) && oRe.test($(the_element).val()) ? true : false;
			else
				return true;
		}
		else
		{
			var bValidate = true;
			var key = key;

			this.form.each(function(oInnerElement)
			{
				bValidate = self.CheckRegex(oInnerElement, key) == false ? false : bValidate;
			});

			return bValidate;
		}
	}

	this.IsValidated = function()
	{
		isOK = this.aReturn.ForEach(function(isOK)
		{
			if (isOK == false)
				return false;
		});

		return isOK == false ? false : true;
	}

	this.init();
}
/* AJASON
 * Bringing AJAX and JSON together
 *
 * This file is part of AJASON.
 *
 * AJASON is a PHP 5 library and JavaScript client for the upcoming
 * Web technology called AJAX. AJAX permits data to be fetched
 * asynchronously without the need for reloading the Web page and
 * thus allows the development of interactive GUI-like Web applications.
 * JSON is a lightweight data interchange format which is used by AJASON
 * to exchange data between server and client.
 *
 * AJASON is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * AJASON is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Foobar; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA
 *
 * AJASON has been developed by Sven Jacobs <sven.jacobs@web.de>.
 * For more details visit sven-jacobs.de/wiki/AJASON
 *
 * Some parts of this project are contributed by other projects, namely
 * JSON (json.org) and JSON-PHP (mike.teczno.com/json.html) which are
 * copyrighted by their respective authors.
 */

/**
 * Ajax JavaScript class
 *
 * Contains methods to create the XMLHttpRequest object and to call remote
 * functions and object methods.
 *
 * @author Sven Jacobs <sven.jacobs@web.de>
**/
function Ajax( mtd, handler, debug, displayErrors )
{
   var _method        = mtd;
   var _handler       = handler;
   var _debug         = debug;
   var _displayErrors = displayErrors;
   var _clientVersion = "0.9";

   /*** Private methods ***/

   /**
    * Return instance of XMLHttpRequest class
    *
    * @return Object of XMLHttpRequest
   **/
   function getXmlHttpRequestObject()
   {
      var xmlHttpRequest = false;

      if ( window.XMLHttpRequest )
      {
         try
         {
            xmlHttpRequest = new XMLHttpRequest();
         }
         catch (e)
         {
            xmlHttpRequest = false;
         }
      }
      else if ( window.ActiveXObject )
      {
         try
         {
            xmlHttpRequest = new ActiveXObject( "Msxml2.XMLHTTP" );
         }
         catch (e)
         {
            try
            {
               xmlHttpRequest = new ActiveXObject( "Microsoft.XMLHTTP" );
            }
            catch (e)
            {
               xmlHttpRequest = false;
            }
         }
      }

      // Override mime type if browser supports it (like Mozilla)
      if ( xmlHttpRequest.overrideMimeType )
      {
         xmlHttpRequest.overrideMimeType( "text/xml" );
      }

      return xmlHttpRequest;
   }

   /**
    * Prepare XMLHttpRequest object
    *
    * @param[in] xmlHttpRequest XMLHttpRequest object
    * @param[in] params Parameters of function or method which has been called
    * @param[in] data Data which will be send
    * @return Final data which will be send
   **/
   function prepareXmlHttpRequest( xmlHttpRequest, params, data )
   {
      var callbackFunction = getCallbackFunction( params );
      var handler;
      var finalData;

      if ( _method == "GET" )
      {
         handler   = _handler + "?" + data;
         finalData = null;
      }
      else
      {
         handler   = _handler;
         finalData = data;
      }

      xmlHttpRequest.open( _method, handler, true );

      if ( _method == "POST" )
      {
         xmlHttpRequest.setRequestHeader( "Method",        "POST " + _handler + " HTTP/1.1" );
         xmlHttpRequest.setRequestHeader( "Content-Type",  "application/x-www-form-urlencoded" );
         xmlHttpRequest.setRequestHeader( "Content-Length", finalData.length );
      }

      xmlHttpRequest.onreadystatechange = function()
      {
         if ( xmlHttpRequest.readyState == 4 )
         {
            try
            {
               var response = JSON.parse( xmlHttpRequest.responseText );
            }
            catch (e)
            {
               //alert( "AJAX error:\nUnknown response from server!\n\n" + xmlHttpRequest.responseText );
               return;
            }

            if ( response.errorCode == 0 && callbackFunction != null )
            {
               if ( _debug )
               {
                  // Show client/server versions and whole server response before executing callback function
                  alert( "AJAX debug info:\n\nServer version: " + response.serverVersion + "\nClient version: " + _clientVersion + "\nServer response: " + xmlHttpRequest.responseText );
               }
               callbackFunction( response.response );
            }
            else if ( response.errorCode != 0 && _displayErrors )
            {
               alert( "AJAX error:\n" + response.errorMessage );
            }
         }
      }

      return finalData;
   }

   /**
    * Do params include callback function?
    *
    * @param[in] params Parameters of function or method which has been called
    * @return Returns true if params contain callback function
   **/
   function paramsHaveCallbackFunction( params )
   {
      if ( typeof( params ) == "object" && params.length > 0 )
      {
         return ( typeof( params[ params.length - 1 ] ) == "function" );
      }
      else
      {
         return false;
      }
   }

   /**
    * Return callback function from params
    *
    * @param[in] params Parameters of function or method which has been called
    * @return Callback function
   **/
   function getCallbackFunction( params )
   {
      if ( paramsHaveCallbackFunction( params ) )
      {
         return params[ params.length - 1 ];
      }
      else
      {
         return null;
      }
   }

   /**
    * Prepare parameters
    *
    * @param[in] params Parameters of function or method which has been called
    * @return Prepared parameters
   **/
   function prepareParams( params )
   {
      var preparedParams = new Array();

      if ( typeof( params ) == "object" && params.length > 0 )
      {
         var end;

         if ( paramsHaveCallbackFunction( params ) )
         {
            end = 1;
         }
         else
         {
            end = 0;
         }

         for( var i = 0; i < params.length - end ; i++ )
         {
            preparedParams.push( params[ i ] );
         }
      }

      return preparedParams;
   }

   /**
    * Prepare data
    *
    * @param[in] cls Class name or null
    * @param[in] funcOrMtd Function name (if cls == null) or method name
    * @param[in] params Parameters of function or method which has been called
    * @return Prepared data
   **/
   function prepareData( cls, funcOrMtd, params )
   {
      var data = new Object();

      data[ "clientVersion" ] = _clientVersion;
      data[ "params" ]        = prepareParams( params );

      if ( cls != null )
      {
         data[ "cls" ] = cls;
         data[ "mtd" ] = funcOrMtd;
      }
      else
      {
         data[ "func" ] = funcOrMtd;
      }

      return "ajax=" + escape( JSON.stringify( data ) );
   }

   /**
    * Finally send request
    *
    * @param[in] params Parameters of function or method which has been called
    * @param[in] data Data to be send
   **/
   function call( params, data )
   {
      var xmlHttpRequest = getXmlHttpRequestObject();
      var finalData      = prepareXmlHttpRequest( xmlHttpRequest, params, data );
      xmlHttpRequest.send( finalData );
   }

   /*** Public methods ***/

   /**
    * Call remote method
    *
    * @param[in] cls Name of remote class
    * @param[in] mtd Name of remote method
    * @param[in] params Parameters of local method which has been called
   **/
   this.callMethod = function( cls, mtd, params )
   {
      var data = prepareData( cls, mtd, params );
      call( params, data );
   }

   /**
    * Call remote function
    *
    * @param[in] func Name of remote function
    * @param[in] params Parameters of local function which has been called
   **/
   this.callFunction = function( func, params )
   {
      var data = prepareData( null, func, params );
      call( params, data );
   }
}
// JavaScript Document
function toggle_favorite(type, favorite_id, can_dislike, button_type){

	var el = $("span."+type+favorite_id);
	var action;

        if((el.hasClass("heartSwitchNone") || el.hasClass("heartSwitchHate")) && (button_type=="heartBtnLove")){
            action = 'like';
        }else if((el.hasClass("heartSwitchNone") || el.hasClass("heartSwitchLove")) && (button_type=="heartBtnHate")){
            action = 'dislike';
        }else{
            action = 'remove';
        }
	
	$("img."+type+favorite_id).show();
	x_Favorites.ajax_manage_favorite(type, favorite_id, action, can_dislike, toggle_favorite_cb);
	
}

function toggle_favorite_cb(response){
	
	if(response.success){
		if(response.action == 'like'){
			$("span."+response.type+response.favorite_id).removeClass('heartSwitchNone heartSwitchHate').addClass('heartSwitchLove');
		}else if(response.action == 'dislike'){
			$("span."+response.type+response.favorite_id).removeClass('heartSwitchNone heartSwitchLove').addClass('heartSwitchHate');
		}else{
			$("span."+response.type+response.favorite_id).removeClass('heartSwitchLove heartSwitchHate').addClass('heartSwitchNone');
		}
		$(".like-count").html(addCommas(response.counts.num_likes) + " " + (response.counts.num_likes == 1 ? "person" : "people"));
		if(response.can_dislike){
			$(".dislike-count").html(addCommas(response.counts.num_dislikes) + " " + (response.counts.num_dislikes == 1 ? "person" : "people"));
		}
	}else{
		alert(response.error);
	}
	$("img."+response.type+response.favorite_id).hide();
	
	displayBadges(response.badges);
	
}
//Adds commas to long numbers
//Code taken from http://www.mredkj.com/javascript/nfbasic.html, copyright free and can be used without restriction

function addCommas(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
	    x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
