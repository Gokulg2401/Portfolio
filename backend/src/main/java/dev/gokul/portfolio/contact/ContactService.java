package dev.gokul.portfolio.contact;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

/**
 * Delivers contact-form messages by email. Two transports are supported:
 * <ul>
 *   <li><b>Resend</b> (HTTPS API) — used when {@code RESEND_API_KEY} is set. Works on hosts that block SMTP ports.</li>
 *   <li><b>SMTP</b> (e.g. Gmail + App Password) — used when {@code spring.mail.username} is set.</li>
 * </ul>
 */
@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);

    private final JavaMailSender mailSender;
    private final String smtpAccount;
    private final String resendApiKey;
    private final String resendFrom;
    private final String recipient;
    private final RestClient resend = RestClient.create("https://api.resend.com");

    public ContactService(
            JavaMailSender mailSender,
            @Value("${spring.mail.username:}") String smtpAccount,
            @Value("${portfolio.mail.resend.api-key:}") String resendApiKey,
            @Value("${portfolio.mail.resend.from}") String resendFrom,
            @Value("${portfolio.contact.recipient}") String recipient) {
        this.mailSender = mailSender;
        this.smtpAccount = smtpAccount;
        this.resendApiKey = resendApiKey;
        this.resendFrom = resendFrom;
        this.recipient = recipient;
    }

    public void send(ContactRequest request) {
        String subject = "[Portfolio] " + singleLine(request.subject()) + " — " + singleLine(request.name());
        String body = buildBody(request);
        String replyTo = request.email().trim();

        if (StringUtils.hasText(resendApiKey)) {
            sendViaResend(subject, body, replyTo);
        } else if (StringUtils.hasText(smtpAccount)) {
            sendViaSmtp(subject, body, replyTo);
        } else {
            throw new ContactUnavailableException();
        }
        log.info("Contact message sent from {}", replyTo);
    }

    private void sendViaSmtp(String subject, String body, String replyTo) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(smtpAccount);
        mail.setTo(recipient);
        mail.setReplyTo(replyTo);
        mail.setSubject(subject);
        mail.setText(body);
        mailSender.send(mail);
    }

    private void sendViaResend(String subject, String body, String replyTo) {
        try {
            resend.post()
                    .uri("/emails")
                    .header("Authorization", "Bearer " + resendApiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of(
                            "from", resendFrom,
                            "to", List.of(recipient),
                            "reply_to", replyTo,
                            "subject", subject,
                            "text", body))
                    .retrieve()
                    .toBodilessEntity();
        } catch (RestClientException ex) {
            throw new MailSendException("Resend delivery failed: " + ex.getMessage(), ex);
        }
    }

    private String buildBody(ContactRequest request) {
        String company = StringUtils.hasText(request.company()) ? request.company().trim() : "—";
        return """
                New message from your portfolio contact form

                Name:    %s
                Email:   %s
                Phone:   %s
                Company: %s
                Subject: %s

                %s

                ---
                Reply to this email to respond directly to %s.
                """.formatted(
                request.name().trim(),
                request.email().trim(),
                request.phone().trim(),
                company,
                request.subject().trim(),
                request.message().trim(),
                request.name().trim());
    }

    /** Strips line breaks so user input can't inject extra mail headers. */
    private static String singleLine(String value) {
        return value.replaceAll("[\\r\\n]+", " ").trim();
    }
}
