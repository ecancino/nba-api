# Pull base image.
FROM node:7.4.0

# Create user
RUN useradd --user-group --create-home --shell /bin/false nodejs

# Set environment
ENV HOME=/home/nodejs
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Copy files
COPY ./ $HOME/app/

# Set owner and permissions
RUN chown -R nodejs:nodejs $HOME/*
USER nodejs
WORKDIR $HOME/app

# Install dependencies
RUN npm install
