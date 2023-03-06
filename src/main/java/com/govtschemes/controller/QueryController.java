package com.govtschemes.controller;

import com.govtschemes.entity.Query;
import com.govtschemes.service.QueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class QueryController {

    @Autowired
    private QueryService queryService;

    @GetMapping("/queries")
    public ResponseEntity<?> retrieveAllQueries() {
        return new ResponseEntity<>(queryService.getAllQueries(), HttpStatus.OK);
    }

    @GetMapping("/members/{memberId}/queries")
    public ResponseEntity<?> retrieveAllQueriesByMember(@PathVariable Long memberId) {
        return new ResponseEntity<>(queryService.getAllQueriesByMember(memberId), HttpStatus.OK);
    }

    @GetMapping("/queries/{queryId}")
    public ResponseEntity<?> retrieveSingleQuery(@PathVariable Long queryId) {
        return new ResponseEntity<>(queryService.getSingleQuery(queryId), HttpStatus.OK);
    }

    @PostMapping("/members/{memberId}/schemes/{schemeId}/queries")
    public ResponseEntity<?> createTheQuery(
            @RequestBody Query query,
            @PathVariable Long memberId,
            @PathVariable Integer schemeId
    ) {
        return new ResponseEntity<>(queryService.createQuery(memberId, schemeId, query), HttpStatus.CREATED);
    }

    @PutMapping("/queries/{queryId}")
    public ResponseEntity<?> updateTheQuery(@RequestBody Query query, @PathVariable Long queryId) {
        return new ResponseEntity<>(queryService.updateQuery(queryId, query), HttpStatus.CREATED);
    }

    @DeleteMapping("/queries/{queryId}")
    public ResponseEntity<?> removeTheQuery(@PathVariable Long queryId) {
        queryService.deleteQuery(queryId);
        return new ResponseEntity<>("Query removed successfully!!", HttpStatus.OK);
    }

}
