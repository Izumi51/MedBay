package com.medbay.api.dto;

import com.medbay.api.model.Medico;
import lombok.Data;

@Data
public class MedicoCardDTO {
    private Long id;
    private String nome;
    private String especialidade;
    private String fotoUrl;

    public MedicoCardDTO(Medico medico) {
        this.id = medico.getId();
        this.nome = medico.getNome();
        this.especialidade = medico.getEspecialidade().name();
        this.fotoUrl = medico.getFotoUrl();
    }
}