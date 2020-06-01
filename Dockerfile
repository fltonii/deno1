FROM debian

RUN apt-get update && apt-get install -y --no-install-recommends \
  ca-certificates \
  curl \
  unzip \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/* 

RUN curl -fsSL https://deno.land/x/install/install.sh | sh

COPY . /app


CMD /root/.deno/bin/deno run --allow-write --allow-read --allow-plugin \
  --allow-net --allow-env --unstable ./app/server.ts