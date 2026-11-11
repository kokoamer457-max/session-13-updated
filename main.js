// selectors
const mobileForm = document.querySelector(".mobile-form");
const nameInput = document.querySelector(".mobile-form .nameInput");
const priceInput = document.querySelector(".mobile-form .priceInput");
const tBody = document.querySelector(".table tbody");
const formButton = document.querySelector(".mobile-form button");

// vars
let updatedIndex = null;
const mobiles = JSON.parse(localStorage.getItem("mobiles")) || [];


// functions
function handleSubmit() {
    const mobile = {
        name: nameInput.value,
        price: priceInput.value,
    };

    if (nameInput.value.length > 0 && priceInput.value.length > 0) {
        if (formButton.textContent == "Create") {
            mobiles.push(mobile);
        } else {
            mobiles.splice(updatedIndex, 1, mobile);
            formButton.textContent = "Create";
        }
        displayMobiles();
        clearInputs();
        localStorage.setItem("mobiles", JSON.stringify(mobiles));
    }
}

function clearInputs() {
    nameInput.value = "";
    priceInput.value = "";
}

function deleteMobile(mobileIndex) {
    mobiles.splice(mobileIndex, 1);
    localStorage.setItem("mobiles", JSON.stringify(mobiles));
    displayMobiles();
}



function getData(mobileIndex) {
    const mobile = mobiles[mobileIndex];
    nameInput.value = mobile.name;
    priceInput.value = mobile.price;

    formButton.textContent = "Update";
    updatedIndex = mobileIndex;

}

function displayMobiles() {
    tBody.innerHTML = "";

    mobiles.forEach((mobile, index) => {
        tBody.innerHTML += `
       <tr>
                    <th>${index + 1}</th>
                    <th>${mobile.name}</th>
                    <th>${mobile.price}</th>
                    <th>
                        <button onclick="getData(${index})">Edit</button>
                        <button onclick="deleteMobile(${index})">Delete</button>
                    </th>
                </tr>
    
    
    `

    })


}
displayMobiles();


// Events
mobileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleSubmit();
})