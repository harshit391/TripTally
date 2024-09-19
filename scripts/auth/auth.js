const error_window = document.querySelector('.error-window');

const login_btn = document.querySelector('#login');
const signup_btn = document.querySelector('#signup');

class User 
{
    constructor(username, password, email)
    {
        this.id = Date.now();
        this.username = username;
        this.password = password;
        this.email = email;
    }
}

const login = (email, password) =>
{
    const usersDB = localStorage.getItem('users');

    if (usersDB === null)
    {
        error_window.innerHTML = 'User does not exist';
        return;
    }
    else
    {
        const exists = JSON.parse(usersDB).find(user => user.email === email && user.password === password);

        if (!exists)
        {
            error_window.innerHTML = 'Invalid User Name or Password';
            return;
        }
        else
        {
            document.cookie = `token=${exists.id};path=/`;
            window.location.href = '/index.html';
        }
    }
}

const signup = (username, password, email) =>
{
    const usersDB = localStorage.getItem('users');

    let users = [];

    if (usersDB !== null)
    {
        const exists = JSON.parse(usersDB).find(user => user.email === email);

        if (exists)
        {
            error_window.innerHTML = `User already exists`;
            return;
        }

        users = JSON.parse(usersDB);
    }   

    error_window.innerHTML = '';

    const curruser = new User(username, password, email);

    users.push(curruser);

    localStorage.setItem('users', JSON.stringify(users));

    document.cookie = `token=${curruser.id};path=/`;

    window.location.href = '/index.html';
}

login_btn.addEventListener('click', () => {

    const email = document.querySelector(".login-container #email");

    const password = document.querySelector(".login-container #password");

    const usersDB = localStorage.getItem('users');

    if (usersDB === null)
    {
        error_window.innerHTML = 'User does not exist';
        return;
    }
    else
    {
        const user = JSON.parse(usersDB).find(user => user.email === email.value && user.password === password.value);

        if (!user)
        {
            error_window.innerHTML = 'Invalid User Name or Password';
            return;
        }
    }

    error_window.innerHTML = '';
    login(email.value, password.value);
});

signup_btn.addEventListener('click', () => {

    const name = document.querySelector(".signup-container #name");

    const email = document.querySelector(".signup-container #email");

    const password = document.querySelector(".signup-container #password");

    if (name.value === '' || email.value === '' || password.value === '')
    {
        error_window.innerHTML = 'Please fill all fields';
        return;
    }
    else if (email.value.indexOf('@') === -1)
    {
        error_window.innerHTML = 'Invalid email';
        return;
    }
    else
    {
        error_window.innerHTML = '';
    }

    signup(name.value, password.value, email.value);
});