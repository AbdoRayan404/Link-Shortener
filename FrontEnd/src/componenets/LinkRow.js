import React from 'react'
import { useNavigate } from 'react-router-dom';

const LinkRow = (props) => {
    const navigate = useNavigate();

    const deleteLink = () => {
        fetch('https://link-shortener-api-404.herokuapp.com/api/users/links', {
            method: 'DELETE',
            headers: {
                'x-access-token': localStorage.getItem("token"),
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'linkName': props.linkName
            })
        })
        .then(res => {
            if(res.status == 200){
                navigate(0)
            }
            else{

            }
        })
    }

    return (
        <div className="Link-Row">
            <label className="LinkName">{props.linkName}</label>
            <a className="Link" href={`https://link-shortener-api-404.herokuapp.com/shorten/${props.linkName}`}>{props.link}</a>
            <button className="Delete" onClick={deleteLink}>Delete</button>
        </div>
    )
}

export default LinkRow
