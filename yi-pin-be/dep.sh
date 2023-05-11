rm code.zip
zip -r code.zip src .npmrc package.json package.lock.json tsconfig.json tsconfig.build.json assets nest-cli.json
scp code.zip root@123.56.18.197:/www/wwwroot/yi-pin/