
import React, { useState, useEffect } from 'react';
import { Send, MessageCircleHeart, Loader2 } from 'lucide-react';
import { GuestMessage } from '../types';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

const AVATAR_COLORS = [
  'bg-blue-400', 'bg-amber-400', 'bg-teal-400', 'bg-rose-400', 'bg-indigo-400'
];

const Guestbook: React.FC = () => {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [name, setName] = useState('');
  const [msgText, setMsgText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Conectar ao Firebase em Tempo Real
  useEffect(() => {
    try {
      const q = query(collection(db, "mensagens"), orderBy("createdAt", "desc"));
      
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const msgs: GuestMessage[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          msgs.push({
            id: doc.id,
            name: data.name,
            message: data.message,
            // Converte timestamp do firebase para string
            date: data.createdAt ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
            avatarColor: data.avatarColor || AVATAR_COLORS[0]
          });
        });
        setMessages(msgs);
        setIsLoading(false);
      }, (err) => {
        console.error("Erro ao ler mensagens:", err);
        setError("Não foi possível carregar as mensagens. Verifique a configuração do Firebase.");
        setIsLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error("Erro geral:", err);
      setError("Erro na conexão com o banco de dados. Configure o arquivo firebase.ts");
      setIsLoading(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !msgText.trim()) return;

    setIsSending(true);

    try {
      await addDoc(collection(db, "mensagens"), {
        name: name.trim(),
        message: msgText.trim(),
        createdAt: serverTimestamp(),
        avatarColor: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)]
      });
      
      setName('');
      setMsgText('');
    } catch (e) {
      console.error("Erro ao enviar: ", e);
      alert("Erro ao enviar mensagem. Verifique se o arquivo firebase.ts está configurado corretamente.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border-4 border-blue-200 p-6 md:p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl text-blue-600 mb-2 fancy-font flex items-center justify-center gap-2">
          <MessageCircleHeart className="text-amber-400" size={32} />
          Mural de Recados
        </h2>
        <p className="text-gray-600 font-medium">Deixe uma mensagem de carinho!</p>
        <p className="text-xs text-blue-400 mt-1">(Agora suas mensagens ficam salvas para sempre!)</p>
      </div>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
        <div>
          <label className="block text-sm font-bold text-blue-800 mb-1 ml-1">Seu Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome aqui"
            className="w-full px-4 py-3 rounded-xl border-2 border-blue-100 focus:border-amber-400 focus:ring-0 transition-colors bg-white"
            required
            disabled={isSending}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-blue-800 mb-1 ml-1">Sua Mensagem</label>
          <textarea
            value={msgText}
            onChange={(e) => setMsgText(e.target.value)}
            placeholder="Escreva algo especial para o Mathias..."
            className="w-full px-4 py-3 rounded-xl border-2 border-blue-100 focus:border-amber-400 focus:ring-0 transition-colors bg-white h-24 resize-none"
            required
            disabled={isSending}
          />
        </div>
        <button
          type="submit"
          disabled={isSending}
          className="w-full py-3 bg-amber-400 hover:bg-amber-500 disabled:bg-amber-200 text-white rounded-xl font-bold shadow-md transform active:scale-95 transition-all flex items-center justify-center gap-2 text-lg"
        >
          {isSending ? <Loader2 className="animate-spin" /> : <Send size={20} />}
          {isSending ? 'Enviando...' : 'Enviar Recadinho'}
        </button>
      </form>

      {/* Infinite Scroll Container Area */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar scroll-smooth">
        
        {error && (
            <div className="p-4 bg-red-100 text-red-600 rounded-xl text-center text-sm">
                {error} <br/> 
                <strong>Lembre-se de configurar o arquivo firebase.ts!</strong>
            </div>
        )}

        {isLoading ? (
            <div className="text-center py-10 text-blue-400 flex flex-col items-center">
                <Loader2 className="animate-spin mb-2" size={32} />
                <p>Carregando recadinhos do mar...</p>
            </div>
        ) : (
            <>
                {messages.map((msg) => (
                <div key={msg.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 transition-transform hover:scale-[1.01] animate-fade-in-up">
                    <div className={`w-10 h-10 ${msg.avatarColor} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 shadow-inner`}>
                    {msg.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                    <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-bold text-gray-800">{msg.name}</h4>
                        <span className="text-xs text-gray-400">
                             {new Date(msg.date).toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit', hour: '2-digit', minute:'2-digit'})}
                        </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">"{msg.message}"</p>
                    </div>
                </div>
                ))}
                
                {messages.length === 0 && !error && (
                <div className="text-center py-10 text-gray-400 italic bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    O mural está vazio.<br/>Seja o primeiro a escrever! ✍️
                </div>
                )}
            </>
        )}
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #93c5fd;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #60a5fa;
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Guestbook;
