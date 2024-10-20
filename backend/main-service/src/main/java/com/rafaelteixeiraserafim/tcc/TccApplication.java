package com.rafaelteixeiraserafim.tcc;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class TccApplication {
    public static void main(String[] args) {
        SpringApplication.run(TccApplication.class, args);
    }
}
