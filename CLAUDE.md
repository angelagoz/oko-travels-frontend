# CLAUDE.md - Reglas y Pautas del Proyecto

## Reglas Generales
- **NO asumir nada**: siempre preguntar al usuario antes de tomar cualquier decision.
- **NO hacer cambios sin aprobacion**: cada modificacion debe ser consultada y aprobada antes de ejecutarse.
- **El usuario no programa**: tiene experiencia en diseno y sabe exactamente lo que quiere. Las explicaciones deben ser claras y sin tecnicismos innecesarios.
- **Preguntar antes de actuar**: ante cualquier duda, preguntar. Mejor preguntar de mas que asumir.

## Estructura del Proyecto
- **Pagina 1**: Pagina institucional (estatica)
- **Pagina 2**: Pagina con CMS (dinamica, para gestionar contenido sin programar)

## Orden de Desarrollo
1. **Etapa 1**: Frontend (diseno visual, estructura, maquetado)
2. **Etapa 2**: Backend (CMS, base de datos, logica del servidor)

## Archivos de Control
- `CLAUDE.md` → Este archivo. Reglas, pautas y lineamientos del proyecto.
- `memory.md` → Plan de desarrollo, registro de avances y log de cada etapa.

## Reglas de Programacion

### Tecnologias Elegidas
- **Frontend**: HTML5 + CSS3 + JavaScript vanilla
- **Backend**: Node.js + Express
- **Base de datos**: MongoDB
- **Panel CMS**: Interfaz web visual (sin código)

### Hosting Recomendado
- **Frontend**: Vercel (gratuito)
- **Backend**: Render o Railway (gratuito para empezar)
- **Base de datos**: MongoDB Atlas (gratuito hasta cierto volumen)
- **Dominio**: GoDaddy o Namecheap (~$10-15/año)

## Especificaciones del Proyecto

### Pagina 1: Institucional
- Presentación de la agencia
- Equipo
- Contacto
- Certificaciones
- Catálogo general de oferta (boletos aéreos, cruceros, tours, seguros, Disney)

### Pagina 2: Cruceros (con CMS)
- **Enfoque principal**: Cruceros por el Caribe desde República Dominicana
- Información: fechas, navieras, precios, itinerarios, tipos de camarotes, galerías de fotos
- Carrito de compras
- Sistema de registro de usuarios
- Pagos online (tarjeta, PayPal)
- Panel CMS visual para administrar contenido
- Reportes y estadísticas

### Otros Productos (con CMS)
- Tours internacionales (Turquía, Dubai, Europa, USA, México, Colombia, Panamá, Curaçao)
- Boletos aéreos
- Seguros de viajes
- Paquetes Disney

## Reglas de Cambios
- **NUNCA asumir**: siempre preguntar al usuario antes de modificar, agregar o eliminar cualquier cosa.
- **SIEMPRE confirmar**: cada cambio debe ser aprobado por el usuario.
- **Explicar claro**: las explicaciones técnicas deben ser simples y sin jerga.
