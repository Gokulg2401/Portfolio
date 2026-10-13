package dev.gokul.portfolio.profile;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import tools.jackson.databind.ObjectMapper;

@Service
public class ProfileService {

    private final Profile profile;

    public ProfileService(ObjectMapper objectMapper) throws IOException {
        try (InputStream in = new ClassPathResource("data/profile.json").getInputStream()) {
            this.profile = objectMapper.readValue(in, Profile.class);
        }
    }

    public Profile getProfile() {
        return profile;
    }
}
