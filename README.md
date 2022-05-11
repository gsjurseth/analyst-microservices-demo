
#Setup
-----------

- Env Setup
```
export ORG=bap-amer-select-demo2
export RUNTIME=https://34.117.7.140.nip.io
export ENV=default-dev
export NAMESPACE=apigee
export AX_SERVICE_ACCOUNT=/Users/rajeshmi/presales/git/apigee-envoy-adapter/gatrner/apigee-remote-service-cli/bap-amer-select-demo2-ax.json
./apigee-remote-service-cli provision --organization $ORG --environment $ENV      --runtime $RUNTIME --namespace $NAMESPACE --analytics-sa $AX_SERVICE_ACCOUNT --token $TOKEN > config.yaml
```

- Disable Injection
```
kubectl label namespace default istio-injection-
```
- Enable Injection
```
kubectl label namespace default istio-injection=enabled
```

- Add the loyalty services
```
kubectl apply -f services/loyalty-app/loyalty.yaml
kubectl apply -f services/loyalty-app/loyalty-ingress.yaml
```
- Add the offers services
```
kubectl apply -f services/offers-app/offers.yaml
kubectl apply -f services/offers-app/offers-ingress.yaml
```

- Envoy Adapter
kubectl apply -f samples/apigee-envoy-adapter.yaml
kubectl get pods -n apigee

- Add Product Mapping

These steps needs to be used if you have have also installed apigee-crd in your cluster. To know how to setup apigee-cd you camn refer here:
https://github.com/rajeshm7910/apigee-crd

```
kubectl apply -f apigee/apigee_loyalty_product.yaml
kubectl apply -f apigee/apigee_loyalty_developer.yaml
kubectl apply -f apigee/apigee_loyalty_developerapp.yaml
kubectl get developerapps
NAME                     APPNAME                  CONSUMERKEY                                        AGE
retail-api-loyalty-app   retail-api-loyalty-app   xPrbt67D1ydoZdBGdToRkURd6su649CwPrbMfrBeuYocDPI2   27m

```
##### Pre Demo Script #################
kubectl delete -f samples/envoyfilter-sidecar.yaml

##### Demo Starts Here #################

There are two microservices - loyalty service and offers service. Loyalty services returns all the members and offers service provides all the differnt offers.

These services are built as containers and deployed in kubernetes clusters.
```
kubectl get svc
kubectl get pods
```

These services are deployed in istio service meshes and a envoy sidecar is running. In order to access these services we have istio ingressgateway and defined Gateway and VirtualSevices to access.

```
kubectl get gateway
```

The details of these Gateway and Virtual Services can be be found at 
```
cat services/loyalty-app/loyalty-ingress.yaml
cat services/offers-app/offers-ingress.yaml
```

These services can also be tested as 

```
curl https://api.loyalty.dynolab.app/members
curl https://api.offers.dynolab.app/offers
```

These services can be accessed without any security. Apigee Envoy Adapter lets you secure this service by adding Envoy filter to the envoy sidecar proxy.  Lets apply the Adapter.
```
kubectl apply -f samples/envoyfilter-sidecar.yaml
```

Lets take a moment to review whats inside the filter
```
cat samples/envoyfilter-sidecar.yaml
```

HTTP Filter
This enables Envoy’s Http External Auth filter for all inbound HTTP calls arriving at all services pod managed by apigee.  The Http External Auth filter calls out to an external service apigee-remote-service-envoy.apigee:5000.

Network Filter
It also enables the Envoy's Access Log filter for all network calls which is required for Analytics.

Once this is applied try the curl command 

```
curl -i https://api.loyalty.dynolab.app/members  
should return 403
```

```
curl -i https://api.offers.dynolab.app/offers  
should return 403
```

- Go to Apigee UI 
     Talk about Api Product - Retail API Loyalty Product
     Talk about App -   Retail API Loyalty App
     Get the API Key - 

- Go to Dev portal , use the API Key to access the APIs -
    - Loyalty API and then Offers API.  Offers API will show 403

-  Test Qouta 
Go to CLI for repeated access - 

Repeat 5 - 10 times :
curl -i https://api.loyalty.dynolab.app/members?x-api-key=xPrbt67D1ydoZdBGdToRkURd6su649CwPrbMfrBeuYocDPI2

