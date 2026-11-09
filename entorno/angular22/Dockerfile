# Node 22.22+ es el mínimo de Angular 22. node:22-alpine = última 22.x con parches.
FROM node:22-alpine

RUN apk add --no-cache bash git
# node:22-alpine trae npm 10.9. Con Angular 22, npm install muere en edgesOut
# al resolver vitest. npm 11.21.1 lo instala.
# dangerously-allow-all-scripts: npm 11 avisa (y puede no lanzar) los scripts
# de esbuild y compañía. En esta imagen los paquetes los instala la CLI del curso.
# fund false: quita el aviso de "looking for funding".
RUN npm install -g npm@11.21.1 \
 && npm config set dangerously-allow-all-scripts true \
 && npm config set fund false \
 && npm install -g @angular/cli@22
RUN git config --global init.defaultBranch main

ENV NG_CLI_ANALYTICS=false

WORKDIR /usr/src/app

# Atajos del curso (se cargan al entrar con bash).
# Uso: docker compose exec angular22 bash
RUN echo 'alias ng-new="ng new --style=css --no-ssr --ai-config=none"' >> /root/.bashrc
RUN echo 'alias ng-serve="ng serve --host 0.0.0.0"' >> /root/.bashrc

CMD ["bash"]
