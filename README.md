# Spotify Playlist Generator

## Demo

### Get Recommendations

[!Get Recommendations](Get-Recommendations.gif)

### Save Playlist

[!Save Playlist](Save-Playlist.gif)

## Technologies Used

* React
* React Context API
* Firebase
* Cloud Firestore
* Node
* Express
* React-Bootstrap

## Features

* Authentication: A user can create a new account with their Gmail, login and logout of the app. While logged in, they can see their saved playlists, which will include the names of included songs and an embedded Spotify widget to play if they've saved the playlist on Spotify.
* Get recommendations: A user can get a specified number of songs recommended based on a seed artist, track, genre and song features (such as tempo). Users can also play recommended songs.
* Save playlists: Users can choose to save recommended songs as a playlist, and can later edit the names of playlists and also save the playlist to to their Spotify accounts after authenticating with Spotify.

## Requirements

* Node 16.4.0
* npm

## Usage / Development

```
npm install
npm run build:dev
npm start
```
