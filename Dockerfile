FROM debian
RUN apt-get update
RUN apt-get update && \
    apt-get install -y curl texlive inotify-tools chktex
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash && \
    apt-get install -y nodejs
RUN node -v
RUN npm -v
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD inotifywait -m -e modify /app/resume.tex --format %w%f | while read file; do node index.js; done
