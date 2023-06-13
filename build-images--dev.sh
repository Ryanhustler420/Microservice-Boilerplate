docker rmi -f repo/appname-auth
docker rmi -f repo/appname-online

cd ./auth && npm run build && docker build -t repo/appname-auth -f Dockerfile.dev . && cd ..
cd ./online && npm run build && docker build -t repo/appname-online -f Dockerfile.dev . && cd ..