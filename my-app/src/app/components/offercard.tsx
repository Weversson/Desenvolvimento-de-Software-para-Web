import Image from 'next/image';

const OfferCard = ({ produto, preco, estado, cidade, variacao, vendido }) => {
  // Formatar preço como moeda
  const formattedPreco = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(preco);

  // Formatar variação como porcentagem
  const formattedVariacao = `${variacao.toFixed(2)}%`;

  return (
    <div className="offer-card border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="offer-image mb-4 text-center" aria-label={`Imagem do produto ${produto}`}>
        <Image
          src={`/imagens/${produto.toLowerCase()}.png`} // A imagem será buscada no diretório de imagens com o nome do produto em minúsculas
          alt={`Imagem do produto ${produto}`}
          width={200}
          height={200}
          className="object-cover rounded-lg"
        />
      </div>

      <div className="offer-info text-center">
        <h3 className="text-xl font-semibold mb-2">{produto}</h3>
        <p className="text-gray-500 mb-2">Estado: {estado}</p>
        <p className="text-gray-500 mb-2">Cidade: {cidade}</p>
        <p className="text-xl font-bold text-green-600 mb-2">{formattedPreco}</p>
        <p className={`text-sm ${variacao < 0 ? 'text-red-500' : 'text-green-500'} mb-2`}>
          Variação: {formattedVariacao}
        </p>
        <p className={`text-sm ${vendido ? 'text-green-500' : 'text-red-500'}`}>
          {vendido ? 'Vendido' : 'Disponível'}
        </p>
      </div>
    </div>
  );
};

export default OfferCard;
