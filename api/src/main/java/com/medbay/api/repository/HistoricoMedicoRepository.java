package com.medbay.api.repository;

import com.medbay.api.model.HistoricoMedico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoricoMedicoRepository extends JpaRepository<HistoricoMedico, Long> {
    HistoricoMedico findByConsultaId(Long consultaId);
}