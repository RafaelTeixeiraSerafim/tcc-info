package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.model.Category;
import com.rafaelteixeiraserafim.tcc.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategory(Long categoryId) {
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);

        if (categoryOptional.isEmpty()) {
            throw new IllegalArgumentException("Category with id " + categoryId + " does not exist");
        }

        return categoryOptional.get();
    }

    public void createCategory(Category category) {
        categoryRepository.save(category);
    }

    @Transactional
    public Category updateCategory(Long categoryId, Category category) {
        Category origCategory = this.getCategory(categoryId);

        origCategory.setName(category.getName());
        origCategory.setDescription(category.getDescription());

        return categoryRepository.save(origCategory);
    }

    public void deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }

    public void deleteCategoriesById(List<Long> categoryIds) {
        for (Long categoryId : categoryIds) {
            deleteCategory(categoryId);
        }
    }
}
