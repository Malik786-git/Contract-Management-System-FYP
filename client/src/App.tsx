// import { RouterProvider } from "react-router-dom";
// import { privateRoutes, publicRoutes } from "./routes";
// import { useAppSelector } from "./hooks/redux-hooks";
import { useState } from "react";

function App() {

  // const {isLoggin}= useAppSelector((state) => state)
  const [ext, setExt] = useState("");

  let phone = "533433333";
  console.log( "substring...  ", phone?.substring(phone.indexOf("+")));
  
  function onExtChanged(_ext: string) {
  
    let __ext = _ext;

    // Check if the input is not empty
    if (__ext.length > 0) {
        if (!__ext.startsWith("+")) {
            __ext = `+${__ext}`;
        }
    } 

    const ext = __ext;
    setExt(ext);
    console.log("onExtChanged", ext.length , 'original', _ext.length);
}

  return (
    <>
      {/* <RouterProvider router={isLoggin ? privateRoutes :publicRoutes} /> */}
      <h1>Phone Field</h1>
      <input type="text" value={ext} onChange={(e)=>onExtChanged(e.target.value)} />

    </>
  );
}

export default App; 