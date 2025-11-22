import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { Calendar, Clock, Edit, Trash2, CheckSquare, User, Filter } from 'lucide-react';

export default function Recepcao() {
  const { user } = useContext(AuthContext);
  const [consultas, setConsultas] = useState([]);
  const [dataFiltro, setDataFiltro] = useState(new Date().toISOString().split('T')[0]); // Hoje
  const [loading, setLoading] = useState(true);

  // Carrega consultas
  useEffect(() => {
    fetchConsultas();
  }, [dataFiltro]);

  const fetchConsultas = () => {
    setLoading(true);
    // A rota GET /consultas sem ID específico deve cair no listarTodasConsultas (UC9)
    api.get(`/consultas?data=${dataFiltro}`)
      .then(res => {
        setConsultas(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  // Ação: Confirmar Presença (Check-in)
  const handleConfirmar = async (id) => {
    try {
      // Podemos reutilizar o endpoint de pagamento ou criar um específico de status
      // Aqui vou assumir uma atualização simples de status via PATCH (se houver) ou PUT
      // Para simplificar, usaremos a lógica visual ou chamaremos um endpoint genérico de status se você tiver criado
      // No código anterior, o UC8 confirma a consulta. Vamos simular chamando o endpoint de pagamento "zerado" ou criando um novo.
      // Vou usar o alert para ilustrar o fluxo do UC9
      const confirm = window.confirm("Confirmar presença do paciente?");
      if(confirm) {
         // Num cenário real: await api.patch(`/consultas/${id}/status`, { status: 'CONFIRMADA' });
         alert("Presença confirmada! (Simulação)");
         fetchConsultas();
      }
    } catch (error) {
      alert("Erro ao confirmar");
    }
  };

  // Ação: Editar Horário
  const handleEditar = async (consulta) => {
    const novoHorario = prompt("Digite o novo horário (formato: YYYY-MM-DDTHH:MM):", consulta.dataHora);
    if (novoHorario) {
      try {
        await api.put(`/consultas/${consulta.id}`, { 
            dataHora: novoHorario,
            // Mantém outros dados se necessário ou o backend trata nulls
        });
        alert("Horário atualizado!");
        fetchConsultas();
      } catch (error) {
        alert("Erro ao atualizar: " + (error.response?.data || "Erro desconhecido"));
      }
    }
  };

  // Ação: Cancelar
  const handleCancelar = async (id) => {
    if (window.confirm("Tem certeza que deseja cancelar?")) {
      try {
        await api.patch(`/consultas/${id}/cancelar`);
        fetchConsultas();
      } catch (error) {
        alert("Erro ao cancelar");
      }
    }
  };

  if (user?.tipo === 'PACIENTE') return <div className="p-20 text-center">Acesso Restrito</div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#1f2b6c] text-white py-10">
        <div className="container mx-auto px-4 lg:px-20">
          <h1 className="text-3xl font-bold">Recepção Virtual</h1>
          <p className="text-blue-200 mt-2">Gestão de Agendamentos</p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-20 mt-8">
        
        {/* Filtros */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 flex items-center gap-4">
            <Filter className="text-gray-500" />
            <input 
                type="date" 
                value={dataFiltro} 
                onChange={(e) => setDataFiltro(e.target.value)}
                className="border p-2 rounded outline-none focus:border-[#1f2b6c]"
            />
            <button onClick={fetchConsultas} className="bg-[#1f2b6c] text-white px-4 py-2 rounded hover:bg-[#159eec]">
                Atualizar Lista
            </button>
        </div>

        {/* Lista */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 text-[#1f2b6c]">
                    <tr>
                        <th className="p-4">Horário</th>
                        <th className="p-4">Paciente</th>
                        <th className="p-4">Médico</th>
                        <th className="p-4">Tipo</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {consultas.length === 0 ? (
                        <tr><td colSpan="6" className="p-8 text-center text-gray-500">Nenhum agendamento para esta data.</td></tr>
                    ) : consultas.map((c) => (
                        <tr key={c.id} className="border-t hover:bg-gray-50">
                            <td className="p-4 font-bold text-[#1f2b6c]">
                                {new Date(c.dataHora).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                            </td>
                            <td className="p-4">{/* O DTO atual não tem nome do paciente, ideal adicionar no backend */} Paciente #{c.id}</td> 
                            <td className="p-4">{c.medicoNome}</td>
                            <td className="p-4 text-sm">{c.tipo}</td>
                            <td className="p-4">
                                <span className={`px-2 py-1 rounded text-xs font-bold 
                                    ${c.status === 'AGENDADA' ? 'bg-blue-100 text-blue-800' : 
                                      c.status === 'CANCELADA' ? 'bg-red-100 text-red-800' : 
                                      'bg-green-100 text-green-800'}`}>
                                    {c.status}
                                </span>
                            </td>
                            <td className="p-4 flex gap-2">
                                <button onClick={() => handleConfirmar(c.id)} title="Confirmar Presença" className="p-2 text-green-600 hover:bg-green-50 rounded"><CheckSquare size={18} /></button>
                                <button onClick={() => handleEditar(c)} title="Editar" className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit size={18} /></button>
                                <button onClick={() => handleCancelar(c.id)} title="Cancelar" className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}