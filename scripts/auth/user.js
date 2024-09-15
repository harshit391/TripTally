const login_button = document.querySelector('.login-button');
const signup_button = document.querySelector('.signup-button');

const login_cont = document.querySelector('.login-container');
const signup_cont = document.querySelector('.signup-container');

login_button.addEventListener('click', () => {
    login_button.classList.add('selected');
    signup_button.classList.remove('selected');
    login_cont.style.display = 'flex';
    signup_cont.style.display = 'none';
});

signup_button.addEventListener('click', () => {
    signup_button.classList.add('selected');
    login_button.classList.remove('selected');
    signup_cont.style.display = 'flex';
    login_cont.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', () => {
    login_button.classList.add('selected');
    login_cont.style.display = 'flex';
    signup_cont.style.display = 'none';
})