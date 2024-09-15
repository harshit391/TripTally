const error_window = document.querySelector('.error-window');

const login_btn = document.querySelector('#login');
const signup_btn = document.querySelector('#signup');

const login = () =>
{
    localStorage.setItem('token', 'token');
    alert('User logged in successfully');
    window.location.href = '/index.html';
}

const signup = () =>
{
    if (localStorage.getItem('token') === 'token')
    {
        error_window.style.display = 'flex';
        error_window.textContent = 'User already exists';
        return;
    }
    else
    {
        localStorage.setItem('token', 'token');
        alert('User created successfully');
        window.location.href = '/index.html';
    }
}

login_btn.addEventListener('click', () => {
    login();
    error_window.style.display = 'none';
});

signup_btn.addEventListener('click', () => {
    signup();
    error_window.style.display = 'none';
});