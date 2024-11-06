package com.rafaelteixeiraserafim.tcc.controller;

import com.rafaelteixeiraserafim.tcc.model.Category;
import com.rafaelteixeiraserafim.tcc.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/categories")
public class CategoryController {
    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<Category> getCategories() {
        return categoryService.getCategories();
    }

    @PostMapping
    public String createCategory(@RequestBody Category category) {
        categoryService.createCategory(category);

        return "Category created successfully";
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<Category> updateCategoryById(@PathVariable Long categoryId, @RequestBody Category newCategory) {
        Category category = categoryService.updateCategory(categoryId, newCategory);

        return ResponseEntity.ok(category);
    }

    @DeleteMapping("/{categoryId}")
    public String deleteCategoryById(@PathVariable Long categoryId) {
        categoryService.deleteCategory(categoryId);

        return "Category deleted successfully";
    }

    @DeleteMapping("/batch-delete")
    public String deleteCategoriesById(@RequestBody List<Long> categoryIds) {
        categoryService.deleteCategoriesById(categoryIds);

        return "Categories deleted successfully";
    }
}
