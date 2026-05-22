"use client";

interface WhatsAppBtnProps {
  nombreProducto: string;
  precio: number;
  telefono: string; // Tu número con código de país, ej: "34600000000"
}

export default function WhatsAppBtn({
  nombreProducto,
  precio,
  telefono,
}: WhatsAppBtnProps) {
  // Armamos el texto exacto con formato de negritas para WhatsApp (*texto*)
  const textoMensaje = `¡Hola! Estoy interesado en consultar la disponibilidad de *${nombreProducto}* (${precio}€) en su tienda de Málaga.`;

  // Codificamos el texto para que sea seguro en una URL
  const urlLink = `https://wa.me/${telefono}?text=${encodeURIComponent(textoMensaje)}`;

  return (
    <a
      href={urlLink}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full inline-flex items-center justify-center bg-transparent border border-zinc-800 text-zinc-400 group-hover:text-[#0a0a0a] group-hover:bg-[#c0a97a] group-hover:border-[#c0a97a] text-xs font-semibold tracking-widest uppercase py-3 px-4 transition-all duration-300"
    >
      Consultar Stock
    </a>
  );
}
// "use client";

// interface WhatsAppBtnProps {
//   nombreProducto: string;
//   precio: number;
//   telefono: string;
// }

// export default function WhatsAppBtn({
//   nombreProducto,
//   precio,
//   telefono,
// }: WhatsAppBtnProps) {
//   // Formateo del mensaje con negritas para WhatsApp
//   const textoMensaje = `¡Hola! Estoy interesado en consultar la disponibilidad de *${nombreProducto}* (${precio}€) en su tienda de Málaga.`;

//   // Construcción de la URL segura
//   const urlLink = `https://wa.me/${telefono}?text=${encodeURIComponent(textoMensaje)}`;

//   return (
//     <a
//       href={urlLink}
//       target="_blank"
//       rel="noopener noreferrer"
//       // NOTA: Si querés que el cambio de color sea SOLO al tocar el botón,
//       // cambiá "group-hover:" por "hover:" en las clases de abajo.
//       className="w-full inline-flex items-center justify-center bg-transparent border border-zinc-800 text-zinc-400 group-hover:text-[#0a0a0a] group-hover:bg-[#c0a97a] group-hover:border-[#c0a97a] text-xs font-semibold tracking-widest uppercase py-3 px-4 transition-all duration-300 select-none"
//     >
//       Consultar Stock
//     </a>
//   );
// }
