package com.stackroute;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZonedDateTime;

@SpringBootApplication
@EnableSwagger2
@EnableEurekaClient
public class AppointmentServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppointmentServiceApplication.class, args);
	}


	/*@Bean
	public Docket swaggerConfiguration(){

		return new Docket(DocumentationType.SWAGGER_2)
				.select()
				.paths(PathSelectors.any())
				.apis(RequestHandlerSelectors.basePackage("com.stackroute"))
				.build();
	}

	private ApiInfo apiDetails() {
		return new ApiInfo(
				"Appointment service api",
				"appointment service",
				"v1.0.0",
				" digital doctor terms& condition ",
				new Contact("digitol docter","www.dgdoctor.com", "dig@gmail.com"),
				"digital doctor licence",
				"http:/nikk.io",
				Collections.emptyList()
		);
	}*/

	//Swagger configuration for Appointment Service
	@Bean
	public Docket postsApi() {
		return new Docket(DocumentationType.SWAGGER_2)//.groupName("public-api")
				.groupName("")
				.directModelSubstitute(LocalDateTime.class, String.class)
				.directModelSubstitute(LocalDate.class, String.class)
				.directModelSubstitute(LocalTime.class, String.class)
				.directModelSubstitute(ZonedDateTime.class, String.class)

				.select()

				.paths(PathSelectors.any())
				.apis(RequestHandlerSelectors.basePackage("com.stackroute"))
				.build();
	}

}
