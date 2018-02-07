<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>
    <script>
    const APP_URL = {!! json_encode(url('/')) !!};
    const USER = {!! json_encode(Auth::user() ? [Auth::user()->name, Auth::user()->id, Auth::user()->isAdmin()] : null) !!}; 

    </script>

    <!-- Styles -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css">
    <link href="{{ asset('semantic/semantic.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('css/toastr.min.css') }}" rel="stylesheet">

</head>
<body>
    <div id="app">
        <Navbar :config="config"></Navbar>
        <div class="ui two relaxed column grid container">
            <div class="row">
                <div class="three wide column computer only"> 
                    <div class="ui top attached header">
                        Navigate
                    </div>
                    <div class="ui attached segment ">
                        @if(Auth::user())
                        <div class="ui link list">
                            <a href="{{ url('/') }}" class="item">Home</a>
                            <a href="{{ url('/account') }}" class="item">Account</a>
                            <a href="#" class="item">Item Mall</a>
                            <a href="#" class="item">Award Center</a>
                            <a href="#" class="item">Reputation Exchanger</a>
                        </div>
                        @else
                        <div class="ui link list">
                            <a class="item">Home</a>
                            <a class="item">Register</a>
                            <a class="item">Jobs</a>
                            <a class="item">Team</a>
                        </div>

                        @endif
                    </div>
                    <div class="ui top attached header">
                        Server Information
                    </div>
                    <div class="ui attached segment">
                        <div class="ui list">
                            <div class="item">  Solo EXP Rate : {{ env('SOLO_EXP') }}x </div>
                            <div class="item">  Party EXP Rate : {{ env('PARTY_EXP') }}x </div>
                            <div class="item">  DROP Rate : {{ env('DROP_RATE') }}x </div>
                            <div class="item">  Ship EXP Rate : {{ env('SHIP_EXP') }}x </div>
                        </div>
                    </div>
                   
                </div>
                <div class="twelve wide column">
                  @yield('content')
                </div>
            </div>
        </div>
    
    
    </div>
    <!-- Scripts -->
    <script
    src="https://code.jquery.com/jquery-3.1.1.min.js"
    integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
    crossorigin="anonymous"></script>
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <script src="{{ asset('js/toastr.min.js') }}"></script>
    <script src="{{ asset('semantic/semantic.js') }}"></script>
    <script src="{{ asset('js/app.js') }}"></script>
    <script src="{{ asset('semantic/components/transition.min.js')}}"></script>
    <script src="{{ asset('semantic/components/dropdown.min.js')}}"></script>
    <script src="{{ asset('js/script.js') }}"></script>

    
    @if (getenv('APP_ENV') === 'local')
        <script id="__bs_script__">//<![CDATA[
            document.write("<script async src='http://HOST:3000/browser-sync/browser-sync-client.js?v=2.18.6'><\/script>".replace("HOST", location.hostname));
            //]]>
        </script>
    @endif
</body>
</html>
