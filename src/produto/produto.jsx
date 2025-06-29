import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import './produto.css';

function Produto() {
  const [produto, setProduto] = useState({
    id: '',
    nome: '',
    preco: '',
    estoque: ''
  });

  const [produtosList, setProdutosList] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  const fetchProdutos = async () => {
    try {
      const response = await fetch('http://localhost:3000/produto');
      const data = await response.json();
      setProdutosList(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const procurarProduto = async () => {
    try {
      const response = await fetch(`http://localhost:3000/produtos?idProduto=${produto.id}`);
      const data = await response.json();
      setProduto({
        id: data.id || '',
        nome: data.nome || '',
        preco: data.preco || '',
        estoque: data.estoque || ''
      });
    } catch (err) {
      console.error('Erro ao procurar produto:', err);
    }
  };

  const adicionarProduto = async () => {
    try {
      const response = await fetch('http://localhost:3000/produto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: produto.nome,
          preco: produto.preco,
          estoque: produto.estoque
        })
      });
      const data = await response.json();
      alert(data.mensagem);
      fetchProdutos();
    } catch (err) {
      console.error('Erro ao adicionar produto:', err);
    }
  };

  const atualizarProduto = async () => {
    try {
      const response = await fetch('http://localhost:3000/produto', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          estoque: produto.estoque
        })
      });
      const data = await response.json();
      alert(data.mensagem);
      fetchProdutos();
    } catch (err) {
      console.error('Erro ao atualizar produto:', err);
    }
  };

  const deletarProduto = async () => {
    try {
      const response = await fetch('http://localhost:3000/produto', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: produto.id })
      });
      const data = await response.json();
      alert(data.mensagem);
      fetchProdutos();
    } catch (err) {
      console.error('Erro ao deletar produto:', err);
    }
  };

  return (
    <div className="produto-page">
      <Sidebar />

      <main className="produto-conteudo">
        <div className="form-section">
          <div className="left-form">
            <label>ID do Produto</label>
            <input
              type="text"
              name="id"
              value={produto.id}
              onChange={handleChange}
            />
            <button className="btn procurar" onClick={procurarProduto}>Procurar</button>
          </div>

          <div className="right-form">
            <div className="input-group">
              <label>Nome do Produto</label>
              <input
                type="text"
                name="nome"
                value={produto.nome}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Valor</label>
              <input
                type="number"
                name="preco"
                value={produto.preco}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Quantidade em Estoque</label>
              <input
                type="number"
                name="estoque"
                value={produto.estoque}
                onChange={handleChange}
              />
            </div>

            <div className="button-group">
              <button className="btn adicionar" onClick={adicionarProduto}>Adicionar</button>
              <button className="btn atualizar" onClick={atualizarProduto}>Atualizar</button>
              <button className="btn deletar" onClick={deletarProduto}>Deletar</button>
            </div>
          </div>
        </div>

        <div className="table-section">
          <table>
            <thead>
              <tr>
                <th>ID Produto</th>
                <th>Nome</th>
                <th>Valor</th>
                <th>Quantidade em Estoque</th>
              </tr>
            </thead>
            <tbody>
              {produtosList.map((p, i) => (
                <tr key={i}>
                  <td>{p.id}</td>
                  <td>{p.nome}</td>
                  <td>{p.preco}</td>
                  <td>{p.estoque}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Produto;
