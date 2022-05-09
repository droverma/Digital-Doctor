FROM openjdk:11-jre-slim
WORKDIR usr/src
EXPOSE 8671
ADD ./target/eurekaServer-0.0.1-SNAPSHOT.jar /usr/src/eurekaServer-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","eureka-server-0.0.1-SNAPSHOT.jar"]