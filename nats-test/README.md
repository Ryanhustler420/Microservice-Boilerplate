# NATS streaming service running inside k8s

> Port forwarding

```bash
Kubectl get pods
kubectl port-forward nats-depl-d575bfb84-fv9r8 4222:4222
kubectl port-forward nats-depl-d575bfb84-fv9r8 8222:8222

localhost:8222/streaming
http://localhost:8222/streaming/channelsz?subs=1
```

> Clearning NATs Garbage

```bash
# Restart the NAT server will dump the in-memory cached of past events data
```
