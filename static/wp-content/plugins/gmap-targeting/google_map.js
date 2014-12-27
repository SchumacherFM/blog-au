function pn_gmt_init_map(Lat, Lng, map_canvas_id, zoom, maptype, info, show_marker, show_popup, scrollwheel, custom_controls, marker_is_draggable) {
    var latLng = new google.maps.LatLng(Lat, Lng);
    var homeLatLng = new google.maps.LatLng(Lat, Lng);

    switch (maptype) {
        case "SATELLITE":
            maptype = google.maps.MapTypeId.SATELLITE;
            break;

        case "HYBRID":
            maptype = google.maps.MapTypeId.HYBRID;
            break;

        case "TERRAIN":
            maptype = google.maps.MapTypeId.TERRAIN;
            break;

        default:
            maptype = google.maps.MapTypeId.ROADMAP;
            break;

    }

    scrollwheel = parseInt(scrollwheel, 10);
    var map = {};
    if (custom_controls.length > 0) {
        var options = pn_merge_objects_options({
            zoom             : zoom,
            center           : latLng,
            mapTypeId        : maptype,
            scrollwheel      : scrollwheel,
            disableDefaultUI : true
        }, custom_controls);
        map = new google.maps.Map(document.getElementById(map_canvas_id), options);
    } else {
        map = new google.maps.Map(document.getElementById(map_canvas_id), {
            zoom        : zoom,
            center      : latLng,
            mapTypeId   : maptype,
            scrollwheel : scrollwheel
        });
    }

    show_marker = parseInt(show_marker, 10);
    if (show_marker) {
        var marker = new MarkerWithLabel({
            position  : homeLatLng,
            draggable : (parseInt(marker_is_draggable) == 1 ? true : false),
            map       : map
        });

        if (show_popup && info.length > 0) {
            var iw = new google.maps.InfoWindow({
                content : info
            });
            google.maps.event.addListener(marker, "click", function (e) {
                iw.open(map, marker);
            });
        }
    }

}

function pn_merge_objects_options(obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) {
        obj3[attrname] = obj1[attrname];
    }
    for (var attrname in obj2) {
        obj3[attrname] = obj2[attrname];
    }
    return obj3;
}

