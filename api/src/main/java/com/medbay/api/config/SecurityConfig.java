package com.medbay.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Desabilitar CSRF para facilitar testes de API (POST/PUT)
                .csrf(AbstractHttpConfigurer::disable)
                // Configurar CORS para aceitar requisições do Frontend (localhost:5173)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                // Definir permissões de rotas
                .authorizeHttpRequests(auth -> auth
                        // Liberar console H2
                        .requestMatchers("/h2-console/**").permitAll()
                        // Liberar endpoints públicos (listagem de médicos, etc)
                        .requestMatchers("/api/medicos/**", "/api/servicos/**").permitAll()
                        // Liberar endpoint de agendamento (em produção, exigiria autenticação)
                        .requestMatchers("/api/consultas/**").permitAll()
                        // Qualquer outra rota requer autenticação
                        .anyRequest().authenticated()
                )
                // Necessário para o console do H2 funcionar em frame
                .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable()));

        return http.build();
    }

    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOrigins(List.of("http://localhost:5173")); // Porta padrão do Vite
        config.setAllowedHeaders(List.of("*"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}