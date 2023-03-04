package com.govtschemes.service;


import com.govtschemes.entity.Application;
import com.govtschemes.entity.Member;
import com.govtschemes.entity.Scheme;
import com.govtschemes.repository.ApplicationRepository;
import com.govtschemes.repository.MemberRepository;
import com.govtschemes.repository.SchemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private SchemeRepository schemeRepository;

    public List<Application> getAllApplications(){
        return applicationRepository.findAll();
    }

    public Application getSingleApplication(Long applicationId){
        return applicationRepository.findById(applicationId)
                .orElseThrow(()->new RuntimeException("Application not found"));
    }

    public Application createApplication(Long memberId , Integer schemeId , MultipartFile file) throws IOException {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("User Not Found"));
        Scheme scheme = schemeRepository.findById(schemeId)
                .orElseThrow(() -> new RuntimeException("Scheme Not Found"));
        if(applicationRepository.existsByScheme(scheme) && applicationRepository.existsByMember(member)){
            throw new RuntimeException("Already applied!!");
        }
        Application application = new Application();
        Random random = new Random();
        String appId = LocalDate.now().getYear() + "" + random.nextLong(9999 , 99999);
        application.setId(Long.valueOf(appId));
        application.setStatus("pending");
        application.setDocuments(file.getBytes());
        application.setMember(member);
        application.setScheme(scheme);
        return applicationRepository.save(application);
    }

    public Application updateApplication(Long applicationId , Application application){
        Application existingApplication = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        existingApplication.setStatus(application.getStatus());
        return applicationRepository.save(existingApplication);
    }

    public void deleteApplication(Long applicationId){
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        if(application.getStatus().equals("pending")){
            applicationRepository.delete(application);
        }else{
            throw new RuntimeException("Application already " + application.getStatus());
        }
        
    }
}
