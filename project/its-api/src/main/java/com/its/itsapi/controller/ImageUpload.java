package com.its.itsapi.controller;

import com.its.itsapi.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
public class ImageUpload {

    @Autowired
    private CloudinaryService cloudinaryService;

    @CrossOrigin(origins = "*")
    @PostMapping("/media/image")
    public ResponseEntity<Object> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam String sessionId) {
        String url = cloudinaryService.uploadFile(file);
        return new ResponseEntity<Object>(url, HttpStatus.OK);
    }
}