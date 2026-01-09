# 🚀 SuiteEmprende

> **Tu oficina digital gratuita.** Herramientas profesionales para emprendedores, 100% gratis y sin registros.

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://dongeeo87.github.io/SuiteEmprende)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)
[![Made with React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)

---

## ✨ ¿Qué es SuiteEmprende?

**SuiteEmprende** es una suite de herramientas web diseñada específicamente para emprendedores chilenos y latinoamericanos. Todas las herramientas funcionan **100% en tu navegador**, sin necesidad de registro, instalación ni envío de datos a servidores externos.

### 🎯 Filosofía del Proyecto

- **🔒 Privacidad Total**: Todo se procesa en tu navegador. Tus datos nunca salen de tu computador.
- **💰 Gratis para Siempre**: Sin planes premium, sin anuncios, sin letra chica.
- **⚡ Rápido y Ligero**: Sin dependencias pesadas. Carga en segundos.
- **📱 Responsive**: Funciona perfecto en móvil, tablet y escritorio.
- **🎓 Educativo**: Cada herramienta incluye tips y mini lecciones para que aprendas mientras trabajas.

---

## 🛠️ Herramientas Disponibles

### 📄 Documentos
- **Rellenar PDF**: Completa formularios PDF sin imprimir
- **Cotizador Express**: Genera presupuestos profesionales en PDF
- **Firma Digital**: Crea tu firma y descárgala en PNG transparente

### 💬 Comunicación
- **Link WhatsApp**: Genera enlaces directos y códigos QR con mensajes predefinidos
- **Templates de Mensajes**: 8 plantillas listas para usar (presentación, catálogo, pedidos, etc.)

### 💰 Finanzas
- **Calculadora de Margen**: Calcula el precio de venta ideal para no perder dinero
- **Calculadora de Ofertas**: Define descuentos sin afectar tu rentabilidad
- **Precio de Venta**: Para fabricantes y revendedores (con mini lección)
- **Punto de Equilibrio**: Descubre cuánto necesitas vender para cubrir costos

### 🖼️ Imágenes
- **Comprimir Fotos**: Reduce el peso de imágenes para web
- **Recortar para Redes**: Ajusta fotos al tamaño perfecto (Instagram, Facebook, etc.)
- **Marca de Agua**: Protege tus fotos de productos

### 🔐 Utilidades
- **Generador de Contraseñas**: Crea claves seguras al instante

---

## 🚀 Inicio Rápido

### Opción 1: Usar la versión online (Recomendado)
Simplemente visita: **[dongeeo87.github.io/SuiteEmprende](https://dongeeo87.github.io/SuiteEmprende)**

### Opción 2: Ejecutar localmente

```bash
# Clonar el repositorio
git clone https://github.com/DonGeeo87/SuiteEmprende.git
cd SuiteEmprende

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

La aplicación estará disponible en `http://localhost:3000`

---

## 🏗️ Stack Tecnológico

- **React 19** - Framework UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool ultrarrápido
- **React Router** - Navegación
- **Tailwind CSS** - Estilos (vía CDN)
- **jsPDF** - Generación de PDFs
- **pdf-lib** - Edición de PDFs
- **react-pdf** - Visualización de PDFs
- **qrcode.react** - Generación de códigos QR
- **react-easy-crop** - Recorte de imágenes
- **browser-image-compression** - Compresión de imágenes

---

## 📦 Estructura del Proyecto

```
SuiteEmprende/
├── pages/              # Componentes de cada herramienta
│   ├── Dashboard.tsx   # Página principal con grid de herramientas
│   ├── WhatsAppLink.tsx
│   ├── PricingCalculator.tsx
│   ├── BreakEvenCalculator.tsx
│   └── ...
├── components/         # Componentes reutilizables
│   ├── ToolLayout.tsx  # Layout común para todas las herramientas
│   └── FileUpload.tsx  # Componente de carga de archivos
├── App.tsx            # Componente principal y routing
├── index.tsx          # Punto de entrada
├── index.css          # Estilos globales
└── index.html         # HTML base
```

---

## 🎨 Capturas de Pantalla

### Dashboard Principal
![Dashboard](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Dashboard+SuiteEmprende)

### Calculadora de Punto de Equilibrio
![Break Even](https://via.placeholder.com/800x400/10B981/FFFFFF?text=Punto+de+Equilibrio)

### Editor de PDF
![PDF Editor](https://via.placeholder.com/800x400/F59E0B/FFFFFF?text=Editor+de+PDF)

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si tienes ideas para nuevas herramientas o mejoras:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/NuevaHerramienta`)
3. Commit tus cambios (`git commit -m 'Agrega nueva herramienta X'`)
4. Push a la rama (`git push origin feature/NuevaHerramienta`)
5. Abre un Pull Request

### Ideas para futuras herramientas
- 📊 Calculadora de ROI
- 💱 Conversor de Monedas
- 🧾 Generador de Boletas
- 📦 Calculadora de Envíos
- 📈 Proyección de Ventas

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

**Ginter Donato**
- GitHub: [@DonGeeo87](https://github.com/DonGeeo87)
- Email: ginterdonatop@gmail.com

---

## 🙏 Agradecimientos

- A todos los emprendedores que luchan día a día por sacar adelante sus negocios
- A la comunidad open-source por las increíbles herramientas que hacen esto posible
- A ti, por usar y apoyar este proyecto

---

## 💡 ¿Por qué SuiteEmprende?

Emprender en Latinoamérica es difícil. Las herramientas profesionales son caras, los software de gestión requieren suscripciones mensuales, y muchas veces necesitas "solo una cosa simple" pero terminas pagando por un paquete completo.

**SuiteEmprende nace de esa frustración.** Herramientas simples, directas, que hacen exactamente lo que necesitas, sin complicaciones ni costos ocultos.

Si te ayudó, compártelo con otros emprendedores. Juntos crecemos más. 🚀

---

<div align="center">
  
**[⭐ Dale una estrella si te sirvió](https://github.com/DonGeeo87/SuiteEmprende)**

Hecho con ❤️ para emprendedores

</div>
