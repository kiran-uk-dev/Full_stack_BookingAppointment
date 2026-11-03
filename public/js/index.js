const form = document.getElementById('appointmentForm');
const userList = document.getElementById('userList');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const user = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };

    try {
        const response = await axios.post('/users', user);

        console.log(response.data);

        form.reset();

        getUsers();

    } catch (error) {
        console.log(error.response?.data || error.message);
    }
});


async function getUsers() {
    try {
        const response = await axios.get('/users');

        displayUsers(response.data.data);

    } catch (error) {
        console.log(error);
    }
}
function displayUsers(users) {
    userList.innerHTML = '';

    users.forEach((user) => {
        const li = document.createElement('li');

        const details = document.createElement('span');
        details.textContent =
            `${user.username} - ${user.email} - ${user.phone}`;

        const button = document.createElement('button');
        button.textContent = 'Delete';
        button.className = 'delete-btn';

        button.addEventListener('click', () => {
            deleteUser(user.id);
        });

        li.append(details, button);
        userList.appendChild(li);
    });
}


async function deleteUser(id) {
    try {
        const response = await axios.delete(`/users/${id}`);

        console.log(response.data);

        getUsers();

    } catch (error) {
        console.log(error.response?.data || error.message);
    }
}


// Load users when page opens
getUsers();