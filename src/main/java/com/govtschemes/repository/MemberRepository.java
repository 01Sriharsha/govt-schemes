package com.govtschemes.repository;


import com.govtschemes.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByAadharNo(String aadharNo);
}
