// src/app/page.tsx

"use client";
import { useState, useEffect } from "react";
import OfferCard from "./components/offercard"; // Ajuste o caminho conforme necessário

// Definir o tipo para os produtos
interface Produto {
  id: string;
  nome: string;
  preco: number;
  estado: string;
  cidade: string;
  variacao: number;
  vendido: boolean;
}

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="text-2xl font-bold my-4">{title}</h2>
);

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://67534e5ef3754fcea7bb6773.mockapi.io/produtos"
        );
        const data: Produto[] = await response.json();

        setProdutos(data);

        // Criar lista de categorias únicas
        const categorias = Array.from(new Set(data.map((produto) => produto.estado)));
        setCategorias(categorias);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center text-xl text-gray-500">Carregando...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="categories">
        {categorias.map((categoria) => (
          <button key={categoria} className="category-button">
            {categoria}
          </button>
        ))}
      </div>

      <section className="offers">
        <SectionTitle title="OFERTAS DISPONÍVEIS" />
        <div className="offer-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtos.map((produto) => (
            <OfferCard
              key={produto.id}
              id={produto.id}
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

      <section className="price-table">
        <SectionTitle title="BOOK DE OFERTAS" />
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
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
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
