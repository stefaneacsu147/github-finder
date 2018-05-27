$(document).ready(function () {
  $('#searchUser').on('keyup', function (e) {
    let userprofile = e.target.value;

    // Request to GitHub
    $.ajax({
      url: 'https://api.github.com/users/' + userprofile,
      data: {
        client_id: '795b764af381de23db86',
        client_secret: '222291dee9a4be2a251eaed3c350b6877fdc2525'
      }
    }).done(function (user) {
      $.ajax({
        url:'https://api.github.com/users/'+userprofile+'/repos',
        data: {
          client_id: '795b764af381de23db86',
          client_secret: '222291dee9a4be2a251eaed3c350b6877fdc2525',
          per_page: '5',
          sort: 'created: asc',
        }
      }).done(function (repos) {
        $.each(repos, function(index, repo){
          $('#repos').append(`
          <div class="card-deck">
  <div class="card">
    <div class="card-body">
    <a href="#" class="badge badge-warning">Forks: ${repo.forks_count}</a>
      <a href="#" class="badge badge-warning">Watchers: ${repo.watchers_count}</a>
      <a href="#" class="badge badge-warning">Followers: ${repo.stargazers_count}</a>
      <h5 class="card-title"><strong>${repo.name}</strong></h5>

      <p class="card-text">${repo.description}</p>
    </div>
    <div class="card-footer">
<a href="${repo.html_url}">Visit repository</a>
    </div>
  </div>
</div>
<br>
          `);
        });
      });
      $('#profile').html(`
  <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${user.avatar_url}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title"><strong>${user.name}</strong></h5>
    <p class="card-text">${user.bio}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item"><a href="${user.html_url}" target="_blank">View profile</a></li>
    <li class="list-group-item">Public repos: ${user.public_repos}</li>
    <li class="list-group-item">Public gists: ${user.public_gists}</li>
  </ul>
  <ul class="list-group">
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Company
    <span class="badge badge-primary badge-pill">${user.company}</span>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Website:
    <a href="${user.blog}" class="badge badge-danger">${user.blog}</a>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Location:
    <span class="badge badge-primary badge-pill">${user.location}</span>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Member since:
    <span class="badge badge-primary badge-pill">${user.created_at}</span>
  </li>
</ul>
  </div>
  <br><br>    
  <h3 class="page-header">Latest repositories</h3>
  <div id="repos"></div>
      `);
    });
  });
});