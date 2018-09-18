$(function() {
window.onresize = function(event) {
    if ($('#form-game_v2').find('> .typeahead__container.backdrop')) {
        $('#form-game_v2').find('.typeahead__list').css('max-height', $(window).height() - 200 + "px");
    }
};
 
$.typeahead({
    input: '.js-typeahead-game_v2',
    minLength: 1,
    maxItem: false,
    highlight: false,
    hint: true,
    group: true,
    maxItemPerGroup: 16,
    backdrop: {
        "background-color": "#fff"
    },
    backdropOnFocus: true,
    cache: false, // "sessionStorage",
    compression: true,
    cancelButton: false,
    template: function () {
      return '<span class="ui blue small label">{{display}}</span>';
    },
    source: {
        game: {
            href: "http://www.gamer-hub.com/game/{{id}}/{{display|slugify}}/",
            template: function (query, item) {
                return '<img src="http://cdn.gamer-hub.com/images/' + this.helper.slugify.call(this, item.display) + '.jpg">' +
                    '<span class="title">{{display}}</span>';
            },
            ajax: {
                url: "http://www.gamer-hub.com/game/list.json",
                dataType: "jsonp",
                path: "data"
            }
        },
        tag: {
            href: "http://www.gamer-hub.com/tag/{{id}}/{{display|slugify}}/",
            ajax: {
                url: "http://www.gamer-hub.com/tag/list.json",
                dataType: "jsonp",
                path: "data"
            }
        },
        category: {
            href: "http://www.gamer-hub.com/category/{{id}}/{{display|slugify}}/",
            ajax: {
                url: "http://www.gamer-hub.com/category/list.json",
                dataType: "jsonp",
                path: "data"
            }
        }
    },
    callback: {
        onShowLayout: function (node, query) {
            node.attr('placeholder', 'Search for a Game ...');
            node.closest('form').find('.typeahead__list').css('max-height', $(window).height() - 200 + "px");
        },
        onHideLayout: function (node, query) {
            node.attr('placeholder', 'Search');
        },
        onLayoutBuiltBefore: function (node, query, result, resultHtmlList) {
            resultHtmlList.find('li[data-search-group="game"]').remove();
            return resultHtmlList;
        },
        onClickAfter: function (node, a, item, event) {
 
            event.preventDefault();
 
            var r = confirm("You will be redirected to:\n" + item.href + "\n\nContinue?");
            if (r == true) {
                window.open(item.href);
            }
 
        }
    }
});
});
