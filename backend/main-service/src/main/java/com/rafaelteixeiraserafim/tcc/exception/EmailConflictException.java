package com.rafaelteixeiraserafim.tcc.exception;

public class EmailConflictException extends RuntimeException {
    public EmailConflictException() {
        super();
    }

    public EmailConflictException(String message) {
        super(message);
    }

    public EmailConflictException(String message, Throwable cause) {
        super(message, cause);
    }
}
