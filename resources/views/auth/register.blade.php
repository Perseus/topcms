@extends('layouts.app')



@section('content')
  <h3 class="ui top attached header">
                     Register
    </h3>
                    <div class="ui attached segment">
                        <form class="ui form" method="POST" action="{{ url('/register') }}">
                            <div class="field">
                                <label> Username </label>
                                <input type="text" name="username" placeholder="Username"/>
                            </div>
                            <div class="field">
                                <label> eMail ID</label>
                                <input type="text" name="email" placeholder="email" />
                            </div>
                            <div class="field">
                                <label> Password </label>
                                <input type="password" name="password" placeholder="Password" />
                            </div>
                            <div class="field">
                                <label> Password Confirmation </label>
                                <input type="password" name="password_confirmation" placeholder="Password confirmation" />
                            </div>

                            @if(config('server.captcha'))
                                <div class="field">
                                    {!! Recaptcha::render() !!}
                                </div>
                            @endif

                            {{ csrf_field() }}

                            <button class="ui button" type="submit">Register</button>

                            
                        </form>
                        @if ($errors->any()) 
                                <div class="ui error message">
                                    <div class="header">
                                        Following problems were found with your registration : 
                                    </div>
                                    <ul class="list" dusk="register-errors"></ul>
                                        @foreach ($errors->all() as $error) 
                                        <li > {{ $error }} </li>
                                        @endforeach
                                    </ul>
                                </div>
                        @endif

                        </div>
    </div>
@endsection