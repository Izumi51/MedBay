package com.medbay.api.model;

import com.medbay.api.model.enums.StatusPagamento;
import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "pagamentos")
public class Pagamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relacionamento 1:1 com Consulta (consulta_id UNIQUE)
    @OneToOne
    @JoinColumn(name = "consulta_id", nullable = false, unique = true)
    private Consulta consulta;

    @Column(nullable = false)
    private BigDecimal valor;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusPagamento status = StatusPagamento.PENDENTE;

    @Column(name = "metodo_pagamento")
    private String metodoPagamento; // Ex: "CARTAO", "PIX"

    @Column(name = "data_pagamento")
    private LocalDateTime dataPagamento;

    @Column(name = "recibo_digital_url")
    private String reciboDigitalUrl;
}