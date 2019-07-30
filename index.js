'use strict';

function getUserRepos(userInput) {  
  fetch(`https://api.github.com/users/${userInput}/repos`)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResults(responseJson, userInput))
  .catch(error => {
    $('#error-message').text(`Something is wrong: ${error.message}`);
  });
}

function displayResults(responseJson, userInput) {
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
    const userInput = $('#user-search').val();
    getUserRepos(userInput);
  });
}

$(function(){
  console.log('App loaded! Waiting for input and submit!');
  watchForm();
});