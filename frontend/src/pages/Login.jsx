import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sucesso = await login(email, senha);
    if (sucesso) {
      navigate('/minhas-consultas');
    } else {
      alert('Email ou senha inválidos');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-[#1f2b6c] mb-6 text-center">Login MedBay</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input 
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:border-[#159eec]"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Senha</label>
            <input 
              type="password" value={senha} onChange={e => setSenha(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:border-[#159eec]"
            />
          </div>
          <button type="submit" className="w-full bg-[#1f2b6c] text-white py-2 rounded hover:bg-[#159eec] transition">
            Entrar
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Não tem conta? <Link to="/cadastro" className="text-[#159eec] font-bold">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}