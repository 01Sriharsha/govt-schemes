package com.govtschemes.service;


import com.govtschemes.entity.UserType;
import com.govtschemes.repository.UserTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserTypeService {
    
    @Autowired
    private UserTypeRepository userTypeRepository;

    public UserType getUserType(Integer userTypeId) {
        return userTypeRepository.findById(userTypeId).orElseThrow(() -> new RuntimeException("userType Not Found"));
    }

    public List<UserType> getAllUserType() {
        return userTypeRepository.findAll();
    }

    public UserType createUserType(UserType userType) {
        return userTypeRepository.save(userType);
    }

    public void deleteUserType(Integer userTypeId) {
        UserType userType = userTypeRepository.findById(userTypeId)
                .orElseThrow(() -> new RuntimeException("userType Not Found"));
        userTypeRepository.delete(userType);
    }
}
