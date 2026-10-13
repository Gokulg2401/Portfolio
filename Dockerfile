# syntax=docker/dockerfile:1

# ---------- 1. Build the React frontend ----------
FROM node:22-alpine AS frontend
WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# ---------- 2. Build the Spring Boot jar (with the frontend bundled in) ----------
FROM maven:3.9-eclipse-temurin-21 AS backend
WORKDIR /backend
COPY backend/pom.xml ./
RUN mvn -q -B dependency:go-offline
COPY backend/src ./src
# Spring Boot serves anything in classpath:/static, so the React build becomes the site root.
COPY --from=frontend /frontend/dist ./src/main/resources/static
RUN mvn -q -B -DskipTests package

# ---------- 3. Slim runtime image ----------
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
RUN addgroup -S app && adduser -S app -G app
COPY --from=backend /backend/target/portfolio-*.jar app.jar
USER app

# Tuned for small (512 MB) free-tier instances.
ENV JAVA_OPTS="-XX:MaxRAMPercentage=75 -XX:+UseSerialGC -Xss512k -XX:TieredStopAtLevel=1"
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "exec java $JAVA_OPTS -jar app.jar"]
