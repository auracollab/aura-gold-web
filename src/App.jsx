import React, { useState } from 'react';

export default function AuraGoldWeb() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [copied, setCopied] = useState(false);

  const walletCustodia = "2NjhoA5TKiVKja9Gq8iPht5ya5Ho8yo2AEUbv37aGDTa";
  const mintAddress = "22gYFgCNLcyRrLhrMtBSq3uwRhvfCA7wUGzG8QzCycqc";

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-black">
      
      {/* HEADER / NAV */}
      <header className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="https://pbs.twimg.com/profile_images/2066640311367913472/59CqIwqA_400x400.jpg" 
              alt="Aura Gold Logo" 
              className="w-10 h-10 rounded-full border border-amber-500"
            />
            <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent">
              AURA GOLD
            </span>
          </div>
          <nav className="flex gap-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
            {['inicio', 'whitepaper', 'roadmap', 'preventa'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all capitalize ${
                  activeTab === tab 
                    ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/10' 
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* SECCIÓN PRINCIPAL (DINÁMICA) */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        
        {/* TAB: INICIO */}
        {activeTab === 'inicio' && (
          <div className="space-y-16 animate-fadeIn">
            {/* Hero */}
            <div className="text-center space-y-6 py-8">
              <span className="px-3 py-1 text-xs font-semibold tracking-widest text-amber-400 uppercase bg-amber-500/10 border border-amber-500/20 rounded-full">
                Solana Ecosystem
              </span>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
                Tu Reserva de Valor en la <br />
                <span className="bg-gradient-to-r from-purple-500 via-indigo-400 to-amber-400 bg-clip-text text-transparent">
                  Red Solana
                </span>
              </h1>
              <p className="text-neutral-400 text-lg max-w-xl mx-auto leading-relaxed">
                Libertad financiera, seguridad y protección contra la inflación. Más que un token, un refugio digital diseñado a largo plazo. Sin hype vacío, solo fundamentos.
              </p>
              <div className="flex justify-center gap-4 pt-4">
                <button 
                  onClick={() => setActiveTab('preventa')}
                  className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-6 py-3 rounded-lg transition-all transform hover:-translate-y-0.5"
                >
                  Unirse a la Preventa
                </button>
                <a 
                  href="https://x.com/AuraGoldARG" 
                  target="_blank" 
                  rel="noreferrer"
                  className="border border-neutral-700 hover:border-neutral-500 bg-neutral-900 text-white font-medium px-6 py-3 rounded-lg transition-all flex items-center gap-2"
                >
                  Comunidad X (Twitter)
                </a>
              </div>
            </div>

            {/* Datos Técnicos */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Transparencia en la Cadena (On-Chain)
              </h2>
              <div className="grid gap-4 text-sm">
                <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <div>
                    <p className="text-xs text-neutral-500 font-mono">MINT ADDRESS</p>
                    <p className="text-neutral-300 font-mono break-all">{mintAddress}</p>
                  </div>
                  <button 
                    onClick={() => handleCopy(mintAddress)}
                    className="text-xs bg-neutral-900 hover:bg-neutral-800 text-amber-400 px-3 py-1.5 rounded border border-neutral-700 whitespace-nowrap"
                  >
                    {copied ? '¡Copiado!' : 'Copiar'}
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                    <p className="text-xs text-neutral-500">SUMINISTRO INICIAL</p>
                    <p className="text-lg font-bold text-white">1.000.000.000 ARG</p>
                  </div>
                  <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                    <p className="text-xs text-neutral-500">PRECIO PREVENTA</p>
                    <p className="text-lg font-bold text-amber-400">$0.01 USD <span className="text-xs text-neutral-500">(En SOL)</span></p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <a href="https://solscan.io/token/22gYFgCNLcyRrLhrMtBSq3uwRhvfCA7wUGzG8QzCycqc" target="_blank" rel="noreferrer" className="text-xs text-neutral-400 hover:text-white underline">Ver en SolScan</a>
                <span className="text-neutral-700">•</span>
                <a href="https://explorer.solana.com/address/22gYFgCNLcyRrLhrMtBSq3uwRhvfCA7wUGzG8QzCycqc?cluster=mainnet" target="_blank" rel="noreferrer" className="text-xs text-neutral-400 hover:text-white underline">Ver en Solana Explorer</a>
              </div>
            </div>
          </div>
        )}

        {/* TAB: WHITEPAPER */}
        {activeTab === 'whitepaper' && (
          <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto prose prose-invert">
            <h2 className="text-3xl font-bold text-white border-b border-neutral-800 pb-4">Whitepaper de Visión</h2>
            
            <section className="space-y-3">
              <h3 className="text-xl font-semibold text-amber-400">1. Filosofía Antinflacionaria</h3>
              <p className="text-neutral-400 leading-relaxed">
                Aura Gold (ARG) nace bajo la premisa de ser una alternativa financiera sólida dentro de la blockchain de Solana. Rechazamos categóricamente el modelo de las <em>memecoins</em> efímeras y las prácticas nocivas como el <em>Rug Pull</em>. Nuestra estructura está diseñada para inversores que buscan construir valor y resguardar su capital en horizontes temporales amplios.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-semibold text-amber-400">2. Los 3 Pilares de la Reserva</h3>
              <p className="text-neutral-400 leading-relaxed">
                Para mitigar la volatilidad extrema del mercado cripto clásico, los fondos de la tesorería de Aura Gold se diversificarán de manera inteligente en tres activos clave:
              </p>
              <div className="grid sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800 text-center">
                  <h4 className="font-bold text-white">PAXGold</h4>
                  <p className="text-xs text-neutral-400 mt-1">Respaldo y estabilidad vinculada al oro físico real.</p>
                </div>
                <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800 text-center">
                  <h4 className="font-bold text-white">USDT</h4>
                  <p className="text-xs text-neutral-400 mt-1">Liquidez inmediata en moneda estable de dólar.</p>
                </div>
                <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800 text-center">
                  <h4 className="font-bold text-white">Solana</h4>
                  <p className="text-xs text-neutral-400 mt-1">Exposición directa a la red blockchain más veloz.</p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-semibold text-amber-400">3. Mecanismo Deflacionario (Quemas)</h3>
              <p className="text-neutral-400 leading-relaxed">
                El protocolo ejecutará <strong>quemas programadas de tokens</strong> en ciclos estratégicos. Al reducir sistemáticamente la oferta circulante total, generamos una escasez orgánica destinada a favorecer el poder adquisitivo de los tenedores a largo plazo.
              </p>
            </section>
          </div>
        )}

        {/* TAB: ROADMAP */}
        {activeTab === 'roadmap' && (
          <div className="space-y-8 animate-fadeIn max-w-xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center pb-4">Hoja de Ruta</h2>
            
            <div className="space-y-8 relative border-l-2 border-neutral-800 pl-6 ml-4">
              <div className="relative">
                <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-amber-500 ring-4 ring-neutral-950"></span>
                <h3 className="text-lg font-bold text-white">Fase 1: Lanzamiento y Preventa Manual</h3>
                <p className="text-sm text-neutral-400 mt-1">
                  Despliegue del token ARG en Solana. Venta inicial del 30% del suministro a precio fijo ($0.01) gestionado a través de wallet institucional de custodia para financiar la infraestructura pesada.
                </p>
              </div>
              
              <div className="relative">
                <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-neutral-700 ring-4 ring-neutral-950"></span>
                <h3 className="text-lg font-bold text-neutral-300">Fase 2: Automatización e Intercambio</h3>
                <p className="text-sm text-neutral-400 mt-1">
                  Financiación y despliegue del <strong>Smart Contract</strong> automatizado para el intercambio directo Aura Gold/SOL. Distribución masiva de tokens a compradores y listado oficial en <strong>Raydium</strong>.
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-neutral-700 ring-4 ring-neutral-950"></span>
                <h3 className="text-lg font-bold text-neutral-300">Fase 3: Estabilidad y Quemas</h3>
                <p className="text-sm text-neutral-400 mt-1">
                  Activación del fondo de reserva diversificado en los 3 pilares estratégicos e inicio de las fases de quema periódicas para inducir escasez en el mercado.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB: PREVENTA */}
        {activeTab === 'preventa' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white">Fase de Preventa Estratégica</h2>
              <p className="text-neutral-400 text-sm">Distribución inicial y transparente del 30% de los tokens de manera directa.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Instrucciones de pago */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-amber-400">¿Cómo participar en la Preventa?</h3>
                <ol className="space-y-3 text-sm text-neutral-300 list-decimal list-inside">
                  <li>Envía la cantidad de **SOL** que desees invertir a la dirección oficial de custodia que figura abajo.</li>
                  <li>La tasa de asignación se calculará a razón de <strong>$0.01 USD por cada token ARG</strong> en base al valor actual de SOL.</li>
                  <li>Una vez alcanzado el objetivo o finalizadas las 3 subfases, se ejecutará el envío masivo directo a la billetera de origen de tus fondos.</li>
                  <li>Durante este periodo, la recaudación financiará el desarrollo del contrato inteligente puente de automatización.</li>
                </ol>
                
                <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 space-y-1">
                  <p className="text-xs text-neutral-500 font-mono">BILLETERA DE CUSTODIA OFICIAL</p>
                  <p className="text-xs text-neutral-300 font-mono break-all">{walletCustodia}</p>
                  <button 
                    onClick={() => handleCopy(walletCustodia)}
                    className="text-xs text-amber-400 font-medium hover:underline pt-1 block"
                  >
                    {copied ? '¡Copiado con éxito!' : 'Copiar dirección de wallet'}
                  </button>
                </div>
              </div>

              {/* Cómo ver en Phantom */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-purple-400">Ver tus ARG en Phantom Wallet</h3>
                <p className="text-xs text-neutral-400">Sigue estos pasos dentro de tu aplicación para visualizar correctamente el saldo del activo:</p>
                <ul className="space-y-3 text-sm text-neutral-300">
                  <li className="flex gap-2">
                    <span className="text-purple-400 font-bold">1.</span> Abre tu billetera Phantom.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-400 font-bold">2.</span> Haz clic en "Administrar lista de tokens" o en el botón "+".
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-400 font-bold">3.</span> Pega la dirección de acuñación (Mint Address) de Aura Gold.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-400 font-bold">4.</span> ¡Confirmar! El token ARG aparecerá integrado a tu interfaz de activos.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER & DISCLAIMER */}
      <footer className="border-t border-neutral-900 bg-neutral-950 text-neutral-500 text-xs mt-24 py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <div className="bg-neutral-900/50 p-4 rounded-xl border border-neutral-800 text-justify leading-relaxed">
            <strong>Cláusula de exención de responsabilidad (Disclaimer):</strong> Ninguna persona está obligada o coaccionada a invertir en el ecosistema del token Aura Gold (ARG). Toda asignación de capital corre bajo riesgo y responsabilidad absoluta del usuario, asumiendo que ha realizado sus debidas investigaciones independientes (DYOR). No comprometa nunca capital o recursos financieros que no esté completamente dispuesto a perder debido a la volatilidad implícita en los mercados digitales.
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-neutral-600">
            <p>© {new Date().getFullYear()} Aura Gold Project. Desarrollado con integridad en Solana Network.</p>
            <p>Twitter: @AuraGoldARG</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
