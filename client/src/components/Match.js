import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Moment from 'moment';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { NavigateBeforeSharp } from '@material-ui/icons';
import Images from '../assets/images/classImages';
import Tooltip from '@material-ui/core/Tooltip';

const classImages = Images.classImages;

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
});

class Match extends React.Component {
  state = {
    expanded: null,
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
          // Creates a reference to the imported image above
        let img = classImages[`${playerClass[0]}${playerSpec[0]}`];
        // Pushes completed image url to the result array
        /**
         * @Warning : Each child in an array or iterator should have a unique "key" prop.
         */
        result.push(<Tooltip title={`${playerClass[0]} - ${playerSpec[0]}`} aria-label={`${playerClass[0]} - ${playerSpec[0]}`}><span><img src={`${img}`} className={classes} key={`${key}-${playerClass[0]}${playerSpec[0]}`} alt={`${playerClass[0]} - ${playerSpec[0]}`}/>&nbsp;</span></Tooltip>)
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

  render() {
    const { match } = this.props;
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === match.Timestamp} onChange={this.handleChange(match.Timestamp)}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <span className={classes.matchTime}>
            <Typography className={classes.heading}>
            {Moment.unix(match.Timestamp).format("HH:mm A")}
            <br />
            {Moment.unix(match.Timestamp).format("ddd YYYY-MM-DD")}
            </Typography>
          </span>

            <Grid container spacing={0}>
            <Grid item xs={1} sm={1} md={1}>
                {match.Victory === 'true' ? 
                    <Typography className={classes.victory}>Victory!</Typography> : 
                    <Typography className={classes.defeat}>Defeat!</Typography>
                }
            </Grid>
            <Grid item xs={1} sm={1} md={1}>
                <Tooltip title={`Match ended after ${match.Duration} seconds`} aria-label={`Match ended after ${match.Duration} seconds`}>
                    <Typography className={classes.secondaryHeading}>
                        {match.Duration}s
                    </Typography>
                </Tooltip>
            </Grid>
            <Grid item xs={4} sm={4} md={4} className={classes.teamComposition} >
                    <Typography className={classes.teamComposition}>
                    {this.displayTeamComp(match.TeamComposition, match.Timestamp, classes.classText)}
                    &nbsp;
                    {this.displayTeamIcons(match.TeamComposition, match.Timestamp, classes.specIcon)}
                    </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} container justify = "center">
                    <Typography className={classes.vsText}>
                        <strong>VS</strong>
                    </Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={4} className={classes.teamComposition} >
                    <Typography className={classes.enemyComposition}>
                        {this.displayTeamIcons(match.EnemyComposition, match.Timestamp, classes.specIcon)}
                        &nbsp;
                        {this.displayTeamComp(match.EnemyComposition, match.Timestamp, classes.classText)}
                    </Typography>
                </Grid>
            </Grid>

          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
              maximus est, id dignissim quam.
            </Typography>
            <Divider />
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
              maximus est, id dignissim quam.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

Match.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Match);