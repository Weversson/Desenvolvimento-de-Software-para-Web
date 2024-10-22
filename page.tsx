import Image from "next/image";

// Componente para o cartão de oferta
const OfferCard = ({ produto }) => {
  return (
    <div className="offer-card">
      <div className="offer-image" aria-label={`Imagem do produto ${produto}`}>
        FOTO {produto}
      </div>
      <div className="offer-location">PALMAS-TO</div>
      <div className="offer-price">R$ 00,00</div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      {/* Header com Logo, Anuncie e Login */}
      <header className="flex justify-between items-center py-4">
        <div className="logo text-xl font-bold">LOGO</div>
        <div className="actions space-x-4">
          <button className="action-button">ANUNCIE</button>
          <button className="action-button">LOGIN</button>
        </div>
      </header>

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
      <nav className="categories mb-4 flex space-x-2">
        {["SOJA", "ARROZ", "FEIJÃO", "MILHO", "SORGO"].map((categoria) => (
          <button key={categoria} className="category-button">
            {categoria}
          </button>
        ))}
      </nav>

      {/* Ofertas */}
      <section className="offers mb-4">
        <h2 className="text-xl font-bold">OFERTAS:</h2>
        <div className="offer-grid grid grid-cols-2 md:grid-cols-4 gap-4">
          {["MILHO", "FEIJÃO", "ARROZ", "SOJA"].map((produto) => (
            <OfferCard key={produto} produto={produto} />
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
            {[
              { produto: "SOJA", data: "02/09/2024", preco: "R$ 136,90/SACA", variacao: "0.18%" },
              { produto: "MILHO", data: "02/09/2024", preco: "R$ 68,70/SACA", variacao: "0.18%" },
              { produto: "ARROZ", data: "02/09/2024", preco: "R$ 151,17/SACA", variacao: "0.20%" },
              { produto: "FEIJÃO", data: "02/09/2024", preco: "R$ 161,23/SACA", variacao: "-14.08%" },
            ].map((item) => (
              <tr key={item.produto}>
                <td className="border border-gray-300 px-4 py-2">{item.produto}</td>
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
