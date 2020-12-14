function searchMovies() {
    $('#movie-list').html('')
    $.ajax({
        url: 'http://www.omdbapi.com/',
        type: 'get',
        datatype: 'json',
        data: {
            'apikey': 'deecef13',
            's': $('#search-input').val()
        },
        success: function (result) {
            // console.log(result)
            if (result.Response == "True") {
                let movies = result.Search
                console.log(movies)

                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                    <div class="col-md-4 col-sm-6 col-12 mb-4 d-flex justify-content-center">
                        <div class="card" style="width: 18rem;">
                            <img src="`+ data.Poster + `" class="card-img-top" alt="` + data.Title + `">
                            <div class="card-body">
                                <h5 class="card-title">`+ data.Title + `</h5>
                                <p class="card-text">`+ data.Type + ` ` + data.Year + `</p>
                                <button type="button" class="btn btn-primary see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+ data.imdbID + `">
                                    See Detail
                                </button>
                            </div>
                        </div>
                    </div>`)
                })
            } else {
                $('#movie-list').html(`
                <div class="col">
                    <h1 class="text-center">Movie Not Found!</h1>
                </div>`)
            }
        }
    })
}
$('.clear-detail').on('click', function () {
    console.log('clear')
    $('modal-body').html('')
})

$('#movie-list').on('click', '.see-detail', function () {
    console.log($(this).data('id'))
    $.ajax({
        url: 'http://www.omdbapi.com/',
        type: 'get',
        datatype: 'json',
        data: {
            'apikey': 'deecef13',
            'i': $(this).data('id')
        },
        success: function (result) {
            // console.log(result)
            if (result.Response == "True") {
                console.log(result)

                $('.modal-body').html(`
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4 d-flex justify-content-center">
                            <img src="`+ result.Poster + `" alt="` + result.Title + `" class="img-fluid">
                        </div>
                        <div class="col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item"><small>Actors : </small><br>` + result.Actors + `</li>
                                <li class="list-group-item"><small>Genre : </small><br>` + result.Genre + `</li>
                                <li class="list-group-item"><small>Director : </small><br>` + result.Director + `</li>
                            </ul>
                        </div>
                    </div>
                </div>
                `)
            }
        }
    })
})

$(document).ready(function () {

    $('#search-input').on('keypress', function (e) {
        if (e.keyCode == 13) {
            e.preventDefault()
            searchMovies()
        }
    })

    $('#search-button').on('click', function () {
        searchMovies()
    })

})

