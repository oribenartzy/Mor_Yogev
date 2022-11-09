var autocomplete;

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */
    (document.getElementById("search")),
    {
      types: ["geocode"],
    }
  );

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener("place_changed", fillInAddress);
}

function fillInAddress() {
  const resultsTable = $("#results");
  var place = autocomplete.getPlace();
  console.log(place);
  var latMin = place.geometry.viewport.eb.lo;
  var latMax = place.geometry.viewport.eb.hi;
  var lngMin = place.geometry.viewport.Ha.lo;
  var lngMax = place.geometry.viewport.Ha.hi;

  // post methode
  $.post(
    "http://localhost:3000/getReportsBySearch",
    {
      latMin,
      latMax,
      lngMin,
      lngMax,
    },
    function (response, status) {
      resultsTable.html(`
      <tr>
        <th>serialNumber</th>
        <th>addres</th>
        <th> dateTime</th>
        <th> type </th>
        <th> details </th>
      </tr>
    `);

      //show result
      response?.reports?.forEach(function (report) {
        resultsTable.append(`
        <tr>
          <td>${report.serialNumber} </td>
          <td> ${report.addres} </td>
          <td> ${report.reportDT}  </td>
          <td> ${report.reportType} </td>
          <td> ${report.reportDetails} </td>
        </tr>

      `);
      });
    }
  );
}
