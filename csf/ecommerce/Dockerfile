FROM node:16 AS angular-build
WORKDIR /app

COPY client .
RUN cd client && npm install && npm run build --prod

FROM maven:3.8.4-openjdk-17 AS springboot-build
WORKDIR /backend

COPY mvnw .
COPY mvnw.cmd .
COPY pom.xml .
COPY .mvn .mvn
COPY src src

RUN ./mvnw clean package -DskipTests

FROM openjdk:17
WORKDIR /app
COPY --from=springboot-build /backend/target/*.jar ecommerce-1.0.0.jar

COPY --from=angular-build /app/client/dist/client /static

ENV SPRING_RESOURCES_STATIC_LOCATIONS=file:/app/static/

ENV DATABASE_URL=""
ENV DATABASE_USERNAME=""
ENV DATABASE_PASSWORD=""

ENV MONGO_DB_URL=""

# Expose the Spring Boot default port
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "target/ecommerce-1.0.0.jar"]
