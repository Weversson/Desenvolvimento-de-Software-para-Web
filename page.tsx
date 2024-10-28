import Navbar from './components/navbar';
import OfferCard from './components/offercard';
import data from './data.json'; // Importando o arquivo JSON

export default function Home() {
  const { categorias, produtos } = data; // Desestruturando os dados do JSON

  return (
    <div className="container mx-auto px-4">
      <Navbar />
      {/* Barra de Pesquisa */}
      <div className="search-bar flex space-x-2 mb-4">
        <input
          type="text"
          className="search-input flex-1 border rounded px-2 py-1"
          placeholder="PESQUISE"
          aria-label="Pesquisa"
        />
        <input
          type="text"
          className="search-input flex-1 border rounded px-2 py-1"
          placeholder="FILTROS"
          aria-label="Filtros"
        />
        <button className="search-button px-4 py-1">PESQUISAR</button>
      </div>

      {/* Menu de Categorias */}
      <nav className="categories mb-4 grid grid-cols-5 gap-2">
        {categorias.map((categoria) => (
          <button key={categoria} className="category-button w-full">
            {categoria}
          </button>
        ))}
      </nav>

      {/* Ofertas */}
      <section className="offers mb-4">
        <h2 className="text-xl font-bold">OFERTAS:</h2>
        <div className="offer-grid grid grid-cols-2 md:grid-cols-4 gap-4">
          {produtos.map((produto) => (
            <OfferCard 
              key={produto.nome} 
              produto={produto.nome} 
              preco={produto.preco} // Passando o preço
              estado={produto.estado} // Passando o estado do produto
            />
          ))}
        </div>
      </section>

      {/* Tabela de Preços */}
      <section className="price-table">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">PRODUTO</th>
              <th className="border border-gray-300 px-4 py-2">DATA</th>
              <th className="border border-gray-300 px-4 py-2">PREÇO</th>
              <th className="border border-gray-300 px-4 py-2">VARIAÇÃO</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((item) => (
              <tr key={item.nome}>
                <td className="border border-gray-300 px-4 py-2">{item.nome}</td>
                <td className="border border-gray-300 px-4 py-2">{item.data}</td>
                <td className="border border-gray-300 px-4 py-2">{item.preco}</td>
                <td className="border border-gray-300 px-4 py-2">{item.variacao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
