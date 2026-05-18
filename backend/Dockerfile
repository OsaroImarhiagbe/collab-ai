# Use a slim Python image for smaller footprint
FROM python:3.13-slim

# Set Working Directory
WORKDIR /app

#Install dependencies first to leverage Docker cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

#Copy the application code
COPY ./app /app/app

#Expose the port FastAPI will run on
EXPOSE 8000

# Start the server using uvicorn
CMD ["uvicorn", "app.main:app","--host","0.0.0.0","--port","8000","--reload"]
