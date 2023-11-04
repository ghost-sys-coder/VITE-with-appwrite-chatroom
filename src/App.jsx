import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components";
import { Room, Login, Register } from "./pages";

const App = ()=>{
  return(
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Room />} />
        </Route>
      </Routes>
    </Router>
  ) 
}

export default App;