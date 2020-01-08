package com.its.itsapi;

import java.util.Calendar;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import com.its.itsapi.repository.UserSessionRepository;

@Component
public class ScheduledAction {

    @Autowired
    private UserSessionRepository userSessionRepository;

    @Scheduled(cron = "0 0 0 * * *")
    public void doCleanUpSessionEveryDay() {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DATE, -1);
        Date previousDay = cal.getTime();
        userSessionRepository.deleteByActiveTimeBefore(previousDay);
    }
}
