import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import './cliente.css';

function Cliente() {
  const [cliente, setCliente] = useState({
    id: '',
    nome: '',
    quantidadepedidos: '',
    formapagamento: ''
  });

  const [clientesList, setClientesList] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const fetchClientes = async () => {
    try {
      const response = await fetch('http://localhost:3000/cliente');
      const data = await response.json();
      setClientesList(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error('Erro ao buscar clientes:', err);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const procurarCliente = async () => {
    try {
      const response = await fetch(`http://localhost:3000/clientes?idCliente=${cliente.id}`);
      const data = await response.json();
      setCliente({
        id: data.id || '',
        nome: data.nome || '',
        quantidadepedidos: data.quantidadepedidos || '',
        formapagamento: data.formapagamento || ''
      });
    } catch (err) {
      console.error('Erro ao procurar cliente:', err);
    }
  };

  const adicionarCliente = async () => {
    try {
      const response = await fetch('http://localhost:3000/cliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: cliente.nome,
          quantidadepedidos: cliente.quantidadepedidos,
          formapagamento: cliente.formapagamento
        })
      });
    
      const data = await response.json();
      alert(data.mensagem);
      fetchClientes();
    } catch (err) {
      console.error('Erro ao adicionar cliente:', err);
    }
  };

  const atualizarCliente = async () => {
    try {
      const response = await fetch('http://localhost:3000/cliente', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: cliente.id,
          nome: cliente.nome,
          quantidadepedidos: cliente.quantidadepedidos,
          formapagamento: cliente.formapagamento
        })
      });
      const data = await response.json();
      alert(data.mensagem);
      fetchClientes();
    } catch (err) {
      console.error('Erro ao atualizar cliente:', err);
    }
  };

  const deletarCliente = async () => {
    try {
      const response = await fetch('http://localhost:3000/cliente', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: cliente.id })
      });
      const data = await response.json();
      alert(data.mensagem);
      fetchClientes();
    } catch (err) {
      console.error('Erro ao deletar cliente:', err);
    }
  };

  return (
    <div className="cliente-page">
      <Sidebar />

      <main className="cliente-conteudo">
        <div className="form-section">
          <div className="left-form">
            <label>ID do Cliente</label>
            <input
              type="text"
              name="id"
              value={cliente.id}
              onChange={handleChange}
            />
            <button className="btn procurar" onClick={procurarCliente}>Procurar</button>
          </div>

          <div className="right-form">
            <div className="input-group">
              <label>Nome</label>
              <input
                type="text"
                name="nome"
                value={cliente.nome}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Quantidade de pedidos</label>
              <input
                type="number"
                name="quantidadepedidos"
                value={cliente.quantidadepedidos}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Forma de pagamento</label>
              <input
                type="text"
                name="formapagamento"
                value={cliente.formapagamento}
                onChange={handleChange}
              />
            </div>

            <div className="button-group">
              <button className="btn adicionar" onClick={adicionarCliente}>Adicionar</button>
              <button className="btn atualizar" onClick={atualizarCliente}>Atualizar</button>
              <button className="btn deletar" onClick={deletarCliente}>Deletar</button>
            </div>
          </div>
        </div>

        <div className="table-section">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Forma de pagamento</th>
                <th>Quantidade de Pedidos</th>
              </tr>
            </thead>
            <tbody>
              {clientesList.map((c, i) => (
                <tr key={i}>
                  <td>{c.id}</td>
                  <td>{c.nome}</td>
                  <td>{c.formapagamento}</td>
                  <td>{c.quantidadepedidos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Cliente;
