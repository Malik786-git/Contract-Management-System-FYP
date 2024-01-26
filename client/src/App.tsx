import { RouterProvider } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import { useAppSelector } from "./hooks/redux-hooks";

function App() {

  const {isLoggin}= useAppSelector((state) => state)
  

  return (
    <>
      <RouterProvider router={isLoggin ? privateRoutes :publicRoutes} />
    </>
  );
}

export default App; 