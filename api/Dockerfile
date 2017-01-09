# Pull base image.
FROM node:4.4.7

# Create user
RUN useradd --user-group --create-home --shell /bin/false nodejs

# Set environment
ENV HOME=/home/nodejs
ENV NODE_ENV=production

# Copy files
COPY package.json $HOME/app/

# Set owner and permissions
RUN chown -R nodejs:nodejs $HOME/*
USER nodejs
WORKDIR $HOME/app

# Install dependencies
RUN npm install

# Define default command
CMD ["node", "server.js"]
