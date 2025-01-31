.PHONY: up
up:
	docker compose up -d
	awslocal s3 mb s3://mysamplebucket

.PHONY: down
down:
	docker compose down

.PHONY: listbuckets
listbuckets:
	awslocal s3api list-buckets