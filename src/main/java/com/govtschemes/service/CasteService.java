package com.govtschemes.service;


import com.govtschemes.entity.Caste;
import com.govtschemes.repository.CasteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CasteService {
    private final CasteRepository casteRepository;

    public CasteService(CasteRepository casteRepository) {
        this.casteRepository = casteRepository;
    }

    public Caste getCaste(Integer casteId) {
        return casteRepository.findById(casteId).orElseThrow(() -> new RuntimeException("Caste Not Found"));
    }

    public List<Caste> getAllCaste() {
        return casteRepository.findAll();
    }

    public Caste createCaste(Caste caste) {
        return casteRepository.save(caste);
    }

    public void deleteCaste(Integer casteId) {
        Caste caste = casteRepository.findById(casteId)
                .orElseThrow(() -> new RuntimeException("Caste Not Found"));
        casteRepository.delete(caste);
    }
}
