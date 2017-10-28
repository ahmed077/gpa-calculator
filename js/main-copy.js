/*global jQuery, console, $, alert, SelectBox, calcPercent, closeAlert*/
/*jslint plusplus:true*/
//TODO: 
//#1 Validation script
//#2 Integrating calculation functions
var addSubject, clearInput;
//functions declaration
$(function () {
    'use strict';
    var i,
        ul = $('#custom-select'),
        options = $('option'),
        forms = [
            {
                value: 'Form1',
                url: './forms/default.html'
            },
            {
                value: 'Form2',
                url: './forms/optionone.html'
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
    });
    $("#form-body").on("click", 'div#clear', function (e) {
        clearInput($(e.target));
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
/*--------mini calculate----------*/
$("#form-body").on("click", 'div.mini-calculate', function (e) {
    'use strict';
    var sibs = $(this).parent().siblings(),
        current = sibs.children(".min"),
        max = sibs.children(".max");
    calcPercent(current, max);
});
