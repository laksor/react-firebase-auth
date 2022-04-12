import "./App.css";
import { getAuth } from "firebase/auth";
import app from "./firebase.init";
import { Button, Container, Form, Row } from "react-bootstrap";

const auth = getAuth(app);

function App() {
  const handleEmail = (event) => {
    console.log(event.target.value);
  };

  const handlePass = (event) => {
    console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    console.log("form submited");
    event.preventDefault();
  };

  return (
    <div>
      <Container className="shadow-lg p-5 mt-5 rounded">
        <Row className="w-50 mx-auto">
        <h2 className="mt-3 text-danger">Please Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 mt-2" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control onBlur={handleEmail} type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onBlur={handlePass} type="password" placeholder="Password" />
            </Form.Group>
            <Button className="rounded-pill" variant="danger" type="submit">
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    </div>
  );
}

export default App;
