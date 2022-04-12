import './App.css';
import { getAuth } from "firebase/auth";
import app from "./firebase.init";

const auth = getAuth(app);

function App() {
  return (
    <div className="App">
    <form>
    <input type="text"></input>
    <input type="password"></input>
    </form>
      
    </div>
  );
}

export default App;
