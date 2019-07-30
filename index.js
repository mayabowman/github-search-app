'use strict';

function getUserRepos(userInput) {
  fetch(`https://api.github.com/users/${userInput}/repos`)
  .then(response => response.json())
  .then(responseJson => displayResults(responseJson))
  .catch(error => alert('Something is wrong, try again later!'));
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results').empty();
  $('#results').append(`<h3>${userInput}'s Repos</h3>`)
  for (let i = 0; i < responseJson.length; i++) {
    $('#results').append(
    `<li>${responseJson[i].name}</li>`
    `<a href='${responseJson[i].url}'>Link to Repo</a>`  
  )};
  $('#results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let userInput = $('#user-search').val();
    getUserRepos(userInput);
  });
}

$(function(){
  console.log('App loaded! Waiting for input and submit!');
  watchForm();
});