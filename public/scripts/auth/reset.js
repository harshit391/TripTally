const checkMail = (email) =>
{
    const users = JSON.parse(localStorage.getItem('users'));

    if (users.length > 0)
    {
        return users.find(user => user.email === email);
    }

    return null;
}

const resetPassword = (email, password) => 
{
    const user = checkMail(email);

    if (!user)
    {
        return;
    }

    const users = JSON.parse(localStorage.getItem('users'));

    users.forEach((ele) => {
        if (ele.email === email)
        {
            ele.password = password;
        }
    });

    localStorage.setItem('users', JSON.stringify(users));

    alert('Password Reset Successful');
}

const resetPass = () =>
{
    const email = document.querySelector("#email-reset");
    const password = document.querySelector("#password-reset");

    const error_window = document.querySelector("#errwin");

    error_window.innerHTML = '';

    if (email.value === '' || password.value === '')
    {
        error_window.innerHTML = 'Please fill all fields';
        return;
    }

    if (email.value.indexOf('@') === -1)
    {
        error_window.innerHTML = 'Invalid email';
        return;
    }

    resetPassword(email.value, password.value);
}

document.addEventListener('DOMContentLoaded', () => {
    const reset_btn = document.querySelector("#reset-btn");

    reset_btn.addEventListener('click', resetPass);

});