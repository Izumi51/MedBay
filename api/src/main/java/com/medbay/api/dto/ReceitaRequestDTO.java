package com.medbay.api.dto;

import lombok.Data;

@Data
public class ReceitaRequestDTO {
    private String medicamentos;
    private String dosagem;
    private String instrucoes;
}