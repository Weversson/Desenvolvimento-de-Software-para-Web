import React from "react";

import Navbar from "./components/navbar";
import Catalago from "./catalago";


export default function page(): JSX.Element {
  
  return (
    <div>
      <Navbar></Navbar>
      <h1>CATÁLOGO DE PRODUTOS DESCOMPLICA AGRO</h1>
      <Catalago/>
    </div>
          


    
  );
}
