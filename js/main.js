

var bookMarkInput = document.getElementById("bookmarkName");
var webSiteInput = document.getElementById("WebsiteName");


var storeData = [];

if (localStorage.getItem("all") !== null) {

    storeData = JSON.parse(localStorage.getItem("all"));

    displayData();
};

function validBook() {
    var regex = /^[A-Z][a-z]{2,}[1-9]{2,}&/
    if (regex.test(bookMarkInput.value) == true) {
        document.getElementById("none-valid").classList.replace("d-block", "d-none");

        return true;

    }

    else {
        document.getElementById("none-valid").classList.replace("d-none", "d-block")
        return false;

    }
};


function validUrl() {

    var regex = /^https:www.[a-z]{11,}[1-9]{11,}&/
    if (regex.test(webSiteInput.value) == true) {
        document.getElementById("none-valid").classList.replace("d-block", "d-none");

        return true;

    }

    else {
        document.getElementById("none-valid").classList.replace("d-none", "d-block")
        return false;

    }
}

function addData() {
    validBook();
    validUrl();

    if (validBook() == true && validUrl() ==true) {
        var item = {
            bookName: bookMarkInput.value,
            webName: webSiteInput.value,
        };

        storeData.push(item);
        // console.log(storeData);

        localStorage.setItem("all", JSON.stringify(storeData))

        cleanData();
        displayData();
    };

}


function cleanData() {

    bookMarkInput.value = "";
    webSiteInput.value = "";

};


function displayData() {
    var cartoona = "";
    for (var i = 0; i < storeData.length; i++) {

        cartoona += `  <tr>
                            <td>${i + 1}</td>
                            <td>${storeData[i].bookName}</td>
               
                           <td><a href="${storeData[i].webName}"><button class="btn" id="btn-visit" ><i class="fa-solid fa-eye"></i>  
                            Visit</button></a></td>
                            <td><button class="btn" onclick=" deleteData(${i}) " id="btn-delete"><i class="fa-solid fa-basket-shopping"></i>
                                  Delete</button></td>
                        </tr>  ` ;


    }

    document.getElementById("demo").innerHTML = cartoona;
};

function deleteData(index) {

    storeData.splice(index, 1);
    localStorage.setItem("all", JSON.stringify(storeData));
    displayData();
};







function closeWarning() {
    document.getElementById("none-valid").classList.replace("d-block", "d-none");
    
}
