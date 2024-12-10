  "use client";
  import { useState } from 'react';
  import Link from 'next/link';
  import './styles.css';  // Importe o arquivo CSS

  export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!email || !password) {
        setError('Por favor, preencha todos os campos.');
        return;
      }

      setLoading(true);
      setError('');

      try {
        // Requisição para a API de login
        const response = await fetch('https://67534e5ef3754fcea7bb6773.mockapi.io/usuarios');
        const usuarios = await response.json();

        // Verifique se o usuário existe com as credenciais fornecidas
        const user = usuarios.find(
          (user: { usuario: string; senha: string }) =>
            user.usuario === email && user.senha === password
        );

        if (user) {
          // Armazenar estado de login no localStorage
          localStorage.setItem('authenticated', 'true');
          alert('Login realizado com sucesso!');
          window.location.href = '/';  // Redireciona para a página inicial (home)
        } else {
          setError('Credenciais inválidas.');
        }        
      } catch (err) {
        setError('Erro ao autenticar. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="login-container">
        <div className="login-form">
          <h1 className="login-title">Entre no sistema!</h1>

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

          <form onSubmit={handleSubmit}>
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
            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'Entrar'}
            </button>
          </form>

          <p className="register-link">
            Não tem uma conta?{' '}
            <Link href="/cadastro" className="link">Cadastre-se aqui</Link>
          </p>
        </div>
      </div>
    );
  }
