import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="sidebar">
      <nav className="menu">
        <ul>
          <li
            onClick={() => navigate('/cliente')}
            className={location.pathname === '/cliente' ? 'active' : ''}
          >
            Clientes
          </li>
          <li
            onClick={() => navigate('/produto')}
            className={location.pathname === '/produto' ? 'active' : ''}
          >
            Produtos
          </li>
          <li
            onClick={() => navigate('/pedido')}
            className={location.pathname === '/pedido' ? 'active' : ''}
          >
            Pedidos
          </li>
          <li
            onClick={() => navigate('/login')}
            className={location.pathname === '/login' ? 'active' : ''}
          >
            Log out
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
