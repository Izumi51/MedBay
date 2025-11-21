package com.medbay.api.model;

import com.medbay.api.model.enums.StatusConsulta;
import com.medbay.api.model.enums.TipoConsulta;
import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "consultas")
public class Consulta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "paciente_id", nullable = false)
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "medico_id", nullable = false)
    private Medico medico;

    @Column(name = "data_hora", nullable = false)
    private LocalDateTime dataHora;

    @Column(nullable = false)
    private BigDecimal valor;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusConsulta status = StatusConsulta.AGENDADA;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_consulta", nullable = false)
    private TipoConsulta tipoConsulta;
}