const checkMail = (email) =>
{
    const usersStr = localStorage.getItem('users');
    const users = safeParseJSON(usersStr);

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

    const confirmation = confirm(
        'You are about to reset the password for: ' + email + '\n\n' +
        'Are you sure you want to proceed?'
    );

    if (!confirmation) {
        return;
    }

    const usersStr = localStorage.getItem('users');
    const users = safeParseJSON(usersStr);

    if (!users) {
        document.querySelector("#errwin").innerHTML = 'Error accessing user data';
        return;
    }

    const salt = generateSalt();
    const hashedPassword = await hashString(password, salt);

    users.forEach((ele) => {
        if (ele.email === email)
        {
            ele.password = hashedPassword;
            ele.salt = salt;
        }
    });

    localStorage.setItem('users', JSON.stringify(users));

    alert('Password Reset Successful');
    window.location.href = '/pages/user.html';
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
