# Check out https://hub.docker.com/_/node to select a new base image
FROM node:10-slim
# run install and start app 
ADD start.sh /start.sh
RUN chmod 755 /start.sh
CMD ["/start.sh"]