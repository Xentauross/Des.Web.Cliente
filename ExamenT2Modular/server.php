<?php
/**
 * Arrancar el servidor 
 *   php -S localhost:8000
 */

// Cabeceras para permitir peticiones y devolver JSON
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Conexión a la base de datos
try {
    $pdo = new PDO("mysql:host=localhost;dbname=tienda_ropa;charset=utf8mb4", "root", "root");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error de conexión: " . $e->getMessage()]);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

// ── GET: Leer productos ──
if ($method === "GET") {
    try {
        if (isset($_GET["id"])) {
            $stmt = $pdo->prepare("SELECT * FROM productos WHERE id = ?");
            $stmt->execute([intval($_GET["id"])]);
            $producto = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($producto) {
                echo json_encode($producto);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Producto no encontrado"]);
            }
        } else {
            $stmt = $pdo->query("SELECT * FROM productos ORDER BY id DESC");
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
}

// ── POST: Crear producto ──
if ($method === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $errores = validar($data);

    if (!empty($errores)) {
        http_response_code(400);
        echo json_encode(["error" => implode(" | ", $errores)]);
        exit();
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO productos (codigo, nombre, talla, precio, email_creador) VALUES (?,?,?,?,?)");
        $stmt->execute([$data["codigo"], trim($data["nombre"]), strtoupper($data["talla"]), floatval($data["precio"]), trim($data["email_creador"])]);
        http_response_code(201);
        echo json_encode(["message" => "Producto creado", "id" => $pdo->lastInsertId()]);
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) {
            http_response_code(409);
            echo json_encode(["error" => "El código ya existe"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
}

// ── PUT: Actualizar producto ──
if ($method === "PUT") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["id"])) {
        http_response_code(400);
        echo json_encode(["error" => "Falta el ID"]);
        exit();
    }

    $errores = validar($data);
    if (!empty($errores)) {
        http_response_code(400);
        echo json_encode(["error" => implode(" | ", $errores)]);
        exit();
    }

    try {
        $stmt = $pdo->prepare("UPDATE productos SET codigo=?, nombre=?, talla=?, precio=?, email_creador=? WHERE id=?");
        $stmt->execute([$data["codigo"], trim($data["nombre"]), strtoupper($data["talla"]), floatval($data["precio"]), trim($data["email_creador"]), intval($data["id"])]);

        if ($stmt->rowCount() > 0) {
            echo json_encode(["message" => "Producto actualizado"]);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Producto no encontrado o sin cambios"]);
        }
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) {
            http_response_code(409);
            echo json_encode(["error" => "El código ya existe"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
}

// ── DELETE: Eliminar producto ──
if ($method === "DELETE") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["id"])) {
        http_response_code(400);
        echo json_encode(["error" => "Falta el ID"]);
        exit();
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM productos WHERE id = ?");
        $stmt->execute([intval($data["id"])]);

        if ($stmt->rowCount() > 0) {
            echo json_encode(["message" => "Producto eliminado"]);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Producto no encontrado"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
}

// ── Función de validación ──
function validar($data) {
    $errores = [];
    $tallas = ["XS", "S", "M", "L", "XL", "XXL"];

    if (!isset($data["codigo"]) || strlen($data["codigo"]) !== 9)
        $errores[] = "Código: exactamente 9 caracteres";
    if (!isset($data["nombre"]) || trim($data["nombre"]) === "")
        $errores[] = "Nombre obligatorio";
    if (!isset($data["talla"]) || !in_array(strtoupper($data["talla"]), $tallas))
        $errores[] = "Talla inválida";
    if (!isset($data["precio"]) || !is_numeric($data["precio"]) || $data["precio"] <= 0)
        $errores[] = "Precio debe ser mayor que 0";
    if (!isset($data["email_creador"]) || !filter_var($data["email_creador"], FILTER_VALIDATE_EMAIL))
        $errores[] = "Email inválido";

    return $errores;
}