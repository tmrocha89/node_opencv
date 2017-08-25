FROM siomiz/node-opencv:2.4.x



RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/selfsigned.key -out /etc/ssl/certs/selfsigned.crt -subj "/C=PT/ST=TEST/L=CITY/O=Wedding/OU=Wedding Department/CN=192.168.1.118.com"


#RUN openssl genrsa -des3 -passout pass:x -out server.pass.key 2048 && \
#    openssl rsa -passin pass:x -in server.pass.key -out server.key && \
#    rm server.pass.key && \
#    openssl req -new -key server.key -out server.csr \
#        -subj "/C=PT/ST=TEST/L=CITY/O=Wedding/OU=Wedding Department/CN=192.168.1.118.com" && \
#    openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt


WORKDIR /app/server

CMD  npm install && node server.js