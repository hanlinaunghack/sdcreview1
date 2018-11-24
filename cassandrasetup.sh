#!/bin/bash
# Docker Setup
docker run --name reviewDB -d cassandra:latest &&
# docker run -it --link reviewDB:cassandra --rm cassandra sh -c 'exec cqlsh "$CASSANDRA_PORT_9042_TCP_ADDR; create keyspace airbnb if not exists with replication = {class: SimpleStrategy, replication_factor: 1}"' &&
# docker run -it --link reviewDB:cassandra --rm cassandra cqlsh cassandra; ##cqlsh localhost
docker build -t review . &&
docker run -p 80:3000 -d review --link reviewDB;