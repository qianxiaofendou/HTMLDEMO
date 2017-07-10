(function ($) {

    var defaults = {
        div: '<div class="dropdown bts_dropdown form-control bootstrap-select btn-group"></div>',
        buttontext: 'Maak een keuze',
        button: '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown"><span class="filter-option pull-left"></span> <i class="caret"></i></button>',
        ul: '<ul class="dropdown-menu"></ul>',
        li: '<li><label></label></li>'
    };

    $.fn.treeselect = function (options) {
        var $select = $(this);

        var settings = $.extend(defaults, options);

        var $div = $(settings.div);
        var $button = $(settings.button);
        var $ul = $(settings.ul).click(function (e) {
            e.stopPropagation();
        });

        initialize();

        function initialize() {
            var id = $select.attr('id')
            var _disabled = $select.attr('disabled')
            $div.attr('id',id)
            if(_disabled){
                $button.addClass('disabled').attr('disabled',true)
            }
            $select.after($div);
            $div.append($button);
            $div.append($ul);

            createList();
            bindEvent()
            updateButtonText();

            $select.remove();
        }

        function createStructure(selector) {
            var options = [];

            $select.children(selector).each(function (i, el) {
                $el = $(el);

                options.push({
                    value: $el.val(),
                    text: $el.text(),
                    prt:$el.data('prt') || 0,
                    checked: $el.attr('selected') ? true : false,
                    // children: createStructure('option[data-parent=' + $el.val() + ']')
                    children: createStructure('option[data-parent=' + $el.data('tid') + ']')
                });
            });

            return options;
        }

        function createListItem(option) {
            var $li = $(settings.li);
            $label = $li.children('label');
            $label.text(option.text);

            if ($select.attr('multiple')) {
                if(option.prt && option.prt === 1){
                    $input = $('<input prttree="1" type="checkbox" name="' + $select.attr('name').replace('[]','') + '" value="' + option.value + '">');
                }else{                    
                    $input = $('<input type="checkbox" name="' + $select.attr('name').replace('[]','') + '" value="' + option.value + '">');
                }
            } else {
                $input = $('<input type="radio" name="' + $select.attr('name') +'" value="' + option.value + '">');
            }
            
           
            if (option.checked)
                $input.attr('checked', 'checked');
            $label.prepend($input);

            if(option.prt && option.prt === 1){
                $label.before('<span class="tree-diy-span glyphicon glyphicon-minus glyphicon-plus" data-prt="'+option.prt+'" class="tree-diy-span"></span>')
            }

            $input.change(function () {
                var $_input = $(this)
                if($_input.attr('prttree') && $_input.attr('prttree') === '1'){
                  var isChecked = $_input.prop('checked')
                  $_input.parent().nextAll('ul').find('input').each(function(i, el){
                      if(isChecked){
                          $(el).prop('checked',true)
                      }else{
                          $(el).prop('checked',false)
                      }
                  })
                }
                updateButtonText();
            });

            if (option.children.length > 0) {
                $(option.children).each(function (i, child) {
                    $childul = $('<ul></ul>').appendTo($li);
                    $childul.append(createListItem(child));
                });
            }

            return $li;
        }

        function createList() {
            $(createStructure('option:not([data-parent])')).each(function (i, option) {
                $li = createListItem(option);
                $ul.append($li);
            });
        }

        function bindEvent(){
            var $labels = $div.find('span.tree-diy-span')
            $labels.off('click').on('click',function(){
                $(this).nextAll('ul').toggle()
                $(this).toggleClass('glyphicon-minus')
            })           
        }

        function updateButtonText() {
            buttontext = [];

            $div.find('input').each(function (i, el) {
                $checkbox = $(el);
                if ($checkbox.is(':checked')) {
                    buttontext.push($checkbox.parent().text());
                }
            });

            if (buttontext.length > 0) {
                $button.children('span').text(buttontext.join(', '));
                // if (buttontext.length < 4) {
                // } else if ($div.find('input').length == buttontext.length) {
                //     $button.children('span').text('Alle items geselecteerd');
                // } else {
                //     $button.children('span').text(buttontext.length + ' items geselecteerd');
                // }
            } else {
                $button.children('span').text('请选择……');
            }
        }
    };
}(jQuery));
