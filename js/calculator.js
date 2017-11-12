/*global $, console, jQuery, alert*/
/*jslint plusplus: true*/
var grading = [
    {
        grade: "A+",
        from: 97,
        to: 100,
        gpa: 4
    },
    {
        grade: "A",
        from: 93,
        to: 97,
        gpa: 4
    },
    {
        grade: "A-",
        from: 89,
        to: 93,
        range: 93 - 89,
        gpa: 3.7
    },
    {
        grade: "B+",
        from: 84,
        to: 89,
        range: 89 - 84,
        gpa: 3.3
    },
    {
        grade: "B",
        from: 80,
        to: 84,
        range: 84 - 80,
        gpa: 3
    },
    {
        grade: "B-",
        from: 76,
        to: 80,
        range: 80 - 76,
        gpa: 2.7
    },
    {
        grade: "C+",
        from: 73,
        to: 76,
        range: 76 - 73,
        gpa: 2.3
    },
    {
        grade: "C",
        from: 70,
        to: 73,
        range: 73 - 70,
        gpa: 2
    },
    {
        grade: "C-",
        from: 67,
        to: 70,
        range: 70 - 67,
        gpa: 1.7
    },
    {
        grade: "D+",
        from: 64,
        to: 67,
        range: 67 - 64,
        gpa: 1.3
    },
    {
        grade: "D",
        from: 60,
        to: 64,
        range: 64 - 60,
        gpa: 1
    },
    {
        grade: "F",
        from: 0,
        to: 60,
        range: 60,
        gpa: 0
    }
];
function getGpa(val) {
    'use strict';
    if (val === 100) {
        return {grade: 'A+', gpa: '4'};
    } else if (val >= 93) {
        return {grade: 'A', gpa: '4'};
    } else if (val < 60) {
        return {grade: 'F', gpa: '0'};
    } else {
        var result = {};
        grading.forEach(function (grade) {
            if (val >= grade.from && val < grade.to) {
                var g, x,
                    cur = grading.indexOf(grade),
                    diff = grading[cur - 1].gpa - grade.gpa;
                g = parseFloat((diff * ((val - grade.from) / grade.range) + grade.gpa).toPrecision(3).toString());
                result = {grade: grade.grade, gpa: g};
                return null;
            }
        });
        return result;
    }
}
/*------------calculate hundred percent------------*/
function closeAlert(div) {
    'use strict';
    div.slideUp(200, function () {
        $(this).text("");
    });
}//edit
function alertMessage(div, message, type, close) {
    'use strict';
    close = close || null;
    div.slideUp(0).text(message).addClass('alert').addClass('alert-' + type).slideDown();
    if (close !== null) {
        closeAlert(close);//this close the other message
    }
}//edit
function calcPercent(current, max, perc) {
    "use strict";
    current = current || null;
    max = max || null;
    var result,
        input = max || perc,
        err = input.parent().siblings(".messages").children('.error'),
        minRes = input.parent().siblings(".messages").children('.mini-result');
    perc = perc ? parseFloat(perc.val()) : (parseFloat(current.val()) / parseFloat(max.val())) * 100;
    result = getGpa(perc);
    alertMessage(minRes, 'Grade: ' + result.grade + ', GPA: ' + result.gpa, 'success', err);
    return {gpa: result.gpa};
}
function checkNumber(input) {
    'use strict';
    var errMsg = "",
        error = false,
        val = parseFloat(input.val());
    if (input.val() === "") {
        errMsg = "You must enter a value to be calculated.";
        error = true;
    } else if (isNaN(val)) {
        errMsg = "Only numeric values are allowed.";
        error = true;
    } else if (val < 0) {
        errMsg = "Only positive values are allowed.";
        error = true;
    }
    return {error: error, message: errMsg};
}
function sum(arr) {
    'use strict';
    var i,
        result = 0;
    for (i = 0; i < arr.length; i++) {
        result += arr[i];
    }
    return result;
}