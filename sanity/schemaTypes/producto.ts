export const producto = {
  name: "producto",
  title: "Productos CBD",
  type: "document",
  fields: [
    {
      name: "nombre",
      title: "Nombre del Producto",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: {
        source: "nombre",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "imagen",
      title: "Imagen del Producto",
      type: "image",
      options: {
        hotspot: true, // Permite recortar la imagen de forma inteligente
      },
    },
    {
      name: "precio",
      title: "Precio (€)",
      type: "number",
      validation: (Rule: any) => Rule.min(0),
    },
    {
      name: "categoria",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "Flores CBD", value: "flores" },
          { title: "Aceites y Extractos", value: "aceites" },
          { title: "Resinas y Hash", value: "resinas" },
          { title: "Parafernalia y Accesorios", value: "parafernalia" },
        ],
      },
    },
    {
      name: "descripcion",
      title: "Descripción / Propiedades",
      type: "text",
    },
    {
      name: "stock",
      title: "¿Hay Stock disponible?",
      type: "boolean",
      initialValue: true,
    },
  ],
};
