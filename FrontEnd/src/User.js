import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LinksList from './componenets/LinksList';
import CreateLink from './componenets/CreateLink';

function User() {
    //object that will hold the fetch response
    const [response, setResponse] = useState({username:"Loading", links:{"Loading":"Loading"}})
    const [resKeys, setResKeys] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token")

        //check if token exist, then sends GET API to the back-end
        if(token){
            fetch('http://127.0.0.1:5000/api/users/', {
                method: "GET",
                headers: {
                    "x-access-token": token
                }
            })
            .then(res => {
                if(res.status == 200){
                    res.json().then(x => {
                        setResponse(x)
                        setResKeys(Object.keys(x.links))
                    })
                }
                else{
                    navigate('/login')
                }
            })
        }
    }, []);


  return (
    <div className="User-Div">
        <h2>Welcome {response.username} To Link-Shortener</h2>
        <h3>Create New Link</h3>

        <CreateLink />
        <br/>
        <LinksList resKeys={resKeys} response={response}/>

    </div>
  );
}

export default User;
