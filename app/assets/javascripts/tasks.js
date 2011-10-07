$(function() {

  function renderTask(task) {
    return _.template(
    $("#task-template").html(), task)
  }


  $(".delete-task").live('click', function() {
    var url = $(this).attr('href');
    var deleteLink = $(this);

    $.post(url, {
      "_method": 'delete'
    },
    function() {
      var li = deleteLink.parent();
      li.hide('slow', function() {
        $(this).remove();
      });
    },
    'html');

    return false;
  });

  $("#new_task").submit(function() {
    var title = $("#task_title").val();
    $.post('/tasks', {
      "task[title]": title
    },
    function(response) {
      var html = renderTask(response);
      $("#task-list").append(html);
      $("#task_title").val('');
    },
    'json')
    return false;
  });

  $(".task-iscomplete").live('click', function() {
    var taskid = $(this).parent().attr('data-taskid');
    var isChecked = !! $(this).attr('checked');
    var li = $(this).parent();
    $.post("/tasks/" + taskid, {
      '_method': 'put',
      "task[is_complete]": isChecked
    },
    function(response) {
      var title = li.find("span").text();
      if (isChecked) {
        li.find("span").html("<s>" + title + "</s>");
      } else {
        li.find("span").html(title);
      }
    },
    'html');
  });


  $("#task-list li span").live('dblclick', function(){
    var li = $(this).parent();
    var oldHtml = li.html();
    var isChecked = !! $(this).attr('checked');
    var taskid = li.attr('data-taskid');
    var title = li.find("span").text().trim();
    li.html("<input type='text' value='" + title + "' class='title' />");
    li.find('input').keydown(function(e) {
      if (e.keyCode == '13') {
        $.post("/tasks/" + taskid, {
          '_method': 'put',
          "task[title]": $(this).val()
        },
        function(response) {
          var html = renderTask(response);
          li.replaceWith(html);
        },
        'json');
        return;
      }

      if (e.keyCode == '27') {
        li.html(oldHtml);
      }
    });
    return false;
  });

  $("#task-list").sortable({stop : function(event, ui) {
      var sortOrder = []
      $("li").each(function(){ sortOrder.push($(this).data('taskid')); })
      var newSortOrder = JSON.stringify(sortOrder);
      $.post('/tasks/update_sort_order', {sort:newSortOrder});
  }});
});

