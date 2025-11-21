package com.medbay.api.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "servicos")
public class Servico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome; // Ex: "Checkup gratuito"

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(name = "icone_url")
    private String iconeUrl; // URL ou nome do ícone para o frontend
}