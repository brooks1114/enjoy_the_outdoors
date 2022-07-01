let MountainSelectDropDownList = document.querySelector("#MtnSelectDDL");
let MountainSearchResultsHeader = document.querySelector("#MtnSearchResultsHeader");
let MountainCardDiv = document.querySelector("#cardForSelectedMountain");

let mountainNamesList = [];
let mountainSelection = "";


MountainSelectDropDownList.addEventListener("change", function (event) {
    console.log("MountainSelectDropDownList was invoked");
    // alert("You pushed the give all button" + mountainsArray.length);

    mountainSelection = event.target.value;
    console.log("The user has selected Mountain: " + mountainSelection);

    MountainSearchResultsHeader.classList.remove("d-none");
    console.log("MountainSearchResultsHeader was made visable to the user");

    generateMountainCard(mountainSelection);
})

function getMountainNames(array) {
    console.log("getMountainNames was invoked");

    return array.name;
}


// get mountain name list out of the json object file
function getMountainNamesFromFile() {
    console.log("getMountainNamesFromFile was invoked");

    mountainNamesList = mountainsArray.map(getMountainNames);
    console.log("getMountainNamesFromFile function returned " + mountainNamesList.length + " mountains from the json file");
    console.log("getMountainNamesFromFile function returned a list of mountains containing the following names : " + mountainNamesList);

}

//Build the drop down list with the moutnatin names
function generateMountainSelectDropDownListOptions() {
    console.log("generateMountainSelectDropDownListOptions was invoked");

    mountainNamesList.forEach((mountainName) => {
        MountainSelectDropDownList.innerHTML += `<option value="${mountainName}">${mountainName}</option>`;
    })
}

function getMountainObjects(array) {
    console.log("getMountainObjects was invoked");
    return array.name === mountainSelection;
}

// NOTE: This function only works with arrays passed in containing 1 object and if no mountains have the same name
function generateMountainCard(mountainSelection) {
    console.log("generateMountainCard was invoked");
    console.log("mountainSelection" + mountainSelection);

    //Get the mountain obj off the array
    // mountianObj = mountainSelection[0];

    MountainCardDiv.innerHTML = "";

    // get the entire mountain obj off the full array using the selected mountain name
    let mountainToCard = mountainsArray.filter(getMountainObjects);
    console.log("mountain for card = " + JSON.stringify(mountainToCard));

    // strip the mountain obj out of the array list
    let cardMountainImageLocation = mountainToCard[0];
    console.log("cardMountainImageLocation = " + cardMountainImageLocation);


    let newCard = '<div class="col">'
    newCard += '      <div class="card">'
    newCard += '            <img src="assets/images/mountains/' + cardMountainImageLocation.img + '" class="card-img-top" alt="...">'
    newCard += '                <div class="card-body">'
    newCard += '                    <h5 class="card-title">' + cardMountainImageLocation.name + '</h5>'
    newCard += '                   <p class="card-text">' + cardMountainImageLocation.desc + '</p>'
    newCard += '                </div>'
    newCard += '        </div>'
    newCard += '    </div>'

    MountainCardDiv.innerHTML += newCard;
}