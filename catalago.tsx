import React from "react";
import { v4 as uuidv4 } from "uuid";
import { produtos } from "./listaProdutos";
import { CartaoProduto } from "./cartaoProdutos";


export default function Catalago():JSX.Element {

    return(

        <ul>
            {produtos.map((produto) =>(
                <li key={uuidv4()}>
                    <CartaoProduto
                        nomeProduto={produto.nomeProduto}
                        preco={produto.preco}
                        imagem={produto.imagem}
                    
                    />

                </li>


            ))}
        </ul>

    );



}