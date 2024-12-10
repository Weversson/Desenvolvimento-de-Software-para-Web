"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Resultados = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Verifica se o roteador está pronto
    if (router.isReady) {
      const { search } = router.query;
      if (search) {
        setSearchTerm(search as string); // Atribui o valor do parâmetro search
      } else {
        router.push('/'); // Redireciona para a página inicial se não houver o parâmetro 'search'
      }
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm) {
        setLoading(true);  // Inicia o carregamento
        console.log("Iniciando busca por:", searchTerm);

        try {
          // Realiza a requisição GET para a API
          const response = await fetch('https://67534e5ef3754fcea7bb6773.mockapi.io/produtos');
          const data = await response.json();

          // Filtra os produtos que coincidem com o termo de pesquisa
          const filteredProducts = data.filter((product: { nome: string }) =>
            product.nome.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setProducts(filteredProducts);  // Atualiza o estado com os produtos filtrados

          // Dividindo os dados para categorias
          const categorias = Array.from(new Set(filteredProducts.map((produto) => produto.estado)));
          setCategorias(categorias);  // Atualiza o estado com as categorias

        } catch (error) {
          console.error('Erro ao buscar os dados:', error);
        } finally {
          setLoading(false); // Finaliza o carregamento
        }
      }
    };

    fetchData();
  }, [searchTerm]);

  if (loading) {
    return <div className="text-center text-xl text-gray-500">Carregando...</div>;  // Exibe "Carregando..." enquanto os dados estão sendo carregados
  }

  return (
    <div>
      <h1>Resultados da Pesquisa: {searchTerm}</h1>
      {products.length === 0 ? (
        <p>Nenhum produto encontrado.</p>  // Caso não encontre nenhum produto
      ) : (
        <>
          <h2>Categorias:</h2>
          <ul>
            {categorias.map((categoria, index) => (
              <li key={index}>{categoria}</li>  // Exibe as categorias
            ))}
          </ul>

          <ul>
            {products.map((product: any) => (
              <li key={product.id}>
                <h2>Produto: {product.nome}</h2>
                <p>ID: {product.id}</p>
                <p>Descrição: {product.descricao || 'Sem descrição disponível'}</p>
                <p>Preço: R${product.preco}</p>
              </li>  // Exibe as informações do produto encontrado
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Resultados;
