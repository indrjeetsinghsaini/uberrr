from node:18-bullseye
workdir /app
copy package.json package-lock.json ./
run apt update &&  apt upgrade -y 
run npm install
copy . .
expose 8000
cmd ["npm","run","start"]
