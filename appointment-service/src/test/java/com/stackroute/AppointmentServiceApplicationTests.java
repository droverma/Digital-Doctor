package com.stackroute;

import com.stackroute.appointment.controller.AppointmentController;
import com.stackroute.appointment.models.AppointmentSlot;
import com.stackroute.appointment.repository.AppointmentRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

@SpringBootTest
class AppointmentServiceApplicationTests {



	private MockMvc mockMvc;

	private AppointmentSlot appointmentSlot;

	private List<AppointmentSlot> appointmentSlots;
	@Mock
	private AppointmentRepository appointmentRepository;

	@InjectMocks
	private AppointmentController appointmentController;

	@Test
	void contextLoads() {
	}

}
