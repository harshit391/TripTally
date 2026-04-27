const checkAuthState = () =>
{
    const profileCover = document.querySelectorAll(".nav-item")[1];
    const profile = document.querySelector(".profile-state");

    profile.addEventListener('click', () => {
        if (profile.innerHTML === 'Logout')
        {
            clearSession();
            window.location.href = '/index.html';
        }
        else
        {
            window.location.href = '/pages/user.html';
        }
    });

    const userId = getSessionUserId();

    if (userId !== null)
    {
        const userDB = localStorage.getItem('users');

        if (userDB !== null)
        {
            const users = safeParseJSON(userDB);
            const user = users ? users.find(user => user.id === userId) : null;

            if (user !== undefined && user !== null)
            {
                loadDataBase();
                profileCover.href = '/index.html';
                profile.innerHTML = 'Logout';
            }
            else
            {
                clearSession();
                window.location.href = '/pages/user.html';
                profileCover.href = '/pages/user.html';
                profile.innerHTML = 'Login / SignUp';
            }
        }
        else
        {
            clearSession();
            window.location.href = '/pages/user.html';
            profileCover.href = '/pages/user.html';
            profile.innerHTML = 'Login / SignUp';
        }
    }
    else
    {
        window.location.href = '/pages/user.html';
        profileCover.href = '/pages/user.html';
        profile.innerHTML = 'Login / SignUp';
    }

}

const checkAuth = () => {

    const userId = getSessionUserId();

    if (userId !== null)
    {
        const userDB = localStorage.getItem('users');

        if (userDB !== null)
        {
            const users = safeParseJSON(userDB);
            const user = users ? users.find(user => user.id === userId) : null;

            if (user !== undefined && user !== null)
            {
                window.location.href = '/index.html';
                return;
            }
            else
            {
                clearSession();
            }
        }
    }
}
