(function($) {
  $.fn.formSteps = function(options) {
    options = $.extend({  
        submitButton: "" 
    }, options);

    var element = this;
 
    $(element).find('legend').hide();
    if ($('#errorExplanation').length > 0)
      return 


    var steps = $(element).find("fieldset");
    var count = steps.size();
    var advanced = false

    $(element).before("<ul id='form_steps'></ul>");
    $(element).append("<div id='form_steps_commands'><a href='#' data-step='0' id='form_steps_previous'>Previous</a> <a href='#' data-step='1' id='form_steps_next'>Next</a></div>");

    steps.each(function(i) {
      var name = $(this).find("legend").html();
      if ($(this).hasClass('advanced') == true) {
        advanced = true
        count = count - 1
      }
      else {
        $("#form_steps").append("<li id='form_step_" + i + "'>Step " + (i + 1) + "<span>" + name + "</span></li>");
      }
    });

    if (advanced == true) {
      $(element).find('input:submit').before("<a href='#' id='form_steps_advanced'>Advanced</a>")
      $('#form_steps_advanced').hide()
    }

    step_display(0);

    $('#form_steps_next').live('click',function(event){
      var step = $(this).data('step')
      step_display(step);
      return false;
    });
    $('#form_steps_previous').live('click',function(event){
      var step = $(this).data('step')
      step_display(step);
      return false;
    });

    $('#form_steps_advanced').live('click',function(event){
      $(element).find('.advanced').show()
      return false;
    });

    function step_display(i) {
      console.log(i)
      $(element).find("fieldset").hide();
      $(element).find('fieldset').eq(i).show();

      if (i == count-1) {
        $('#form_steps_next').hide().data('step', count);
        $(element).find('input:submit').show();
        $('#form_steps_advanced').show();
      }
      else {
        $('#form_steps_next').show().data('step', (i+1));
        $(element).find('input:submit').hide();
        $('#form_steps_advanced').hide();
      }

      if (i > 0) {
        $('#form_steps_previous').show().data('step', (i-1));
      }
      else {
        $('#form_steps_previous').hide().data('step', 0);
      }

    }

  }
})(jQuery); 
