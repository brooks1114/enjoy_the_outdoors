
let jurisdictionDropDownList = document.querySelector("#jurisdictionDropDownList");
let searchTypeDropDownWE = document.querySelector("#searchTypeDropDown");
let parkTypesDropDownListWE = document.querySelector("#typeDropDownList");

function generateLocationsDDLOptions() {

    jurisdictionDropDownList.innerHTML = `<option value="">Choose a Location</option>`;

    locationsArray.forEach((location) => {
        jurisdictionDropDownList.innerHTML += `<option value="${location}">${location}</option>`;
    })
}

function generateParkTypesDDLOptions() {

    parkTypesDropDownListWE.innerHTML = `<option value="">Choose a Location</option>`;

    parkTypesArray.forEach((parkType) => {
        parkTypesDropDownListWE.innerHTML += `<option value="${parkType}">${parkType}</option>`;
    })
}

searchTypeDropDownWE.addEventListener("change", function (event) {

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
        generateLocationsDDLOptions();

    }

    // When park type is selected by user then unhide the park type drop down, hide location drop down
    if (event.target.value === "type") {
        // alert("do location things");
        jurisdictionDropDownList.classList.add("d-none");
        parkTypesDropDownListWE.classList.remove("d-none");
        generateParkTypesDDLOptions();
    }

})







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



