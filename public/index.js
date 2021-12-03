const loginUsername = document.querySelector('.container .username');
const loginPassword = document.querySelector('.container .password');
const loginButton = document.querySelector('.container .login');

const registerUsername = document.querySelector('.container .RegisterUsername');
const registerPassword = document.querySelector('.container .RegisterPassword');
const registerButton = document.querySelector('.container .register');

const hiddenForm = document.querySelector('.hidden');
const hiddenUsername = document.querySelector('.hiddenUsername');
const hiddenPasssword = document.querySelector('.hiddenPassword')

loginButton.addEventListener('click', ()=>{
    let user = loginUsername.value
    let pass = loginPassword.value
    let body = {
        "username": user,
        "password": pass
    }
    fetch('/api/users/', {
        method : "POST",
        body : JSON.stringify(body),
        headers : {"Content-Type": "application/json"}
    })
    .then(res => {
        if(res.status != 200){
            res.text().then((x) => loginUsername.value = x)
        }else if(res.status == 200){
            hiddenUsername.value = user
            hiddenPasssword.value = pass
            hiddenForm.submit();
        }
    })
})

registerButton.addEventListener('click', ()=>{
    let user = registerUsername.value
    let pass = registerPassword.value
    let body = {
        "username": user,
        "password": pass
    }
    fetch('/api/users/register', {
        method : "POST",
        body : JSON.stringify(body),
        headers : {"Content-Type": "application/json"}
    })
    .then(res => {
        if(res.status != 200){
            res.text().then((x) => loginUsername.value = x)
        }else if(res.status == 200){
            hiddenUsername.value = user
            hiddenPasssword.value = pass
            hiddenForm.submit();
        }
    })
})