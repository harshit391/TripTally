const checkAuthState = () =>
{
    const profileCover = document.querySelectorAll(".profile")[1];
    const profile = document.querySelector(".profile-state");

    const token = document.cookie.split(';').find(cookie => cookie.includes('token')).split('=')[1];

    profile.addEventListener('click', () => {
        if (profile.innerHTML === 'Logout')
        {
            document.cookie = `token=;path=/;`;
            window.location.href = '/index.html';
        }
        else
        {
            window.location.href = '/pages/user.html';
        }
    });
    
    if (token !== null && token !== undefined && token !== '') 
    {
        const userDB = localStorage.getItem('users');

        if (userDB !== null)
        {
            const user = JSON.parse(userDB).find(user => user.id === parseInt(token));

            if (user !== undefined || user !== null)
            {
                profileCover.href = '/index.html';
                profile.innerHTML = 'Logout';
            }
            else
            {
                profileCover.href = '/pages/user.html';
                profile.innerHTML = 'Login / SignUp';
            }
        }   
    }
    else
    {
        profileCover.href = '/pages/user.html';
        profile.innerHTML = 'Login / SignUp';
    }
}