package com.govtschemes;

import com.govtschemes.entity.Member;
import com.govtschemes.entity.Query;
import com.govtschemes.entity.Scheme;
import com.govtschemes.repository.ApplicationRepository;
import com.govtschemes.repository.MemberRepository;
import com.govtschemes.repository.QueryRepository;
import com.govtschemes.repository.SchemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@SpringBootApplication
public class GovtSchemesApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(GovtSchemesApplication.class, args);
    }

    @Autowired
    private SchemeRepository schemeRepository;
    @Autowired
    private ApplicationRepository applicationRepository;
    @Autowired
    private MemberRepository memberRepository;


    @Bean
    @Primary
    public WebMvcConfigurer configurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("*")
                        .allowedMethods("*")
                        .allowedOrigins("http://localhost:3000")
                        .allowedHeaders("*")
                        .maxAge(3600L);
            }
        };
    }


    @Autowired
    private QueryRepository queryRepository;
    @Override
    public void run(String... args) throws Exception {
        Member member = memberRepository.findById(488L).get();
        List<Query> allByMember = queryRepository.findAllByMember(member);
        System.out.println(allByMember.toString());
        System.out.println(allByMember);

        applicationRepository.findAllByMember(member).forEach(e-> System.out.println(e.getId()));
    }
}
