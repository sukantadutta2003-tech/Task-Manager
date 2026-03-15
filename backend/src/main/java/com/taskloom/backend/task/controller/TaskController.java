package com.taskloom.backend.task.controller;

import com.taskloom.backend.task.dto.TaskRequest;
import com.taskloom.backend.task.dto.TaskResponse;
import com.taskloom.backend.task.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public TaskResponse createTask(Principal principal,
                                   @RequestBody TaskRequest request) {
        return taskService.createTask(principal.getName(), request);
    }

    @GetMapping
    public List<TaskResponse> getTasks(Principal principal) {
        return taskService.getUserTasks(principal.getName());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(Principal principal,
                                           @PathVariable Long id) {
        taskService.deleteTask(principal.getName(), id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/complete")
    public TaskResponse toggleComplete(Principal principal,
                                       @PathVariable Long id) {
        return taskService.toggleComplete(principal.getName(), id);
    }
}