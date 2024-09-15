const logout = () => 
{
    localStorage.removeItem('token');
}

document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('token')) 
    {
        window.location.href = '/pages/user.html';
    }
    logout();
})