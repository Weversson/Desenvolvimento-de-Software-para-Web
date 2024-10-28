import Image from 'next/image';

const OfferCard = ({ produto, preco, estado }) => {
  return (
    <div className="offer-card border p-4 rounded shadow">
      <div className="offer-image" aria-label={`Imagem do produto ${produto}`}>
        <Image
          src={`/imagens/${produto.toLowerCase()}.png`} // Ajuste para o nome correto da imagem
          alt={`Imagem do produto ${produto}`}
          width={200}
          height={200}
        />
      </div>
      <div className="offer-location">{estado}</div> {/* Exibindo o estado aqui */}
      <div className="offer-price">{preco}</div> {/* Exibindo o preço aqui */}
    </div>
  );
};

export default OfferCard;
