package com.govtschemes.repository;

import com.govtschemes.entity.Member;
import com.govtschemes.entity.Query;
import com.govtschemes.entity.Scheme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface QueryRepository extends JpaRepository<Query , Long> {

    boolean existsByMember(Member member);
    boolean existsByScheme(Scheme scheme);

    Query findByMember(Member member);
}
