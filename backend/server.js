/**
 * Online Learning Platform Backend Server
 *
 * This server provides the REST API endpoints for our online learning platform.
 * Features include user authentication, course management, lesson streaming,
 * quiz functionality, and progress tracking.
 *
 * Author: Learning Platform Development Team
 * Created: 2024
 * Updated: 2024
 */

// Load environment variables from .env file
require('dotenv').config();

// Import required dependencies
const express = require('express');           // Web framework for creating HTTP endpoints
const cors = require('cors');                 // Enable Cross-Origin Resource Sharing
const helmet = require('helmet');             // Security middleware for HTTP headers
const morgan = require('morgan');             // HTTP request logger middleware
const { createClient } = require('@supabase/supabase-js'); // Supabase database client

// Initialize Express application instance
const app = express();

// Apply middleware for security, CORS, logging, and JSON parsing
app.use(helmet());           // Adds security headers to protect against common vulnerabilities
app.use(cors());             // Allows requests from different origins (useful for frontend)
app.use(morgan('combined')); // Logs HTTP requests in a detailed format
app.use(express.json());     // Parses incoming JSON request bodies

// Extract Supabase configuration from environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;              // Supabase project URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;     // Public anonymous key for client-side operations
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE; // Service role key for server-side operations

// Initialize Supabase client for database interactions
// Using ANON_KEY for standard client operations that don't require elevated permissions
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * AUTHENTICATION ROUTES
 * These endpoints handle user registration, authentication, and profile management
 */

// POST /auth/signup - User Registration
// Creates a new user account with email verification
app.post('/auth/signup', async (req, res) => {
  const { email, password, name } = req.body; // Extract user data from request

  // Call Supabase auth signup with extra metadata (name for profile)
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name } // Custom user metadata stored in user.user_metadata
    }
  });

  // Return error if signup fails (email already exists, invalid format, etc.)
  if (error) return res.status(400).json({ error: error.message });

  // Successfully created user account
  res.json({ data });
});

// POST /auth/login - User Authentication
// Validates user credentials and returns authentication tokens
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body; // Extract login credentials

  // Authenticate user via Supabase with password verification
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  // Return error if authentication fails (invalid credentials, unconfirmed email, etc.)
  if (error) return res.status(400).json({ error: error.message });

  // Return user data and access tokens
  res.json({ data });
});

// GET /auth/profile - Get User Profile Information
// Retrieves authenticated user's profile data using JWT token
app.get('/auth/profile', async (req, res) => {
  // Extract Bearer token from Authorization header: "Bearer <token>"
  const token = req.headers.authorization?.split(' ')[1];

  // Verify token and get user information from Supabase
  const { data, error } = await supabase.auth.getUser(token);

  // Return 401 if token is invalid or expired
  if (error) return res.status(401).json({ error: error.message });

  // Return authenticated user profile data
  res.json({ data });
});

/**
 * COURSE MANAGEMENT ROUTES
 * These endpoints handle course listing, creation, and detailed view
 */

// GET /courses - Retrieve All Courses
// Returns a complete list of all published courses available on the platform
app.get('/courses', async (req, res) => {
  // Query all courses from the database without any filtering
  const { data, error } = await supabase.from('courses').select('*');

  // Return database error if query fails
  if (error) return res.status(400).json({ error: error.message });

  // Return array of all courses with their metadata
  res.json({ data });
});

// GET /courses/:id - Get Specific Course Details
// Retrieves detailed information about a single course by its ID
app.get('/courses/:id', async (req, res) => {
  const { id } = req.params; // Extract course ID from URL parameters

  // Query the courses table for the specific course matching the ID
  const { data, error } = await supabase.from('courses').select('*').eq('id', id);

  // Return error if course not found or database error occurs
  if (error) return res.status(400).json({ error: error.message });

  // Return course details (or empty array if not found)
  res.json({ data });
});

// POST /courses - Create New Course
// Allows authenticated instructors to create and publish new courses
app.post('/courses', async (req, res) => {
  const { title, description, price } = req.body; // Extract course data from request body

  // Extract and verify authorization token from request headers
  const token = req.headers.authorization?.split(' ')[1];

  // Verify the user is authenticated before allowing course creation
  const { data: user, error: userError } = await supabase.auth.getUser(token);

  // Return 401 if user is not authenticated
  if (userError) return res.status(401).json({ error: 'Unauthorized' });

  // Insert new course record into database with instructor as the authenticated user
  const { data, error } = await supabase.from('courses').insert({
    title,
    description,
    price,
    instructor: user.user.id // Associate course with the instructor who created it
  });

  // Return database error if insertion fails
  if (error) return res.status(400).json({ error: error.message });

  // Return the newly created course data
  res.json({ data });
});

/**
 * LESSON MANAGEMENT ROUTES
 * These endpoints handle lesson retrieval and streaming for enrolled students
 */

// GET /lessons/:courseId - Get All Lessons for a Course
// Returns all lessons belonging to a specific course, ordered by lesson sequence
app.get('/lessons/:courseId', async (req, res) => {
  const { courseId } = req.params; // Course ID from URL parameter

  // Query lessons table for all lessons associated with the specified course
  const { data, error } = await supabase.from('lessons').select('*').eq('course_id', courseId);

  // Return database error if query fails
  if (error) return res.status(400).json({ error: error.message });

  // Return array of lessons for this course (ordered by sequence in database)
  res.json({ data });
});

// GET /lessons/:id - Get Specific Lesson Details
// Retrieves detailed information about a single lesson including video URL and content
app.get('/lessons/:id', async (req, res) => {
  const { id } = req.params; // Individual lesson ID

  // Query the lessons table for the specific lesson by its unique ID
  const { data, error } = await supabase.from('lessons').select('*').eq('id', id);

  // Return error if lesson not found or database error occurs
  if (error) return res.status(400).json({ error: error.message });

  // Return lesson details including video content and metadata
  res.json({ data });
});

/**
 * QUIZ AND ASSESSMENT ROUTES
 * These endpoints handle quiz questions and student submissions
 */

// GET /quiz/:courseId - Get Quiz for a Course
// Retrieves quiz questions and sets for course evaluation
app.get('/quiz/:courseId', async (req, res) => {
  const { courseId } = req.params; // Extract course ID from URL parameter

  // Query quizzes table for all quiz questions associated with the course
  const { data, error } = await supabase.from('quizzes').select('*').eq('course_id', courseId);

  // Return database error if query fails
  if (error) return res.status(400).json({ error: error.message });

  // Return quiz questions structured for student assessment
  res.json({ data });
});

// POST /quiz/submit - Submit Quiz Answers for Grading
// Processes student quiz responses and calculates scores
app.post('/quiz/submit', async (req, res) => {
  // TODO: Implement comprehensive quiz submission logic:
  // - Validate user authentication and quiz attempt permissions
  // - Process submitted answers against correct solutions
  // - Calculate score based on question weights
  // - Store submission record in progress tracking
  // - Handle time limits and attempt restrictions

  // Placeholder response until full implementation
  res.json({ score: 0 });
});

/**
 * PROGRESS TRACKING ROUTES
 * These endpoints handle student learning progress and completion tracking
 */

// GET /progress/:userId/:courseId - Get Student Progress
// Retrieves the current learning progress for a specific user in a specific course
app.get('/progress/:userId/:courseId', async (req, res) => {
  const { userId, courseId } = req.params; // Extract user and course IDs from URL

  // Query progress table for existing progress records matching user and course
  const { data, error } = await supabase.from('progress')
    .select('*')
    .eq('user_id', userId)
    .eq('course_id', courseId);

  // Return database error if query fails
  if (error) return res.status(400).json({ error: error.message });

  // Return progress data (completion percentage, last accessed lesson, etc.)
  res.json({ data });
});

// POST /progress/update - Update Student Progress
// Updates or creates progress record tracking student's course completion
app.post('/progress/update', async (req, res) => {
  const { userId, courseId, progress } = req.body; // Extract progress update data

  // Use upsert to either update existing progress or create new record
  // Upsert ensures we don't create duplicate progress entries
  const { data, error } = await supabase.from('progress').upsert({
    user_id: userId,
    course_id: courseId,
    progress, // Progress percentage, last lesson viewed, completion status, etc.
    updated_at: new Date() // Track when progress was last updated
  });

  // Return database error if update fails
  if (error) return res.status(400).json({ error: error.message });

  // Return updated progress data
  res.json({ data });
});

/**
 * PAYMENT PROCESSING ROUTES
 * These endpoints handle course purchasing and payment verification
 */

// POST /payment/create-checkout-session - Initialize Payment Session
// Creates a new payment session for course purchase using Stripe checkout
app.post('/payment/create-checkout-session', async (req, res) => {
  // TODO: Implement complete Stripe integration:
  // - Validate user authentication and enrollment permissions
  // - Create Stripe checkout session with course details
  // - Include pricing, currency, and success/cancel URLs
  // - Generate session ID for client-side redirect
  // - Handle taxes and discounts if applicable

  // Placeholder response until Stripe integration is implemented
  res.json({ url: 'stripe-checkout-url' });
});

// POST /payment/verify - Verify Payment Completion
// Confirms successful payment and updates user enrollment status
app.post('/payment/verify', async (req, res) => {
  // TODO: Implement payment verification logic:
  // - Validate Stripe webhook signatures for security
  // - Update course enrollment status in database
  // - Send confirmation email to user
  // - Update revenue analytics
  // - Handle failed payment scenarios

  // Placeholder success response until full implementation
  res.json({ success: true });
});

/**
 * SERVER STARTUP
 * Initialize the Express server and begin listening for requests
 */

// Start the server on port 5000 and log confirmation message
app.listen(5000, () => {
  console.log('Server running on port 5000');

  // Server is now ready to accept connections
  // All middleware and routes are configured and active
});
