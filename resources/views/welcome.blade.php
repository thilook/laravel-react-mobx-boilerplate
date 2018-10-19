<!doctype html>
<html lang="{{ app()->getLocale() }}" style="height: 100%">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>QcCert - Admin</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet">
    <link href="{{mix('css/app.css')}}" rel="stylesheet" type="text/css">
    <script defer src="{{ mix('js/entry-client.js') }}"></script>
</head>
<body style="height: 100%">
{!! ssr('js/entry-server.js')
// Share the packages with the server script through context

// If ssr fails, we need a container to render the app client-side
->fallback('<div id="root" style="height: 100%"></div>')
->render() !!}

</body>
</html>