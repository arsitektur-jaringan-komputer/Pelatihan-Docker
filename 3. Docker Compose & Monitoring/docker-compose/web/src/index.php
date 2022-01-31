<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Docker Compose</title>
</head>
<body>
    <h1>Daftar hal yang ada di database</h1>
    <ul>
        <?php
            $json = file_get_contents('http://backend:8000');
            $blog_posts = json_decode($json);

            foreach ($blog_posts as $post) {
                echo "<li>$post</li>";
            }
        ?>
    </ul>
</body>
</html>
