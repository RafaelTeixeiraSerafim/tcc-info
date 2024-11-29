package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.dto.CategoryRequest;
import com.rafaelteixeiraserafim.tcc.exception.CategoryConflictException;
import com.rafaelteixeiraserafim.tcc.model.Category;
import com.rafaelteixeiraserafim.tcc.model.Product;
import com.rafaelteixeiraserafim.tcc.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final ProductService productService;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository, ProductService productService) {
        this.categoryRepository = categoryRepository;
        this.productService = productService;
    }

    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    public List<Category> getActiveCategories() {
        return categoryRepository.findByDeactivated(false);
    }

    public Category getCategory(Long categoryId) {
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);

        if (categoryOptional.isEmpty()) {
            throw new IllegalArgumentException("Category with id " + categoryId + " does not exist");
        }

        return categoryOptional.get();
    }

    public void createCategory(String name, String description) {
        if (categoryRepository.existsByName(name)) {
            throw new CategoryConflictException("Category with name " + name + " already exists");
        }

        categoryRepository.save(new Category(name, description, false));
    }

    @Transactional
    public Category updateCategory(Long categoryId, CategoryRequest category) {
        if (categoryRepository.existsByName(category.name())) {
            throw new CategoryConflictException("Category with name " + category.name() + " already exists");
        }

        Category origCategory = this.getCategory(categoryId);

        origCategory.setName(category.name());
        origCategory.setDescription(category.description());

        return categoryRepository.save(origCategory);
    }

    @Transactional
    public void deleteCategory(Long categoryId) {
        Category category = this.getCategory(categoryId);
        List<Product> products = new ArrayList<>(category.getProducts());
        boolean hasPurchasedProducts = false;

        for (Product product : products) {
            if (ProductService.hasBeenBought(product)) {
                hasPurchasedProducts = true;

                productService.deactivate(product.getId());
            } else {
                productService.deleteProduct(product.getId());
                category.getProducts().remove(product);
            }
        }

        if (hasPurchasedProducts) {
            category.setDeactivated(true);
            categoryRepository.save(category);
        } else {
            categoryRepository.deleteById(categoryId);
        }
    }

    @Transactional
    public void deleteCategories(List<Long> categoryIds) {
        for (Long categoryId : categoryIds) {
            deleteCategory(categoryId);
        }
    }

    @Transactional
    public void deactivate(Long categoryId) {
        Category category = getCategory(categoryId);
        category.setDeactivated(true);
        productService.deactivate(category.getProducts().stream().map(Product::getId).toList());
        categoryRepository.save(category);
    }

    @Transactional
    public void deactivate(List<Long> categoryIds) {
        for (Long categoryId : categoryIds) {
            deactivate(categoryId);
        }
    }

    @Transactional
    public void reactivate(Long categoryId) {
        Category category = getCategory(categoryId);
        category.setDeactivated(false);
        productService.reactivate(category.getProducts().stream().map(Product::getId).toList());
        categoryRepository.save(category);
    }

    @Transactional
    public void reactivate(List<Long> categoryIds) {
        for (Long categoryId : categoryIds) {
            reactivate(categoryId);
        }
    }
}
