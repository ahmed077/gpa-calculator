/*global $, jQuery, console, alert*/
/*jslint plusplus: true*/
var customSelectGenerator, swapForms;

function SelectBox(generate, selectbox, clickEvent, forms) {
    'use strict';
    this.active = generate || false;
    this.clickEvent = (clickEvent === 'swap' || clickEvent === 'normal') ? clickEvent : 'normal';
    this.forms = forms || [];
    this.container = generate ? customSelectGenerator($(selectbox), this.clickEvent, this.forms) : null;
}
function customSelectGenerator(selectBox, clickEvent, forms) {
    'use strict';
//    Hiding the original select box
    selectBox.hide();
//    declaring variables
    var clickStats = {},//object which will contain properties of what to do at events
        //creating new select box container
        customSelect = $("<ul>", {
            id: 'custom-select',
            'class': selectBox[0].className + ' list-unstyled form-control input-lg'
        }),
        //caret down from font awesome 4.7
        caret = $("<i>", {'class': 'fa fa-caret-down fa-2x'});
    //creating the default option
    customSelect.append($('<li>', {
        'class': 'selected',
        'data-target': $(':selected', selectBox).val()
    }).text($(':selected', selectBox).text()));
//    adding the caret and new select box after the original one
    selectBox.after(customSelect).after(caret);
//    adding main styles to caret and the new select box
    caret.parent().css('position', 'relative').end().css({
        'position': 'absolute',
        'transition': 'all 0.2s ease-in-out',
        'top': (customSelect.outerHeight() - customSelect.height()) / 2,
        'right': '20px'
    });
//    creating li dynamically from the options of the original select box
    selectBox.children('option').each(function () {
        var li = $('<li>', {
            'data-target': $(this).val(),
            'class': $(this)[0].hasAttribute('selected') ? 'selected' : null
        }).text($(this).text());
//        hiding the li which just created
        customSelect.append(li.hide());
    });
//    Setting Styles
    customSelect.before($('<style>').text(
        '#' + customSelect[0].id + '{padding: 0} #' +
            customSelect[0].id + ' li{padding:10px 0 10px 10px;cursor: pointer;} #' +
            customSelect[0].id + ' li:hover {background-image:linear-gradient(to right, #fdfdfd, #fafafa)} #' +
            customSelect[0].id + ' li.selected {background-image:linear-gradient(to bottom, #fcfcfc, #f1f1f1)}'
    ));
//    Show the default option
    $('li.selected', customSelect).eq(0).show();
//    setting the default stats on first click
    clickStats = {
        fullHeight: $('option', selectBox).length * $('li', customSelect).eq(1).outerHeight() + customSelect.outerHeight() - customSelect.height(),
        height: customSelect.outerHeight(),
        nextHeight: function () {
            return this.fullHeight;
        }
    };
//    toggle selected options
    $('li', customSelect).on('click', function (e) {
        var t = $(e.target);
        if (!t.hasClass('selected')) {
            $('li.selected').eq(1).removeClass('selected');
            t.addClass('selected');
            $('li.selected').eq(0).data('target', t.data('target')).text(t.text());
            if (clickEvent === 'normal') {
                selectBox.val(t.data('target'));
            } else if (clickEvent === 'swap' && forms.length > 0) {
                swapForms(forms[$('li', customSelect).index(t) - 1]);
                selectBox.val($('option', selectBox).eq($('li', customSelect).index(t) - 1).val());
            }
        }
    });
//    main function
    customSelect.add(caret).on('click', function (e) {
        var intv,//interval declaration
            h = clickStats.nextHeight(),//next height for the new select box
            i = 1,
            lis = $('li', customSelect);
        //hiding the default option
        $('li.selected').eq(0).hide();
        $('li.selected').eq(1).show();
        customSelect.animate({'height': h}, (lis.length) * 200);
        intv = setInterval(function () {
            if (clickStats.nextHeight() === clickStats.height) {
                caret.css({
                    'transform': 'rotateZ(90deg)',
                    'transition-duration': (lis.length - 1) * 0.2 + 's',
                    'top': lis.index($('li.selected').eq(1)) * lis.outerHeight() - lis.outerHeight() / 2 - 13
                });
                lis.eq(i).slideDown(400, function () {
                    $(this).prev().css('border-bottom', '1px solid #ccc');
                }).show();
            } else {
                caret.css({
                    'transition-duration': '0.2s',
                    'transform': 'none',
                    'top': lis.outerHeight() / 2 - 13
                });
                if (!lis.eq(i).hasClass('selected')) {
                    lis.eq(i).slideUp(200, function () {
                        $(this).prev().css('border-bottom', 'none');
                        $(this).hide();
                    });
                } else {
                    lis.eq(i).prev().css('border-bottom', 'none');
                }
            }
            i++;
            if (i === lis.length) {
                clearInterval(intv);
            }
        }, 200);
        //updating next click event's height for the new select box
        clickStats.nextHeight = function () {
            return ((h === this.height) ? this.fullHeight : this.height);
        };
    });
}
function swapForms(target) {
    'use strict';
    if (target) {
        var XHR = new XMLHttpRequest();
        XHR.open('GET', target.url, true);
        XHR.send();
        XHR.onreadystatechange = function () {
            if (XHR.readyState === 4 && XHR.status === 200) {
                $('#form-body').html(XHR.responseText);
            }
        };
    }
}