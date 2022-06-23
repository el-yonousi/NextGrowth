let usersData = [{
        id: "123456789",
        createdDate: "2021-01-06T00:00:00.000Z",
        status: "En validation",
        firstName: "Mohamed",
        lastName: "Taha",
        userName: "mtaha",
        registrationNumber: "2584"
    },
    {
        id: "987654321",
        createdDate: "2021-07-25T00:00:00.000Z",
        status: "Validé",
        firstName: "Hamid",
        lastName: "Orrich",
        userName: "horrich",
        registrationNumber: "1594"
    },
    {
        id: "852963741",
        createdDate: "2021-09-15T00:00:00.000Z",
        status: "Rejeté",
        firstName: "Rachid",
        lastName: "Mahidi",
        userName: "rmahidi",
        registrationNumber: "3576"
    }
]

function setData() {
    const users = document.querySelector('#users-data');
    const style = getComputedStyle(document.body)
    users.innerHTML = ''
    for (const user of usersData) {
        let color = 'black';
        if (user.status.toLowerCase() == "Rejeté".toLowerCase()) {
            color = style.getPropertyValue('--rejected')
        } else if (user.status.toLowerCase() == "En validation".toLowerCase()) {
            color = style.getPropertyValue('--on-validation')
        } else if (user.status.toLowerCase() == "Validé".toLowerCase()) {
            color = style.getPropertyValue('--valide')
        }
        users.innerHTML += `
            <tr>
                <td class="">${user.id}</td>
                <td class="">${new Date(user.createdDate).toLocaleDateString('fr-ma', { year:"numeric", month:"numeric", day:"numeric"}) }</td>
                <td class=""><div class="status" style="background-color: ${color}">${user.status}</div></td>
                <td class="">${user.firstName}</td>
                <td class="">${user.lastName}</td>
                <td class="">${user.userName}</td>
                <td class="">${user.registrationNumber}</td>
                <td class="action">
                    <button onclick="deleteUser(${user.id})">
                        <span class="material-symbols-outlined" type="button" aria-label="button">delete</span>
                    </button>
                </td>
            </tr>`
    }
}

setData()

const form = document.forms['addUserForm'];
const firstName = form["firstName"]
const lastName = form["lastName"]
const status = form["status"]
const userName = form["userName"]
const createdDate = form["createdDate"]
const registrationNumber = form["registrationNumber"]

function validateForm() {
    if (requiredField()) {
        usersData.push({
            id: (Date.now() + Math.random()).toString().replace('.', ''),
            firstName: firstName.value,
            lastName: lastName.value,
            status: status.value,
            userName: userName.value,
            createdDate: Date.now(),
            registrationNumber: registrationNumber.value,
        })
        setData()
        openModal(true)
    }
}

function deleteUser(id) {
    for (let i = 0; i < usersData.length; i++) {
        if (usersData[i].id == id) {
            usersData.splice(i, 1)
            break
        }
    }
    setData()
}

function requiredField() {
    if (lastName.value == "") {
        alert("Nom doit être rempli");
        lastName.focus()
        return false;
    }
    if (firstName.value == "") {
        alert("Prénom doit être rempli");
        firstName.focus()
        return false;
    }
    if (status.value == "") {
        alert("Etat doit être rempli");
        status.focus()
        return false;
    }
    if (!status.value.match(/^(?:rejeté|validé|en validation)$/)) {
        alert("Etat doit être rempli avec 'rejeté' ou 'en validation' ou 'validé'");
        status.focus()
        return false;
    }
    if (userName.value == "") {
        alert("Nom d'utilisateur doit être rempli");
        userName.focus()
        return false;
    }
    // if (createdDate.value == "") {
    //     alert("Date de création doit être rempli");
    //     createdDate.focus()
    //     return false;
    // }
    if (registrationNumber.value == "") {
        alert("Matricule doit être rempli");
        registrationNumber.focus()
        return false;
    }

    return true
}

function openModal(open) {
    const modal = document.querySelector('#modal')
    open ? modal.style.display = 'none' : modal.style.display = 'flex'
}