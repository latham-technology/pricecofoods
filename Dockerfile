FROM node:18-alpine

ARG SENTRY_DSN
ARG SENTRY_ORG
ARG SENTRY_PROJECT

ENV SENTRY_DSN=${SENTRY_DSN}
ENV SENTRY_ORG=${SENTRY_ORG}
ENV SENTRY_PROJECT=${SENTRY_PROJECT}

RUN echo $SENTRY_DSN
RUN echo $SENTRY_ORG
RUN echo $SENTRY_PROJECT
RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN \
    SENTRY_AUTH_TOKEN=$(cat /run/secrets/SENTRY_AUTH_TOKEN) && \
    echo $SENTRY_AUTH_TOKEN

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN \
    SENTRY_AUTH_TOKEN=$(cat /run/secrets/SENTRY_AUTH_TOKEN) && \
    npm run build

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000

CMD ["npm", "start"]