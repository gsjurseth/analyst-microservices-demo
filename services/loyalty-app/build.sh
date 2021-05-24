docker build -t loyalty:1.0.0 .
docker tag loyalty:1.0.0 gcr.io/bap-amer-select-demo2/loyalty:1.0.0 
docker push gcr.io/bap-amer-select-demo2/loyalty:1.0.0
