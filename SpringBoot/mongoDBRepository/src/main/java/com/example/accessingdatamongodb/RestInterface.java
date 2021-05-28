package com.example.accessingdatamongodb;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestInterface {
    @Autowired
    private CustomerRepository repository;

    @GetMapping("/addAndReturn")
    public List<Customer> addAndReturn(){
        repository.deleteAll();
        repository.save(new Customer("Alice", "Smith"));
        repository.save(new Customer("Bob", "Smith"));
        return repository.findAll();
    }

    @PutMapping("/findByFirstName")
    public List<Customer> findByFirstName(@RequestBody String firstName){

        repository.deleteAll();
        repository.save(new Customer("Alice", "Smith"));
        repository.save(new Customer("Bob", "Smith"));
        List<Customer> customerList = repository.findByFirstName(firstName);
        for (int i = 0; i < customerList.size(); i++) {
            customerList.get(i).lastName = "New Last Name";
        }
        return customerList;
    }   
}
