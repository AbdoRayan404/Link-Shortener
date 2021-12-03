const username = document.querySelector('.username');
const password = document.querySelector('.password');
const container = document.querySelector('.container');

const linkName = document.querySelector('.container .linkName');
const link = document.querySelector('.container .link');
const submit = document.querySelector('.container .create');


submit.addEventListener('click', ()=>{
    let body = {
        "username": username.innerHTML,
        "password": password.innerHTML,
        "linkName": linkName.value,
        "link": link.value
    }
    fetch('/api/users/links', {
        method : "POST",
        body : JSON.stringify(body),
        headers : {"Content-Type": "application/json"}
    })
    .then(res => {
        if(res.status == 200){
        fetch('/api/users/', {
            method : "POST",
            body : JSON.stringify(body),
            headers : {"Content-Type": "application/json"}
        })
        .then(res => {
            if(res.status == 200){
                res.json().then((x)=>{
                    let ul = document.querySelector('.container .links-List')
                    ul.innerHTML = ""

                    let keys = Object.keys(x)
    
                    for(let i = 0; i < keys.length; i++){
                        ul.innerHTML = ul.innerHTML.concat(`<li><span>${keys[i]}</span> : <a href="${x[keys[i]]}">${x[keys[i]]}</a> <button onclick="deleteLink('${keys[i]}')">Delete</button></li>`)
                    }
                })
            }
        })
    }   })
    
})


window.onload = ()=>{
    let body = {
        "username": username.innerHTML,
        "password": password.innerHTML
    }
    fetch('/api/users/', {
        method : "POST",
        body : JSON.stringify(body),
        headers : {"Content-Type": "application/json"}
    })
    .then(res => {
        if(res.status == 200){
            res.json().then((x)=>{
                try{
                    document.querySelector('.container .links-List').innerHTML = ""
                }catch{

                }
                let keys = Object.keys(x)

                let ul = document.createElement('ul')
                container.appendChild(ul)
                ul.className = "links-List"

                for(let i = 0; i < keys.length; i++){
                    ul.innerHTML = ul.innerHTML.concat(`<li><span>${keys[i]}</span> : <a href="${x[keys[i]]}">${x[keys[i]]}</a> <button onclick="deleteLink('${keys[i]}')">Delete</button></li>`)
                }
            })
        }
    })
}

const deleteLink = (linkName) =>{
    let body = {
        "username": username.innerHTML,
        "password": password.innerHTML,
        "linkName": linkName
    }
    fetch('/api/users/links', {
        method : "DELETE",
        body : JSON.stringify(body),
        headers : {"Content-Type": "application/json"}
    })
    .then(res => {
        if(res.status == 200){
            fetch('/api/users/links', {
                method : "POST",
                body : JSON.stringify(body),
                headers : {"Content-Type": "application/json"}
            })
            .then(res => {
                if(res.status == 200){
                fetch('/api/users/', {
                    method : "POST",
                    body : JSON.stringify(body),
                    headers : {"Content-Type": "application/json"}
                })
                .then(res => {
                    if(res.status == 200){
                        res.json().then((x)=>{
                            let ul = document.querySelector('.container .links-List')
                            ul.innerHTML = ""
        
                            let keys = Object.keys(x)
            
                            for(let i = 0; i < keys.length; i++){
                                ul.innerHTML = ul.innerHTML.concat(`<li><span>${keys[i]}</span> : <a href="${x[keys[i]]}">${x[keys[i]]}</a> <button onclick="deleteLink('${keys[i]}')">Delete</button></li>`)
                            }
                        })
                    }
                })
            }   })
        }
    })
}