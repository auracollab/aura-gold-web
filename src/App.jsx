import React, { useState, useEffect } from 'react';
import { 
  Coins, 
  Shield, 
  Flame, 
  TrendingUp, 
  Wallet, 
  ExternalLink, 
  Copy, 
  Check, 
  BookOpen, 
  Milestone, 
  Megaphone, 
  Sparkles, 
  Calculator, 
  AlertCircle, 
  Info, 
  Lock, 
  RefreshCw, 
  ChevronRight,
  Compass,
  ArrowRight,
  Share2,
  FileText,
  Send
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [copiedText, setCopiedText] = useState('');
  const [solAmount, setSolAmount] = useState('1');
  const [argAmount, setArgAmount] = useState('');
  const [solPrice, setSolPrice] = useState(73.78); // Precio inicial de fallback ajustado a fecha actual (junio de 2026)
  const [isPriceLoading, setIsPriceLoading] = useState(true);
  
  // Estado del Generador de Imágenes AI
  const [imagePrompt, setImagePrompt] = useState('An elegant, glowing golden coin with a subtle futuristic aura, detailed 3D render, luxury financial asset, dark professional background, high resolution');
  const [generatedImage, setGeneratedImage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState('');
  const [selectedPreset, setSelectedPreset] = useState(0);

  // Constantes de Datos de Aura Gold
  const WALLET_CUSTODIA = "2NjhoA5TKiVKja9Gq8iPht5ya5Ho8yo2AEUbv37aGDTa";
  const MINT_ADDRESS = "22gYFgCNLcyRrLhrMtBSq3uwRhvfCA7wUGzG8QzCycqc";
  const TX_SIGNATURE = "4NvXK9pzQJWn9YZvaccbpWsZuqEguC4Pq66absgF3YLuoRMVVVQRaJegoxeT6nCajaTwaZ4ubKJ3ZgPL62Wv7RRP";
  const TOKEN_PRICE_USD = 0.01;

  useEffect(() => {
    const fetchSolPrice = async () => {
      try {
        setIsPriceLoading(true);
        // Consulta directa a la API simple de CoinGecko para el par SOL/USD
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
        const data = await response.json();
        if (data.solana && data.solana.usd) {
          setSolPrice(data.solana.usd);
        }
      } catch (error) {
        console.error("No se pudo obtener el precio en vivo de CoinGecko, usando fallback:", error);
      } finally {
        setIsPriceLoading(false);
      }
    };

    fetchSolPrice();
    // Reconsultar cada 60 segundos automáticamente para mantener exactitud
    const interval = setInterval(fetchSolPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sol = parseFloat(solAmount) || 0;
    const totalUsd = sol * solPrice;
    const tokens = totalUsd / TOKEN_PRICE_USD;
    setArgAmount(tokens.toLocaleString('en-US', { maximumFractionDigits: 0 }));
  }, [solAmount, solPrice]);

  const handleCopy = (text, type) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopiedText(type);
      setTimeout(() => setCopiedText(''), 2000);
    } catch (err) {
      console.error("Error al copiar texto", err);
    }
    document.body.removeChild(textArea);
  };

  const handleGenerateImage = async () => {
    setIsGenerating(true);
    setGenerationError('');
    setGeneratedImage('');

    const apiKey = ""; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`;

    const payload = {
      instances: [{ prompt: imagePrompt }],
      parameters: {
        sampleCount: 1,
        aspectRatio: "1:1",
        outputMimeType: "image/png"
      }
    };

    let retries = 5;
    const makeRequest = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (data.predictions && data.predictions[0]?.bytesBase64Encoded) {
          setGeneratedImage(`data:image/png;base64,${data.predictions[0].bytesBase64Encoded}`);
        } else { throw new Error(); }
      } catch (error) {
        if (retries > 0) {
          retries--;
          await new Promise(r => setTimeout(r, 1000));
          return makeRequest();
        } else {
          setGenerationError("Error al conectar con el servidor AI de publicidad. Use las plantillas prediseñadas o intente más tarde.");
        }
      }
    };
    await makeRequest();
    setIsGenerating(false);
  };

  const presets = [
    { title: "Moneda de Aura Gold Brillando", prompt: "An elegant, glowing golden coin with a subtle futuristic aura, engraved with 'ARG', detailed 3D render, luxury financial asset, dark background, 8k resolution" },
    { title: "Cofre Fuerte Digital", prompt: "A high-tech digital vault glowing with golden light, showing digital charts and Aura Gold coins inside, modern security and freedom concept, cinematic lighting" },
    { title: "Banner de Libertad Financiera", prompt: "A premium minimalist background with golden lines, a shining golden coin of wealth rising above a landscape of inflation, abstract financial success, 3D render" },
  ];

  const applyPreset = (index) => {
    setSelectedPreset(index);
    setImagePrompt(presets[index].prompt);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 overflow-x-hidden">
      
      {/* Banner Superior de Estado de la Preventa */}
      <div className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 py-2 px-4 text-center text-xs font-bold text-slate-950 tracking-wider">
        🚀 PREVENTA DE ENTRADA MANUAL ACTIVA - 1 ARG = $0.01 USD. ¡PRECIO DE SOLANA SINCRONIZADO EN VIVO!
      </div>

      {}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://pbs.twimg.com/profile_images/2066640311367913472/59CqIwqA_400x400.jpg" 
              alt="Aura Gold Logo" 
              className="w-12 h-12 rounded-full border-2 border-amber-500 shadow-md shadow-amber-500/20"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/150/d4af37/000000?text=ARG'; }}
            />
            <div>
              <span className="text-xl font-black bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent tracking-wide">
                AURA GOLD
              </span>
              <span className="block text-[10px] text-amber-400 font-mono tracking-widest font-bold">SOLANA NETWORK (ARG)</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <button onClick={() => setActiveTab('inicio')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'inicio' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-300 hover:bg-slate-800'}`}>Inicio & Preventa</button>
            <button onClick={() => setActiveTab('whitepaper')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'whitepaper' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-300 hover:bg-slate-800'}`}>Whitepaper</button>
            <button onClick={() => setActiveTab('roadmap')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'roadmap' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-300 hover:bg-slate-800'}`}>Ruta (Roadmap)</button>
            <button onClick={() => setActiveTab('promo')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'promo' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-300 hover:bg-slate-800'}`}>Kit Publicitario & AI</button>
          </nav>

          <div className="flex items-center gap-2">
            <a href="https://x.com/AuraGoldARG" target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-amber-400 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <button onClick={() => setActiveTab('inicio')} className="bg-slate-800 border border-amber-500/30 hover:border-amber-400 text-amber-400 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              <span>Participar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Menú de Navegación Móvil */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 p-2 flex justify-around sticky top-20 z-40">
        <button onClick={() => setActiveTab('inicio')} className={`flex flex-col items-center gap-1 p-2 rounded-lg text-xs font-bold ${activeTab === 'inicio' ? 'text-amber-400' : 'text-slate-400'}`}>
          <Coins className="w-5 h-5" />
          <span>Inicio</span>
        </button>
        <button onClick={() => setActiveTab('whitepaper')} className={`flex flex-col items-center gap-1 p-2 rounded-lg text-xs font-bold ${activeTab === 'whitepaper' ? 'text-amber-400' : 'text-slate-400'}`}>
          <BookOpen className="w-5 h-5" />
          <span>Whitepaper</span>
        </button>
        <button onClick={() => setActiveTab('roadmap')} className={`flex flex-col items-center gap-1 p-2 rounded-lg text-xs font-bold ${activeTab === 'roadmap' ? 'text-amber-400' : 'text-slate-400'}`}>
          <Milestone className="w-5 h-5" />
          <span>Ruta</span>
        </button>
        <button onClick={() => setActiveTab('promo')} className={`flex flex-col items-center gap-1 p-2 rounded-lg text-xs font-bold ${activeTab === 'promo' ? 'text-amber-400' : 'text-slate-400'}`}>
          <Megaphone className="w-5 h-5" />
          <span>Publicidad</span>
        </button>
      </div>

      {}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ======================================= */}
        {/* PESTAÑA 1: INICIO & PREVENTA            */}
        {/* ======================================= */}
        {activeTab === 'inicio' && (
          <div className="space-y-12">
            {/* Sección Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-b from-slate-900 to-slate-950 p-6 md:p-12 rounded-3xl border border-slate-800/80 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl -z-10 pointer-events-none"></div>
              
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-amber-400 text-xs font-bold">
                  <Shield className="w-4 h-4" /> No es un Meme. Proyecto Serio de Largo Plazo.
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
                  Protege tu Capital de la Inflación con <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent">Aura Gold</span>
                </h1>
                <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
                  Aura Gold (ARG) es un ecosistema descentralizado en la red Solana concebido para blindar tu patrimonio, brindar seguridad financiera y libertad absoluta frente a la devaluación monetaria fiduciaria.
                </p>
                
                {/* Cuadrícula de Estadísticas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                    <span className="text-xs text-slate-400 block mb-1">Precio Preventa</span>
                    <span className="text-xl font-extrabold text-amber-400">$0.01 USD</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                    <span className="text-xs text-slate-400 block mb-1">Precio SOL (Live)</span>
                    <span className="text-xl font-extrabold text-emerald-400 flex items-center gap-1.5">
                      ${solPrice.toFixed(2)}
                      {isPriceLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-500" />}
                    </span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                    <span className="text-xs text-slate-400 block mb-1">Asignación Preventa</span>
                    <span className="text-xl font-extrabold text-amber-400">30% (300M)</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                    <span className="text-xs text-slate-400 block mb-1">Suministro Total</span>
                    <span className="text-xl font-extrabold text-white">1,000M ARG</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button onClick={() => document.getElementById("preventa-seccion").scrollIntoView({ behavior: 'smooth' })} className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg flex items-center gap-2 text-base transition-all">
                    <span>Participar en Preventa</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button onClick={() => setActiveTab('whitepaper')} className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-4 rounded-xl border border-slate-700 flex items-center gap-2 text-base transition-all">
                    <BookOpen className="w-5 h-5" />
                    <span>Leer Whitepaper</span>
                  </button>
                </div>
              </div>

              {/* Widget del Token */}
              <div className="lg:col-span-5 bg-slate-900/95 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <span className="font-bold text-white text-lg flex items-center gap-2"><Coins className="w-5 h-5 text-amber-400" /> Detalles del Token</span>
                  <span className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20 font-bold">Acuñado</span>
                </div>

                <div className="space-y-4 text-sm">
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Dirección Mint (Contrato)</span>
                      <button onClick={() => handleCopy(MINT_ADDRESS, 'mint')} className="text-amber-400 hover:underline flex items-center gap-1">
                        {copiedText === 'mint' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedText === 'mint' ? 'Copiado' : 'Copiar'}</span>
                      </button>
                    </div>
                    <div className="bg-slate-950 px-3 py-2 rounded-lg font-mono text-xs border border-slate-800 truncate text-slate-300">{MINT_ADDRESS}</div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Billetera de Custodia Preventa</span>
                      <button onClick={() => handleCopy(WALLET_CUSTODIA, 'custodia')} className="text-amber-400 hover:underline flex items-center gap-1">
                        {copiedText === 'custodia' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedText === 'custodia' ? 'Copiado' : 'Copiar'}</span>
                      </button>
                    </div>
                    <div className="bg-slate-950 px-3 py-2 rounded-lg font-mono text-xs border border-amber-500/40 text-amber-400 truncate font-bold">{WALLET_CUSTODIA}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <a href="https://solscan.io/token/22gYFgCNLcyRrLhrMtBSq3uwRhvfCA7wUGzG8QzCycqc" target="_blank" rel="noreferrer" className="bg-slate-950 hover:bg-slate-800 text-slate-300 p-2 rounded-lg border border-slate-800 flex items-center justify-center gap-1 text-xs font-bold transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" /> <span>SolScan</span>
                    </a>
                    <a href="https://explorer.solana.com/address/22gYFgCNLcyRrLhrMtBSq3uwRhvfCA7wUGzG8QzCycqc?cluster=mainnet" target="_blank" rel="noreferrer" className="bg-slate-950 hover:bg-slate-800 text-slate-300 p-2 rounded-lg border border-slate-800 flex items-center justify-center gap-1 text-xs font-bold transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" /> <span>Explorer</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Pilares Estratégicos */}
            <div>
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl font-black text-white">Pilares Tecnológicos de Resguardo</h2>
                <p className="text-slate-400 mt-2">Diferenciándonos de los esquemas volátiles, Aura Gold está estructurado para construir una economía robusta y duradera.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl group hover:border-amber-500/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 mb-6 border border-amber-500/20">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Refugio de Valor Real</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Diseñado explícitamente para proteger el poder adquisitivo de sus titulares ante las políticas inflacionarias tradicionales de las divisas fiduciarias estatales.
                  </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl group hover:border-amber-500/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 mb-6 border border-amber-500/20">
                    <Flame className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Deflación Programada</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Las quemas programadas y sistemáticas disminuirán el suministro circulante de ARG. Con el tiempo, la escasez inducida favorece la estabilidad y potencial valorización.
                  </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl group hover:border-amber-500/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 mb-6 border border-amber-500/20">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Reserva en Oro y Estables</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    La tesorería diversificará sus activos acumulados en 3 pilares clave del ecosistema global: PAXGold (respaldo físico), USDT (estabilidad líquida) y SOL (rendimiento de red).
                  </p>
                </div>
              </div>
            </div>

            {/* CALCULADORA DINÁMICA DE PREVENTA */}
            <div id="preventa-seccion" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block mb-1">Módulo de Preventa Directo</span>
                    <h2 className="text-2xl md:text-3xl font-black text-white">Calculadora Dinámica ARG/SOL</h2>
                    <p className="text-slate-400 text-sm mt-1">
                      El precio de Solana se actualiza automáticamente desde CoinGecko en cada carga para garantizar una conversión justa durante esta preventa manual.
                    </p>
                  </div>

                  {/* Caja Calculadora */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                      <Calculator className="w-4 h-4" />
                      <span>Simulador en Tiempo Real (1 ARG = $0.01 USD)</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Inversión (SOL)</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            value={solAmount} 
                            onChange={(e) => setSolAmount(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl py-3 px-4 text-white text-lg font-bold"
                            placeholder="0.0"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">SOL</span>
                        </div>
                        <div className="flex justify-between mt-1 px-1">
                          <span className="text-[10px] text-slate-500">Precio SOL: ${solPrice.toFixed(2)} USD</span>
                          <button 
                            onClick={async () => {
                              try {
                                setIsPriceLoading(true);
                                const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
                                const d = await res.json();
                                if (d.solana && d.solana.usd) setSolPrice(d.solana.usd);
                              } catch(e) {} finally { setIsPriceLoading(false); }
                            }} 
                            className="text-[10px] text-amber-500 hover:underline flex items-center gap-1"
                          >
                            <RefreshCw className={`w-2.5 h-2.5 ${isPriceLoading ? 'animate-spin' : ''}`} /> Forzar Actualización
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Recibes (ARG)</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            value={argAmount} 
                            readOnly
                            className="w-full bg-slate-900/60 border border-slate-800/85 rounded-xl py-3 px-4 text-amber-400 text-lg font-bold select-all outline-none"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">ARG</span>
                        </div>
                        <span className="text-[10px] text-slate-500 mt-1 block px-1">Precio fijado en Fase 1: $0.01 por ARG</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 bg-slate-950/40 p-4 rounded-xl border border-slate-800">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Send className="w-4 h-4 text-amber-400" />
                      Instrucciones de Envío
                    </h3>
                    <p className="text-xs text-slate-300">
                      Envía el monto deseado de SOL a la billetera de custodia oficial. Los tokens ARG se enviarán de forma masiva una vez finalizada la preventa del 30% del supply inicial.
                    </p>
                  </div>
                </div>

                {/* Panel de Datos y Copiado */}
                <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="text-xs bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg flex items-start gap-2 text-amber-400">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <strong>Seguridad de Fondos:</strong> Parte del dinero recaudado financiará el Smart Contract de automatización definitiva para las siguientes fases del proyecto.
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="block text-xs text-slate-400 mb-1">Copiar Billetera de Custodia</span>
                        <div className="flex gap-2">
                          <div className="bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg font-mono text-xs text-amber-400 truncate flex-1 flex items-center font-bold">
                            {WALLET_CUSTODIA}
                          </div>
                          <button onClick={() => handleCopy(WALLET_CUSTODIA, 'walletComp')} className="bg-amber-500 hover:bg-amber-400 text-slate-950 p-2.5 rounded-lg">
                            {copiedText === 'walletComp' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-800 pt-4 mt-4 space-y-1">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Transacción de Creación (Firma):</span>
                    <div className="flex gap-2 items-center">
                      <div className="bg-slate-900/60 border border-slate-800 px-2 py-1 rounded text-[10px] text-slate-400 font-mono truncate flex-1">{TX_SIGNATURE}</div>
                      <button onClick={() => handleCopy(TX_SIGNATURE, 'tx')} className="text-amber-500 hover:text-amber-400">
                        {copiedText === 'tx' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Guía de Phantom */}
            <div className="bg-gradient-to-r from-indigo-950/40 to-slate-900 border border-slate-800 p-6 md:p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <img src="https://phantom.app/img/phantom-logo.svg" alt="Phantom" className="w-10 h-10 rounded-xl bg-indigo-500/10 p-1.5 border border-indigo-500/20" onError={(e) => e.target.style.display = 'none'} />
                <div>
                  <h3 className="text-xl font-bold text-white">¿Cómo ver tu token en Phantom Wallet?</h3>
                  <p className="text-slate-400 text-xs">Añade Aura Gold en simples pasos para visualizar tu balance con total transparencia.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative">
                  <span className="absolute top-2 right-2 text-slate-800 font-black text-xl">01</span>
                  <span className="text-amber-400 font-bold block mb-1">Abre tu billetera</span>
                  <span>Abre tu aplicación de Phantom en móvil o extensión.</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative">
                  <span className="absolute top-2 right-2 text-slate-800 font-black text-xl">02</span>
                  <span className="text-amber-400 font-bold block mb-1">Gestionar Lista</span>
                  <span>Haz clic en "Administrar lista de tokens" o en el botón "+".</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative">
                  <span className="absolute top-2 right-2 text-slate-800 font-black text-xl">03</span>
                  <span className="text-amber-400 font-bold block mb-1">Pega el Mint</span>
                  <span>Ingresa la dirección oficial de Aura Gold en la casilla de búsqueda.</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative">
                  <span className="absolute top-2 right-2 text-slate-800 font-black text-xl">04</span>
                  <span className="text-amber-400 font-bold block mb-1">¡Listo!</span>
                  <span>¡Tu token aparecerá de inmediato en tu panel principal de activos!</span>
                </div>
              </div>
            </div>

            {/* Descargo de Responsabilidad */}
            <div className="bg-slate-900 border border-amber-500/20 p-4 rounded-xl flex gap-3 items-center text-xs text-slate-400">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <strong>Descargo de responsabilidad (Disclaimer):</strong> Nadie está obligado a invertir en este token. De decidir hacerlo, corre bajo su propio riesgo entendiendo que realizó sus propias investigaciones y análisis técnicos (DYOR). No invierta capital que no esté dispuesto a perder ante las fluctuaciones del ecosistema cripto.
              </div>
            </div>
          </div>
        )}

        {/* ======================================= */}
        {/* PESTAÑA 2: WHITEPAPER COMPLETO          */}
        {/* ======================================= */}
        {activeTab === 'whitepaper' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 max-w-4xl mx-auto space-y-8">
            <div className="border-b border-slate-800 pb-6 text-center space-y-2">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block">Documento Técnico Oficial v1.0</span>
              <h1 className="text-3xl md:text-4xl font-black text-white">Whitepaper de Aura Gold (ARG)</h1>
              <p className="text-slate-400 text-sm">Reserva Descentralizada contra la Inflación en el ecosistema de Solana</p>
            </div>

            {/* Sección 1 */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                <span className="bg-amber-500/10 px-2.5 py-1 rounded-md text-sm border border-amber-500/20">1</span>
                Introducción e Impacto Inflacionario
              </h2>
              <div className="text-slate-300 text-sm leading-relaxed space-y-3">
                <p>
                  El sistema monetario fiduciario internacional enfrenta actualmente uno de sus desafíos sistémicos más acentuados. La devaluación del dinero debido a la inflación descontrolada erosiona el poder adquisitivo de los ciudadanos de forma acumulativa y silenciosa. Las respuestas tradicionales, como las cuentas de ahorro bancarias, ofrecen tasas de rendimiento reales negativas que destruyen riqueza líquida a mediano plazo.
                </p>
                <p>
                  <strong>Aura Gold (ARG)</strong> surge en la cadena de bloques Solana como una alternativa estructurada de código abierto. No somos una memecoin que busca el hype viral efímero. Nuestra premisa estratégica es la solidez a largo plazo mediante un mecanismo deflacionario programado y una diversificación real de reservas de tesorería para blindar y revalorizar los activos depositados por nuestra comunidad.
                </p>
              </div>
            </div>

            {/* Sección 2 */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                <span className="bg-amber-500/10 px-2.5 py-1 rounded-md text-sm border border-amber-500/20">2</span>
                Mecanismo de Preventa y Desarrollo Técnico
              </h2>
              <div className="text-slate-300 text-sm leading-relaxed space-y-3">
                <p>
                  Para garantizar una distribución equilibrada e incluyente, el 30% del suministro (300,000,000 ARG) se ofrece exclusivamente durante la fase de preventa inicial. 
                </p>
                <ul className="list-disc list-inside pl-4 space-y-1 text-slate-300">
                  <li><strong>Precio de la preventa:</strong> $0.01 USD fijado (por tokens equivalentes).</li>
                  <li><strong>Modelo de Adquisición Inicial:</strong> Se opera temporalmente de forma manual mediante una cuenta de custodia unificada para evitar los altos costos de gas o el lanzamiento descuidado de código no auditado.</li>
                  <li><strong>Automatización del Smart Contract:</strong> Un porcentaje predefinido de la preventa se reserva específicamente para financiar el desarrollo del Smart Contract definitivo de distribución automática, auditorías externas y los pools de liquidez iniciales.</li>
                  <li><strong>Fechas de Distribución:</strong> Las transferencias se ejecutarán de forma masiva en cuanto se alcance el 30% de recaudación o en su defecto a lo largo de 3 fases organizadas que consolidarán el proyecto paso a paso.</li>
                </ul>
              </div>
            </div>

            {/* Sección 3 */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                <span className="bg-amber-500/10 px-2.5 py-1 rounded-md text-sm border border-amber-500/20">3</span>
                La Reserva Diversificada: Los 3 Pilares
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Aura Gold fundamenta su estabilidad futura e inmunidad a la inflación extrema a través de la descentralización activa del fondo de tesorería recaudado tras las fases del proyecto. Esta tesorería se asienta sólidamente en tres pilares:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-amber-400 font-bold block text-sm mb-1">1. PAX Gold (PAXG)</span>
                  <span className="text-slate-400 text-xs">Reserva de valor histórica anclada directamente al valor del oro físico de grado de inversión, cubriendo de forma segura las turbulencias macroeconómicas mundiales.</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-emerald-400 font-bold block text-sm mb-1">2. USDT Stablecoin</span>
                  <span className="text-slate-400 text-xs">Liquidez estable inmediata vinculada al dólar para financiar de forma ágil el crecimiento tecnológico continuo del ecosistema y de los pools de liquidez.</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-indigo-400 font-bold block text-sm mb-1">3. Solana (SOL)</span>
                  <span className="text-slate-400 text-xs">Exposición directa al crecimiento y rendimiento de la red blockchain de alta velocidad más eficiente y escalable del ecosistema actual.</span>
                </div>
              </div>
            </div>

            {/* Sección 4 */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                <span className="bg-amber-500/10 px-2.5 py-1 rounded-md text-sm border border-amber-500/20">4</span>
                Quemas Sistemáticas y Deflación Programada
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                El diseño de Tokenomics de Aura Gold tiene como norte la escasez planificada. Los ciclos de quema de tokens reducirán periódicamente la masa total del suministro en circulación, asegurando que con el transcurso del tiempo el token tiende a valorizarse ante la ley de oferta y demanda en exchanges descentralizados como Raydium.
              </p>
            </div>

            {/* Tabla de Desglose de Tokenomics */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                <span className="bg-amber-500/10 px-2.5 py-1 rounded-md text-sm border border-amber-500/20">5</span>
                Distribución de Aura Gold (Tokenomics)
              </h2>
              <div className="overflow-x-auto bg-slate-950 rounded-xl border border-slate-800">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/50">
                      <th className="p-4 font-bold text-white">Categoría de Distribución</th>
                      <th className="p-4 font-bold text-white">Porcentaje</th>
                      <th className="p-4 font-bold text-white">Suministro de Tokens (ARG)</th>
                      <th className="p-4 font-bold text-white">Propósito Estratégico</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-900">
                      <td className="p-4 font-bold text-amber-400">Preventa por Fases</td>
                      <td className="p-4 font-semibold">30%</td>
                      <td className="p-4 font-mono">300,000,000</td>
                      <td className="p-4 text-slate-400">Distribución inicial y financiamiento de infraestructura automatizada.</td>
                    </tr>
                    <tr className="border-b border-slate-900">
                      <td className="p-4 font-bold text-white">Pools de Liquidez (Raydium)</td>
                      <td className="p-4 font-semibold">40%</td>
                      <td className="p-4 font-mono">400,000,000</td>
                      <td className="p-4 text-slate-400">Bloqueo de liquidez inicial para intercambios libres y seguros.</td>
                    </tr>
                    <tr className="border-b border-slate-900">
                      <td className="p-4 font-bold text-white">Reserva de Tesorería Activa</td>
                      <td className="p-4 font-semibold">15%</td>
                      <td className="p-4 font-mono">150,000,000</td>
                      <td className="p-4 text-slate-400">Reserva de respaldo diversificado en PAX Gold, USDT y SOL.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Marketing y Alianzas</td>
                      <td className="p-4 font-semibold">15%</td>
                      <td className="p-4 font-mono">150,000,000</td>
                      <td className="p-4 text-slate-400">Publicidad programada, incentivos de comunidad y quemas iniciales.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* CTA en Whitepaper */}
            <div className="bg-amber-500/5 border border-amber-500/20 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-white">¿Deseas asegurar tu posición en la preventa?</h4>
                <p className="text-xs text-slate-400">Aprovecha el precio inicial preferencial antes del enlistado público en exchanges descentralizados.</p>
              </div>
              <button onClick={() => setActiveTab('inicio')} className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-lg text-xs tracking-wider uppercase whitespace-nowrap transition-all">
                Acceder a Preventa
              </button>
            </div>
          </div>
        )}

        {/* ======================================= */}
        {/* PESTAÑA 3: ROADMAP (HOJA DE RUTA)       */}
        {/* ======================================= */}
        {activeTab === 'roadmap' && (
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center space-y-2">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block">Proyección del Proyecto</span>
              <h1 className="text-3xl font-black text-white">Hoja de Ruta Estratégica Aura Gold</h1>
              <p className="text-slate-400 text-sm">Nuestras fases de expansión diseñadas para el crecimiento constante y sólido de ARG.</p>
            </div>

            <div className="relative border-l-2 border-amber-500/30 pl-6 ml-4 md:ml-32 space-y-12">
              
              {/* Fase 1 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 bg-amber-500 text-slate-950 rounded-full w-4 h-4 border-4 border-slate-950"></div>
                <div className="hidden md:block absolute -left-[144px] top-1 text-right w-28 text-amber-400 font-mono text-sm font-bold">FASE 1 (Actual)</div>
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
                  <span className="inline-block bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase md:hidden mb-1">Fase 1 (Actual)</span>
                  <h3 className="text-lg font-bold text-white">Lanzamiento Base y Preventa Manual</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Acuñación del token en la red Solana con un suministro inicial garantizado de 1.000.000.000. Creación de canales sociales de comunicación unificados (X/Twitter). Apertura de preventa por envío directo de SOL a billetera de custodia de Aura Gold a precio cerrado de $0.01 USD.
                  </p>
                  <div className="flex gap-2 text-[10px] text-amber-400 font-semibold bg-amber-500/5 p-2 rounded border border-amber-500/10">
                    <Check className="w-3.5 h-3.5" /> <span>¡Contrato acuñado y preventa en progreso activo!</span>
                  </div>
                </div>
              </div>

              {/* Fase 2 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 bg-slate-700 text-slate-950 rounded-full w-4 h-4 border-4 border-slate-950"></div>
                <div className="hidden md:block absolute -left-[144px] top-1 text-right w-28 text-slate-400 font-mono text-sm font-bold">FASE 2</div>
                <div className="bg-slate-900 border border-slate-800/80 p-6 rounded-2xl space-y-3">
                  <span className="inline-block bg-slate-800 text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase md:hidden mb-1">Fase 2</span>
                  <h3 className="text-lg font-bold text-white">Financiamiento de Smart Contract y Auditoría</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Con parte de los fondos recaudados de manera manual en la preventa de los primeros niveles, financiaremos la automatización y el desarrollo final del Smart Contract para la distribución y reclamación automática del token Aura Gold (ARG) / SOL de forma transparente. Auditorías externas para asegurar riesgo cero de fugas.
                  </p>
                </div>
              </div>

              {/* Fase 3 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 bg-slate-700 text-slate-950 rounded-full w-4 h-4 border-4 border-slate-950"></div>
                <div className="hidden md:block absolute -left-[144px] top-1 text-right w-28 text-slate-400 font-mono text-sm font-bold">FASE 3</div>
                <div className="bg-slate-900 border border-slate-800/80 p-6 rounded-2xl space-y-3">
                  <span className="inline-block bg-slate-800 text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase md:hidden mb-1">Fase 3</span>
                  <h3 className="text-lg font-bold text-white">Enlistamiento en Raydium y Distribución Masiva</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Distribución masiva automatizada de los tokens adquiridos en preventa directa a las billeteras registradas. Enlistado oficial del par comercial ARG en el DEX de referencia de Solana (Raydium) proveyendo una fuerte inyección de liquidez inicial bloqueada por seguridad.
                  </p>
                </div>
              </div>

              {/* Fase 4 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 bg-slate-700 text-slate-950 rounded-full w-4 h-4 border-4 border-slate-950"></div>
                <div className="hidden md:block absolute -left-[144px] top-1 text-right w-28 text-slate-400 font-mono text-sm font-bold">FASE 4</div>
                <div className="bg-slate-900 border border-slate-800/80 p-6 rounded-2xl space-y-3">
                  <span className="inline-block bg-slate-800 text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase md:hidden mb-1">Fase 4</span>
                  <h3 className="text-lg font-bold text-white">Pilares de Reserva y Ciclo de Quemas Activas</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Activación del plan de resiliencia financiera: diversificación del fondo de tesorería del proyecto en PAX Gold (PAXG), USDT y SOL. Lanzamiento e inicio del primer ciclo oficial de quema masiva del suministro circulante para estimular la escasez futura en el mercado.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ======================================= */}
        {/* PESTAÑA 4: KIT PROMOCIONAL & AI         */}
        {/* ======================================= */}
        {activeTab === 'promo' && (
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block">Kit de Marketing para Promotores</span>
              <h1 className="text-3xl font-black text-white">Generador AI de Publicidades y Contenido</h1>
              <p className="text-slate-400 text-sm">Diseña afiches de forma inmediata y utiliza plantillas de publicidad prediseñadas para tus redes sociales.</p>
            </div>

            {/* Generador de Imagen */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none"></div>
              
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-1"><Sparkles className="w-5 h-5 text-amber-400" /> Generador de Publicidad AI</h2>
                  <p className="text-xs text-slate-400">Genera gráficos promocionales profesionales listos para tu red preferida.</p>
                </div>

                <div className="space-y-2">
                  <span className="block text-xs font-bold text-slate-300">Seleccionar plantilla de diseño:</span>
                  <div className="grid grid-cols-1 gap-2">
                    {presets.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => applyPreset(index)}
                        className={`text-left p-3 rounded-xl border text-xs transition-all ${selectedPreset === index ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'}`}
                      >
                        <span className="font-bold block mb-0.5">{preset.title}</span>
                        <span className="text-slate-400 truncate block text-[11px]">{preset.prompt}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300">Modificar prompt:</label>
                  <textarea rows={3} value={imagePrompt} onChange={(e) => setImagePrompt(e.target.value)} className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl p-3 text-xs text-slate-300 font-mono outline-none" />
                </div>

                <button
                  onClick={handleGenerateImage}
                  disabled={isGenerating || !imagePrompt}
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 text-slate-950 disabled:text-slate-500 font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                  <span>{isGenerating ? 'Generando afiche AI...' : 'Generar Imagen Publicitaria Ahora'}</span>
                </button>

                {generationError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{generationError}</span>
                  </div>
                )}
              </div>

              {/* Vista previa de Imagen */}
              <div className="lg:col-span-6 bg-slate-950 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between min-h-[350px]">
                <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-800 rounded-xl relative overflow-hidden bg-slate-900/40">
                  {isGenerating ? (
                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 rounded-full border-4 border-amber-500/10 border-t-amber-500 animate-spin mx-auto"></div>
                      <p className="text-xs text-slate-400">Modelando con Google AI...</p>
                    </div>
                  ) : generatedImage ? (
                    <img src={generatedImage} alt="Promo" className="max-w-full h-auto max-h-[380px] object-contain rounded-lg" />
                  ) : (
                    <div className="text-center p-6 space-y-2">
                      <p className="text-xs text-slate-400 font-bold">Sin imagen generada</p>
                      <p className="text-[10px] text-slate-500 max-w-xs mx-auto">Haz clic en generar para obtener una publicidad única.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Plantillas de un clic */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span className="text-sm font-bold text-white flex items-center gap-2"><Share2 className="w-4 h-4 text-amber-400" /> Plantilla para X (Twitter)</span>
                  <button onClick={() => handleCopy("🛡️ ¿Cansado de la devaluación?\n\nPresentamos Aura Gold ($ARG), una alternativa seria y de largo plazo en #Solana.\n\n🔥 Preventa activa a solo $0.01\n🔒 Diversificación en PAX Gold, USDT y SOL.\n\nMint: 22gYFgCNLcyRrLhrMtBSq3uwRhvfCA7wUGzG8QzCycqc\nBilletera: 2NjhoA5TKiVKja9Gq8iPht5ya5Ho8yo2AEUbv37aGDTa", 'tw1')} className="text-xs text-amber-400 hover:underline flex items-center gap-1">
                    {copiedText === 'tw1' ? 'Copiado' : 'Copiar'}
                  </button>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl text-xs font-mono text-slate-300 leading-relaxed select-all">
                  🛡️ ¿Cansado de la devaluación? <br/><br/>
                  Presentamos Aura Gold ($ARG), una alternativa seria y de largo plazo en #Solana.<br/><br/>
                  🔥 Preventa activa a solo $0.01<br/>
                  🔒 Diversificación en PAX Gold, USDT y SOL.<br/><br/>
                  Mint: 22gYFgCNLcyRrLhrMtBSq3uwRhvfCA7wUGzG8QzCycqc<br/>
                  Billetera: 2NjhoA5TKiVKja9Gq8iPht5ya5Ho8yo2AEUbv37aGDTa
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span className="text-sm font-bold text-white flex items-center gap-2"><Share2 className="w-4 h-4 text-emerald-400" /> Anuncio para Canales</span>
                  <button onClick={() => handleCopy("📢 COMUNIDAD AURA GOLD ($ARG) - PROTECCIÓN CONTRA LA INFLACIÓN 📢\n\n¿Por qué elegir Aura Gold?\n1️⃣ NO es una memecoin: Contamos con un plan estratégico real.\n2️⃣ Evitar Rug Pulls: Preventa manual segura del 30% del supply para inyectar liquidez oficial bloqueada.\n3️⃣ Diversificación de Reserva: PAX Gold, USDT y Solana.\n\n🌐 Únete ahora enviando SOL a la billetera de custodia.", 'ch1')} className="text-xs text-amber-400 hover:underline flex items-center gap-1">
                    {copiedText === 'ch1' ? 'Copiado' : 'Copiar'}
                  </button>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl text-xs font-mono text-slate-300 leading-relaxed select-all">
                  📢 COMUNIDAD AURA GOLD ($ARG) <br/><br/>
                  ¿Por qué elegir Aura Gold?<br/>
                  1️⃣ NO es una memecoin: Contamos con un plan estratégico real.<br/>
                  2️⃣ Evitar Rug Pulls: Preventa manual del 30% para inyectar liquidez bloqueada.<br/>
                  3️⃣ Diversificación de Reserva: PAX Gold, USDT y Solana.<br/><br/>
                  🌐 Únete ahora enviando SOL a la billetera de custodia.
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Pie de Página */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 mt-12 text-slate-400 text-xs text-center">
        <p>© 2026 Aura Gold (ARG) | Libertad y Protección | Solana Network</p>
      </footer>
    </div>
  );
}