var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");
var closeBtn = document.getElementById("alertBox");
var dataList = [];

if (localStorage.getItem("dataContainer") != null) {
  dataList = JSON.parse(localStorage.getItem("dataContainer"));
  displayData();
}

function addData() {
  if (validateName() && validateUrl()) {
    var dataObject = {
      name: bookmarkName.value,
      url: bookmarkURL.value,
    };
    var isExist = dataList.some((item) => item.url === bookmarkURL.value);

    if (isExist) {
      alert("This URL already exists");
      return;
    }
    dataList.push(dataObject);
    localStorage.setItem("dataContainer", JSON.stringify(dataList));
    displayData();
    clearData();
  } else {
    closeBtn.classList.remove("hidden");
    console.log("err");
  }
}

function clearData() {
  bookmarkName.value = "";
  bookmarkURL.value = "";
  bookmarkName.classList.remove("!border-green-500", "!border-red-500");

  bookmarkURL.classList.remove("!border-green-500", "!border-red-500");
}

function displayData() {
  var cartona = "";
  for (let i = 0; i < dataList.length; i++) {
    cartona += `
   
      <tr class="h-14">
        <td>${i + 1}</td>
          <td>${dataList[i].name}</td>
        <td>
          <button onclick="visitSite(${i})"  class="px-2 py-1  bg-green-700 border text-white rounded" data-index="0">
            <i class="fa-solid fa-eye pe-2"></i>Visit
          </button>
        </td>
        <td>
        <button onclick="deleteItem(${i})" class="px-2 py-1 bg-red-700 border text-white rounded" data-index="0">
          <i class="fa-solid fa-trash-can"></i>
          Delete
        </button>
        </td>
      </tr>
    `;
  }
  document.getElementById("tableContent").innerHTML = cartona;
}

function deleteItem(index) {
  var isDelete = confirm("Are you sure?");

  if (isDelete) {
    dataList.splice(index, 1);
    localStorage.setItem("dataContainer", JSON.stringify(dataList));
    displayData();
  }
}

function visitSite(index) {
  window.open(dataList[index].url, "_blank");
}
function validateName() {
  var regexName = /^[a-zA-Z0-9 ]{3,}$/;

  if (regexName.test(bookmarkName.value) == true) {
    bookmarkName.classList.add("!border-green-500");
    bookmarkName.classList.remove("!border-red-500");
    return true;
  } else {
    bookmarkName.classList.add("!border-red-500");
    bookmarkName.classList.remove("!border-green-500");
    return false;
  }
}
function validateUrl() {
  var regexName = /^https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-z]{2,}(\/\S*)?$/;
  if (regexName.test(bookmarkURL.value)) {
    bookmarkURL.classList.add("!border-green-500");
    bookmarkURL.classList.remove("!border-red-500");
    return true;
  } else {
    bookmarkURL.classList.add("!border-red-500");
    bookmarkURL.classList.remove("!border-green-500");

    return false;
  }
}

function closeBox() {
  closeBtn.classList.toggle("hidden");
}
