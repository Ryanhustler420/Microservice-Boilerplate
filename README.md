**Always checkout new branch for your** `next changes`

# NodeJS Microservice Boilerplate

#### Change `appname` to your `appname`

#### Change `project-abcd` to your `npm-organisation`

## How to create a single service

- Create a new diretory for your project and navigate to it using a terminal.

- Initialize a new Node.js project by running the following command:

```bash
npm i tsc -g
npm init -y
```

- Install the necessary dependencies: TypeScript, Express, and the TypeScript declarations for Node.js and Express. Run the following command:

```bash
npm install express typescript ts-node @types/node @types/express --save
tsc --init
```

> tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true
  }
}
```

- Create a `src` directory in the root of your project. This directory will hold your TypeScript files.
- Inside the `src` directory, create a file named `app.ts`. This file will contain your Express application code.
- Open the `app.ts` file and add the following code to set up a basic Express application:

```ts
import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hi There!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

- Open `package.json` and add the following scripts under the `"scripts"` section:

> package.json

```json
"scripts": {
  "start": "ts-node src/app.ts",
  "build": "tsc"
},
```

- You can now start the Express application in development mode using TypeScript by running the following command:

```bash
npm start
```

- This command uses ts-node to directly run the TypeScript file.
- If you want to build your TypeScript code into JavaScript, you can run the following command:

```bash
npm run build
```

This command uses the TypeScript compiler (tsc) to compile the TypeScript code into JavaScript and outputs it in the dist directory based on the tsconfig.json settings.

You have now set up TypeScript with Node.js and Express. You can access your Express application at **http://localhost:3000**, and it should respond with "Hello, World!".

## Docker

**Required**

```bash
docker volume create appname
docker volume ls
```

**How to run**

```bash
npm run build # IMPORTANT COMMAND

docker compose -f docker-compose-dev.yaml build
docker compose -f docker-compose-dev.yaml up

docker compose -f docker-compose-prod.yaml build
docker compose -f docker-compose-prod.yaml up
```

## Minikube

**Required**

- install [Chocolaty](https://chocolatey.org/install)
- install [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- install [Skaffold](https://skaffold.dev/docs/install/)
- install [Ingress Nginx](https://kubernetes.io/docs/tasks/access-application-cluster/ingress-minikube/)

**Minikube**

In order to enable ingress you need to fire this on your command prompt

```bash
minikube addons enable ingress
```

**Add Required Secrets**

```bash
kubectl create secret generic name-secret --from-literal=NAME_KEY=xxxxxxxxxx
kubectl get secrets
kubectl delete secrets name-secret
```

**SSH Access**

```bash
minikube ssh
curl appname.com
```

**Skaffold Start**

Make sure you create a `namespace` using inside `skaffold.yaml` file

1.  Start docker
2.  Start minikube using command **`minikube start`**
3.  Start skaffold using command **`skaffold dev`**
4.  Please add this host domain inside your `host` file
    - Windows
      - GOTO: `%WINDIR%\System32\drivers\etc\hosts`
      - ADD : `127.0.0.1 appname.com`
5.  Get ingress pod details using command **`kubectl get pods -n ingress-nginx`**
6.  Port Forward the browser to ingress using command **`kubectl port-forward pod/ingress-nginx-controller-5d88495688-dxxgw --address 0.0.0.0 80:80 443:443 -n ingress-nginx`**
7.  When done **`skaffold delete`**

**Issues**

- [App Not Working In Browser](https://stackoverflow.com/a/68966125)

# Author

- [Gourav Gupta](https://gouravgupta.com)
