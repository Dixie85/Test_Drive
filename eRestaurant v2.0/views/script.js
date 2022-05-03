const register = document.getElementById("register");
const registerFormDiv = document.getElementById("registerFormDiv");

register.addEventListener("click", ()=>{
    registerFormDiv.classList.toggle("registerFormDiv");
    registerFormDiv.innerHTML = `
    <form action="http://localhost:3000/register" method="post">
    <p>To register enter your:</p>
    <br>
    <label for="username">Username:</label>
    <input type="text" name="username">
    <br><br>
    <label for="password" >Password:</label>
    <input type="text" name="password">
    <br><br>
    <input type="radio" name="role" value="user">
    <label for="Register">User</label>
    <input type="radio" id="css" name="role" value="admin">
    <label for="Register">Admin</label>
    <br><br>
        <button>Register</button>
</form>`
});