import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  icon: {
    marginRight: '1rem',
  },
  title: {
    flexGrow: 1,
  },
  link: { ...theme.link, marginRight: '2rem' },
  iconLogo: {
    width: '1rem',
    height: '1rem',
  },
}));
