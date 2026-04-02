const error_window = document.querySelector('.error-window');

const login_btn = document.querySelector('#login');
const signup_btn = document.querySelector('#signup');

const login = async (email, password) =>
{
    const usersDB = localStorage.getItem('users');

    if (usersDB === null)
    {
        document.getElementById("errwin").scrollIntoView();
        error_window.innerHTML = 'User does not exist';
        return;
    }

    const users = JSON.parse(usersDB);
    const hashedPassword = await hashString(password);

    // Match against hashed password
    let user = users.find(u => u.email === email && u.password === hashedPassword);

    // Migration: if no match, try plain-text and upgrade to hashed
    if (!user) {
        const legacyUser = users.find(u => u.email === email && u.password === password);
        if (legacyUser) {
            legacyUser.password = hashedPassword;
            localStorage.setItem('users', JSON.stringify(users));
            user = legacyUser;
        }
    }

    if (!user)
    {
        document.getElementById("errwin").scrollIntoView();
        error_window.innerHTML = 'Invalid User Name or Password';
        return;
    }

    error_window.innerHTML = '';
    createSession(user.id);
    window.location.href = '/index.html';
}

const signup = async (username, password, email) =>
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

    const hashedPassword = await hashString(password);
    const curruser = new User(username, hashedPassword, email);

    users.push(curruser);

    localStorage.setItem('users', JSON.stringify(users));

    createSession(curruser.id);
    window.location.href = '/index.html';
}

login_btn.addEventListener('click', async () => {

    error_window.innerHTML = '';

    const email = document.querySelector(".login-container #email-login");
    const password = document.querySelector(".login-container #password-login");

    if (email.value === '' || password.value === '')
    {
        document.getElementById("errwin").scrollIntoView();
        error_window.innerHTML = 'Please fill all fields';
        return;
    }

    await login(email.value, password.value);
});

signup_btn.addEventListener('click', async () => {

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
    else if (password.value.length < 6)
    {
        document.getElementById("errwin").scrollIntoView();
        error_window.innerHTML = 'Password must be at least 6 characters';
        return;
    }

    await signup(name.value, password.value, email.value);
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
