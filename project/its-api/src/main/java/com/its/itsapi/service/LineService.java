package com.its.itsapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.linecorp.bot.client.LineMessagingClient;
import com.linecorp.bot.model.PushMessage;
import com.linecorp.bot.model.message.TextMessage;

@Service
public class LineService {

    @Autowired
    LineMessagingClient lineMessagingClient;

    @Async
    public void pushMessage(String message, String userId) {
        TextMessage textMessage = new TextMessage(message);
        PushMessage pushMessage = new PushMessage(userId, textMessage);
        lineMessagingClient.pushMessage(pushMessage);
    }

}