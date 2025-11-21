package com.medbay.api.repository;

import com.medbay.api.model.Consulta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConsultaRepository extends JpaRepository<Consulta, Long> {
    // Para o Dashboard do Médico (ver sua agenda)
    List<Consulta> findByMedicoId(Long medicoId);

    // Para o Dashboard do Paciente (ver suas consultas)
    List<Consulta> findByPacienteId(Long pacienteId);
}