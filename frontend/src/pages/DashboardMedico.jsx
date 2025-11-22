import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { Calendar, User, FileText, Pill, CheckCircle, X } from 'lucide-react';

export default function DashboardMedico() {
  const { user } = useContext(AuthContext);
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para Modais
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);
  const [modalAberto, setModalAberto] = useState(null); // 'HISTORICO' ou 'RECEITA'

  // Estados dos Formulários
  const [diagnostico, setDiagnostico] = useState('');
  const [receitaData, setReceitaData] = useState({ medicamentos: '', dosagem: '', instrucoes: '' });

  useEffect(() => {
    if (user?.id) {
      api.get(`/consultas/medico/${user.id}`)
        .then(res => {
            setConsultas(res.data);
            setLoading(false);
        })
        .catch(err => console.error("Erro ao carregar agenda:", err));
    }
  }, [user]);

  const handleOpenModal = (consulta, tipo) => {
    setConsultaSelecionada(consulta);
    setModalAberto(tipo);
    // Limpa forms
    setDiagnostico('');
    setReceitaData({ medicamentos: '', dosagem: '', instrucoes: '' });
  };

  const submitHistorico = async (e) => {
    e.preventDefault();
    try {
        await api.post(`/consultas/${consultaSelecionada.id}/historico`, { diagnostico });
        alert('Histórico registrado com sucesso!');
        setModalAberto(null);
    } catch (error) {
        alert('Erro ao registrar histórico.');
    }
  };

  const submitReceita = async (e) => {
    e.preventDefault();
    try {
        await api.post(`/consultas/${consultaSelecionada.id}/receita`, receitaData);
        alert('Receita emitida com sucesso!');
        setModalAberto(null);
    } catch (error) {
        alert('Erro ao emitir receita.');
    }
  };

  if (loading) return <div className="p-20 text-center">Carregando agenda...</div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#1f2b6c] text-white py-12">
        <div className="container mx-auto px-4 lg:px-20">
          <h1 className="text-3xl font-bold">Painel do Médico</h1>
          <p className="text-blue-200 mt-2">Bem-vindo, Dr(a). {user?.nome}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-20 mt-10">
        <h2 className="text-2xl font-bold text-[#1f2b6c] mb-6 flex items-center gap-2">
          <Calendar /> Agenda de Consultas
        </h2>

        <div className="grid gap-6">
          {consultas.map((consulta) => (
            <div key={consulta.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full text-[#1f2b6c]">
                    <User size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-[#1f2b6c]">{consulta.pacienteNome}</h3>
                    <p className="text-sm text-gray-500">
                        {new Date(consulta.dataHora).toLocaleString('pt-BR')} • {consulta.tipo}
                    </p>
                    <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                        {consulta.status}
                    </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                    onClick={() => handleOpenModal(consulta, 'HISTORICO')}
                    className="flex items-center gap-2 px-4 py-2 border border-[#1f2b6c] text-[#1f2b6c] rounded hover:bg-blue-50 transition"
                >
                    <FileText size={18} /> Histórico
                </button>
                <button 
                    onClick={() => handleOpenModal(consulta, 'RECEITA')}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1f2b6c] text-white rounded hover:bg-[#159eec] transition"
                >
                    <Pill size={18} /> Prescrever
                </button>
              </div>
            </div>
          ))}
          {consultas.length === 0 && <p className="text-gray-500">Nenhuma consulta agendada.</p>}
        </div>
      </div>

      {/* MODAL DE HISTÓRICO */}
      {modalAberto === 'HISTORICO' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-lg rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-[#1f2b6c]">Registrar Histórico</h3>
                    <button onClick={() => setModalAberto(null)}><X /></button>
                </div>
                <form onSubmit={submitHistorico}>
                    <label className="block text-sm font-bold mb-2 text-gray-700">Diagnóstico e Observações</label>
                    <textarea 
                        className="w-full border p-3 rounded h-40 outline-none focus:border-[#159eec]"
                        placeholder="Descreva o diagnóstico clínico..."
                        value={diagnostico}
                        onChange={(e) => setDiagnostico(e.target.value)}
                        required
                    />
                    <button className="w-full mt-4 bg-[#1f2b6c] text-white py-3 rounded font-bold hover:bg-[#159eec]">
                        Salvar Histórico
                    </button>
                </form>
            </div>
        </div>
      )}

      {/* MODAL DE RECEITA */}
      {modalAberto === 'RECEITA' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-lg rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-[#1f2b6c]">Emitir Receita</h3>
                    <button onClick={() => setModalAberto(null)}><X /></button>
                </div>
                <form onSubmit={submitReceita} className="space-y-3">
                    <div>
                        <label className="block text-sm font-bold mb-1 text-gray-700">Medicamentos</label>
                        <textarea 
                            className="w-full border p-2 rounded outline-none focus:border-[#159eec]"
                            placeholder="Ex: Amoxicilina 500mg"
                            value={receitaData.medicamentos}
                            onChange={(e) => setReceitaData({...receitaData, medicamentos: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1 text-gray-700">Dosagem</label>
                        <input 
                            className="w-full border p-2 rounded outline-none focus:border-[#159eec]"
                            placeholder="Ex: 1 comprimido a cada 8 horas"
                            value={receitaData.dosagem}
                            onChange={(e) => setReceitaData({...receitaData, dosagem: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1 text-gray-700">Instruções Adicionais</label>
                        <textarea 
                            className="w-full border p-2 rounded outline-none focus:border-[#159eec]"
                            placeholder="Ex: Tomar após as refeições"
                            value={receitaData.instrucoes}
                            onChange={(e) => setReceitaData({...receitaData, instrucoes: e.target.value})}
                        />
                    </div>
                    <button className="w-full mt-4 bg-[#1f2b6c] text-white py-3 rounded font-bold hover:bg-[#159eec]">
                        Emitir Receita Digital
                    </button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
}