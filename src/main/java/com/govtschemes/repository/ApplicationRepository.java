package com.govtschemes.repository;


import com.govtschemes.entity.Application;
import com.govtschemes.entity.Member;
import com.govtschemes.entity.Scheme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application , Long> {

    boolean existsByScheme(Scheme scheme);
    boolean existsByMember(Member member);

    List<Application> findAllByMember(Member member);
}
