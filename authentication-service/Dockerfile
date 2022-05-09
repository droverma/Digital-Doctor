FROM openjdk:11-jre-slim
WORKDIR usr/src
EXPOSE 8095
ENV MYSQL_USERNAME=root
ENV MYSQL_PASSWORD=Nikhil@369
ADD ./target/authentication-service-0.0.1-SNAPSHOT.jar /usr/src/authentication-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","authentication-service-0.0.1-SNAPSHOT.jar"]