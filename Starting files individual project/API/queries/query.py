get_1 = "SELECT name, season, price_per_kg, availability, description FROM fullstack.seasonal_produce"
get_2 = "SELECT name, event_date, event_time, description, location FROM fullstack.events WHERE id = %s"
insert_contact_query = "INSERT INTO fullstack.contact_form_submissions (name, email, message) VALUES (%s, %s, %s);"