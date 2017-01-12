# Pull base image.
FROM node:7.4.0

# Create user
RUN useradd --user-group --create-home --shell /bin/false nodejs

# Set environment
ENV HOME=/home/nodejs
ENV NODE_ENV=production

# Copy files
COPY package.json $HOME/app/
COPY middleware $HOME/app/middleware
COPY models $HOME/app/models
COPY public $HOME/app/public
COPY routes $HOME/app/routes
COPY views $HOME/app/views
COPY server.js $HOME/app/
COPY utils.js $HOME/app/

# Set owner and permissions
RUN chown -R nodejs:nodejs $HOME/*
USER nodejs
WORKDIR $HOME/app

# Install dependencies
RUN npm install

# Define default command
CMD ["node", "--harmony", "server.js"]
