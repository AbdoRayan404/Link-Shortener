import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [label, setLabel] = useState('')
    let navigate = useNavigate();

    const fetchAPI = ()=>{
        fetch(props.link, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(res => {
            if (res.status != 200){
                setLabel("Wrong password/username.")
            }
            else if(res.status == 200){
                res.json().then(x => localStorage.setItem("token", x.Authorization))
                navigate('/user')
            }
        })
    }
    return (
        <div className={props.class}>
            <h1>{props.name}</h1>
            <input type="text" className={props.class + "-username"} placeholder={props.firstPlaceholder} onChange={x => setUsername(x.target.value)}></input> <br/>
            <input type="password" className={props.class + "-password"} placeholder={props.secondPlaceholder} onChange={x => setPassword(x.target.value)}></input> <br/>
            <button className={props.class + "-submit"} onClick={fetchAPI}>Submit</button>
            <p>{label}</p>
        </div>
    )
}

export default Form
