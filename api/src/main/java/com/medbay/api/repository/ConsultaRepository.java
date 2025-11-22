package com.medbay.api.repository;

import com.medbay.api.model.Consulta;
import org.springframework.data.jpa.repository.JpaRepository;
import com.medbay.api.model.enums.StatusConsulta;

import java.time.LocalDateTime;
import java.util.List;

public interface ConsultaRepository extends JpaRepository<Consulta, Long> {
    // Para o Dashboard do Médico (ver sua agenda)
    List<Consulta> findByMedicoId(Long medicoId);

    // Para o Dashboard do Paciente (ver suas consultas)
    List<Consulta> findByPacienteId(Long pacienteId);

    // Verifica se existe consulta para o médico, no horário X, que NÃO esteja cancelada
    boolean existsByMedicoIdAndDataHoraAndStatusNot(Long medicoId, LocalDateTime dataHora, StatusConsulta status);

    // UC7: Buscar consultas em um intervalo de tempo (ex: próximo dia)
    List<Consulta> findByDataHoraBetweenAndStatus(LocalDateTime inicio, LocalDateTime fim, StatusConsulta status);

    List<Consulta> findByDataHoraBetween(LocalDateTime inicio, LocalDateTime fim);
}