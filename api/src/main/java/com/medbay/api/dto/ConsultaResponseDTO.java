package com.medbay.api.dto;

import com.medbay.api.model.Consulta;
import lombok.Data;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Data
public class ConsultaResponseDTO {
    private Long id;
    private LocalDateTime dataHora;
    private String medicoNome;
    private String medicoEspecialidade;
    private String medicoFoto;
    private String status;
    private String tipo;
    private BigDecimal valor;
    private String pacienteNome;

    public ConsultaResponseDTO(Consulta consulta) {
        this.id = consulta.getId();
        this.dataHora = consulta.getDataHora();
        this.medicoNome = consulta.getMedico().getNome();
        this.medicoEspecialidade = consulta.getMedico().getEspecialidade().name();
        this.medicoFoto = consulta.getMedico().getFotoUrl();
        this.status = consulta.getStatus().name();
        this.tipo = consulta.getTipoConsulta().name();
        this.valor = consulta.getValor();
        this.pacienteNome = consulta.getPaciente().getNome();
    }
}