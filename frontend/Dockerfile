FROM node:16-alpine
WORKDIR /frontend
COPY package* ./
RUN npm install
COPY . ./
RUN npm run build
EXPOSE 3000
CMD ["npm","start"]