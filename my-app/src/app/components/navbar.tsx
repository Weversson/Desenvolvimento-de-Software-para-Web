"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import './styles.css';  // Importando o arquivo de estilo

const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(false);

  // Verifica se o usuário está autenticado ao carregar a página
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    setAuthenticated(isAuthenticated);
  }, []);

  // Função para lidar com o logout
  const handleLogout = () => {
    localStorage.removeItem('authenticated');  // Remove o estado de autenticação
    setAuthenticated(false);
    alert('Você saiu com sucesso!');
    window.location.reload(); // Recarrega a página para atualizar o estado da navbar
  };

  return (
    <nav className="navbar">
      {/* Logo e Links */}
      <div className="logo">
        <Image src="/logo.png" alt="Logo DescomplicAAgro" width={40} height={40} />
        <span className="logo-text">DescomplicAAgro</span>
      </div>
      <div className="action-buttons">
        <Link href="/" passHref>  
          <button className="action-button">HOME</button>
        </Link>
        {/* Condicional para exibir o botão "Entrar" ou "Sair" */}
        {authenticated ? (
          <button className="action-button" onClick={handleLogout}>
            SAIR
          </button>
        ) : (
          <Link href="/login" passHref>
            <button className="action-button">ENTRAR</button>
          </Link>
        )}
        <Link href="/anuncie" passHref>
          <button className="search-button">ANUNCIE!</button>
        </Link>
      </div>
      {/* Barra de Pesquisa e Filtros */}
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="PESQUISE"
          aria-label="Pesquisa"
        />
        <input
          type="text"
          className="search-input"
          placeholder="FILTROS"
          aria-label="Filtros"
        />
        <button className="search-button">PESQUISAR</button>
      </div>
    </nav>
  );
};

export default Navbar;
