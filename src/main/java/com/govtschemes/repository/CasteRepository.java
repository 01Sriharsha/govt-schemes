package com.govtschemes.repository;

import com.govtschemes.entity.Caste;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CasteRepository extends JpaRepository< Caste , Integer> {
}
