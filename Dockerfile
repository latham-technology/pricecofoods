ARG SENTRY_DSN
ARG SENTRY_ORG
ARG SENTRY_PROJECT

# Stage 1 - Build
FROM node:18-alpine

ENV SENTRY_DSN=${SENTRY_DSN}
ENV SENTRY_ORG=${SENTRY_ORG}
ENV SENTRY_PROJECT=${SENTRY_PROJECT}

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

CMD echo $SENTRY_DSN
CMD echo $SENTRY_ORG
CMD echo $SENTRY_PROJECT

RUN npm run build

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000

CMD ["npm", "start"]