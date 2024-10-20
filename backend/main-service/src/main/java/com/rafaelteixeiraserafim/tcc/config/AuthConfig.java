package com.rafaelteixeiraserafim.tcc.config;

import com.rafaelteixeiraserafim.tcc.config.auth.SecurityFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class AuthConfig {
    SecurityFilter securityFilter;

    @Autowired
    public AuthConfig(SecurityFilter securityFilter) {
        this.securityFilter = securityFilter;
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/api/v1/auth/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/auth/signup/admin").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/v1/products/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/products").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/v1/products/*").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/products/*").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/v1/categories").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/categories").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/v1/categories/*").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/categories/*").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/v1/bought-products/*").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/v1/orders").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/v1/orders").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/v1/orders/status").permitAll()
                        .requestMatchers(HttpMethod.PATCH, "/api/v1/orders/*").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/v1/orders/{orderId}").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/v1/orders/place-order/*").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/v1/order-items/*").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/v1/order-items/*").hasRole("USER")
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/order-items/*").hasRole("USER")
                        .requestMatchers(HttpMethod.GET, "/api/v1/addresses").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/v1/addresses").hasRole("USER")
                        .requestMatchers(HttpMethod.GET, "/api/v1/addresses/postal-code/*").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/users/*").hasRole("ADMIN")
                        .anyRequest().authenticated())
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
