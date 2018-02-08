@extends('layouts.app')




@section('content')

     <h3 class="ui top attached header">View news</h3>

        <div class="ui attached segment">
                <table class="ui celled table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Author</th>
                            <th>Last Updated</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                     @foreach ($news as $article)
                         <tr>
                            <td> @if($loop->first) <span><div class="ui green ribbon label">New</div> @endif </span>{{ $article->title }} </td>
                            <td> {!! substr($article->content, 0, 15) !!}..</td>
                            <td> {{ $article->author->name }} </td>
                            <td> {{ $article->created_at }}</td>
                            <td> <small><a href="{{ url('/panel/news/edit/'.$article->id) }}" >Edit</a></small><br />
                                 <small><a href="#" id="delete{{$article->id}}" value="{{$article->id}}">Delete</a></small></td>
                           
                        </tr>
                     @endforeach
                    </tbody>
                </table>
          
                
        </div>
    </div>
    <div class="ui basic modal">
        <div class="ui icon header">
            <i class="archive icon"></i>
            Delete news article
        </div>
        <div class="content">
            Are you sure you want to delete this news article? 
        </div>
        <div class="actions">
            <div id="noDel" class="ui red basic cancel inverted button">
                <i class="remove icon"></i>
                No
            </div>
            <div  id="yesDel" class="ui green ok inverted button">
                <i class="checkmark icon"></i>
                Yes
            </div>
        </div>
  

    {{ $news->links() }}

@endsection

@section('js_scripts')
<script>
    $(document).ready(function() {
        $("[id^=delete]").click((e) => {
           var element = $("#" + e.target.id);
           var deleteNewsID = element.attr('value');
           $('.ui.basic.modal')
           .modal('show');
           $("#yesDel").click(() => {
               if(deleteNewsID != null) {
                   axios.post(APP_URL+'/panel/news/delete/' + deleteNewsID, {})
                    .then((response) => {
                        if(response.data.success == true) {
                            toastr.success("News article has been deleted. Refreshing news list");
                            window.setTimeout(() => {
                                window.location.reload();
                            }, 2000);
                            
                            
                        } else if(response.data.error) {
                            toastr.error(response.data.error);
                        }
                        
                    })
                    .catch((error) => {
                        console.log(error);
                });
               } else {
                   toastr.error('An error occurred while trying to delete the news');
               }
               
           });

           $("#noDel").click(() =>  {
               element = null;
               deleteNewsID = null;
           });
           
        });
    });

</script>

@endsection