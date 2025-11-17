package com.markfest.participation.controller;

import com.markfest.participation.model.Registration;
import com.markfest.participation.repository.RegistrationRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/registrations")
public class RegistrationController {
    private final RegistrationRepository repo;

    public RegistrationController(RegistrationRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public ResponseEntity<Registration> create(@Valid @RequestBody RegistrationRequest request) {
        Registration r = new Registration();
        r.setUserId(request.getUserId());
        r.setEventId(request.getEventId());
        r.setStatus("REGISTERED");
        Registration saved = repo.save(r);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(saved.getId())
                .toUri();
        return ResponseEntity.created(location).body(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancel(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.ok(java.util.Map.of("status","cancelled"));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Registration>> byUser(@PathVariable Long userId) {
        return ResponseEntity.ok(repo.findByUserId(userId));
    }
}
