@extends('layouts.app')



@section('content')
  <h3 class="ui top attached header">
                     Login
    </h3>
                    <div class="ui attached segment">
                        <form class="ui form" method="POST" action="{{ url('/login') }}">
                            <div class="field">
                                <label> Username </label>
                                <input type="text" name="name" placeholder="Username" />
                            </div>
                            <div class="field">
                                <label> Password </label>
                                <input type="password" name="password" placeholder="Password" />
                            </div>

                            {{ csrf_field() }}
                            @if(config('server.captcha'))
                                <div class="field">
                                    {!! Recaptcha::render() !!}
                                </div>
                            @endif

                            <button class="ui button" type="submit">Log In</button>
                        </form>
                        @if ($errors->any()) 
                                <div class="ui error message">
                                    <div class="header">
                                        Following problems were found with your login : 
                                    </div>
                                    <ul class="list">
                                        @foreach ($errors->all() as $error) 
                                        <li> {{ $error }} </li>
                                        @endforeach
                                    </ul>
                                </div>
                        @endif
    </div>
@endsection