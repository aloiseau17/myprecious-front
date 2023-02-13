FROM node:14

ARG USER_ID=1000
ARG GROUP_ID=1000

RUN userdel -r node

RUN addgroup --gid $GROUP_ID user

RUN adduser --disabled-password --gecos '' --uid $USER_ID --gid $GROUP_ID user

# Set the active user and open the interactive terminal
USER user

WORKDIR /app

COPY package.json /app

RUN npm install && npm cache clean --force

COPY . /app

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
