import { Route, Routes } from "react-router-dom";

import "./index.css";
import Homepage from "./pages/Homepage";
import { configure } from "axios-hooks";
import { axiosInstance } from "./hooks/axios";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateResolver from "./resolvers/PrivateResolver";

configure({
  axios: axiosInstance(),
  cache: false,
});

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateResolver>
              <Homepage></Homepage>
            </PrivateResolver>
          }
        />

        <Route path="/login" element={<Login></Login>} />
        <Route path="/signup" element={<Signup></Signup>} />
      </Routes>
    </>
  );
};

export default App;

// const root = createRoot(document.getElementById("app") as HTMLElement);
// root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );
