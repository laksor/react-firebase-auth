import "./App.css";
import { getAuth } from "firebase/auth";
import app from "./firebase.init";

const auth = getAuth(app);

function App() {
  const handleEmail = (event) => {
    console.log(event.target.value);
  };

  const handlePass = (event) => {
    console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    console.log('form submited');
    event.preventDefault();
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input onBlur={handleEmail} type="email"></input>
        <br />
        <input onBlur={handlePass} type="password"></input>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default App;
