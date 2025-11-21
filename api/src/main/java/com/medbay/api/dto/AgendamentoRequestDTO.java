package com.medbay.api.dto;

import com.medbay.api.model.enums.TipoConsulta;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class AgendamentoRequestDTO {
    // Dados para identificar/criar o paciente (Simplificação do fluxo)
    private Long pacienteId;

    // Dados do Agendamento
    private Long medicoId;
    private LocalDateTime dataHora;
    private TipoConsulta tipoConsulta;
}