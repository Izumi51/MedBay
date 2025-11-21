package com.medbay.api.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "historicos_medicos")
public class HistoricoMedico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "consulta_id", nullable = false, unique = true)
    private Consulta consulta;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String diagnostico;

    @Column(name = "data_registro", nullable = false)
    private LocalDateTime dataRegistro = LocalDateTime.now();
}