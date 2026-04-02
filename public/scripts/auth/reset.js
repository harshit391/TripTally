const checkMail = (email) =>
{
    const users = JSON.parse(localStorage.getItem('users'));

    if (users && users.length > 0)
    {
        return users.find(user => user.email === email);
    }

    return null;
}

const resetPassword = async (email, password) =>
{
    const user = checkMail(email);

    if (!user)
    {
        document.querySelector("#errwin").innerHTML = 'User not found';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users'));

    const hashedPassword = await hashString(password);

    users.forEach((ele) => {
        if (ele.email === email)
        {
            ele.password = hashedPassword;
        }
    });

    localStorage.setItem('users', JSON.stringify(users));

    alert('Password Reset Successful');
}

const resetPass = async () =>
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

    if (password.value.length < 6)
    {
        error_window.innerHTML = 'Password must be at least 6 characters';
        return;
    }

    await resetPassword(email.value, password.value);
}

document.addEventListener('DOMContentLoaded', () => {
    const reset_btn = document.querySelector("#reset-btn");

    reset_btn.addEventListener('click', resetPass);

});
