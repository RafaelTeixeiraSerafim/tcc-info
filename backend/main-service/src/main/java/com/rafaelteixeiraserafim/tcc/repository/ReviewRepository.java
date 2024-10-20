package com.rafaelteixeiraserafim.tcc.repository;

import com.rafaelteixeiraserafim.tcc.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
}
