/*global jQuery, console, $, alert*/
/*jslint plusplus:true*/
//TODO: 
//#1 Toggle Forms Line:62
//#2 Validation script
var addSubject, customSelect,
    clickStats = {},
    selectActive = false;
$(function () {
    'use strict';
    var i,
        ul = $('#custom-select'),
        options = $('option');
    $('#sub-list').on('click', function (e) {
        e.preventDefault();
        $('nav ol').toggleClass('active');
    });
    /********************
             ###
     *******************/
    //    Edits
    $('#custom-select').append($('<li>', {
        'class': 'selected',
        'data-target': $(':selected').val()
    }).text($(':selected').text()));
    //Create Listed Items from Options
    for (i = 0; i < options.length; i++) {
        ul.append($('<li>', {
            'data-target': options.eq(i).val()
        }).text(options.eq(i).text()).hide());
    }
    $("li[data-target='" + $(':selected').val() + "']").not('.selected').addClass('current');
    clickStats = {
        hide: $('.selected'),
        show: $('.current'),
        fullHeight: $('option').length * $('#custom-select li').outerHeight() + $('#custom-select').outerHeight() - $('#custom-select').height(),
        height: $('#custom-select').outerHeight(),
        nextHeight: function () {
            return this.fullHeight;
        }
    };
    /********************
             ###
     *******************/
    $('#addSubject').on('click', addSubject);
    $('#form-body').on('click', 'div.remove', function (e) {
        var y = $(e.target).parentsUntil('.row').parent()[0],
            x = $('.row').index(y) - 4;
        y.remove();
        $('hr').eq(x).remove();
    });
    $('#calculate').on('click', function (e) {
        //run validation script
        e.preventDefault();
    });
    /********************
             ###
     *******************/
    //Edits
    $('#custom-select').on('click', function (e) {
        customSelect($('#custom-select'));
    });
    $('#custom-select li').not('.selected').on('click', function (e) {
        var x = $(e.target);
        $('li.current').removeClass('current');
        x.addClass('current');
        $('.selected').data('target', x.data('target')).text(x.text());
        //toggle forms
//        $(':selected').removeAttr('selected');
//        $("option[value='" + $('li.current').data('target') + "']").attr('selected', 'selected');
        $('select').val($('li.current').data('target'));
    });
});
/********************
         ###
 *******************/
function customSelect(container) {
    'use strict';
    var i, intv,
        h = clickStats.nextHeight(),
        ul = container,
        lis = $('li', ul),
        options = $('option');
    clickStats.hide.hide();
    clickStats.show.show();
    clickStats.nextHeight = function () {
        return ((h === this.height) ? this.fullHeight : this.height);
    };
    ul.toggleClass('active').animate({
        height: h
    }, 800);
    if (selectActive) {
        i = lis.length;
        clickStats.show.hide();
        clickStats.hide.css('border-bottom', '1px solid #ccc').show();
        intv = setInterval(function () {
            lis.eq(i).fadeOut(0, function () {
                $(this).prev().css('border-bottom', 'none');
            });
            i--;
            if (i === 1) {
                clearInterval(intv);
                setTimeout(function () {
                    $('.selected').css('border-bottom', 'none');
                }, 300);
            }
        }, 100);
        $(ul).siblings('i').removeClass('current').css('top', $(lis).eq(0).position().top + 6);
        selectActive = false;
    } else {
        i = 2;
        intv = setInterval(function () {
            lis.eq(i).fadeIn(100, function () {
                $(this).prev().css('border-bottom', '1px solid #ccc');
            });
            i++;
            if (i === lis.length) {
                clearInterval(intv);
                $(ul).siblings('i').addClass('current').css('top', $("li.current").position().top + 6);
            }
        }, 200);
        selectActive = true;
    }
}

function addSubject() {
    'use strict';
    var i, formGroup, grid, input, c,
        row = $('<div>', {'class': 'row'}),
        labels = $('#labels label');
    for (i = 0; i < labels.length; i++) {
        c = labels.eq(i)[0].className;
        formGroup = $('<div>', {
            'class': 'form-group ' + c.substring(c.search("col"), c.search(/\d/, c.search("col")) + 1)
        });
        input = $('<input>', {
            "type": "text",
            'class': 'form-control',
            'required': 'required',
            'placeholder': $(".row").eq(4).children('.form-group').eq(i).children('input').attr('placeholder')
        });
        row.append(formGroup.append(input));
    }
    row.append($('<div>', {'class': 'buttons col-xs-2'})
               .append(
            $('<div>', {'class': "btn btn-info pull-left"})
                .append($('<i>', {'class': 'fa fa-calculator'}))
        ).append(
            $('<div>', {'class': "btn btn-danger remove pull-left"})
                .append($('<i>', {'class': 'fa fa-remove'}))
        ).append(
            $('<div>', {'class': 'clearfix'})
        ));
    $('#form-body').append('<hr>').append(row);
}
