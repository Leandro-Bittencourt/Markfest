package com.markfest.participation.controller;

import jakarta.validation.constraints.NotNull;

public class RegistrationRequest {
    @NotNull
    private Long userId;
    @NotNull
    private Long eventId;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public Long getEventId() { return eventId; }
    public void setEventId(Long eventId) { this.eventId = eventId; }
}
