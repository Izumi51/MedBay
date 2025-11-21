package com.medbay.api.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "usuarios")
@Inheritance(strategy = InheritanceType.JOINED) // Estratégia para herança na tabela
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    private String telefone;

    @Column(name = "senha_hash", nullable = false)
    private String senha;

    @Column(name = "tipo_usuario", nullable = false)
    private String tipoUsuario; // 'MEDICO', 'PACIENTE', 'ADMIN'

    @Column(name = "data_criacao")
    private LocalDateTime dataCriacao = LocalDateTime.now();
}