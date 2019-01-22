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

/** Importing spec images */
import MAGEArcane from '../assets/images/specs/spec_62.jpg';
import MAGEFire from '../assets/images/specs/spec_63.jpg';
import MAGEFrost from '../assets/images/specs/spec_64.jpg';
import { NavigateBeforeSharp } from '@material-ui/icons';

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

  displayTeamComp = team => {
      // Data passed into function
      // MAGE-Frost,PRIEST-Discipline,ROGUE-Assassination
      let teamArr = team.split(',');
      let playerClass = [];
      let playerSpec = [];
      let result = [];
      
      for (let player of teamArr) {
        playerClass.push(teamArr[player].slice('-')[0]);
        playerSpec.push(teamArr[player].slice('-')[1]);
        result.push(<img src={`${playerSpec[player]}${playerClass[player]}`} />)
      };

    // should return <img src={MAGEFrost} /><img src={PRIESTDiscipline} /><img src={ROGUEAssassination} />
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
                <Grid item xs={8} sm={8} md={8}>
                    <Typography className={classes.secondaryHeading}>
                        {match.TeamComposition} VS {match.EnemyComposition}
                    </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1}>
                    {this.displayTeamComp(match.TeamComposition)}
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