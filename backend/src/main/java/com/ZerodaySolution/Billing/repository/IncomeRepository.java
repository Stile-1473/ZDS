package com.ZerodaySolution.Billing.repository;

import com.ZerodaySolution.Billing.entity.IncomeEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface IncomeRepository extends JpaRepository<IncomeEntity, Long> {

    // Monthly incomes
    @Query("""
        SELECT i FROM IncomeEntity i
        JOIN FETCH i.category
        WHERE i.profile.id = :profileId
        AND i.date BETWEEN :startDate AND :endDate
    """)
    List<IncomeEntity> findMonthlyIncomesWithCategory(
            @Param("profileId") Long profileId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );


    @Query("""
        SELECT i FROM IncomeEntity i
        JOIN FETCH i.category
        WHERE i.profile.id = :profileId
        ORDER BY i.date DESC
    """)
    List<IncomeEntity> findTop5WithCategory(@Param("profileId") Long profileId);


    @Query("""
        SELECT i FROM IncomeEntity i
        JOIN FETCH i.category
        WHERE i.profile.id = :profileId
        AND i.date BETWEEN :startDate AND :endDate
        AND LOWER(i.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
    """)
    List<IncomeEntity> filterWithCategory(
            @Param("profileId") Long profileId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("keyword") String keyword,
            Sort sort
    );

    @Query("SELECT SUM(i.amount) FROM IncomeEntity i WHERE i.profile.id = :profileId")
    BigDecimal findTotalIncomeByProfileId(@Param("profileId") Long profileId);
}
