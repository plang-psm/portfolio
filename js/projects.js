import projects from '../data.js';
const projectsHTML = document.getElementById('projects');

// Renders projects.
function renderProjects(data) {
  let html = '';
  for (let project of data) {
    html += `<div class="project-display">
    
            <div class="image">
              <img
                class="project-img"
                src=${project.image}
                alt=${project.alt}
              />
        
              <div class="image-overlay image-overlay-blur">
                <a
                  href=${project.live_link}
                  target="_blank"
                  class="project-link"
                  >Live</a
                >
                <a
                  href=${project.github_link}
                  target="_blank"
                  class="project-link"
                  >Github</a
                >
              </div>
            </div>
          </div>`;
  }
  projectsHTML.innerHTML = html;
}
renderProjects(projects);
