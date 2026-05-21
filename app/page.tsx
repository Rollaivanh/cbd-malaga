import { createClient } from "next-sanity";
import CatalogSection from "@/app/components/CatalogSection";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-05-19",
  useCdn: false,
});

async function getProductos() {
  return await client.fetch(`*[_type == "producto" && stock == true]{
    _id,
    nombre,
    precio,
    categoria,
    descripcion,
    slug,
    "imageUrl": imagen.asset->url
  }`);
}

export default async function Home() {
  const productos = await getProductos();

  //
  const MI_TELEFONO_WHATSAPP =
    process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "34742045505";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] antialiased selection:bg-[#c0a97a]/30 selection:text-[#e8daba]">
      {/* BANNER DE ANUNCIOS */}
      <div className="bg-[#b3ab7e] text-[#0a0a0a] text-center py-2 px-4 text-xs font-bold tracking-widest uppercase">
        UTILIZA EL CÓDIGO CANNAOFF Y OBTÉN UN 10% DE DESCUENTO EXTRA / USING THE
        CODE CANNAOFF YOU GET 10% OFF
      </div>

      <header className="border-b border-zinc-900 bg-[#0a0a0a] py-12 text-center space-y-6">
        <div className="space-y-1">
          <p className="text-xs tracking-[0.4em] text-[#c0a97a] uppercase font-light">
            T H E
          </p>
          <h1 className="text-4xl md:text-6xl font-serif tracking-[0.15em] text-[#c0a97a] uppercase font-normal">
            Cannabis
          </h1>
          <p className="text-sm tracking-[0.6em] text-[#c0a97a] uppercase font-light pt-1">
            Store
          </p>
        </div>
        <p className="text-zinc-500 text-xs md:text-sm tracking-widest uppercase max-w-xl mx-auto font-light px-6">
          Málaga Centro • Exclusive Cannabis Boutique
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <CatalogSection
          initialProducts={productos}
          telefonoWhatsApp={MI_TELEFONO_WHATSAPP}
        />
      </main>

      {/* FOOTER PREMIUM */}
      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-6 text-[10px] tracking-widest text-zinc-600 uppercase font-light">
        <p>© 2026 THE CANNABIS FACTORY® • MALAGA</p>
        <p className="font-mono text-[9px] text-zinc-700">
          Next.js & Sanity Architecture
        </p>
      </footer>
    </div>
  );
}
