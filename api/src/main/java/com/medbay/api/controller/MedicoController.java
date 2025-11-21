package com.medbay.api.controller;

import com.medbay.api.dto.MedicoCardDTO;
import com.medbay.api.model.Medico;
import com.medbay.api.model.enums.Especialidade;
import com.medbay.api.repository.MedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/medicos")
@CrossOrigin(origins = "http://localhost:5173") // Permite acesso do Frontend (Vite)
public class MedicoController {

    @Autowired
    private MedicoRepository repository;

    // Endpoint para a tela "Nossos Colaboradores"
    @GetMapping
    public List<MedicoCardDTO> listarMedicos(@RequestParam(required = false) Especialidade especialidade) {
        List<Medico> medicos;

        if (especialidade != null) {
            medicos = repository.findByEspecialidade(especialidade);
        } else {
            medicos = repository.findAll();
        }

        return medicos.stream()
                .map(MedicoCardDTO::new)
                .collect(Collectors.toList());
    }
}