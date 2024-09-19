const checkAuthState = () =>
{
    const profileCover = document.querySelectorAll(".profile")[1];
    const profile = document.querySelector(".profile-state");

    const cookie = document.cookie;

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

    if (cookie !== null && cookie !== undefined && cookie !== '')
    {
        const token = cookie.split(';').find(cookie => cookie.includes('token')).split('=')[1];

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
                    window.location.href = '/pages/user.html';
                    profileCover.href = '/pages/user.html';
                    profile.innerHTML = 'Login / SignUp';
                }
            }   
        }
        else
        {
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

    const cookie = document.cookie;

    if (cookie !== null && cookie !== undefined && cookie !== '')
    {
        const token = cookie.split(';').find(cookie => cookie.includes('token')).split('=')[1];

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
}