docker build -t loyalty:1.0.0 .
docker tag loyalty:1.0.0 gcr.io/dynolab-153020/loyalty:1.0.0 
docker push gcr.io/dynolab-153020/loyalty:1.0.0
