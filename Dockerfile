FROM debian

RUN apt-get update && apt-get install -y --no-install-recommends \
  ca-certificates \
  curl \
  unzip \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/* 

RUN curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.0.3

ENV DENO_INSTALL="/root/.deno"

ENV PATH="$DENO_INSTALL/bin:$PATH"

COPY . /app

WORKDIR /app

CMD deno run --allow-write --allow-read --allow-plugin \
  --allow-net --allow-env --unstable ./server.ts 