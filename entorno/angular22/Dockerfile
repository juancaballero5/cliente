# Node 22.22+ es el mínimo de Angular 22. node:22-alpine = última 22.x con parches.
FROM node:22-alpine

RUN apk add --no-cache bash git
RUN npm install -g @angular/cli@22
RUN git config --global init.defaultBranch main

ENV NG_CLI_ANALYTICS=false

WORKDIR /usr/src/app

# Atajos del curso (se cargan al entrar con bash).
# Uso: docker compose exec angular22 bash
RUN echo 'alias ng-new="ng new --style=css --no-ssr --ai-config=none"' >> /root/.bashrc
RUN echo 'alias ng-serve="ng serve --host 0.0.0.0"' >> /root/.bashrc

CMD ["bash"]
