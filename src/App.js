import "./App.css";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from "./firebase.init";
import { Button, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [error, setError] = useState();
  const [registered, setRegistered] = useState();
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePass = (event) => {
    setPassword(event.target.value);
  };

  const handleCheckbox = (event) =>{
    setRegistered(event.target.checked);
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    if(registered){
      signInWithEmailAndPassword(auth, email, password)
      .then((result)=>{
        const user = result.user;
        console.log(user);
        setEmail('');
        setPassword('');
      })
      .catch((error) =>{
        console.log(error);
        setError(error.message);
      })
    }
    else{
      createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setEmail('');
        setPassword('');
        verifyEmail();
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
    }
    event.preventDefault();
  }

   const passReset = () =>{
     sendPasswordResetEmail(auth, email)
     .then(() =>{
       console.log('password reset');
     })
   }

  const verifyEmail = () =>{
    sendEmailVerification(auth.currentUser)
    .then( () =>{
      console.log('email verify');
    })
  }

  return (
    <div>
      <Container className="shadow-lg p-5 mt-5 rounded">
        <Row className="w-50 mx-auto">
          <h2 className="mt-3 text-danger">Please {registered ? 'login' : 'Register'}</h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3 mt-2" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onBlur={handleEmail}
                type="email"
                placeholder="Enter email"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onBlur={handlePass}
                type="password"
                placeholder="Password"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid password.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                onChange={handleCheckbox}
                type="checkbox"
                label="Already Registered ?"
                feedback="You must check before submitting."
                feedbackType="invalid"
              />
            </Form.Group>
            <Button onClick={passReset} variant="link">forget password ? </Button>
            <br />
            <Button className="rounded-pill" variant="danger" type="submit">
              {registered ? 'Login' : 'Register'}
            </Button>
          </Form>
        </Row>
      </Container>
    </div>
  );
}

export default App;
