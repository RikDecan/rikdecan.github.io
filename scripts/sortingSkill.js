

(function() {
  document.addEventListener("DOMContentLoaded", function() {
      // Show front-end skills by default
      filterSkills('frontEnd');
  });

  function filterSkills(category) {
      let skills = document.querySelectorAll('.skill');
      
      skills.forEach(skill => {
          if (skill.dataset.category === category) {
              skill.classList.remove('hideSkill');
          } else {
              skill.classList.add('hideSkill');
          }
      });
  }

  document.querySelectorAll('.filter-buttonsForSkills button').forEach(button => {
      button.addEventListener('click', function() {
          let category = this.dataset.filter;
          filterSkills(category);
      });
  });
})();