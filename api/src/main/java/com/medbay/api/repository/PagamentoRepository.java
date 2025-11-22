package com.medbay.api.repository;

import com.medbay.api.model.Pagamento;
import com.medbay.api.model.enums.StatusPagamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface PagamentoRepository extends JpaRepository<Pagamento, Long> {
    // Útil para verificar se uma consulta já foi paga
    Pagamento findByConsultaId(Long consultaId);

    @Query("SELECT COALESCE(SUM(p.valor), 0) FROM Pagamento p WHERE p.status = :status AND p.dataPagamento BETWEEN :inicio AND :fim")
    BigDecimal somarFaturamento(@Param("status") StatusPagamento status, @Param("inicio") LocalDateTime inicio, @Param("fim") LocalDateTime fim);
}