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

    const users = safeParseJSON(usersDB);
    if (!users) {
        error_window.innerHTML = 'Error reading user data';
        return;
    }

    let user = null;

    // Try salted hash first
    for (const u of users) {
        if (u.email === email && u.salt) {
            const hashedPassword = await hashString(password, u.salt);
            if (u.password === hashedPassword) {
                user = u;
                break;
            }
        }
    }

    // Migration: try unsalted hash
    if (!user) {
        const hashedPassword = await hashString(password);
        user = users.find(u => u.email === email && u.password === hashedPassword);

        // Upgrade to salted hash
        if (user) {
            const salt = generateSalt();
            user.salt = salt;
            user.password = await hashString(password, salt);
            localStorage.setItem('users', JSON.stringify(users));
        }
    }

    // Migration: try plain-text (legacy)
    if (!user) {
        const legacyUser = users.find(u => u.email === email && u.password === password);
        if (legacyUser) {
            const salt = generateSalt();
            legacyUser.salt = salt;
            legacyUser.password = await hashString(password, salt);
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
        const parsed = safeParseJSON(usersDB);
        if (parsed) {
            const exists = parsed.find(user => user.email === email);

            if (exists)
            {
                document.getElementById("errwin").scrollIntoView();
                error_window.innerHTML = `User already exists`;
                return;
            }

            users = parsed;
        }
    }

    error_window.innerHTML = '';

    const salt = generateSalt();
    const hashedPassword = await hashString(password, salt);
    const curruser = new User(username, hashedPassword, email);
    curruser.salt = salt;

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
    else if (name.value.length > 50)
    {
        document.getElementById("errwin").scrollIntoView();
        error_window.innerHTML = 'Name must be 50 characters or less';
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
});
