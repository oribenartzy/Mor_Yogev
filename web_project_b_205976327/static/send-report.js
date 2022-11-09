var lat;
var lang;
var reportType;
var reportDetails;
var adrees;

// convert latkng -> adrees as string
const geocoder = new google.maps.Geocoder();

// geolocation function -  getCurrentPosition
navigator.geolocation.getCurrentPosition(
  function (position) {
    lat = position.coords.latitude;
    lang = position.coords.longitude;
  },
  function errorCallback(error) {
    console.log(error);
  }
);

const reportForm = document.getElementById("form-report");

//When the user clicks submit,We will fill the object of the report
reportForm.addEventListener("submit", (e) => {
  e.preventDefault();
  reportType = document.querySelector("input[name='reportType']:checked").value;
  reportDetails = document.forms["form-report"].Details.value;

  //post method
  geocodeLatLng(geocoder).then((response) => {
    adrees = response.results[0].formatted_address;
    $.post("http://localhost:3000/sendReport", {
      addres: adrees,
      lat: lat,
      lng: lang,
      reportDetails: reportDetails,
      reportType: reportType,
    });
  });
  alert(" thanks for your report!  you can see your report in real time map ");
});

// make latlng to readable
async function geocodeLatLng(Geocoder) {
  const input = lat + "," + lang;
  const latlngStr = input.split(",", 2);
  const latlng = {
    lat: lat,
    lng: lang,
  };
  return geocoder.geocode({ location: latlng });
}
