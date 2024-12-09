  "use client";
  import { useState, useEffect } from 'react';
  import OfferCard from './components/offercard'; // Ajuste o caminho conforme necessário


  // Componente para título reutilizável
  const SectionTitle = ({ title }) => (
    <h2>{title}</h2>
  );

  export default function Home() {
    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carregamento

    useEffect(() => {
      // Função para obter dados da API
      const fetchData = async () => {
        try {
          const response = await fetch('https://67534e5ef3754fcea7bb6773.mockapi.io/produtos');
          const data = await response.json();

          // Dividindo os dados para categorias e produtos
          setProdutos(data);
          const categorias = Array.from(new Set(data.map((produto) => produto.estado)));
          setCategorias(categorias);
        } catch (error) {
          console.error('Erro ao buscar os dados:', error);
        } finally {
          setLoading(false); // Define o estado como carregado
        }
      };

      fetchData();
    }, []);

    if (loading) {
      return <div className="text-center text-xl text-gray-500">Carregando...</div>; // Exibe um texto enquanto os dados estão sendo carregados
    }

    return (
      <div className="container mx-auto px-6 py-8">
        <br></br>
        {/* Menu de Categorias */}
        <div className="categories">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              className="category-button"
            >
              {categoria}
            </button>
          ))}
        </div>

        {/* Ofertas */}
        <section className="offers">
          <SectionTitle title="OFERTAS DISPONÍVEIS" />
          <div className="offer-grid">
            {produtos.map((produto) => (
              <OfferCard
                key={produto.id}
                produto={produto.nome}
                preco={produto.preco}
                estado={produto.estado}
                cidade={produto.cidade}
                variacao={produto.variacao}
                vendido={produto.vendido}
              />
            ))}
          </div>
        </section>

        {/* Tabela de Preços */}
        <section className="price-table">
          <SectionTitle title="TABELA DE PREÇOS" />
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>PRODUTO</th>
                  <th>CIDADE</th>
                  <th>PREÇO</th>
                  <th>VARIAÇÃO</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nome}</td>
                    <td>{item.cidade}</td>
                    <td>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(item.preco)}
                    </td>
                    <td>{item.variacao}%</td>
                    <td>
                      {item.vendido ? (
                        <span className="sold">Vendido</span>
                      ) : (
                        <span className="available">Disponível</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  }
