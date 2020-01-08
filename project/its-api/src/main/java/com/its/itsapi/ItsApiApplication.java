package com.its.itsapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

import com.linecorp.bot.model.event.Event;
import com.linecorp.bot.model.event.MessageEvent;
import com.linecorp.bot.model.event.FollowEvent;
import com.linecorp.bot.model.event.message.TextMessageContent;
import com.linecorp.bot.model.message.TextMessage;
import com.linecorp.bot.spring.boot.annotation.EventMapping;
import com.linecorp.bot.spring.boot.annotation.LineMessageHandler;

import com.its.itsapi.service.LineService;
import com.its.itsapi.model.Project;
import com.its.itsapi.repository.ProjectRepository;

@SpringBootApplication
@EnableScheduling
@EnableAsync
@LineMessageHandler
public class ItsApiApplication {
	@Autowired
	LineService lineService;
	@Autowired
	ProjectRepository projectRepository;

	public static void main(String[] args) {
		SpringApplication.run(ItsApiApplication.class, args);
	}

	@EventMapping
	public TextMessage handleTextMessageEvent(MessageEvent<TextMessageContent> event) {
		System.out.println("event: " + event);
		String userId = event.getSource().getUserId();
		String groupId = event.getSource().getSenderId();

		if (event.getMessage().getText().equals("Get id")) {
			if (userId.equals(groupId))
				return new TextMessage(
						"Your line user Id is " + userId + " . Please paste it in your setting page for notification.");
			else
				return new TextMessage("Here is your group Id : " + groupId
						+ "\n\n\nPlease paste it in your project setting page for notification.");
		}

		if (!userId.equals(groupId)) { // is group
			Project project = projectRepository.findByLineId(groupId);

			if (project == null) {
				return new TextMessage(
						"Your group are not registed. Paste line Id to your project setting.\n\n" + groupId);

			}
			if (event.getMessage().getText().equals("List issue")) {

			}

		}
		return null;
	}

	@EventMapping
	public TextMessage handleFollowEvent(FollowEvent event) {
		System.out.println("event: " + event);
		return new TextMessage("Your line user Id is " + event.getSource().getUserId()
				+ " . Please paste it in your setting page for notification.");
	}

	@EventMapping
	public void handleDefaultMessageEvent(Event event) {
		System.out.println("event: " + event);
	}

}
