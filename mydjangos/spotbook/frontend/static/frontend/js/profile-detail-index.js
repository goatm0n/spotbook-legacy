import Profile from "./components/Profile.js";

const target = document.getElementById('content');
var profile = new Profile();
profile.render(currentUsername, 'content')
