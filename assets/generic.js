//various animations to be used across child themes
var generics = {

	/*
	scroll to anchor 
		activate using animations.anchorScroll(); in child theme JavaScript file
		use id="(anchor name)" on target, use href="#(anchor name)", data-scroll-speed="(value in milliseconds)" and data-easing-type="(string)" (syntax is jQuery animation easing, not css property) on link
	*/
	anchorScroll: function () {
		'use strict';
		$('[href^="#"]').click(function (event) {
			event.preventDefault();
			if($(this.hash).length) { 
				var speed,
					easing,
					offset;
				speed = parseInt($(this).attr('data-scroll-speed'), 10);
				if(isNaN(speed)) {
					speed = 100;
				}
				easing = $(this).attr('data-easing-type');
				if(typeof easing === 'undefined') {
					easing = 'swing';
				}
				offset = parseInt($(this).attr('data-offset'), 10);
				if(isNaN(offset)) {
					offset = 0;
				}
				$('html,body').animate({ scrollTop: $(this.hash).offset().top + offset }, speed, easing);
			}
		});
	},
	/**
	 * @param  {HTMLElement|JQuery} element - element upon which we will apply CSS changes to achieve animation
	 * @param  {number} changeAmount - number of pixels that will be added when animation finishes 
	 * @param  {Object.<string, (string|number)>} configuration - Object with configuration overrides - check options variable see used keys
	 * Simple generator for scroll event handlers. First closure allows for one time calculations of things that would otherwise
	 * hamper performance if they would be executed on each scroll event.
	 * TODO: implement a way to handle recalculations after resize with small performance impact
	 */
	generateParallax: function (element, changeAmount, configuration) {
		var options = $.extend({
			changedProperty: 'background-position-y',
			valueSuffix: 'px',
			initialValue: false,
			debug: false,
			transformation: false

		}, configuration);
		element = (element instanceof jQuery) ? element : $(element);
		if (options.initialValue === false || options.initialValue === null) {
			if(options.transformation === true) {
				options.initialValue = 0;
			} else if(options.transformation !== true){
				options.initialValue = parseFloat(element.css(options.changedProperty)) || 0;
			}

		}
		return function (event) {
			var value = (options.initialValue + changeAmount * event.progress) + options.valueSuffix;
			if(options.transformation) {
				element.css('transform', options.changedProperty + '(' + value + ')');
			} else {
					element.css(options.changedProperty, value);
			}

			if (options.debug) {
				console.log({
					options: options,
					changeAmount: changeAmount,
					element: element,
					value: value
				});
			}
		};
	},

  /*
  calculate object height/width in relation to other objects 
    activate using calculations.setHeight(); in child theme JavaScript file
    use data-height-sum or data-width-sum respectively
    use data-height-sum="identifier" on target to identify it as height calculation target object (the one that will have its height/width set), use data-adjust-sum="integer" to manually fine-tune the result, use data-height-add="identifier" on all elements whose height you wish to add to target object
  */
  setHeight: function (adjustment) {
    'use strict';
    $('[data-height-sum]').each(function () {
      var target = $(this).attr('data-height-sum'),
        additions = $('[data-height-add="' + target + '"]'),
        totalHeight = 0,
        finalHeight = 0;
      adjustment = parseInt($(this).data('height-adjustment'), 10);
      if (isNaN(adjustment)) {
        adjustment = 0;
      }
      additions.each(function () {
        totalHeight = totalHeight + $(this).outerHeight();
      });
      finalHeight = totalHeight + adjustment;
      $(this).height(finalHeight);
    });
  },
  
  setWidth: function (adjustment) {
    'use strict';
    $('[data-width-sum]').each(function () {
      var target = $(this).attr('data-width-sum'),
        additions = $('[data-width-add="' + target + '"]'),
        totalWidth = 0,
        finalWidth = 0;
      adjustment = parseInt($(this).attr('data-adjust-sum'), 10);
      if (isNaN(adjustment)) {
        adjustment = 0;
      }
      additions.each(function () {
        totalWidth = totalWidth + $(this).outerWidth();
      });
      finalWidth = totalWidth + adjustment;
      $(this).css('max-width', finalWidth + 'px');
    });
  },
  /*
  set equal height to all elements based on highest matched element height
  use data-equal-height="identifier" to identify all elements to be affected
  use data-screen-width="integer" on the last element to set the minimum screen width affected
  */
	equalHeight: function () {
		'use strict';
		var elementGroup = {},
			defaultGroupData = {
				elements: [],
				highest: 0,
				screen: 0
			},
			processed = new Set(),
			windowWidth = $(window).width();

		$('[data-equal-height]').each(function () {
			var targetElData = $(this).data('equal-height'),
				targetEl = $('[data-equal-height="' + targetElData + '"]'),
				targetScreen = parseInt($(this).data('screen-width'), 10) || 1;

			if (processed.has(targetElData)) { return; }

			if (elementGroup.targetElData !== 'undefined') {
				elementGroup[targetElData] = defaultGroupData;
			}

			elementGroup[targetElData].elements = targetEl;
			elementGroup[targetElData].screen = targetScreen;
			elementGroup[targetElData].highest = targetEl
													.toArray()
													.map(function (x) { return $(x).outerHeight(); })
													.reduce(function (max, el) { return (el > max) ? el : max; }, 0);
			processed.add(targetElData);

			if (windowWidth >= targetScreen) {
				elementGroup[targetElData].elements.css('height', elementGroup[targetElData].highest);
			} else {
				elementGroup[targetElData].elements.css('height', '');
			}
		});
	},
 
/*
  simple slider-toggler with three available settings. 
  activate using togglers.slider(number); in child theme JavaScript file. number is animation speed in milliseconds
  use data-slider="true" to identify container
  on the container tag, use data-slider-trigger="identifier" to identify all child tags that will trigger behavior
  on the container tag, use data-slider-target="identifier" to identify all target tags to collapse/expand. Note that target element should have a weight of 0 when collapsed, i.e. there should be no padding to it
  on the container tag, use data-slider-class="identifier" to set class that will be added to trigger element upon expand and removed upon collapse
*/
  siblingSlider: function (speed) {
    'use strict';
    $('[data-slider="true"]').each(function () {
      var trigger = $(this).attr('data-slider-trigger'),
        triggerTag = $(this).find(trigger),
        target = $(this).attr('data-slider-target'),
        targetTag = $(this).find(target).addClass('content-hidden'),
        classToggle = $(this).attr('data-slider-class');
      
      if (speed === undefined) {
        speed = 300;
      }
      
      speed = speed / 1000;
      
      targetTag.each(function () {
        var thisHeight = $(this).outerHeight();
        $(this).attr('data-height', thisHeight).css({
          'height': 0,
          'transition': 'height ' + speed + 's'
        });
      });
      
      triggerTag.on('click', function () {
        var getTarget = $(this).next(),
          targetHeight = getTarget.outerHeight(),
          getHeight = getTarget.attr('data-height');
        if (targetHeight > 0) {
          getTarget.height(0);
          $(this).removeClass(classToggle);
        } else {
          getTarget.height(getHeight);
          $(this).addClass(classToggle);
        }
      });
    });
  },
   
/*
  remove element from DOM using another element (e.g. close button). 
  add data-remove-trigger="identifier" to element that will trigger deletion
  add data-remove-target="identifier" to identify the element you'd like to delete
*/
  removeElement: function () {
    'use strict';
    var closeTrigger = $('[data-remove-trigger]');
    closeTrigger.on('click', function () {
      var identifier = $(this).attr('data-remove-trigger');
      $('[data-remove-target="' + identifier + '"]').remove();
    });
  },
   
/*
  toggle element class on action 
  activate in child theme by calling on a method and passing selectors as parameters
  add data-toggle-trigger="identifier" to element that will trigger toggle to activate toggling
  add data-toggle-target="identifier" to identify the element you'd like to toggle
  add data-toggle-class="identifier" to identify class, defaulting to 'is-active'
  add data-toggle-action="event" to identify the event that will trigger toggling, defaulting to 'click'
*/
  classToggler: function () {
    'use strict';
    var toggleTrigger = $('[data-toggle-trigger]');
      
    toggleTrigger.each(function () {
      var toggleAction = $(this).data('toggle-action'),
        toggleClasses = $(this).data('toggle-class'),
        toggleIdentifier = $(this).data('toggle-trigger'),
        toggleTarget = $('[data-toggle-target="' + toggleIdentifier + '"]');
      
      if (toggleAction === undefined) {
        toggleAction = 'click';
      }
      
      if (toggleClasses === undefined) {
        toggleClasses = 'is-active';
      }
      
      $(this).on(toggleAction, function (e) {
        e.stopImmediatePropagation();
        toggleTarget.toggleClass(toggleClasses);
      });
    });
  },
   
/*
  add element class on action 
  activate in child theme by calling on a method and passing selectors as parameters
  add data-addclass-trigger="identifier" to element that will trigger toggle to activate toggling
  add data-addclass-target="identifier" to identify the element you'd like to toggle
  add data-addclass-class="identifier" to identify class, defaulting to 'is-active'
  add data-addclass-action="event" to identify the event that will trigger toggling, defaulting to 'click'
  add data-addclass-toggle="true" to remove the given class from other instances of [data-addclass-trigger] element
*/
  classAdd: function () {
    'use strict';
    var addClassTrigger = $('[data-addclass-trigger]'),
      allTargets = $('[data-addclass-target]');
      
    addClassTrigger.each(function () {
      var addClassAction = $(this).data('addclass-action'),
        addClassClasses = $(this).data('addclass-class'),
        addClassIdentifier = $(this).data('addclass-trigger'),
        addClassToggle = $(this).data('addclass-toggle'),
        addClassTarget = $('[data-addclass-target="' + addClassIdentifier + '"]');
      
      if (addClassAction === undefined) {
        addClassAction = 'click';
      }
      
      if (addClassClasses === undefined) {
        addClassClasses = 'is-active';
      }
      
      $(this).on(addClassAction, function () {
        if (addClassToggle === true) {
          allTargets.removeClass(addClassClasses);
          addClassTarget.addClass(addClassClasses);
        } else {
          addClassTarget.addClass(addClassClasses);          
        }
      });
    });
  },
   
/*
  remove element class on action 
  activate in child theme by calling on a method and passing selectors as parameters
  add data-removeclass-trigger="identifier" to element that will trigger toggle to activate toggling
  add data-removeclass-target="identifier" to identify the element you'd like to toggle
  add data-removeclass-class="identifier" to identify class, defaulting to 'is-active'
  add data-removeclass-action="event" to identify the event that will trigger toggling, defaulting to 'click'
*/
  classRemove: function () {
    'use strict';
    var removeClassTrigger = $('[data-removeclass-trigger]');
      
    removeClassTrigger.each(function () {
      var removeClassAction = $(this).data('removeclass-action'),
        removeClassClasses = $(this).data('removeclass-class'),
        removeClassIdentifier = $(this).data('removeclass-trigger'),
        removeClassTarget = $('[data-removeclass-target="' + removeClassIdentifier + '"]');
      
      if (removeClassAction === undefined) {
        removeClassAction = 'click';
      }
      
      if (removeClassClasses === undefined) {
        removeClassClasses = 'is-active';
      }
      
      $(this).on(removeClassAction, function () {
        removeClassTarget.removeClass(removeClassClasses);
      });
    });
  },
   
/*
  stick element to top after it hits the top of the window 
  activate in child theme by calling on a method and passing selectors of all infected elements as parameters
  add data-toggle-top="class-name" to element that will trigger toggle to activate toggling, where class name is the class to be toggled
*/
  stickToTop: function () {
    'use strict';
    $('[data-toggle-top]').each(function () {
      var $this = $(this),
        stickSidebar = $(this).offset().top,
        identifier = $(this).data('toggle-top'),
        thisHeight = $(this).outerHeight();
      $(window).on('scroll', function () {
        if ($(window).scrollTop() > stickSidebar) {
          $this.addClass(identifier).next('.placeholder').css('height', thisHeight).removeClass('hide');
        } else {
          $this.removeClass(identifier).next('.placeholder').addClass('hide');
        }
      });
    });
  }
};