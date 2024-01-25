import { RouterProvider } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";

function App() {

  return (
    <>
      <RouterProvider router={publicRoutes} />
    </>
  );
}

export default App;