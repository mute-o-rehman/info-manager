# Info Manager Project

This project is a simple web application for managing user information, including first name, last name, date of birth, gender, phone number, and address. It features form validation, data saving, and data display in a table.

## Prerequisites

Before you start, ensure you have the following installed on your system:

- Java JDK 8 or later
- Apache Maven
- A web browser (Chrome, Firefox, etc.)

## Getting Started

Follow these steps to set up and run the project on your local machine:

### 1. Clone the Repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/mute-o-rehman/info-manager.git
```

### 2. Navigate to the Project Directory

Change into the project directory:

```bash
cd info-manager
```

### 3. Build the Project

Use Maven to build the project. This will compile the Java code and install any dependencies:

```bash
mvn clean install
```

### 4. Run the Application

Start the application using the following command:

```bash
mvn exec:java -Dexec.mainClass="com.example.DataHandler"
```

### 5. Access the Application

Open your web browser and navigate to:

```
http://localhost:8080
```

## Form Validation

The form includes the following fields with validation:

- **First Name**: Accepts only alphabets, with no spaces.
- **Last Name**: Accepts only alphabets, with no spaces.
- **Date of Birth**: Only allows selection of the current date or earlier dates.
- **Gender**: Requires selection from a predefined list.
- **Phone Number**: Accepts only numeric input.
- **Address**: Free text input.

### Validation Feedback

If any field is invalid or incomplete, a red border will appear around the field, and an error message will be displayed below it.

## Saving Data

Upon successful validation, clicking the "Save" button will:

1. Send the form data to the server.
2. Save the data to a file named `data.txt` on the server.
3. Display a success message to the user.
4. Redirect to the results page after a short delay.

### Data Storage

The data is saved in `data.txt` on the server in JSON format. Each line represents one entry.

## Displaying Data

The results page will display all saved data in a table format, with the following columns:

- First Name
- Last Name
- Date of Birth
- Gender
- Phone Number
- Address

## Troubleshooting

If you encounter any issues, ensure that your Java and Maven installations are correctly set up and that the server is running. Check the console for error messages and refer to the project's issues section on GitHub for further assistance.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
