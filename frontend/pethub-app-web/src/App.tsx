import { Route, Routes } from "react-router-dom";

import "./index.css";
import Homepage from "./pages/Homepage";
import Vitepage from "./pages/Vitepage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>} />
        <Route path="/vite" element={<Vitepage></Vitepage>} />
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
