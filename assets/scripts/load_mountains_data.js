"use strict"

let mountainsArray = []

window.onload = function () {

    loadJsonData("assets/data/mountains.json").then((mountains) => {
        mountainsArray = mountains.mountains;

        // populate the drop down values on load (Question for Eric - good bad practice / risks?)
        getMountainNamesFromFile();
        generateMountainSelectDropDownListOptions();
    })

}

//function that can "fetch" the sunset/sunrise times
let loadJsonData = async (path) => {
    let response = await fetch(path)
    let data = await response.json()
    return data
}