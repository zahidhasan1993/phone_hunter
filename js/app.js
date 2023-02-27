// loading phone database

const loadPhone = (phone, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${phone}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhone(data.data, dataLimit));
};

// display phone database to website

const displayPhone = (phones, dataLimit) => {
  const phoneContainer = document.getElementById("phone_container");
  phoneContainer.innerHTML = "";
  const noResult = document.getElementById("no_result");
  const showAllContainer = document.getElementById("show_all_container");

  if (dataLimit && phones.length > 6) {
    phones = phones.slice(0, 6);
    showAllContainer.classList.remove("invisible");
  } else {
    showAllContainer.classList.add("invisible");
  }
  
  if (phones.length === 0) {
    noResult.classList.remove("invisible");
  } else {
    noResult.classList.add("invisible");
  }

  for (const phone of phones) {
    const phoneDiv = document.createElement("div");
    // phoneDiv.innerHTML = "";
    phoneDiv.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl">
        <figure class="px-10 pt-10">
          <img src="${phone.image}" alt="Shoes" class="rounded-xl mt-2" />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title mt-2">${phone.phone_name}</h2>
          <p class="mt-2">${phone.slug}</p>
          <div class="card-actions mt-3">
          <label onclick="detailsModal('${phone.slug}')" id="details_btn" for="my-modal-6" class="btn btn-error">Details</label>
          </div>
        </div>
      </div>`;
      // console.log()
    phoneContainer.appendChild(phoneDiv);
  }
  loaderSpinner(false);
};
const inputFieldUse = (dataLimit) => {
  const searchField = document.getElementById("search_field");
  const searchText = searchField.value;
  loaderSpinner(true);

  loadPhone(searchText, dataLimit);
  // console.log(dataLimit)
  // searchField.value = "";
};

const searchPhone = () => {
  //   console.log(typeof searchText);
  inputFieldUse(6);
};
//enter key search
// Get the input field
var input = document.getElementById("search_field");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    // event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("search_btn").click();
  }
});

// loader function
const loaderSpinner = (isLoading) => {
  const loader = document.getElementById("loder");
  if (isLoading === true) {
    loader.classList.remove("invisible");
  } else {
    loader.classList.add("invisible");
  }
};
//ShowAll btn
const showALL = () => {
  inputFieldUse();
};
//phone details
const detailsModal = (id) =>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
  .then(res =>res.json())
  .then(data => displayPhoneDetails(data.data))
}

const displayPhoneDetails = data => {
  document.getElementById("modal_img").src = `${data.image}`;
  document.getElementById('phone_name').innerText = `${data.brand}`;
  document.getElementById('display').innerText = `${data.mainFeatures.displaySize}`;
  document.getElementById('chipset').innerText = `${data.mainFeatures.chipSet}`;
  document.getElementById('memory').innerText = `${data.mainFeatures.memory}`;
  document.getElementById('storage').innerText = `${data.mainFeatures.storage}`;
  document.getElementById('relesedate').innerText = `${data.releaseDate}`;
  // console.log(data)
}