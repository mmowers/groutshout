/**
 * @file posts.js
 * 
 * Provides my javascript for the front page for switching between map view and list view
 */
(function ($) {
  Drupal.behaviors.posts = { 
    attach: function(context,settings) {
      //detect if this is running as web app (from homescreen on iphone). If so, do not show tooltip
      //replace this test with the right stuff
      //if (("standalone" in window.navigator) && !window.navigator.standalone){
      //  $('#section-content').append('<p>not app</p>');
      //}
      //else{
      //  $('#section-content').append('<p>yes app</p>');        
      //}
      //
      //
      //get the url and determine if we are running a query.  if not, ask for location and run one
      var curURL = document.URL;
      var queryString = curURL.split('?');
      if(queryString.length == 1){
        geolocate();
        return false;
      }
      
      //get current location
      var queryStringArray =  URLToArray(curURL);
      var curLat = queryStringArray['distance[latitude]'];
      var curLng = queryStringArray['distance[longitude]'];

        /*//this reverse geocoding is not working!
        var geocoder_api3;
        var lat_lng = new google.maps.LatLng(40.730885, -73.997383);
        if(!geocoder_api3) {
          geocoder_api3 = new google.maps.Geocoder();
        }
        var geocoderRequest = {
          'latlng': lat_lng
        }
        geocoder_api3.geocode(geocoderRequest, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            //alert('yay!');
            var address = results[0].formatted_address();
            $("#views-exposed-form-posts-page").after('<p> Chatter near:  <span id="address"></span> </p>');
            $("#address").text(address);
          }
          else{
            //alert('nay!');
            $("#views-exposed-form-posts-page").after('<span id="invalid-loc"> Could not reverse geocode :(</span>');
          }
        });*/
      
      //for each views result
      $('.views-row').each(function(){
        //$(this).before('<div>');
        //$(this).after('</div>');
        // create a form for voting.  This should be done in php, but I'm tired of fighting drupal to figure out how.
        //perhaps there should be one form enclosing the whole view...
        var nid = $(this).find('.views-field-nid .field-content').first().text();
        $(this).before('<form class="vote-form" method="post">'+
                        '<input type="submit" name="voteform_'+nid+'_1" value="&uarr;" />'+
                        //'<input type="submit" name="voteform_'+nid+'_-1" value="&darr;" />'+
                       '</form>');
        // calculate distance between current location and result
        var resLat = $(this).find('.views-field-field-location abbr.latitude').attr('title');
        var resLng = $(this).find('.views-field-field-location abbr.longitude').attr('title');
        var curCoords = new google.maps.LatLng(curLat, curLng);
        var resCoords = new google.maps.LatLng(resLat, resLng);
        var distance = Math.round(google.maps.geometry.spherical.computeDistanceBetween(curCoords, resCoords)*3.28084);
        
        $(this).children('.views-field-created').after(', <span class="distance-from-me"><a target="_blank" href="http://maps.google.com?q='+resLat+'+'+resLng+'"><em>'+distance+'ft</em> away</a></span>');
        
        var up_or_ups = ' ups';
        if($(this).find('.views-field-value .field-content').text()=='1'){
          up_or_ups = ' up';
        }
        $(this).find('.views-field-value .field-content').first().append(up_or_ups);
      });
      //alert(distance);

      $('#update-location').click(function(){
        geolocate(); 
        return false;
      });
      
      $('#edit-sort-by').change(function(){
        switch($(this).val()){
        case 'distance':
          $('#edit-sort-order').val('ASC');
          break;
        case 'created':
          $('#edit-sort-order').val('DESC');
          break;
        case 'value':
          $('#edit-sort-order').val('DESC');
          break;
        }
        $('#views-exposed-form-posts-page').submit();
        return false;
      });

      function geolocate(){
        $("#invalid-loc").remove();
        if( navigator.geolocation ){
          var timeoutVal = 20 * 1000;
          // Call getCurrentPosition with success and failure callbacks
          navigator.geolocation.getCurrentPosition( success, fail, { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 });
        }
        else{
          alert("Sorry, geolocation is not supported by this browser :(");
        }            
      }
      //success and fail functions for navigator.geolocation.getCurrentPosition()
      function success(position){
        $('#edit-distance-latitude').attr('value',position.coords.latitude);
        $('#edit-distance-longitude').attr('value',position.coords.longitude);
        $('#edit-distance-search-distance').attr('value','0.1524');
        $('#edit-distance-search-units').val('km');
        $('#views-exposed-form-posts-page').submit();
      }
      function fail(error){
        var errors = { 
          1: 'Sorry, there was a problem getting your location. You may need to enable location services on your browser.',
          2: 'Sorry, your current position is unavailable.',
          3: 'Sorry, there was a problem getting your location. You may need to enable location services on your browser.'
        };
        alert(errors[error.code]);
      }
      function URLToArray(url) {
        var request = {};
        var pairs = url.substring(url.indexOf('?') + 1).split('&');
        for (var i = 0; i < pairs.length; i++) {
          var pair = pairs[i].split('=');
          request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
        return request;
      }
    }
  };
}) (jQuery);
