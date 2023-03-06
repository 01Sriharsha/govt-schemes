package com.govtschemes.entity;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    @Id
    private Long id;

    private String name;

    private Integer age;

    private String phone;

    private String address;              

    private String gender;

//    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;


    @Column(unique = true, nullable = false)
    private String aadharNo;

    private String maritalStatus;

    private String caste;

    private String userType;


}
