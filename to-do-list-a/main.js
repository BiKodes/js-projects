             $(document).ready(function(){
                 $("input[type=checkbox]").removeAttr("checked");
                $("projects").tabs();
                $("ul").sortable({axis:"x", containment:"#projects"});
                $("ol").sortable({axis:"y", containment: "#projects"});
                $("#projects").on("click", "input[type=checkbox]",function(){
                    $(this).closest("li").slideUp(function(){
                        $(this).remove();
                    })
                });
                $("#btnAddTask").button()
                .click(function(){
                    $("task-dialog").dialog({width:400, resizable:false, modal:true,
                        buttons:{
                            "Add new task": function(){
                                $("projects").tabs("refresh");
                                var activeTab = $("#projects").tabs("option", "active");
                                var title = $("#main > li:nth-child(" + (activeTab + 1) +") > a").attr("href");
                                al$("projects" + title).append("<li><input type='checkbox'>" + $("#new-task").val() + "</li>");
                                
                                $("#new-task").val("");
                                $(this).dialog("close");
                            },
                            "Cancel":function(){
                                $("#new-task").val("");
                                $(this).dialog("close");
                            }
                        }
                    })
                });

                $("#btnAddProject").button()
                .click(function(){
                    $("#project-dialog").dialog({width:400, resizable:false, modal:true,
                    buttons:{
                        "Add new project":function(){
                            var projectName = $("#new-project").val();
                            var replaceName = projectName.split(" ").join("_");
                            $("<li><a href='#" + replaceName +"'>" + projectName + "</a></li>")
                            .appendTo("#main");

                            $("<ol id='" + replaceName + "'></ol>").appendTo("#projects").sortable();
                            $("projects").tabs("refresh");
                            var tabCount = $("#projects .ui-tabs-nav li").length;
                            $("projects").tabs("option", "active",tabCount-1)                            
                            $("#new-project").val("");
                            $(this).dialog("close");
                        },
                        "Cancel":function(){
                            $("#new-project").val("");
                            $(this).dialog("close");
                        }
                    }});
                });
            });
    
