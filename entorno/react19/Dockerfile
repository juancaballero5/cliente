FROM node:22-alpine

RUN apk add --no-cache bash git
RUN git config --global init.defaultBranch main

WORKDIR /usr/src/app

RUN echo 'alias react-new="npx --yes create-vite@latest --template react-ts"' >> /root/.bashrc
RUN echo 'alias react-start="npm run dev -- --host 0.0.0.0"' >> /root/.bashrc

CMD ["bash"]
