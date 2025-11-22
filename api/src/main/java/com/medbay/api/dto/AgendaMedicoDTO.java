package com.medbay.api.dto;

import com.medbay.api.model.Consulta;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class AgendaMedicoDTO {
    private Long id;
    private String pacienteNome;
    private LocalDateTime dataHora;
    private String status;
    private String tipo;

    public AgendaMedicoDTO(Consulta consulta) {
        this.id = consulta.getId();
        this.pacienteNome = consulta.getPaciente().getNome();
        this.dataHora = consulta.getDataHora();
        this.status = consulta.getStatus().name();
        this.tipo = consulta.getTipoConsulta().name();
    }
}