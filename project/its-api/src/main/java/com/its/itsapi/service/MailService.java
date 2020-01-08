package com.its.itsapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.its.itsapi.model.User;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;

@Service
public class MailService {

    @Autowired
    private JavaMailSender javaMailSender;
    @Value("${frontend}")
    private String frontend;

    @Value("${spring.mail.username}")
    private String from;

    @Async
    public void sendAuthMail(User query) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(from);
        msg.setTo(query.getEmail());
        msg.setSubject("Testing from Spring Boot");
        msg.setText("Click this link to unlock account\n" + frontend + "#/auth?key=" + query.getAuthKey() + "&id="
                + query.getId());
        javaMailSender.send(msg);
    }

    @Async
    public void sendMail(String mail, String title, String message) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(from);
        msg.setTo(mail);
        msg.setSubject(title);
        msg.setText(message);
        javaMailSender.send(msg);
    }

}