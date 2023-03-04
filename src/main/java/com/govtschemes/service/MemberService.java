package com.govtschemes.service;


import com.govtschemes.dto.LoginDto;
import com.govtschemes.entity.Member;
import com.govtschemes.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    public Member getSingleMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Member createMember(Member member) {
        Random random = new Random();
        Long id = random.nextLong(10000);
        if (memberRepository.existsById(id)) {
            Long newId = Long.valueOf(LocalDate.now().getDayOfYear() + "" + id);
            member.setId(newId);
        } else{
            member.setId(id);
        }
        //validating aadhar number
        if(memberRepository.existsByAadharNo(member.getAadharNo())){
            throw new RuntimeException("User with provided aadhar number already exists!!");
        }
        member.setPassword(String.valueOf(random.nextLong(10000)));
        return memberRepository.save(member);
    }

    public Member updateMember(Member member, Long memberId) {
        Member existingMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        existingMember.setName(member.getName());
        existingMember.setAge(member.getAge());
        existingMember.setPhone(member.getPhone());
        existingMember.setGender(member.getGender());
        existingMember.setAadharNo(member.getAadharNo());
        existingMember.setCaste(member.getCaste());
        existingMember.setAddress(member.getAddress());
        existingMember.setMaritalStatus(member.getMaritalStatus());
        existingMember.setUserType(member.getUserType());
        return memberRepository.save(existingMember);
    }

    public void deleteMember(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        memberRepository.delete(member);
    }

    public Map<String, Member> authenticateMember(LoginDto loginDto){
        Member member = memberRepository.findById(loginDto.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        if(!member.getPassword().equals(loginDto.getPassword())){
            throw  new RuntimeException("Invalid password");
        }
        Map<String , Member> response = new HashMap<>();
        response.put("user" , member);
        return response;
    }
}
