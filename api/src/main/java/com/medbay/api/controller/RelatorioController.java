package com.medbay.api.controller;

import com.medbay.api.model.enums.StatusPagamento;
import com.medbay.api.repository.PagamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/relatorios")
@CrossOrigin(origins = "http://localhost:5173")
public class RelatorioController {

    @Autowired
    private PagamentoRepository pagamentoRepository;

    @GetMapping("/financeiro")
    public ResponseEntity<?> gerarRelatorioFinanceiro(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim) {

        LocalDateTime dataInicio = inicio.atStartOfDay();
        LocalDateTime dataFim = fim.atTime(23, 59, 59);

        BigDecimal totalAprovado = pagamentoRepository.somarFaturamento(StatusPagamento.APROVADO, dataInicio, dataFim);

        // Simples retorno JSON com os dados
        return ResponseEntity.ok(Map.of(
                "periodoInicio", inicio,
                "periodoFim", fim,
                "faturamentoTotal", totalAprovado,
                "status", "Gerado com sucesso"
        ));
    }
}