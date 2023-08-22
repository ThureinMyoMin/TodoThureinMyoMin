import $ from "jquery";
let todos = [];

$(document).ready(function () {
  const getID = () => Math.round(Math.random() * 10000000000);

  const lsSet = () => localStorage.setItem("todos", JSON.stringify(todos));
  const actionDiv = (id) => {
    const div = $("<div></div>");

    const editBtn = $(
      '<button><i class="fa-solid fa-pencil px-2 py-2 text-xl text-white"></i></button>'
    );
    const deleteBtn = $(
      '<button><i class="fa-solid fa-trash-can px-2 py-2 text-xl text-white"></i></button>'
    );
    div.append(editBtn, deleteBtn);
    const editDiv = function (e) {
      const submitBtn = $(
        '<button><i class="fa-solid fa-check px-2 py-2 text-xl text-white"></i></button>'
      );
      const cancelBtn = $(
        '<button><i class="fa-solid fa-x px-2 py-2 text-xl text-white"></i></button>'
      );
      cancelBtn.click(function () {
        e.empty();
        actionDiv();
      });
      e.append(submitBtn, cancelBtn);
    };
    editBtn.click(function (e) {
      e.preventDefault();
      const editInput = $(this).parent().prev().children("#input_task");
      const orival = editInput.val();
      const actionDiv = editBtn.parent();
      actionDiv.empty();
      editDiv(actionDiv);

      editInput.attr("readonly", false).focus().val("").val(orival);
    });
    deleteBtn.click(function () {
      // console.log(id)
      $(this).parents("li").remove();
      let filterTodo = todos.filter((todo) => todo.id !== id);
      todos = [...filterTodo];
      lsSet();
    });

    return div;
  };

  const createLi = (val, id) => {
    const innerLi = `
    
    <div class="flex gap-4">
      <input
        type="checkbox"
        class="scale-125 border-none outline-none"
        name="completed_btn"
        id="completed_btn"
      />
      <input
        type="text"
        name=""
        id="input_task"
        class="py-2 ps-1 bg-transparent border-none outline-none text-white"
        value="${val}"
        readonly
      />
    </div>
    `;
    // <div>
    //   <i class="fa-solid fa-pencil px- 2 text-xl text-white"></i>
    //   <i class="fa-solid fa-trash-can px-2 text-xl text-white"></i>
    // </div>
    console.log(id);
    const Li = $(
      '<li class="bg-sky-400 p-2 flex items-center justify-between"></li>'
    );
    Li.append(innerLi, actionDiv(id));
    $("ul").prepend(Li);
  };

  $("#task-frm").submit(function (e) {
    e.preventDefault();

    const task = $("#task-inp");
    if (task.val()) {
      const todo = { id: getID(), text: task.val(), completed: false };
      todos.push(todo);
      // console.log(todo.id)
      createLi(todo.text, todo.id);
      // $("ul").append(createLi(todo.text))
      task.val("");
      task.focus();
      // localStorage.setItem("todos", JSON.stringify(todos));
      lsSet();
    } else {
      $("#task-inp").addClass("inp_error");
      const error_MSG = $("<span>please enter the value</span>").addClass(
        "error_MSG"
      );
      console.log(task.parent());
      $(".error_MSG").remove();
      task.parent().after(error_MSG);
    }
  });

  $("#task-inp").keyup(function (e) {
    if ($("#task-inp").val()) {
      $(".error_MSG").remove();
      $(this).removeClass("inp_error");
    } else {
    }
  });
  const LStodos = JSON.parse(localStorage.getItem("todos"));
  LStodos.forEach((todo) => {
    todos.push(todo);
    createLi(todo.text, todo.id);
    localStorage.setItem("todos", JSON.stringify(todos));
  });
});
