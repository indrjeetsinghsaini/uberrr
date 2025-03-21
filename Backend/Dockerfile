from node:23-alpine3.20
workdir /app
copy package.json package-lock.json ./
run npm install
copy . .
expose 5000
cmd ["node","server.js"]
