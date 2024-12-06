# Real Estate Website

A modern and dynamic Real Estate Website developed to provide an enhanced browsing experience for users. The platform leverages advanced web technologies to create an intuitive and interactive interface, enabling users to explore real estate listings seamlessly.

## Features

- **Live Demo**: [Explore the Website Here](https://estate-frontend.netlify.app/)

- **Enhanced Browsing Experience**
  - Developed using React and Tailwind CSS for a responsive and visually appealing UI.
  - Integrated React Leaflet Map for an interactive mapping feature to locate properties effortlessly.

- **Robust Backend Development**
  - Built using the MERN stack:
    - **MongoDB**: For efficient and scalable data storage.
    - **Express.js**: To handle server-side logic and API development.
    - **Prisma**: Simplified database management and queries.
    - **Node.js**: For backend runtime environment.

- **Real-Time Communication**
  - WebSocket integration supports a real-time chat feature, boosting user engagement and interactivity.

## Technologies Used

### Frontend
- React
- Tailwind CSS
- React Leaflet Map

### Backend
- MongoDB
- Express.js
- Prisma
- Node.js

### Other Tools
- WebSocket for real-time functionality

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/real-estate-website.git
   cd real-estate-website
   ```

2. **Install Dependencies**:
   ```bash
   # For Frontend
   cd frontend
   npm install

   # For Backend
   cd backend
   npm install
   ```

3. **Set Environment Variables**:
   - Create a `.env` file in the backend directory with the following:
     ```env
     MONGO_URI=your_mongo_database_url
     JWT_SECRET=your_jwt_secret
     WEBSOCKET_PORT=your_websocket_port
     ```

4. **Run the Application**:
   ```bash
   # Start Backend
   cd backend
   npm start

   # Start Frontend
   cd frontend
   npm start
   ```

5. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`.

## Future Enhancements

- Integration of advanced search and filtering capabilities for property listings.
- Adding user authentication and role-based access.
- Deployment to a cloud platform for wider accessibility.

## Contribution
Contributions are welcome! If you have ideas for new features or improvements, feel free to fork the repository and submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

---
Developed by Apoorv Nath Tripathi.

