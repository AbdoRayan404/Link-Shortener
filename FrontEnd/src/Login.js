import Form from './componenets/Form';

function Login() {
    return (
    <div className="Container">
        <Form name="Login." class="login" link="https://link-shortener-api-404.herokuapp.com/api/users/login" />
        <br/>
        <Form name="Register." class="register" link="https://link-shortener-api-404.herokuapp.com/api/users/register" firstPlaceholder="between 5-16 chars" secondPlaceholder="between 8-16 chars" />
      </div>
    );
  }
  
  export default Login;
  