import './vendor';

$(document).ready(() => {
    var $window = $(window);
    var iSlider = $('.index-slider');
    var cSlider = $('.clients-items');
    var timeout = 5000;
    var accordions = $('.toggle');

    iSlider.owlCarousel({
        items: 1,
        nav: false,
        dots: true,
        loop: true,
        autoplayTimeout: timeout,
        responsive: {
            0: {
                autoplay: false,
            },
            992: {
                autoplay: false,
                onChanged: function () {
                    $(function() {
                        var loader = $('.owl-dot.active .loader').ClassyLoader({
                          width: 26,
                          height: 26,
                          percentage: 100,
                          speed: 50,
                          diameter: 10,
                          showText: false,
                          roundedLine: true,
                          lineColor: 'rgba(255, 204, 41, 1)',
                          remainingLineColor: 'rgba(73, 125, 164, 0.1)',
                          lineWidth: 4,
                      });
                    });
                }
            },
        },
        onInitialized: function() {
            iSlider.find('.owl-dot').html('<canvas class="loader"></canvas>')
        },
    });

    $(function () {
        var $owl = iSlider,
            effect = getAnimationName(),
            outIndex,
            isDragged = false;

        $owl.owlCarousel({
          navSpeed: 500,
          animateIn: 'fake',
          animateOut: 'fake'
        });

        $owl.on('change.owl.carousel', function(event) {
          outIndex = event.item.index;
        });

        $owl.on('changed.owl.carousel', function(event) {
          var inIndex = event.item.index,
              dir = outIndex <= inIndex ? 'Next' : 'Prev';

          var animation = {
            moveIn: {
              item: $('.owl-item', $owl).eq(inIndex),
              effect: effect + 'In' + dir
            },
            moveOut: {
              item: $('.owl-item', $owl).eq(outIndex),
              effect: effect + 'Out' + dir
            },
            run: function (type) {
              var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
                  animationObj = this[type],
                  inOut = type == 'moveIn' ? 'in' : 'out',
                  animationClass = 'animated owl-animated-' + inOut + ' ' + animationObj.effect,
                  $nav = $owl.find('.owl-prev, .owl-next, .owl-dot, .owl-stage');

              animationObj.item.stop().addClass(animationClass).one(animationEndEvent, function () {
                // remove class at the end of the animations
                animationObj.item.removeClass(animationClass);
              });
            }
          };

          if (!isDragged){
            animation.run('moveOut');
            animation.run('moveIn');
          }
        });

        $owl.on('drag.owl.carousel', function(event) {
          isDragged = true;
        });

        $owl.on('dragged.owl.carousel', function(event) {
          isDragged = false;
        });

        function getAnimationName(){
          var re = /fx[a-zA-Z0-9\-_]+/i,
              matches = re.exec($owl.attr('class'));

          return matches !== null ? matches[0] : matches;
        }
    });

    cSlider.owlCarousel({
        loop: true,
        nav: true,
        dots: false,
        margin: 30,
        autoplay: true,
        navText: ['<svg xmlns="http://www.w3.org/2000/svg" width="20.969" height="40.44" viewBox="0 0 20.969 40.44"><path style="fill: none;stroke: #4b4b4d;stroke-width: 1px;opacity: 0.3; fill-rule: evenodd;" d="M295.6,5259.99L277.015,5279l18.585,19.01" transform="translate(-275.125 -5258.78)"/></svg>', '<svg xmlns="http://www.w3.org/2000/svg" width="20.59" height="39" viewBox="0 0 20.59 39"><path style=" fill: none;stroke: #4b4b4d;stroke-width: 1px;fill-rule: evenodd;opacity: 0.3;" d="M1634.11,5259.99l18.87,19.01-18.87,19.01" transform="translate(-1632.91 -5259.5)"/></svg>'],
        responsive: {
            0: {
                items: 1
            },
            1024: {
                items: 3,

            }
        },
    });

    accordions.click(function(e) {
        e.preventDefault();

      var $this = $(this);

      if ($this.next().hasClass('show')) {
          $this.next().removeClass('show');
          $this.removeClass('active');
          $this.next().slideUp(350);
      } else {
          $this.parent().parent().find('li .accordions_content').removeClass('show');
          $this.parent().parent().find('li .accordions_content').slideUp(350);
          $this.addClass('active').parent().siblings().find('.toggle').removeClass('active')
          $this.next().toggleClass('show');
          $this.next().slideToggle(350);
      }
  });

    $('.tabs-inputs li').click(function(){
        var tab_id = $(this).attr('data-tab');
        console.log(tab_id)
        $('.tabs-inputs li').parent().removeClass('active');
        $('.tab-content').removeClass('active');

        $(this).parent().addClass('active');
        $("#"+tab_id).addClass('active').siblings().removeClass('active');
    })

    $('.form-group input, .form-group textarea').focus(function (e) {
        var $this = $(e.currentTarget);
        var parent = $this.parent();
        var label = parent.children('label');
        parent.addClass('focused');

        if ($this.val() !== '') {
          label.show();
        }
    }).blur(function (e) {
    var $this = $(e.currentTarget);
    var parent = $this.parent();
    var label = parent.children('label');

    if ($this.val() === '') {
        parent.removeClass('focused');
    }

    if ($this.val() !== '') {
        parent.removeClass('focused');
        label.hide();
    }
    }).change(function (e) {
    var $this = $(e.currentTarget);
    var parent = $this.parent();
    var label = parent.children('label');

    if ($this.val() !== '') {
        label.hide();
        parent.removeClass('focused');
    } else {
        label.show();
    }
    });



    if ($(window).width() < 1024) {
        $window.scroll(function (event) {
            var e = $('table');

            if (e.length === 1) {
                $(".swipe-table").length === 0 && $('body').append('<div class="swipe-table"><span class="swipe_table"></span></div>');

                var a = e.offset();
                var t = e.innerHeight();
                var i = a.top + t;
                var s = $(window).scrollTop() + $(window).height();

                var l = a.top + (t - 100) / 2;

                i < s && ($('.swipe-table').css({
                    top: l
                }), $(".swipe-table").fadeIn("slow"), setTimeout(function () {
                    $(".swipe-table").fadeOut("slow");
                }, 2500));
            };
        });

        $('.benefits-items').owlCarousel({
            items: 1,
            autoplay: false,
            dots: false,
            nav: true,
            loop: true,
            navText: ['<svg xmlns="http://www.w3.org/2000/svg" width="20.969" height="40.44" viewBox="0 0 20.969 40.44"><path style="fill: none;stroke: #4b4b4d;stroke-width: 1px;opacity: 0.3; fill-rule: evenodd;" d="M295.6,5259.99L277.015,5279l18.585,19.01" transform="translate(-275.125 -5258.78)"/></svg>', '<svg xmlns="http://www.w3.org/2000/svg" width="20.59" height="39" viewBox="0 0 20.59 39"><path style=" fill: none;stroke: #4b4b4d;stroke-width: 1px;fill-rule: evenodd;opacity: 0.3;" d="M1634.11,5259.99l18.87,19.01-18.87,19.01" transform="translate(-1632.91 -5259.5)"/></svg>']
        });

        $('.review .owl-carousel').owlCarousel({
            items: 1,
            autoplay: false,
            dots: false,
            nav: true,
            loop: true,
            margin: 30,
            navText: ['<svg xmlns="http://www.w3.org/2000/svg" width="20.969" height="40.44" viewBox="0 0 20.969 40.44"><path style="fill: none;stroke: #4b4b4d;stroke-width: 1px;opacity: 0.3; fill-rule: evenodd;" d="M295.6,5259.99L277.015,5279l18.585,19.01" transform="translate(-275.125 -5258.78)"/></svg>', '<svg xmlns="http://www.w3.org/2000/svg" width="20.59" height="39" viewBox="0 0 20.59 39"><path style=" fill: none;stroke: #4b4b4d;stroke-width: 1px;fill-rule: evenodd;opacity: 0.3;" d="M1634.11,5259.99l18.87,19.01-18.87,19.01" transform="translate(-1632.91 -5259.5)"/></svg>']
        });
    }

    if ($(window).width() >= 1024) {
        $window.scroll(function (event) {
            if ($(window).scrollTop() >= 300) {
                $('.header-fixed').addClass('fixed');
            }
            else {
                $('.header-fixed').removeClass('fixed');
            }
        });
    };

    $(function($){
        $(document).mouseup(function(e) {
            var target = $('.mobile-btns .lang');
            if ( !target.is(e.target) && target.has(e.target).length === 0) {
                target.removeClass('open');
            } else {
                target.addClass('open')
            }
        });
    });

    $('.mobile-submenu__arrow').on('click', function(){
        $(this).next('ul').slideToggle();
        $(this).parent().toggleClass('open');
    });

    $('#menu').bind('click', function (e) {

        e.preventDefault();

        var toggleText = $(this).children('.menu-icon').data('close');

        $(this).children('.menu-icon').data('close', $(this).children('.menu-icon').text()).text(toggleText);

        $(this).children('.menu-icon').toggleClass('close-icon');

        $(this).parent().toggleClass('active');
    });

    function gf(defaultInput, setInput) {
        var countResult = 0, f;
        $('.popup-group').each(function(index, el) {
          if (f = $(this).find(setInput).val())
            countResult += parseInt($(this).find(defaultInput).val())*parseInt(f);
        });

        $('#count h5 span').text(countResult);

    }
    $('#count').on('keyup', 'input', function(event) {
        gf('li.input-group input', 'li.form-group input');
    });

    $('#reset').on('click', function(){
        $('#count .form-group input').each(function(index, el) {
            $(this).val('');
            $(this).next().fadeIn();
            $('#count h5 span').text('0');
          });
    });

    $('#close').on("click", function(){
        $('#popup').fadeOut();
    });

    let x; let i; let j; let selElmnt; let a; let b; let c; let setVal;
    /* look for any elements with the class "custom-select":*/

    x = document.querySelectorAll('.branches-select, .faq-select');
    for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName('select')[0];
        /* for each element, create a new DIV that will act as the selected item:*/
        a = document.createElement('DIV');
        a.setAttribute('class', 'select-selected');
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /* for each element, create a new DIV that will contain the option list:*/
        b = document.createElement('DIV');
        b.setAttribute('class', 'select-items select-hide');
        for (j = 0; j < selElmnt.length; j++) {
            /* for each option in the original select element,
            create a new DIV that will act as an option item:*/
            c = document.createElement('DIV');
            setVal = selElmnt.options[j].getAttribute('value');
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.setAttribute('value', setVal);

            c.addEventListener('click', function () {
                /* when an item is clicked, update the original select box,
                and the selected item:*/
                let y; let i; let k; let s; let
                    h;

                s = this.parentNode.parentNode.getElementsByTagName('select')[0];
                h = this.parentNode.previousSibling;
                for (i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML === this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName('same-as-selected');
                        for (k = 0; k < y.length; k++) {
                            y[k].removeAttribute('class');
                        }
                        this.setAttribute('class', 'same-as-selected');
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener('click', function (e) {
            /* when the select box is clicked, close any other select boxes,
            and open/close the current select box:*/
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle('select-hide');
            this.classList.toggle('select-arrow-active');
        });
    }
    function closeAllSelect(elmnt) {
        /* a function that will close all select boxes in the document,
        except the current select box:*/
        let x; let y; let i; let
            arrNo = [];

        x = document.getElementsByClassName('select-items');
        y = document.getElementsByClassName('select-selected');
        for (i = 0; i < y.length; i++) {
            if (elmnt === y[i]) {
                arrNo.push(i);
            } else {
                y[i].classList.remove('select-arrow-active');
            }
        }
        for (i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add('select-hide');
            }
        }
    }
    /* if the user clicks anywhere outside the select box,
    then close all select boxes:*/
    document.addEventListener('click', closeAllSelect);

    new WOW().init();
});


jQuery(document).ready(function($){
	//mobile version - detect click event on filters tab
	var filter_tab_placeholder = $('.blog-filters .placeholder a'),
		filter_tab_placeholder_default_value = filter_tab_placeholder.data('placeholder'),
		filter_tab_placeholder_text = filter_tab_placeholder.text();

	$('.blog-filters li').on('click', function(event){
		//detect which tab filter item was selected
		var selected_filter = $(event.target).data('type');

		//check if user has clicked the placeholder item
		if( $(event.target).is(filter_tab_placeholder) ) {
			(filter_tab_placeholder_default_value == filter_tab_placeholder.text()) ? filter_tab_placeholder.text(filter_tab_placeholder_text) : filter_tab_placeholder.text(filter_tab_placeholder_default_value) ;
			$('.blog-filters').toggleClass('is-open');

		//check if user has clicked a filter already selected
		} else if( filter_tab_placeholder.data('type') == selected_filter ) {
			filter_tab_placeholder.text($(event.target).text());
			$('.blog-filters').removeClass('is-open');

		} else {
			//close the dropdown and change placeholder text/data-type value
			$('.blog-filters').removeClass('is-open');
			filter_tab_placeholder.text($(event.target).text()).data('type', selected_filter);
			filter_tab_placeholder_text = $(event.target).text();

			//add class selected to the selected filter item
			$('.blog-filters .selected').removeClass('selected');
			$(event.target).addClass('selected');
		}
	});

    buttonFilter.init();

	$('.blog-items ul').mixItUp({
	    callbacks: {
	    	onMixStart: function(){
	    		$('.fail-message').fadeOut(200);
	    	},
	      	onMixFail: function(){
	      		$('.fail-message').fadeIn(200);
            },
            onMixEnd: function(state) {
                var $showMore = $('.loadmore');
                var total = state.$targets.length;
                var length = $('.blog-items ul li').filter(':visible').length;
                if ( length == total || length != 12) {
                    $showMore.fadeOut();
                } else {
                    $showMore.fadeIn();
                }
            }
        },
        loadmore: {
            // The number of items to start with
            initial: 12,
            // The number of additional items to show on click of the loadmore button
            loadMore: 3,
            // A selector string for the existing wrapper the buttons will be inserted into
            buttonWrapper: ".loadmore",
            // The class of the Load more button
            buttonClass: "loadmore-button",
            // The label of the Load more button
            buttonLabel: "Загрузить еще",
        },
    });

});

/*****************************************************
	MixItUp - Define a single object literal
	to contain all filter custom functionality
*****************************************************/
var buttonFilter = {
  	// Declare any variables we will need as properties of the object
  	$filters: null,
  	groups: [],
  	outputArray: [],
  	outputString: '',

  	// The "init" method will run on document ready and cache any jQuery objects we will need.
  	init: function(){
    	var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "buttonFilter" object so that we can share methods and properties between all parts of the object.
        self.$filters = $('.blog');
    	self.$container = $('.blog-items ul');

	    self.$filters.find('.blog-filters').each(function(){
	      	var $this = $(this);

		    self.groups.push({
		        $inputs: $this.find('.filter'),
		        active: '',
		        tracker: false
		    });
	    });

  	},
};
