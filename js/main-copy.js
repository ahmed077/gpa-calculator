/*global jQuery, console, $, alert, SelectBox, calcPercent, closeAlert, sum, alertMessage, checkNumber*/
/*jslint plusplus:true*/
var addSubject, clearInput, calcSubject;
//functions declaration
$(function () {
    'use strict';
    var i,
        ul = $('#custom-select'),
        options = $('option'),
        forms = [
            {
                value: 'Form1',
                url: 'forms/default.html'
            },
            {
                value: 'Form2',
                url: 'forms/optionone.html'
            }
        ],
        x = new SelectBox(true, document.getElementsByTagName('select')[0], 'swap', forms);
    $('#sub-list').on('click', function (e) {
        e.preventDefault();
        $('nav ol').toggleClass('active');
    });
    $('#addSubject').on('click', addSubject);
    $('#form-body').on('click', 'div.remove', function (e) {
        var y = $(e.target).parentsUntil('.row').parent()[0],
            x = $('.row').index(y) - 3;
        y.remove();
        $('hr').eq(x).remove();
    });
    $('#calculate').on('click', function (e) {
        //run validation script
        e.preventDefault();
        var x, y,
            noErr = false,
            gpa = [],
            multiply = [],
            hours = [];
        $('#form-body > .row').not($('#form-body > .row').eq(0)).each(function () {
            var row = $(this).children(),
                gp = calcSubject(row),
                h = row.children('.hour'),
                result;
            if (gp) {
                result = checkNumber(h);
                if (result.error) {
                    alertMessage($('#result'), result.message, "danger");
                    noErr = false;
                    return null;
                } else {
                    h = parseInt(h.val(), 10);
                    gpa.push({gpa: gp.gpa, h: h});
                    hours.push(h);
                    noErr = true;
                }
            } else {
                alertMessage($('#result'), "Please fix errors above.", "danger");
                noErr = false;
                return null;
            }
        });
        if (noErr) {
            $(gpa).each(function () {
                var c = $(this)[0];
                multiply.push(parseFloat(c.gpa, 10) * parseInt(c.h, 10));
            });
            x = sum(multiply);
            y = sum(hours);
            alertMessage($('#result').removeClass('alert-danger'), 'Total GPA: ' + (x / y).toPrecision(3), 'success');
        }
    });
    $("#form-body").on("click", 'div#clear', function (e) {
        clearInput($(e.target));
    });
    /*--------mini calculate----------*/
    $("#form-body").on("click", 'div.mini-calculate', function () {
        closeAlert($('#result'));
        
        calcSubject($(this).parent().siblings());
    });
    // SelectBox(active, Original Select Box Element, TODO at select, forms array in case of swapping)
});

function addSubject() {
    'use strict';
    var row = $('#form-body .row').eq(1).clone();
    row.children().children().each(function () {
        var th = $(this);
        if (th.hasClass('alert')) {
            th.removeClass('alert').removeClass('alert-danger').removeClass('alert-success');
        } else if (th.hasClass('btn-warning')) {
            th[0].id = "";
            th[0].className = th[0].className.replace('warning', 'danger') + ' remove';
        }
        th.val("");
    });
    row.children('.messages').children().each(function () {
        $(this).text("");
    });
    $('#form-body').append('<hr>').append(row);
}

function clearInput(btn) {
    'use strict';
    btn.parentsUntil('.row').parent().children().children('input').each(function () {
        $(this).val("");
    });
    closeAlert(btn.parentsUntil('.row').siblings('.messages').children());//edit
}
function calcSubject(elem) {
    'use strict';
    var current, max, err, minRes, perc, input, i,
        x = false,
        result = [];
    if ($('.min').length > 0) {
        current = elem.children(".min");
        max = elem.children(".max");
        result[0] = checkNumber(current);
        result[1] = checkNumber(max);
        result[2] = parseFloat(current.val()) > parseFloat(max.val()) ?
                {error: true, message: "Your current value must be not bigger than max value."} :
                {error: false};
    } else {
        perc = elem.children('.perc');
        result[0] = checkNumber(perc);
        result[1] = parseFloat(perc.val()) > 100 ? {error: true, message: "Percentage can't be higher than 100%."} : {error: false};
    }
    input = current || perc;
    for (i = 0; i < result.length; i++) {
        if (result[i].error) {
            err = input.parent().siblings(".messages").children('.error');
            minRes = input.parent().siblings(".messages").children('.mini-result');
            alertMessage(err, result[i].message, 'danger', minRes);
            x = true;
            break;
        }
    }
    if (x) {
        return null;
    } else {
        return calcPercent(current, max, perc);
    }
}