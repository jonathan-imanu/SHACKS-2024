# Fraud Guardian

Fraud Guardian is a web application designed to help users identify potential job posting scams. This tool allows users to copy and paste job postings or upload screenshots, and it analyzes the likelihood of the job being a scam, providing detailed reasoning for its conclusions.

## Problem Statement

Job posting scams are increasingly prevalent, particularly in Latin American regions, where fraudulent postings often ask users for sensitive information such as credit card details. These scams not only harm individuals but also place a significant burden on banks. Fraud Guardian aims to combat these scams by leveraging advanced technology to detect fraudulent job postings before users fall victim to them.

## Features

- **Scam Detection**: Users can enter job descriptions or screenshots in either English or Spanish. The system analyzes the text and provides feedback on whether the job posting is likely a scam, along with reasons for its analysis.
- **Gamified Security Tasks**: Users can complete security tasks, such as changing their username and password, to earn rewards. For example, if the website is partnered with a bank like Scotiabank, users can earn Scotiabank credits.
- **Language Support**: The website supports both English and Spanish, automatically responding in the language used by the user.
- **Important Links**: Provides access to essential resources, such as reporting fraud and help centers.

## Technology Stack

### Backend
- **Python**: The backend logic was developed in Python.
- **Flask**: The backend framework used to handle API calls and integrate with the frontend.
- **Amazon Textract**: Used to extract text from images and analyze job postings from screenshots.
- **OpenAI API**: Provides advanced analysis to determine the likelihood of a job posting being a scam.

### Frontend
- **Next.js**: Used to build the frontend interface.
- **Tailwind CSS**: For styling the user interface.
- **HTML/CSS and SCSS**: Additional styling and structure for the web pages.

### Data Storage
- User responses are stored in a file, which can be used in the future to train a custom machine learning model for more accurate scam detection.

## Future Enhancements

- **Machine Learning Model**: As more user data is collected, a custom-trained ML model will be developed to identify common scam patterns more effectively.
- **Partnership Opportunities**: The platform could partner with banks and other financial institutions to offer rewards and incentives for users who engage in secure online practices.
