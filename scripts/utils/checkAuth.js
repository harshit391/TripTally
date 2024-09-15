
const checkAuth = () => {

    const profile = document.querySelector(".profile");
    const state = document.querySelector(".profile-state");
    
    const token = localStorage.getItem('token');
    
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