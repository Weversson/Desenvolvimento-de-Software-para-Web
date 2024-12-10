"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import "./styles.css";

interface Produto {
  id: string;
  nome: string;
  preco: number;
  descricao: string;
  estado: string;
  cidade: string;
  variacao: number;
  vendido: boolean;
}

export default function Checkout() {
  const [produto, setProduto] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(true);
  const [nomeComprador, setNomeComprador] = useState("");
  const [enderecoComprador, setEnderecoComprador] = useState("");
  const [metodoPagamento, setMetodoPagamento] = useState<string>("cartao");
  const [numeroCartao, setNumeroCartao] = useState("");
  const [dataVencimento, setDataVencimento] = useState("");
  const [codigoSeguranca, setCodigoSeguranca] = useState("");
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchProduto = async () => {
        try {
          const response = await fetch(`https://67534e5ef3754fcea7bb6773.mockapi.io/produtos/${id}`);
          const data = await response.json();
          setProduto(data);
        } catch (error) {
          console.error("Erro ao buscar o produto:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduto();
    }
  }, [id]);

  const handleCompra = async () => {
    try {
      const response = await fetch(`https://67534e5ef3754fcea7bb6773.mockapi.io/produtos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert(`Compra realizada com sucesso!\nNome: ${nomeComprador}\nEndereço: ${enderecoComprador}\nMétodo de pagamento: ${metodoPagamento}`);
        router.push('/');
      } else {
        alert("Erro ao realizar a compra. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao realizar a compra:", error);
      alert("Erro ao realizar a compra. Tente novamente.");
    }
  };

  if (loading) {
    return <div className="text-center text-xl text-gray-500">Carregando...</div>;
  }

  if (!produto) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <h2 className="text-2xl font-bold mb-4">{produto.nome}</h2>
        <p className="text-gray-500 mb-4">Estado: {produto.estado}</p>
        <p className="text-gray-500 mb-4">Cidade: {produto.cidade}</p>
        <p className="text-xl font-bold text-green-600 mb-4">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)}
        </p>
        <p className="text-gray-600 mb-4">{produto.descricao}</p>

        {/* Formulário para inserir dados do comprador */}
        <div className="mb-4">
          <label htmlFor="nomeComprador" className="block text-sm font-medium text-gray-700">
            Nome do Comprador
          </label>
          <input
            type="text"
            id="nomeComprador"
            value={nomeComprador}
            onChange={(e) => setNomeComprador(e.target.value)}
            placeholder="Digite seu nome"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="enderecoComprador" className="block text-sm font-medium text-gray-700">
            Endereço de Entrega
          </label>
          <input
            type="text"
            id="enderecoComprador"
            value={enderecoComprador}
            onChange={(e) => setEnderecoComprador(e.target.value)}
            placeholder="Digite seu endereço"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Escolha do método de pagamento */}
        <div className="mb-4">
          <label htmlFor="metodoPagamento" className="block text-sm font-medium text-gray-700">
            Método de Pagamento
          </label>
          <select
            id="metodoPagamento"
            value={metodoPagamento}
            onChange={(e) => setMetodoPagamento(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          >
            <option value="cartao">Cartão de Crédito</option>
            <option value="pix">PIX</option>
            <option value="boleto">Boleto Bancário</option>
          </select>
        </div>

        {/* Formulário de pagamento com base no método escolhido */}
        {metodoPagamento === "cartao" && (
          <div>
            <div className="mb-4">
              <label htmlFor="numeroCartao" className="block text-sm font-medium text-gray-700">
                Número do Cartão
              </label>
              <input
                type="text"
                id="numeroCartao"
                value={numeroCartao}
                onChange={(e) => setNumeroCartao(e.target.value)}
                placeholder="Número do Cartão"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="dataVencimento" className="block text-sm font-medium text-gray-700">
                Data de Vencimento
              </label>
              <input
                type="text"
                id="dataVencimento"
                value={dataVencimento}
                onChange={(e) => setDataVencimento(e.target.value)}
                placeholder="MM/AAAA"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="codigoSeguranca" className="block text-sm font-medium text-gray-700">
                Código de Segurança
              </label>
              <input
                type="text"
                id="codigoSeguranca"
                value={codigoSeguranca}
                onChange={(e) => setCodigoSeguranca(e.target.value)}
                placeholder="Código de Segurança"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
        )}

        {metodoPagamento === "pix" && (
          <div className="text-gray-600">
            <p>Para pagar via PIX, você receberá os dados na próxima tela após a confirmação da compra.</p>
          </div>
        )}

        {metodoPagamento === "boleto" && (
          <div className="text-gray-600">
            <p>Você receberá um boleto bancário para pagamento após a confirmação da compra.</p>
          </div>
        )}

        {/* Botões de ação */}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md mr-4"
          onClick={handleCompra}
        >
          Finalizar Compra
        </button>

        <button
          className="bg-gray-500 text-white py-2 px-4 rounded-md"
          onClick={() => router.push('/')}
        >
          Retornar às Ofertas
        </button>
      </div>
    </div>
  );
}
