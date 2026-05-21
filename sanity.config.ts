"use client";

// /**
//  * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
//  */

// import { visionTool } from "@sanity/vision";
// import { defineConfig } from "sanity";
// import { structureTool } from "sanity/structure";

// // Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
// import { apiVersion, dataset, projectId } from "./sanity/env";
// import { schema } from "./sanity/schemaTypes";
// import { structure } from "./sanity/structure";

// export default defineConfig({
//   basePath: "/studio",
//   projectId,
//   dataset,
//   // Add and edit the content schema in the './sanity/schemaTypes' folder
//   schema,
//   plugins: [
//     structureTool({ structure }),
//     // Vision is for querying with GROQ from inside the Studio
//     // https://www.sanity.io/docs/the-vision-plugin
//     visionTool({ defaultApiVersion: apiVersion }),
//   ],
// });
import { defineConfig, buildLegacyTheme } from "sanity";
import { structureTool } from "sanity/structure"; // <-- Restauramos la herramienta correcta
import { schema } from "./sanity/schemaTypes";

// Construimos el tema oficial sin romper los tipos de Sanity v3
const tcfTheme = buildLegacyTheme({
  /* Colores de marca y enfoque */
  "--brand-primary": "#c0a97a", // Oro viejo de la marca

  /* Tonos del panel (Boutique Oscuro) */
  "--gray-base": "#0a0a0a", // El fondo general pasa a negro mate profundo
  "--gray": "#666666",
  "--black": "#000000",
  "--white": "#ffffff",

  /* Botones y acciones principales */
  "--default-button-color": "#666666",
  "--default-button-primary-color": "#c0a97a", // El botón "Publicar" se tiñe de dorado
});

export default defineConfig({
  name: "default",
  title: "The Cannabis Factory Studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  // Usamos structureTool que es el que tu proyecto busca para levantar el panel
  plugins: [structureTool()],

  schema: schema,

  // Inyectamos el tema oscuro y elegante
  theme: tcfTheme,
});
