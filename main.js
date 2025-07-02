document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".options button");
  const dynamicImage = document.getElementById("dynamic-image");

  // Default image URL mapping
  const mediaMap = {
    Sales_Hub: {
      image:
        "https://olqan.com/wp-content/uploads/2025/06/Sales.png",
    },
    Project_Suite: {
      image:
        "https://olqan.com/wp-content/uploads/2025/06/project.png",
    },
    HR_Portal: {
      image:
        "https://olqan.com/wp-content/uploads/2025/06/Hr.png",
    },
    Finance_Console: {
      image:
        "https://olqan.com/wp-content/uploads/2025/06/Finance-Console.png",
    },
    Procurement: {
      image:
        "https://dapulse-res.cloudinary.com/image/upload/v1742132121/Task.png",
    },
    Recruitment: {
      image:
        "https://dapulse-res.cloudinary.com/image/upload/v1741864322/projects.png",
    },
    Payroll: {
      image:
        "https://dapulse-res.cloudinary.com/image/upload/v1745335738/CRM-firstfold-AI.png",
    },
    Performance: {
      image:
        "https://dapulse-res.cloudinary.com/image/upload/v1742132119/Design.png",
    },
    Tickets: {
      image:
        "https://dapulse-res.cloudinary.com/image/upload/v1741864322/projects.png",
    },
  };

  // Default media
  const defaultImage =
    "https://olqan.com/wp-content/uploads/2025/06/Sales.png";
  dynamicImage.src = defaultImage;

  // Track selected buttons
  let selectedButtons = [];

  // Debounce function
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Function to update the image
  function updateMedia(button) {
    const value = button.dataset.value;
    const media = mediaMap[value];
    dynamicImage.src = media.image;
    dynamicImage.classList.add("selected");

    // Update selected buttons
    if (button.classList.contains("selected")) {
      button.classList.remove("selected");
      button.setAttribute("aria-pressed", "false");
      selectedButtons = selectedButtons.filter((btn) => btn !== button);
    } else {
      button.classList.add("selected");
      button.setAttribute("aria-pressed", "true");
      selectedButtons.push(button);
    }

    // Composite image if multiple selected
    if (selectedButtons.length > 1) {
      const canvas = document.createElement("canvas");
      canvas.width = dynamicImage.width;
      canvas.height = dynamicImage.height;
      const ctx = canvas.getContext("2d");
      selectedButtons.forEach((btn, index) => {
        const img = new Image();
        img.src = mediaMap[btn.dataset.value].image;
        img.onload = () => {
          ctx.globalAlpha = 0.5;
          ctx.drawImage(
            img,
            0,
            0,
            canvas.width / selectedButtons.length,
            canvas.height
          );
          if (index === selectedButtons.length - 1) {
            dynamicImage.src = canvas.toDataURL();
          }
        };
      });
    }
  }

  // Handle button click events
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      updateMedia(this);
    });
  });

  // Handle hover events with debounce
  buttons.forEach((button) => {
    // const handleHover = debounce(() => {
    //   const value = button.dataset.value;
    //   if (mediaMap[value] && !button.classList.contains("selected")) {
    //     dynamicImage.src = mediaMap[value].image;
    //     dynamicImage.classList.add("selected");
    //   }
    // }, 0);

    // button.addEventListener("mouseenter", handleHover);
    button.addEventListener("mouseenter", function () {
            const value = button.dataset.value;
            if (mediaMap[value]) {
                dynamicImage.src = mediaMap[value].image;
                dynamicImage.classList.add("selected");
            }
        });

    button.addEventListener("mouseleave", function () {
      if (selectedButtons.length > 0) {
        const lastSelected = selectedButtons[selectedButtons.length - 1];
        dynamicImage.src = mediaMap[lastSelected.dataset.value].image;
        dynamicImage.classList.add("selected");
      } else {
        dynamicImage.src = defaultImage;
        dynamicImage.classList.remove("selected");
      }
    });

      
    // Tooltip for preview
 button.addEventListener("mouseenter", function () {
  const tooltip = document.createElement("div");
  tooltip.className = "c-tooltip";
  tooltip.style.position = "absolute";
  tooltip.style.background = "rgba(0, 0, 0, 0.8)";
  tooltip.style.color = "white";
  tooltip.style.padding = "10px 10px";
  tooltip.style.borderRadius = "4px";
  tooltip.style.zIndex = "1000";
  tooltip.style.fontSize = "14px";
  
  
  tooltip.textContent = this.getAttribute("data-tooltip") || this.textContent;
  
  document.body.appendChild(tooltip);
  tooltip.style.left = `${
    button.getBoundingClientRect().left + window.scrollX + 40
  }px`;
  tooltip.style.top = `${
    button.getBoundingClientRect().top + window.scrollY + 80
  }px`;
});

    button.addEventListener("mouseleave", function () {
      const tooltip = document.querySelector(".c-tooltip");
      if (tooltip) tooltip.remove();
    });
  });
});
