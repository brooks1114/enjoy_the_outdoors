
let jurisdictionDropDownList = document.querySelector("#jurisdictionDropDownList");
let searchTypeDropDownWE = document.querySelector("#searchTypeDropDown");
let parkTypesDropDownListWE = document.querySelector("#typeDropDownList");
let nationalParkstableContainer = document.querySelector("#nationalParkstableContainer");
let displayAllParksButton = document.querySelector("#displayAllParksButton");

let tableHeadersNationalParks = ["LocationName", "Address", "City", "State", "Phone"];

let UsersParkList = [];


displayAllParksButton.addEventListener("click", function (event) {

    UsersParkList = [];
    UsersParkList = nationalParksArray;
    // console.log("getParkListToDisplayByState: " + JSON.stringify(UsersParkList));

    // generate the table and header columns
    generateTableNationalParksByType();
    // generate the row data for the table and append it to the table element
    generateRows(UsersParkList);


})
// Locations Drop Down.
// This generates the values for the drop down.
// currently the state list from locations json array
function generateLocationsDDLOptions() {

    jurisdictionDropDownList.innerHTML = `<option value="">Choose a Location</option>`;

    locationsArray.forEach((location) => {
        jurisdictionDropDownList.innerHTML += `<option value="${location}">${location}</option>`;
    })
}

// Park Types Drop Down.
// This generates the values for the drop down.
// currently the state list from park types json array
function generateParkTypesDDLOptions() {

    parkTypesDropDownListWE.innerHTML = `<option value="">Choose a Park Type</option>`;

    parkTypesArray.forEach((parkType) => {
        parkTypesDropDownListWE.innerHTML += `<option value="${parkType}">${parkType}</option>`;
    })
}

searchTypeDropDownWE.addEventListener("change", function (event) {

    // This onchange does not result in a new search result return. Need to clear the search results container
    clearNationalParkstableContainer();

    // When this drop down option is selected by user then hide the location and type drop downs if previously activated by user
    if (event.target.value === "default") {
        parkTypesDropDownListWE.classList.add("d-none");
        jurisdictionDropDownList.classList.add("d-none");
    }

    // When location is selected by user then unhide the location drop down, hide park type drop down
    if (event.target.value === "location") {
        // alert("do location things");
        jurisdictionDropDownList.classList.remove("d-none");
        parkTypesDropDownListWE.classList.add("d-none");

        // populate drop down options
        generateLocationsDDLOptions();
    }

    // When park type is selected by user then unhide the park type drop down, hide location drop down
    if (event.target.value === "type") {
        // alert("do location things");
        jurisdictionDropDownList.classList.add("d-none");
        parkTypesDropDownListWE.classList.remove("d-none");

        // populate drop down options
        generateParkTypesDDLOptions();
    }

})

jurisdictionDropDownList.addEventListener("change", function (event) {

    // clear the user search reulsts list
    // clearArray(UsersParkList);
    UsersParkList = [];
    UsersParkList = nationalParksArray.filter(getParkListToDisplayByState);
    // console.log("getParkListToDisplayByState: " + JSON.stringify(UsersParkList));

    // generate the table and header columns
    generateTableNationalParksByType();
    // generate the row data for the table and append it to the table element
    generateRows(UsersParkList);

})

parkTypesDropDownListWE.addEventListener("change", function (event) {

    // clearArray(UsersParkList);
    UsersParkList = [];
    UsersParkList = nationalParksArray.filter(getParkListToDisplayByLocationName);
    // console.log("getParkListToDisplayByLocationName: " + JSON.stringify(UsersParkList));

    // generate the table and header columns
    generateTableNationalParksByType();
    // generate the row data for the table and append it to the table element
    generateRows(UsersParkList);

})

// use the user selected dro pdown value to filter through the park list and return park matches.
// Strings are set to UPPERCASE due to case insensitivity from the .includes function
function getParkListToDisplayByLocationName(array) {

    let parkTypeSelected = parkTypesDropDownListWE.value;
    let parkTypeSelectedUC = parkTypeSelected.toUpperCase();
    // console.log( "parkTypeSelected " + parkTypeSelectedUC);
    // console.log("array.LocationName.toUpperCase() " + array.LocationName.toUpperCase());
    return array.LocationName.toUpperCase().includes(parkTypeSelectedUC);

}

// use the user selected dro pdown value to filter through the park list and return park matches.
// Strings are set to UPPERCASE due to case insensitivity from the .includes function
function getParkListToDisplayByState(array) {
    let jurisdictionSelected = jurisdictionDropDownList.value;
    let jurisdictionSelectedUC = jurisdictionSelected.toUpperCase();
    // console.log("jurisdictionSelectedUC " + jurisdictionSelectedUC);
    // console.log("array.State.toUpperCase() " + array.State.toUpperCase());
    return array.State.toUpperCase().includes(jurisdictionSelectedUC);

}

// NOTE had to delete using this function, it caused the lists to stop populating when switching between drop down and buttons
// generic function to clear out data in an array
// function clearArray(array) {
//     while (array.length) {
//         array.pop();
//     }
// }

function getTableHeadersNationalParks() {
    // console.log("inside function getTableHeadersNationalParks");

    return tableHeadersNationalParks;
}

// This clears the container that holds the search reults. The table creator function and drop down selectors use this.
//  Clearing the conatiner will prevent prior search results from being retained.
function clearNationalParkstableContainer() {

    while (nationalParkstableContainer.firstChild) nationalParkstableContainer.removeChild(nationalParkstableContainer.firstChild) // delete the table if one exists
}


// this creates a table element to be imbedded into the html
// this also creates the header columns
// TODO make this more dynamic by passing in the table headers as a parameter so this function can be reused across web pages
function generateTableNationalParksByType() {
    clearNationalParkstableContainer()


    console.log("inside function generateTableNationalParksByType");
    let tableHeaders = getTableHeadersNationalParks();
    console.log("inside function generateTableNationalParksByType" + tableHeaders);

    let nationalParksByTypeTable = document.createElement('table') //create a table
    nationalParksByTypeTable.className = 'nationalParksByTypeTable' // set the property on the element

    let nationalParksByTypeTableHead = document.createElement('thead'); //create a table header group element
    nationalParksByTypeTableHead.className = 'nationalParksByTypeTableHead'

    let nationalParksByTypeTableRow = document.createElement('tr'); //create a table row to hold the header values
    nationalParksByTypeTableRow.className = 'nationalParksByTypeTableRow'

    // The table structure has been built, create a th for each column to display to the user
    // also insert the text for each header
    tableHeaders.forEach(header => {
        let parkTypeHeader = document.createElement('th')
        parkTypeHeader.innerText = header;
        nationalParksByTypeTableRow.append(parkTypeHeader)
    })

    // now add the th elements and data to the thead element
    nationalParksByTypeTableHead.append(nationalParksByTypeTableRow);
    // now add the thead containing the th elements and data to the table element
    nationalParksByTypeTable.append(nationalParksByTypeTableHead);

    // now create the table body to hold the rows (added in seperate function this function is already too large) 
    // TODO break this out into smaller function calls
    let nationalParksByTypeTableBody = document.createElement('tbody');
    nationalParksByTypeTableBody.className = "nationalParksByTypeTable-Body";
    nationalParksByTypeTable.append(nationalParksByTypeTableBody);

    // now add the whole table to the container on the DOM
    nationalParkstableContainer.append(nationalParksByTypeTable);

}

// This function is dependant on the generateTableNationalParksByType function
// If new data is needed then the getTableHeadersNationalParks will need to be updated to account for the additional columns and headers
// The order of the adding data to innerText does not matter. 
function generateRows(array) {

    const tableElement = document.querySelector('.nationalParksByTypeTable');
    console.log("rows printing " + tableElement);
    for (i = 0; i < array.length; i++) {
        
        row = document.createElement('tr');

        let LocationName = document.createElement('td')

        // stretch goal. look at the national park object, if it contains a weblink then create an anchor for the href
        // determinition is made if the park object is missing the "Visit" attribute. that could lead to bad links if attribute is added to array objects. leaving this In
        if (array[i].Visit !== undefined) {    // TODO refactor, "undefined" is a bad identifier for this if statement
            // obtain URL
            var webLink = array[i].Visit;
            // create the anchor
            var aTag = document.createElement('a');
            // add the href and set the link 
            aTag.setAttribute('href', webLink);
            // set the anchor to open in a new tab
            aTag.setAttribute('target', '_blank');
            // set the visible text in the table to the location name
            aTag.innerText = array[i].LocationName;
            // add the anchor to the td
            LocationName.appendChild(aTag);
        } else {
            // else - if the Visit attribute is not availble put the Location name in the td, no anchor or link
            LocationName.innerText = array[i].LocationName
        }
        let Address = document.createElement('td')
        Address.innerText = array[i].Address
        let City = document.createElement('td')
        City.innerText = array[i].City
        let State = document.createElement('td')
        State.innerText = array[i].State
        let Phone = document.createElement('td')
        if (array[i].Phone == 0) {
            Phone.innerText = "Not Available"
        } else
            Phone.innerText = array[i].Phone

        // this append must match the order of the array used to create the table headers to be in alignment, or data will not align with header
        row.append(LocationName, Address, City, State, Phone);

        // Now add your rows to the table element
        tableElement.append(row);
    }



    // garbage code - keep for reference only until project is done.



    // The function below will accept a single score and its index to create the global ranking
    // const appendScores = (singleScore, singleScoreIndex) => {
    // const scoreboardTable = document.querySelector('.nationalParksByTypeTable') // Find the table we created
    // let scoreboardTableBodyRow = document.createElement('tr') // Create the current table row
    // scoreboardTableBodyRow.className = 'scoreboardTableBodyRow'
    // // Lines 72-85 create the 5 column cells that will be appended to the current table row
    // let LocationName = document.createElement('td')
    // LocationName.innerText = array.LocationName
    // let usernameData = document.createElement('td')
    // usernameData.innerText = array.Address
    // let scoreData = document.createElement('td')
    // scoreData.innerText = array.City
    // let timeData = document.createElement('td')
    // timeData.innerText = array.State
    // let accuracyData = document.createElement('td')
    // accuracyData.innerText = array.Phone
    // scoreboardTableBodyRow.append(LocationName, usernameData, scoreData, timeData, accuracyData) // Append all 5 cells to the table row
    // scoreboardTable.append(scoreboardTableBodyRow) // Append the current row to the scoreboard table body
    // }
}
// jurisdictionDropDownList.addEventListener("click", function (event) {

// console.log(locationsArray);
// console.log(nationalParksArray);

// locationsArray.forEach((location) => {
// jurisdictionDropDownList.innerHTML += `<option> ${location}</option>`;



// jurisdictionDropDownList.innerHTML += `<option value=>${location}</option>`;
// jurisdictionDropDownList.append('<option></option>').text(location);
// theSampleUl.innerHTML += `<li>${location}</li>`
// })

// theSampleUl.classList.remove("d-none");


// })

    // alert("do location thingstriggered");
    // let jurisdictionSelected = jurisdictionDropDownList.value;
    // console.log("jurs selected by user equals: " + jurisdictionSelected);
    // for (x = 0; x < nationalParksArray.length; x++){
    //     console.log("getParkListToDisplay: " + JSON.stringify(nationalParksArray[x].LocationName));
    // }

    // nationalParksArray.forEach(o => console.log(o.LocationName.toUpperCase()));
    // console.log(nationalParksArray[0][0]);

    // alert("do location thingstriggered");
    // let parkTypeSelected = parkTypesDropDownListWE.value;
    // console.log("jurs selected by user equals: " + parkTypeSelected);
        // alert("You pushed the give all button");
    // clearNationalParkstableContainer();
    // clearArray(UsersParkList);