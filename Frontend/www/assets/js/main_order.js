$(function() {
    var $cart = $('#cart');
    var $top = $('.top-part');
    var a = $cart.find('.count').text();
    var b = parseInt(a);
    $cart.find('.price').append(' грн');
    $cart.find('.count').css('margin-left', '10px');
    $cart.find('.count').append(' піца');
    $cart.find('.minus').remove();
    $cart.find('.plus').remove();
    $cart.find('.remove').remove();
    $top.find('#top-p').remove();
    $('#inputName').click(function () {
        var onetime = true;
        var name;
        $('#inputName').keyup(function () {
            if (onetime) {
                name = $('input.name').val();
                if (validName(name)) {
                    $('.name-form.form-group').removeClass('has-error');
                    $('#helpName').css('display', 'none');
                    $('.name-form.form-group').addClass('has-success');
                } else {
                    $('.name-form.form-group').addClass('has-error');
                    $('#helpName').css('display', 'block');
                }
            }
        });
    });
    $('#inputPhone').click(function () {
        var onetime = true;
        var number;
        $('#inputPhone').keyup(function (e) {
            if (onetime) {
                number = $('input.phone').val();
                if (validNumberLength(number)) {
                    if (validNumbers(number)) {
                        $('.phone-form.form-group').removeClass('has-error');
                        $('#helpPhone').css('display', 'none');
                        $('.phone-form.form-group').addClass('has-success');
                    } else {
                        $('.phone-form.form-group').addClass('has-error');
                        $('#helpPhone').css('display', 'block');
                    }
                } else {
                    $('.phone-form.form-group').addClass('has-error');
                    $('#helpPhone').css('display', 'block');
                }
            }
        });
    });
});

function validName(name) {
    var valid = true;
    if (name.length === 0) {
        valid = false;
    }
    for (var i = 0; i < name.length; i++) {
        var a = name.charAt(i);
        switch (a) {
            case '0':
                valid = false;
                break;
            case '1':
                valid = false;
                break;
            case '2':
                valid = false;
                break;
            case '3':
                valid = false;
                break;
            case '4':
                valid = false;
                break;
            case '5':
                valid = false;
                break;
            case '6':
                valid = false;
                break;
            case '7':
                valid = false;
                break;
            case '8':
                valid = false;
                break;
            case '9':
                valid = false;
                break;
        }
    }
    return valid;
}

function validNumbers(number) {
    var valid;
    for (var i = 0; i < number.length; i++) {
        var a = number.charAt(i);
        switch (a) {
            case '0':
                valid = true;
                break;
            case '1':
                valid = true;
                break;
            case '2':
                valid = true;
                break;
            case '3':
                valid = true;
                break;
            case '4':
                valid = true;
                break;
            case '5':
                valid = true;
                break;
            case '6':
                valid = true;
                break;
            case '7':
                valid = true;
                break;
            case '8':
                valid = true;
                break;
            case '9':
                valid = true;
                break;
        }
    }
    return valid;
}

function validNumberLength(number) {
    var valid;
    if (number.length === 10 || number.length === 13) {
        valid = true;
    } else {
        valid = false;
    }
    return valid;
}