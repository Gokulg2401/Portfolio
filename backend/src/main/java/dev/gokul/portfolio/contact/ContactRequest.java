package dev.gokul.portfolio.contact;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ContactRequest(
        @NotBlank(message = "Please enter your name")
        @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
        @Pattern(regexp = "^[\\p{L} .'-]+$", message = "Name can only contain letters, spaces, . ' and -")
        String name,

        @NotBlank(message = "Please enter your email")
        @Email(message = "Please enter a valid email address")
        @Pattern(regexp = EMAIL_REGEX, message = "Please enter a valid email address (e.g. name@company.com)")
        @Size(max = 150, message = "Email must be under 150 characters")
        String email,

        @NotBlank(message = "Please enter your contact number")
        @Pattern(regexp = PHONE_REGEX, message = "Enter a valid phone number: 10-digit mobile, or +country code and number")
        String phone,

        @Size(max = 100, message = "Company must be under 100 characters")
        String company,

        @NotBlank(message = "Please add a subject")
        @Size(max = 150, message = "Subject must be under 150 characters")
        String subject,

        @NotBlank(message = "Please write a message")
        @Size(min = 20, max = 3000, message = "Message must be between 20 and 3000 characters")
        String message,

        // Honeypot: hidden in the UI, so only bots fill it in.
        String website) {

    /** local@domain.tld — no spaces, no consecutive dots, TLD of 2+ letters. Mirrors the frontend check. */
    static final String EMAIL_REGEX =
            "^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\\.)+[A-Za-z]{2,}$";

    /**
     * Either a 10-digit Indian mobile (starts 6-9, optional +91/0 prefix) or an international
     * number "+<country code> <number>" with 8-15 digits in total. Spaces and dashes are allowed.
     */
    static final String PHONE_REGEX =
            "^(?:(?:\\+91[\\s-]?|0)?[6-9]\\d{4}[\\s-]?\\d{5}|\\+(?!91)[1-9]\\d{0,2}[\\s-]?\\d(?:[\\s-]?\\d){6,13})$";

    public boolean isLikelySpam() {
        return website != null && !website.isBlank();
    }
}
