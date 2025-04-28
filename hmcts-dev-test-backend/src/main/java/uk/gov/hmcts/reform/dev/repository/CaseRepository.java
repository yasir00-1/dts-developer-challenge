package uk.gov.hmcts.reform.dev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uk.gov.hmcts.reform.dev.models.Cases;

import java.util.UUID;

public interface CaseRepository extends JpaRepository<Cases, UUID> {
}
