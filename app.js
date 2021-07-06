const inputname = document.querySelector('#name')
const inputemail = document.querySelector('#email')
const inputnumber = document.querySelector('#number')
const button = document.querySelector('#button')
const tbody = document.querySelector('tbody')


//creating contact constructor
function Contact(id, name, email, number) {
    this.id = id
    this.name = name;
    this.email = email;
    this.number = number
}


//prototype of constructor contact
Contact.prototype.newContact = function () {
    const tr = document.createElement('tr')
    tr.innerHTML = `<td>${this.id}</td>
    <td>${this.name}</td>
    <td>${this.email}</td>
    <td>${this.number}</td>
    <td><button class="delete" data-id="${this.id}">Delete</button></td>`
    tbody.appendChild(tr)
    inputname.value = ''
    inputemail.value = ''
    inputnumber.value = ''
}

//checking the input is number or string
function isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

//checking the input and creationg contact
button.addEventListener('click', () => {
    let id;
    if (inputname.value === '' || inputemail.value == '' || inputnumber.value === '' || !isNumber(inputnumber.value)) {
        alert("i get you")
    }
    id = parseInt(tbody.querySelectorAll('tr').length) + 1
    const contact = new Contact(id, inputname.value, inputemail.value, inputnumber.value)
    contact.newContact()
    addLocalStorage(contact)
})

//deleting contact
tbody.addEventListener('click', (e) => {
    if (e.target.className.includes('delete')) {
        let id = parseInt(e.target.getAttribute('data-id'))
        e.target.parentElement.parentElement.remove()
        deleteContact(id)
    }
})

//adding contact to localstorage
function addLocalStorage(contact) {
    let contacts;
    if (localStorage.getItem('contact') === null) {
        contacts = []
    } else {
        contacts = JSON.parse(localStorage.getItem('contact'))
    }
    contacts.push(contact)
    localStorage.setItem('contact', JSON.stringify(contacts))
}


//returning localstorage data
function returningStoreData() {
    let contacts;
    if (localStorage.getItem('contact') === null) {
        contacts = []
    } else {
        contacts = JSON.parse(localStorage.getItem('contact'))
    }
    return contacts
}


//showing localStorage data
function ShowingLocalData() {
    const contact = returningStoreData()
    contact.forEach(element => {
        const showData = new Contact(element.id, element.name, element.email, element.number)
        showData.newContact()
    })
}
//show localStorage data when window load
window.addEventListener('DOMContentLoaded', ShowingLocalData)


//deleting item from localStorage
function deleteContact(id) {
    let contacts = returningStoreData()
    contacts.forEach((element, index) => {
        if (element.id === id) {
            contacts.splice(index, 1)
        }
    });
    localStorage.setItem('contact', JSON.stringify(contacts))
}