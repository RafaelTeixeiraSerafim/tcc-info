package com.rafaelteixeiraserafim.tcc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

@SpringBootApplication
public class TccApplication implements CommandLineRunner {

	@Autowired
	private Environment env;

	public static void main(String[] args) {
		SpringApplication.run(TccApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		String activeProfiles = String.join(", ", env.getActiveProfiles());
		System.out.println("Active Profiles: " + activeProfiles);
	}

}
