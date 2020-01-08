package com.its.itsapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.its.itsapi.model.Tag;

@Repository
public interface TagRepository extends JpaRepository<Tag, Integer> {
    public Tag findByName(String name);

}