# 🚀 Guía de Despliegue a GitHub Pages

## Paso 1: Configurar Git (si aún no lo has hecho)

```bash
# Configurar tu identidad
git config --global user.name "DonGeeo87"
git config --global user.email "ginterdonatop@gmail.com"
```

## Paso 2: Inicializar el repositorio local

```bash
# Navegar al directorio del proyecto
cd c:\GeeoDev\SuiteEmprende

# Inicializar Git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Hacer el commit inicial
git commit -m "🎉 Initial commit: SuiteEmprende v1.0.0 - 12 herramientas completas"
```

## Paso 3: Conectar con GitHub

```bash
# Agregar el repositorio remoto
git remote add origin https://github.com/DonGeeo87/SuiteEmprende.git

# Verificar que se agregó correctamente
git remote -v
```

## Paso 4: Subir el código

```bash
# Cambiar a la rama main (si estás en master)
git branch -M main

# Subir el código
git push -u origin main
```

## Paso 5: Configurar GitHub Pages

1. Ve a tu repositorio en GitHub: https://github.com/DonGeeo87/SuiteEmprende
2. Click en **Settings** (Configuración)
3. En el menú lateral, click en **Pages**
4. En **Source**, selecciona **GitHub Actions**
5. ¡Listo! El workflow se ejecutará automáticamente

## Paso 6: Verificar el despliegue

Después de unos minutos, tu sitio estará disponible en:
**https://dongeeo87.github.io/SuiteEmprende**

## 🔄 Actualizaciones futuras

Cada vez que hagas cambios:

```bash
# Agregar cambios
git add .

# Commit con mensaje descriptivo
git commit -m "✨ Descripción de tus cambios"

# Subir a GitHub
git push

# El despliegue se hará automáticamente
```

## 🛠️ Comandos útiles

### Verificar estado
```bash
git status
```

### Ver historial
```bash
git log --oneline
```

### Desplegar manualmente (opcional)
```bash
npm run deploy
```

## ⚠️ Notas importantes

1. **Primera vez**: Puede tardar 5-10 minutos en desplegarse
2. **Caché del navegador**: Si no ves cambios, presiona Ctrl+F5 para refrescar
3. **Errores**: Revisa la pestaña "Actions" en GitHub para ver el log del workflow

## 🎉 ¡Listo!

Tu aplicación estará disponible en:
- **URL pública**: https://dongeeo87.github.io/SuiteEmprende
- **Repositorio**: https://github.com/DonGeeo87/SuiteEmprende

---

**¿Problemas?** Revisa que:
- El repositorio sea público
- GitHub Pages esté habilitado
- El workflow tenga permisos de escritura
