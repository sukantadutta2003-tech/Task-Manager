package com.taskloom.backend.task.service;

import com.taskloom.backend.entity.User;
import com.taskloom.backend.repository.UserRepository;
import com.taskloom.backend.task.dto.TaskRequest;
import com.taskloom.backend.task.dto.TaskResponse;
import com.taskloom.backend.task.entity.Task;
import com.taskloom.backend.task.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskResponse createTask(String email, TaskRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow();

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .completed(false)
                .createdAt(LocalDateTime.now())
                .user(user)
                .build();

        Task saved = taskRepository.save(task);

        return mapToResponse(saved);
    }

    public List<TaskResponse> getUserTasks(String email) {
        return taskRepository.findByUserEmail(email)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private TaskResponse mapToResponse(Task task) {
        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .completed(task.isCompleted())
                .build();
    }
}