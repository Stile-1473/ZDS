package com.ZerodaySolution.Billing.services;

import com.ZerodaySolution.Billing.dto.ExpenseDTO;
import com.ZerodaySolution.Billing.dto.IncomeDTO;
import com.ZerodaySolution.Billing.entity.CategoryEntity;
import com.ZerodaySolution.Billing.entity.ExpenseEntity;
import com.ZerodaySolution.Billing.entity.IncomeEntity;
import com.ZerodaySolution.Billing.entity.ProfileEntity;
import com.ZerodaySolution.Billing.repository.CategoryRepository;
import com.ZerodaySolution.Billing.repository.ExpenseRepository;
import com.ZerodaySolution.Billing.repository.IncomeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IncomeService {

    private final CategoryRepository categoryRepository;
    private final IncomeRepository incomeRepository;
    private final ProfileService profileService;

    // Create income
    public IncomeDTO createIncome(IncomeDTO incomeDTO) {
        ProfileEntity profile = profileService.getCurrentProfile();
        CategoryEntity category = categoryRepository.findById(incomeDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        IncomeEntity incomeEntity = toEntity(incomeDTO, profile, category);
        incomeEntity = incomeRepository.save(incomeEntity);
        return toDTO(incomeEntity);
    }

    // Monthly incomes
    public List<IncomeDTO> getAllIncomesForCurrentMonthForCurrentUser() {
        ProfileEntity profile = profileService.getCurrentProfile();
        LocalDate now = LocalDate.now();

        List<IncomeEntity> incomes =
                incomeRepository.findMonthlyIncomesWithCategory(
                        profile.getId(),
                        now.withDayOfMonth(1),
                        now.withDayOfMonth(now.lengthOfMonth())
                );

        return incomes.stream().map(this::toDTO).toList();
    }

    // Latest 5 incomes
    public List<IncomeDTO> getLatestIncomes() {
        ProfileEntity profile = profileService.getCurrentProfile();
        return incomeRepository.findTop5WithCategory(profile.getId())
                .stream()
                .map(this::toDTO)
                .toList();
    }

    // Filter income
    public List<IncomeDTO> filterIncome(LocalDate startDate, LocalDate endDate, String keyword, Sort sort) {
        ProfileEntity profile = profileService.getCurrentProfile();

        return incomeRepository.filterWithCategory(
                        profile.getId(),
                        startDate,
                        endDate,
                        keyword,
                        sort
                )
                .stream()
                .map(this::toDTO)
                .toList();
    }

    // Delete income
    public void deleteIncome(Long id) {
        ProfileEntity profile = profileService.getCurrentProfile();

        IncomeEntity income = incomeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Income not found"));

        if (!income.getProfile().getId().equals(profile.getId())) {
            throw new RuntimeException("Unauthorized to delete");
        }

        incomeRepository.delete(income);
    }

    // Total income
    public BigDecimal totalIncomeForCurrentUser() {
        ProfileEntity profile = profileService.getCurrentProfile();
        BigDecimal incomeTotal = incomeRepository.findTotalIncomeByProfileId(profile.getId());
        return incomeTotal != null ? incomeTotal : BigDecimal.ZERO;
    }

    // ================= HELPERS =================

    private IncomeEntity toEntity(IncomeDTO dto, ProfileEntity profile, CategoryEntity category) {
        return IncomeEntity.builder()
                .name(dto.getName())
                .icon(dto.getIcon())
                .amount(dto.getAmount())
                .date(dto.getDate())
                .profile(profile)
                .category(category)
                .build();
    }

    private IncomeDTO toDTO(IncomeEntity income) {
        return IncomeDTO.builder()
                .id(income.getId())
                .name(income.getName())
                .icon(income.getIcon())
                .amount(income.getAmount())
                .date(income.getDate())
                .categoryId(income.getCategory().getId())
                .categoryName(income.getCategory().getName())
                .createdAt(income.getCreatedAt())
                .updatedAt(income.getUpdatedAt())
                .build();
    }
}
