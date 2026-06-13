"use client";

import { useEffect, useState } from "react";

export default function AgeVerifier() {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  useEffect(() => {
    // Comprobamos si el usuario ya aceptó previamente en este navegador
    const consent = localStorage.getItem("tcf-age-verified");
    if (consent === "true") {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  }, []);

  // Mientras comprueba el localStorage, no renderizamos nada para evitar parpadeos
  if (isVerified === null) return null;

  if (isVerified) return null;

  const handleAccept = () => {
    localStorage.setItem("tcf-age-verified", "true");
    setIsVerified(true);
  };

  const handleReject = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] z-50 flex flex-col items-center justify-center p-6 select-none antialiased">
      <div className="absolute inset-4 border border-zinc-900/60 pointer-events-none flex flex-col justify-between p-4">
        <div className="flex justify-between text-[10px] tracking-[0.3em] text-zinc-700 uppercase font-light">
          <span>TCS • Est. 2026</span>
          <span>Boutique</span>
        </div>
        <div className="flex justify-between text-[10px] tracking-[0.3em] text-zinc-700 uppercase font-light">
          <span>Málaga Centro</span>
          <span>Restricted</span>
        </div>
      </div>

      <div className="max-w-md w-full text-center space-y-10 z-10 px-4">
        <div className="space-y-1">
          <p className="text-[10px] tracking-[0.4em] text-[#c0a97a] uppercase font-light">
            T H E
          </p>
          <h2 className="text-3xl font-serif tracking-[0.15em] text-[#c0a97a] uppercase font-normal">
            Cannabis
          </h2>
          <p className="text-xs tracking-[0.5em] text-[#c0a97a] uppercase font-light pt-0.5">
            STORE
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs tracking-[0.2em] uppercase text-zinc-400 font-semibold">
            Verificación de Edad Obligatoria
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed font-light tracking-wide">
            El acceso a este catálogo digital contiene información sobre
            productos de CBD y parafernalia restringidos para menores de edad.
            Para ingresar, confirma que eres mayor de 18 años.
          </p>
        </div>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xs mx-auto">
          <button
            onClick={handleAccept}
            className="w-full bg-[#c0a97a] text-[#0a0a0a] text-xs font-bold tracking-widest uppercase py-3.5 px-6 transition-all duration-300 hover:bg-[#e8daba]"
          >
            Soy mayor de 18
          </button>
          <button
            onClick={handleReject}
            className="w-full bg-transparent border border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700 text-xs font-semibold tracking-widest uppercase py-3.5 px-6 transition-all duration-300"
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  );
}
