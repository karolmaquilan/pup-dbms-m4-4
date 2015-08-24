(function($) {

    // jquery -> DOM Manipulation + Event handling
    function onFormSubmit(event) {
        // get all field values
        var data = $(event.target).serializeArray();
        
        // transform field values array to student object
        var thesis = {};
        for (var i = 0; i < data.length; i++) {
            var key = data[i].name;
            var value = data[i].value;
            thesis[key] = value
        }

       // send data to server
       var thesis_create_api='/api/thesis';
       $.post(thesis_create_api, thesis, function(response)
       {
            if (response.status = 'OK')
            {
                var full_thesis = response.data.thesis_year + ' ' + response.data.thesis_title;
                $('.thesis-list').prepend('<li>' + full_thesis + '</li>')
            }

            else
            {

            }

       })
   
        return false;
    }

    function loadAllthesis()
    {
        var thesis_list_api = '/api/thesis';
        $.get(thesis_list_api, {} , function(response)
        {    
            console.log('thesis list', response)
            response.data.forEach(function(thesis)
        {
            var full_thesis = thesis.thesis_year + ' ' + thesis.thesis_title;
            $('.thesis-list').append('<li>' + full_thesis + '</li>')
        });
        });
    }

   	loadAllthesis();
    $('.create-form').submit(onFormSubmit);

  	


})(jQuery)