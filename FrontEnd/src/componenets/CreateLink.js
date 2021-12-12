import {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const CreateLink = () => {
    const [linkName, setLinkName] = useState('')
    const [link, setLink] = useState('')
    let navigate = useNavigate()

    const createLink = () =>{
        fetch('http://127.0.0.1:5000/api/users/links', {
            method: "POST",
            headers:{
                "x-access-token": localStorage.getItem("token"),
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                linkName: linkName,
                link: link
            })
        })
        .then(res => {
            if(res.status == 200){
                navigate(0)
            }
        })
    }
    return (
        <div className="Create-Container">
            <label>Link Name</label><br/>
            <input type="text" name="linkName" onChange={x=>setLinkName(x.target.value)} ></input><br/>
            
            <label>Link</label><br/>
            <input type="text" name="link" onChange={x=>setLink(x.target.value)} ></input><br/>

            <button onClick={createLink}>Create</button>
        </div>
    )
}

export default CreateLink
