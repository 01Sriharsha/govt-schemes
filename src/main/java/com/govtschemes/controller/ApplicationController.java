package com.govtschemes.controller;

import com.govtschemes.entity.Application;
import com.govtschemes.service.ApplicationService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @GetMapping("/applications")
    public ResponseEntity<?> retrieveAllApplications() {
        return new ResponseEntity<>(applicationService.getAllApplications(), HttpStatus.OK);
    }
    @GetMapping("/members/{memberId}/applications")
    public ResponseEntity<?> retrieveAllApplicationsByMember(@PathVariable Long memberId) {
        return new ResponseEntity<>(applicationService.getAllApplicationsByMember(memberId), HttpStatus.OK);
    }

    @GetMapping("/applications/{applicationId}")
    public ResponseEntity<?> retrieveSingleApplication(@PathVariable Long applicationId) {
        return new ResponseEntity<>(applicationService.getSingleApplication(applicationId), HttpStatus.OK);
    }

    @PostMapping("/members/{memberId}/schemes/{schemeId}/applications")
    public ResponseEntity<?> createNewApplication(
            @PathVariable Long memberId,
            @PathVariable Integer schemeId,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        return new ResponseEntity<>(applicationService.createApplication(memberId, schemeId, file), HttpStatus.CREATED);
    }

    @PutMapping("/applications/{applicationId}")
    public ResponseEntity<?> updateTheApplication(@PathVariable Long applicationId, @RequestBody Application application) {
        return new ResponseEntity<>(applicationService.updateApplication(applicationId, application), HttpStatus.CREATED);
    }

    @DeleteMapping("/applications/{applicationId}")
    public ResponseEntity<?> removeTheApplication(@PathVariable Long applicationId) {
        applicationService.deleteApplication(applicationId);
        return new ResponseEntity<>("Application removed successfully!!", HttpStatus.OK);
    }

    @GetMapping("/applications/{applicationId}/documents/download")
    public ResponseEntity<?> downloadFile(@PathVariable Long applicationId, HttpServletResponse response) throws IOException {
        byte[] file = applicationService.getSingleApplication(applicationId).getDocuments();
        ByteArrayInputStream inputStream = new ByteArrayInputStream(file);
        response.setContentType(String.valueOf(MediaType.ALL));
        StreamUtils.copy(inputStream, response.getOutputStream());
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

}
