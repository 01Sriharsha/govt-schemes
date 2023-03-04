package com.govtschemes.repository;

import com.govtschemes.entity.UserType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserTypeRepository extends JpaRepository<UserType , Integer> {
}
