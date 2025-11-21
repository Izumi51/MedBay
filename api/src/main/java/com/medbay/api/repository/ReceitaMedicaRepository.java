package com.medbay.api.repository;

import com.medbay.api.model.ReceitaMedica;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceitaMedicaRepository extends JpaRepository<ReceitaMedica, Long> {
    ReceitaMedica findByConsultaId(Long consultaId);
}