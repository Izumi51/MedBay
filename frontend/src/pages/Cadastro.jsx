import { useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../services/api';

export default function Cadastro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: '', email: '', cpf: '', senha: '', dataNascimento: '' });

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/cadastro', form);
      alert('Cadastro realizado! Faça login.');
      navigate('/login');
    } catch (error) {
      alert('Erro ao cadastrar. Verifique os dados.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-2xl font-bold text-[#1f2b6c] mb-6 text-center">Criar Conta</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="nome" placeholder="Nome Completo" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" required />
          <div className="grid grid-cols-2 gap-4">
            <input name="cpf" placeholder="CPF" onChange={handleChange} className="w-full p-2 border rounded" required />
            <input name="dataNascimento" type="date" onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <input name="senha" type="password" placeholder="Senha" onChange={handleChange} className="w-full p-2 border rounded" required />
          
          <button type="submit" className="w-full bg-[#1f2b6c] text-white py-2 rounded hover:bg-[#159eec] transition">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}