"use strict";

const petIdInput = document.querySelector("#input-id");
const petNameInput = document.querySelector("#input-name");
const petAgeInput = document.querySelector("#input-age");
const petTypeInput = document.querySelector("#input-type");
const petWeightInput = document.querySelector("#input-weight");
const petLengthInput = document.querySelector("#input-length");
const petColorPick = document.querySelector("#input-color-1");
const petBreedSelect = document.querySelector("#input-breed");
const petVaccineCheckbox = document.querySelector("#input-vaccinated");
const petDewormedCheckbox = document.querySelector("#input-dewormed");
const petSterilizedCheckbox = document.querySelector("#input-sterilized");
const submitButton = document.querySelector("#submit-btn");
const showHealthyButton = document.querySelector("#healthy-btn");
const showAllButton = document.querySelector("#all-btn");
const dataTable = document.querySelector("#tbody");
const showBMIButton = document.querySelector("#caculate-btn");

let petList = [];
let breedList = [];

let showBMI = false;

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
}
// SUBMIT BUTTON ON CLICK
submitButton.addEventListener("click", function () {
    let petData = {
        id: petIdInput.value,
        name: petNameInput.value,
        age: petAgeInput.value,
        type: petTypeInput.value,
        weight: petWeightInput.value,
        length: petLengthInput.value,
        color: petColorPick.value,
        breed: petBreedSelect.value,
        vaccine: petVaccineCheckbox.checked,
        dewormed: petDewormedCheckbox.checked,
        sterilized: petSterilizedCheckbox.checked,
        date: new Date(),
    };

    // adding data to table
    if (checkData(petData)) {
        petList.unshift(petData);
        updateLocalStorage(petList);
        renderTable(petList);
        clearInput();
    }
});

// SHOW HEALTHY PET ON CLICK
showHealthyButton.addEventListener("click", function () {
    showHealthyButton.classList.add("hidden");
    showAllButton.classList.remove("hidden");
    let healthyPet = [];
    for (let i = 0; i < petList.length; i++) {
        if (
            petList[i]["vaccine"] == true &&
            petList[i]["dewormed"] == true &&
            petList[i]["sterilized"] == true
        ) {
            healthyPet.push(petList[i]);
        }
    }
    renderTable(healthyPet);
});

// SHOW ALL PET ON CLICK
showAllButton.addEventListener("click", function () {
    showHealthyButton.classList.remove("hidden");
    showAllButton.classList.add("hidden");
    renderTable(petList);
});

// CHECK VALIDATE DATA FUNCTION
function checkData(data) {
    let arrId = [];
    for (let i = 0; i < petList.length; i++) {
        arrId[i] = petList[i]["id"];
    }

    for (const [key, value] of Object.entries(data)) {
        // no field is missing
        if (value === "") {
            alert(`${key} can't blank`);
            return false;
        }
        // id must be unique
        if (key == "id" && arrId.includes(value)) {
            alert("ID must be unique!");
            return false;
        }
        // age between 1,15
        if (key == "age" && (value < 1 || value > 15)) {
            alert("Age must be between 1 and 15!");
            return false;
        }
        // weight between 1,15
        if (key == "weight" && (value < 1 || value > 15)) {
            alert("Weight must be between 1 and 15!");
            return false;
        }
        // length between 1,100
        if (key == "length" && (value < 1 || value > 100)) {
            alert("Age must be between 1 and 100!");
            return false;
        }
        // select type
        if (key == "type" && value == "Select Type") {
            alert("Please select Type!");
            return false;
        }
        // select breed
        if (key == "breed" && value == "Select Breed") {
            alert("Please select Breed!");
            return false;
        }
    }
    return true;
}

// CHANGE BREED LIST
petTypeInput.addEventListener("change", function () {
    const selectedValue = this.value;
    let CurrentBreedList = breedList.filter((e) => e.type == selectedValue);
    renderBreed(CurrentBreedList);
});

// RENDER PET BREED
function renderBreed(breedList) {
    let code = "<option>Select Breed</option>";
    breedList.map((e) => {
        code += `<option>${e.name}</option>`;
    });
    petBreedSelect.innerHTML = code;
}

// CLEAR INPUT FUNCTION
function clearInput() {
    petIdInput.value = "";
    petNameInput.value = "";
    petAgeInput.value = "";
    petTypeInput.value = "Select Type";
    petWeightInput.value = "";
    petLengthInput.value = "";
    petColorPick.value = "#000000";
    petBreedSelect.value = "Select Breed";
    petVaccineCheckbox.checked = false;
    petDewormedCheckbox.checked = false;
    petSterilizedCheckbox.checked = false;
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
            new Date(Date.parse(petList[i].date)),
            showBMI
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
    date,
    showBMI
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
            <td>
                <button
                    type="button"
                    class="btn btn-danger"
                    onclick="deletePet('${id}')"
                >
                    Delete
                </button>
            </td>
        </tr>
    `;
}

// DELETE PET FUNCTION
function deletePet(petId) {
    if (confirm("Are you sure?")) {
        for (let i = 0; i < petList.length; i++) {
            if (petList[i]["id"] == petId) {
                petList.splice(i, 1);
                break;
            }
        }
        showHealthyButton.classList.remove("hidden");
        showAllButton.classList.add("hidden");
        updateLocalStorage(petList);
        renderTable(petList);
    }
}

// UPDATE LOCAL STORAGE
function updateLocalStorage(petList) {
    localStorage.setItem("localStoragePetList", JSON.stringify(petList));
}
