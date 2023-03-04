package com.govtschemes.controller;


import com.govtschemes.entity.Member;
import com.govtschemes.entity.Scheme;
import com.govtschemes.service.SchemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class SchemeController {

    @Autowired
    private SchemeService schemeService;

    @GetMapping("/schemes")
    public ResponseEntity<?> retrieveAllSchemes() {
        return new ResponseEntity<>(schemeService.getAllSchemes(), HttpStatus.OK);
    }

    @GetMapping("/schemes/{schemeId}")
    public ResponseEntity<?> retrieveSingleSchemes(@PathVariable Integer schemeId) {
        return new ResponseEntity<>(schemeService.getScheme(schemeId), HttpStatus.OK);
    }

    @PostMapping("/schemes")
    public ResponseEntity<?> createScheme(@RequestBody Scheme scheme) {
        return new ResponseEntity<>(schemeService.createScheme(scheme), HttpStatus.CREATED);
    }

    @PutMapping("/schemes/{schemeId}")
    public ResponseEntity<?> editScheme(@PathVariable Integer schemeId, @RequestBody Scheme scheme) {
        return new ResponseEntity<>(schemeService.updateScheme(schemeId, scheme), HttpStatus.CREATED);
    }

    @DeleteMapping("/schemes/{schemeId}")
    public ResponseEntity<?> removeScheme(@PathVariable Integer schemeId) {
        schemeService.deleteScheme(schemeId);
        return new ResponseEntity<>("Scheme removed successfully!!", HttpStatus.OK);
    }

    @PostMapping("/schemes/matching")
    public ResponseEntity<?> retrieveAllSchemesMatchingMemberDetails(@RequestBody Member member){
        return new ResponseEntity<>(schemeService.getAllMatchingSchemes(member) , HttpStatus.OK);
    }
}
