type ProdutoProps = {
    nomeProduto: string;
    preco: number;
    imagem: string;
};
export function CartaoProduto({nomeProduto,preco,imagem}:ProdutoProps): JSX.Element
{
    return(
        <div className="produto-card">
            <ul>
                <li>
                    <img src={imagem} alt={`Imagem de ${nomeProduto}`} className="produto-imagem" />
                    <h2 className="produto-nome">{nomeProduto}</h2>
                    <span className="produto-preco">{preco.toFixed(2)}</span>

                </li>
            </ul>
        </div>


    );



}