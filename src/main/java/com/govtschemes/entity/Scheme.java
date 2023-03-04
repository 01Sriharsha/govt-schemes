package com.govtschemes.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Scheme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer startAge;

    private Integer endAge;

    private String caste;

    private String gender;

    private String maritalStatus;

    private String userType;

    private String title;

    @Column(length = 2000)
    private String description;

    private String documents;

    private String status;
}
