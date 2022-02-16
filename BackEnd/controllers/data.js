//V1.1.0 TODO
//TODO: create Users object with user object that contains: --done--
//INFO: username: {password, links: {link}}

const links = {
    "test": {"link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ","clicks": 0, "owner": "Terry-404"}, //link, clicks
    "Rick": {"link": "https://youtu.be/dQw4w9WgXcQ","clicks": 0, "owner": "Terry-404"}
}

const users = {
    "Terry-404" : {
        "password" : "Terry-404",
        "links": {
            "Rick": {"link": "https://youtu.be/dQw4w9WgXcQ","clicks": 0},
            "test": {"link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "clicks": 0}
        }
    }
}


module.exports = {links,users}