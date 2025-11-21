package com.medbay.api.model;

import com.medbay.api.model.enums.Especialidade;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "medicos")
@PrimaryKeyJoinColumn(name = "usuario_id") // Chave estrangeira que é também PK
public class Medico extends Usuario {

    @Column(nullable = false, unique = true)
    private String crm;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Especialidade especialidade;

    @Column(name = "endereco_consultorio")
    private String enderecoConsultorio;

    @Column(name = "horario_atendimento")
    private String horarioAtendimento;

    // Campo adicional para suportar o design do Figma
    @Column(name = "foto_url")
    private String fotoUrl;
}