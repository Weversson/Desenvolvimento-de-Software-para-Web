"use client";
import { useState } from 'react';
import Link from 'next/link';
import './styles.css';  // Importe o arquivo CSS

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Requisição para cadastrar o usuário (exemplo de integração com API)
      const response = await fetch('https://67534e5ef3754fcea7bb6773.mockapi.io/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: email,
          senha: password,
        }),
      });

      const user = await response.json();

      if (user) {
        // Armazenar estado de cadastro no localStorage (opcional)
        localStorage.setItem('authenticated', 'true');
        alert('Cadastro realizado com sucesso!');
        window.location.href = '/login';  // Redireciona para a página de login
      } else {
        setError('Erro ao cadastrar. Tente novamente.');
      }
    } catch (err) {
      setError('Erro ao cadastrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2 className="title">Faça seu cadastro!</h2>

        {/* Ícone de usuário carregado diretamente da pasta public */}
        <center>
          <div className="icon-container">
            <img 
              src="/login/user.png" 
              alt="User Icon" 
              className="user-icon"
            />
          </div>
        </center>

        <form onSubmit={handleSubmit} className="form">
          {error && <p className="error-message">{error}</p>}

          <div className="input-group">
            <label htmlFor="email" className="label">Usuário</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="Digite seu usuário"
              required
            />
          </div>
          <br />
          <div className="input-group">
            <label htmlFor="password" className="label">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Digite sua senha"
              required
            />
          </div>
          <br />
          <div className="input-group">
            <label htmlFor="confirmPassword" className="label">Confirmar Senha</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input"
              placeholder="Confirme sua senha"
              required
            />
          </div>
          <br />
          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Carregando...' : 'Cadastrar'}
          </button>
        </form>

        <p className="login-link">
          Já tem uma conta?{' '}
          <Link href="/login" className="link">Faça login aqui</Link>
        </p>
      </div>
    </div>
  );
}
