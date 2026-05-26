# Guía de Administración — hombredebarro.com

Esta guía está pensada para **Christian** e **Ignacio**: explica cómo cargar y editar todo el contenido del sitio web sin tocar código.

---

## 1. Acceder al panel

1. Abrir un navegador y entrar a **https://hombredebarro.com/admin**
2. Iniciar sesión con el email y la contraseña que recibiste.
3. Vas a ver un menú lateral con todas las secciones editables.

> **Tip:** Si olvidaste la contraseña, hacé clic en *"¿Olvidaste tu contraseña?"* y pediremos al sistema que te mande un mail.

---

## 2. La biblioteca de imágenes ("Media Library")

Antes de cargar un proyecto o artículo conviene subir las fotos.

1. En el menú lateral hacé clic en **Media Library** (icono de carpeta).
2. Hacé clic en **Add new assets** → arrastrá fotos o seleccionalas.
3. Recomendaciones:
   - **Tamaño:** ancho máximo de 1600 px.
   - **Formato:** JPG para fotos, PNG para logos.
   - **Peso:** hasta 500 KB por imagen (más liviano = sitio más rápido).
   - **Texto alternativo:** describir brevemente qué se ve en la foto (importante para accesibilidad y SEO).

### Carpetas sugeridas
Para mantener el orden:
```
📁 Proyectos/
    📁 Nina Huasi/
    📁 Aguas del Sol/
    📁 ...
📁 Biblioteca/
    📁 Guías/
    📁 Planos PDF/
📁 Equipo/
📁 Blog/
📁 General/
```

Crear una carpeta con **"Add new folder"** y arrastrar los archivos dentro.

---

## 3. Crear un Proyecto

1. Menú lateral → **Content Manager** → **Proyectos** → **Create new entry**.
2. Completar los campos:

| Campo | Para qué sirve |
|---|---|
| **Título** | Nombre del proyecto (ej. "Nina Huasi") |
| **Slug** | Se genera solo a partir del título. No tocar a menos que sepas lo que hacés. |
| **Ubicación** | Localidad y provincia |
| **Superficie m²** | Metros cuadrados cubiertos |
| **Año** | Año de finalización |
| **Estado** | diseño / en_obra / terminado |
| **Descripción corta** | Una frase para la tarjeta del listado (máx. 220 caracteres) |
| **Descripción** | Texto completo del proyecto (con títulos, fotos, listas) |
| **Imagen principal** | Foto que aparece arriba en la página del proyecto |
| **Galería** | Más fotos (cliqueables, con lightbox) |
| **Plano PDF** | Plano descargable |
| **Video URL** | Link a YouTube o Vimeo (opcional) |
| **Ficha técnica** | Tabla de datos (Muros, Cubierta, Calefacción...) — agregar tantos ítems como necesites |
| **Testimonial texto** y **autor** | Cita del cliente (opcional) |
| **Destacado** | ✅ marcar si querés que aparezca en la portada |
| **Color acento** | Color HEX de la tarjeta (ej. `#4a6741`) |
| **Técnicas** | Elegir una o más técnicas constructivas |

3. Cuando esté listo: arriba a la derecha, hacé clic en **Save** (guarda como borrador) y luego en **Publish** para que aparezca en el sitio.

> El sitio se actualiza solo en aproximadamente **1 minuto** después de publicar.

---

## 4. Crear un artículo de la Biblioteca

1. **Content Manager** → **Artículos — Biblioteca** → **Create new entry**.
2. Campos importantes:
   - **Tipo:** elegir entre `guía`, `plano` o `artículo`. Cambia el color del borde superior en la tarjeta.
   - **Dificultad:** Básico / Intermedio / Avanzado.
   - **Tiempo lectura:** ej. "18 min".
   - **Extracto:** resumen para la tarjeta del listado (máx. 320 caracteres).
   - **Contenido:** el cuerpo del artículo, con el editor de bloques (ver §5).
   - **Imagen portada:** la foto destacada.
   - **Tiene planos:** ✅ si tiene planos descargables — agrega el badge "📐 Planos" en la tarjeta.
   - **Archivos descarga:** PDFs, DWG, etc.
   - **Galería proceso:** fotos paso a paso.
   - **Materiales** / **Herramientas:** listas en texto enriquecido (Markdown).
   - **Categoría:** elegir una de la biblioteca.
   - **Destacado:** ✅ para aparecer en la portada.

3. **Save** → **Publish**.

---

## 5. El editor de bloques (Rich Text)

Tanto los proyectos como los artículos y el blog usan el **Blocks Editor** de Strapi. Funciona parecido a Notion:

- Hacé clic en **+** para insertar un nuevo bloque.
- Tipos de bloque disponibles:
  - **Heading** (h2, h3, h4) — títulos y subtítulos.
  - **Paragraph** — texto normal.
  - **Bulleted list / Numbered list** — listas.
  - **Quote** — citas destacadas.
  - **Code** — código (raramente útil acá).
  - **Image** — subí o elegí una imagen de la Media Library.
- Para **negrita** o **cursiva** seleccioná el texto y usá la barra que aparece.
- Para insertar un link: seleccionar texto → icono de cadena.

> **Tip:** No copies texto con formato directamente desde Word — pegalo primero en un editor plano (Bloc de notas) para limpiar el formato.

---

## 6. Escribir un post del blog

1. **Content Manager** → **Entradas de Blog** → **Create new entry**.
2. Campos: igual que un artículo, pero más simple — sin planos ni materiales.
3. Elegir una **categoría** (Noticias, Talleres, Eventos, Opinión).
4. **Save** → **Publish**.

---

## 7. Actualizar la portada (Página: Inicio)

1. **Content Manager** → **Single Types** → **Página: Inicio**.
2. Acá podés cambiar:
   - El título y subtítulo del Hero
   - La foto de fondo del Hero (opcional)
   - Las 4 estadísticas
   - El texto y la foto de la sección "Nosotros"
   - Los 6 servicios (icono = emoji, ej. 🏠)
   - El título y texto del CTA final
3. **Save** → **Publish**.

> Cada estudio puede empezar con los valores por defecto que ya están cargados — modificarlos cuando quieran.

---

## 8. Actualizar los datos del Comparador

1. **Content Manager** → **Single Types** → **Comparador — Parámetros**.
2. Acá viven todos los números que usa el comparador interactivo:
   - Costo por m² (convencional vs. sustentable)
   - Energía mensual (USD/m²/mes)
   - Agua mensual
   - Mantenimiento anual
   - Inflación anual estimada
   - Costos de instalación solar y captación de agua
   - Toneladas de CO₂ por m²
3. Si actualizan estos números, **todos los cálculos del sitio se actualizan automáticamente**.
4. El campo **Disclaimer** es el texto chico que aparece debajo del comparador.

---

## 9. Cambiar datos de contacto y redes sociales

1. **Content Manager** → **Single Types** → **Configuración Global**.
2. Editar:
   - Nombre del estudio
   - Email, teléfono, dirección
   - WhatsApp (sin el +, ej. `5493546464383`)
   - URLs de Instagram, Facebook, YouTube, etc.
   - Logo y logo blanco
   - Imagen Open Graph (la que aparece al compartir en redes)
3. **Save**.

> Esto se refleja en el footer, en el botón flotante de WhatsApp y en la página de Contacto.

---

## 10. Ver las consultas recibidas

Cuando alguien usa el formulario de contacto, se guarda como una entrada en:

**Content Manager** → **Consultas recibidas**

Allí podés ver:
- Nombre, email, teléfono
- Tipo de consulta (vivienda, techo verde, etc.)
- Mensaje
- Estado **leído** ✅ — marcalo cuando hayas respondido

> Las consultas también llegan por email al `info@hombredebarro.com`. Acá quedan archivadas como respaldo.

---

## 11. Equipo, técnicas y categorías

Estas secciones son más simples:

- **Miembros del equipo:** nombre, rol, foto, bio, redes. El campo **Orden** controla la posición (más bajo = primero).
- **Técnicas constructivas:** Adobe, Quincha, Tapial... Sirven para etiquetar proyectos.
- **Categorías biblioteca/blog:** ya están cargadas. Si querés agregar nuevas, hacelo desde acá.

---

## 12. Consejos generales

- **Borradores vs. Publicado:** un contenido en borrador (Draft) no se ve en el sitio. Publicado (Published) sí. Podés tener varias versiones en borrador para revisar antes de publicar.
- **Despublicar:** botón **Unpublish** arriba a la derecha. El contenido sigue existiendo, pero deja de mostrarse.
- **Eliminar:** botón rojo **Delete**. ⚠️ Esto borra el contenido para siempre.
- **Vista previa:** al editar, hacé clic en **Open the live preview** si está habilitado, o abrí el sitio en otra pestaña.
- **Cambios rápidos:** los cambios se reflejan en el sitio en ~1 minuto (revalidación automática).

---

## 13. Si algo no funciona

1. **El sitio no muestra mis cambios:**
   - ¿Hiciste clic en **Publish** (no solo Save)?
   - Esperá 1-2 minutos.
   - Forzá la actualización con `Ctrl + F5` (Windows) o `Cmd + Shift + R` (Mac).
2. **No puedo subir una imagen muy grande:**
   - El sitio limita imágenes a 5 MB. Comprimila con [tinypng.com](https://tinypng.com).
3. **Error al guardar:**
   - Verificá que los campos obligatorios (con asterisco rojo) estén completos.
   - Tomá captura del error y mandala al desarrollador.

---

## Contacto técnico

Para cualquier ajuste del sitio (cambios en el diseño, nuevas secciones, problemas técnicos), escribir a:

📧 **[mail del desarrollador]**

🌿 *Que la tierra te acompañe.*
