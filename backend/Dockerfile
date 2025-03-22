FROM node:16

WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code and build
COPY . .
RUN npm run build

EXPOSE 4000

CMD ["npm", "start"]
