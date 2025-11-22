import { useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../services/api';

export default function CadastroMedico() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    nome: '', email: '', senha: '', crm: '', especialidade: 'CLINICA_GERAL', telefone: '' 
  });

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/cadastro/medico', form);
      alert('Médico cadastrado com sucesso! Faça login.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar. Verifique os dados (CRM deve ser único).');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[600px]">
        <h2 className="text-2xl font-bold text-[#1f2b6c] mb-2 text-center">Cadastro de Profissional</h2>
        <p className="text-center text-gray-500 mb-6 text-sm">Junte-se à equipe MedBay</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="nome" placeholder="Nome Completo" onChange={handleChange} className="w-full p-3 border rounded outline-none focus:border-[#1f2b6c]" required />
          
          <div className="grid grid-cols-2 gap-4">
            <input name="email" type="email" placeholder="Email Profissional" onChange={handleChange} className="w-full p-3 border rounded outline-none focus:border-[#1f2b6c]" required />
            <input name="telefone" placeholder="Telefone" onChange={handleChange} className="w-full p-3 border rounded outline-none focus:border-[#1f2b6c]" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input name="crm" placeholder="CRM (ex: 12345-RJ)" onChange={handleChange} className="w-full p-3 border rounded outline-none focus:border-[#1f2b6c]" required />
            <select name="especialidade" onChange={handleChange} className="w-full p-3 border rounded outline-none focus:border-[#1f2b6c]" required>
                <option value="CLINICA_GERAL">Clínica Geral</option>
                <option value="CARDIOLOGIA">Cardiologia</option>
                <option value="DERMATOLOGIA">Dermatologia</option>
                <option value="PEDIATRIA">Pediatria</option>
                <option value="ORTOPEDIA">Ortopedia</option>
                <option value="NEUROLOGIA">Neurologia</option>
                <option value="GINECOLOGIA">Ginecologia</option>
            </select>
          </div>

          <input name="senha" type="password" placeholder="Senha" onChange={handleChange} className="w-full p-3 border rounded outline-none focus:border-[#1f2b6c]" required />
          
          <button type="submit" className="w-full bg-[#1f2b6c] text-white py-3 rounded font-bold hover:bg-[#159eec] transition mt-4">
            Cadastrar Médico
          </button>
        </form>
      </div>
    </div>
  );
}