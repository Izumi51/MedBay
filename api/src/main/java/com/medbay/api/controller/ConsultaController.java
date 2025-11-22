package com.medbay.api.controller;

import com.medbay.api.dto.*;
import com.medbay.api.model.Consulta;
import com.medbay.api.model.Medico;
import com.medbay.api.model.Paciente;
import com.medbay.api.model.enums.StatusConsulta;
import com.medbay.api.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.medbay.api.model.HistoricoMedico;
import com.medbay.api.model.Pagamento;
import com.medbay.api.model.ReceitaMedica;
import com.medbay.api.model.enums.StatusPagamento;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/consultas")
@CrossOrigin(origins = "http://localhost:5173")
public class ConsultaController {

    @Autowired
    private PagamentoRepository pagamentoRepository;
    @Autowired
    private HistoricoMedicoRepository historicoRepository;
    @Autowired
    private ReceitaMedicaRepository receitaRepository;
    @Autowired
    private ConsultaRepository consultaRepository;
    @Autowired
    private MedicoRepository medicoRepository;
    @Autowired
    private PacienteRepository pacienteRepository;

    @PostMapping
    public ResponseEntity<?> agendar(@RequestBody AgendamentoRequestDTO dados) {
        // 1. Validar Médico
        Medico medico = medicoRepository.findById(dados.getMedicoId())
                .orElseThrow(() -> new RuntimeException("Médico não encontrado"));

        // 2. Validar Paciente (No fluxo real, pegaríamos do Token JWT)
        Paciente paciente = pacienteRepository.findById(dados.getPacienteId())
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));

        boolean horarioOcupado = consultaRepository.existsByMedicoIdAndDataHoraAndStatusNot(
                dados.getMedicoId(),
                dados.getDataHora(),
                StatusConsulta.CANCELADA
        );

        if (horarioOcupado) {
            return ResponseEntity.badRequest().body("Erro: Este médico já possui um agendamento para este horário.");
        }

        // 3. Criar Consulta
        Consulta consulta = new Consulta();
        consulta.setMedico(medico);
        consulta.setPaciente(paciente);
        consulta.setDataHora(dados.getDataHora());
        consulta.setTipoConsulta(dados.getTipoConsulta());
        consulta.setStatus(StatusConsulta.AGENDADA);
        consulta.setValor(new BigDecimal("250.00")); // Valor fixo por enquanto

        consultaRepository.save(consulta);

        return ResponseEntity.ok("Consulta agendada com sucesso! ID: " + consulta.getId());
    }

    // UC8: Realizar Pagamento
    @PostMapping("/{id}/pagamento")
    public ResponseEntity<?> realizarPagamento(@PathVariable Long id, @RequestBody PagamentoRequestDTO dados) {
        Consulta consulta = consultaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consulta não encontrada"));

        Pagamento pagamento = new Pagamento();
        pagamento.setConsulta(consulta);
        pagamento.setValor(consulta.getValor());
        pagamento.setMetodoPagamento(dados.getMetodoPagamento());
        pagamento.setDataPagamento(LocalDateTime.now());
        pagamento.setStatus(StatusPagamento.APROVADO); // Simulação de sucesso imediato
        pagamento.setReciboDigitalUrl("https://medbay.com/recibos/" + System.currentTimeMillis());

        pagamentoRepository.save(pagamento);

        return ResponseEntity.ok("Pagamento realizado com sucesso!");
    }

    // UC5: Registrar Histórico (Médico)
    @PostMapping("/{id}/historico")
    public ResponseEntity<?> registrarHistorico(@PathVariable Long id, @RequestBody HistoricoRequestDTO dados) {
        Consulta consulta = consultaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consulta não encontrada"));

        HistoricoMedico historico = new HistoricoMedico();
        historico.setConsulta(consulta);
        historico.setDiagnostico(dados.getDiagnostico());
        historico.setDataRegistro(LocalDateTime.now());

        historicoRepository.save(historico);

        // Opcional: Atualizar status da consulta para REALIZADA
        // consulta.setStatus(StatusConsulta.REALIZADA);
        // consultaRepository.save(consulta);

        return ResponseEntity.ok("Histórico médico registado com sucesso.");
    }

    // UC6: Emitir Receita (Médico)
    @PostMapping("/{id}/receita")
    public ResponseEntity<?> emitirReceita(@PathVariable Long id, @RequestBody ReceitaRequestDTO dados) {
        Consulta consulta = consultaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consulta não encontrada"));

        ReceitaMedica receita = new ReceitaMedica();
        receita.setConsulta(consulta);
        receita.setMedicamentos(dados.getMedicamentos());
        receita.setDosagem(dados.getDosagem());
        receita.setInstrucoes(dados.getInstrucoes());
        receita.setDataEmissao(LocalDateTime.now());

        receitaRepository.save(receita);

        return ResponseEntity.ok("Receita emitida com sucesso.");
    }

    @GetMapping("/paciente/{pacienteId}")
    public ResponseEntity<List<ConsultaResponseDTO>> listarMinhasConsultas(@PathVariable Long pacienteId) {
        List<Consulta> consultas = consultaRepository.findByPacienteId(pacienteId);

        List<ConsultaResponseDTO> resposta = consultas.stream()
                .map(ConsultaResponseDTO::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(resposta);
    }

    @PatchMapping("/{id}/cancelar")
    public ResponseEntity<?> cancelarConsulta(@PathVariable Long id) {
        // 1. Busca a consulta
        Consulta consulta = consultaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consulta não encontrada"));

        // 2. Validação: Apenas consultas "AGENDADA" podem ser canceladas
        if (consulta.getStatus() != StatusConsulta.AGENDADA) {
            return ResponseEntity.badRequest().body("Não é possível cancelar uma consulta que já foi realizada ou cancelada.");
        }

        // 3. Atualiza o status
        consulta.setStatus(StatusConsulta.CANCELADA);
        consultaRepository.save(consulta);

        // 4. (Opcional) Lógica de Notificação (Email/SMS) entraria aqui
        // emailService.enviarNotificacaoCancelamento(consulta.getMedico(), consulta.getPaciente());

        return ResponseEntity.ok("Consulta cancelada com sucesso.");
    }

    @GetMapping("/medico/{medicoId}")
    public ResponseEntity<List<AgendaMedicoDTO>> listarAgendaMedico(@PathVariable Long medicoId) {
        List<Consulta> consultas = consultaRepository.findByMedicoId(medicoId);

        List<AgendaMedicoDTO> resposta = consultas.stream()
                .map(AgendaMedicoDTO::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(resposta);
    }
}