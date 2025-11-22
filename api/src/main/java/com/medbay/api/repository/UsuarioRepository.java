package com.medbay.api.repository;

import com.medbay.api.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // O Spring Security usa este método para buscar o usuário
    UserDetails findByEmail(String email);
}