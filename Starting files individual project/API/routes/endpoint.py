from fastapi import APIRouter, HTTPException, Query
import database
from models import model as models
from queries import query as queries

app = APIRouter()

@app.get("/seasonal-produce")
def get_seasonal_produce():
    query = queries.get_1
    try:
        result = database.execute_sql_query(query)
        if isinstance(result, Exception):
            raise HTTPException(status_code=500, detail="Database query failed")
        produce_list = []
        for produce in result:
            produce_data = {
                "name": produce[0],
                "season": produce[1],
                "price_per_kg": produce[2],
                "availability": produce[3],
                "description": produce[4],
            }
            produce_list.append(produce_data)
        return {'seasonal_produce': produce_list}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint to retrieve events
@app.get("/events")
def get_event_by_id(id: int = Query(..., description="The ID of the event to retrieve")):
    query = queries.get_2  # Use the correct query
    try:
        result = database.execute_sql_query(query, (id,))
        if isinstance(result, dict) and "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        if not result:
            raise HTTPException(status_code=404, detail="Event not found")

        event = result[0]  # Expecting only one event due to the ID filter
        event_data = {
            "name": event[0],
            "event_date": event[1],
            "event_time": event[2],
            "description": event[3],
            "location": event[4],
        }

        return {'event': event_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint to submit a contact form
@app.post("/contact")
def submit_contact_form(contact_form: models.ContactFormSubmission):
    query = queries.insert_contact_query
    try:
        # Log the query and parameters for debugging
        print("Executing query:", query)
        print("With parameters:", (contact_form.name, contact_form.email, contact_form.message))

        # Execute the SQL query
        success = database.execute_sql_query(query, (
            contact_form.name,
            contact_form.email,
            contact_form.message
        ))

        if not success:
            # Log if the query execution fails
            print("Failed to execute query.")
            raise HTTPException(status_code=500, detail="Failed to submit contact form")

        # Log successful insertion
        print("Query executed successfully.")
        return {"message": "Contact form submitted successfully", "data": contact_form}
    except Exception as e:
        # Log the exception
        print("Exception occurred:", str(e))
        raise HTTPException(status_code=500, detail=str(e))
