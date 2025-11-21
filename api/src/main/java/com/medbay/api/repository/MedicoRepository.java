package com.medbay.api.repository;

import com.medbay.api.model.Medico;
import com.medbay.api.model.enums.Especialidade;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MedicoRepository extends JpaRepository<Medico, Long> {
    // Método para filtrar por especialidade (usado na busca do agendamento)
    List<Medico> findByEspecialidade(Especialidade especialidade);
}