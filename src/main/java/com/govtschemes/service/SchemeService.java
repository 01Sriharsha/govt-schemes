package com.govtschemes.service;


import com.govtschemes.entity.Member;
import com.govtschemes.entity.Scheme;
import com.govtschemes.repository.SchemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SchemeService {

    @Autowired
    private SchemeRepository schemeRepository;

    public Scheme createScheme(Scheme scheme) {
        return schemeRepository.save(scheme);
    }

    public Scheme getScheme(Integer schemeId) {
        return schemeRepository.findById(schemeId)
                .orElseThrow(() -> new RuntimeException("Scheme not found with the provided scheme id"));
    }

    public List<Scheme> getAllSchemes() {
        return schemeRepository.findAll();
    }

    public Scheme updateScheme(Integer schemeId, Scheme scheme) {
        Scheme existingScheme = schemeRepository.findById(schemeId)
                .orElseThrow(() -> new RuntimeException("Scheme not found with the provided scheme id"));
        existingScheme.setCaste(scheme.getCaste());
        existingScheme.setDocuments(scheme.getDocuments());
        existingScheme.setDescription(scheme.getDescription());
        existingScheme.setEndAge(scheme.getEndAge());
        existingScheme.setTitle(scheme.getTitle());
        existingScheme.setMaritalStatus(scheme.getMaritalStatus());
        existingScheme.setStartAge(scheme.getStartAge());
        existingScheme.setStatus(scheme.getStatus());
        existingScheme.setUserType(scheme.getUserType());
        existingScheme.setGender(scheme.getGender());
        return schemeRepository.save(existingScheme);
    }

    public void deleteScheme(Integer schemeId) {
        Scheme scheme = schemeRepository.findById(schemeId)
                .orElseThrow(() -> new RuntimeException("Scheme not found with the provided scheme id"));
        schemeRepository.delete(scheme);
    }

    public List<Scheme> getAllMatchingSchemes(Member member) {
        System.out.println(member.getAge());
        System.out.println(member.getCaste());
        System.out.println(member.getGender());
        System.out.println(member.getUserType());
        System.out.println(member.getMaritalStatus());
        return schemeRepository.getMatchingScheme(
                member.getAge(),
                member.getCaste(),
                member.getGender(),
                member.getUserType(),
                member.getMaritalStatus()
        );
    }
}
