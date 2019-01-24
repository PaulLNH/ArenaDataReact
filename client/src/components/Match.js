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

/** Importing spec images */
/**
 * @Class Mage
 */
import MAGEArcane from '../assets/images/specs/spec_62.jpg';
import MAGEFire from '../assets/images/specs/spec_63.jpg';
import MAGEFrost from '../assets/images/specs/spec_64.jpg';
/**
 * @Class Paladin
 */
import PALADINHoly from '../assets/images/specs/spec_65.jpg';
import PALADINProtection from '../assets/images/specs/spec_66.jpg';
import PALADINRetribution from '../assets/images/specs/spec_70.jpg';
/**
 * @Class Warrior
 */
import WARRIORArms from '../assets/images/specs/spec_71.jpg';
import WARRIORFury from '../assets/images/specs/spec_72.jpg';
import WARRIORProtection from '../assets/images/specs/spec_73.jpg';
/**
 * @Class Druid
 */
import DRUIDBalance from '../assets/images/specs/spec_102.jpg';
import DRUIDGuardian from '../assets/images/specs/spec_103.jpg';
import DRUIDFeral from '../assets/images/specs/spec_104.jpg';
import DRUIDRestoration from '../assets/images/specs/spec_105.jpg';
/**
 * @Class Death Knight
 */
import DEATHKNIGHTBlood from '../assets/images/specs/spec_250.jpg';
import DEATHKNIGHTFrost from '../assets/images/specs/spec_251.jpg';
import DEATHKNIGHTUnholy from '../assets/images/specs/spec_252.jpg';
/**
 * @Class Hunter
 */
import HUNTERBeastmaster from '../assets/images/specs/spec_253.jpg';
import HUNTERMarksman from '../assets/images/specs/spec_254.jpg';
import HUNTERSurvival from '../assets/images/specs/spec_255.jpg';
/**
 * @Class Priest
 */
import PRIESTDiscipline from '../assets/images/specs/spec_256.jpg';
import PRIESTHoly from '../assets/images/specs/spec_257.jpg';
import PRIESTShadow from '../assets/images/specs/spec_258.jpg';
/**
 * @Class Rogue
 */
import ROGUEAssassination from '../assets/images/specs/spec_259.jpg';
import ROGUEOutlaw from '../assets/images/specs/spec_260.jpg';
import ROGUESubtlety from '../assets/images/specs/spec_261.jpg';
/**
 * @Class Shaman
 */
import SHAMANElemental from '../assets/images/specs/spec_262.jpg';
import SHAMANEnhancement from '../assets/images/specs/spec_263.jpg';
import SHAMANRestoration from '../assets/images/specs/spec_264.jpg';
/**
 * @Class Warlock
 */
import WARLOCKAffliction from '../assets/images/specs/spec_265.jpg';
import WARLOCKDemonology from '../assets/images/specs/spec_266.jpg';
import WARLOCKDestruction from '../assets/images/specs/spec_267.jpg';
/**
 * @Class Monk
 */
import MONKBrewmaster from '../assets/images/specs/spec_268.jpg';
import MONKWindwalker from '../assets/images/specs/spec_269.jpg';
import MONKMistweaver from '../assets/images/specs/spec_270.jpg';
/**
 * @Class Demon Hunter
 */
import DEMONHUNTERVengence from '../assets/images/specs/spec_577.jpg';
import DEMONHUNTERHavoc from '../assets/images/specs/spec_581.jpg';


String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

// Object of image import references ES6
/**
 * @equals ={ MAGEArcane: MAGEArcane}
 */
const classImages = {
    MAGEArcane,
    MAGEFire,
    MAGEFrost,
    PALADINHoly,
    PALADINProtection,
    PALADINRetribution,
    WARRIORArms,
    WARRIORFury,
    WARRIORProtection,
    DRUIDBalance,
    DRUIDGuardian,
    DRUIDFeral,
    DRUIDRestoration,
    DEATHKNIGHTBlood,
    DEATHKNIGHTFrost,
    DEATHKNIGHTUnholy,
    HUNTERBeastmaster,
    HUNTERMarksman,
    HUNTERSurvival,
    PRIESTDiscipline,
    PRIESTHoly,
    PRIESTShadow,
    ROGUEAssassination,
    ROGUEOutlaw,
    ROGUESubtlety,
    SHAMANElemental,
    SHAMANEnhancement,
    SHAMANRestoration,
    WARLOCKAffliction,
    WARLOCKDemonology,
    WARLOCKDestruction,
    MONKBrewmaster,
    MONKWindwalker,
    MONKMistweaver,
    DEMONHUNTERVengence,
    DEMONHUNTERHavoc,
};

const styles = theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
    // height: '100%',
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
      color: 'green',
      fontWeight: 'bolder',
      align: 'center',
      marginLeft: '1em',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
  },
  defeat: {
    color: 'red',
    fontWeight: 'bolder',
    align: 'center',
    marginLeft: '1em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  classText: {
    textTransform: 'capitalize',
    size: '2em',
  },
  centerAlign: {
    justifyContent: "center",
  },
  vsText: {
    fontWeight: 'bolder',
    justifyContent: 'center',  
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
        result.push(<img src={`${img}`} className={classes} key={`${key}-${playerClass[0]}${playerSpec[0]}`} />)
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

        result.push(`${playerClass[0].toProperCase()} `);
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
            <Typography className={classes.heading}>
                {Moment.unix(match.Timestamp).format("HH:mm A")}
                    <br />
                {Moment.unix(match.Timestamp).format("ddd YYYY-MM-DD")}
            </Typography>

            <Grid container spacing={16}>
                <Grid item xs={2} sm={2} md={2}>
                    {match.Victory === 'true' ? 
                        <Typography className={classes.victory}>Victory!</Typography> : 
                        <Typography className={classes.defeat}>Defeat!</Typography>
                    }
                </Grid>
                <Grid item xs={4} sm={4} md={4} className={classes.teamComposition} >
                    <Typography className={classes.teamComposition}>
                    {this.displayTeamComp(match.TeamComposition, match.Timestamp, classes.secondaryHeading)}
                    &nbsp;
                    {this.displayTeamIcons(match.TeamComposition, match.Timestamp, classes.specIcon)}
                    </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} className={classes.centerAlign} >
                    <Typography className={classes.vsText}>
                        <strong>VS</strong>
                    </Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={4} className={classes.teamComposition} >
                    <Typography className={classes.enemyComposition}>
                        {this.displayTeamIcons(match.EnemyComposition, match.Timestamp, classes.specIcon)}
                        &nbsp;
                        {this.displayTeamComp(match.EnemyComposition, match.Timestamp, classes.secondaryHeading)}
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