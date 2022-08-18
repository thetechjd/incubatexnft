import React, { useState, useEffect } from 'react'
import axios from 'axios'
export default function ContactUs() {

	const [userEmail, setUserEmail] = useState("")
	const [userName, setUserName] = useState("")
	const [userSubject, setUserSubject] = useState("")
	const [userMessage, setUserMessage] = useState("")

	return (
		<div>
			<section class="contact-section" id="contact" data-aos="fade-up">
				<div class="container">
					<h3>Contact Us</h3>
					<div class="form-content">
						<form action="https://docs.google.com/forms/d/e/1FAIpQLSfb1rVWkz-bOF5-L7TskktbvJavMv9VtJctsGf8YHmhVLZ3ag/formResponse" method="post" target="_blank">
							<input type="text" id="fname" name="entry.1911725452" placeholder="Name*" />
							<input type="email" id="mail" name="entry.917704839" placeholder="Email*" required /><br /><br />
							<input type="text" id="subject" name="entry.1261820702" placeholder="Subject" /><br /><br />
							<textarea class="form-control form-control" rows="3" name="entry.62356061" placeholder="Message"></textarea>
							<button type="submit" class="submit-contact-btn"><span>Send Message</span></button>
						</form>
					</div>
				</div>
			</section>
		</div>
	)
}

