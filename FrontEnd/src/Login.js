import Form from './componenets/Form';

function Login() {
    return (
    <div className="Container">
        <Form name="Login." class="login" link="http://127.0.0.1:5000/api/users/login" />
        <br/>
        <Form name="Register." class="register" link="http://127.0.0.1:5000/api/users/register" firstPlaceholder="between 5-16 chars" secondPlaceholder="between 8-16 chars" />
      </div>
    );
  }
  
  export default Login;
  