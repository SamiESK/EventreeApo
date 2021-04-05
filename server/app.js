const app_name = "eventree-calendar";
function buildPath(route) {
    if (process.env.NODE_ENV === "production") {
        return "https://" + app_name + ".herokuapp.com/" + route;
    } else {
        return "http://localhost:5000/" + route;
    }
}

var email;
var password;

const doLogin = async (event) => {
    event.preventDefault();

    var obj = { email: email.value, password: password.value };
    var js = JSON.stringify(obj);
   
    try {
        const response = await fetch(buildPath('api/user/login'), {
            method: "POST",
            body: js,
            headers: { "Content-Type": "application/json" },
        });

        var res = JSON.parse(await response.text());
        console.log(res);
        if (!res.token) {
            document.getElementById("loginError").innerHTML = res.error;
        }
        else if(res.token) {
            document.getElementById("loginError").innerHTML = "";
            console.log(res);
            
            localStorage.setItem('token', res.token);
            localStorage.setItem('firstName', res.firstName);
            localStorage.setItem('lastName', res.lastName);
            localStorage.setItem('email', res.email);
        }
        
        
    } catch (e) {
        alert(e.toString());
        return;
    }
};