# Usa una imagen base de Playwright que ya incluye Node.js, navegadores, y wget/curl
FROM mcr.microsoft.com/playwright:v1.56.0-jammy

# Instala bash, necesario para la lógica de espera avanzada en docker-compose
# y curl para la verificación robusta de la URL (aunque usaremos wget en el compose)
RUN apt-get update && apt-get install -y bash curl

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de configuración de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias de Node.js
RUN npm install

# Copia el resto del código del proyecto
COPY . .

# Comando por defecto (será sobrescrito por docker-compose)
CMD ["npx", "playwright", "test"]