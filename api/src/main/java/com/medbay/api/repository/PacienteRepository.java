package com.medbay.api.repository;

import com.medbay.api.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    // Útil para login ou verificação de cadastro duplicado
    boolean existsByCpf(String cpf);
    Paciente findByEmail(String email);
}