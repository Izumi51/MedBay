package com.medbay.api.dto;

import lombok.Data;

@Data
public class PagamentoRequestDTO {
    private String metodoPagamento; // "CARTAO", "PIX", etc.
    // Num cenário real, haveria dados do cartão aqui (tokenizados)
}