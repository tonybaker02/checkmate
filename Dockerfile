#docker build -t checkmateappv2:latest .
#A 
FROM node:16

#copy over main server fle
#B
COPY server.js /server.js

COPY package*.json ./


#E
EXPOSE 5500 3000

#C copy directories for client
COPY client/ /client

#copy directories for service
#C
COPY config/ /config
COPY middleware/ /middleware
COPY models/ /models
COPY routes/ /routes


#F npm install on server
RUN npm install

#F npm install on the client
RUN npm install --force --prefix client
RUN npm run build --prefix client

#D
#ENTRYPOINT ["npm", "start"]
#ENTRYPOINT ["node", "server.js"]
ENTRYPOINT ["npm", "run","dev"]

#A The base image to build upon
#B Adds the server.js  file into the container image
#C Copies the files in the different directores into the container
#D Specifies the command to execute when the image is run
#E - Expose the PORT
#F Run npm install to install dependencies

#docker run --name checkmateappv2-container  -p 3000:3000 -p 5500:5500  -d checkmateappv2