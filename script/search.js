"use strict";

const petIdInput = document.querySelector("#input-id");
const petNameInput = document.querySelector("#input-name");
const petTypeInput = document.querySelector("#input-type");
const petBreedSelect = document.querySelector("#input-breed");
const petVaccineCheckbox = document.querySelector("#input-vaccinated");
const petDewormedCheckbox = document.querySelector("#input-dewormed");
const petSterilizedCheckbox = document.querySelector("#input-sterilized");

const findButton = document.querySelector("#find-btn");
const dataTable = document.querySelector("#tbody");

let petList = [];
let breedList = [];

// GET DATA FROM LOCAL STORAGE
if (window.localStorage.getItem("localStoragePetList")) {
    // get data from local storage
    petList = JSON.parse(window.localStorage.getItem("localStoragePetList"));
    renderTable(petList);
}
if (window.localStorage.getItem("localStorageBreedList")) {
    // get data from local storage
    breedList = JSON.parse(
        window.localStorage.getItem("localStorageBreedList")
    );
    renderBreed(breedList);
}

// FIND BUTTON ON CLICK
findButton.addEventListener("click", function () {
    let fillPet = findPet(
        petIdInput.value,
        petNameInput.value,
        petTypeInput.value,
        petBreedSelect.value,
        petVaccineCheckbox.checked,
        petDewormedCheckbox.checked,
        petSterilizedCheckbox.checked
    );
    renderTable(fillPet);
});

// FILLTER PET FUNCTION
function findPet(id, name, type, breed, vaccine, dewormed, sterilized) {
    let arrPet = [...petList];

    type = type == "Select Type" ? "" : type;
    breed = breed == "Select Breed" ? "" : breed;

    let arrFindPet = arrPet.filter(
        (pet) =>
            pet.id.includes(id) &&
            pet.name.includes(name) &&
            pet.type.includes(type) &&
            pet.breed.includes(breed)
    );

    if (vaccine) {
        arrFindPet = arrFindPet.filter((pet) => pet.vaccine == true);
    }
    if (dewormed) {
        arrFindPet = arrFindPet.filter((pet) => pet.dewormed == true);
    }
    if (sterilized) {
        arrFindPet = arrFindPet.filter((pet) => pet.sterilized == true);
    }

    return arrFindPet;
}

// CHANGE BREED LIST WHEN CHANGE TYPE
petTypeInput.addEventListener("change", function () {
    if (this.value !== "Select Type") {
        const selectedValue = this.value;
        let CurrentBreedList = breedList.filter((e) => e.type == selectedValue);
        renderBreed(CurrentBreedList);
    } else {
        renderBreed(breedList);
    }
});

// RENDER PET BREED
function renderBreed(breedList) {
    let code = "<option>Select Breed</option>";
    breedList.map((e) => {
        code += `<option>${e.name}</option>`;
    });
    petBreedSelect.innerHTML = code;
}

// RENDER TABLE FUNCTION
function renderTable(petList) {
    let code = "";
    for (let i = petList.length - 1; i >= 0; i--) {
        code += renderRow(
            petList[i].id,
            petList[i].name,
            petList[i].age,
            petList[i].type,
            petList[i].weight,
            petList[i].length,
            petList[i].breed,
            petList[i].color,
            petList[i].vaccine,
            petList[i].dewormed,
            petList[i].sterilized,
            new Date(Date.parse(petList[i].date))
        );
    }
    dataTable.innerHTML = code;
}

// RENDER ROW CODE FUNCTION
function renderRow(
    id,
    name,
    age,
    type,
    weight,
    length,
    breed,
    color,
    vaccine,
    dewormed,
    sterilized,
    date
) {
    return `
        <tr>
            <th scope="row">${id}</th>
            <td>${name}</td>
            <td>${age}</td>
            <td>${type}</td>
            <td>${weight} kg</td>
            <td>${length} cm</td>
            <td>${breed}</td>
            <td>
                <i
                    class="bi bi-square-fill"
                    style="color: ${color}"
                ></i>
            </td>
            ${
                vaccine
                    ? `<td><i class="bi bi-check-circle-fill"></i></td>`
                    : `<td><i class="bi bi-x-circle-fill"></i></td>`
            }
            ${
                dewormed
                    ? `<td><i class="bi bi-check-circle-fill"></i></td>`
                    : `<td><i class="bi bi-x-circle-fill"></i></td>`
            }
            ${
                sterilized
                    ? `<td><i class="bi bi-check-circle-fill"></i></td>`
                    : `<td><i class="bi bi-x-circle-fill"></i></td>`
            }
            <td>${date.getDate()}/${
        date.getMonth() + 1
    }/${date.getFullYear()}</td>
            
        </tr>
    `;
}
