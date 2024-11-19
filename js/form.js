document.addEventListener("DOMContentLoaded", function () {
  // Image Preview Feature
  const imageInput = document.getElementById("image");
  const imagePreview = document.createElement("img");
  imagePreview.classList.add("image-preview");

  imageInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        imagePreview.src = event.target.result;
        document.querySelector(".form-group").appendChild(imagePreview);
      };
      reader.readAsDataURL(file);
    }
  });

  // Tags Input Feature
  const tagsInput = document.getElementById("tags");
  tagsInput.addEventListener("input", function () {
    const value = tagsInput.value;
    const tagSuggestions = [
      "breakfast",
      "lunch",
      "dinner",
      "vegan",
      "gluten-free",
      "dessert",
    ];
    const suggestionList = document.getElementById("suggestions");

    // Clear existing suggestions
    suggestionList.innerHTML = "";

    // Filter suggestions based on input
    const filteredTags = tagSuggestions.filter((tag) =>
      tag.toLowerCase().includes(value.toLowerCase())
    );

    // Display filtered suggestions
    filteredTags.forEach((tag) => {
      const suggestionItem = document.createElement("li");
      suggestionItem.textContent = tag;
      suggestionItem.classList.add("tag-suggestion");
      suggestionItem.addEventListener("click", function () {
        tagsInput.value = tag;
        suggestionList.innerHTML = ""; // Clear suggestions after selection
      });
      suggestionList.appendChild(suggestionItem);
    });
  });

  // Form Submission Handler
  const form = document.querySelector(".add-recipe-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    // You can handle the form data here, e.g., via an API request
    const formData = new FormData(form);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    alert("Recipe submitted successfully!");
    form.reset(); // Optionally, reset the form
  });
});
