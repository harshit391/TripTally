
const checkAuth = () => {

    const profile = document.querySelectorAll(".profile")[1];
    const state = document.querySelector(".profile-state");
    
    const token = localStorage.getItem('token');

    state.addEventListener('click', () => {
        if (token) 
        {
            localStorage.removeItem('token');
            alert("You have been logged out");
            window.location.reload();
        }
        else 
        {
            location.href = "/pages/user.html";
        }
    })
    
    if (token) 
    { 
        profile.href = "/index.html";
        state.innerHTML = `Logout`;
    }
    else 
    {
        profile.href = "/pages/user.html";
        state.textContent = "Login / SignUp";
    }
};