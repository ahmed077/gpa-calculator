/*global jQuery, console, $, alert*/
/*jslint plusplus:true*/
var addSubject;
$(function () {
    'use strict';
    $('#sub-list').on('click', function (e) {
        e.preventDefault();
        $('nav ol').toggleClass('active');
    });
});
$('#addSubject').on('click', addSubject);

function addSubject() {
    'use strict';
    var i, formGroup, grid, input,
        row = $('<div>', {
            'class': 'row'
        }),
        labels = $('#labels label');
    for (i = 0; i < labels.length; i++) {
        formGroup = $('<div>', {'class': 'form-group'});
        grid = labels[i].className.split(" ");
        input = $('<input>', {
            "type": "text",
            'class': 'form-control',
            'required': 'required',
            'placeholder': $(".row").eq(3).children('.form-group').eq(i).children('input').attr('placeholder')
        });
        grid.forEach(function (x) {
            ((/^col/).test(x)) ? formGroup.addClass(x) : null;
        });
        row.append(formGroup.append(input));
    }
    row.append($('<div>', {
        'class': 'buttons col-xs-2'
    }).append(
        $('<div>', {
            'class': "btn btn-info pull-left"
        }).append($('<i>', {
            'class': 'fa fa-calculator'
        }))
    ).append(
        $('<div>', {'class': "btn btn-danger remove pull-left"})
            .append($('<i>', {'class': 'fa fa-remove'}))
    ).append(
        $('<div>', {'class': 'clearfix'})
    ));
    $('#form-body').append('<hr>').append(row);
}
$('#form-body').on('click', 'div.remove', function (e) {
    'use strict';
    var y = $(e.target).parentsUntil('.row').parent()[0],
        x = $('.row').index(y) - 3;
    y.remove();
    $('hr').eq(x).remove();
});
$('#calculate').on('click', function (e) {
    'use strict';
    //run validation script
    e.preventDefault();

});