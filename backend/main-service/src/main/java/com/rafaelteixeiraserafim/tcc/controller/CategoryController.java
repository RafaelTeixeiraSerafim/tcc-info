package com.rafaelteixeiraserafim.tcc.controller;

import com.rafaelteixeiraserafim.tcc.dto.CategoryRequest;
import com.rafaelteixeiraserafim.tcc.dto.CategoryResponse;
import com.rafaelteixeiraserafim.tcc.model.Category;
import com.rafaelteixeiraserafim.tcc.service.CategoryService;
import com.rafaelteixeiraserafim.tcc.utils.ModelDtoConversion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "api/v1/categories")
public class CategoryController {
    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<Map<String, List<CategoryResponse>>> getCategories() {
        List<Category> categories = categoryService.getCategories();
        List<CategoryResponse> categoryResponses = ModelDtoConversion.createCategoryResponses(categories);

        return ResponseEntity.ok(Map.of("categories", categoryResponses));
    }

    @GetMapping("/active")
    public ResponseEntity<Map<String, List<CategoryResponse>>> getActiveCategories() {
        List<Category> categories = categoryService.getActiveCategories();
        List<CategoryResponse> categoryResponses = ModelDtoConversion.createCategoryResponses(categories);

        return ResponseEntity.ok(Map.of("categories", categoryResponses));
    }

    @PostMapping
    public String createCategory(@RequestBody CategoryRequest categoryRequest) {
        categoryService.createCategory(categoryRequest.name(), categoryRequest.description());

        return "Category created successfully";
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<Category> updateCategoryById(@PathVariable Long categoryId, @RequestBody CategoryRequest newCategory) {
        Category category = categoryService.updateCategory(categoryId, newCategory);

        return ResponseEntity.ok(category);
    }

    @PatchMapping("/deactivate")
    public ResponseEntity<?> deactivateProducts(@RequestBody List<Long> productIds) {
        categoryService.deactivate(productIds);

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/reactivate")
    public ResponseEntity<?> reactivateProducts(@RequestBody List<Long> productIds) {
        categoryService.reactivate(productIds);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{categoryId}")
    public String deleteCategoryById(@PathVariable Long categoryId) {
        categoryService.deleteCategory(categoryId);

        return "Category deleted successfully";
    }

    @DeleteMapping("/batch-delete")
    public String deleteCategoriesById(@RequestBody List<Long> categoryIds) {
        categoryService.deleteCategories(categoryIds);

        return "Categories deleted successfully";
    }
}
