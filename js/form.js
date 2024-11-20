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
  const suggestionList = document.createElement("ul");
  suggestionList.id = "suggestions";
  suggestionList.classList.add("suggestions-list");
  tagsInput.parentElement.appendChild(suggestionList);

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
    e.preventDefault();

    // Collecting form field values
    const image = document.getElementById("image").files[0]; // Get file
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const prepTime = document.getElementById("prep-time").value.trim();
    const cookTime = document.getElementById("cook-time").value.trim();
    const serving = document.getElementById("serving").value.trim();
    const tags = document.getElementById("tags").value.trim();
    const instructions = document.getElementById("instructions").value.trim();
    const ingredients = document.getElementById("ingredients").value.trim();
    const tools = document.getElementById("tools").value.trim();

    // Validate fields
    if (!title || !description || !prepTime || !cookTime || !serving || !tags || !instructions || !ingredients || !tools) {
      alert("All fields except the image are required.");
      return;
    }

    // Create a JSON object
    const recipeData = {
      image: image ? image.name : '', // Send image name or path, handle file upload separately
      title: title,
      description: description,
      prep_time: prepTime,
      cook_time: cookTime,
      serving: serving,
      tags: tags,
      instructions: instructions,
      ingredients: ingredients,
      tools: tools
    };

    console.log("Sending JSON:", recipeData); // Debugging

    fetch("http://localhost/backend/dbconfig.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message); // Display the message returned from the backend
          
          // Redirect to the index page after success
          window.location.href = "index.html"; // Navigate to the index page
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error submitting the recipe!");
      });
  });
});
