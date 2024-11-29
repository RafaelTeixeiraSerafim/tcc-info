package com.rafaelteixeiraserafim.tcc.repository;

import com.rafaelteixeiraserafim.tcc.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByDeactivated(boolean deactivated);
    boolean existsByName(String name);
}
