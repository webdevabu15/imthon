const form = document.querySelector("#form")
const emailInput = document.querySelector("#email")
const passwordInput = document.querySelector("#password")
const dataEmailInput = document.querySelector("[data-input-email]")
const dataPasswordInput = document.querySelector("[data-input-password]")
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
const PASSWORD_REGEX = /[a-zA-Z0-9]{8,}/;

console.log();
form.addEventListener("submit", signIn)


function signIn(e) {
    e.preventDefault()
    let u = JSON.parse(localStorage.getItem("user"))
    let email = u[2]
    let password = u[3]
    if (email==emailInput.value && password==passwordInput.value) {
        axios.post(`http://localhost:3000/api/auth/login`,{
            "email":emailInput.value,
            "password":passwordInput.value,
            headers: {
              "Content-type": "application/json",
        },
        }).then(res => localToken(res.data))
       
        
        
    }
}

function localToken(data) {
    localStorage.setItem("token",JSON.stringify(data.token))
    if (localStorage.getItem("token")) {
       location.origin + location.replace("../index.html")
    }
}