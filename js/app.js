(function() {
    'use strict';

    var projectTemplate = _.template(
        [
            '<div class="project-row margin-bottom row">',
                '<img src="<%= imageUrl %>" class="toggler twelve columns rounded"/>',
                '<div class="toggleable hidden ten columns offset-by-one">',
                    '<p><%= description %></p>',
                    '<ul class="inline-items">',
                        '<li><a href="<%= sourceLink %>"><i class="fa fa-github"></i> View source on GitHub</a></li>',
                        '<li><a href="<%= liveLink %>"><i class="fa fa-globe"></i> View it live</a></li>',
                    '</ul>',
                '</div>',
            '</div>'
        ].join('')
    );

    var $pageNavLinks;
    var $projectsSection;

    $(document).ready(function() {
        $pageNavLinks = $('#page-nav-links').find('> li');
        $projectsSection = $('section.projects');

        $pageNavLinks.click(pageNavLinksClick);

        setupChart();
        populateProjects();
    });

    function pageNavLinksClick(link) {
        var section = link.target.innerText.toLowerCase();
        var scrollDestination = $('#' + section).offset().top;

        $('html, body').animate({
           scrollTop: scrollDestination
        }, 'slow');
    }

    function togglerClick(event) {
        var $toggler = $(event.target);
        $toggler.parent().find('.toggleable').toggleClass('hidden');
    }

    function setupChart() {
        var context = $('#experience-chart').get(0).getContext('2d');

        var data = {
            labels: ['PHP', 'JavaScript', 'Java', 'HTML5', 'CSS3', 'SQL', 'MongoDB', 'Drupal', 'Android', 'Git'],
            datasets: [
                {
                    label: 'Professional Experience',
                    fillColor: 'rgba(255,44,97,1)',
                    strokeColor: 'rgba(255,44,97,1)',
                    highlightFill: 'rgba(255,44,97,0.9)',
                    highlightStroke: 'rgba(255,44,97,1)',
                    data: [3, 2, 1, 2, 2, 2, 1, 2, 1, 3]
                }
            ]
        };

        var options = {
            responsive: true,
            scaleFontColor: 'rgba(238,238,238,0.8)',
            scaleFontFamily: '"Raleway", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
            scaleLabel: " <%=value%> years",
            scaleLineColor: 'rgba(238,238,238,0.2)',
            scaleGridLineColor: 'rgba(238,238,238,0.2)',
            tooltipFontFamily: '"Raleway", "Helvetica Neue", "Helvetica", "Arial", sans-serif'
        };

        var experienceChart = new Chart(context).Bar(data, options);
    }

    function populateProjects() {
        $.getJSON('projects.json', function (projects) {
            projects.forEach(function(project) {
                var $projectMarkup = $(projectTemplate(project));
                project.technologies.forEach(function(technology) {
                    var $technologyMarkup = $('<li>' + technology + '</li>');
                    $projectMarkup.find('.technologies').append($technologyMarkup);
                });

                $projectsSection.append($projectMarkup);
            });

            $('.toggler').click(togglerClick);
        });
    }
})();