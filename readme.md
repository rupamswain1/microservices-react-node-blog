## Working.

This app has 4 Service:
```bash
1.Post Service - this maintains all the posts
2. Comment Service to Maintain all the comments
3. Event Bus service: to record all missed events 
4. query-service- maintains all post and comments together
5. React-client-frontentd
```
# Flow
-On React app all the initial post is fetched from query-service
1. When user creates a post or comment
```bash
Post is created in post service>event bus is notified>event bus stores the post in its DB>Event bus notifies query service
If query-service is active>post is stored in query and post is deleted from event bus DB .
If query service fails, event DB stores post and query - service is synced with event bus when it comes online
```
## Setup
1.Go to Each service folder and do a docker build
```
docker build -t dockerhubId/imageName
```
2. Start Minikube if n linux
```
minikube start
```
3. navigate tp infra/K8s in project from terminal and run
```
kubectl apply -f .
```
4. Access application from minikube ip

# Alternatively:
1. Open terminal on main project folder and run
```
skaffold dev
```

## System Setup
1. install docker
2. install minikube if on linux and start it/ on windows enable kubernetes from docker setting
3. start minikube.
4. paste the minikube ip with the host mentioned in skaffold in etc/hosts file, on window use mention local host ip for host
5. Install ingress ngnx on minikube, if on windows follow installation instruction
6. run 
```
skaffold dev
```

## Enhancement required: Remove comment and Post