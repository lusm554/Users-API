'use strict';


(async () => {
    let users = await getUsers();

    loadAllUsers(users);
})();

// get actual list of users
async function getUsers() {
    let users;

    await fetch('/api/users').then(res => res.json()).then(json => users = json);

    return users;
}

// load all users 
async function loadAllUsers(allUsers) {
    listUsers.innerHTML = `<tr><th>Id</th><th>Name</th><th>Age</th><th>Settings</th></tr>`;

    for(let user of allUsers) {
        listUsers.insertAdjacentHTML('beforeend', `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.age}</td>
            <td>
                <button id="btnDelete${user.id}">delete</button>
                <button id="btnChange${user.id}">change</button>
            </td>
        </tr>
        `);
    }
}

// load new user and update list of users
async function addUserToList(user) {
    await fetch('api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    // update list of users
    updateUsersList();
}

// update list
async function updateUsersList() {
    let actualUsers = await getUsers();

    await loadAllUsers(actualUsers);
}


async function deleteUser(id) {
    await fetch(`api/users/${id}`, {
        method: 'DELETE'
    });

    await updateUsersList();
}