"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Importação correta para roteamento

import './styles.css';  // Importando o arquivo de estilo

const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Estado para armazenar o valor da pesquisa
  const router = useRouter(); // Hook do roteador

  // Verifica se o usuário está autenticado ao carregar a página
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    setAuthenticated(isAuthenticated); // Atualiza o estado apenas uma vez
  }, []); // O array vazio faz com que isso seja executado apenas uma vez

  // Função para lidar com o logout
  const handleLogout = () => {
    localStorage.removeItem('authenticated'); // Remove o estado de autenticação
    setAuthenticated(false); // Atualiza o estado
    alert('Você saiu com sucesso!');
    window.location.reload(); // Recarrega a página para atualizar o estado da navbar
  };

  // Função para realizar a pesquisa e navegar para a página de resultados
  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      alert('Por favor, insira um termo de pesquisa.');
      return;
    }

    try {
      // Realiza a requisição à API de produtos com base no termo de pesquisa
      const response = await fetch(`https://67534e5ef3754fcea7bb6773.mockapi.io/produtos`);
      const data = await response.json();

      // Filtra os produtos com base no termo de pesquisa
      const filteredProducts = data.filter((product: { nome: string }) =>
        product.nome.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Se não houver produtos encontrados
      if (filteredProducts.length === 0) {
        alert('Nenhum produto encontrado.');
      } else {
        // Redireciona para a página de resultados
        router.push(`/resultados?search=${encodeURIComponent(searchQuery)}`); // Passa a pesquisa como parâmetro
      }
    } catch (error) {
      console.error('Erro ao realizar a pesquisa:', error);
      alert('Erro ao realizar a pesquisa. Tente novamente.');
    }
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}  // Atualiza o estado com o valor da pesquisa
        />
        <button className="search-button" onClick={handleSearch}>
          PESQUISAR
        </button>
      </div>  
    </nav>
  );
};

export default Navbar;
