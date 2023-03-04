package com.govtschemes.controller;

import com.govtschemes.entity.UserType;
import com.govtschemes.service.UserTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class UserTypeController {

    @Autowired
    private UserTypeService userTypeService;

    @GetMapping("/user-types")
    public ResponseEntity<?> retrieveAllUserTypes() {
        return new ResponseEntity<>(userTypeService.getAllUserType(), HttpStatus.OK);
    }

    @GetMapping("/user-types/{userTypeId}")
    public ResponseEntity<?> retrieveSingleUserType(@PathVariable Integer userTypeId) {
        return new ResponseEntity<>(userTypeService.getUserType(userTypeId), HttpStatus.OK);
    }

    @PostMapping("/user-types")
    public ResponseEntity<?> createUserType(@RequestBody UserType userType) {
        return new ResponseEntity<>(userTypeService.createUserType(userType), HttpStatus.CREATED);
    }

    @DeleteMapping("/user-types/{userTypeId}")
    public ResponseEntity<?> removeUserType(@PathVariable Integer userTypeId) {
        userTypeService.deleteUserType(userTypeId);
        return new ResponseEntity<>("UserType removed successfully!!", HttpStatus.OK);
    }
}
