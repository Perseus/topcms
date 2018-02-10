@extends('layouts.app')



<script>
    var article = {!! ($news) !!};
</script>
@section('content')

    <h3 class="ui top attached header">Edit news</h3>
    
    <Editnews :config="config"></Editnews>
@endsection



