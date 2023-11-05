"use strict";

const exportButton = document.querySelector("#export-btn");
const importButton = document.querySelector("#import-btn");
const inputFile = document.querySelector("#input-file");

// EXPORT BUTTON ON CLICK
exportButton.addEventListener("click", function () {
    // create file
    const data = JSON.stringify(
        window.localStorage.getItem("localStoragePetList")
    );
    const blob = new Blob([data], { type: "application/json" });
    // create download url
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "petList.json";
    document.body.appendChild(link);
    link.click();
});

// IMPORT BUTTON ON CLICK
importButton.addEventListener("click", function () {
    const file = inputFile.files[0];

    if (!file) {
        alert("Please select file");
        return false;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
        const jsonData = event.target.result;
        const jsonArray = JSON.parse(jsonData);

        // Save the data to a variable
        const myData = jsonArray;

        // Do something with the data
        updateLocalStorage(myData);

        // alert success
        alert("Import file successful");

        // clear input
        inputFile.value = "";
    };

    reader.readAsText(file);
});

// UPDATE LOCAL STORAGE
function updateLocalStorage(petList) {
    localStorage.setItem("localStoragePetList", petList);
}
