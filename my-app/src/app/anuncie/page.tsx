"use client";
import React, { useState } from "react";
import "./styles.css";

const EnviarProduto = () => {
  const [form, setForm] = useState({
    nome: "",
    preco: "",
    data: new Date().toISOString().split("T")[0],
    estado: "",
    cidade: "",
  });

  const estados = [
    "Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahia",
    "Ceará",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados enviados:", form);
    // Aqui você pode enviar os dados para o backend ou API
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Cadastro de Produto</h2>

        {/* Nome do Produto */}
        <div className="input-group">
          <label htmlFor="nome" className="label">
            Nome do Produto:
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Digite o nome do produto"
            className="input"
          />
        </div>

        {/* Preço */}
        <div className="input-group">
          <label htmlFor="preco" className="label">
            Preço (R$):
          </label>
          <input
            type="number"
            id="preco"
            name="preco"
            value={form.preco}
            onChange={handleChange}
            placeholder="Digite o preço"
            className="input"
          />
        </div>

        {/* Data */}
        <div className="input-group">
          <label htmlFor="data" className="label">
            Data:
          </label>
          <input
            type="date"
            id="data"
            name="data"
            value={form.data}
            onChange={handleChange}
            className="input"
          />
        </div>

        {/* Estado */}
        <div className="input-group">
          <label htmlFor="estado" className="label">
            Estado:
          </label>
          <select
            id="estado"
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="input"
          >
            <option value="">Selecione o estado</option>
            {estados.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </div>

        {/* Cidade */}
        <div className="input-group">
          <label htmlFor="cidade" className="label">
            Cidade:
          </label>
          <input
            type="text"
            id="cidade"
            name="cidade"
            value={form.cidade}
            onChange={handleChange}
            placeholder="Digite a cidade"
            className="input"
          />
        </div>

        <button type="submit" className="submit-button">
          Enviar
        </button>
      </form>
      
    </div>
  );
};

export default EnviarProduto;
