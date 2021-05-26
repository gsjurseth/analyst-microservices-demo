docker build -t offers:1.0.0 .
docker tag offers:1.0.0 gcr.io/dynolab-153020/offers:1.0.0 
docker push gcr.io/dynolab-153020/offers:1.0.0 
