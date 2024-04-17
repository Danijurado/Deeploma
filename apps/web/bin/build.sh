#!/bin/sh

ECR_REGISTRY=851725170926.dkr.ecr.eu-south-2.amazonaws.com
GIT_SHA=$(git rev-parse --short HEAD)
TAG=$ECR_REGISTRY/frontend-service:$GIT_SHA

docker buildx build --platform linux/amd64 -t $TAG  -f Dockerfile ../../ 
docker push $TAG
