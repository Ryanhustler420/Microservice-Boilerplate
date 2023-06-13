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

**NodePort**

```bash
kubectl create namespace testing
kubectl apply -f nodeapp.yaml # Has NodePort Service
kubectl get svc -n testing
kubectl port-forward svc/nodeapp-service 30002:30002 -n testing
minikube service nodeapp-service --url
minikube ip

# kubectl get pod -n testing
# kubectl port-forward pod/nodeapp-app 3000:3000 -n testing
```

**Issues**

- [App Not Working In Browser](https://stackoverflow.com/a/68966125)

<br />

# 🐟 Deploy [Digital Ocean]()

Prerequisite

- `Minikube`
- `Skaffold`
- `kubectl`
- `Docker`
- `doctl`
- `Helm`
- `Git`

1.  Create a cluster
2.  Config your `kubectl` which should point to digital ocean cluster

```bash
kubectl config view
kubectl get nodes
```

3.  Open [Artifacthub](https://artifacthub.io/packages/helm/ingress-nginx/ingress-nginx)
4.  Run these given commands

```bash
helm repo list
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update ingress-nginx
```

5.  Create a `nginx-helm-values.yaml` file

```yaml
controller:
  replicaCount: 1
  resources:
    requests:
      cpu: 100m
      memory: 90Mi
```

6.  Run these given commands

```bash
kubectl create ns ingress-nginx
helm install ingress-nginx ingress-nginx/ingress-nginx -n ingress-nginx -f nginx-helm-values.yaml
```

```bash
kubectl get all -n ingress-nginx
kubectl get svc -n ingress-nginx
```

7.  Open load balancer ip address to browser `it should show 404 page`.

8.  Configure the domain name which will point to load balancer ip address

Add these to custom DNS of your nameserver

```bash
- ns1.digitalocean.com
- ns2.digitalocean.com
- ns3.digitalocean.com
```

Add these to your digital oceans domain settings

```bash
A	      -	@       <Load Balance Id>       30
CNAME	  -	www     @                       30
```

Set any secret if you have before deploying anything into your cluster

```bash
kubectl create secret generic appname-secret --from-literal=APPNAME_KEY=xxxxxxxxxx
```

9.  Create a `Deployment` config file name `app-depl.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
  namespace: backend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: app
  strategy:
    type: RollingUpdate
  template:
    metadata:
      labels:
        app: app
    spec:
      containers:
        - name: backend
          image: repo/nodeapp
          resources:
            requests:
              cpu: 100m
              memory: 50Mi
            limits:
              cpu: 200m
              memory: 100Mi
---
apiVersion: v1
kind: Service
metadata:
  name: app
  namespace: backend
spec:
  selector:
    app: app
  ports:
    - name: http
      port: 80
      targetPort: 3000
```

10. Run these given commands

```bash
kubectl create ns backend
kubectl apply -f app-depl.yaml
kubectl get all -n backend
```

11. Create an ingress config `ingress.yaml`

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-service
  namespace: backend
  annotations:
    cert-manager.io/issuer: letsencrypt-nginx
spec:
  tls:
    - hosts:
        - appname.com
      secretName: letsencrypt-nginx-app
  rules:
    - host: appname.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: app
                port:
                  number: 80
  ingressClassName: nginx
```

12. Run these given commands

```bash
kubectl apply -f ingress.yaml
kubectl -n backend get ingress
```

```bash
curl -li http://appname.com
```

13. Get Helm [CertManager](https://artifacthub.io/packages/helm/cert-manager/cert-manager)

```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.12.1/cert-manager.crds.yaml
kubectl get crds
helm repo add cert-manager https://charts.jetstack.io
helm repo list
helm repo update cert-manager
```

14. Create a `cert-manager-values.yaml` file

```yaml
installCRDs: false

# Required only if you want to monitor cert-manager activity
prometheus:
  enabled: false
```

15. Run these given commands

```bash
kubectl create ns cert-manager
helm install cert-manager -n cert-manager --version 1.12.1 cert-manager/cert-manager -f cert-manager-values.yaml
```

16. Create a `cert-manager-issuer.yaml` file

```yaml
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: letsencrypt-nginx
  namespace: backend
spec:
  acme:
    email: validemail@gmail.com
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: letsencrypt-nginx-private-key
    solvers:
      # Use the HTTP-01 challenge provider
      - http01:
          ingress:
            class: nginx
```

```bash
kubectl apply -f cert-manager-issuer.yaml
```

17. Run these given commands

```bash
kubectl get crds | grep cert-manager
kubectl get issuer -A
```

```bash
kubectl -n backend get order
kubectl -n backend get issuer
kubectl -n backend get secrets
kubectl -n backend get challenges
kubectl -n backend get certificate
kubectl -n backend get certificaterequests
```

```cmd
curl https://appname.com
```

# Wildcard Integration

Need to write here

# CI/CD

### Initially

1.  Create a Githib Repository
2.  Create workflows actions for each service
3.  Create env variables used in workflow inside that repositories settings
4.  Remote attach your project with that repository
5.  Pull all the changes from master first
6.  Push your code to master branch for the **`first time`**

NOTE: **Make sure you change something on the `infra/` so that for the first time it deploy**

### After

1.  Pull the master branch first
2.  Checkout another branch example **`dev`**
3.  Commit the release into another branch example **`dev`**
4.  Review and merge pull request to **`master`**

# Author

- [Gourav Gupta](https://gouravgupta.com)
