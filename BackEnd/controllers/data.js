//V1.1.0 TODO
//TODO: create Users object with user object that contains: --done--
//INFO: username: {password, links: {link}}

const data = {
    welcome: "Welcome to link-shortner, where you can rick roll Easily.",
    tryit: "click here to try."
}

const links = {
    "test": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "Rick": "https://youtu.be/dQw4w9WgXcQ"
}

const users = {
    "Terry-404" : {
        "password" : "Terry-404",
        "links": {
            "Rick": "https://youtu.be/dQw4w9WgXcQ"
        }
    }
}


module.exports = {data,links,users}