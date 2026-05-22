// "use client";

// import { useState } from "react";
// import WhatsAppBtn from "./WhatsAppBtn";
// import Link from "next/link";

// interface Producto {
//   _id: string;
//   nombre: string;
//   precio: number;
//   categoria: string;
//   descripcion: string;
//   imageUrl?: string;
//   slug?: { current: string }; // Configurado para soportar las URLs limpias de Sanity
// }

// interface CatalogSectionProps {
//   initialProducts: Producto[];
//   telefonoWhatsApp: string;
// }

// export default function CatalogSection({
//   initialProducts,
//   telefonoWhatsApp,
// }: CatalogSectionProps) {
//   // Estado para controlar la categoría seleccionada (por defecto 'todos')
//   const [activeCategory, setActiveCategory] = useState<string>("todos");

//   // Lista estática de pestañas basada en las opciones que configuramos en Sanity
//   const categories = [
//     { id: "todos", name: "Ver Todo" },
//     { id: "flores", name: "Flores CBD" },
//     { id: "aceites", name: "Aceites & Extractos" },
//     { id: "resinas", name: "Resinas & Hash" },
//     { id: "parafernalia", name: "Parafernalia" },
//   ];

//   // Filtramos el array en caliente según el estado
//   const filteredProducts =
//     activeCategory === "todos"
//       ? initialProducts
//       : initialProducts.filter((prod) => prod.categoria === activeCategory);

//   return (
//     <section className="space-y-12">
//       {/* 1. TABS / SELECTOR DE CATEGORÍAS MINIMALISTA */}
//       <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-b border-zinc-900 pb-6">
//         {categories.map((cat) => (
//           <button
//             key={cat.id}
//             onClick={() => setActiveCategory(cat.id)}
//             className={`text-xs tracking-[0.2em] uppercase transition-all duration-300 relative pb-2 font-light ${
//               activeCategory === cat.id
//                 ? "text-[#c0a97a] font-medium"
//                 : "text-zinc-500 hover:text-zinc-300"
//             }`}
//           >
//             {cat.name}
//             {/* Línea dorada sutil debajo de la pestaña activa */}
//             {activeCategory === cat.id && (
//               <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#c0a97a] animate-fade-in" />
//             )}
//           </button>
//         ))}
//       </div>

//       {/* Indicador de cantidad de ítems encontrados */}
//       <div className="flex justify-end text-[10px] font-mono tracking-wider text-zinc-600 uppercase">
//         [{filteredProducts.length} items encontrados]
//       </div>

//       {/* 2. GRID DINÁMICO DE PRODUCTOS */}
//       {filteredProducts.length === 0 ? (
//         <div className="text-center py-24 bg-zinc-900/10 border border-zinc-900">
//           <p className="text-zinc-600 text-sm tracking-wider uppercase font-light">
//             No hay productos disponibles en esta categoría.
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredProducts.map((prod) => (
//             <article
//               key={prod._id}
//               className="group relative flex flex-col justify-between bg-[#0e0e0e] border border-zinc-900 rounded-none p-5 transition-all duration-300 hover:border-[#c0a97a]/40"
//             >
//               <div className="space-y-5">
//                 {/* Envoltorio Link en Imagen */}
//                 <Link
//                   href={`/catalogo/${prod.slug?.current || prod._id}`}
//                   className="block"
//                 >
//                   {prod.imageUrl ? (
//                     <div className="relative w-full h-64 bg-[#050505] overflow-hidden border border-zinc-900">
//                       <img
//                         src={prod.imageUrl}
//                         alt={prod.nombre}
//                         className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
//                       />
//                     </div>
//                   ) : (
//                     <div className="w-full h-64 bg-[#070707] border border-zinc-900 flex items-center justify-center text-zinc-700 text-xs uppercase tracking-widest font-light">
//                       No image available
//                     </div>
//                   )}
//                 </Link>

//                 {/* Detalles del Ítem */}
//                 <div className="space-y-2">
//                   <div className="flex items-baseline justify-between gap-4">
//                     {/* Envoltorio Link en Título */}
//                     <Link href={`/catalogo/${prod.slug?.current || prod._id}`}>
//                       <h3 className="font-serif text-lg text-zinc-200 group-hover:text-[#c0a97a] transition-colors tracking-wide cursor-pointer">
//                         {prod.nombre}
//                       </h3>
//                     </Link>

//                     <span className="font-serif text-base text-[#c0a97a] font-medium whitespace-nowrap">
//                       {prod.precio}€
//                     </span>
//                   </div>

//                   <span className="inline-block text-[10px] tracking-[0.2em] uppercase font-semibold text-zinc-600">
//                     {categories.find((c) => c.id === prod.categoria)?.name ||
//                       "Boutique"}
//                   </span>

//                   <p className="text-xs text-zinc-500 leading-relaxed font-light pt-1 line-clamp-2">
//                     {prod.descripcion ||
//                       "Exclusive item selected by The Cannabis Factory."}
//                   </p>
//                 </div>
//               </div>

//               {/* Botón dinámico */}
//               <div className="pt-6 mt-auto">
//                 <WhatsAppBtn
//                   nombreProducto={prod.nombre}
//                   precio={prod.precio}
//                   telefono={telefonoWhatsApp}
//                 />
//               </div>
//             </article>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }
"use client";

import { useState } from "react";
import WhatsAppBtn from "./WhatsAppBtn";
import Link from "next/link";
import Image from "next/image"; // <--- Optimización de rendimiento

interface Producto {
  _id: string;
  nombre: string;
  precio: number;
  categoria: string;
  descripcion: string;
  imageUrl?: string;
  slug?: { current: string };
}

interface CatalogSectionProps {
  initialProducts: Producto[];
  telefonoWhatsApp: string;
}

export default function CatalogSection({
  initialProducts,
  telefonoWhatsApp,
}: CatalogSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("todos");

  // Ajustadas las IDs para que coincidan exactamente con tu esquema de Sanity
  const categories = [
    { id: "todos", name: "Ver Todo" },
    { id: "flores", name: "Flores CBD" },
    { id: "extracciones", name: "Extracciones & Hash" },
    { id: "aceites", name: "Aceites CBD" },
    { id: "accesorios", name: "Accesorios" },
  ];

  const filteredProducts =
    activeCategory === "todos"
      ? initialProducts
      : initialProducts.filter((prod) => prod.categoria === activeCategory);

  return (
    <section className="space-y-12">
      {/* 1. TABS / SELECTOR DE CATEGORÍAS */}
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-b border-zinc-900 pb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`text-xs tracking-[0.2em] uppercase transition-all duration-300 relative pb-2 font-light ${
              activeCategory === cat.id
                ? "text-[#c0a97a] font-medium"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {cat.name}
            {activeCategory === cat.id && (
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#c0a97a] animate-fade-in" />
            )}
          </button>
        ))}
      </div>

      {/* Indicador de cantidad */}
      <div className="flex justify-end text-[10px] font-mono tracking-wider text-zinc-600 uppercase">
        [{filteredProducts.length} items encontrados]
      </div>

      {/* 2. GRID DINÁMICO DE PRODUCTOS */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-24 bg-zinc-900/10 border border-zinc-900">
          <p className="text-zinc-600 text-sm tracking-wider uppercase font-light">
            No hay productos disponibles en esta categoría.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prod) => (
            <article
              key={prod._id}
              className="group relative flex flex-col justify-between bg-[#0e0e0e] border border-zinc-900 rounded-none p-5 transition-all duration-300 hover:border-[#c0a97a]/40"
            >
              <div className="space-y-5">
                {/* Imagen optimizada */}
                <Link
                  href={`/catalogo/${prod.slug?.current || prod._id}`}
                  className="block"
                >
                  {prod.imageUrl ? (
                    <div className="relative w-full h-64 bg-[#050505] overflow-hidden border border-zinc-900">
                      <Image
                        src={prod.imageUrl}
                        alt={prod.nombre}
                        fill
                        sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                        className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-64 bg-[#070707] border border-zinc-900 flex items-center justify-center text-zinc-700 text-xs uppercase tracking-widest font-light">
                      No image available
                    </div>
                  )}
                </Link>

                {/* Detalles del Ítem */}
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between gap-4">
                    <Link href={`/catalogo/${prod.slug?.current || prod._id}`}>
                      <h3 className="font-serif text-lg text-zinc-200 group-hover:text-[#c0a97a] transition-colors tracking-wide cursor-pointer">
                        {prod.nombre}
                      </h3>
                    </Link>

                    <span className="font-serif text-base text-[#c0a97a] font-medium whitespace-nowrap">
                      {prod.precio}€
                    </span>
                  </div>

                  <span className="inline-block text-[10px] tracking-[0.2em] uppercase font-semibold text-zinc-600">
                    {categories.find((c) => c.id === prod.categoria)?.name ||
                      "Boutique"}
                  </span>

                  <p className="text-xs text-zinc-500 leading-relaxed font-light pt-1 line-clamp-2">
                    {prod.descripcion ||
                      "Exclusive item selected by The Cannabis Factory."}
                  </p>
                </div>
              </div>

              {/* Botón de WhatsApp */}
              <div className="pt-6 mt-auto">
                <WhatsAppBtn
                  nombreProducto={prod.nombre}
                  precio={prod.precio}
                  telefono={telefonoWhatsApp}
                />
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
