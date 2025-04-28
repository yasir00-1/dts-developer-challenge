package uk.gov.hmcts.reform.dev.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import uk.gov.hmcts.reform.dev.models.Cases;
import uk.gov.hmcts.reform.dev.repository.CaseRepository;

import java.net.URI;
import java.util.Optional;
import java.util.UUID;
import java.util.List;

@RestController
@RequestMapping("/cases")
public class CasesController {
    private final CaseRepository repo;

    public CasesController(CaseRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public ResponseEntity<Cases> create(@RequestBody Cases c) {
        c.setId(null);
        Cases saved = repo.save(c);
        return ResponseEntity.created(URI.create("/cases/" + saved.getId())).body(saved);
    }

    @GetMapping
    public List<Cases> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cases> getById(@PathVariable UUID id) {
        Optional<Cases> found = repo.findById(id);
        return found.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/status")
    public ResponseEntity<Cases> updateStatus(@PathVariable UUID id, @RequestParam Cases.Status status) {
        Optional<Cases> found = repo.findById(id);
        if (found.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Cases existing = found.get();
        existing.setStatus(status);
        Cases updated = repo.save(existing);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Cases> delete(@PathVariable UUID id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
