
var websitesContainer = [];
if (localStorage.getItem("websites") != null) {
    websitesContainer = JSON.parse(localStorage.getItem("websites"));

}
disPlayWebsites();

var siteName = document.getElementById("siteNameInput");
var siteNameRegEx = /^[a-zA-Z 0-9 ]{3, }+$/;
var sitetUrl = document.getElementById("sitetUrlInput");
var addBtn = document.getElementById("addBtn");
var myIndex = 0;
var inAddMode = true;
// ************add Website ********************
function addWebsite() {
    if (valid(siteNameInput, 'nameAlert') && valid(sitetUrlInput, 'urlAlert')) {
        var website = {
            name: siteName.value,
            url: sitetUrl.value,
        }
        if (inAddMode) {
            websitesContainer.push(website);
        } else {
            websitesContainer.splice(myIndex, 1, website);
            addBtn.innerHTML = "Submit";
            inAddMode = true;
        }

        localStorage.setItem("websites", JSON.stringify(websitesContainer));
        disPlayWebsites();
        clear();

    } else {
        alert('Please enter a valid website name and website url')
    }
}
// ************add Website ********************
// ************disPlay Websites ********************
function disPlayWebsites() {
    var searchInput = document.getElementById("searchInput");
    var searchTerm = searchInput.value;
    var cartoona = "";
    for (var i = 0; i < websitesContainer.length; i++) {
        if (websitesContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase())) {
            cartoona += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${websitesContainer[i].name}</td>
                        <td><button class="btn btn-outline-light " style="background-color: #fec16066" onclick="updateWebsite(${i})"><i class="fa-solid fa-recycle"></i> Update</button></td>
                        <td><button class="btn btn-outline-light " style="background-color: #9eb23b66" onclick="visitWebsite(${i})"><i class="fa-solid fa-eye"></i> Visit</button></td>
                        <td><button class="btn btn-outline-light " style="background-color: #eb1d3666" onclick="deleteWebsite(${i})"><i class="fa-solid fa-trash"></i> Delete</button></td>
                    </tr>`
        }
    }
    document.getElementById("tBody").innerHTML = cartoona;
}
// ************disPlay Websites ********************
// ************clear inputs ********************
function clear() {
    siteName.value = "";
    sitetUrl.value = "";
    siteName.classList.remove('is-valid')
    sitetUrl.classList.remove('is-valid')
}
// ************clear inputs ********************
// ************delete Website ********************
function deleteWebsite(index) {
    websitesContainer.splice(index, 1);
    localStorage.setItem("websites", JSON.stringify(websitesContainer));
    disPlayWebsites();
}
// ************delete Website ********************
// ************update Website ********************
function updateWebsite(index) {
    myIndex = index;
    var Website = websitesContainer[index]
    siteName.value = Website.name;
    sitetUrl.value = Website.url;
    addBtn.innerHTML = "Update Website";
    inAddMode = false;
}
// ************update Website ********************
// ************visit Website ********************
function visitWebsite(index) {
    var Website = websitesContainer[index]
    window.open(Website.url, "_blank");
}
// ************visit Website ******************
//******************** * validation************
function valid(element, alertId) {
    var msg = document.getElementById(alertId);
    var regEx = {
        siteNameInput: /^[a-z A-Z 0-9 ]{3,}$/,
        sitetUrlInput: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
    };
    if (regEx[element.id].test(element.value) == true) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        msg.classList.add('d-none');
        return true;

    } else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        msg.classList.remove('d-none');
        return false;
    }
}
