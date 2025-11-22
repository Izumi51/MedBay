import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import api from '../services/api';

export default function Agendamento() {
  const { user, authenticated } = useContext(AuthContext);
  const navigate = useNavigate();  
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  // Estado do formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    data: '',
    hora: '',
    especialidade: '',
    medicoId: '',
    mensagem: ''
  });

  // Carregar médicos ao iniciar
  useEffect(() => {
    api.get('/medicos')
      .then(response => {
        setMedicos(response.data);
        setLoading(false);
      })
      .catch(error => console.error("Erro ao buscar médicos:", error));
  }, []);

  // Manipulação dos inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Envio do formulário
  const handleSubmit = async (e) => {
    if (!authenticated) {
        alert("Você precisa estar logado para agendar!");
        navigate('/login');
        return;
    }

    e.preventDefault();
    
    // Montagem do objeto para a API (AgendamentoRequestDTO)
    const payload = {
      pacienteId: user.id,
      medicoId: formData.medicoId,
      dataHora: `${formData.data}T${formData.hora}:00`, // Formato ISO: 2025-11-20T14:30:00
      tipoConsulta: "PRESENCIAL" // Default conforme regra de negócio básica
    };

    try {
      await api.post('/consultas', payload);
      setMensagemSucesso('Agendamento realizado com sucesso! Verifique seu e-mail.');
      // Reset form opcional
    } catch (error) {
      alert('Erro ao agendar: ' + (error.response?.data?.message || error.message));
    }
  };

  // Filtro dinâmico de médicos baseado na especialidade selecionada
  const medicosFiltrados = formData.especialidade 
    ? medicos.filter(m => m.especialidade === formData.especialidade)
    : medicos;

  // Lista única de especialidades para o dropdown
  const especialidades = [...new Set(medicos.map(m => m.especialidade))];

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header da Página (Banner) */}
      <div className="bg-[#bfdbfe]/30 h-64 flex items-center relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-20 z-10">
          <p className="text-[#1f2b6c] font-medium">Início / Agendamento</p>
          <h1 className="text-5xl font-bold text-[#1f2b6c] mt-2">Faça um Agendamento</h1>
        </div>
        {/* Círculos decorativos de fundo simulam o design */}
        <div className="absolute right-0 top-0 bg-[#bfdbfe]/50 w-96 h-96 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-20 mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Lado Esquerdo: Formulário */}
        <div>
          <h2 className="text-3xl font-bold text-[#1f2b6c] mb-4">Faça um Agendamento</h2>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. 
            Convallis felis vitae tortor augue.
          </p>

          {mensagemSucesso ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {mensagemSucesso}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <input 
                  type="text" name="nome" placeholder="Nome" required
                  className="w-full bg-[#1f2b6c] text-white placeholder-gray-300 p-3 rounded border border-transparent focus:border-[#159eec] outline-none"
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-1">
                <select 
                  name="sexo" 
                  className="w-full bg-[#1f2b6c] text-white p-3 rounded border border-transparent focus:border-[#159eec] outline-none appearance-none"
                >
                  <option value="">Sexo</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
              </div>

              <div className="col-span-1">
                <input 
                  type="email" name="email" placeholder="Email" required
                  className="w-full bg-[#1f2b6c] text-white placeholder-gray-300 p-3 rounded border border-transparent focus:border-[#159eec] outline-none"
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-1">
                <input 
                  type="tel" name="telefone" placeholder="Telefone"
                  className="w-full bg-[#1f2b6c] text-white placeholder-gray-300 p-3 rounded border border-transparent focus:border-[#159eec] outline-none"
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-1">
                <input 
                  type="date" name="data" required
                  className="w-full bg-[#1f2b6c] text-white placeholder-gray-300 p-3 rounded border border-transparent focus:border-[#159eec] outline-none"
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-1">
                <input 
                  type="time" name="hora" required
                  className="w-full bg-[#1f2b6c] text-white placeholder-gray-300 p-3 rounded border border-transparent focus:border-[#159eec] outline-none"
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-1">
                <select 
                  name="especialidade" 
                  className="w-full bg-[#1f2b6c] text-white p-3 rounded border border-transparent focus:border-[#159eec] outline-none"
                  onChange={handleChange}
                >
                  <option value="">Especialidade</option>
                  {especialidades.map(esp => (
                    <option key={esp} value={esp}>{esp}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-1">
                <select 
                  name="medicoId" required
                  className="w-full bg-[#1f2b6c] text-white p-3 rounded border border-transparent focus:border-[#159eec] outline-none"
                  onChange={handleChange}
                >
                  <option value="">Médico</option>
                  {loading ? <option>Carregando...</option> : 
                    medicosFiltrados.map(medico => (
                      <option key={medico.id} value={medico.id}>{medico.nome}</option>
                    ))
                  }
                </select>
              </div>

              <div className="col-span-2">
                <textarea 
                  name="mensagem" placeholder="Escrever mensagem" rows="4"
                  className="w-full bg-[#1f2b6c] text-white placeholder-gray-300 p-3 rounded border border-transparent focus:border-[#159eec] outline-none"
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-span-2 mt-2">
                <button 
                  type="submit"
                  className="w-full bg-[#bfdbfe] text-[#1f2b6c] font-bold py-4 rounded hover:bg-white transition duration-300"
                >
                  ENVIAR
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Lado Direito: Card Informativo (Azul Escuro) */}
        <div className="bg-[#1f2b6c] text-white rounded-lg p-10 h-fit">
          <h3 className="text-3xl font-serif mb-8">Horários</h3>
          
          <div className="space-y-4 text-sm">
            <div className="flex justify-between border-b border-gray-600 pb-2">
              <span>Segunda</span>
              <span>—</span>
              <span>08:00 - 20:00</span>
            </div>
            <div className="flex justify-between border-b border-gray-600 pb-2">
              <span>Terça</span>
              <span>—</span>
              <span>08:00 - 20:00</span>
            </div>
            <div className="flex justify-between border-b border-gray-600 pb-2">
              <span>Quarta</span>
              <span>—</span>
              <span>08:00 - 20:00</span>
            </div>
            <div className="flex justify-between border-b border-gray-600 pb-2">
              <span>Quinta</span>
              <span>—</span>
              <span>08:00 - 20:00</span>
            </div>
            <div className="flex justify-between border-b border-gray-600 pb-2">
              <span>Sexta</span>
              <span>—</span>
              <span>08:00 - 20:00</span>
            </div>
            <div className="flex justify-between border-b border-gray-600 pb-2">
              <span>Sábado</span>
              <span>—</span>
              <span>08:00 - 20:00</span>
            </div>
            <div className="flex justify-between pb-2">
              <span>Domingo</span>
              <span>—</span>
              <span>FECHADO</span>
            </div>
          </div>

          <div className="mt-12 flex items-center gap-4">
            {/* <Phone size={40} className="text-[#bfdbfe]" /> */}
            <div>
              <p className="font-bold text-xl uppercase">Emergência</p>
              <p className="text-[#bfdbfe] text-lg">(237) 681-812-255</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}