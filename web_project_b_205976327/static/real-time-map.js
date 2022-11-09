var map;
var lat;
var lng;
var content_reportType;
var content_reportDetails;

navigator.geolocation.getCurrentPosition(
  function (position) {
    // Save coordinates to the local storage and then call the map page

    lat = position.coords.latitude;
    lng = position.coords.longitude;
    initialize(lat, lng);
  },
  function errorCallback(error) {
    console.log(error);
  }
);

function initialize() {
  // map
  var latlng = new google.maps.LatLng(lat, lng);
  var mapOptions = {
    zoom: 13,
    center: latlng,
  };
  map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

  // get method
  $.get("http://localhost:3000/getReportsToMap", function (response, status) {
    response?.reports?.forEach(function (report) {
      generateMarker(report);
    });
  });

  function generateMarker(report) {
    console.log(report);
    var type = "";
    switch (report.reportType) {
      case "darkStreet":
        type = "Dark Street";
        break;

      case "vehicle":
        type = "Car";
        break;

      case "person":
        type = "A person drunk/addict/suspect";
        break;
    }

    var pos = new google.maps.LatLng(report.lat, report.lng);
    var marker = new google.maps.Marker({
      map: map,
      position: pos,
      content: `
        <p><strong style="font-size: 20px;">${type}</strong></p>
        <code style="font-size: 16px;">${report.reportDetails}</code>
      `,
    });

    // Opening an info window by clicking on the marker
    marker.addListener("click", () => {
      const infowindow = new google.maps.InfoWindow({
        content: marker.content,
      });

      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: true,
      });
    });
  }
}
