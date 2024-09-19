const login_button = document.querySelector('.login-button');
const signup_button = document.querySelector('.signup-button');

const login_cont = document.querySelector('.login-container');
const signup_cont = document.querySelector('.signup-container');

const checkAuth = () => {

    const token = document.cookie.split(';').find(cookie => cookie.includes('token')).split('=')[1];
    
    if (token !== null && token !== undefined && token !== '') 
    {
        const userDB = localStorage.getItem('users');

        if (userDB !== null)
        {
            const user = JSON.parse(userDB).find(user => user.id === parseInt(token));

            if (user !== undefined || user !== null)
            {
                alert("Already Logged In");
                window.location.href = '/index.html';
                return;
            }
            else
            {
                alert("Invalid Token. Please login again.");    
                window.location.href = '/login.html';
                return;
            }
        }   
    }
}

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
    checkAuth();
    login_button.classList.add('selected');
    login_cont.style.display = 'flex';
    signup_cont.style.display = 'none';
})