<?php

$servername = "localhost";
$username = "root";
$password = "";
$database = "gooning";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);


// Enable CORS headers
header("Access-Control-Allow-Origin: http://127.0.0.1:5500"); // Adjust this if needed (or use * to allow any origin, though it's less secure)
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Allow HTTP methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow headers

// Handle preflight request (for OPTIONS method)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200); // Respond with status 200 for OPTIONS requests
    exit();
}

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get request method
$method = $_SERVER['REQUEST_METHOD'];
// Get ID if provided
$id = isset($_GET['id']) ? intval($_GET['id']) : null;

switch ($method) {
    case 'GET':
        // Fetch data
        if ($id) {
            // Fetch single recipe by ID
            $sql = "SELECT * FROM sigma WHERE id = $id";
        } else {
            // Fetch all recipes
            $sql = "SELECT * FROM sigma";
        }

        $result = $conn->query($sql);
        $recipes = [];

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $recipes[] = $row;
            }
        }

        echo json_encode($recipes);
        break;

    case 'POST':
        // Add a new recipe
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['image'], $data['title'], $data['description'], $data['prep_time'], $data['cook_time'], $data['serving'], $data['tags'], $data['instructions'], $data['ingredients'], $data['tools'])) {
            $image = $conn->real_escape_string($data['image']);
            $title = $conn->real_escape_string($data['title']);
            $description = $conn->real_escape_string($data['description']);
            $prep_time = intval($data['prep_time']);
            $cook_time = intval($data['cook_time']);
            $serving = intval($data['serving']);
            $tags = $conn->real_escape_string($data['tags']);
            $instructions = $conn->real_escape_string($data['instructions']);
            $ingredients = $conn->real_escape_string($data['ingredients']);
            $tools = $conn->real_escape_string($data['tools']);

            $sql = "INSERT INTO sigma (image, title, description, prep_time, cook_time, serving, tags, instructions, ingredients, tools) 
                        VALUES ('$image', '$title', '$description', $prep_time, $cook_time, $serving, '$tags', '$instructions', '$ingredients', '$tools')";

            if ($conn->query($sql) === TRUE) {
                echo json_encode(['message' => 'Recipe added successfully']);
            } else {
                echo json_encode(['message' => 'Error: ' . $conn->error]);
            }
        } else {
            echo json_encode(['message' => 'All fields are required']);
        }
        break;


    case 'PUT':
        // Update an existing recipe
        if ($id) {
            $data = json_decode(file_get_contents('php://input'), true);

            if (isset($data['image'], $data['title'], $data['description'], $data['prep_time'], $data['cook_time'], $data['serving'], $data['tags'], $data['instructions'], $data['ingredients'], $data['tools'])) {
                $image = $conn->real_escape_string($data['image']);
                $title = $conn->real_escape_string($data['title']);
                $description = $conn->real_escape_string($data['description']);
                $prep_time = intval($data['prep_time']);
                $cook_time = intval($data['cook_time']);
                $serving = intval($data['serving']);
                $tags = $conn->real_escape_string($data['tags']);
                $instructions = $conn->real_escape_string($data['instructions']);
                $ingredients = $conn->real_escape_string($data['ingredients']);
                $tools = $conn->real_escape_string($data['tools']);

                $sql = "UPDATE sigma 
                        SET image = '$image', title = '$title', description = '$description', prep_time = $prep_time, 
                            cook_time = $cook_time, serving = $serving, tags = '$tags', 
                            instructions = '$instructions', ingredients = '$ingredients', tools = '$tools' 
                        WHERE id = $id";

                if ($conn->query($sql) === TRUE) {
                    echo json_encode(['message' => 'Recipe updated successfully']);
                } else {
                    echo json_encode(['message' => 'Error: ' . $conn->error]);
                }
            } else {
                echo json_encode(['message' => 'All fields are required']);
            }
        } else {
            echo json_encode(['message' => 'ID is required to update a recipe']);
        }
        break;

    case 'DELETE':
        // Delete a recipe
        if ($id) {
            $sql = "DELETE FROM sigma WHERE id = $id";

            if ($conn->query($sql) === TRUE) {
                echo json_encode(['message' => 'Recipe deleted successfully']);
            } else {
                echo json_encode(['message' => 'Error: ' . $conn->error]);
            }
        } else {
            echo json_encode(['message' => 'ID is required to delete a recipe']);
        }
        break;

    default:
        echo json_encode(['message' => 'Request method not supported']);
        break;
}

$conn->close();
