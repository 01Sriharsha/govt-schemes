package com.govtschemes.controller;


import com.govtschemes.entity.Admin;
import com.govtschemes.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/admin/login")
    public ResponseEntity<?> adminLogin(@RequestBody Admin admin) {
        Admin existingAdmin = adminRepository.findById(admin.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!existingAdmin.getPassword().equals(admin.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }
        Map<String , String> response = new HashMap<>();
        response.put("user" , "admin");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
