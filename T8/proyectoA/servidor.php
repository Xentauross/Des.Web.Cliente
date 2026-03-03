<?php
// 1. CONFIGURACIÓN DE ERRORES Y CABECERAS
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Manejo de peticiones OPTIONS (Preflight) para evitar errores de CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 2. CONFIGURACIÓN DE LA BASE DE DATOS
// --- AJUSTA ESTOS VALORES A TU INSTALACIÓN ---
$host = '127.0.0.1'; // Usar IP suele ser más fiable que 'localhost' en instalaciones manuales
$db   = 'proyecto_a';
$user = 'root';      // Tu usuario de MySQL
$pass = 'root';      // Pon aquí la contraseña que configuraste en tu MySQL (no la dejes vacía si tiene una)
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "error" => "Conexión fallida: " . $e->getMessage()]);
    exit;
}

// 3. LOGICA DE RUTAS (MÉTODOS HTTP)
$metodo = $_SERVER['REQUEST_METHOD'];

switch ($metodo) {
    case 'GET':
        try {
            $stmt = $pdo->query("SELECT nombre, correo, movil FROM usuarios");
            $usuarios = $stmt->fetchAll();
            echo json_encode(["status" => "ok", "data" => $usuarios]);
        } catch (\PDOException $e) {
            http_response_code(500);
            echo json_encode(["status" => "error", "error" => $e->getMessage()]);
        }
        break;

    case 'POST':
        // FormData llega en $_POST automáticamente
        $nombre = $_POST['nombre'] ?? '';
        $correo = $_POST['correo'] ?? '';
        $movil  = $_POST['movil'] ?? '';

        if (empty($nombre) || empty($correo) || empty($movil)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "error" => "Faltan campos"]);
            exit;
        }

        try {
            $sql = "INSERT INTO usuarios (nombre, correo, movil) VALUES (?, ?, ?)";
            $pdo->prepare($sql)->execute([$nombre, $correo, $movil]);
            echo json_encode(["status" => "ok", "mensaje" => "Usuario registrado correctamente"]);
        } catch (\PDOException $e) {
            if ($e->getCode() == 23000) {
                http_response_code(409);
                echo json_encode(["status" => "error", "error" => "El correo ya existe"]);
            } else {
                http_response_code(500);
                echo json_encode(["status" => "error", "error" => $e->getMessage()]);
            }
        }
        break;

    case 'DELETE':
        // Los datos JSON enviados con fetch se leen de php://input
        $datos = json_decode(file_get_contents("php://input"), true);
        $correo = $datos['correo'] ?? '';

        if (empty($correo)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "error" => "Correo no proporcionado"]);
            exit;
        }

        try {
            $stmt = $pdo->prepare("DELETE FROM usuarios WHERE correo = ?");
            $stmt->execute([$correo]);
            echo json_encode(["status" => "ok", "mensaje" => "Usuario eliminado"]);
        } catch (\PDOException $e) {
            http_response_code(500);
            echo json_encode(["status" => "error", "error" => $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["status" => "error", "error" => "Método no permitido"]);
        break;
}
