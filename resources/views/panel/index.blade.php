@extends('layouts.app')

@section('content')
  <h3 class="ui top attached header">Panel</h3>
    <Panel :config="config"></Panel>
@endsection