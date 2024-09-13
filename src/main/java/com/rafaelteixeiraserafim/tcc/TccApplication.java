package com.rafaelteixeiraserafim.tcc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
@PropertySource("classpath:application-{profile}.properties")
public class TccApplication {
	public static void main(String[] args) {
		SpringApplication.run(TccApplication.class, args);
	}
}
