package com.govtschemes.controller;


import com.govtschemes.entity.Caste;
import com.govtschemes.service.CasteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class CasteController {

    @Autowired
    private CasteService casteService;

    @GetMapping("/caste")
    public ResponseEntity<?> retrieveAllCastes() {
        return new ResponseEntity<>(casteService.getAllCaste(), HttpStatus.OK);
    }

    @GetMapping("/caste/{casteId}")
    public ResponseEntity<?> retrieveSingleCaste(@PathVariable Integer casteId) {
        return new ResponseEntity<>(casteService.getCaste(casteId), HttpStatus.OK);
    }

    @PostMapping("/caste")
    public ResponseEntity<?> createCaste(@RequestBody Caste caste) {
        return new ResponseEntity<>(casteService.createCaste(caste), HttpStatus.CREATED);
    }

    @DeleteMapping("/caste/{casteId}")
    public ResponseEntity<?> removeCaste(@PathVariable Integer casteId) {
        casteService.deleteCaste(casteId);
        return new ResponseEntity<>("Caste removed successfully!!", HttpStatus.OK);
    }
}
