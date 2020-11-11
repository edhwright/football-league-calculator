import { needTieBreaker } from './stores.js'

let nTB = {};

export const sortTeams = (teams, sortFunction) => {
    nTB = {};
    needTieBreaker.set(nTB);
    teams.sort(sortFunction);
}

export const plSort = (a, b) => {

    let aPoints = a.points.reduce(function (a, b) { return a + b; }, 0);
    let bPoints = b.points.reduce(function (a, b) { return a + b; }, 0);

    let aGoalDiff = (a.goalsfor.reduce(function (a, b) { return a + b; }, 0)) - (a.goalsagainst.reduce(function (a, b) { return a + b; }, 0));
    let bGoalDiff = (b.goalsfor.reduce(function (a, b) { return a + b; }, 0)) - (b.goalsagainst.reduce(function (a, b) { return a + b; }, 0));

    let aGoalsFor = a.goalsfor.reduce(function (a, b) { return a + b; }, 0);
    let bGoalsFor = b.goalsfor.reduce(function (a, b) { return a + b; }, 0);

    let aName = a.name;
    let bName = b.name;

    if (aPoints > bPoints) {
        return -1;
    } else if (aPoints < bPoints) {
        return 1;
    } else {
        if (aGoalDiff > bGoalDiff) {
            return -1;
        } else if (aGoalDiff < bGoalDiff) {
            return 1;
        } else {
            if (aGoalsFor > bGoalsFor) {
                return -1;
            } else if (aGoalsFor < bGoalsFor) {
                return 1;
            } else {
                nTB = { ...nTB, [a.id]: true, [b.id]: true };
                needTieBreaker.set(nTB);

                if (aName < bName) {
                    return -1;
                } else if (aName > bName) {
                    return 1;
                } else {
                    return 0;
                }
            }
        }
    }
}


export const isChampion = (teams, totalmatches) => {

    let firstpoints = teams[0].points.reduce(function (a, b) { return a + b; }, 0);
    let firstplayed = teams[0].played.reduce(function (a, b) { return a + b; }, 0);

    if (firstplayed < totalmatches * 0.5) {
        return false
    } else {
        //if first place has played all matches
        if (firstplayed === totalmatches) {
            //if every team has played all matches
            let tally = 0;
            for (let i = 0; i < teams.length; i++) {
                if (teams[i].played.reduce(function (a, b) { return a + b; }, 0) === totalmatches) {
                    tally += 1;
                }
            }
            //if all played all matches, first place is champion
            if (tally === teams.length) {
                return true;
            }
        }

        //start at 1, the second placed team
        //if won all matches and is less than first points, return true
        for (let i = 1; i < teams.length; i++) {

            let played = teams[i].played.reduce(function (a, b) { return a + b; }, 0);
            let points = teams[i].points.reduce(function (a, b) { return a + b; }, 0);

            if (played !== totalmatches && (((totalmatches - played) * 3) + points) >= firstpoints) {
                return false;
            }
        }

        return true;
    }
}

export const isRelegated = (pos, teams, totalmatches, lastSafePosition) => {

    let posplayed = teams[pos - 1].played.reduce(function (a, b) { return a + b; }, 0);
    let pospoints = teams[pos - 1].points.reduce(function (a, b) { return a + b; }, 0);

    let lastSafePosPoints = teams[lastSafePosition - 1].points.reduce(function (a, b) { return a + b; }, 0);

    if (posplayed < totalmatches * 0.5) {
        return false;
    } else {
        //if team has played all matches
        if (posplayed === totalmatches) {
            let tally = 0;

            //if played total matches, or not on same points
            for (let i = 0; i < teams.length; i++) {
                if (teams[i].played.reduce(function (a, b) { return a + b; }, 0) === totalmatches) {
                    tally += 1;
                } else if (teams[i].points.reduce(function (a, b) { return a + b; }, 0) !== pospoints) {
                    tally += 1;
                }
            }
            if (tally === teams.length) {
                return true;
            }
        }

        if ((((totalmatches - posplayed) * 3) + pospoints) < lastSafePosPoints) {
            return true;
        } else {
            return false;
        }
    }
}

export const addMatchData = (homeTeam, homeScore, awayTeam, awayScore, i) => {
    //played
    homeTeam.played[i] = 1;
    awayTeam.played[i] = 1;

    //goals for
    homeTeam.goalsfor[i] = homeScore;
    awayTeam.goalsfor[i] = awayScore;

    //goals against
    homeTeam.goalsagainst[i] = awayScore;
    awayTeam.goalsagainst[i] = homeScore;

    if (homeScore > awayScore) {
        //won
        homeTeam.won[i] = 1;
        awayTeam.won[i] = 0;
        //drawn
        homeTeam.drawn[i] = 0;
        awayTeam.drawn[i] = 0;
        //lost
        homeTeam.lost[i] = 0;
        awayTeam.lost[i] = 1;
        //points
        homeTeam.points[i] = 3;
        awayTeam.points[i] = 0;
    } else if (awayScore > homeScore) {
        //won
        homeTeam.won[i] = 0;
        awayTeam.won[i] = 1;
        //drawn
        homeTeam.drawn[i] = 0;
        awayTeam.drawn[i] = 0;
        //lost
        homeTeam.lost[i] = 1;
        awayTeam.lost[i] = 0;
        //points
        homeTeam.points[i] = 0;
        awayTeam.points[i] = 3;
    } else if (homeScore === awayScore) {
        //won
        homeTeam.won[i] = 0;
        awayTeam.won[i] = 0;
        //drawn
        homeTeam.drawn[i] = 1;
        awayTeam.drawn[i] = 1;
        //lost
        homeTeam.lost[i] = 0;
        awayTeam.lost[i] = 0;
        //points
        homeTeam.points[i] = 1;
        awayTeam.points[i] = 1;
    }
}

export const removeMatchData = (homeTeam, awayTeam, i) => {
    homeTeam.played[i] = null;
    awayTeam.played[i] = null;

    homeTeam.goalsfor[i] = null;
    awayTeam.goalsfor[i] = null;

    homeTeam.goalsagainst[i] = null;
    awayTeam.goalsagainst[i] = null;

    homeTeam.won[i] = null;
    awayTeam.won[i] = null;

    homeTeam.drawn[i] = null;
    awayTeam.drawn[i] = null;

    homeTeam.lost[i] = null;
    awayTeam.lost[i] = null;

    homeTeam.points[i] = null;
    awayTeam.points[i] = null;
}