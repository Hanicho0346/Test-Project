import { ChakraProvider, Box ,ColorModeScript} from "@chakra-ui/react";
import theme from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./tailwind.css"; 
import Landingpage from "./components/Landing/Landingpage";
import Login from "./components/Aut/Login";
import Home from "./components/Home";
import Signup from "./components/Aut/Signup";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Landingpage" element={<Landingpage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Dashboard" element={<Dashboard />} />
          </Routes>
    
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
