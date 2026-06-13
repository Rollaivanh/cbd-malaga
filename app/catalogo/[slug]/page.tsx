import { createClient } from "next-sanity";
import Link from "next/link";
import WhatsAppBtn from "@/app/components/WhatsAppBtn";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-05-19",
  useCdn: false,
});

// Tipado rápido para los parámetros de la URL
interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getSingleProduct(slug: string) {
  return await client.fetch(
    `*[_type == "producto" && slug.current == $slug && stock == true][0]{
      nombre,
      precio,
      categoria,
      descripcion,
      "imageUrl": imagen.asset->url
    }`,
    { slug },
  );
}

export default async function ProductDetailPage({ params }: PageProps) {
  // En Next.js 15+, los params se manejan como una Promesa
  const resolvedParams = await params;
  const prod = await getSingleProduct(resolvedParams.slug);

  const MI_TELEFONO_WHATSAPP = "34742045329"; // Tu número configurado

  // Si el producto no existe o está sin stock, mostramos un error elegante
  if (!prod) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-zinc-400 flex flex-col items-center justify-center space-y-4">
        <p className="text-sm tracking-widest uppercase font-light">
          Producto no encontrado
        </p>
        <Link
          href="/"
          className="text-xs text-[#c0a97a] underline tracking-widest uppercase"
        >
          Volver al menú
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] antialiased selection:bg-[#c0a97a]/30 selection:text-[#e8daba]">
      {/* BANNER DE ANUNCIOS */}
      <div className="bg-[#b3ab7e] text-[#0a0a0a] text-center py-2 px-4 text-xs font-bold tracking-widest uppercase">
        PRODUCTO EXCLUSIVO • DISPONIBLE PARA RETIRADA EN TIENDA
      </div>

      {/* BOTÓN DE VOLVER */}
      <div className="max-w-5xl mx-auto px-6 pt-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-zinc-500 hover:text-[#c0a97a] transition-colors group"
        >
          <span className="transition-transform group-hover:-translate-x-1">
            ←
          </span>{" "}
          Volver al Menú
        </Link>
      </div>

      {/* CONTENEDOR DE DETALLE (Layout de 2 Columnas) */}
      <main className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Columna Izquierda: Imagen del Producto */}
        <div className="relative w-full aspect-square bg-[#050505] border border-zinc-900 overflow-hidden">
          {prod.imageUrl ? (
            <img
              src={prod.imageUrl}
              alt={prod.nombre}
              className="w-full h-full object-cover opacity-90"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-700 text-xs uppercase tracking-widest font-light">
              No image available
            </div>
          )}
        </div>

        {/* Columna Derecha: Información y Compra */}
        <div className="space-y-6">
          <div className="space-y-2 border-b border-zinc-900 pb-6">
            <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#c0a97a]">
              Boutique Selection • {prod.categoria || "General"}
            </span>
            <h1 className="font-serif text-3xl md:text-4xl text-zinc-100 tracking-wide">
              {prod.nombre}
            </h1>
            <p className="font-serif text-2xl text-[#c0a97a] pt-2">
              {prod.precio}€{" "}
              <span className="text-xs text-zinc-500 font-sans font-light tracking-normal">
                / por unidad
              </span>
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs tracking-widest uppercase text-zinc-400 font-medium">
              Descripción
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light tracking-wide">
              {prod.descripcion ||
                "Este producto exclusivo ha sido rigurosamente seleccionado por The Cannabis Factory para garantizar los más altos estándares de calidad orgánica."}
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-zinc-900">
            <div className="flex items-center gap-2 text-[11px] text-zinc-500 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Stock verificado en tienda</span>
            </div>

            {/* Reutilizamos el botón dinámico de WhatsApp que creamos antes */}
            <div className="group">
              <WhatsAppBtn
                nombreProducto={prod.nombre}
                precio={prod.precio}
                telefono={MI_TELEFONO_WHATSAPP}
              />
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-zinc-900 text-center text-[10px] tracking-widest text-zinc-600 uppercase font-light">
        © 2026 THE CANNABIS FACTORY® • MALAGA
      </footer>
    </div>
  );
}
