package com.medbay.api.service;

import com.medbay.api.model.Consulta;
import com.medbay.api.model.enums.StatusConsulta;
import com.medbay.api.repository.ConsultaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class NotificacaoService {

    @Autowired
    private ConsultaRepository consultaRepository;

    // Executa todos os dias às 08:00 da manhã
    @Scheduled(cron = "0 0 8 * * *")
    public void enviarLembretesDiarios() {
        LocalDateTime amanhaInicio = LocalDateTime.now().plusDays(1).truncatedTo(ChronoUnit.DAYS);
        LocalDateTime amanhaFim = amanhaInicio.plusDays(1).minusSeconds(1);

        List<Consulta> consultasAmanha = consultaRepository.findByDataHoraBetweenAndStatus(
                amanhaInicio, amanhaFim, StatusConsulta.AGENDADA
        );

        System.out.println("--- INICIANDO ENVIO DE LEMBRETES (UC7) ---");
        for (Consulta consulta : consultasAmanha) {
            // Simulação de envio de e-mail
            System.out.printf("Enviando e-mail para %s: 'Lembrete de consulta amanhã às %s com Dr(a). %s'%n",
                    consulta.getPaciente().getEmail(),
                    consulta.getDataHora().toLocalTime(),
                    consulta.getMedico().getNome());
        }
        System.out.println("--- FIM DO ENVIO ---");
    }
}