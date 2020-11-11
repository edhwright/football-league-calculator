import { fetchState, matchesStore, teamsStore, tableUpdated, urlStore } from "./stores.js";
import { sortTeams, addMatchData, removeMatchData } from "./utils.js";
import { JSONUncrush } from "./JSONCrush.js";

export let currentMatchday;
export let teamIdToObjectLookup = new Map();

const params = new URLSearchParams(window.location.search);

let useUrlState = false;
let urlMatchesState = params.get("s");
let urlLeagueState = params.get("l");

if (urlMatchesState && urlLeagueState) {
  useUrlState = true;
}

let urlState = {
  useUrl: useUrlState,
  matches: urlMatchesState,
  league: urlLeagueState,
}

urlStore.set(urlState);

window.history.replaceState({}, "", window.location.pathname);

export async function getData(league) {

  fetchState.set("LOADING");

  let urls = [
    `https://api.football-data.org/v2/competitions/${league.code}/matches`,
    `https://us-central1-league-data-3cb03.cloudfunctions.net/app/api/${league.code}`
  ];

  let data = await getMatchesAndTeams(urls);

  if (data[0].matches.length === 0 || data[1].status === "OFFSEASON") {
    fetchState.set("OFFSEASON");
  } else {
    let [sortedMatches, sortedTeams] = sortData(data, league, urlState);
    currentMatchday = sortedMatches[0][0].season.currentMatchday;
    sortTeams(sortedTeams.teams, league.sort);
    matchesStore.set(sortedMatches);
    teamsStore.set(sortedTeams);
    fetchState.set("DONE");
    tableUpdated.set(true);
    urlState.useUrl = false;
    urlStore.set(urlState);
  }
  // console.log("getData ran" + urlMatchesState);
}

function sortData(data, league, urlState) {

  //initialising 2d array containing. matchweek arrays containing array of matches
  let matches = [];
  for (let i = 0; i < league.gw; i++) {
    matches[i] = [];
  }

  data[1].teams.forEach((t) => {
    teamIdToObjectLookup.set(t.id, t);
  });

  for (let i = 0; i < data[1].teams.length; i++) {
    data[1].teams[i].played = [];
    data[1].teams[i].won = [];
    data[1].teams[i].drawn = [];
    data[1].teams[i].lost = [];
    data[1].teams[i].goalsfor = [];
    data[1].teams[i].goalsagainst = [];
    data[1].teams[i].points = [];
  }

  //go through every match, push it to the correct matchweek array
  for (let i = 0; i < data[0].matches.length; i++) {
    let md = data[0].matches[i].matchday;

    //only include matches with a matchday. Playoff matches don't get included.
    if (md) {
      matches[md - 1].push(data[0].matches[i]);
    }
  }

  for (let i = 0; i < matches.length; i++) {
    matches[i].sort((a, b) => a.utcDate.localeCompare(b.utcDate) || a.homeTeam.name.localeCompare(b.homeTeam.name));
  }

  if (urlState.useUrl) {
    let decodedUrl = decodeURIComponent(urlState.matches);
    let urlUncrushed = JSON.parse(JSONUncrush(decodedUrl));
    let m = urlUncrushed.matches;

    for (let i = 0; i < matches.length; i++) {
      for (let j = 0; j < matches[i].length; j++) {
        let homeScore = m[i][j][0];
        let awayScore = m[i][j][1];

        //changing the matches array
        matches[i][j].score.fullTime.homeTeam = homeScore;
        matches[i][j].score.fullTime.awayTeam = awayScore;

        //changing the teams array
        let teamshome = teamIdToObjectLookup.get(matches[i][j].homeTeam.id);
        let teamsaway = teamIdToObjectLookup.get(matches[i][j].awayTeam.id);

        if (homeScore != null && awayScore != null) {
          addMatchData(teamshome, homeScore, teamsaway, awayScore, i);
        } else {
          removeMatchData(teamshome, teamsaway, i);
        }
      }
    }
  } else {
    //go through every matchweek
    //go through every match
    for (let i = 0; i < matches.length; i++) {
      for (let j = 0; j < matches[i].length; j++) {
        //get team objects from team ids in match object
        let teamshome = teamIdToObjectLookup.get(matches[i][j].homeTeam.id);
        let teamsaway = teamIdToObjectLookup.get(matches[i][j].awayTeam.id);
        let homeScore = matches[i][j].score.fullTime.homeTeam;
        let awayScore = matches[i][j].score.fullTime.awayTeam;

        //if match has been played
        if (homeScore != null && awayScore != null) {
          addMatchData(teamshome, homeScore, teamsaway, awayScore, i);
        } else {
          removeMatchData(teamshome, teamsaway, i);
        }
      }
    }
  }
  data[0] = matches;
  return data;
}

async function getMatchesAndTeams(urls) {

  const getMatches = fetch(urls[0], {
    method: "GET",
    headers: {
      "X-Auth-Token": API_KEY,
    }
  }).then((response) => response.json());

  const getTeams = fetch(urls[1]).then((response) => response.json());

  try {
    let data = await Promise.all(
      [getMatches, getTeams]
    );
    return data;
  } catch (error) {
    fetchState.set("ERROR");
    console.log(error);
    throw error;
  }
}
