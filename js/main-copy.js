/*global jQuery, console, $, alert*/
/*jslint plusplus:true*/
//TODO: 
//#1 Validation script
//#2 Integrating calculation functions
var forms = [
    {
        value: 'Form1',
        url: '../forms/default.html'
    },
    {
        value: 'Form2',
        url: '../forms/optionone.html'
    }
],
    x = new SelectBox(true, document.getElementsByTagName('select')[0], 'swap', forms);
// SelectBox(active, Original Select Box Element, TODO at select, forms array in case of swapping)
var addSubject, clearInput;
//functions declaration
$(function () {
    'use strict';
    var i,
        ul = $('#custom-select'),
        options = $('option');
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
    $("#form-body").on("click", 'div#clear' , function (e) {
        clearInput($(e.target));
    });
});
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
            'placeholder': $(".row").last().children('.form-group').eq(i).children('input').attr('placeholder')
        });
        row.append(formGroup.append(input));
    }
    var cloned = $('.buttons').eq(0).clone();
    cloned.children().each(function () {
        if ($(this)[0].id) {
            $(this)[0].id = "";
        }
        $(this)[0].className = $(this)[0].className.replace('warning', 'danger') + ' remove';
    });
    row.append(cloned);
    $('#form-body').append('<hr>').append(row);
}
function clearInput(btn) {
    'use strict';
    btn.parentsUntil('.row').parent().children().children('input').each(function () {
        $(this).val("");
    });
}
/*--------validation----------*/
