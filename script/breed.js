"use strict";

const petBreedInput = document.querySelector("#input-breed");
const breedTypeInput = document.querySelector("#input-type");
const submitButton = document.querySelector("#submit-btn");
const dataTable = document.querySelector("#tbody");

let breedList = [];

if (window.localStorage.getItem("localStorageBreedList")) {
    // get data from local storage
    breedList = JSON.parse(
        window.localStorage.getItem("localStorageBreedList")
    );
    renderTable(breedList);
}

// SUBMIT BUTTON ON CLICK
submitButton.addEventListener("click", function () {
    let breedData = {
        name: petBreedInput.value,
        type: breedTypeInput.value,
    };

    if (checkUniqueName(breedList, breedData.name)) {
        addDataToList(breedList, breedData);
        updateLocalStorage(breedList);
        renderTable(breedList);
    }
});

// ADD DATA TO PET LIST FUNCTION
function addDataToList(list, data) {
    list.push(data);
}

// CHECK UNIQUE NAME FUNCTION
function checkUniqueName(breedList, data) {
    let myArr = breedList.map((breed) => breed.name);
    if (myArr.includes(data)) {
        alert("Breed name must be unique");
        return false;
    }
    if (data === "Select Breed") {
        alert("Please choose another name breed");
        return false;
    }
    if (data === "") {
        alert("Breed name can not blank");
        return false;
    }
    if (breedTypeInput.value == "Select Type") {
        alert("Please choose animal type");
        return false;
    }

    return true;
}

// DELETE BREED FUNCTION
function deleteBreed(name) {
    if (confirm("Are you sure?")) {
        for (let i = 0; i < breedList.length; i++) {
            if (breedList[i]["name"] == name) {
                breedList.splice(i, 1);
                break;
            }
        }
        updateLocalStorage(breedList);
        renderTable(breedList);
    }
}

// RENDER TABLE FUNCTION
function renderTable(breedList) {
    let code = "";
    for (let i = 0; i < breedList.length; i++) {
        code += renderRow(i + 1, breedList[i].name, breedList[i].type);
    }
    dataTable.innerHTML = code;
}

// RENDER ROW CODE FUNCTION
function renderRow(stt, name, type) {
    return `
        <tr>
            <th scope="row">${stt}</th>
            <td>${name}</td>
            <td>${type}</td>
            
            <td>
                <button
                    type="button"
                    class="btn btn-danger"
                    onclick="deleteBreed('${name}')"
                >
                    Delete
                </button>
            </td>
        </tr>
    `;
}

// UPDATE LOCAL STORAGE
function updateLocalStorage(breedList) {
    localStorage.setItem("localStorageBreedList", JSON.stringify(breedList));
}
