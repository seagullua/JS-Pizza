function initialize() {
//Тут починаємо працювати з картою
    var mapProp = {
        center: new google.maps.LatLng(50.464379, 30.519131),
        zoom: 15
    };
    var html_element = document.getElementById("googleMaps");
    var map = new google.maps.Map(html_element, mapProp);

    //show shop marker
    var point = new google.maps.LatLng(50.464379, 30.519131);
    var shopMarker = new google.maps.Marker({
        position: point,
        map: map,
        icon: "assets/images/map-icon.png"
    });
    //Карта створена і показана
    
    var old_marker = null;

    google.maps.event.addListener(map, 'click', function (me) {
        var coordinates = me.latLng; //coordinates	- такий самий об’єкт як створений new google.maps.LatLng(...)

        if (old_marker) {
            old_marker.setMap(null);
            old_marker = null;
        }

        old_marker = new google.maps.Marker({
            position: coordinates,
            map: map,
            icon: "assets/images/home-icon.png"
        });
    });
}

//Коли сторінка завантажилась
google.maps.event.addDomListener(window, 'load', initialize);