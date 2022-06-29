"use strict"

let locationsArray = []
let nationalParksArray = []
let parkTypesArray = []
// let jurisdictionDropDownList = document.querySelector("#jurisdictionDropDownList");

window.onload = function(){

    loadJsonData("assets/data/locations.json").then((locations) => {
        locationsArray = locations;
    })

    loadJsonData("assets/data/nationalparks.json").then((nationalParks) => {
        nationalParksArray = nationalParks.parks;
    })

    loadJsonData("assets/data/parktypes.json").then((parkTypes) => {
        parkTypesArray = parkTypes;
    })

    locationsArray.forEach((location) => {
        jurisdictionDropDownList.innerHTML += `<option value="${location}">${location}</option>`;
    })

}

let loadJsonData = async (path) => {
    let response = await fetch(path)
    let data = await response.json()
    return data
}