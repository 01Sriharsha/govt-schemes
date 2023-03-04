package com.govtschemes.controller;

import com.govtschemes.dto.LoginDto;
import com.govtschemes.entity.Member;
import com.govtschemes.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @GetMapping("/members")
    public ResponseEntity<?> retrieveAllMembers(){
        return new ResponseEntity<>(memberService.getAllMembers() , HttpStatus.OK);
    }

    @GetMapping("/members/{memberId}")
    public ResponseEntity<?> retrieveSingleMember(@PathVariable Long memberId){
        return new ResponseEntity<>(memberService.getSingleMember(memberId) , HttpStatus.OK);
    }

    @PostMapping("/members")
    public ResponseEntity<?> createNewMember(@RequestBody Member member){
        return new ResponseEntity<>(memberService.createMember(member) , HttpStatus.CREATED);
    }

    @PutMapping("/members/{memberId}")
    public ResponseEntity<?> updateMember(@RequestBody Member member , @PathVariable Long memberId){
        return new ResponseEntity<>(memberService.updateMember(member , memberId) , HttpStatus.CREATED);
    }

    @DeleteMapping("/members/{memberId}")
    public ResponseEntity<?> removeMember(@PathVariable Long memberId){
        memberService.deleteMember(memberId);
        return new ResponseEntity<>("Member deleted successfully" , HttpStatus.OK);
    }

    @PostMapping("/members/login")
    public ResponseEntity<?> memberLogin(@RequestBody LoginDto loginDto){
        return new ResponseEntity<>(memberService.authenticateMember(loginDto) , HttpStatus.OK);
    }
}
