FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g prisma

COPY . .

# Set environment variables
ARG NODE_ENV
ARG DATABASE_URL
ENV NODE_ENV=${NODE_ENV}
ENV DATABASE_URL=${DATABASE_URL}

ENV DATABASE_URL="file:./dev.db"

RUN prisma db push --force-reset

RUN npm run build

# Expose the port the application will run on
EXPOSE 8080

# Command to start the application
CMD ["sh", "-c", "node dist/main"]
