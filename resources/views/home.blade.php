@extends('layouts.app')



@section('content')
  <h3 class="ui top attached header">News</h3>
  
      @foreach ($newsArticles as $article)
        <div class="ui raised segment">
          <h3 class="ui top attached header"><span style="color:{{ $article->category->colour }}">[{{ $article->category->title }}]</span> {{ $article->title }} </h3>
          <div class="ui attached segment">
            {{ $article->content }}
          </div>
          <h5 class="ui bottom attached header right aligned"> {{ $article->updated_at->diffForHumans() }} <br />by {{ $article->author->name }}  </h5>
        </div>
      @endforeach
  
    
    {{ $newsArticles->links() }}
  
@endsection