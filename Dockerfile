FROM docker.arvancloud.ir/node:22-alpine as build
ENV NODE_ENV develop
WORKDIR /app
COPY package.json .
#RUN npm config set registry "https://repo.ito.gov.ir/npm/"
RUN npm i --registry="https://mirror-npm.runflare.com"
COPY . .
RUN npm run build

FROM node:alpine
ENV NODE_ENV develop
WORKDIR /app
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/.env /app/.env
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/package-lock.json /app/package-lock.json
EXPOSE 4100
ENTRYPOINT ["npm", "run", "start:prod"]
