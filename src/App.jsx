import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login/login";
import PaginaPrincipal from "./mainpage/mainpage"; 
import Cliente from "./cliente/cliente";
import Produto from "./produto/produto";
import Pedido from "./pedido/pedido";   

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<PaginaPrincipal />} /> 
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/produto" element={<Produto />} />
        <Route path="/pedido" element={<Pedido />} />
      </Routes>
    </Router>
  );
}

export default App;
