$(function() {
    var API = require('./API');
    var Cart = require('./pizza/PizzaCart');
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
        var name = $('input.name').val();
        $('#inputName').keyup(function () {
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
    $('#inputName').focusout(function () {
        var name = $('input.name').val();
        if (validName(name)) {
            $('.name-form.form-group').removeClass('has-error');
            $('#helpName').css('display', 'none');
            $('.name-form.form-group').addClass('has-success');
        } else {
            $('.name-form.form-group').addClass('has-error');
            $('#helpName').css('display', 'block');
        }
    });
    $('#inputPhone').focus(function () {
        var number = $('input.phone').val();
        $('#inputPhone').keyup(function () {
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
    $('#inputPhone').focusout(function () {
        var number = $('input.phone').val();
        if (validNumberLength(number) && validFigures(number) && validNumber(number)) {
            $('.phone-form.form-group').removeClass('has-error');
            $('#helpPhone').css('display', 'none');
            $('.phone-form.form-group').addClass('has-success');
        } else {
            $('.phone-form.form-group').addClass('has-error');
            $('#helpPhone').css('display', 'block');
        }
    });
    $('#inputAddress').focusout(function () {
        var address;
        address = $('input.address').val();
        locationFromAddress(address, function (err, lat, lng) {
            var coordinates = new google.maps.LatLng(lat, lng);
            var icon = 'assets/images/home-icon.png';
            var marker = new google.maps.Marker({
                position: coordinates,
                icon: icon,
            });
            if (lng >= 30.239454 && lng <= 30.825852 && lat <= 50.591428 && lat >= 50.213997) {
                $('.shipping-address').text(address);
                $('.address-form.form-group').removeClass('has-error');
                $('.address-form.form-group').addClass('has-success');
                $('#helpAddress').css('display', 'none');
                addMarker(marker, coordinates);
            } else {
                $('input.address').val('');
                $('.shipping-time').text('невідомий')
                $('.shipping-address').text('невідома');
                $('.address-form.form-group').addClass('has-error');
                $('#helpAddress').css('display', 'block');
                removeMarker(marker);
            }
        });
    });
    $('.accept-button').click(function () {
        var name = $('input.name').val();
        var number = $('input.phone').val();
        var address = $('input.address').val();
        if (validEmpty(name, number, address)) {
            $('.contact-form').css('display', 'none');
            $('#maps').css('display', 'none');
            $('#liqpay').css('display', 'block');
            var orders = Cart.getFromStorage();
            var pizza = [];
            var name_pizza;
            var size;
            var count;
            var price = 0;
            var current_price;
            for (var i = 0; i < orders.length; i++) {
                name_pizza = orders[i].pizza.title;
                if (orders[i].size === 'big_size') {
                    size = 'Велика';
                } else {
                    size = 'Мала';
                }
                count = orders[i].quantity;
                current_price = orders[i].price;
                var pizza_info = {
                    name_pizza: name_pizza,
                    size: size,
                    quantity: count,
                    price: current_price
                };
                price += orders[i].price;
                pizza.push(pizza_info);
            }
            var order_info = {
                name: name,
                address: address,
                phone: number,
                pizza: pizza,
                price: price
            };
            API.createOrder(order_info, function (err, data) {
                if (!err) {
                    LiqPayCheckout.init({
                        data: data.data,
                        signature: data.signature,
                        embedTo: "#liqpay",
                        mode: "embed",
                    }).on("liqpay.callback", function(data){
                        console.log(data.status);
                        console.log(data);
                        alert('Оплата пройшла успішно. Очікуйте доставку.');
                        $('.contact-form').css('display', 'block');
                        $('#maps').css('display', 'block');
                        $('#liqpay').css('display', 'none');
                    }).on("liqpay.ready", function(data){
                    }).on("liqpay.close", function(data){
                    });
                } else {
                    alert('Неправильно введені дані!');
                }
            });
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

function validEmpty(name, number, address) {
    var valid = true;
    if (name.length === 0) {
        $('.name-form.form-group').addClass('has-error');
        $('#helpName').css('display', 'block');
        valid = false;
    }
    if (number.length === 0) {
        $('.phone-form.form-group').addClass('has-error');
        $('#helpPhone').css('display', 'block');
        valid = false;
    }
    if (address.length === 0) {
        $('.address-form.form-group').addClass('has-error');
        $('#helpAddress').css('display', 'block');
        valid = false;
    }
    return valid;
}

function addMarker(homeMarker, coordinats) {
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
        icon: icon
    });
    var renderOptions = {
        suppressMarkers: true
    };
    homeMarker.setAnimation(google.maps.Animation.DROP);
    marker.setAnimation(google.maps.Animation.DROP);
    marker.setMap(map);
    homeMarker.setMap(map);
    var directionDisplay = new google.maps.DirectionsRenderer(renderOptions);
    var last;
    var lastmarker = false;
    calculateTimeToDeliverAndAddRoute(point, coordinats, function (err, time, direction, leg) {
        $('.shipping-time').text(time.duration.text);
        if (!lastmarker) {
            directionDisplay.setDirections(direction);
            directionDisplay.setMap(map);
            lastmarker = true;
        } else {
            directionDisplay.setMap(null);
            directionDisplay.setDirections(direction);
            directionDisplay.setMap(map);
        }
        google.maps.event.trigger(map, 'resize');
    });
    google.maps.event.addListener(map, 'click', function (click) {
        var coordinats = click.latLng;
        var lat = coordinats.lat();
        var lng = coordinats.lng();
        var icon = 'assets/images/home-icon.png';
        if (lng >= 30.239454 && lng <= 30.825852 && lat <= 50.591428 && lat >= 50.213997) {
            addressFromLocation(coordinats, function (err, address) {
                if (!err) {
                    $('input.address').val(address);
                    $('.shipping-address').text(address);
                }
            });
            calculateTimeToDeliverAndAddRoute(point, coordinats, function (err, time, direction, leg) {
                $('.shipping-time').text(time.duration.text);
                var end_marker = new google.maps.Marker({
                    position: leg.end_location,
                    icon: icon
                });
                if (lastmarker) {
                    homeMarker.setMap(null);
                    end_marker.setMap(map);
                    directionDisplay.setDirections(direction);
                    directionDisplay.setMap(map);
                    lastmarker = false;
                } else {
                    last.setMap(null);
                    homeMarker.setMap(null);
                    directionDisplay.setMap(null);
                    directionDisplay.setDirections(direction);
                    directionDisplay.setMap(map);
                    end_marker.setMap(map);
                }
                last = end_marker;
                google.maps.event.trigger(map, 'resize');
            });
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

function removeMarker(homeMarker) {
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
        icon: icon
    });
    var renderOptions = {
        suppressMarkers: true
    };
    var directionDisplay = new google.maps.DirectionsRenderer(renderOptions);
    directionDisplay.setMap(null);
    marker.setAnimation(google.maps.Animation.DROP);
    marker.setMap(map);
    homeMarker.setMap(null);
    var lastmarker = false;
    var last;
    google.maps.event.addListener(map, 'click', function (click) {
        var coordinats = click.latLng;
        var lat = coordinats.lat();
        var lng = coordinats.lng();
        var icon = 'assets/images/home-icon.png';
        if (lng >= 30.239454 && lng <= 30.825852 && lat <= 50.591428 && lat >= 50.213997) {
            addressFromLocation(coordinats, function (err, address) {
                if (!err) {
                    $('input.address').val(address);
                    $('.shipping-address').text(address);
                }
            });
            calculateTimeToDeliverAndAddRoute(point, coordinats, function (err, time, direction, leg) {
                $('.shipping-time').text(time.duration.text);
                var end_marker = new google.maps.Marker({
                    position: leg.end_location,
                    icon: icon
                });
                if (!lastmarker) {
                    end_marker.setMap(map);
                    directionDisplay.setDirections(direction);
                    directionDisplay.setMap(map);
                    lastmarker = true;
                } else {
                    last.setMap(null);
                    directionDisplay.setMap(null);
                    directionDisplay.setDirections(direction);
                    directionDisplay.setMap(map);
                    end_marker.setMap(map);
                }
                last = end_marker;
                google.maps.event.trigger(map, 'resize');
            });
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
       icon: icon
    });
    var last;
    var lastmarker = false;
    var renderOptions = {
        suppressMarkers: true
    };
    var directionDisplay = new google.maps.DirectionsRenderer(renderOptions);
    marker.setAnimation(google.maps.Animation.DROP);
    marker.setMap(map);
    google.maps.event.addListener(map, 'click', function (click) {
        var coordinats = click.latLng;
        var lat = coordinats.lat();
        var lng = coordinats.lng();
        var icon = 'assets/images/home-icon.png';
        if (lng >= 30.239454 && lng <= 30.825852 && lat <= 50.591428 && lat >= 50.213997) {
            addressFromLocation(coordinats, function (err, address) {
                if (!err) {
                    $('input.address').val(address);
                    $('.shipping-address').text(address);
                }
            });
            calculateTimeToDeliverAndAddRoute(point, coordinats, function (err, time, direction, leg) {
                $('.shipping-time').text(time.duration.text);
                var end_marker = new google.maps.Marker({
                    position: leg.end_location,
                    icon: icon
                });
                if (!lastmarker) {
                    end_marker.setMap(map);
                    directionDisplay.setDirections(direction);
                    directionDisplay.setMap(map);
                    lastmarker = true;
                } else {
                    last.setMap(null);
                    directionDisplay.setMap(null);
                    directionDisplay.setDirections(direction);
                    directionDisplay.setMap(map);
                    end_marker.setMap(map);
                }
                last = end_marker;
                google.maps.event.trigger(map, 'resize');
            });
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

function calculateTimeToDeliverAndAddRoute(A_latlng, B_latlng, callback) {
    var directionService = new google.maps.DirectionsService();
    directionService.route({
        origin: A_latlng,
        destination: B_latlng,
        travelMode: google.maps.TravelMode["DRIVING"]
    }, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            var leg = response.routes[0].legs[0];
            callback(null, {duration: leg.duration}, response, leg);
        } else {
            callback(new Error('Can not find direction!'));
        }
    });
}