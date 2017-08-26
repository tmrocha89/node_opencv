FROM siomiz/node-opencv:2.4.x

RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/selfsigned.key -out /etc/ssl/certs/selfsigned.crt -subj "/C=PT/ST=TEST/L=CITY/O=Wedding/OU=Wedding Department/CN=192.168.1.118.com"

WORKDIR /app/server


#RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
#RUN export NVM_DIR="$HOME/.nvm"
#RUN [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

#RUN nvm install node
#RUN nvm install 7.10.1
#RUN nvm use 7.10.1

#RUN npm install npm@3.10.9
#ADD server/package.json package.json
#RUN npm install

CMD sleep infinity 
#node server.js