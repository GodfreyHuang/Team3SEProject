package com.its.itsapi.service;

import com.cloudinary.Cloudinary;
import org.cloudinary.json.JSONObject;

import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.util.Map;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinaryConfig;

    public String uploadFile(MultipartFile file) {
        try {
            File f = Files.createTempFile("temp", file.getOriginalFilename()).toFile();
            file.transferTo(f);
            Map response = cloudinaryConfig.uploader().upload(f, ObjectUtils.emptyMap());
            JSONObject json = new JSONObject(response);
            return json.getString("url");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}