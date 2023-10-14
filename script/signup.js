const form = document.querySelector("#form")
const firstnameInput = document.querySelector("#firstname")
const lastnameInput = document.querySelector("#lastname")
const emailInput = document.querySelector("#email")
const passwordInput = document.querySelector("#password")
const dataEmailInput = document.querySelector("[data-input-email]")
const dataPasswordInput = document.querySelector("[data-input-password]")
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
const PASSWORD_REGEX = /[a-zA-Z0-9]{8,}/;



form.addEventListener("submit", signUp)

function checkValue(value, regex, element, type) {
    if (!regex.test(value)) {
      element.setAttribute(`data-input-${type}`, "error");
      element.innerText =` ${type} is invalid`.toUpperCase();
      element.style.display = "block";
    }
    return regex.test(value);
  }

  async function signUp(e) {
    e.preventDefault()
    const isEmail = checkValue(emailInput.value, EMAIL_REGEX, dataEmailInput, "email")
    const isPassword = checkValue(passwordInput.value, PASSWORD_REGEX, dataPasswordInput, "password")
    if (isEmail && isPassword) {
     let res = await axios.post(`http://localhost:3000/api/auth/signup`,
      {
          firstname : firstnameInput.value,
          lastname: lastnameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
          headers:{
            "Content-type" : "application/json"
          },
      }
      )
      if (res.status == 200 || res.status == 201) {
          let arr = []
          arr.push(firstnameInput.value,lastnameInput.value,emailInput.value,passwordInput.value)
          localStorage.setItem("user",JSON.stringify(arr))
      }
    
    }
  }


  if (localStorage.getItem("user")) {
    location.origin + location.replace("./login.html")
    login.href = "../index.html"
  }

  