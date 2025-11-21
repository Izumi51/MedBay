package com.medbay.api.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "receitas_medicas")
public class ReceitaMedica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "consulta_id", nullable = false, unique = true)
    private Consulta consulta;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String medicamentos;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String dosagem;

    @Column(columnDefinition = "TEXT")
    private String instrucoes;

    @Column(name = "data_emissao", nullable = false)
    private LocalDateTime dataEmissao = LocalDateTime.now();
}