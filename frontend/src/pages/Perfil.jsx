import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { User, LogOut, Shield } from 'lucide-react';

export default function Perfil() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return <div className="p-10 text-center">Você não está logado.</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-[#1f2b6c] h-32"></div>
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="bg-white p-2 rounded-full shadow-md">
                <div className="bg-gray-200 rounded-full p-6 text-[#1f2b6c]">
                    <User size={64} />
                </div>
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1">
                <Shield size={12} /> {user.tipo}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-[#1f2b6c]">{user.nome}</h1>
          <p className="text-gray-500">{user.email}</p>

          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-semibold text-[#1f2b6c] mb-4">Informações da Conta</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-gray-500">ID de Usuário</p>
                    <p className="font-medium">#{user.id}</p>
                </div>
                {/* Aqui você pode adicionar mais campos se existirem no objeto user */}
            </div>
          </div>

          <div className="mt-10">
            <button 
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-bold"
            >
                <LogOut size={20} /> Sair da Conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}