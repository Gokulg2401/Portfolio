package dev.gokul.portfolio.contact;

public class ContactUnavailableException extends RuntimeException {

    public ContactUnavailableException() {
        super("Email delivery is not configured");
    }
}
