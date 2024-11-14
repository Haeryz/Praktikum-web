<?php 

namespace app\Routes;

include "app/Controller/ProductController.php";

use app\Controller\ProductController;

class ProductRoutes {

    public function handle($method, $path){
        if ($method == 'GET' && $path == 'skibidi.php/api/ohio') {
            $controller = new ProductController();
            echo $controller->index();
        }

        if ($method == 'GET' && strpos($path, 'skibidi.php/api/ohio/') === 0) {
            $pathParts = explode('/', $path);
            $id = $pathParts[count($pathParts) - 1];
            $controller = new ProductController();
            echo $controller->getById($id);
        }

        if ($method == 'POST' && $path == 'skibidi.php/api/ohio') {
            $controller = new ProductController();
            echo $controller->insert();
        }

        if ($method == 'PUT' && strpos($path, 'skibidi.php/api/ohio/') === 0) {
            $pathParts = explode('/', $path);
            $id = $pathParts[count($pathParts) - 1];
            $controller = new ProductController();
            echo $controller->update($id);
        }

        if ($method == 'DELETE' && strpos($path, 'skibidi.php/api/ohio/') === 0) {
            $pathParts = explode('/', $path);
            $id = $pathParts[count($pathParts) - 1];
            $controller = new ProductController();
            echo $controller->delete($id);
        }
    }
}