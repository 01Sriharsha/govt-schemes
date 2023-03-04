package com.govtschemes.repository;

import com.govtschemes.entity.Scheme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SchemeRepository extends JpaRepository<Scheme, Integer> {
    @Query(value = "SELECT * FROM Scheme s " +
            "WHERE (s.end_age >= :age OR s.end_age = 'all') " +
            "AND (s.start_age <= :age OR s.start_age = 'all') " +
            "AND (s.caste = :caste OR s.caste = 'all')" +
            "AND (s.user_type = :userType OR s.user_type = 'all') " +
            "AND (s.marital_status = :maritalStatus OR s.marital_status  = 'all') " +
            "AND (s.gender = :gender OR s.gender = 'all')"
            , nativeQuery = true
    )
    List<Scheme> getMatchingScheme(
            @Param("age") Integer age,
            @Param("caste") String caste,
            @Param("gender") String gender,
            @Param("userType") String userType,
            @Param("maritalStatus") String maritalStatus
    );

}
