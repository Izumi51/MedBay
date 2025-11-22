import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { BarChart3, DollarSign, Download } from 'lucide-react';

export default function Relatorios() {
  const { user } = useContext(AuthContext);
  const [periodo, setPeriodo] = useState({ inicio: '', fim: '' });
  const [dados, setDados] = useState(null);

  // Apenas médicos ou admins deveriam ver isso (mock de permissão)
  if (!user || user.tipo === 'PACIENTE') {
      return <div className="p-10 text-center">Acesso restrito.</div>;
  }

  const gerarRelatorio = async (e) => {
    e.preventDefault();
    try {
        const res = await api.get(`/relatorios/financeiro?inicio=${periodo.inicio}&fim=${periodo.fim}`);
        setDados(res.data);
    } catch (error) {
        alert('Erro ao gerar relatório');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-[#1f2b6c] mb-8 flex items-center gap-3">
            <BarChart3 /> Relatórios Financeiros
        </h1>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
            <form onSubmit={gerarRelatorio} className="flex gap-4 items-end">
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Data Início</label>
                    <input type="date" required className="border p-2 rounded" 
                        onChange={e => setPeriodo({...periodo, inicio: e.target.value})} />
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Data Fim</label>
                    <input type="date" required className="border p-2 rounded" 
                        onChange={e => setPeriodo({...periodo, fim: e.target.value})} />
                </div>
                <button className="bg-[#1f2b6c] text-white px-6 py-2 rounded font-bold hover:bg-[#159eec]">
                    Filtrar
                </button>
            </form>
        </div>

        {dados && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-xl shadow-lg">
                    <p className="text-blue-100 font-medium mb-2">Faturamento Total (Aprovado)</p>
                    <h2 className="text-4xl font-bold flex items-center gap-2">
                        <DollarSign size={32} /> 
                        R$ {dados.faturamentoTotal.toFixed(2)}
                    </h2>
                    <p className="text-sm mt-4 opacity-80">
                        Período: {dados.periodoInicio} a {dados.periodoFim}
                    </p>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col justify-center items-center text-center">
                    <Download size={48} className="text-gray-400 mb-4" />
                    <h3 className="text-xl font-bold text-gray-700">Exportar Dados</h3>
                    <p className="text-gray-500 text-sm mb-4">Baixar relatório detalhado em planilha.</p>
                    <button className="text-[#159eec] font-bold hover:underline" onClick={() => alert("Exportação simulada (UC10)")}>
                        Download .CSV
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}