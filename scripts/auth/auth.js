const error_window = document.querySelector('.error-window');

const login_btn = document.querySelector('#login');
const signup_btn = document.querySelector('#signup');

const login = (email, password) =>
{
    const usersDB = localStorage.getItem('users');

    if (usersDB === null)
    {
        document.getElementById("errwin").scrollIntoView();
        error_window.innerHTML = 'User does not exist';
        return;
    }
    else
    {
        const exists = JSON.parse(usersDB).find(user => user.email === email && user.password === password);

        if (!exists)
        {
            document.getElementById("errwin").scrollIntoView();
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
            document.getElementById("errwin").scrollIntoView();
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

    error_window.innerHTML = '';

    const email = document.querySelector(".login-container #email-login");

    const password = document.querySelector(".login-container #password-login");

    const usersDB = localStorage.getItem('users');

    if (usersDB === null)
    {
        document.getElementById("errwin").scrollIntoView();
        error_window.innerHTML = 'User does not exist';
        return;
    }
    else
    {
        const user = JSON.parse(usersDB).find(user => user.email === email.value && user.password === password.value);

        if (!user)
        {
            document.getElementById("errwin").scrollIntoView();
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

    error_window.innerHTML = '';

    if (name.value === '' || email.value === '' || password.value === '')
    {
        document.getElementById("errwin").scrollIntoView();
        error_window.innerHTML = 'Please fill all fields';
        return;
    }
    else if (email.value.indexOf('@') === -1)
    {
        document.getElementById("errwin").scrollIntoView();
        error_window.innerHTML = 'Invalid email';
        return;
    }
    else
    {
        error_window.innerHTML = '';
    }

    signup(name.value, password.value, email.value);
});

const login_button = document.querySelector('.login-button');
const signup_button = document.querySelector('.signup-button');

const login_cont = document.querySelector('.login-container');
const signup_cont = document.querySelector('.signup-container');

login_button.addEventListener('click', () => {
    document.getElementById("errwin").innerHTML = '';
    login_button.classList.add('selected');
    signup_button.classList.remove('selected');
    login_cont.style.display = 'flex';
    signup_cont.style.display = 'none';
});

signup_button.addEventListener('click', () => {
    document.getElementById("errwin").innerHTML = '';
    signup_button.classList.add('selected');
    login_button.classList.remove('selected');
    signup_cont.style.display = 'flex';
    login_cont.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    document.getElementById("errwin").innerHTML = '';
    login_button.classList.add('selected');
    login_cont.style.display = 'flex';
    signup_cont.style.display = 'none';
})