(function (w) {
  var $ = w.jQuery,
    loadGPXFileIntoGoogleMap = function (map, filename) {
      $.ajax({
        url      : filename,
        dataType : "xml",
        success  : function (data) {
          var parser = new GPXParser(data, map);
          parser.setTrackColour("#ff0000");     // Set the track line colour
          parser.setTrackWidth(5);          // Set the track line width
          parser.setMinTrackPointDelta(0.001);      // Set the minimum distance between track points
          parser.centerAndZoom(data);
          parser.addTrackpointsToMap();         // Add the trackpoints
          parser.addWaypointsToMap();           // Add the waypoints
        }
      });
    },
    loadGpxViewer = function () {
      var gpxBody = $("#holder_map_0");
      if (gpxBody.length == 0) {
        return null;
      }
      var mapType = gpxBody.data('maptype');
      var gpxFile = gpxBody.data('gpx');

      var mapOptions = {
        zoom      : 12,
        mapTypeId : google.maps.MapTypeId[mapType]
      };
      var map = new google.maps.Map(document.getElementById("map_0"), mapOptions);
      loadGPXFileIntoGoogleMap(map, gpxFile);
      return null;
    },

  // main function
    done = false,
    ready = function () {
      $('form.searchform').on('submit', function (event) {
        if (false === done) {
          event.preventDefault();
          var target = event.currentTarget || event.target;
          var $form = w.jQuery(target);
          var orgVal = $form.find('.search').val();
          $form.find('.search').val('site:www.schumacher.fm/blog/ ' + orgVal);
          done = true;
          $form.submit();
        }
      });
      $('.hentry').matchHeight();
      $('.related.post-hover').matchHeight();
      loadGpxViewer();
    };

  if (window.addEventListener) {
    window.addEventListener('load', ready, false)
  } else {
    if (window.attachEvent) {
      window.attachEvent('onload', ready)
    }
  }
})(window);