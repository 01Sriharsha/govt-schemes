package com.govtschemes.service;

import com.govtschemes.entity.Application;
import com.govtschemes.entity.Member;
import com.govtschemes.entity.Query;
import com.govtschemes.entity.Scheme;
import com.govtschemes.repository.MemberRepository;
import com.govtschemes.repository.QueryRepository;
import com.govtschemes.repository.SchemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
public class QueryService {

    @Autowired
    private QueryRepository queryRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private SchemeRepository schemeRepository;

    public List<Query> getAllQueries() {
        return queryRepository.findAll();
    }

    public Query getSingleQuery(Long queryId) {
        return queryRepository.findById(queryId).orElseThrow(() -> new RuntimeException("Query not found"));
    }

    public List<Query> getAllQueriesByMember(Long memberId){
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("User Not Found"));
        return queryRepository.findAllByMember(member);
    }

    public Query createQuery(Long memberId, Integer schemeId, Query query) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("User Not Found"));
        Scheme scheme = schemeRepository.findById(schemeId)
                .orElseThrow(() -> new RuntimeException("Scheme Not Found"));
        long randomNumber = new Random().nextLong(999, 9999);
        //check whether id already exists
        if (queryRepository.existsById(randomNumber)) {
            query.setId(new Random().nextLong(999, 9999));
        } else {
            query.setId(randomNumber);
        }

        //check whether member and scheme already exists
        if (queryRepository.existsByMember(member) && queryRepository.existsByScheme(scheme)) {
            if (queryRepository.findByMember(member).getReply().equals("")) {
                throw new RuntimeException("Existing query is still in pending");
            }
        }
        query.setScheme(scheme);
        query.setMember(member);
        return queryRepository.save(query);
    }

    public Query updateQuery(Long queryId, Query query) {
        Query existingQuery = queryRepository.findById(queryId)
                .orElseThrow(() -> new RuntimeException("Query not found"));
        existingQuery.setMessage(query.getMessage());
        existingQuery.setReply(query.getReply());
        return queryRepository.save(existingQuery);
    }

    public void deleteQuery(Long queryId) {
        Query query = queryRepository.findById(queryId)
                .orElseThrow(() -> new RuntimeException("Query not found"));
        if (query.getReply()==null) {
            queryRepository.delete(query);
        } else {
            throw new RuntimeException("Cannot perform action!! Query already got replied!");
        }
    }
}
