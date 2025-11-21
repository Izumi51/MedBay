package com.medbay.api.repository;

import com.medbay.api.model.Pagamento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PagamentoRepository extends JpaRepository<Pagamento, Long> {
    // Útil para verificar se uma consulta já foi paga
    Pagamento findByConsultaId(Long consultaId);
}