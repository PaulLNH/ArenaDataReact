import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TrendingUp from '@material-ui/icons/TrendingUp';
import TrendingDown from '@material-ui/icons/TrendingDown';
import TrendingFlat from '@material-ui/icons/TrendingFlat';
import Moment from 'moment';
import Grid from '@material-ui/core/Grid';
import ClassImages from '../assets/images/classImages';
import MapImages from '../assets/images/mapImages';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import PersonalStats from '../components/match/personalStats';

const classImages = ClassImages.classImages;
const mapImages = MapImages.mapImages;

// eslint-disable-next-line
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

const styles = theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
    // height: '100%',
  },
  matchTime: {
    width: '10%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    // flexBasis: '33.33%',
    // flexShrink: 0,
    // borderRight: '0.1em solid gray', 
    // padding: '1em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamComposition: {
    flex: 1,
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: "flex-end",
    // justifyContent: 'center',
    // align: 'right',
},
enemyComposition: {
    flex: 1,
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: "flex-start",
    // justifyContent: 'left',
    // alignItems: 'left',
  },
  victory: {
      color: '#FFE400',
      align: 'center',
      marginLeft: '1em',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '1.25em',
  },
  defeat: {
    color: '#A2482E',
    align: 'center',
    marginLeft: '1em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.25em',
  },
  classText: {
    textTransform: 'capitalize',
    fontSize: '1.25em',
  },
  centerAlign: {
    justifyContent: "center",
  },
  vsText: {
    fontWeight: 'bolder',
    justifyContent: 'center',  
    // color: '#880303',
    fontSize: '1.5em',
  },
  specIcon: {
    width: '2em',
    height: '2em',
  },
  mapImages: {
      width: '200px',
      height: 'auto',
  },
  MMRChange: {
    MMRUp: {
        fontSize: 'large',
        color: "secondary",
    },
    MMRDown: {
        fontSize: 'large',
        color: "error",
    },
    MMRFlat: {
        fontSize: 'large',
        color: theme.palette.grey[900],
    },
  },
  paper: {
    width: '100%',
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
  },
});

class Match extends React.Component {
  state = {
    expanded: null,
  };

  componentDidMount() {
    console.log(`======================= Match.js =======================`);
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  displayTeamIcons = (team, key, classes) => {
      // Data passed into function
      // MAGE-Frost,PRIEST-Discipline,ROGUE-Assassination

      // Splits the team into an array of players
      let teamArr = team.split(',');
      // Creates an array to hold JSX
      let result = [];      
      
      // Loops through each player on the team
       for (let player of teamArr) {
           // Creates a new array for this player seperating class and spec
          let currentPlayer = player.split('-');
          // Stores the string of the players class
          let playerClass = currentPlayer.slice(0);
          // Stores the string of the players spec
          let playerSpec = currentPlayer.slice(1);
        //   if (key == '1545560217') {
        //       console.log(playerSpec);
        //   }
          if (playerSpec[0] === 'Beast Mastery') {
              playerSpec[0] = 'Beast_Mastery';
          };
          // Creates a reference to the imported image above
        let img = classImages[`${playerClass[0]}${playerSpec[0]}`];
        // Pushes completed image url to the result array
        /**
         * @Warning : Each child in an array or iterator should have a unique "key" prop.
         */
        result.push(<Tooltip title={`${playerClass[0]} - ${playerSpec[0]}`} aria-label={`${playerClass[0]} - ${playerSpec[0]}`} key={`Tooltip# ${key}-${playerClass[0]}${playerSpec[0]}`}><span><img src={`${img}`} className={classes} key={`${key}-${playerClass[0]}${playerSpec[0]}`} alt={`${playerClass[0]} - ${playerSpec[0]}`}/>&nbsp;</span></Tooltip>)
      };
       
    // should return <img src={MAGEFrost} /><img src={PRIESTDiscipline} /><img src={ROGUEAssassination} />
    return result
  };

  displayTeamComp = (team, key, classes) => {
    let teamArr = team.split(',');
    let result = [];      
     for (let player of teamArr) {
        let currentPlayer = player.split('-');
        let playerClass = currentPlayer.slice(0);
        let playerSpec = currentPlayer.slice(1);
        result.push(<span className={classes} color = "blue" key={key + playerClass + playerSpec}>{playerClass[0].toProperCase()}&nbsp;&nbsp;</span>);
    };
  return result
};

  displayMMRChange = (MMRChange, key, classes) => {
    let result = [];
    if (MMRChange > 0) {
        result.push(<div key={`MMR${key}-${MMRChange}`} >{<TrendingUp color="primary" fontSize="large" />}<Typography fontSize="2em" color="primary"  key={key + MMRChange}>&nbsp;&nbsp;+{MMRChange}</Typography></div>);
    } else if (MMRChange === 0) {
        result.push(<div key={`MMR${key}-${MMRChange}`} >{<TrendingFlat color="disabled" fontSize="large" />}<Typography className={classes.MMRFlat}  key={key + MMRChange}>&nbsp;&nbsp;{MMRChange}</Typography></div>);
    } else if (MMRChange < 0) {
        result.push(<div key={`MMR${key}-${MMRChange}`} >{<TrendingDown color="error" fontSize="large" />}<Typography className={classes.MMRDown} color="error" key={key + MMRChange}>&nbsp;&nbsp;{MMRChange}</Typography></div>);
    };
  return result
};

displayMapName = (map, key, classes) => {
    switch (map.toString()) {
        case '572':
            // code for RoL
            // win ? mapWL.RoL.win++ : mapWL.RoL.loss++
            // win ? mapWL.game.win++ : mapWL.game.loss++
            return {name:`Ruins of Lordaeron`, initials: `RoL`}
        case '617':
            // code for DS
            // win ? mapWL.DS.win++ : mapWL.DS.loss++
            // win ? mapWL.game.win++ : mapWL.game.loss++
            return {name:`Dalaran Sewers`, initials: `DS`}
        case '980':
            // code for TA
            // win ? mapWL.TA.win++ : mapWL.TA.loss++
            // win ? mapWL.game.win++ : mapWL.game.loss++
            return {name:`Tol'Viron Arena`, initials: `TA`}
        case '1134':
            // code for TTP
            // win ? mapWL.TTP.win++ : mapWL.TTP.loss++
            // win ? mapWL.game.win++ : mapWL.game.loss++
            return {name: `Tiger's Peak`, initials: `TP`}
        case '1504':
            // code for BRHA
            // win ? mapWL.BRHA.win++ : mapWL.BRHA.loss++
            // win ? mapWL.game.win++ : mapWL.game.loss++
            return {name: `Black Rook Hold`, initials: `BRH`}
        case '1505':
            // code for NA
            // win ? mapWL.NA.win++ : mapWL.NA.loss++
            // win ? mapWL.game.win++ : mapWL.game.loss++
            return {name: `Nagrand Arena`, initials: `NA`}
        case '1552':
            // code for AF
            // win ? mapWL.AF.win++ : mapWL.AF.loss++
            // win ? mapWL.game.win++ : mapWL.game.loss++
            return {name: `Ashamane's Fall`, initials: `AF`}
        case '1672':
            // code for BEA
            // win ? mapWL.BEA.win++ : mapWL.BEA.loss++
            // win ? mapWL.game.win++ : mapWL.game.loss++
            return {name: `Blades Edge Arena`, initials: `BEA`}
        case '1825':
            // code for HP
            // win ? mapWL.HP.win++ : mapWL.HP.loss++
            // win ? mapWL.game.win++ : mapWL.game.loss++
            return {name: `Hook Poin`, initials: `HP`}
        case '1911':
            // code for M
            // win ? mapWL.M.win++ : mapWL.M.loss++
            // win ? mapWL.game.win++ : mapWL.game.loss++
            return {name: `Mugambala`, initials: `M`}
        default:
        return {name: `No Map Found :(`, initials: `SOL`}
    }
};

displayMapImage = (map) => {
    switch (map.toString()) {
        case '572':
            // code for RoL
            return {src: 'RoL'};
        case '617':
            // code for DS
            return {src: 'DS'};
        case '980':
            // code for TA
            return {src: 'TA'};
        case '1134':
            // code for TTP
            return {src: 'TP'};
        case '1504':
            // code for BRHA
            return {src: 'BRH'};
        case '1505':
            // code for NA
            return {src: 'NA'};
        case '1552':
            // code for AF
            return {src: 'AF'};
        case '1672':
            // code for BEA
            return {src: 'BEA'};
        case '1825':
            // code for HP
            return {src: 'HP'};
        case '1911':
            // code for M
            return {src: 'M'};
        default:
            console.error(`ENTERED DEFAULT MAP IMAGE CASE.`);
            return {src: 'M'};
    }
};

// DATA FROM PROPS:
// Damage: 364332
// Duration: 151
// EnemyComposition: "MONK-Windwalker,PALADIN-Holy,WARRIOR-Fury"
// EnemyMMR: 2262
// Healing: 0
// Honor: 0
// KillingBlows: 0
// MMR: 2240
// Map: 1552
// PlayersNumber: 6
// RatingChange: 0
// Specialization: "Frost"
// TeamComposition: "MAGE-Frost,PRIEST-Discipline,ROGUE-Assassination"
// Timestamp: 1547732754
// Victory: true
// isRated: true
// _id: "5c5b156d6902c630987cb3b6"

  render() {
    const { match } = this.props;
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={2}>
            <ExpansionPanel expanded={expanded === match.Timestamp} onChange={this.handleChange(match.Timestamp)}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                {/** 
                    Time and date of match 
                    08:44 AM
                    Thur 2019-01-17 
                */}
                <span className={classes.matchTime}>
                    <Typography className={classes.heading}>
                    {Moment.unix(match.Timestamp).format("HH:mm A")}
                    <br />
                    {Moment.unix(match.Timestamp).format("ddd YYYY-MM-DD")}
                    </Typography>
                </span>

                <Grid container spacing={0}>
                    {/**
                        Match status
                        Victory!
                    */}
                    <Grid item xs={1} sm={1} md={1}>
                        {match.Victory === true ? 
                            <Typography className={classes.victory}>Victory!</Typography> : 
                            <Typography className={classes.defeat}>Defeat!</Typography>
                        }
                    </Grid>
                    {/**
                        Match Duration
                        151s
                    */}
                    <Grid item xs={1} sm={1} md={1}>
                        <Tooltip title={`Match ended after ${match.Duration} seconds`} aria-label={`Match ended after ${match.Duration} seconds`}>
                            <Typography className={classes.secondaryHeading}>
                                {match.Duration}s
                            </Typography>
                        </Tooltip>
                    </Grid>
                    {/**
                        Map the match was played on
                        BEA
                    */}
                    <Grid item xs={1} sm={1} md={1}>
                        <Tooltip title={`${this.displayMapName(match.Map).name}`} aria-label={`${this.displayMapName(match.Map).name}`}>
                            <Typography className={classes.secondaryHeading}>
                                {this.displayMapName(match.Map).initials}
                            </Typography>
                        </Tooltip>
                    </Grid>
                    {/**
                        Users team composition
                        Mage Priest Rogue (with spec specific icons)
                    */}
                    <Grid item xs={4} sm={4} md={4} className={classes.teamComposition} >
                        <Typography className={classes.teamComposition}>
                        {this.displayTeamComp(match.TeamComposition, match.Timestamp, classes.classText)}
                        &nbsp;
                        {this.displayTeamIcons(match.TeamComposition, match.Timestamp, classes.specIcon)}
                        </Typography>
                    </Grid>
                    {/**
                        Static text
                        VS
                    */}
                    <Grid item xs={1} sm={1} md={1} container justify = "center">
                        <Typography className={classes.vsText}>
                            <strong>VS</strong>
                        </Typography>
                    </Grid>
                    {/**
                        Enemy team composition
                        Monk Paladin Warrior (with spec specific icons)
                    */}
                    <Grid item xs={4} sm={4} md={4} className={classes.teamComposition} >
                        <Typography className={classes.enemyComposition}>
                            {this.displayTeamIcons(match.EnemyComposition, match.Timestamp, classes.specIcon)}
                            &nbsp;
                            {this.displayTeamComp(match.EnemyComposition, match.Timestamp, classes.classText)}
                        </Typography>
                    </Grid>

                </Grid>

                </ExpansionPanelSummary>

                {/**
                    Inside the expanded panel of each card
                */}
                <ExpansionPanelDetails>
                    <Paper className={classes.paper} elevation={1}>
                        <Grid container spacing={16} align = "center">
                            {/**
                                MMR Change
                                (icon) +15
                            */}
                            <Grid item xs={1} sm={1} md={1} container >
                                {this.displayMMRChange(match.RatingChange, match.Timestamp, classes.MMRChange)}
                            </Grid>
                            {/**
                                Teams MMR
                                TEAM MMR:
                                2240
                            */}
                            <Grid item xs={1} sm={1} md={1} container >
                                <Typography>TEAM MMR: <br />{match.MMR}</Typography>
                            </Grid>
                            {/**
                                Teams MMR
                                ENEMY MMR:
                                2262
                            */}
                            <Grid item xs={1} sm={1} md={1} container >
                                <Typography>ENEMY MMR: <br />{match.EnemyMMR}</Typography>
                            </Grid>
                            {/**
                                Display image of the map played on
                                (image)
                            */}
                            <Grid item xs={2} sm={2} md={2} container >
                                <Tooltip title={`${this.displayMapName(match.Map).name}`} aria-label={`${this.displayMapName(match.Map).name}`}>
                                <span>
                                <img src={mapImages[this.displayMapImage(match.Map).src]} className={classes.mapImages} key={`${match.Timestamp}-${match.Map}`} alt={`${this.displayMapName(match.Map).name}`}/>
                                &nbsp;
                                </span>
                                </Tooltip>
                            </Grid>
                            {/**
                                Table of personal stats: 
                                Personal Stats:
                            */}
                            <Grid item xs={7} sm={7} md={7} container >
                                <PersonalStats className={classes.secondaryHeading} match={match} />
                            </Grid>

                        </Grid>
                    </Paper>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            </Paper>
        </div>
    );
  }
}

/**
 * @ExtractedFromLine : 380
 * {this.displayMapImage(match.Map, match.Timestamp)}
 */
 

// Timestamp;Map;;TeamComposition;EnemyComposition;Duration;Victory
// PlayersNumber;KillingBlows;Damage;Healing;Honor;RatingChange;MMR;EnemyMMR;Specialization;isRated

Match.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Match);