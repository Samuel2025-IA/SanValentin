# Subir SanValentin a GitHub (repositorio privado)

Tu remoto ya está configurado: `https://github.com/Samuel420/SanValentin.git`

## Opción 1: GitHub en el navegador (recomendada)

1. **Crear un Personal Access Token (PAT)**  
   - Entra a: https://github.com/settings/tokens  
   - **Generate new token** → **Generate new token (classic)**  
   - Nombre: por ejemplo `SanValentin`  
   - Marca el permiso **repo** (acceso a repositorios)  
   - **Generate token**  
   - **Copia el token** (solo se muestra una vez; guárdalo en un lugar seguro).

2. **Hacer push desde la carpeta del proyecto**  
   Abre PowerShell o CMD en la carpeta del proyecto y ejecuta:

   ```bash
   cd c:\xampp\htdocs\AprendiendoJs\SanValentin
   git push -u origin main
   ```

3. **Cuando pida credenciales**  
   - **Username:** `Samuel420`  
   - **Password:** pega el **token** (no tu contraseña de GitHub).

Si Windows te pide guardar las credenciales, acepta para no tener que poner el token cada vez.

---

## Opción 2: GitHub CLI

Si tienes **GitHub CLI** instalado:

```bash
cd c:\xampp\htdocs\AprendiendoJs\SanValentin
gh auth login
```

Sigue los pasos (navegador, etc.) y luego:

```bash
git push -u origin main
```

---

## Si el remoto no es el correcto

Para ver el remoto:

```bash
git remote -v
```

Para cambiarlo (si el repo tiene otro nombre o usuario):

```bash
git remote set-url origin https://github.com/Samuel420/NOMBRE-DEL-REPO.git
```
