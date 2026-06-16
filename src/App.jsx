import React, { useState } from 'react';

export default function AuraGoldWeb() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [copied, setCopied] = useState(false);
  
  // Estado para el simulador de conversión
  const [solInput, setSolInput] = useState('1');

  const walletCustodia = "2NjhoA5TKiVKja9Gq8iPht5ya5Ho8yo2AEUbv37aGDTa";
  const mintAddress = "22gYFgCNLcyRrLhrMtBSq3uwRhvfCA7wUGzG8QzCycqc";
  
  // Datos de precio fijados a la fecha actual (16 de Junio de 2026)
  const solPriceUsd = 73.73; 
  const argPriceUsd = 0.01;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Lógica de simulación de Aura Gold recibidos
  const solAmount = parseFloat(solInput) || 0;
  const estimatedArg = (solAmount * solPriceUsd) / argPriceUsd;
  const isBelowMinimum = solAmount < 0.1 && solAmount > 0;

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
            {['inicio', 'whitepaper', 'roadmap', 'preventa', 'simulador'].map((tab) => (
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

      {/* SECCIÓN PRINCIPAL */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        
        {/* TAB: INICIO */}
        {activeTab === 'inicio' && (
          <div className="space-y-16 animate-fadeIn">
            {/* Hero */}
            <div className="text-center space-y-6 py-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-amber-400 uppercase bg-amber-500/10 border border-amber-500/20 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                Solana Ecosystem • Precio SOL: ${solPriceUsd} USD
              </div>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
                Tu Reserva de Valor en la <br />
                <span className="bg-gradient-to-r from-purple-500 via-indigo-400 to-amber-400 bg-clip-text text-transparent">
                  Red Solana
                </span>
              </h1>
              <p className="text-neutral-400 text-lg max-w-xl mx-auto leading-relaxed">
                Libertad financiera, seguridad y protección contra la inflación. Más que un token, un refugio digital diseñado a largo plazo sin volatilidad artificial.
              </p>
              <div className="flex justify-center gap-4 pt-4">
                <button 
                  onClick={() => setActiveTab('preventa')}
                  className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-6 py-3 rounded-lg transition-all transform hover:-translate-y-0.5"
                >
                  Unirse a la Preventa
                </button>
                <button 
                  onClick={() => setActiveTab('simulador')}
                  className="border border-neutral-700 hover:border-neutral-500 bg-neutral-900 text-white font-medium px-6 py-3 rounded-lg transition-all"
                >
                  Calcular Tokens
                </button>
              </div>
            </div>

            {/* Datos Técnicos */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                Transparencia On-Chain
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
                    <p className="text-xs text-neutral-500">PRECIO FIJO PREVENTA</p>
                    <p className="text-lg font-bold text-amber-400">$0.01 USD <span className="text-xs text-neutral-500">(en SOL)</span></p>
                  </div>
                </div>
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
                Aura Gold (ARG) nace bajo la premisa de ser una alternativa financiera sólida dentro de la blockchain de Solana. Rechazamos categóricamente el modelo de las <em>memecoins</em> efímeras. Nuestra estructura está diseñada para inversores que buscan construir valor a largo plazo.
              </p>
            </section>
            <section className="space-y-3">
              <h3 className="text-xl font-semibold text-amber-400">2. Los 3 Pilares de la Reserva</h3>
              <p className="text-neutral-400 leading-relaxed">
                La tesorería diversificará sus fondos en tres activos clave para asegurar robustez matemática: **PAXGold** (respaldo en oro físico), **USDT** (estabilidad fiduciaria) y **Solana** (potencial tecnológico).
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
                <h3 className="text-lg font-bold text-white">Fase 1: Preventa Manual y Contrato</h3>
                <p className="text-sm text-neutral-400 mt-1">
                  Distribución inicial controlada del 30% del suministro. Recaudación asignada directamente al desarrollo y auditoría del Smart Contract automatizado.
                </p>
              </div>
              <div className="relative">
                <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-neutral-700 ring-4 ring-neutral-950"></span>
                <h3 className="text-lg font-bold text-neutral-300">Fase 2: Listado en Raydium</h3>
                <p className="text-sm text-neutral-400 mt-1">
                  Envío masivo programado de tokens a las wallets compradoras y apertura de la pool de liquidez en Raydium.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB: PREVENTA */}
        {activeTab === 'preventa' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white">Fase de Preventa</h2>
              <p className="text-neutral-400 text-sm">Instrucciones y requerimientos de red imperativos.</p>
            </div>

            {/* AVISO IMPORTANTE DE MÍNIMO DE COMPRA */}
            <div className="bg-red-950/40 border border-red-800/60 rounded-xl p-4 flex gap-3 items-start">
              <span className="text-red-400 text-xl font-bold leading-none">⚠️</span>
              <div>
                <h4 className="text-red-400 font-bold text-sm uppercase tracking-wide">Cláusula de Transferencia Mínima</h4>
                <p className="text-red-200/80 text-xs mt-1 leading-relaxed">
                  El monto mínimo de participación es estrictamente de <strong>0.1 SOL</strong>. Cualquier transferencia recibida en nuestra billetera de custodia por un valor inferior a 0.1 SOL <strong>no será computada, no generará derecho a asignación de tokens ARG y no será reembolsada</strong> debido a costos operacionales de red.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-amber-400">¿Cómo enviar tus fondos?</h3>
                <ol className="space-y-3 text-sm text-neutral-300 list-decimal list-inside">
                  <li>Envía un mínimo de 0.1 SOL desde tu wallet personal.</li>
                  <li>No envíes desde exchanges centralizados (Binance, Bybit, etc.).</li>
                  <li>Al cerrarse la fase, recibirás tus tokens directamente.</li>
                </ol>
                <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 space-y-1">
                  <p className="text-xs text-neutral-500 font-mono">WALLET DE CUSTODIA OFICIAL</p>
                  <p className="text-xs text-neutral-300 font-mono break-all">{walletCustodia}</p>
                  <button onClick={() => handleCopy(walletCustodia)} className="text-xs text-amber-400 font-medium hover:underline pt-1 block">
                    {copied ? '¡Copiado!' : 'Copiar wallet'}
                  </button>
                </div>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-purple-400">Visualizar en Phantom</h3>
                <ul className="space-y-2 text-sm text-neutral-300">
                  <li>1. Abre Phantom Wallet y pulsa "+".</li>
                  <li>2. Selecciona "Administrar lista de tokens".</li>
                  <li>3. Pega la Mint Address oficial del proyecto.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB: SIMULADOR / CONVERSOR */}
        {activeTab === 'simulador' && (
          <div className="max-w-md mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6 animate-fadeIn">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white">Calculadora de Conversión ARG</h3>
              <p className="text-neutral-400 text-xs mt-1">Calculado en base al precio de SOL de hoy (${solPriceUsd} USD)</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5 uppercase tracking-wider">Cantidad de Solana (SOL)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    step="0.01"
                    min="0"
                    value={solInput}
                    onChange={(e) => setSolInput(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="0.00"
                  />
                  <span className="absolute right-4 top-3.5 text-sm font-bold text-purple-400 font-mono">SOL</span>
                </div>
              </div>

              {/* Error por debajo del mínimo */}
              {isBelowMinimum && (
                <p className="text-red-400 text-xs font-medium bg-red-950/30 p-2 rounded border border-red-900/50">
                  ⚠️ Error: El monto ingresado es menor al mínimo requerido de 0.1 SOL. Esta transacción sería descartada.
                </p>
              )}

              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2">
                <p className="text-xs text-neutral-500 uppercase tracking-wider">Monto estimado a recibir</p>
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-black font-mono text-amber-400">
                    {isBelowMinimum ? '0' : estimatedArg.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-sm font-bold text-neutral-400 font-mono">ARG Tokens</span>
                </div>
                <div className="text-[11px] text-neutral-500 border-t border-neutral-900 pt-2 space-y-0.5">
                  <p>• Equivalencia en USD: ${(solAmount * solPriceUsd).toFixed(2)}</p>
                  <p>• Costo por unidad ARG: ${argPriceUsd} USD</p>
                </div>
              </div>

              <button 
                onClick={() => setActiveTab('preventa')}
                disabled={isBelowMinimum || solAmount === 0}
                className={`w-full font-bold py-3 rounded-xl transition-all ${
                  isBelowMinimum || solAmount === 0
                    ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed'
                    : 'bg-amber-500 hover:bg-amber-400 text-neutral-950'
                }`}
              >
                Ir a depositar fondos
              </button>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER & DISCLAIMER */}
      <footer className="border-t border-neutral-900 bg-neutral-950 text-neutral-500 text-xs mt-24 py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <div className="bg-neutral-900/50 p-4 rounded-xl border border-neutral-800 text-justify leading-relaxed">
            <strong>Disclaimer Regulatorio:</strong> Ninguna persona está obligada a invertir en Aura Gold (ARG). Toda asignación de capital corre bajo riesgo y responsabilidad absoluta del usuario (DYOR). No comprometa nunca capital que no esté completamente dispuesto a perder debido a la volatilidad implícita en los criptoactivos. Las transacciones menores a 0.1 SOL no se procesarán por motivos estructurales.
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-neutral-600">
            <p>© 2026 Aura Gold Project. Desarrollado con integridad en Solana Network.</p>
            <p>Twitter: @AuraGoldARG</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
