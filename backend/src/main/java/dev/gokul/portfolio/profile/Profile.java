package dev.gokul.portfolio.profile;

import java.util.List;

public record Profile(
        String name,
        String title,
        List<String> roles,
        String tagline,
        String summary,
        String location,
        String availability,
        Resume resume,
        Contact contact,
        List<Highlight> highlights,
        List<Service> services,
        List<Experience> experience,
        List<SkillGroup> skills,
        List<Certification> certifications,
        List<Education> education) {

    public record Resume(String url, String fileName) {}

    public record Contact(String email, String phone, String linkedin, String github) {}

    public record Highlight(String value, String label) {}

    public record Service(String icon, String title, String description) {}

    public record Experience(String company, String role, String period, List<String> stack, List<Project> projects) {}

    public record Project(String name, List<String> points) {}

    public record SkillGroup(String category, List<String> items) {}

    public record Certification(String name, String issuer, String description) {}

    public record Education(String institution, String degree, String year, String score) {}
}
