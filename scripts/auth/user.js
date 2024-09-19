class User 
{
    constructor(username, password, email)
    {
        this.id = hashPass(Date.now());
        this.username = username;
        this.password = password;
        this.email = email;
    }
}
