$(function() {
    var $cart = $('#cart');
    var $top = $('.top-part');
    $cart.find('.price').append(' грн');
    $cart.find('.count').css('margin-left', '10px');
    $cart.find('.count').append(' піца');
    $cart.find('.minus').remove();
    $cart.find('.plus').remove();
    $cart.find('.remove').remove();
    $top.find('#top-p').remove();
    $('#inputName').focus(function () {
        var name;
        $('#inputName').keyup(function () {
            name = $('input.name').val();
            if (validName(name)) {
                $('.name-form.form-group').removeClass('has-error');
                $('#helpName').css('display', 'none');
                $('.name-form.form-group').addClass('has-success');
            } else {
                $('.name-form.form-group').addClass('has-error');
                $('#helpName').css('display', 'block');
            }
        });
    });
    $('#inputPhone').focus(function () {
        var number;
        $('#inputPhone').keyup(function () {
            number = $('input.phone').val();
            if (validNumberLength(number) && validFigures(number) && validNumber(number)) {
                $('.phone-form.form-group').removeClass('has-error');
                $('#helpPhone').css('display', 'none');
                $('.phone-form.form-group').addClass('has-success');
            } else {
                $('.phone-form.form-group').addClass('has-error');
                $('#helpPhone').css('display', 'block');
            }
        });
    });
    $('#inputAddress').focusout(function () {
        var address;
        address = $('input.address').val();
        locationFromAddress(address, function (err, lat, lng) {
            if (lng >= 30.239454 && lng <= 30.825852 && lat <= 50.591428 && lat >= 50.213997) {
                var coordinates = new google.maps.LatLng(lat, lng);
                if (!err) {
                }
            } else {
                console.log('Error');
            }
        });
    });
    $('.accept-button').click(function () {
        var name = $('input.name').val();;
        var number = $('input.phone').val();
        var address = $('input.address').val();
        if (name.length === 0) {
            $('.name-form.form-group').addClass('has-error');
            $('#helpName').css('display', 'block');
        }
        if (number.length === 0) {
            $('.phone-form.form-group').addClass('has-error');
            $('#helpPhone').css('display', 'block');
        }
        if (address.length === 0) {
            $('.address-form.form-group').addClass('has-error');
            $('#helpAddress').css('display', 'block');
        }
    });
    google.maps.event.addDomListener(window, 'load', initializeMaps);
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

function validFigures(number) {
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
            case '+':
                valid = true;
                break;
            default: valid = false;
        }
        if (!valid) break;
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

function validNumber(number) {
    var valid;
    if (number.length === 13 && number.charAt(0) === '+' && number.charAt(1) === '3' && number.charAt(2) === '8' && number.charAt(3) === '0') {
        valid = true;
    } else {
        if (number.length === 10 && number.charAt(0) === '0') {
            valid = true;
        } else {
            valid = false;
        }
    }
    return valid;
}

function initializeMaps() {
    var mapProportion = {
      center: new google.maps.LatLng(50.464415, 30.519231),
      zoom: 13
    };
    var html_element = document.getElementById('maps');
    var map = new google.maps.Map(html_element, mapProportion);
    var point =	new google.maps.LatLng(50.464379,30.519131);
    var icon = 'assets/images/map-icon.png';
    var marker = new google.maps.Marker({
       position: point,
       map: map,
       icon: icon
    });
    var last;
    var lastRoute;
    var lastmarker = false;
    var a = false;
    google.maps.event.addListener(map, 'click', function (click) {
        var directionDisplay = new google.maps.DirectionsRenderer();
        var coordinats = click.latLng;
        var lat = coordinats.lat();
        var lng = coordinats.lng();
        if (lng >= 30.239454 && lng <= 30.825852 && lat <= 50.591428 && lat >= 50.213997) {
            var icon = 'assets/images/home-icon.png';
            var marker = new google.maps.Marker({
                position: coordinats,
                icon: icon
            });
            if (!lastmarker) {
                marker.setMap(map);
            } else {
                last.setMap(null);
                marker.setMap(map);
            }
            addressFromLocation(coordinats, function (err, address) {
                if (!err) {
                    $('input.address').val(address);
                    $('.shipping-address').text(address);
                }
            });
            var z;
            calculateTimeToDeliver(point, coordinats, function (err, road, direction) {
                if (!a) {
                    $('.shipping-time').text(road.duration.text);
                    directionDisplay.setDirections(direction);
                    directionDisplay.setMap(map);
                    z = directionDisplay;
                    a = true;
                } else {
                    z.setMap(null);
                }
            });
            last = marker;
            lastRoute = directionDisplay;
            lastmarker = true;
            $('.address-form.form-group').removeClass('has-error');
            $('.address-form.form-group').addClass('has-success');
            $('#helpAddress').css('display', 'none');
        } else {
            initializeMaps();
            $('input.address').val('');
            $('.shipping-address').text('невідома');
            $('.shipping-time').text('невідомий');
            $('.address-form.form-group').addClass('has-error');
            $('#helpAddress').css('display', 'block');
        }
    });
}

function addressFromLocation(latlng, callback) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({location: latlng}, function (res, status) {
        if (status === google.maps.GeocoderStatus.OK && res[1]) {
            var address = res[1].formatted_address;
            callback(null, address);
        } else {
            callback(new Error('Can not find address!'));
        }
    });
}

function locationFromAddress(address, callback) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address: address}, function (res, status) {
        if (status === google.maps.GeocoderStatus.OK && res[0]) {
            var lat = res[0].geometry.location.lat();
            var lng = res[0].geometry.location.lng();
            callback(null, lat, lng);
        } else {
            callback(new Error("Can not find the address"));
        }
    });
}

function calculateTimeToDeliver(A_latlng, B_latlng, callback) {
    var directionService = new google.maps.DirectionsService();
    directionService.route({
        origin: A_latlng,
        destination: B_latlng,
        travelMode: google.maps.TravelMode["DRIVING"]
    }, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            var leg = response.routes[0].legs[0];
            callback(null, {duration: leg.duration}, response);
        } else {
            callback(new Error('Can not find direction!'));
        }
    });
}