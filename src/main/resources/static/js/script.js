$(document).ready(function () {
  const today = new Date().toISOString().split("T")[0];
  $("#dob").attr("max", today);

  $("#saveBtn").click(function () {
    $("#alert-container").empty();
    $(".invalid-feedback").empty();

    var isValid = true;
    $("#userForm input, #userForm select, #userForm textarea").each(
      function () {
        const input = $(this);
        const pattern = new RegExp(input.attr("pattern") || ".*");

        if (input.val() === "" || !pattern.test(input.val())) {
          isValid = false;
          input.addClass("is-invalid");
          const errorMessage = input.data("error") || "This field is required.";
          input.siblings(".invalid-feedback").text(errorMessage);
        } else {
          input.removeClass("is-invalid");
          input.siblings(".invalid-feedback").empty();
        }
      }
    );

    if (isValid) {
      var userData = {
        lastName: $("#lastName").val(),
        firstName: $("#firstName").val(),
        dob: $("#dob").val(),
        gender: $("#gender").val(),
        phone: $("#phone").val(),
        address: $("#address").val(),
      };

      $.ajax({
        type: "POST",
        url: "http://localhost:8080/saveData",
        data: JSON.stringify(userData),
        contentType: "application/json",
        success: function (response) {
          displayAlert("Data saved successfully!", "success");

          setTimeout(function () {
            window.location.href = "results.html";
          }, 2000);
        },
        error: function () {
          displayAlert("Error saving data!", "danger");
        },
      });
    } else {
      displayAlert("Please fill in all required fields correctly.", "warning");
    }
  });

  $("#cancelBtn").click(function () {
    $("#userForm")[0].reset();
    $("#userForm input, #userForm select, #userForm textarea").removeClass(
      "is-invalid"
    );
    $("#alert-container").empty();
  });

  function displayAlert(message, type) {
    var alertHtml = `
          <div class="alert alert-${type} alert-dismissible fade show" role="alert">
              ${message}
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
              </button>
          </div>
      `;
    $("#alert-container").html(alertHtml);
  }

  // Script to populate data table
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/getData",
    dataType: "json",
    success: function (data) {
      var tableBody = $("#data-table-body");
      data.forEach(function (user) {
        var row = `<tr>
                  <td>${user.firstName}</td>
                  <td>${user.lastName}</td>
                  <td>${user.dob}</td>
                  <td>${user.gender}</td>
                  <td>${user.phone}</td>
                  <td>${user.address}</td>
              </tr>`;
        tableBody.append(row);
      });
    },
    error: function () {
      alert("Failed to load data.");
    },
  });
});
