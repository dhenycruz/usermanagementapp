FROM node:alpine
WORKDIR /backend/
COPY package* ./
RUN npm install
COPY . ./
CMD ["npm", "start"]