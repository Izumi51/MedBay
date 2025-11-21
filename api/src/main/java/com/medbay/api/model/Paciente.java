package com.medbay.api.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "pacientes")
@PrimaryKeyJoinColumn(name = "usuario_id")
public class Paciente extends Usuario {

    @Column(nullable = false)
    private LocalDate dataNascimento;

    @Column(nullable = false, unique = true)
    private String cpf;

    @Column(columnDefinition = "TEXT")
    private String endereco;
}