
#Setup
-----------

```
export ORG=bap-amer-select-demo2
export RUNTIME=https://34.117.7.140.nip.io
export ENV=default-dev
export NAMESPACE=apigee
export AX_SERVICE_ACCOUNT=/Users/rajeshmi/presales/git/apigee-envoy-adapter/gatrner/apigee-remote-service-cli/bap-amer-select-demo2-ax.json
./apigee-remote-service-cli provision --organization $ORG --environment $ENV      --runtime $RUNTIME --namespace $NAMESPACE --analytics-sa $AX_SERVICE_ACCOUNT --token $TOKEN > config.yaml
```

#Disable Injection
```
kubectl label namespace default istio-injection-
```
#Enable Injection
```
kubectl label namespace default istio-injection=enabled
```
#####Demo Starts Here #################


# Add the loyalty services
```
kubectl apply -f services/loyalty-app/loyalty.yaml
kubectl apply -f services/loyalty-app/loyalty-ingress.yaml
```
# Add the offers services
```
kubectl apply -f services/offers-app/offers.yaml
kubectl apply -f services/offers-app/offers-ingress.yaml
```
#Test the Service
- Use curl Another shell
```
kubectl run -it curl --image=curlimages/curl --restart=Never -- sh

curl -i loyalty.default.svc.cluster.local/members
curl -i offers.default.svc.cluster.local/offers
```

#Add Envoy filter
```
kubectl apply -f samples/envoyfilter-sidecar.yaml
```
# Try curl command again
```
curl -i loyalty.default.svc.cluster.local/members  
should return 403
```
## Add Product Mapping
```
kubectl apply -f apigee/apigee_loyalty_product.yaml
kubectl apply -f apigee/apigee_loyalty_developer.yaml
kubectl apply -f apigee/apigee_loyalty_developerapp.yaml
kubectl get developerapps

APIKEY=<key printed>
curl -i loyalty.default.svc.cluster.local/members  -H 'x-api-key: $APIKEY'
```


