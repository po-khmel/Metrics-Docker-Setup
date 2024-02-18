# Metrics-Docker-Setup
DockerCompose setup for collecting and monitoring metrics using Prometheus.

## How to execute
```bash
docker-compose up -d 
```
Visit `https://localhost/federate` to explore metrics.

## Docker Compose

Five Docker containers:
1. NGINX load balancer 
2. NGINX exporter
3. Node exporter
4. Custom exporter for cgroup pids metrics
5. Prometheus for metrics collection


## Nginx Configuration

The Nginx configuration `nginx/nginx.conf` sets up Nginx as a reverse proxy for Prometheus and defines SSL/TLS settings for secure communication.   
SSL certificate was self signed and placed in `nginx` directory:
```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx-selfsigned.key -out nginx-selfsigned.crt
```
**!NB! for security reasons I removed certificate and key from public repo**  

A route for Prometheus federation is  `/federate/`   
Access to other paths is denied.

## Prometheus Configuration

`scrape_interval` for all metrics is set to 10s  

Additional commands in Docker compose file:
- `--web.route-prefix` defines Prometheus’ API inside the container
- `--web.external-url` controls the externally accessible path and relative link generation in the page

## cgroup-pids-exporter
The exporter retrieves data regarding the number of active processes on the host system via the virtual filesystem `/sys/fs/cgroup/pids/` (mounted as read-only within the container).