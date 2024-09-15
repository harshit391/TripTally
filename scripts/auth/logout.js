const logout = () => 
{
    localStorage.removeItem('token');
}

document.addEventListener('DOMContentLoaded', () => {
    logout();
})