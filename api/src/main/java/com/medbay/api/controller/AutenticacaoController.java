package com.medbay.api.controller;

import com.medbay.api.dto.DadosAutenticacao;
import com.medbay.api.dto.DadosTokenJWT;
import com.medbay.api.model.Paciente;
import com.medbay.api.model.Usuario;
import com.medbay.api.repository.PacienteRepository;
import com.medbay.api.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AutenticacaoController {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private PacienteRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity efetuarLogin(@RequestBody DadosAutenticacao dados) {
        // O Spring Security faz a mágica de verificar a senha aqui
        var authenticationToken = new UsernamePasswordAuthenticationToken(dados.email(), dados.senha());
        var authentication = manager.authenticate(authenticationToken);

        var usuario = (Usuario) authentication.getPrincipal();
        var tokenJWT = tokenService.gerarToken(usuario);

        return ResponseEntity.ok(new DadosTokenJWT(tokenJWT, usuario.getId(), usuario.getNome(), usuario.getTipoUsuario()));
    }

    @PostMapping("/cadastro")
    public ResponseEntity cadastrar(@RequestBody Paciente dados) {
        if (repository.findByEmail(dados.getEmail()) != null) return ResponseEntity.badRequest().body("Email já cadastrado");

        // Encriptar senha antes de salvar
        dados.setSenha(passwordEncoder.encode(dados.getSenha()));
        dados.setTipoUsuario("PACIENTE");

        repository.save(dados);

        return ResponseEntity.ok("Usuário cadastrado com sucesso");
    }
}