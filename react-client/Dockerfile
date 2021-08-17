FROM node:alpine
 
# Add the following line 
ENV CI=true
 
WORKDIR /app
COPY package.json ./
ENV CI=true
RUN npm install
COPY ./ ./
 
CMD ["npm", "start"]