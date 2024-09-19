class User 
{
    constructor(username, password, email)
    {
        this.id = Date.now();
        this.username = username;
        this.password = password;
        this.email = email;
    }
}
