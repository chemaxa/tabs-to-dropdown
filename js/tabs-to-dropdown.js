!(function ($) {
    'use strict';
    $.fn.ttd = function (options) {
        var settings = {
            resizeTimeout: 100,
            containerSelector : '.ttd-tabs__container',
            listSelector : '.ttd-tabs__list',
            itemSelector : '.ttd-tabs__item',
            iconClass: 'fa fa-angle-down',
            moreText: ''
        };
        $.extend(settings, options);
        
        this.each(function () {
            $(this).children(settings.listSelector).wrap("<div class='"+settings.containerSelector.slice(1)+"'></div>");
            var tabBar = $(this).children(settings.containerSelector);
            var tabList = tabBar.children(settings.listSelector);
            var tabListItem = tabList.children(settings.itemSelector);

            var dropdown = $("<div class='ttd-tabs__dropdown'><button class='ttd-tabs__dropdown-toggle'><i class='" + settings.iconClass + "'></i>&nbsp;"+settings.moreText+"</button><ul class='ttd-tabs__dropdown-list'></ul></div>");
            var dropdownToggle = dropdown.children(".ttd-tabs__dropdown-toggle");
            var dropdownList = dropdown.children(".ttd-tabs__dropdown-list");

            var clickHandler = ("ontouchstart" in document.documentElement ? "touchstart" : "click");

            var tabsToDropdown = function () {
                var tabBarWidth = tabBar.width();
                tabListItem.each(function (index) {
                    var dropdownListItem = dropdownList.children("li").eq(index);
                    var tabListItemOffset = $(this).position().left + $(this).outerWidth();

                    if (tabListItemOffset >= tabBarWidth) {
                        $(this).addClass("ttd-hide"); dropdownListItem.addClass("ttd-show");
                    } else {
                        $(this).removeClass("ttd-hide"); dropdownListItem.removeClass("ttd-show");
                    }
                });

                tabList.children(".ttd-hide").length > 0 ? dropdown.addClass("ttd-show") : dropdown.removeClass("ttd-show");
            };

            tabListItem.clone().appendTo(dropdownList);

            tabsToDropdown();
            
            var sizeWait;
            $(window).bind("resize", function () {
                if (typeof sizeWait != "undefined") { clearTimeout(sizeWait); }
                sizeWait = setTimeout(tabsToDropdown, settings.resizeTimeout);
            });

            $(this).append(dropdown);
            dropdown.bind(clickHandler, function (e) { e.stopPropagation(); });
            $(document).bind(clickHandler, function () { dropdown.removeClass("ttd-open"); });
            dropdownToggle.bind(clickHandler, function (e) { dropdown.toggleClass("ttd-open"); e.stopPropagation(); });
        });
        return this;
    };
})(jQuery);
