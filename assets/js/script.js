$(document).ready(function () {
    var windowH = $(window).height();
    var headerH = $("header").height();
    var windowScrollPosTop = $(window).scrollTop();
    var windowScrollPosBottom = windowH + windowScrollPosTop;
    var debounce_timer;
    var parallaxOffset;
    var parallaxDistance;
    var coords;
    $.fn.revealOnScroll = function () {
        return this.each(function () {
            var objectId = $(this).attr("id")
            if (objectId == "down") {
                animate($(this), "down")
            } else if (objectId == "left") {
                animate($(this), "left")
            } else if (objectId == "right") {
                animate($(this), "right")
            } else {
                animate($(this), "down")
            }
        }).promise();
    }
    function animate(obj, direction) {
        var deferred = $.Deferred();
        var objectOffset = obj.offset();
        var objectOffsetTop = objectOffset.top;
        if (!(obj.hasClass("animated-right") && obj.hasClass("animated-left") && obj.hasClass("animated-down"))) {
            if (windowScrollPosBottom >= objectOffsetTop + 10) {
                obj.animate({ "opacity": 1 }, 200, function () {
                    deferred.resolve();
                }).addClass("animated-" + direction);
            }
        }
    }
    function reveal() {
        $(".text-image1").revealOnScroll().then(function () {
            return $(".text-image2").revealOnScroll()
        }).then(function () {
            return $(".text-image3").revealOnScroll()
        }).then(function () {
            return $(".text-image4").revealOnScroll()
        }).then(function () {
            return $(".text-image5").revealOnScroll()
        }).then(function () {
            return $(".text-image6").revealOnScroll()
        })
    }
    function solid() {
        if ($(this).scrollTop() > headerH * 0.90) {
            $('.button-dark').addClass('solid');
            $('.navbar').addClass('solid');
            $('.button-link').addClass('solid');
            $('.navbar-brand').addClass('solid');
            $('.navbar').removeClass('navbar-dark')
            $('.navbar').addClass('navbar-light')
        } else {
            $('.button-dark').removeClass('solid');
            $('.navbar').removeClass('solid');
            $('.button-link').removeClass('solid');
            $('.navbar-brand').removeClass('solid');
            $('.navbar').addClass('navbar-dark')
            $('.navbar').removeClass('navbar-light')
        }
    }
    function startSlide() {
        setInterval(slideShow, 10000);
    };
    function slideShow() {
        var slideCurrent = $(".slide-active");
        var slideNext = slideCurrent.next();
        if (slideNext.length == 0) {
            slideNext = $(".slide").first();
        }
        var slideIndex = slideNext.index();
        $('.slide').css({ 'transform': 'translate(-' + (slideIndex) * 100 + '%)' });
        $('.slide').removeClass('slide-active');
        slideNext.addClass('slide-active');
    };
    function parallax() {
        $(".slide").each(function () {
            parallaxOffset = $(this).offset().top;
            parallaxDistance = -(parallaxOffset - window.pageYOffset) / 2;
            coords = '0% ' + parallaxDistance + 'px';
            $(this).css({ backgroundPosition: coords });
        });
    };

    solid();
    reveal();
    parallax();
    if ($(window).width() > 768) {
        startSlide();
    }
    $(window).scroll(function () {
        if (debounce_timer) {
            window.clearTimeout(debounce_timer);
        }
        solid();
        parallax();
        debounce_timer = window.setTimeout(function () {
            windowH = $(window).height();
            windowScrollPosTop = $(window).scrollTop();
            windowScrollPosBottom = windowH + windowScrollPosTop;
            // reveal is an expensive function so call it only a few times. 50ms is unrecognizable and much better
            // than running it for every pixel that's scrolled
            reveal();
        }, 50);
    });
});