<?php

/**
 * API RESTful para gestión de productos - Tienda de Ropa
 * 
 * Métodos soportados:
 *   GET    → Listar todos / obtener uno por ID (?id=X)
 *   POST   → Crear producto
 *   PUT    → Actualizar producto
 *   DELETE → Eliminar producto
 */

// ───────────── HEADERS ─────────────
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Preflight CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ───────────── CONEXIÓN BD ─────────────
$host     = 'localhost';
$dbname   = 'tienda_ropa';
$username = 'root';
$password = 'root';

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error de conexión: ' . $e->getMessage()]);
    exit();
}

// ───────────── ENRUTAMIENTO ─────────────
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        handleGet($pdo);
        break;
    case 'POST':
        handlePost($pdo);
        break;
    case 'PUT':
        handlePut($pdo);
        break;
    case 'DELETE':
        handleDelete($pdo);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
        break;
}

// ───────────── FUNCIONES CRUD ─────────────

/**
 * GET: Obtener todos los productos o uno por ID
 */
function handleGet($pdo)
{
    try {
        if (isset($_GET['id'])) {
            $stmt = $pdo->prepare("SELECT * FROM productos WHERE id = :id");
            $stmt->execute([':id' => intval($_GET['id'])]);
            $producto = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($producto) {
                echo json_encode($producto);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Producto no encontrado']);
            }
        } else {
            $stmt = $pdo->query("SELECT * FROM productos ORDER BY id DESC");
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error en consulta: ' . $e->getMessage()]);
    }
}

/**
 * POST: Crear un nuevo producto
 */
function handlePost($pdo)
{
    $data = json_decode(file_get_contents('php://input'), true);

    $errors = validateProduct($data);
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(['error' => 'Datos inválidos', 'details' => $errors]);
        return;
    }

    try {
        $stmt = $pdo->prepare(
            "INSERT INTO productos (codigo, nombre, talla, precio, email_creador) 
             VALUES (:codigo, :nombre, :talla, :precio, :email_creador)"
        );
        $stmt->execute([
            ':codigo'        => $data['codigo'],
            ':nombre'        => trim($data['nombre']),
            ':talla'         => strtoupper($data['talla']),
            ':precio'        => floatval($data['precio']),
            ':email_creador' => trim($data['email_creador'])
        ]);

        http_response_code(201);
        echo json_encode([
            'message' => 'Producto creado correctamente',
            'id'      => $pdo->lastInsertId()
        ]);
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) {
            http_response_code(409);
            echo json_encode(['error' => 'El código de producto ya existe']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Error al crear: ' . $e->getMessage()]);
        }
    }
}

/**
 * PUT: Actualizar un producto existente
 */
function handlePut($pdo)
{
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Se requiere el ID del producto']);
        return;
    }

    $errors = validateProduct($data);
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(['error' => 'Datos inválidos', 'details' => $errors]);
        return;
    }

    try {
        $stmt = $pdo->prepare(
            "UPDATE productos 
             SET codigo = :codigo, nombre = :nombre, talla = :talla, 
                 precio = :precio, email_creador = :email_creador 
             WHERE id = :id"
        );
        $stmt->execute([
            ':id'            => intval($data['id']),
            ':codigo'        => $data['codigo'],
            ':nombre'        => trim($data['nombre']),
            ':talla'         => strtoupper($data['talla']),
            ':precio'        => floatval($data['precio']),
            ':email_creador' => trim($data['email_creador'])
        ]);

        if ($stmt->rowCount() > 0) {
            echo json_encode(['message' => 'Producto actualizado correctamente']);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Producto no encontrado o sin cambios']);
        }
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) {
            http_response_code(409);
            echo json_encode(['error' => 'El código de producto ya existe']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Error al actualizar: ' . $e->getMessage()]);
        }
    }
}

/**
 * DELETE: Eliminar un producto por ID
 */
function handleDelete($pdo)
{
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Se requiere el ID del producto']);
        return;
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM productos WHERE id = :id");
        $stmt->execute([':id' => intval($data['id'])]);

        if ($stmt->rowCount() > 0) {
            echo json_encode(['message' => 'Producto eliminado correctamente']);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Producto no encontrado']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error al eliminar: ' . $e->getMessage()]);
    }
}

// ───────────── VALIDACIÓN SERVIDOR ─────────────

/**
 * Valida los datos de un producto en el servidor
 */
function validateProduct($data)
{
    $errors = [];
    $tallasValidas = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

    if (!isset($data['codigo']) || strlen($data['codigo']) !== 9) {
        $errors[] = 'El código debe tener exactamente 9 caracteres';
    }
    if (!isset($data['nombre']) || trim($data['nombre']) === '' || strlen($data['nombre']) > 100) {
        $errors[] = 'El nombre es obligatorio (máx. 100 caracteres)';
    }
    if (!isset($data['talla']) || !in_array(strtoupper($data['talla']), $tallasValidas)) {
        $errors[] = 'Talla inválida';
    }
    if (!isset($data['precio']) || !is_numeric($data['precio']) || $data['precio'] <= 0) {
        $errors[] = 'El precio debe ser un número positivo';
    }
    if (!isset($data['email_creador']) || !filter_var($data['email_creador'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Email no válido';
    }

    return $errors;
}
