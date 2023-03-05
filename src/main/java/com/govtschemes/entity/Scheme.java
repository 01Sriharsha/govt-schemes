package com.govtschemes.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

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

    @OneToMany(cascade = CascadeType.REMOVE , fetch = FetchType.LAZY , orphanRemoval = true , mappedBy = "scheme")
    @JsonIgnore
    private List<Application> application;

    @OneToMany(cascade = CascadeType.REMOVE , fetch = FetchType.LAZY , orphanRemoval = true , mappedBy = "scheme")
    @JsonIgnore
    private List<Query> query;
}
