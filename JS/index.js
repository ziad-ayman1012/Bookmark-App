var siteNameInput = document.getElementById('siteName');
var siteUrlInput = document.getElementById('siteUrl');
var rowData = document.getElementById('rowData');
var alertForm = document.getElementById("alertForm");

var sitesContainer;
if (localStorage.getItem('sitesList')) {
    sitesContainer = JSON.parse(localStorage.getItem("sitesList"));
    displayItem(sitesContainer);
}
else {
    sitesContainer = [];
}
function addSite() {
    var site = {
        name: siteNameInput.value,
        url: siteUrlInput.value,
    }
    if (siteNameInput.classList.contains('is-valid') &&siteUrlInput.classList.contains('is-valid')) {
        sitesContainer.push(site);
        localStorage.setItem("sitesList", JSON.stringify(sitesContainer));

        clearForm();
        displayItem(sitesContainer);
        alertForm.classList.add("d-none");
    } else {
        alertForm.classList.remove('d-none');
    }
    
    // validUrl(siteUrlInput);
}

function clearForm() {
    siteNameInput.value = '';
    siteUrlInput.value = '';
}

function displayItem(arr) {
    var box = ``;

    for (i = 0; i < sitesContainer.length; i++){
        box += `<tr>
                            <td>${i}</td>
                            <td>${arr[i].name}</td>
                            <td><a href="//${arr[i].url}" target="_blank"><button  class="btn btn-light-green visit text-white"><i class="fas fa-eye mx-1"></i>Visit</button></a></td>
                            <td><button onclick="deleteItem(${i})" class="btn btn-light-red delete text-white"> <i class="fas fa-trash-can mx-1"></i> Delete</button></td>
                        </tr>`;
    }
    rowData.innerHTML = box;
}

function deleteItem(term) {
    sitesContainer.splice(term, 1);
    localStorage.setItem("sitesList", JSON.stringify(sitesContainer));
    displayItem(sitesContainer);
}

function validUrl(element) {
    var urlReg =/(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ ;

    if (urlReg.test(element.value)) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        element.nextElementSibling.classList.add('d-none');
    }
    else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        element.nextElementSibling.classList.remove('d-none');
    }
}
function validName(element) {
    var nameReg = /^[A-Z]\w{3,10}$/;
    if (nameReg.test(element.value)) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        element.nextElementSibling.classList.add("d-none");
    }
    else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        element.nextElementSibling.classList.remove("d-none");
    }
}
