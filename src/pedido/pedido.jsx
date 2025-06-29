import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import './pedido.css';

function Pedido() {
  const [pedido, setPedido] = useState({
    id: '',
    cliente_id: '',
    produto_id: '',
    data: '',
    valor: '',
    formapagamento: ''
  });

  const [pedidosList, setPedidosList] = useState([]);

  const handleChange = (e) => {
    setPedido({ ...pedido, [e.target.name]: e.target.value });
  };

  const fetchPedidos = async () => {
    try {
      const response = await fetch('http://localhost:3000/pedido');
      const data = await response.json();
      setPedidosList(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error('Erro ao buscar pedidos:', err);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const procurarPedido = async () => {
    try {
      const response = await fetch(`http://localhost:3000/pedidos?id=${pedido.id}`);
      const data = await response.json();
      const row = Array.isArray(data) ? data[0] : data;

      setPedido({
        id: row.id || '',
        cliente_id: row.cliente_id || '',
        produto_id: row.produto_id || '',
        data: row.data || '',
        valor: row.valor || '',
        formapagamento: row.formapagamento || ''
      });
    } catch (err) {
      console.error('Erro ao procurar pedido:', err);
    }
  };

  const adicionarPedido = async () => {
    try {
      const response = await fetch('http://localhost:3000/pedido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cliente_id: pedido.idCliente,
          produto_id: pedido.idProduto,
          data: pedido.data,
          valor: pedido.valor,
          formapagamento: pedido.formapagamento
        })
      });
      const data = await response.json();
      alert(data.mensagem);
      fetchPedidos();
    } catch (err) {
      console.error('Erro ao adicionar pedido:', err);
    }
  };

  const atualizarPedido = async () => {
    try {
      const response = await fetch('http://localhost:3000/pedido', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: pedido.id,
          cliente_id: pedido.idCliente,
          produto_id: pedido.idProduto,
          data: pedido.data,
          valor: pedido.valor,
          formapagamento: pedido.formapagamento
        })
      });
      const data = await response.json();
      alert(data.mensagem);
      fetchPedidos();
    } catch (err) {
      console.error('Erro ao atualizar pedido:', err);
    }
  };

  const deletarPedido = async () => {
    try {
      const response = await fetch('http://localhost:3000/pedido', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: pedido.id })
      });
      const data = await response.json();
      alert(data.mensagem);
      fetchPedidos();
    } catch (err) {
      console.error('Erro ao deletar pedido:', err);
    }
  };

  return (
    <div className="produto-page">
      <Sidebar />
      <main className="produto-conteudo">
        <div className="form-section">
          <div className="left-form">
            <label>ID do Pedido</label>
            <input
              type="text"
              name="id"
              value={pedido.id}
              onChange={handleChange}
            />
            <button className="btn procurar" onClick={procurarPedido}>Procurar</button>
          </div>

          <div className="right-form">
            <div className="input-group">
              <label>ID do Cliente</label>
              <input
                type="text"
                name="idCliente"
                value={pedido.idCliente}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>ID do Produto</label>
              <input
                type="text"
                name="idProduto"
                value={pedido.idProduto}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Data</label>
              <input
                type="date"
                name="data"
                value={pedido.data}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Valor</label>
              <input
                type="number"
                name="valor"
                value={pedido.valor}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Forma de Pagamento</label>
              <input
                type="text"
                name="formapagamento"
                value={pedido.formapagamento}
                onChange={handleChange}
              />
            </div>

            <div className="button-group">
              <button className="btn adicionar" onClick={adicionarPedido}>Adicionar</button>
              <button className="btn atualizar" onClick={atualizarPedido}>Atualizar</button>
              <button className="btn deletar" onClick={deletarPedido}>Deletar</button>
            </div>
          </div>
        </div>

        <div className="table-section">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>ID Cliente</th>
                <th>ID Produto</th>
                <th>Data</th>
                <th>Valor</th>
                <th>Forma de Pagamento</th>
              </tr>
            </thead>
            <tbody>
              {pedidosList.map((p, i) => (
                <tr key={i}>
                  <td>{p.id}</td>
                  <td>{p.cliente_id}</td>
                  <td>{p.produto_id}</td>
                  <td>{p.data}</td>
                  <td>{p.valor}</td>
                  <td>{p.formapagamento}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Pedido;
