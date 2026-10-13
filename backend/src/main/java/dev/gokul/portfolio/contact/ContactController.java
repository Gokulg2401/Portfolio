package dev.gokul.portfolio.contact;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;
    private final RateLimiter rateLimiter;

    public ContactController(ContactService contactService, RateLimiter rateLimiter) {
        this.contactService = contactService;
        this.rateLimiter = rateLimiter;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> send(@Valid @RequestBody ContactRequest request, HttpServletRequest http) {
        Map<String, String> ok = Map.of("message", "Thanks! Your message has been sent.");

        // Pretend success for bots so they don't retry.
        if (request.isLikelySpam()) {
            return ResponseEntity.ok(ok);
        }
        if (!rateLimiter.tryAcquire(http.getRemoteAddr())) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(Map.of("message", "Too many messages. Please try again in a few minutes."));
        }

        contactService.send(request);
        return ResponseEntity.ok(ok);
    }
}
